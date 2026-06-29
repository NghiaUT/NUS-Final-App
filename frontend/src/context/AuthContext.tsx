import React, { createContext, useEffect, useState } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState({
    name: 'nghia',
    avatar_url:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  });
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  // useEffect run only once when the app is mounted.
  useEffect(() => {
    const initAuth = () => {
      console.log('1. Init Auth');
      const mock_login_data = {
        user: {
          id: 1,
          name: 'Nghia Tran',
          email: 'nghia@123.com',
          role: 'admin',
          avatar_url:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        },
        accessToken: 'Bearer token sample',
      };

      handleLoginData(mock_login_data);

      setLoading(false);
    };
    initAuth();
  }, []);

  const handleLoginData = ({ user, accessToken }) => {
    setUser(user);
    setAccessToken(accessToken);
    // More will be define later
  };

  const logout = () => {
    alert('Log the user out!');
    // setUser(null);
    // setAccessToken(null);
    // navigate("/");
  };

  if (loading) return <LoadingSpinner />;
  return (
    <AuthContext.Provider value={{ user, accessToken, logout, handleLoginData }}>
      {children}
    </AuthContext.Provider>
  );
};
