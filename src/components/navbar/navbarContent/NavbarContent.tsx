import NavbarMain from "./NavbarMain";
import NavbarMini from "./NavbarMini";

const NavbarContent = () => {
  return (
    <div className="bg-white">
      <NavbarMini />
      <NavbarMain />
    </div>
  );
};

export default NavbarContent;
