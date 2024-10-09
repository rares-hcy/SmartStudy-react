import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve the accounts stored in localStorage
    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // Find if there is an account that matches the input email and password
    const account = storedAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    // Check if account exists
    if (account) {
      // Store the logged-in email in localStorage
      localStorage.setItem('loggedInEmail', email);

      // Successful login
      alert('Login successful!');
      setErrorMessage('');
      navigate('/dashboard');  // Redirect to Dashboard after successful login
    } else {
      // If no account matches
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="logo-section">
        <div className="circle"></div>
        <h1 className="title">StudySmart</h1>
        <p className="subtitle">Your AI Study Companion</p>
      </div>

      <div className="form-section">
        <h2>Log in</h2>
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
          <button type="submit">Log in using Email</button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <p className="login-link">
          You don't have an account yet? <Link to="/register">Sign up now</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
