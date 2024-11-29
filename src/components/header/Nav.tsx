import { Link, useNavigate } from "react-router-dom";
import staynest from "../../assets/Staynest.png";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import getProfile from "../../functions/api/getProfile";
import { useEffect, useState } from "react";
import LogoutModal from "./LogoutModal";  // Import the modal component

const Nav = () => {
  const [profileObj, setProfileObj] = useState<{ name: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("profile");
    setProfileObj(null);
    navigate("/");
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true); // Open the modal when logout button is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const confirmLogout = () => {
    handleLogout();
    closeModal(); // Close the modal after confirming logout
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
          <nav>
            <ul className="flex space-x-6 text-xl font-semibold">
              <Link to="/rentout">Rent out your place</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/about">About Us</Link>

              {!profileObj ? (
                <>
                  <Link to="/register">Register</Link>
                  <Link to="/login">Login</Link>
                </>
              ) : (
                <>
                  <Link to={`/profile/${profileObj.name}`} className="flex items-center space-x-2">
                    <FaUserCircle /> <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center space-x-2"
                  >
                    <FaSignOutAlt /> <span>Logout</span>
                  </button>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default Nav;
