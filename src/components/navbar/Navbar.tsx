import NavbarContent from "./navbarContent/NavbarContent";

const Navbar = () => {
  return (
    <div className="sticky top-0 inset-x-0 z-50 border-b border-greylight">
      <NavbarContent />
    </div>
  );
};

export default Navbar;
