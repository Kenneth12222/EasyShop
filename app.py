from flask import Flask, jsonify, request, session, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import stripe    

# ------------------------------------------------------------------------------
# App & Database Configuration
# ------------------------------------------------------------------------------
app = Flask(__name__)
# For security, the secret key should be stored in an environment variable.
app.secret_key = os.environ.get("FLASK_SECRET_KEY", os.urandom(24))
# Stripe configuration
stripe_secret_key = os.environ.get("STRIPE_SECRET_KEY")
stripe_publish_key = os.environ.get("STRIPE_PUBLISH_KEY")
stripe.api_key = stripe_secret_key

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Allow cross-origin requests (needed for your client-side app)
CORS(app, supports_credentials=True)
db = SQLAlchemy(app)

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(255), nullable=True)  
    name = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)
    stock = db.Column(db.Integer, nullable=False)

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default='Pending')

class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

# ------------------------------------------------------------------------------
# Helper Decorators for Authentication & Authorization
# ------------------------------------------------------------------------------
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({"message": "Unauthorized: Please log in"}), 401
        return f(*args, **kwargs)
    return decorated_function

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({"message": "Unauthorized: Please log in"}), 401
        user = db.session.get(User, session['user_id'])
        if not user or not user.is_admin:
            return jsonify({"message": "Forbidden: Admins only"}), 403
        return f(*args, **kwargs)
    return decorated_function

# ------------------------------------------------------------------------------
# Routes for Serving Uploaded Images
# ------------------------------------------------------------------------------
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    upload_folder = os.path.join(os.getcwd(), 'uploads')
    return send_from_directory(upload_folder, filename)


# ----- User Registration (for regular customers) -----
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "Missing registration data"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 400

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# ----- Admin Registration -----
@app.route('/register-admin', methods=['POST'])
def register_admin():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "Missing registration data"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 400

    user = User(username=username, email=email, is_admin=True)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Admin user registered successfully"}), 201

# ----- Login (Admins & Users) -----
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid credentials"}), 401

    session['user_id'] = user.id
    return jsonify({"message": "Logged in successfully", "is_admin": user.is_admin}), 200

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out successfully"}), 200

# ----- Product Endpoints ----- 

# Anyone can view products
@app.route('/products', methods=['GET'])
def index():
    products = Product.query.all()
    return jsonify([{
        "id": p.id,
        "image": p.image,
        "name": p.name,
        "price": p.price,
        "description": p.description,
        "stock": p.stock
    } for p in products]), 200

@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = db.session.get(Product, product_id)
    base_url = request.host_url.rstrip('/')  
    if not product:
        return jsonify({"message": "Product not found"}), 404
    return jsonify({
        "id": product.id,
        "image": base_url + product.image if product.image else None,
        "name": product.name,
        "price": product.price,
        "description": product.description,
        "stock": product.stock
    }), 200

# ----- Admin-Only Product Management -----
@app.route('/products', methods=['POST'])
@admin_required
def create_product():

    name = request.form.get('name')
    price = request.form.get('price')
    description = request.form.get('description')
    stock = request.form.get('stock')

    if not name or not price or not stock:
        return jsonify({"message": "Missing required product data"}), 400

  
    image_file = request.files.get('image')
    image_path = None
    if image_file:
       filename = secure_filename(image_file.filename)
       upload_folder = os.path.join(os.getcwd(), 'uploads')
       os.makedirs(upload_folder, exist_ok=True)
       filepath = os.path.join(upload_folder, filename)
       image_file.save(filepath)
       image_path = '/uploads/' + filename

    try:
        price = float(price)
        stock = int(stock)
    except ValueError:
        return jsonify({"message": "Invalid price or stock value"}), 400

    product = Product(image=image_path, name=name, price=price, description=description, stock=stock)
    db.session.add(product)
    db.session.commit()

    return jsonify({"message": "Product created successfully"}), 201

