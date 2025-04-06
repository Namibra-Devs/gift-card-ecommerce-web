import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./style/global.css"
import "swiper/swiper-bundle.css";
import App from "./App";
import "swiper/swiper-bundle.css";
import "antd/dist/reset.css";
import { AuthProvider } from "./context/AuthContext";
import { AuthProfileProvider } from "./context/profile/AuthProfileContext";

//Redux
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AuthProfileProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);
