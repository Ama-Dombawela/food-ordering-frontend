import React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          gutter={12}
          toastOptions={{
            duration: 3200,
            style: {
              background: "rgba(3, 7, 18, 0.96)",
              color: "#e2e8f0",
              border: "1px solid rgba(45, 212, 191, 0.25)",
              borderRadius: "16px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)",
            },
            success: {
              iconTheme: {
                primary: "#2dd4bf",
                secondary: "#06131c",
              },
            },
            error: {
              iconTheme: {
                primary: "#fb7185",
                secondary: "#1f0a0f",
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);