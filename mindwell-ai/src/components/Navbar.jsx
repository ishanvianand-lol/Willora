import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-indigo-600 text-white">
      <h1 className="text-xl font-bold">MindwellAI</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/journal">Journal</Link>
        {isLoggedIn ? (
          <button onClick={onLogout} className="hover:underline">Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;