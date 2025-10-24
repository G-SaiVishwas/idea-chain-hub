import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://idea-chain-hub.onrender.com',
  withCredentials: true
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ideachain_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
