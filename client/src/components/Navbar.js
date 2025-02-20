import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/./Navbar.css';
import assests from "../assets/logo.jpg"
import user_avator from"../assets/profile_icon.png"

const Navbar = () => {
  const { user, isAdmin, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  const userAvator = user_avator;

  // Close the mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
          <img src={assests} alt="E-Commerce Logo" className="logo-image" />
  
        </Link>

        {/* Hamburger Menu Toggle (visible on small screens) */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>

        {/* Navigation Links */}
        <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className="nav-link" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="nav-link" onClick={handleLinkClick}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link" onClick={handleLinkClick}>
              Cart
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link" onClick={handleLinkClick}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link" onClick={handleLinkClick}>
              Contact
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/admin" className="nav-link" onClick={handleLinkClick}>
                Admin
              </Link>
            </li>
          )}
        </ul>

        {/* User Actions */}
        <div className="navbar-actions">
          {user ? (
            <div className="profile-menu">
              <button className="profile-button" onClick={toggleProfileMenu}>
                <img
                  src={user.avatar || userAvator}
                  alt="Profile"
                  className="profile-avatar"
                />
                <span className="profile-name">{user.username}</span>
                <i className="dropdown-icon">&#9660;</i>
              </button>
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <Link to="/account" className="dropdown-link" onClick={() => setIsProfileOpen(false)}>
                    My Account
                  </Link>
                  <Link to="/orders" className="dropdown-link" onClick={() => setIsProfileOpen(false)}>
                    My Orders
                  </Link>
                  <button onClick={handleLogoutClick} className="dropdown-link logout-button">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link auth-link" onClick={handleLinkClick}>
                Login
              </Link>
              <Link to="/register" className="nav-link auth-link" onClick={handleLinkClick}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
