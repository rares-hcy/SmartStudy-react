import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../assets/Logo.png';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

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
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="circle">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <h1>StudySmart</h1> {/* Title outside the card */}
      <p className="subtitle">Your AI Study Companion</p> {/* Subtitle outside the card */}
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
            onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
}

export default Register;
