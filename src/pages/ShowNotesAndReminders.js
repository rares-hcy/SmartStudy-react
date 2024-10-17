import React, { useEffect, useState } from 'react';
import './ShowNotesAndReminders.css';

const ShowNotesAndReminders = ({ onClose }) => {
  const [reminders, setReminders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [showReminders, setShowReminders] = useState(true);
  const [showNotes, setShowNotes] = useState(true);

  useEffect(() => {
    // Fetch reminders and notes from localStorage
    const storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];

    setReminders(storedReminders);
    setNotes(storedNotes);
  }, []);

  const handleClose = (e) => {
    if (e.target.className === 'popup') {
      onClose(); // Close the popup when clicking outside
    }
  };

  return (
    <div className="popup" onClick={handleClose}>
      <div className="popup-content">
        <button className="close-button" onClick={onClose}></button> {/* Updated close button */}
        <h2>Notes & Reminders</h2>
        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              checked={showReminders}
              onChange={() => setShowReminders(!showReminders)}
            />
            Show Reminders
          </label>
          <label>
            <input
              type="checkbox"
              checked={showNotes}
              onChange={() => setShowNotes(!showNotes)}
            />
            Show Notes
          </label>
        </div>
        <div className="content">
          {showReminders && reminders.length > 0 && (
            <div>
              <h3>Today's Reminders:</h3>
              <br />
              <ul>
                {reminders.map((reminder, index) => (
                  <li key={index}>
                    {reminder.name}  {reminder.description} <br />
                    <small>{reminder.date} at {reminder.time}</small>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showNotes && notes.length > 0 && (
            <div>
              <h3>Today's Notes:</h3>
              <ul>
                {notes.map((note, index) => (
                  <li key={index}>
                    {note.name} - {note.description} <br />
                    <small>{note.date}</small>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowNotesAndReminders;
