import React, { useEffect, useState, useRef } from "react";
import "../styles/LatestCollection.css";
import { getProducts } from "../api/productApi"; // Updated import path

const LatestCollection = () => {
  const [products, setProducts] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // getProducts now returns the products data directly
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchData();
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="latest-collection">
      <div className="container">
        <h2 className="section-title">Latest Products</h2>
        <div className="scroll-wrapper">
          <button className="scroll-button left" onClick={scrollLeft}>
            <span>&#8249;</span>
          </button>
          <div className="scroll-container" ref={scrollContainerRef}>
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image-wrapper">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={scrollRight}>
            <span>&#8250;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;


