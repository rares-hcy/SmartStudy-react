import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Inbox.css';  // Import the CSS file for styling
import AddTask from './AddTask';  // Import the AddTask component
import AddNote from './AddNote';  // Import AddNote component
import AddReminder from './AddReminder';  // Import AddReminder component
import autumnImage from '../assets/Background_Autumn.png';  // Image imports
import forestImage from '../assets/Background_Forest.png';
import springImage from '../assets/Background_Spring.png';
import summerImage from '../assets/Background_Summer.png';
import thinkingImage from '../assets/Background_Thinking.png';
import winterImage from '../assets/Background_Winter.png';
import workingImage from '../assets/Background_Working.png';

function Inbox() {
  const [userEmail, setUserEmail] = useState('');
  const [tasks, setTasks] = useState([]); // State for tasks
  const [projects, setProjects] = useState([]); // State for projects
  const [showProjects, setShowProjects] = useState(false);  // State to toggle project dropdown
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);  // State to control popup visibility
  const [showAddNotePopup, setShowAddNotePopup] = useState(false);  // State to control popup for Add Note
  const [showAddReminderPopup, setShowAddReminderPopup] = useState(false);  // State to control popup for Add Reminder
  const [randomImage, setRandomImage] = useState('');  // State to hold the random image
  const [randomMessage, setRandomMessage] = useState(''); // State to hold the random message
  const [currentPage, setCurrentPage] = useState(1);  // Pagination control

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('loggedInEmail');
    if (email) {
      setUserEmail(email);
    }

    // Fetch tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || []; // Fetch projects from localStorage
    setTasks(storedTasks);
    setProjects(storedProjects);

    // Select a random image
    const images = [autumnImage, forestImage, springImage, summerImage, thinkingImage, winterImage, workingImage];
    const randomImageIndex = Math.floor(Math.random() * images.length);  // Generate a random index for the image
    setRandomImage(images[randomImageIndex]);  // Set the random image

    // Random message logic
    const messages = [
      "You're capable of far more than you realize.",
      "Progress isn't always visible, but each effort you make pushes you forward.",
      "Remember that even the tallest mountains are climbed step by step.",
      "Success is built on consistency. Keep going.",
      "Rest and reflection are as important as the hustle. Recharge and come back stronger.",
      "Challenges are just opportunities in disguise.",
      "It’s okay to slow down. Progress is progress, no matter the speed.",
      "You are planting seeds today for something beautiful tomorrow.",
      "Each day brings new opportunities for growth.",
      "The journey may be long, but every step forward is a victory."
    ];
    const randomMessageIndex = Math.floor(Math.random() * messages.length);
    setRandomMessage(messages[randomMessageIndex]);
  }, []);

  const handleAddTaskClick = () => {
    setShowAddTaskPopup(true);  // Show the Add Task popup when button is clicked
  };

  const closeAddTaskPopup = () => {
    setShowAddTaskPopup(false);  // Close the popup
  };

  const handleAddNoteClick = () => {
    setShowAddNotePopup(true);  // Show the Add Note popup when button is clicked
  };

  const closeAddNotePopup = () => {
    setShowAddNotePopup(false);  // Close the Add Note popup
  };

  const handleAddReminderClick = () => {
    setShowAddReminderPopup(true);  // Show the Add Reminder popup when button is clicked
  };

  const closeAddReminderPopup = () => {
    setShowAddReminderPopup(false);  // Close the Add Reminder popup
  };

  const handleInboxClick = () => {
    navigate('/inbox');
  };

  const handleTodayClick = () => {
    navigate('/today');
  };

  const handleUpcomingClick = () => {
    navigate('/upcoming');
  };

  const handleFiltersClick = () => {
    navigate('/filters');
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleProjectsClick = () => {
    navigate('/projects'); // Redirect to Projects
  };

  const handleTemplatesClick = () => {
    navigate('/templates'); // Redirect to Templates
  };

  // Toggle project dropdown visibility
  const handleProjectToggle = () => {
    setShowProjects(!showProjects);
  };

  const tasksPerPage = 10;
  const paginatedTasks = tasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);  // Paginate the tasks
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle task completion
  const handleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks); // Update the tasks in state
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save updated tasks to localStorage
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="dashboard-container">
        <header className="top-bar">
          <div className="logo-container">
            <img src="https://img.icons8.com/material-outlined/65/diversity.png" alt="AI Study Companion Logo" className="logo" />
            <div className="title-container">
              <h1 className="main-title">StudySmart</h1>
              <h2 className="app-title">Your AI Study Companion</h2>
            </div>
          </div>
        </header>

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
              />
            </div>

            <a href="#" className="menu-item" onClick={handleAddTaskClick}>
              <img src="https://api.iconify.design/mdi:plus-circle.svg" alt="Add Task Icon" className="menu-icon" />
              <span>Add Task</span>
            </a>

            <a href="#" className="menu-item" onClick={handleSearchClick}>
              <img src="https://api.iconify.design/mdi:magnify.svg" alt="Search Icon" className="menu-icon" />
              <span>Search</span>
            </a>

            <a href="#" className="menu-item" onClick={handleInboxClick}>
              <img src="https://api.iconify.design/mdi:inbox.svg" alt="Inbox Icon" className="menu-icon" />
              <span>Inbox</span>
            </a>

            <div className="menu-item" onClick={handleTodayClick}>
              <img src="https://api.iconify.design/mdi:calendar.svg" alt="Today Icon" className="menu-icon" />
              <span>Today</span>
            </div>

            <a href="#" className="menu-item" onClick={handleUpcomingClick}>
              <img src="https://api.iconify.design/mdi:clock-outline.svg" alt="Upcoming Icon" className="menu-icon" />
              <span>Upcoming</span>
            </a>

            <a href="#" className="menu-item" onClick={handleFiltersClick}>
              <img src="https://api.iconify.design/mdi:filter.svg" alt="Filters Icon" className="menu-icon" />
              <span>Filters</span>
            </a>

            {/* My Projects section */}
            <div className="projects-section">
              <div className="projects-header">
                <span>My Projects</span>
                <div className="projects-controls">
                  <button className="project-add-button" onClick={handleProjectsClick}>
                    <img src="https://api.iconify.design/mdi:plus-circle.svg" alt="Add Project" title="Create New Project" />
                  </button>
                  <button className="project-toggle-button" onClick={handleProjectToggle}>
                    <img src={`https://api.iconify.design/mdi:chevron-${showProjects ? 'down' : 'right'}.svg`} alt="Toggle Projects" />
                  </button>
                </div>
              </div>
              {showProjects && (
                <div className="projects-dropdown">
                  {projects.length > 0 ? (
                    projects.map((project, index) => (
                      <div key={index} className="project-item">{project}</div>
                    ))
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
            <h1 className="inbox-title">Inbox</h1>

            <div className="button-row">
              <button className="add-task-btn" onClick={handleAddTaskClick}>
                <img src="https://api.iconify.design/mdi:plus-circle.svg" alt="Add Task Icon" />
                <span>Add Task</span>
              </button>
              <button className="add-task-btn" onClick={handleAddNoteClick}>
                <img src="https://api.iconify.design/mdi:plus-circle.svg" alt="Add Note Icon" />
                <span>Add Note</span>
              </button>
              <button className="add-task-btn" onClick={handleAddReminderClick}>
                <img src="https://api.iconify.design/mdi:plus-circle.svg" alt="Add Reminder Icon" />
                <span>Add Reminder</span>
              </button>
            </div>

            {randomImage && (
              <img src={randomImage} alt="Random Background" className="random-image" />
            )}
            {randomMessage && (
              <p className="random-message">{randomMessage}</p>
            )}
          </div>

          {showAddTaskPopup && <AddTask onClose={closeAddTaskPopup} />}
          {showAddNotePopup && <AddNote onClose={closeAddNotePopup} />}
          {showAddReminderPopup && <AddReminder onClose={closeAddReminderPopup} />}
        </div>
      </div>
    </DndProvider>
  );
}

export default Inbox;
