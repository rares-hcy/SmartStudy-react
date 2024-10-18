import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../assets/Logo.png';
import zxcvbn from 'zxcvbn'; // Import zxcvbn

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: { suggestions: [] },
  }); // Initialize password strength state
  const [showSuggestions, setShowSuggestions] = useState(false); // Control whether to show suggestions
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);

    // First, use zxcvbn to calculate the strength immediately
    const strength = zxcvbn(pwd);
    setPasswordStrength(strength);

    // Optionally, make an API call for additional password suggestions
    if (showSuggestions) {
      setIsLoadingSuggestions(true);
      fetch(`/api/password-suggestions?password=${pwd}`)
        .then((response) => response.json())
        .then((suggestions) => {
          // Update password strength state with zxcvbn score and additional suggestions
          setPasswordStrength({
            ...strength,
            feedback: { suggestions }, // Replace suggestions from API
          });
          setIsLoadingSuggestions(false);
        })
        .catch((error) => {
          console.error('Error fetching suggestions:', error);
          setErrorMessage('Error fetching password suggestions. Please try again later.');
          setIsLoadingSuggestions(false);
        });
    }
  };

  const handleCheckboxChange = (e) => {
    setShowSuggestions(e.target.checked); // Toggle showSuggestions based on checkbox
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if AI suggestions box is checked and password is not strong enough
    if (showSuggestions && passwordStrength.score < 3) {
      setErrorMessage('Password must be at least Strong when using AI Suggestions.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const accountExists = storedAccounts.some((acc) => acc.email === email);

    if (accountExists) {
      setErrorMessage('Account with this email already exists');
      return;
    }

    const newAccount = { email, password };
    storedAccounts.push(newAccount);
    localStorage.setItem('accounts', JSON.stringify(storedAccounts));

    setErrorMessage('');
    navigate('/today');
  };

  // Function to provide suggestions based on the strength
  const renderPasswordSuggestions = () => {
    if (!passwordStrength || !showSuggestions) return null; // Return if suggestions are disabled

    if (isLoadingSuggestions) {
      return <div>Loading suggestions...</div>;
    }

    const { score, feedback: { suggestions = [] } } = passwordStrength; // Ensure suggestions is an array

    const strengthText = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
    const strengthColor = ["red", "orange", "#FFD700", "lightgreen", "green"];

    return (
      <div>
        <p style={{ color: strengthColor[score] }}>
          Password Strength: {strengthText[score]}
        </p>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="login-page">
      <div className="circle">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <h1>StudySmart</h1> {/* Title outside the card */}
      <p className="subtitle">Your AI Study Companion</p> {/* Subtitle outside the card */}
      <div className="form-and-strength-container"> {/* New container to hold form and strength box */}
        <div className="login-form-container"> {/* Enhanced card container */}
          <form onSubmit={handleSubmit}>
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
              onChange={handlePasswordChange} // Call handlePasswordChange
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Sign up using Email</button>
          </form>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <p className="login-link">
            You already have an account? <Link to="/login">Log in now</Link>
          </p>
        </div>

        {/* Password strength box with title and checkbox */}
        <div className="password-strength-box">
          <label>
            <input
              type="checkbox"
              checked={showSuggestions}
              onChange={handleCheckboxChange}
            />
            AI Password Suggestions
          </label>
          {renderPasswordSuggestions()} {/* Render suggestions only if checkbox is checked */}
        </div>
      </div>
    </div>
  );
}

export default Register;
