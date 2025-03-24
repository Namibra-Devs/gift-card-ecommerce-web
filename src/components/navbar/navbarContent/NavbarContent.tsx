import NavbarMain from "./NavbarMain";
import NavbarMini from "./NavbarMini";

const NavbarContent = () => {
  return (
    <div className="bg-white">
      <NavbarMini />
      <NavbarMain isAuthenticated={false} />
    </div>
  );
};

export default NavbarContent;
