import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Today.css'; // Import the CSS file for styling
import AddTask from './AddTask'; // Import the AddTask component
import './MoodFilter.css';
import MoodPopup from './MoodPopup'; // Import MoodPopup component
import ShowNotesAndReminders from './ShowNotesAndReminders'; // Import the new popup component
import MoodFilter from './MoodFilter'; // Import the MoodFilter component
import autumnImage from '../assets/Background_Autumn.png'; // Image imports
import forestImage from '../assets/Background_Forest.png';
import springImage from '../assets/Background_Spring.png';
import summerImage from '../assets/Background_Summer.png';
import thinkingImage from '../assets/Background_Thinking.png';
import winterImage from '../assets/Background_Winter.png';
import workingImage from '../assets/Background_Working.png';

function Today() {
  const [userEmail, setUserEmail] = useState('');
  const [tasks, setTasks] = useState([]); // State for tasks
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false); // State to control popup visibility
  const [showNotesAndRemindersPopup, setShowNotesAndRemindersPopup] = useState(false); // State for notes & reminders popup
  const [randomImage, setRandomImage] = useState(''); // State to hold the random image
  const [randomMessage, setRandomMessage] = useState(''); // State to hold the random message
  const [currentPage, setCurrentPage] = useState(1); // Pagination control
  const [projects, setProjects] = useState([]); // State for projects
  const [showProjects, setShowProjects] = useState(false); // State to control the visibility of projects
  const [moodScore, setMoodScore] = useState(null); // Initialize moodScore state
  const [showMoodPopup, setShowMoodPopup] = useState(false); // State to control the mood popup visibility
  const [sortedTasks, setSortedTasks] = useState([]); // State to hold the sorted tasks

  const navigate = useNavigate();

  // Handle sorted tasks (missing from your previous code)
  const handleSortedTasks = (orderedTasks) => {
    setSortedTasks(orderedTasks); // Update the sorted tasks in the state
  };
  
  useEffect(() => {
    // Retrieve the logged-in email
    const email = localStorage.getItem('loggedInEmail');
    if (email) {
      setUserEmail(email);
    }
  
    // Retrieve tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // If there are stored tasks
    if (storedTasks.length > 0) {
      // Assign unique IDs to tasks if they don't have one
      const tasksWithIds = storedTasks.map((task, index) => ({
        ...task,
        id: task.id || index + 1, // Ensure every task has a unique ID
      }));
  
      // Retrieve mood score from sessionStorage
      const storedMoodScore = sessionStorage.getItem('moodScore');
      const parsedMoodScore = storedMoodScore ? parseFloat(storedMoodScore) : null;
  
      // Sort tasks based on moodScore (if available) or due date
      const orderedTasks = parsedMoodScore !== null
        ? tasksWithIds.sort((a, b) => {
            // Mood-based sorting logic
            if (parsedMoodScore <= -0.5) {
              return a.priority - b.priority; // Lower mood: prioritize low-priority tasks
            } else if (parsedMoodScore > -0.5 && parsedMoodScore <= 0.5) {
              return Math.abs(a.priority - 2) - Math.abs(b.priority - 2); // Medium mood: medium-priority sorting
            } else {
              return b.priority - a.priority; // Higher mood: prioritize high-priority tasks
            }
          })
        : tasksWithIds.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Default to chronological sorting
  
      // Update both tasks and sortedTasks state after sorting
      setTasks(tasksWithIds);
      setSortedTasks(orderedTasks);
    } else {
      // Clear tasks and sortedTasks if no stored tasks
      setTasks([]);
      setSortedTasks([]);
    }
  }, []); // Run only on component mount
  
  const handleAddTaskClick = () => {
    setShowAddTaskPopup(true); // Show the Add Task popup when button is clicked
  };

  const toggleMoodPopup = () => {
    setShowMoodPopup(!showMoodPopup); // Toggle the visibility of the mood popup
  };

  const handleMoodScore = (score) => {
    setMoodScore(score); // Set the mood score
    sessionStorage.setItem('moodScore', score); // Persist it in sessionStorage
  };

  const closeAddTaskPopup = () => {
    setShowAddTaskPopup(false); // Close the popup
  };

  const toggleProjects = () => {
    setShowProjects(!showProjects); // Toggle the visibility of projects
  };

  const handleAddProject = () => {
    navigate('/coming-soon'); // Redirect to Coming Soon page
  };

  const handleFiltersClick = () => {
    navigate('/coming-soon'); // Redirect to Coming Soon page
  };

  const handleInboxClick = () => {
    navigate('/inbox'); // Navigate to the inbox page
  };

  const tasksPerPage = 10;
  const paginatedTasks = sortedTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );
  
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

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

  const handleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks); // Only update tasks
    setSortedTasks(updatedTasks); // Also update sorted tasks
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to localStorage
  };
  
  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter((task) => task.completed).length;
    return Math.round((completedTasks / tasks.length) * 100); // Calculate progress based on tasks
  };
  
  const moveTask = (draggedTaskId, hoverTaskId) => {
    const draggedIndex = tasks.findIndex((task) => task.id === draggedTaskId);
    const hoverIndex = tasks.findIndex((task) => task.id === hoverTaskId);
    const updatedTasks = [...tasks];
  
    const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
  
    setTasks(updatedTasks); // Update only tasks
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to localStorage
  };

  // Function to open the notes & reminders popup
  const openNotesAndRemindersPopup = () => {
    setShowNotesAndRemindersPopup(true);
  };

  // Function to close the notes & reminders popup
  const closeNotesAndRemindersPopup = () => {
    setShowNotesAndRemindersPopup(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="dashboard-container">
        <header className="top-bar">
          <div className="logo-container">
            <img
              src="https://img.icons8.com/material-outlined/65/diversity.png"
              alt="AI Study Companion Logo"
              className="logo"
            />
            <div className="title-container">
              <h1 className="main-title">StudySmart</h1>
              <h2 className="app-title">Your AI Study Companion</h2>
            </div>
          </div>
        </header>

        <div className="main-content">
          <nav className="sidebar">
            <div className="user-info">
              <img
                src="https://api.iconify.design/mdi:account-circle.svg"
                alt="User Profile"
                className="user-icon"
              />
              <span className="user-email">{userEmail}</span>
              <img
                src="https://api.iconify.design/mdi:bell-outline.svg"
                alt="Notifications Icon"
                className="notification-icon"
                title="Notifications"
              />
            </div>

            <a href="#" className="menu-item" onClick={handleAddTaskClick}>
              <img
                src="https://api.iconify.design/mdi:plus-circle.svg"
                alt="Add Task Icon"
                className="menu-icon"
              />
              <span>Add Task</span>
            </a>

            <a href="#" className="menu-item">
              <img
                src="https://api.iconify.design/mdi:magnify.svg"
                alt="Search Icon"
                className="menu-icon"
              />
              <span>Search</span>
            </a>

            <a href="#" className="menu-item" onClick={handleInboxClick}>
              <img
                src="https://api.iconify.design/mdi:inbox.svg"
                alt="Inbox Icon"
                className="menu-icon"
              />
              <span>Inbox</span>
            </a>

            <div className="menu-item">
              <img
                src="https://api.iconify.design/mdi:calendar.svg"
                alt="Today Icon"
                className="menu-icon"
              />
              <span>Today</span>
            </div>

            <a href="#" className="menu-item" onClick={handleFiltersClick}>
              <img
                src="https://api.iconify.design/mdi:clock-outline.svg"
                alt="Upcoming Icon"
                className="menu-icon"
              />
              <span>Upcoming</span>
            </a>

            <a href="#" className="menu-item" onClick={handleFiltersClick}>
              <img
                src="https://api.iconify.design/mdi:filter.svg"
                alt="Filters Icon"
                className="menu-icon"
              />
              <span>Filters</span>
            </a>

            {/* My Projects section */}
            <div className="projects-section">
              <div className="projects-header">
                <span>My Projects</span>
                <div className="projects-controls">
                  <button className="project-add-button" onClick={handleAddProject}>
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

            <div className="templates-section">
              <a href="#" className="menu-item" onClick={handleFiltersClick}>
                <img
                  src="https://api.iconify.design/mdi:file-document-outline.svg"
                  alt="Templates Icon"
                  className="menu-icon"
                />
                <span>Templates</span>
              </a>
            </div>
          </nav>

          <div className="content-area">
            <div className="today-header">
              <h1 className="today-title">Today</h1>
              <button className="view-notes-reminders-btn" onClick={openNotesAndRemindersPopup}>
                View Notes & Reminders
              </button>
            </div>

            {/* Pass tasks, moodScore, and handleSortedTasks to the MoodFilter */}
            <MoodFilter tasks={tasks} moodScore={moodScore} onSortedTasks={handleSortedTasks} />

            {sortedTasks.length === 0 ? (
              <>
                <button className="add-task-btn" onClick={handleAddTaskClick}>
                  <img src="https://api.iconify.design/mdi:plus-circle.svg" alt="Add Task Icon" />
                  <span>Add Task</span>
                </button>
                {randomImage && <img src={randomImage} alt="Random Background" className="random-image" />}
                {randomMessage && <p className="random-message">{randomMessage}</p>}
              </>
            ) : (
              <>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${calculateProgress()}%` }}></div>
                    <span className="progress-bar-text">{calculateProgress()}%</span> {/* Display percentage */}
                  </div>
                </div>

                <div className="task-list">
                  {paginatedTasks.map((task) => (
                    <Task key={task.id} task={task} moveTask={moveTask} handleTaskCompletion={handleTaskCompletion} />
                  ))}
                </div>

                {sortedTasks.length > tasksPerPage && (
                  <div className="pagination-controls">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                      &laquo; Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                      Next &raquo;
                    </button>
                  </div>
                )}
              </>
            )}

            <button className="mood-check-button" onClick={toggleMoodPopup}>
              Check Mood
            </button>
          </div>

          {showMoodPopup && <MoodPopup onClose={toggleMoodPopup} onMoodScore={handleMoodScore} />}
          {showAddTaskPopup && <AddTask onClose={closeAddTaskPopup} />}
          {showNotesAndRemindersPopup && <ShowNotesAndReminders onClose={closeNotesAndRemindersPopup} />}
        </div>
      </div>
    </DndProvider>
  );
}

// Task component for drag and drop functionality
const Task = ({ task, moveTask, handleTaskCompletion }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
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
      ref={(node) => drag(drop(node))}
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
        onChange={() => handleTaskCompletion(task.id)}
      />
      <div className="task-details">
        <span className="task-name">{task.name}</span>
        <span className="task-desc">{task.description}</span>
      </div>
    </div>
  );
};

export default Today;
