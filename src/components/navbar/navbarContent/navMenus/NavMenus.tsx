import Cart from "./Cart";
import User from "./User";

const NavMenus = () => {

  return (
    <>
      {/* Nav Menus */}
      <div className="hidden md:flex items-center gap-6">
        <span className="cursor-pointer">Help</span>
        <User/>
        <Cart/>
      </div>
    </>
  );
};

export default NavMenus;
