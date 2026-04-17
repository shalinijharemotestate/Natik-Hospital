import axios from 'axios';

const envBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const baseURL = envBase ? `${envBase}/api` : '/api';

const api = axios.create({ baseURL });

// Attach access token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If token is invalid/expired, force re-login
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
