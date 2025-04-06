import React from "react";
import { FaXTwitter} from "react-icons/fa6";
import { SlSocialYoutube } from "react-icons/sl";
import { ImLinkedin } from "react-icons/im";

const FooterMini: React.FC = () => {
  return (
    <div className="bg-black text-white py-[10px] px-4 md:px-[255px] flex justify-between items-center">
      {/* Social Icons */}
      <div className="flex gap-2 md:gap-4">
        <FaXTwitter className="text-lg md:text-2xl cursor-pointer" />
        <ImLinkedin className="text-lg md:text-2xl cursor-pointer" />
        <SlSocialYoutube className="text-lg md:text-2xl cursor-pointer" />
      </div>

      {/* Copyright */}
      <div className=" flex items-center gap-2"><img src="/icons/ncopy.png" alt="Copyright" className="h-5" /> <span className="text-xs md:text-sm">PrepaidBanc</span></div>
    </div>
  );
};

export default FooterMini;
