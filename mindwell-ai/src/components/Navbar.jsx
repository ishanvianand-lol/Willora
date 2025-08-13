import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AuthContext from "../context/AuthContext";
import JournalPage from "./JournalPage";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center bg-black bg-opacity-20 backdrop-blur-sm">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold font-sans text-white">
          Willora
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center text-white">
          <Link to="/" className="hover:text-[#f2e8d5] transition">Home</Link>
          <Link to="/features" className="hover:text-[#f2e8d5] transition">Features</Link>
          <Link to="/journal" className="hover:text-[#f2e8d5] transition">Journal</Link>
          <Link to="/contact" className="hover:text-[#f2e8d5] transition">Contact</Link>

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
        <div className="md:hidden text-white">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-30 backdrop-blur-sm px-6 py-4 space-y-3 text-white">
          <Link to="/" className="block hover:text-[#f2e8d5] transition">Home</Link>
          <Link to="/features" className="block hover:text-[#f2e8d5] transition">Features</Link>
          <Link to="/about" className="block hover:text-[#f2e8d5] transition">About</Link>
          <Link to="/contact" className="block hover:text-[#f2e8d5] transition">Contact</Link>

          {user ? (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="block px-4 py-2 bg-[#c9a17a] rounded-lg hover:bg-[#b28e63] transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-2 bg-[#7a6c57] rounded-lg hover:bg-[#635843] transition">
                Login
              </Link>
              <Link to="/register" className="block px-4 py-2 bg-[#c9a17a] rounded-lg hover:bg-[#b28e63] transition">
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
