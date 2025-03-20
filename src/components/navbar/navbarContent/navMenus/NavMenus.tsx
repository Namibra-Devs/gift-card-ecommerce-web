import Cart from "./Cart";
import User from "./User";
import HelpIcon from "../../../../../public/icons/help.png";

const NavMenus = () => {

  return (
    <>
      {/* Nav Menus */}
      <div className="hidden md:flex items-center gap-6">
        <span className="cursor-pointer flex items-center gap-2"><img src={HelpIcon} alt="Help icon" /> Help</span>
        <User/>
        <Cart/>
      </div>
    </>
  );
};

export default NavMenus;
