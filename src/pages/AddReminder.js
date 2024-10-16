import React, { useState, useRef, useEffect } from 'react';
import './AddReminder.css';

function AddReminder({ onClose }) {
  const [reminderName, setReminderName] = useState('');
  const [reminderDesc, setReminderDesc] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // For showing error messages

  const today = new Date().toISOString().split("T")[0]; // Get today's date
  const timeInputRef = useRef(null);
  const dateInputRef = useRef(null);

  // Automatically show the calendar or clock when input fields are clicked
  const handleDateClick = () => {
    dateInputRef.current.showPicker(); // Auto-show the calendar
  };

  const handleTimeClick = () => {
    timeInputRef.current.showPicker(); // Auto-show the clock
  };

  // Function to handle date validation
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    if (selectedDate >= today) {
      setReminderDate(selectedDate);
      setErrorMessage(''); // Clear error if any
    } else {
      setErrorMessage("You cannot select a date in the past!");
      setReminderDate(''); // Clear the invalid date
    }
  };

  // Function to handle time validation
  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if (reminderDate === today) {
      const [hours, minutes] = selectedTime.split(":");
      if (parseInt(hours) < currentHours || (parseInt(hours) === currentHours && parseInt(minutes) < currentMinutes)) {
        setErrorMessage("You cannot select a time in the past!");
        setReminderTime(''); // Clear invalid time
      } else {
        setReminderTime(selectedTime);
        setErrorMessage(''); // Clear error
      }
    } else {
      setReminderTime(selectedTime);
      setErrorMessage(''); // Clear error
    }
  };

  // Function to handle Add Reminder logic
  const handleAddReminder = () => {
    // Check if all required fields are filled out
    if (!reminderName) {
      setErrorMessage('Reminder Name is required.');
      return;
    }
    if (!reminderDesc) {
      setErrorMessage('Description is required.');
      return;
    }
    if (!reminderDate) {
      setErrorMessage('Date is required.');
      return;
    }
    if (!reminderTime) {
      setErrorMessage('Time is required.');
      return;
    }

    const reminder = {
      name: reminderName,
      description: reminderDesc,
      date: reminderDate,
      time: reminderTime,
    };

    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.push(reminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));

    onClose(); // Close the popup after adding the reminder
  };

  // Close when clicking outside the popup
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
        <h2 className="popup-title">Add Reminder</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <div className="form-group">
          <label htmlFor="reminder-name">Reminder Name</label>
          <input
            type="text"
            id="reminder-name"
            value={reminderName}
            onChange={(e) => setReminderName(e.target.value)}
            placeholder="Enter reminder name"
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="reminder-desc">Description (max 1000 characters)</label>
          <textarea
            id="reminder-desc"
            value={reminderDesc}
            onChange={(e) => setReminderDesc(e.target.value)}
            placeholder="Enter description"
            maxLength="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="reminder-date">Due Date</label>
          <input
            type="date"
            id="reminder-date"
            ref={dateInputRef}
            value={reminderDate}
            onClick={handleDateClick}
            onChange={handleDateChange}
            min={today} // Prevent selecting past dates
          />
        </div>

        <div className="form-group">
          <label htmlFor="reminder-time">Due Time</label>
          <input
            type="time"
            id="reminder-time"
            ref={timeInputRef}
            value={reminderTime}
            onClick={handleTimeClick}
            onChange={handleTimeChange}
            disabled={!reminderDate} // Disable time input until a date is selected
          />
        </div>

        <div className="popup-buttons">
         <button className="cancel-btn" onClick={onClose}>Cancel</button>
        <button className="add-btn" onClick={handleAddReminder}>Add Reminder</button>
        </div>

      </div>
    </div>
  );
}

export default AddReminder;
