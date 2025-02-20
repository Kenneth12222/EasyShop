
// 
// api.js
import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const MAX_RETRIES = 3;

async function apiRequest(method, path, data = null, config = {}, retries = 0) {
  const url = `${API_URL}${path}`;
  try {
    const response = await axios({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const errorMessage = error.response?.data || 'Unknown error';

    // Handle unauthorized access (401) by throwing an error
    if (status === 401) {
      console.warn('Unauthorized. Please login.');
      throw { status, message: errorMessage };
    }

    // Retry on server errors (status codes 500 and above)
    if (retries < MAX_RETRIES && status >= 500) {
      console.warn(`Retrying ${method.toUpperCase()} ${path} (attempt ${retries + 1})...`);
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * (retries + 1) + Math.random() * 500)
      );
      return apiRequest(method, path, data, config, retries + 1);
    }
    throw { status, message: errorMessage };
  }
}

export const get = (path, config = {}) => apiRequest('get', path, null, config);
export const post = (path, data, config = {}) => apiRequest('post', path, data, config);
export const put = (path, data, config = {}) => apiRequest('put', path, data, config);
export const del = (path, config = {}) => apiRequest('delete', path, null, config);


