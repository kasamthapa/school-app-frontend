import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#333",
              color: "#fff",
              fontSize: "16px",
              padding: "16px",
              borderRadius: "12px",
            },
            success: { style: { background: "#10b981" }, icon: "Success" },
            error: { style: { background: "#ef4444" }, icon: "Error" },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
