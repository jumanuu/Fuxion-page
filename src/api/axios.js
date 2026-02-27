import axios from 'axios';

const FUXION_API_URL = 'https://api-freefx.fuxion.com/api-fuxion/db';

const api = axios.create({
  baseURL: FUXION_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fuxion_token');
  const customerId = localStorage.getItem('fuxion_customerId');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (customerId) {
    config.headers['X-Customer-ID'] = customerId;
  }
  
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('fuxion_token');
      localStorage.removeItem('fuxion_customerId');
      window.dispatchEvent(new CustomEvent('fuxion-auth-error'));
    }
    
    return Promise.reject(error);
  }
);

export default api;
