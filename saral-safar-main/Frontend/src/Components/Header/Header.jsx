/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import './Header.css';
import { assets } from '../../assets/assets'; // Adjust the import for assets

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownVisible(false); // Close the dropdown on logout
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    const googleTranslateElement = document.querySelector('.goog-te-combo');
    if (googleTranslateElement) {
      googleTranslateElement.value = language;
      googleTranslateElement.dispatchEvent(new Event('change'));
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={assets.SS_logo2} alt="Logo" className="logo-image" />
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/live-tracking">Live Tracking</Link></li>
          <li><a href="#contact">Contact</a></li>
          {isAuthenticated ? (
            <li className="profile-dropdown" onClick={toggleDropdown}>
              <img src={assets.profile_icon} alt="Profile" className="profile-image" />
              {dropdownVisible && (
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={handleLogout}>
                    <span>Logout</span>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>

      {/* Language Selector */}
      <select className="language-selector" onChange={handleLanguageChange}>
        <option value="">🌐 Language</option>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="es">Spanish</option>
      </select>
    </header>
  );
};

export default Header;