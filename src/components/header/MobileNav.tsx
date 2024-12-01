import { Link, useNavigate } from "react-router-dom";
import staynest from "../../assets/Staynest.png";
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import getProfile from "../../functions/api/getProfile";
import { useEffect, useRef, useState } from "react";

const MobileNav = () => {
  const [profileObj, setProfileObj] = useState<{ name: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // To toggle the menu
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null); // To track the menu for outside click

  useEffect(() => {
    const profile = localStorage.getItem("profile");

    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setProfileObj(parsedProfile);

      getProfile(parsedProfile.name).catch((error) => {
        console.error("Error fetching profile data:", error);
      });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    setProfileObj(null);
    navigate("/");
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full shadow-md">
      <header>
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/">
              <img src={staynest} alt="StayNest logo" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="lg:hidden">
          <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="text-2xl focus:outline-none bg-transparent p-2"
  aria-label="Toggle menu"
>
  <FaBars size={30} className="text-black" />
</button>

          </div>
        </div>
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
            <div
              ref={menuRef}
              className="fixed right-0 top-0 w-4/5 sm:w-2/3 md:w-1/2 h-full bg-white py-4 px-6 z-20 shadow-xl transition-all ease-in-out duration-300 transform"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl focus:outline-none"
                >
                  <FaTimes />
                </button>
              </div>

              <ul className="space-y-4 text-lg font-medium">
                <li>
                  <Link
                    to="/rentout"
                    onClick={handleLinkClick}
                    className="block py-2 hover:text-primary"
                  >
                    Rent out your place
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={handleLinkClick}
                    className="block py-2 hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    onClick={handleLinkClick}
                    className="block py-2 hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>

                {!profileObj ? (
                  <>
                    <li>
                      <Link
                        to="/register"
                        onClick={handleLinkClick}
                        className="block py-2 hover:text-primary"
                      >
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        onClick={handleLinkClick}
                        className="block py-2 hover:text-primary"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to={`/profile/${profileObj.name}`}
                        onClick={handleLinkClick}
                        className="py-2 flex items-center space-x-2 hover:text-primary"
                      >
                        <FaUserCircle /> <span>Profile</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          handleLinkClick();
                        }}
                        className="py-2 flex items-center space-x-2 hover:text-primary"
                      >
                        <FaSignOutAlt /> <span>Logout</span>
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </>
        )}
      </header>
    </div> 
  );
};

export default MobileNav;
