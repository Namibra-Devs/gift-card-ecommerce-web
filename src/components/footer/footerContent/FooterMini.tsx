import React from "react";
import { FaXTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6";

const FooterMini: React.FC = () => {
  return (
    <div className="bg-black text-white py-[10px] px-4 md:px-[255px] flex justify-between items-center">
      {/* Social Icons */}
      <div className="flex space-x-6">
        <FaXTwitter className="text-2xl cursor-pointer" />
        <FaLinkedin className="text-2xl cursor-pointer" />
        <FaYoutube className="text-2xl cursor-pointer" />
      </div>

      {/* Copyright */}
      <p className="translate-y-1.5">&copy; PrepaidBanc</p>
    </div>
  );
};

export default FooterMini;
