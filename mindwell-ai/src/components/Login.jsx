import { useState, useContext } from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; // ✅ use Link instead of <a>
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (!data.user || !data.token) {
        throw new Error('Invalid response from server');
      }

      login(data.user, data.token);
      navigate('/'); // ✅ Redirect after login
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email" // ✅ helps with autofill
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password" // ✅ helps with autofill
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105"
            aria-label="Login"
          >
            <LogIn className="inline-block w-5 h-5 mr-2" /> Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-pink-500 hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
