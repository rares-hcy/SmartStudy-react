import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './Login.css';
import logoImage from '../assets/Logo.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve stored accounts from localStorage
    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    
    // Check if the email exists and the password matches
    const account = storedAccounts.find(acc => acc.email === email);

    if (account && account.password === password) {
      // Successful login
      console.log("Login successful!");
      navigate('/today'); // Redirect to the Today page
    } else {
      // Login failed
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="circle">
        <img src={logoImage} alt="Logo" className="logo-image" />
      </div>
      <h1>StudySmart</h1> {/* Title outside the card */}
      <p className="subtitle">Your AI Study Companion</p> {/* Subtitle outside the card */}
      <div className="login-form-container"> {/* Enhanced card container */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log in using Email</button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
        <p className="login-link">
          You don't have an account yet? <a href="/register">Sign up now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
