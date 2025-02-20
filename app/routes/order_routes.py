# app/routes/order_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Order, Cart, Product
from app.extensions import db

order_bp = Blueprint('order', __name__)

@order_bp.route('/orders', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    cart_items = Cart.query.filter_by(user_id=user_id).all()

    if not cart_items:
        return jsonify({"message": "Cart is empty"}), 400

    total_amount = 0
    for item in cart_items:
        product = Product.query.get(item.product_id)
        total_amount += product.price * item.quantity

    new_order = Order(user_id=user_id, total_amount=total_amount)
    db.session.add(new_order)
    db.session.commit()

    # Clear the cart
    Cart.query.filter_by(user_id=user_id).delete()
    db.session.commit()

    return jsonify({"message": "Order created successfully"}), 201