import React from "react";
import { FaXTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6";

const FooterMini: React.FC = () => {
  return (
    <div className="bg-black text-white py-[5px] px-4 md:px-[255px] flex justify-between items-center">
      {/* Social Icons */}
      <div className="flex space-x-6">
        <FaXTwitter className="text-2xl cursor-pointer" />
        <FaLinkedin className="text-2xl cursor-pointer" />
        <FaYoutube className="text-2xl cursor-pointer" />
      </div>

      {/* Copyright */}
      <div className=" flex items-center gap-2"><span className="text-3xl">&copy;</span> <span>PrepaidBanc</span></div>
    </div>
  );
};

export default FooterMini;
