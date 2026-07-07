import React, { useState } from 'react';
import MediaTabbar from '../../components/auth/MediaTabbar';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmedPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authService.signup(formData);
  };

  return (
    <div className="relative sm:top-10 md:top-12 mx-auto w-full sm:w-[400px] flex items-center flex-col flex-start">
      <h1 className="text-blue text-5xl text-center font-semibold m-5">Fotobook Signup</h1>
      <MediaTabbar></MediaTabbar>
      <div className="flex w-full flex-col items-center justify-center py-8">
        {/* Container Card */}
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">First Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Password Confirmation */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">
                Password Confirmation
              </label>
              <input
                name="confirmedPassword"
                type="password"
                placeholder="Password"
                value={formData.confirmedPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Signup Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3b5998] hover:bg-[#2d4373] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b5998]"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
        <div className="text-center pt-8">
          <a
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-[#3b5998] hover:text-[#2d4373] cursor-pointer"
          >
            Has an account
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
