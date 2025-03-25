import { motion } from "framer-motion";
import { useState } from "react";
import HambuggerIcon from "../../../../public/icons/menu.png";
import FavIcon from "../../../../public/favicon.png";
import CloseIcon from "../../../../public/icons/close.png";
import Search from "./search/Search";
import NavMenus from "./navMenus/NavMenus";
import { useAuth } from "../../../context/useAuth";

const NavbarMain = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useAuth();

  return (
    <>
      {/* NavbarMain */}
      <div className="flex items-center justify-between px-4 md:px-[100px] py-3">
        <div className="flex items-center gap-[10px]">
          {/* Logo */}
          <a href="/">
            <img src={FavIcon} alt="PrepaidBanc" />
          </a>

          <Search />
        </div>

        <NavMenus />

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <img src={CloseIcon} alt="X" className="w-6 h-6" />
            ) : (
              <img src={HambuggerIcon} alt="Hambugger" className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden flex flex-col items-start bg-white px-6 py-4 shadow-md"
          >
            <span className="py-2">Help</span>
            {isAuthenticated ? (
              <>
                <span className="py-2">Account</span>
                <span className="py-2">Orders</span>
              </>
            ) : (
              <span className="py-2">Login</span>
            )}
            <span className="py-2">Cart</span>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default NavbarMain;
