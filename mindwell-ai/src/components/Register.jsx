import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // ✅ NEW

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // ✅ start loading

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Registration failed');

      setSuccess('Registered successfully! Redirecting to home...');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full mb-4 p-2 border rounded"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

        <button
          type="submit"
          disabled={loading} // ✅
          className={`${
            loading ? 'bg-sky-300 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'
          } text-white px-4 py-2 rounded w-full transition`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
