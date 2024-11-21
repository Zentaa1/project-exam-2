import { Link } from "react-router-dom";
import staynest from "../../assets/Staynest.png"

const Nav = () => {
  return (
    <div className="w-full shadow-md">
        <header>
            <div className="container mx-auto flex justify-between items-center py-4">
                <div className="flex items-center">
                    <Link to='/'><img src={staynest} alt="StayNest logo" className="h-8 w-auto" /></Link>
                </div>
                <nav>
                    <ul className="flex space-x-6 text-xl font-semibold">
                    <Link to='/rentout'>Rent out your place</Link>
                    <Link to='/contact'>Contact Us</Link>
                    <Link to='/about'>About Us</Link>
                    <Link to='/register'>Register</Link>
                    <Link to='/login'>Login</Link>
                    </ul>
                </nav>
            </div>
        </header>
    </div>
  );
};

export default Nav;
