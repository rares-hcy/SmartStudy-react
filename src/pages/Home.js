import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // Assuming you want to style it separately

function Home() {
  return (
    <div className="home-container">
      <div className="button-container">
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
        <Link to="/register">
          <button className="home-button">Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
