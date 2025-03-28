import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import App from "./App";
import "swiper/swiper-bundle.css";
import "antd/dist/reset.css";
import { AuthProvider } from "./context/AuthContext";
import { AuthProfileProvider } from "./context/profile/AuthProfileContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AuthProfileProvider>
        <App />
      </AuthProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);
