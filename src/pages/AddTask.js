import React, { useState, useRef } from 'react';
import './AddTask.css';

function AddTask({ onClose }) {
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [errorMessage, setErrorMessage] = useState(''); // For showing error messages

  const today = new Date().toISOString().split("T")[0]; // Get today's date

  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  // Function to handle date change and ensure no past date is selected
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    if (selectedDate >= today) {
      setTaskDate(selectedDate);
      setErrorMessage(''); // Clear error if any
    } else {
      setErrorMessage("You cannot select a date in the past!");
      setTaskDate(''); // Clear the invalid date
    }
  };

  // Function to handle time change and ensure no past time is selected on the current day
  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if (taskDate === today) {
      const [hours, minutes] = selectedTime.split(":");
      if (parseInt(hours) < currentHours || (parseInt(hours) === currentHours && parseInt(minutes) < currentMinutes)) {
        setErrorMessage("You cannot select a time in the past!");
        setTaskTime(''); // Clear invalid time
      } else {
        setTaskTime(selectedTime);
        setErrorMessage(''); // Clear error
      }
    } else {
      setTaskTime(selectedTime);
      setErrorMessage(''); // Clear error
    }
  };

  // Function to handle Add Task logic
  const handleAddTask = () => {
    // Check if all required fields are filled out
    if (!taskName) {
      setErrorMessage('Task Name is required.');
      return;
    }
    if (!taskDate) {
      setErrorMessage('Due Date is required.');
      return;
    }
    if (!taskTime) {
      setErrorMessage('Due Time is required.');
      return;
    }

    const task = {
      name: taskName,
      description: taskDesc,
      date: taskDate,
      time: taskTime,
      priority: taskPriority,
    };

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    onClose(); // Close the popup after adding the task
  };

  // Automatically show the calendar or clock when the input fields are clicked
  const handleDateClick = () => {
    dateInputRef.current.click(); // Trigger calendar popup
  };

  const handleTimeClick = () => {
    timeInputRef.current.click(); // Trigger clock popup
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="popup-title">Add New Task</h2>
        <div className="form-group">
          <label htmlFor="task-name">Task Name (max 50 characters)</label>
          <input
            type="text"
            id="task-name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            maxLength="50"
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-desc">Description (max 100 characters)</label>
          <textarea
            id="task-desc"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            maxLength="100"
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-date">Due Date</label>
          <input
            type="date"
            id="task-date"
            ref={dateInputRef} // Reference to the input
            value={taskDate}
            onClick={handleDateClick} // Auto-show the calendar on click
            onChange={handleDateChange}
            min={today} // Set minimum date to today
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-time">Due Time</label>
          <input
            type="time"
            id="task-time"
            ref={timeInputRef} // Reference to the input
            value={taskTime}
            onClick={handleTimeClick} // Auto-show the clock on click
            onChange={handleTimeChange}
            disabled={!taskDate} // Disable time input until a date is selected
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium-High">Medium-High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Display the error message between the buttons if there is one */} 
        <div className="error-popup">
          {errorMessage && <span>{errorMessage}</span>}
        </div>

        <div className="popup-buttons">
          <button className="add-btn" onClick={handleAddTask}>Add Task</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
