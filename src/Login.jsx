import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

function Login({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful!');
        // Close the modal after successful registration
        if (onClose) setTimeout(onClose, 1500);
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
      console.error('Registration error:', error);
    }
  };
  
  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const userInfo = jwtDecode(token);
    console.log('User Info:', userInfo);
    
    // Register Google user in our backend
    fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
        password: 'google-auth-' + Date.now()
      }),
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center mt-4">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
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
          <div className={`p-2 rounded mb-4 ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <button type="submit" className="hover:bg-blue-400 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg mt-4 w-full">
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;