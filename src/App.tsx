import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPassword from "./pages/auth/RecoverPassword";
import UpdatePassword from "./pages/auth/UpdatePassword";
import AccountMain from "./components/account/AccountMain";
import { useAuth } from "./context/useAuth";
import GiftCardDetailsPage from "./pages/auth/GiftCardDetailsPage";
import CartPage from "./pages/auth/CartPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const App: React.FC = () => {
  const { isAuthenticated, logoutMessage } = useAuth();

  return (
    <Router>
      <div>
       <div className="flex items-center justify-center">
       {logoutMessage && (
          <span
            className="absolute top-5 bg-green-300 text-greynormal border-2 border-greylight px-4 py-2 transition-transform duration-500 ease-in-out translate-y-[-50px] opacity-0 animate-show">
            {logoutMessage}
          </span>
        )}
       </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
    
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={isAuthenticated ? <AccountMain /> : <Navigate to="/login"/>}/>
            <Route path="/recover-password" element={isAuthenticated ? <RecoverPassword /> : <Navigate to="/login"/>} />
            <Route path="/update-password" element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/login"/>} />
            <Route path="/cart" element={isAuthenticated ? <CartPage /> : <Navigate to="/login"/>} />
            <Route path="/card-details" element={isAuthenticated ? <GiftCardDetailsPage /> : <Navigate to="/login"/>} />
          </Route>
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
