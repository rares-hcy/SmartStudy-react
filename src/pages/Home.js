import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="card"> {/* Enhanced Card container */}
        <div className="text-container">
          <h1 className="main-title">SmartStudy</h1>
          <p className="subtitle">Your AI Study Companion</p>
        </div>
        <div className="button-container">
          <Link to="/login">
            <button className="home-button">Login</button>
          </Link>
          <Link to="/register">
            <button className="home-button">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
