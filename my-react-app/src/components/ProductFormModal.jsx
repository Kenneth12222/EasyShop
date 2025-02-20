import React, { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../api/productApi"; // Updated import path
import "./ProductFormModal.css";

const ProductFormModal = ({ product, onClose, onProductCreated }) => {
  const isEditMode = Boolean(product);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    image: null,
  });
  const [error, setError] = useState(null);

  // Pre-fill form if editing an existing product
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        stock: product.stock || "",
        image: null, // Do not pre-populate file input
      });
    }
  }, [product, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });
    try {
      if (isEditMode) {
        await updateProduct(product.id, data);
      } else {
        await createProduct(data);
      }
      onProductCreated();
      onClose();
    } catch (err) {
      console.error("Error submitting product:", err);
      setError("Error submitting product. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{isEditMode ? "Edit Product" : "Add New Product"}</h2>
        {error && <p className="error">{error}</p>}
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input type="file" id="image" name="image" onChange={handleChange} />
          </div>
          <button type="submit" className="submit-button">
            {isEditMode ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;


