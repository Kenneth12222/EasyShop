

// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../api/productApi'; // Updated import for product-related endpoints
import { addToCart } from '../api/cartApi';         // Updated import for cart-related endpoint
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // getProduct now returns the product data directly
        const productData = await getProduct(id);
        console.log("Product Detail response:", productData);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Use the image URL as-is if it already starts with http; otherwise prepend the backend URL
  const imageURL = product.image.startsWith("http")
    ? product.image
    : `http://localhost:5000${product.image}`;

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  return (
    <div className='product-details-container'>
      <div className='product-image-wrapper'>
        <div className="product-carousel">
          <img src={imageURL} alt={product.name} className="product-image" />
          <div className="carousel-buttons">
            <h1 className='product-title'>{product.name}</h1>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <p>Stock: {product.stock}</p>
          </div>
        </div>
      </div>

      <div className="product-info-wrapper">
        <h1 className="product-title">{ product.title || product.name }</h1>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
        <p>Stock: {product.stock}</p>
  
        <div className="action-buttons">
          <button className="btn add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <Link className="btn back-btn" to="/">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


