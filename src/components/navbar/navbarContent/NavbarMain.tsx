import { motion } from "framer-motion";
import { useState } from "react";
import Search from "./search/Search";
import NavMenus from "./navMenus/NavMenus";
import { useAuth } from "../../../context/useAuth";
import {Link} from "react-router-dom";
import { UseAuthProfile } from "../../../context/profile/UseAuthProfile";

import { GoDotFill } from "react-icons/go";

const NavbarMain = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {isAuthenticated, logout} = useAuth();
   const {user} = UseAuthProfile();

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
            className="fixed inset-0 z-40 h-80 pt-20 md:hidden border-t-4 border-greynormal bg-white px-4 py-4 shadow-md"
          >
            <div className="flex flex-col items-start pt-2 mt-2 border-t border-greylight">
              <Link to="/help" className=" flex items-center gap-1 py-2 text-grey hover:text-greynormal"><img src="/icons/help.png" className="w-3.5" alt="Help icon" />Help</Link>
              
              {isAuthenticated ? (
                <>
                  <span className="flex items-center gap-1 py-2 text-grey hover:text-greynormal"><img src="/icons/user-line.png" className="w-4" alt="User" /> {user?.firstName} <GoDotFill className="text-green-500" /></span>
                  <Link onClick={() => {setMenuOpen(false)}} to="/account" className="flex items-center gap-1 py-2 text-grey hover:text-greynormal"><img src="/icons/user-line.png" className="w-4" alt="User" /> Account</Link>
                  <Link onClick={() => {setMenuOpen(false)}} to="/cart" className="flex items-center gap-1 py-2 text-grey hover:text-greynormal"><img src="/icons/shopping-cart.png" className="w-4 cursor-pointer" alt="Cart Icon"/>Cart</Link>
                  <Link onClick={() => {setMenuOpen(false)}} to="/orders" className="py-2 text-grey hover:text-greynormal">Orders</Link>
                  <button  onClick={logout} type="button" className="py-2 text-grey hover:text-greynormal">Logout</button>
                </>
              ) : (
                <>
                <Link to="/login" className="py-2 text-grey hover:text-greynormal">Login</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default NavbarMain;
