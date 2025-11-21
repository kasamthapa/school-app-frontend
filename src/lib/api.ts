// src/lib/api.ts
import axios from "axios";

// Detect production vs local
const BASE_URL = import.meta.env.PROD
  ? "https://school-app-backend-j6ew.onrender.com/api"
  : "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// Fix FormData — let browser set boundary
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

export default api;
