import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import RecoverPassword from "./pages/RecoverPassword";
import UpdatePassword from "./pages/UpdatePassword";
// import { useAuth } from "./context/useAuth";

const App = () => {
  // const {isAuthenticated} = useAuth();
  return (
    <BrowserRouter basename="">
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/account" element={<Account />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
