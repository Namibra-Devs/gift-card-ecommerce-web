import { motion } from "framer-motion";
import { useState } from "react";
import Search from "./search/Search";
import NavMenus from "./navMenus/NavMenus";
import { useAuth } from "../../../context/useAuth";
import {Link} from "react-router-dom";

const NavbarMain = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {isAuthenticated} = useAuth();

  return (
    <>
      {/* NavbarMain */}
      <div className="flex items-center justify-between px-4 md:px-[100px] py-3">
        <div className="flex flex-col md:flex-row items-center gap-[10px] w-full md:w-auto">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <Link to="/" className="relative z-50">
              <img src="/favicon.png" alt="PrepaidBanc" />
            </Link>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden relative z-50">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                  <img src="/icons/close.png" alt="X" className="w-6 h-6" />
                ) : (
                  <img src="/icons/menu.png" alt="Hambugger" className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          <Search />
        </div>

        <NavMenus />

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 max-h-72 pt-20 md:hidden border-t-4 border-greynormal bg-white px-4 py-4 shadow-md"
          >
            <div className="flex flex-col items-start pt-2 mt-2 border-t border-greylight">
              <Link to="/help" className="py-2 text-grey hover:text-greynormal">Help</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/account" className="py-2 text-grey hover:text-greynormal">Account</Link>
                  <Link to="/orders" className="py-2 text-grey hover:text-greynormal">Orders</Link>
                  <button type="button" className="py-2 text-grey hover:text-greynormal">Logout</button>
                </>
              ) : (
                <Link to="/login" className="py-2 text-grey hover:text-greynormal">Login</Link>
              )}
              <Link to="/cart" className="py-2 text-grey hover:text-greynormal">Cart</Link>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default NavbarMain;
