import Cart from "./cart/Cart";
import User from "./User";
import HelpIcon from "../../../../../public/icons/help.png";

const NavMenus = () => {
  return (
    <>
      {/* Nav Menus */}
      <div className="hidden md:flex items-center gap-6">
        <span className="cursor-pointer flex items-center gap-2 p-2 rounded-[4px] hover:bg-greylight duration-700">
          <img src={HelpIcon} alt="Help icon" /> Help
        </span>
        <User />
        <Cart />
      </div>
    </>
  );
};

export default NavMenus;
