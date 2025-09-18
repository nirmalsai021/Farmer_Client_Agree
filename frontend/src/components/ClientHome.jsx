// src/components/ClientHome.jsx
import React from 'react';
import './Home.css';
import Footer from './Footer';
import { Player } from '@lottiefiles/react-lottie-player';
import marketAnimation from '../assets/lotties/market-animation.json';
import { useNavigate } from 'react-router-dom';

const ClientHome = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div className="home-content">
          {/* Left Section */}
          <div className="home-left">
            <h1>Welcome to AgriSphere, Client!</h1>
            <p>
              Discover fresh, locally-sourced produce directly from dedicated farmers — all in one place.
              At AgriSphere, we connect you to farm-fresh goods, transparent pricing,
              and the joy of supporting sustainable agriculture.
            </p>
            <p>
              Say goodbye to middlemen and enjoy high-quality organic products delivered straight from the
              source. Experience a smart, secure, and eco-conscious marketplace tailored just for you.
            </p>
            <button
              className="explore-btn"
              onClick={() => navigate('/client/login')}
            >
              Shop Now
            </button>
          </div>

          {/* Right Section */}
          <div className="home-right">
            <Player
              autoplay
              loop
              src={marketAnimation}
              style={{ height: '300px', width: '300px' }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientHome;
