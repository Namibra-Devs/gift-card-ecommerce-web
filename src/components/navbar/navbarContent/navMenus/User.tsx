import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../../../context/useAuth";
import { UseAuthProfile } from "../../../../context/profile/UseAuthProfile";
import { Link } from "react-router-dom";
const User = () => {
  const [userOpen, setUserOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { user } = UseAuthProfile();

  return (
    <>
      <div className="relative">
        <a
          href={`${isAuthenticated ? "#" : "/login"}`}
          onClick={() => {
            if (isAuthenticated) {
              setUserOpen(!userOpen);
            } else {
              setUserOpen(false);
            }
          }}
          className={`flex items-center gap-1 cursor-pointer rounded-[4px] p-[6px] ${
            userOpen
              ? "bg-greylight rounded-[4px]"
              : "hover:bg-greylight duration-700"
          } `}
        >
          <img src="/icons/user-line.png" alt="User" />
          {isAuthenticated ? (
            <>
              <span className="h-3 w-3 flex items-center rounded-full border-2 bg-green-500 animate-pulse absolute top-1.5 left-4"></span>
              <span className="text-greynormal">{user?.firstName}</span>
            </>
          ) : (
            <a href="/login" type="button">
              Login
            </a>
          )}
        </a>
        {isAuthenticated && userOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bg-white z-50 p-1.5 shadow-md border border-gray-100 rounded-[8px] left-0 right-0 top-10  w-[164px] "
          >
            <div
              className="flex flex-col items-start gap-2"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dropdown
            >
              <Link
                onClick={() => {setUserOpen(false)}}
                to="/account"
                className="min-w-full text-left px-[16px] py-[10px] rounded-[8px] hover:bg-greylight cursor-pointer"
              >
                Account
              </Link>
              <Link
                onClick={() => {setUserOpen(false)}}
                to="/orders"
                className="min-w-full text-left px-[16px] py-[10px] rounded-[8px] hover:bg-greylight cursor-pointer"
              >
                Orders
              </Link>
              <button
                onClick={logout}
                className="min-w-full text-left px-[16px] py-[10px] rounded-[8px] hover:bg-greylight cursor-pointer"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default User;
