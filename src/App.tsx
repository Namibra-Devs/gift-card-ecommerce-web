import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RecoverPassword from "./pages/auth/RecoverPassword";
import UpdatePassword from "./pages/auth/UpdatePassword";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/useAuth";
import GiftCardDetailsPage from "./pages/auth/GiftCardDetailsPage";
import CartPage from "./pages/auth/CartPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import PageNotFoundPage from './pages/PageNotFoundPage';
import Account from './pages/auth/Account';

// Create a component that uses useLocation inside Router
const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/login"/>}/>
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login"/>}/>
          <Route path="/recover-password" element={isAuthenticated ? <RecoverPassword /> : <Navigate to="/login"/>} />
          <Route path="/update-password" element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/login"/>} />
          <Route path="/cart" element={isAuthenticated ? <CartPage /> : <Navigate to="/login"/>} />
          <Route path="/gift-cards/:id" element={isAuthenticated ? <GiftCardDetailsPage /> : <Navigate to="/login"/>} />
        </Route>
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
