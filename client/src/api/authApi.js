// 
// authApi.js
import { post } from './api';
import { getAuthConfig } from './authConfig';

export const register = (username, email, password, isAdmin = false) => {
  const endpoint = isAdmin ? '/register-admin' : '/register';
  return post(endpoint, { username, email, password });
};

export const login = (username, password) =>
  post('/login', { username, password }, { withCredentials: true });

export const logout = () => post('/logout', {}, getAuthConfig());
