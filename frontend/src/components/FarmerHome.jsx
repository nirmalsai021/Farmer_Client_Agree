// src/components/FarmerHome.jsx
import React from 'react';
import './Home.css';
import { Player } from '@lottiefiles/react-lottie-player';
import farmerAnimation from '../assets/lotties/farmer-animation.json';
import { useNavigate } from 'react-router-dom';

const FarmerHome = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/farmer/login');
  };

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div className="home-content">
          <div className="home-left">
            <h1>Welcome to AgriSphere, Farmer!</h1>
            <p>
              Join AgriSphere to gain direct access to clients eager for fresh, local, and organic produce.
              Eliminate intermediaries and enjoy better profits with our trusted marketplace.
            </p>
            <p>
              Manage your listings, connect with buyers, and build a loyal customer base — all through an easy-to-use platform built for your success.
            </p>
            <button className="explore-btn" onClick={handleExploreClick}>
              Start Selling
            </button>
          </div>

          <div className="home-right">
            <Player
              autoplay
              loop
              src={farmerAnimation}
              style={{ height: '300px', width: '300px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerHome;
