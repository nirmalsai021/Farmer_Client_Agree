// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isClientRoute = location.pathname.startsWith('/client');
  const isFarmerRoute = location.pathname.startsWith('/farmer');

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">AgriSphere</Link>
      </div>

      <ul className="nav-links">
        {isClientRoute ? (
          <>
            <li><Link to="/client/login">Login</Link></li>
            <li><Link to="/client/register">Register</Link></li>
          </>
        ) : isFarmerRoute ? (
          <>
            <li><Link to="/farmer/login">Login</Link></li>
            <li><Link to="/farmer/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/client">Client</Link></li>
            <li><Link to="/farmer">Farmer</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
