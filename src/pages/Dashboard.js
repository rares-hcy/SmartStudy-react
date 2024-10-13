import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';  // Import the CSS file for styling
import AddTask from './AddTask';  // Import the AddTask component

function Dashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [projects, setProjects] = useState([]);
  const [showProjects, setShowProjects] = useState(false);
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false); // Control popup visibility

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('loggedInEmail');
    if (email) {
      setUserEmail(email);
    }

    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(storedProjects);
  }, []);

  const toggleProjects = () => {
    setShowProjects(!showProjects);
  };

  const handleNotificationClick = () => {
    alert('You clicked the notifications icon!');
  };

  const handleTodayClick = () => {
    navigate('/today');
  };

  const handleAddTaskClick = () => {
    setShowAddTaskPopup(true); // Show the popup when "Add Task" is clicked
  };

  const closeAddTaskPopup = () => {
    setShowAddTaskPopup(false); // Close the popup
  };

  // Redirect to Coming Soon when Templates or Filters are clicked
  const handleTemplatesClick = () => {
    navigate('/coming-soon');
  };

  const handleFiltersClick = () => {
    navigate('/coming-soon');
  };

  return (
    <div className="dashboard-container">
      {/* Top bar */}
      <header className="top-bar">
        <div className="logo-container">
          <img src="https://img.icons8.com/material-outlined/65/diversity.png" alt="AI Study Companion Logo" className="logo" />
          <div className="title-container">
            <h1 className="main-title">StudySmart</h1>
            <h2 className="app-title">Your AI Study Companion</h2>
          </div>
        </div>
      </header>

      {/* Main content with sidebar and content area */}
      <div className="main-content">
        {/* Sidebar */}
        <nav className="sidebar">
          <div className="user-info">
            <img src="https://api.iconify.design/mdi:account-circle.svg" alt="User Profile" className="user-icon" />
            <span className="user-email">{userEmail}</span>
            <img
              src="https://api.iconify.design/mdi:bell-outline.svg"
              alt="Notifications Icon"
              className="notification-icon"
              title="Notifications"
              onClick={handleNotificationClick}
            />
          </div>

          <a href="#" className="menu-item" onClick={handleAddTaskClick}>
            <img src="https://api.iconify.design/mdi:plus-circle.svg" alt="Add Task Icon" className="menu-icon" />
            <span>Add Task</span>
          </a>

          <a href="#" className="menu-item">
            <img src="https://api.iconify.design/mdi:magnify.svg" alt="Search Icon" className="menu-icon" />
            <span>Search</span>
          </a>

          <a href="#" className="menu-item">
            <img src="https://api.iconify.design/mdi:inbox.svg" alt="Inbox Icon" className="menu-icon" />
            <span>Inbox</span>
          </a>

          <div className="menu-item" onClick={handleTodayClick}>
            <img src="https://api.iconify.design/mdi:calendar.svg" alt="Today Icon" className="menu-icon" />
            <span>Today</span>
          </div>

          <a href="#" className="menu-item" onClick={handleFiltersClick}>
            <img src="https://api.iconify.design/mdi:filter.svg" alt="Filters Icon" className="menu-icon" />
            <span>Filters</span>
          </a>

          <div className="projects-section">
            <div className="projects-header">
              <span>My Projects</span>
              <div className="projects-controls">
                <button className="project-add-button">
                  <img src="https://api.iconify.design/mdi:plus-circle.svg" alt="Add Project" title="Create New Project" onClick={handleTemplatesClick} />
                </button>
                <button className="project-toggle-button" onClick={toggleProjects}>
                  <img src={`https://api.iconify.design/mdi:chevron-${showProjects ? 'down' : 'right'}.svg`} alt="Toggle Projects" />
                </button>
              </div>
            </div>
            {showProjects && (
              <div className="projects-dropdown">
                {projects.length > 0 ? (
                  projects.map((project, index) => <div key={index} className="project-item">{project}</div>)
                ) : (
                  <div className="no-projects">No projects yet</div>
                )}
              </div>
            )}
          </div>

          <div className="templates-section">
            <a href="#" className="menu-item" onClick={handleTemplatesClick}>
              <img src="https://api.iconify.design/mdi:file-document-outline.svg" alt="Templates Icon" className="menu-icon" />
              <span>Templates</span>
            </a>
          </div>
        </nav>

        {/* Content area */}
        <div className="content-area">
          <h1 className="page-title">Dashboard</h1>
          <div className="dashboard-content">
            {/* Your content goes here */}
          </div>
        </div>
      </div>

      {/* Add Task popup */}
      {showAddTaskPopup && <AddTask onClose={closeAddTaskPopup} />}
    </div>
  );
}

export default Dashboard;
