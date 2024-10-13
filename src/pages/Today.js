import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Today.css';  // Import the CSS file for styling
import AddTask from './AddTask';  // Import the AddTask component
import autumnImage from '../assets/Background_Autumn.png';  // Image imports
import forestImage from '../assets/Background_Forest.png';
import springImage from '../assets/Background_Spring.png';
import summerImage from '../assets/Background_Summer.png';
import thinkingImage from '../assets/Background_Thinking.png';
import winterImage from '../assets/Background_Winter.png';
import workingImage from '../assets/Background_Working.png';

function Today() {
  const [userEmail, setUserEmail] = useState('');
  const [tasks, setTasks] = useState([]); // State for tasks
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);  // State to control popup visibility
  const [randomImage, setRandomImage] = useState('');  // State to hold the random image
  const [randomMessage, setRandomMessage] = useState(''); // State to hold the random message
  const [currentPage, setCurrentPage] = useState(1);  // Pagination control
  const [projects, setProjects] = useState([]);  // State for projects
  const [showProjects, setShowProjects] = useState(false);  // State to control the visibility of projects

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('loggedInEmail');
    if (email) {
      setUserEmail(email);
    }

    // Fetch tasks and projects from localStorage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];

    // Assign a unique ID to each task if it doesn't have one
    const tasksWithIds = storedTasks.map((task, index) => ({
      ...task,
      id: task.id || index + 1, // Ensure every task has a unique ID
    }));

    setTasks(tasksWithIds);
    localStorage.setItem('tasks', JSON.stringify(tasksWithIds)); // Save tasks with unique IDs

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

  const toggleProjects = () => {
    setShowProjects(!showProjects);  // Toggle the visibility of projects
  };

  const handleAddProject = () => {
    const newProject = prompt("Enter the project name:");
    if (newProject) {
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));  // Save to localStorage
    }
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

  // Function to calculate progress
  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / tasks.length) * 100);  // Calculate progress percentage
  };

  // Handle task reorder after dragging and dropping
  const moveTask = (draggedTaskId, hoverTaskId) => {
    const draggedIndex = tasks.findIndex(task => task.id === draggedTaskId);
    const hoverIndex = tasks.findIndex(task => task.id === hoverTaskId);
    const updatedTasks = [...tasks];

    // Reorder tasks
    const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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

            <a href="#" className="menu-item">
              <img src="https://api.iconify.design/mdi:magnify.svg" alt="Search Icon" className="menu-icon" />
              <span>Search</span>
            </a>

            <a href="#" className="menu-item">
              <img src="https://api.iconify.design/mdi:inbox.svg" alt="Inbox Icon" className="menu-icon" />
              <span>Inbox</span>
            </a>

            <div className="menu-item">
              <img src="https://api.iconify.design/mdi:calendar.svg" alt="Today Icon" className="menu-icon" />
              <span>Today</span>
            </div>

            <a href="#" className="menu-item">
              <img src="https://api.iconify.design/mdi:clock-outline.svg" alt="Upcoming Icon" className="menu-icon" />
              <span>Upcoming</span>
            </a>

            <a href="#" className="menu-item">
              <img src="https://api.iconify.design/mdi:filter.svg" alt="Filters Icon" className="menu-icon" />
              <span>Filters</span>
            </a>

            {/* My Projects section */}
            <div className="projects-section">
              <div className="projects-header">
                <span>My Projects</span>
                <div className="projects-controls">
                  <button className="project-add-button" onClick={handleAddProject}>
                    <img src="https://api.iconify.design/mdi:plus-circle.svg" alt="Add Project" title="Create New Project" />
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
              <a href="#" className="menu-item">
                <img src="https://api.iconify.design/mdi:file-document-outline.svg" alt="Templates Icon" className="menu-icon" />
                <span>Templates</span>
              </a>
            </div>
          </nav>

          <div className="content-area">
          <h1
            className="today-title"
              style={{ marginLeft: tasks.length === 0 ? '0vw' : '-10vw' }}
            >Today</h1>

            {tasks.length === 0 ? (
              <>
                <button className="add-task-btn" onClick={handleAddTaskClick}>
                  <img src="https://api.iconify.design/mdi:plus-circle.svg" alt="Add Task Icon" />
                  <span>Add Task</span>
                </button>
                {randomImage && (
                  <img src={randomImage} alt="Random Background" className="random-image" />
                )}
                {randomMessage && (
                  <p className="random-message">{randomMessage}</p>
                )}
              </>
            ) : (
              <>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${calculateProgress()}%` }}></div>
                    <span className="progress-bar-text">{calculateProgress()}%</span>  {/* Display percentage */}
                  </div>
                </div>

                <div className="task-list">
                  {paginatedTasks.map((task) => (
                    <Task
                      key={task.id}  // Use task.id as the unique key
                      task={task}
                      moveTask={moveTask}
                      handleTaskCompletion={handleTaskCompletion}
                    />
                  ))}
                </div>

                {tasks.length > tasksPerPage && (
                  <div className="pagination-controls">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>&laquo; Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next &raquo;</button>
                  </div>
                )}
              </>
            )}
          </div>

          {showAddTaskPopup && <AddTask onClose={closeAddTaskPopup} />}
        </div>
      </div>
    </DndProvider>
  );
}

// Task component to handle drag-and-drop functionality
const Task = ({ task, moveTask, handleTaskCompletion }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'task',
    hover: (draggedTask) => {
      if (draggedTask.id !== task.id) {
        moveTask(draggedTask.id, task.id);
      }
    },
  });

  return (
    <div
      ref={node => drag(drop(node))}
      className="task-item"
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: '#faf3dd',
      }}
    >
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => handleTaskCompletion(task.id)} // Handle checkbox change
      />
      <div className="task-details">
        <span className="task-name">{task.name}</span>  {/* Bold title */}
        <span className="task-desc">{task.description}</span>  {/* Description below */}
      </div>

      <div className="hover-message">
        <strong>Priority:</strong> {task.priority}  {/* Display priority on hover */}
      </div>
    </div>
  );
};

export default Today;
