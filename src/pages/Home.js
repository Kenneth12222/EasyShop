// src/pages/Home.js
import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import { addToCart } from '../api';

const Home = ({ token }) => {
  const handleAddToCart = async (productId, quantity) => {
    await addToCart(productId, quantity, token);
    alert('Product added to cart!');
  };

  return (
    <div>
      <h1>Welcome to E-Commerce</h1>
      <ProductList addToCart={handleAddToCart} />
    </div>
  );
};

export default Home;