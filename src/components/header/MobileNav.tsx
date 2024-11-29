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
    // Close the menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // Adding event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    setProfileObj(null);
    navigate("/");
  };

  // Close the menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full shadow-md">
      <header>
        <div className="container mx-auto flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/">
              <img src={staynest} alt="StayNest logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl focus:outline-none"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu (Toggle Visibility) */}
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div> {/* Backdrop */}
            <div
              ref={menuRef} // Attach the ref to the menu container
              className="fixed right-0 top-0 w-4/5 sm:w-2/3 md:w-1/2 h-full bg-white py-4 px-6 z-20 shadow-xl transition-all ease-in-out duration-300 transform"
            >
              {/* Close Button (X) */}
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
                    onClick={handleLinkClick} // Close menu when clicked
                    className="block py-2 hover:text-primary"
                  >
                    Rent out your place
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={handleLinkClick} // Close menu when clicked
                    className="block py-2 hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    onClick={handleLinkClick} // Close menu when clicked
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
                        onClick={handleLinkClick} // Close menu when clicked
                        className="block py-2 hover:text-primary"
                      >
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        onClick={handleLinkClick} // Close menu when clicked
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
                        onClick={handleLinkClick} // Close menu when clicked
                        className="py-2 flex items-center space-x-2 hover:text-primary"
                      >
                        <FaUserCircle /> <span>Profile</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          handleLinkClick(); // Close menu after logout
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
