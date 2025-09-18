import React from 'react';
import './Home.css';
import Footer from './Footer';
import { Player } from '@lottiefiles/react-lottie-player';
import farmAnimation from '../assets/lotties/farm-animation.json';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/client'); // Use ONLY /client to avoid duplicates
  };

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div className="home-content">
          <div className="home-left">
            <h1>Welcome to AgriSphere</h1>
            <p>
              AgriSphere bridges the gap between clients and farmers by delivering seamless solutions
              for modern agriculture. Whether you're a farmer seeking direct market access or a client
              looking for organic produce and sustainable partnerships — AgriSphere is your digital ecosystem.
            </p>
            <p>
              With a user-friendly interface, secure transactions, and a commitment to green technology,
              we aim to revolutionize how agriculture connects with the world.
            </p>
            <button
              className="explore-btn"
              onClick={handleExploreClick}
            >
              Explore Now
            </button>
          </div>

          <div className="home-right">
            <Player
              autoplay
              loop
              src={farmAnimation}
              style={{ height: '300px', width: '300px' }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
