import React from "react";
import { FaXTwitter} from "react-icons/fa6";
import { SlSocialYoutube } from "react-icons/sl";
import { ImLinkedin } from "react-icons/im";

const FooterMini: React.FC = () => {
  return (
    <div className="bg-black text-white py-[10px] px-4 md:px-[255px] flex justify-between items-center">
      {/* Social Icons */}
      <div className="flex space-x-6">
        <FaXTwitter className="text-2xl cursor-pointer" />
        <ImLinkedin className="text-2xl cursor-pointer" />
        <SlSocialYoutube className="text-2xl cursor-pointer" />
      </div>

      {/* Copyright */}
      <div className=" flex items-center gap-2"><span className="text-3xl"><img src="/icons/ncopy.png" alt="Copyright" /></span> <span>PrepaidBanc</span></div>
    </div>
  );
};

export default FooterMini;
