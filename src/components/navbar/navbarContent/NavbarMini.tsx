import Arrow from "../../../../public/icons/arrow-right.png";
const NavbarMini = () => {
  return (
    <>
      {/* NavbarMini */}
      <div className="bg-greynormal text-white flex justify-center py-[10px]">
        <div className="cursor-pointer flex items-center justify-center gap-3">
          <span className="text-[14px] font-normal">News</span>
          <img src={Arrow} alt="Arrow" className="h-[20px] -mb-1" />
        </div>
      </div>
    </>
  );
};

export default NavbarMini;
