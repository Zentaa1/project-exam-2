import { FaCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-customGray text-white py-4 mt-10">
      <div className="text-center h-44 flex justify-center items-center">
        <p className="flex justify-center items-center text-sm">
          <FaCopyright className="mr-2" />
          {new Date().getFullYear()} StayNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
