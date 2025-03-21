import { motion } from "framer-motion";
import { useState } from "react";
import UserIcon from "../../../../../public/icons/user-line.png";
const User = () => {
  const [userOpen, setUserOpen] = useState(false);
  const isAuthenticated = true; // 
  return (
    <>

        <div className="relative">
          <div
            onClick={() => setUserOpen(!userOpen)}
            className={`flex items-center gap-2 cursor-pointer p-[6px] ${userOpen ? "bg-greylight rounded-[4px]" : ""} `}
          >
            <img src={UserIcon} alt="User" className="" />
            {isAuthenticated ? (
              <span className="text-greynormal">Paul</span>
            ) : (
              <a href="/login" className="text-greynormal">Login</a>)}
          </div>
          {isAuthenticated && userOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bg-white p-2 shadow-md border border-gray-100 rounded-[8px] left-0 right-0 top-10  w-[164px] "
            >
              <div className="flex flex-col gap-2">
                <a href="#" className="px-[16px] py-[10px] rounded-[8px] hover:bg-greylight cursor-pointer">
                  Account
                </a>
                <a href="#" className="px-[16px] py-[10px] rounded-[8px] hover:bg-greylight cursor-pointer">
                  Orders
                </a>
              </div>
            </motion.div>
          )}
        </div>
    </>
  );
};

export default User;
