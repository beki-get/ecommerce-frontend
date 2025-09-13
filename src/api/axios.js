// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-ladv.onrender.com/",
});

// Attach token from localStorage (or another source) to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;