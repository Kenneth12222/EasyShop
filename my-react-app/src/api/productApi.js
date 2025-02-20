// productApi.js
import { get, post, put, del } from './api';
import { getAuthConfig } from './authConfig';

export const getProducts = () => get('/products');
export const getProduct = (productId) => get(`/products/${productId}`);
export const createProduct = (productData) =>
  post('/products', productData, getAuthConfig());
export const updateProduct = (productId, productData) =>
  put(`/products/${productId}`, productData, getAuthConfig());
export const deleteProduct = (productId) =>
  del(`/products/${productId}`, getAuthConfig());
