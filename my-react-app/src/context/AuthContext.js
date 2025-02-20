// 
import React, { createContext, useState, useEffect } from 'react';
import { login, logout, register } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Optionally, implement a token/session check here.
    // For example, you could check local storage for a token and validate it.
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const responseData = await login(username, password);
      console.log("Login response:", responseData);
      setUser({ username });
      setIsAdmin(responseData.is_admin);
      return responseData.is_admin;
    } catch (error) {
      console.error("Login error:", error);
      // Optionally display an error message to the user here
      throw error;
    }
  };
  

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsAdmin(false);
    }
  };

  const handleRegister = async (username, email, password, isAdmin = false) => {
    try {
      await register(username, email, password, isAdmin);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, handleLogin, handleLogout, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

