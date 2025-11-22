import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // This proxy ONLY works in development — it's GOOD to keep!
    proxy: {
      "/api": {
        target: "https://school-app-backend-9kjf.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
