import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPassword from "./pages/auth/RecoverPassword";
import UpdatePassword from "./pages/auth/UpdatePassword";
import { useAuth } from "./context/useAuth";
import GiftCardDetailsPage from "./pages/auth/GiftCardDetailsPage";
import CartPage from "./pages/auth/CartPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import PageNotFoundPage from './pages/PageNotFoundPage';
import Account from './pages/auth/Account';

const App: React.FC = () => {
  const { isAuthenticated, logoutSignInMessage } = useAuth();
  const hideFooterRoutes = ["/login", "/register", "*"];
  const hideNavbarRoutes = ["/login", "/register", "*"];

  return (
    <Router>
       <div className="flex items-center justify-center">
       {logoutSignInMessage && (
          <span
            className="absolute top-5 bg-white text-grey text-xs border-l-2 rounded-md border-yellow-400 px-4 py-2 transition-transform duration-500 ease-in-out translate-y-[-50px] opacity-0 animate-show">
            {logoutSignInMessage}
          </span>
        )}
       </div>
        
        <>
          {/* Conditionally render Footer */}
          {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
      
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={isAuthenticated ? <Account/> : <Navigate to="/login"/>}/>
              <Route path="/recover-password" element={isAuthenticated ? <RecoverPassword /> : <Navigate to="/login"/>} />
              <Route path="/update-password" element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/login"/>} />
              <Route path="/cart" element={isAuthenticated ? <CartPage /> : <Navigate to="/login"/>} />
              <Route path="/gift-cards/:id" element={isAuthenticated ? <GiftCardDetailsPage /> : <Navigate to="/login"/>} />
            </Route>
            <Route path="*" element={<PageNotFoundPage />} />
          </Routes>
          {/* Conditionally render Footer */}
          {!hideFooterRoutes.includes(location.pathname) && <Footer />}
        </>
    </Router>
  );
};

export default App;
