import { BiArrowFromLeft } from "react-icons/bi";

const NavbarMini = () => {
  return (
    <>
      {/* NavbarMini */}
      <div className="bg-greynormal text-white flex justify-center py-[10px]">
        <div className="cursor-pointer flex items-center justify-center gap-3">
          <span className="text-[14px] font-normal">News</span>
          <BiArrowFromLeft />
        </div>
      </div>
    </>
  );
};

export default NavbarMini;
