import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ComingSoon.css'; // Import the CSS for styling

function ComingSoon() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const navigate = useNavigate(); // Hook to navigate between pages

  useEffect(() => {
    const targetDate = new Date('2024-12-31T00:00:00').getTime(); // Set the launch date

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });

      if (difference < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="coming-soon-container">
      {/* Coming Soon Message */}
      <header className="top-bar">
        <div className="logo-container">
          <img src="https://img.icons8.com/material-outlined/65/diversity.png" alt="AI Study Companion Logo" className="logo" />
          <div className="title-container">
            <h1 className="main-title">StudySmart</h1>
            <h2 className="app-title">Your AI Study Companion</h2>
          </div>
        </div>
      </header>

      {/* Countdown Section */}
      <div className="coming-soon-content">
        <h1>Coming Soon</h1>
        <p>We're working hard to bring you something amazing. Stay tuned!</p>
        <div className="countdown-timer">
          <div className="time-box">
            <span>{countdown.days}</span>
            <small>Days</small>
          </div>
          <div className="time-box">
            <span>{countdown.hours}</span>
            <small>Hours</small>
          </div>
          <div className="time-box">
            <span>{countdown.minutes}</span>
            <small>Minutes</small>
          </div>
          <div className="time-box">
            <span>{countdown.seconds}</span>
            <small>Seconds</small>
          </div>
        </div>
      </div>

      {/* Notification Form */}
      <form className="notify-form">
        <input type="email" placeholder="Enter your email to get notified" />
        <button type="submit">Notify Me</button>
      </form>

      {/* Go Back Button */}
      <button className="go-back-button" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
}

export default ComingSoon;
