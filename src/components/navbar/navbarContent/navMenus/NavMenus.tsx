import Cart from "./cart/Cart";
import User from "./User";

const NavMenus = () => {
  return (
    <>
      {/* Nav Menus */}
      <div className="hidden md:flex items-center gap-4">
        <span className="cursor-pointer flex items-center gap-2 p-[6px] rounded-[4px] hover:bg-greylight duration-700">
          <img src="/icons/help.png" alt="Help icon" /> Help
        </span>
        <User />
        <Cart />
      </div>
    </>
  );
};

export default NavMenus;