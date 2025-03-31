import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPassword from "./pages/RecoverPassword";
import UpdatePassword from "./pages/UpdatePassword";
import AccountMain from "./components/account/AccountMain";
import { useAuth } from "./context/useAuth";

const App = () => {
  const { isAuthenticated, logoutMessage } = useAuth();
  console.log("User is authenticated:", isAuthenticated); // Example usage

  return (
    <BrowserRouter basename="">
      <div>
        {logoutMessage && (
          <div
            className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-300 text-greynormal px-4 py-2 transition-transform duration-500 ease-in-out translate-y-[-50px] opacity-0 animate-show">
            {logoutMessage}
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route
            path="/account"
            element={isAuthenticated ? <AccountMain /> : ""}
          />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
