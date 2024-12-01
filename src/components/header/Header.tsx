import MobileNav from "./MobileNav";
import Nav from "./Nav";

const Header = () => {
  return (
    <>
      {/* Desktop Nav (hidden on small screens, visible on large screens) */}
      <div className="hidden lg:block">
        <Nav />
      </div>

      {/* Mobile Nav (visible only on small screens, hidden on large screens) */}
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </>
  );
};

export default Header;
