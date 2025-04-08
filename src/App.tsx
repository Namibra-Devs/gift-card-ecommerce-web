import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPassword from "./pages/RecoverPassword";
import UpdatePassword from "./pages/UpdatePassword";
import AccountMain from "./components/account/AccountMain";
import { useAuth } from "./context/useAuth";
import GiftCardDetailsPage from "./pages/GiftCardDetailsPage";
import CartPage from "./pages/CartPage";

const App = () => {
  const { isAuthenticated, logoutMessage } = useAuth();
  console.log("User is authenticated:", isAuthenticated); // Example usage

  return (
    <Router>
      <div>
       <div className="flex items-center justify-center">
       {logoutMessage && (
          <span
            className="absolute top-5 bg-green-300 text-greynormal px-4 py-2 transition-transform duration-500 ease-in-out translate-y-[-50px] opacity-0 animate-show">
            {logoutMessage}
          </span>
        )}
       </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/account" element={isAuthenticated ? <AccountMain /> : ""}/>

          <Route path="/cart" element={<CartPage />} />
          <Route path="/card-details" element={<GiftCardDetailsPage />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
