import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useAuth } from './context/AuthContext';

function Login({ onClose }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('register'); // 'register' or 'login'

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.user) {
        login(data.user);
        setMessage('Registration successful!');
        setTimeout(() => { if (onClose) onClose(); }, 1200);
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
    setLoading(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok && data.user) {
        login(data.user); // <-- Make a personal account
        setMessage('Login successful!');
        setTimeout(() => { if (onClose) onClose(); }, 1200);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setMessage('');
    try {
      const token = credentialResponse.credential;
      const userInfo = jwtDecode(token);
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          password: 'google-auth-' + Date.now()
        }),
      });
      const data = await response.json();
      if (response.ok && data.user) {
        login(data.user);
        setMessage('Google login successful!');
        setTimeout(() => { if (onClose) onClose(); }, 1200);
      } else {
        setMessage(data.message || 'Google login failed');
      }
    } catch (error) {
      setMessage('Google login error');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-t-lg font-bold ${tab === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setTab('register')}
        >
          Register
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-bold ${tab === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setTab('login')}
        >
          Login
        </button>
      </div>

      {tab === 'register' && (
        <>
          <div className="flex justify-center mt-2">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setMessage('Google Login Failed')}
            />
          </div>
          <form onSubmit={handleRegisterSubmit} className="mt-4 w-full max-w-md">
            <div className="mb-4">
              <label className="block text-lg font-semibold text-black/80">Name</label>
              <input
                type="text"
                name="name"
                className="border-2 border-black/20 mt-2 rounded-lg w-full h-[40px] px-2"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold text-black/80">Email</label>
              <input
                type="email"
                name="email"
                className="border-2 border-black/20 mt-2 rounded-lg w-full h-[40px] px-2"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold text-black/80">Password</label>
              <input
                type="password"
                name="password"
                className="border-2 border-black/20 mt-2 rounded-lg w-full h-[40px] px-2"
                placeholder="*******"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            {message && (
              <div className={`p-2 rounded mb-4 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}
            <button
              type="submit"
              className="hover:bg-blue-400 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg mt-4 w-full"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Register'}
            </button>
          </form>
        </>
      )}

      {tab === 'login' && (
        <>
          <div className="flex justify-center mt-2">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setMessage('Google Login Failed')}
            />
          </div>
          <form onSubmit={handleLoginSubmit} className="mt-4 w-full max-w-md">
            <div className="mb-4">
              <label className="block text-lg font-semibold text-black/80">Email</label>
              <input
                type="email"
                name="email"
                className="border-2 border-black/20 mt-2 rounded-lg w-full h-[40px] px-2"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleLoginInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold text-black/80">Password</label>
              <input
                type="password"
                name="password"
                className="border-2 border-black/20 mt-2 rounded-lg w-full h-[40px] px-2"
                placeholder="*******"
                value={loginData.password}
                onChange={handleLoginInputChange}
                required
              />
            </div>
            {message && (
              <div className={`p-2 rounded mb-4 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}
            <button
              type="submit"
              className="hover:bg-blue-400 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg mt-4 w-full"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Login;