// src/lib/api.ts
import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL
//   ?
//   : "http://localhost:5000/api";

const api = axios.create({
  baseURL: "https://school-app-backend-9kjf.onrender.com/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

export default api;
