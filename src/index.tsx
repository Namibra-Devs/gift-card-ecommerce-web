import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./style/global.css";
import "swiper/swiper-bundle.css";
import App from "./App";
import "swiper/swiper-bundle.css";
import "antd/dist/reset.css";
import { AuthProvider } from "./context/AuthContext";
import { AuthProfileProvider } from "./context/profile/AuthProfileContext";

import { CartProvider } from "./context/cart/CartContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AuthProfileProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);
