import React, { useState, useRef, useEffect } from 'react';
import './AddTask.css';

function AddTask({ onClose }) {
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [addReminder, setAddReminder] = useState(true); // Checkbox state for reminders
  const [errorMessage, setErrorMessage] = useState('');

  const today = new Date().toISOString().split("T")[0];

  const timeInputRef = useRef(null);
  const dateInputRef = useRef(null);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    if (selectedDate >= today) {
      setTaskDate(selectedDate);
      setErrorMessage('');
    } else {
      setErrorMessage("You cannot select a date in the past!");
      setTaskDate('');
    }
  };

  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if (taskDate === today) {
      const [hours, minutes] = selectedTime.split(":");
      if (parseInt(hours) < currentHours || (parseInt(hours) === currentHours && parseInt(minutes) < currentMinutes)) {
        setErrorMessage("You cannot select a time in the past!");
        setTaskTime('');
      } else {
        setTaskTime(selectedTime);
        setErrorMessage('');
      }
    } else {
      setTaskTime(selectedTime);
      setErrorMessage('');
    }
  };

  const handleAddTask = () => {
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

    // If the checkbox is ticked, also add a reminder
    if (addReminder) {
      const reminder = {
        name: taskName,
        description: taskDesc,
        date: taskDate,
        time: taskTime,
      };

      const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
      reminders.push(reminder);
      localStorage.setItem('reminders', JSON.stringify(reminders));
    }

    onClose(); // Close the popup after adding the task
  };

  // Close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('popup-overlay')) {
        onClose();
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="popup-title">Add New Task</h2>

        {errorMessage && <div className="error-popup">{errorMessage}</div>}

        <div className="form-group">
          <label htmlFor="task-name">Task Name</label>
          <input
            type="text"
            id="task-name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-desc">Description (max 1000 characters)</label>
          <textarea
            id="task-desc"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            placeholder="Enter description"
            maxLength="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-date">Due Date</label>
          <input
            type="date"
            id="task-date"
            ref={dateInputRef}
            value={taskDate}
            onClick={() => dateInputRef.current.showPicker()}
            onChange={handleDateChange}
            min={today}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-time">Due Time</label>
          <input
            type="time"
            id="task-time"
            ref={timeInputRef}
            value={taskTime}
            onClick={() => timeInputRef.current.showPicker()}
            onChange={handleTimeChange}
            disabled={!taskDate}
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

        {/* Checkbox for adding reminder */}
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="add-reminder"
            checked={addReminder}
            onChange={(e) => setAddReminder(e.target.checked)}
          />
          <span className="add-reminder-text">Add Reminder</span>
        </div>

        <div className="popup-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="add-btn" onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
