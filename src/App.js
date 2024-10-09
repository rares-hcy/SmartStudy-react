import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';       // Home page
import Login from './pages/Login';     // Login page
import Register from './pages/Register';  // Register page
import Dashboard from './pages/Dashboard';  // Dashboard page
import Today from './pages/Today';     // Today page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/today" element={<Today />} />  {/* Route for Today page */}
      </Routes>
    </Router>
  );
}

export default App;