@app.route('/products/<int:product_id>', methods=['PUT'])
@admin_required
def update_product(product_id):
    product = db.session.get(Product, product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404

    name = request.form.get('name')
    price = request.form.get('price')
    description = request.form.get('description')
    stock = request.form.get('stock')

    if name:
        product.name = name
    if price:
        try:
            product.price = float(price)
        except ValueError:
            return jsonify({"message": "Invalid price value"}), 400
    if description is not None:
        product.description = description
    if stock:
        try:
            product.stock = int(stock)
        except ValueError:
            return jsonify({"message": "Invalid stock value"}), 400

    # Handle image update if a new file is provided
    image_file = request.files.get('image')
    if image_file:
        from werkzeug.utils import secure_filename
        filename = secure_filename(image_file.filename)
        upload_folder = os.path.join(os.getcwd(), 'uploads')
        os.makedirs(upload_folder, exist_ok=True)
        filepath = os.path.join(upload_folder, filename)
        image_file.save(filepath)
        product.image = '/uploads/' + filename

    db.session.commit()
    return jsonify({"message": "Product updated successfully"}), 200

@app.route('/products/<int:product_id>', methods=['DELETE'])
@admin_required
def delete_product(product_id):
    product = db.session.get(Product, product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404
    if product.image:
        try:
            os.remove(os.path.join(os.getcwd(), product.image.lstrip('/')))
        except FileNotFoundError:
            pass  

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200


@app.route('/cart', methods=['GET'])
@login_required
def get_cart():
    user_id = session['user_id']
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    cart = []
    for item in cart_items:
        product = db.session.get(Product, item.product_id)
        cart.append({
            "product_id": product.id,
            "image": product.image,
            "name": product.name,
            "price": product.price,
            "quantity": item.quantity
        })
    return jsonify(cart), 200

@app.route('/cart', methods=['POST'])
@login_required
def add_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity')
    
    # Validate incoming data
    if not product_id or quantity is None:
        return jsonify({"message": "Missing data"}), 400

    product = db.session.get(Product, product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404

    user_id = session['user_id']
    cart_item = Cart.query.filter_by(user_id=user_id, product_id=product_id).first()

    if cart_item:
        new_quantity = cart_item.quantity + quantity

        if new_quantity <= 0:
            product.stock += cart_item.quantity
            db.session.delete(cart_item)
            db.session.commit()
            return jsonify({"message": "Product removed from cart"}), 200

        # If incrementing, ensure there's enough stock
        if quantity > 0 and product.stock < quantity:
            return jsonify({"message": "Not enough stock"}), 400

        if quantity > 0:
            product.stock -= quantity
        else:
            product.stock += abs(quantity)
            
        cart_item.quantity = new_quantity

    else:
       
        if quantity <= 0:
            return jsonify({"message": "Cannot add negative quantity for new item"}), 400
        if product.stock < quantity:
            return jsonify({"message": "Not enough stock"}), 400
        cart_item = Cart(user_id=user_id, product_id=product_id, quantity=quantity)
        product.stock -= quantity
        db.session.add(cart_item)
    
    db.session.commit()
    return jsonify({"message": "Cart updated successfully"}), 200


@app.route('/cart/<int:product_id>', methods=['DELETE'])
@login_required
def remove_from_cart(product_id):
    user_id = session['user_id']
    cart_item = Cart.query.filter_by(user_id=user_id, product_id=product_id).first()
    if not cart_item:
        return jsonify({"message": "Product not in cart"}), 404

    product = db.session.get(Product, product_id)
    product.stock += cart_item.quantity

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Product removed from cart"}), 200

@app.route('/checkout', methods=['POST'])
@login_required
def checkout():
    user_id = session['user_id']
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    if not cart_items:
        return jsonify({"message": "Cart is empty"}), 400

    total_amount = sum(item.quantity * db.session.get(Product, item.product_id).price for item in cart_items)
    order = Order(user_id=user_id, total_amount=total_amount)
    db.session.add(order)
    db.session.commit()

    for item in cart_items:
        product = db.session.get(Product, item.product_id)
        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=item.quantity,
            price=product.price
        )
        db.session.add(order_item)
        db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Order placed successfully", "order_id": order.id}), 200

@app.route('/orders', methods=['GET'])
@login_required
def get_orders():
    user_id = session['user_id']
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([{"id": o.id, "total_amount": o.total_amount, "status": o.status} for o in orders]), 200

@app.route('/orders/<int:order_id>', methods=['GET'])
@login_required
def get_order(order_id):
    order = db.session.get(Order, order_id)
    if not order or order.user_id != session['user_id']:
        return jsonify({"message": "Order not found"}), 404

    order_items = OrderItem.query.filter_by(order_id=order_id).all()
    items = []
    for item in order_items:
        product = db.session.get(Product, item.product_id)
        items.append({
            "product_id": product.id,
            "image": product.image,
            "name": product.name,
            "price": item.price,
            "quantity": item.quantity
        })

    return jsonify({
        "id": order.id,
        "total_amount": order.total_amount,
        "status": order.status,
        "items": items
    }), 200



@app.route('/create-payment-intent', methods=['POST'])
@login_required
def create_payment_intent():
    user_id = session['user_id']
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    if not cart_items:
        return jsonify({"message": "Cart is empty"}), 400

    total_amount = sum(
        item.quantity * db.session.get(Product, item.product_id).price 
        for item in cart_items
    )

    amount_in_cents = int(total_amount * 100)
    try:

        intent = stripe.PaymentIntent.create(
            amount=amount_in_cents,
            currency='usd',
            payment_method_types=['card']
        )
        return jsonify({
            'clientSecret': intent.client_secret,
            'amount': amount_in_cents
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
 
@app.route('/create-checkout-session', methods=['POST'])
@login_required
def create_checkout_session():
    user_id = session['user_id']
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    if not cart_items:
        return jsonify({"message": "Cart is empty"}), 400

    total_amount = sum(
        item.quantity * db.session.get(Product, item.product_id).price
        for item in cart_items
    )
    amount_in_cents = int(total_amount * 100)

    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': 'Order from My Shop',
                    },
                    'unit_amount': amount_in_cents,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='https://yourdomain.com/success', 
            cancel_url='https://yourdomain.com/cancel',    
        )
        return jsonify({'sessionId': checkout_session.id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ------------------------------------------------------------------------------
# Main Entrypoint
# ------------------------------------------------------------------------------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  
    app.run(debug=True)

