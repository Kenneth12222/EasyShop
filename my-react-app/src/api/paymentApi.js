// paymentApi.js
import { post } from './api';
import { getAuthConfig } from './authConfig';

export const createPaymentIntent = () =>
  post('/create-payment-intent', {}, getAuthConfig());
