

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/productApi'; // Updated import path
import "../styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Expecting direct data return from the API
        const productsData = await getProducts();
        setProducts(productsData);
        console.log("Products response:", productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <header className="product-header">
        <h2>Latest Collection</h2>
        <p>Explore our unique range of products, curated to meet your style and preferences.</p>
      </header>
      <div className="product-grid-list">
        {products.map((product) => (
          <div key={product.id} className="product-card-list">
            <Link to={`/product/${product.id}`} className="product-item">
              <div className="product-img">
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="product-thumbnail"
                />
              </div>
              <div className="product-info">
                <div className="price_card_name">
                  <h3>{product.name}</h3>
                </div>
                <div className="price_card">
                  <p className="product-price">${product.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;


