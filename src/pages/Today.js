import React, { useEffect, useState } from 'react';
import './Today.css';

function Today() {  // Changed component name to Today
  const [userEmail, setUserEmail] = useState('');
  const [projects, setProjects] = useState([]);
  const [showProjects, setShowProjects] = useState(false);

  // Retrieve the logged-in email from localStorage when the dashboard loads
  useEffect(() => {
    const email = localStorage.getItem('loggedInEmail');
    if (email) {
      setUserEmail(email);
    }

    // Sample data for projects (replace with actual data if needed)
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(storedProjects);
  }, []);

  // Toggle project dropdown
  const toggleProjects = () => {
    setShowProjects(!showProjects);
  };

  // Handle notification click (you can replace this with real logic later)
  const handleNotificationClick = () => {
    alert("You clicked the notifications icon!"); // Placeholder for notification handling
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
        {/* Sidebar with user info and menu */}
        <nav className="sidebar">
          {/* User Info and Notification Button */}
          <div className="user-info">
            <img src="https://api.iconify.design/mdi:account-circle.svg" alt="User Profile" className="user-icon" />
            <span className="user-email">{userEmail}</span> {/* Display the logged-in email */}
            <img
              src="https://api.iconify.design/mdi:bell-outline.svg"
              alt="Notifications Icon"
              className="notification-icon"
              title="Notifications"
              onClick={handleNotificationClick} /* Make the notifications icon clickable */
            />
          </div>

          {/* Add Task (functional button, to be implemented later) */}
          <a href="#" className="menu-item">
            <img src="https://api.iconify.design/mdi:plus-circle.svg" alt="Add Task Icon" className="menu-icon" />
            <span>Add Task</span>
          </a>

          <a href="#" className="menu-item">
            <img src="https://api.iconify.design/mdi:magnify.svg" alt="Search Icon" className="menu-icon" />
            <span>Search</span> {/* Will become a pop-up */}
          </a>

          <a href="#" className="menu-item">
            <img src="https://api.iconify.design/mdi:inbox.svg" alt="Inbox Icon" className="menu-icon" />
            <span>Inbox</span> {/* Inbox page */}
          </a>

          <a href="#" className="menu-item">
            <img src="https://api.iconify.design/mdi:calendar.svg" alt="Today Icon" className="menu-icon" />
            <span>Today</span> {/* Renamed Calendar page */}
          </a>

          <a href="#" className="menu-item">
            <img src="https://api.iconify.design/mdi:clock-outline.svg" alt="Upcoming Icon" className="menu-icon" />
            <span>Upcoming</span> {/* Upcoming page */}
          </a>

          <a href="#" className="menu-item">
            <img src="https://api.iconify.design/mdi:filter.svg" alt="Filters Icon" className="menu-icon" />
            <span>Filters</span> {/* Filters page */}
          </a>

          {/* My Projects section */}
          <div className="projects-section">
            <div className="projects-header">
              <span>My Projects</span>
              <div className="projects-controls">
                <button className="project-add-button">
                  <img
                    src="https://api.iconify.design/mdi:plus-circle.svg"
                    alt="Add Project"
                    title="Create New Project"
                  />
                </button>
                <button className="project-toggle-button" onClick={toggleProjects}>
                  <img
                    src={`https://api.iconify.design/mdi:chevron-${showProjects ? 'down' : 'right'}.svg`}
                    alt="Toggle Projects"
                  />
                </button>
              </div>
            </div>
            {showProjects && (
              <div className="projects-dropdown">
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <div key={index} className="project-item">
                      {project}
                    </div>
                  ))
                ) : (
                  <div className="no-projects">No projects yet</div>
                )}
              </div>
            )}
          </div>

          {/* Templates section at the bottom */}
          <div className="templates-section">
            <a href="#" className="menu-item">
              <img src="https://api.iconify.design/mdi:file-document-outline.svg" alt="Templates Icon" className="menu-icon" />
              <span>Templates</span> {/* Templates page */}
            </a>
          </div>
        </nav>

        {/* Content area */}
        <div className="content-area">
          <h1 className="page-title">Today-StudySmart</h1> {/* Page title for 'Today' page */}
          <a href="#" className="content-item">
            <img src="https://api.iconify.design/mdi:plus-circle.svg" alt="Add Task Icon" className="add-icon" />
            <span>Add Task</span>
          </a>
          <div className="dashboard-content">
            {/* Your content for the 'Today' page goes here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Today;
