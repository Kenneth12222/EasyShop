// cartApi.js
import { get, post, del } from './api';
import { getAuthConfig } from './authConfig';

export const getCart = () => get('/cart', getAuthConfig());
export const addToCart = (productId, quantity) =>
  post('/cart', { product_id: productId, quantity }, getAuthConfig());
export const removeFromCart = (productId) =>
  del(`/cart/${productId}`, getAuthConfig());
