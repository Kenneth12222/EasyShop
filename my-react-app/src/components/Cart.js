// src/components/Cart.js
import React, { useEffect, useState, useContext } from 'react';
import { getCart, removeFromCart, addToCart } from '../api/cartApi'; // Updated import path
import AuthContext from '../context/AuthContext';
import "../styles/Cart.css";
import RedirectToCheckout from './RedirectToCheckout';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // getCart now returns the cart data directly
        const cartData = await getCart();
        setCart(cartData);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      setCart(cart.filter((item) => item.product_id !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleIncrement = async (productId) => {
    try {
      await addToCart(productId, 1);
      setCart(cart.map(item => {
        if (item.product_id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }));
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const handleDecrement = async (productId) => {
    try {
      const item = cart.find(i => i.product_id === productId);
      if (item.quantity <= 1) {
        await handleRemoveFromCart(productId);
      } else {
        await addToCart(productId, -1);
        setCart(cart.map(item => {
          if (item.product_id === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }));
      }
    } catch (error) {
      console.error('Error decrementing quantity:', error);
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.product_id} className="cart-item">
              <div className="item-image">
                <img 
                  src={`http://localhost:5000${item.image}`} 
                  alt={item.name} 
                  className="cart-item-image"
                />
              </div>
              <div className="item-info">
                <p>${item.price}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item.product_id)} className="qty-btn">-</button>
                <span className="item-qty">{item.quantity}</span>
                <button onClick={() => handleIncrement(item.product_id)} className="qty-btn">+</button>
              </div>
              <button onClick={() => handleRemoveFromCart(item.product_id)} className="remove-btn">
                Remove
              </button>
            </div>
          ))}
          <RedirectToCheckout />
        </div>
      )}
    </div>
  );
};

export default Cart;


