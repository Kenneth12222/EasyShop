
// 
// userApi.js
import { post } from './api';

export const register = (username, email, password, isAdmin = false) => {
  const endpoint = isAdmin ? '/register-admin' : '/register';
  return post(endpoint, { username, email, password });
};

export const login = (username, password) => {
  return post('/login', { username, password });
};

export const logout = () => {
  return post('/logout', {});
};
// 