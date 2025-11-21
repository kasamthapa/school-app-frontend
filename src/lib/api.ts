import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ← THIS IS CORRECT
  headers: {
    Accept: "application/json",
  },
});

// THIS LINE IS THE FINAL FIX — FORCE EVERY REQUEST TO SEND COOKIES
api.defaults.withCredentials = true;

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

export default api;
