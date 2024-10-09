import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Retrieve the current accounts stored in localStorage
    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // Check if the email is already registered
    const accountExists = storedAccounts.some((acc) => acc.email === email);

    if (accountExists) {
      setErrorMessage('Account with this email already exists');
      return;
    }

    // Create a new account and add it to the stored accounts
    const newAccount = { email, password };
    storedAccounts.push(newAccount);

    // Save the updated accounts list in localStorage
    localStorage.setItem('accounts', JSON.stringify(storedAccounts));

    // Clear error message and redirect to login page
    setErrorMessage('');
    alert('Registration successful! You can now log in.');
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="logo-section">
        <div className="circle"></div>
        <h1 className="title">StudySmart</h1>
        <p className="subtitle">Your AI Study Companion</p>
      </div>

      <div className="form-section">
        <h2>Create your account</h2>
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
