import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-transparent fixed top-0 left-0 w-full p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-3xl font-bold text-white hover:text-gray-300 transition-colors">
          Book Flow
        </Link>

        {/* Navbar Links */}
        <div className="space-x-6 hidden md:flex">
          <Link
            to="/home"
            className="text-white hover:text-gray-300 transition-colors text-lg"
          >
            Home
          </Link>
          <Link
            to="/appointments"
            className="text-white hover:text-gray-300 transition-colors text-lg"
          >
            Appointments
          </Link>
          
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white hover:text-gray-300 text-xl">
            <i className="fas fa-bars"></i> 
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
