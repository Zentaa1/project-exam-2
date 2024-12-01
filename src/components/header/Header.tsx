import MobileNav from "./MobileNav";
import Nav from "./Nav";

const Header = () => {
  return (
    <>
      <div className="hidden lg:block">
        <Nav />
      </div>
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </>
  );
};

export default Header;
