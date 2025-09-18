import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const AuthNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">AgriSphere</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/client">Client</Link>
        <Link to="/farmer">Farmer</Link>
      </div>
    </nav>
  );
};

export default AuthNavbar;
