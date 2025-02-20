# app/routes/cart_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Cart, Product
from app.extensions import db

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/cart', methods=['GET'])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    return jsonify([{"product_id": item.product_id, "quantity": item.quantity} for item in cart_items]), 200

@cart_bp.route('/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    data = request.get_json()
    product_id = data['product_id']
    quantity = data['quantity']

    product = Product.query.get_or_404(product_id)
    if product.stock < quantity:
        return jsonify({"message": "Not enough stock"}), 400

    cart_item = Cart(user_id=user_id, product_id=product_id, quantity=quantity)
    db.session.add(cart_item)
    db.session.commit()
    return jsonify({"message": "Product added to cart"}), 201