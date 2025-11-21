// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// THIS IS THE MAGIC — fixes BOTH problems
api.interceptors.request.use((config) => {
  // For multipart uploads — let browser set Content-Type with boundary
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

export default api;
