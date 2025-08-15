import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center bg-orange-100 bg-opacity-100 backdrop-blur-sm">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold font-sans text-lime-900 ">
          Willora
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 font-semibold items-center text-black">
          <Link to="/" className="hover:text-orange-950 transition">Home</Link>
          <Link to="/journal" className="hover:text-orange-950 transition">Journal</Link>
          <Link to="/community" className="hover:text-orange-950 transition">Community</Link>
          <Link to="/insights" className="hover:text-orange-950 transition">Insights</Link>

          {user ? (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="px-4 py-2 bg-[#c9a17a] rounded-lg hover:bg-[#b28e63] transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 bg-[#7a6c57] rounded-lg hover:bg-[#635843] transition">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-[#c9a17a] rounded-lg hover:bg-[#b28e63] transition">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-lime-900">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-30 backdrop-blur-sm px-6 py-4 space-y-3 text-white">
          <Link to="/" onClick={closeMenu} className="block hover:text-orange-950 transition">Home</Link>
          <Link to="/journal" onClick={closeMenu} className="block hover:text-orange-950 transition">Journal</Link>
          <Link to="/community" onClick={closeMenu} className="block hover:text-orange-950 transition">Community</Link>
          <Link to="/insights" onClick={closeMenu} className="block hover:text-orange-950 transition">Insights</Link>

          {user ? (
            <button
              onClick={() => {
                logout();
                navigate("/");
                closeMenu();
              }}
              className="block px-4 py-2 bg-[#c9a17a] rounded-lg hover:bg-[#b28e63] transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="block px-4 py-2 bg-[#7a6c57] rounded-lg hover:bg-[#635843] transition">
                Login
              </Link>
              <Link to="/register" onClick={closeMenu} className="block px-4 py-2 bg-[#c9a17a] rounded-lg hover:bg-[#b28e63] transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;