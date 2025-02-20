// orderApi.js
import { get, post } from './api';
import { getAuthConfig } from './authConfig';

export const checkout = () => post('/checkout', {}, getAuthConfig());
export const getOrders = () => get('/orders', getAuthConfig());
export const getOrder = (orderId) => get(`/orders/${orderId}`, getAuthConfig());
