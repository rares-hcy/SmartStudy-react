import React, { useState } from 'react';
import './AddNote.css';

function AddNote({ onClose }) {
  const [noteName, setNoteName] = useState('');
  const [noteDesc, setNoteDesc] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // For showing error messages

  // Function to handle Add Note logic
  const handleAddNote = () => {
    if (!noteName) {
      setErrorMessage('Note Name is required.');
      return;
    }
    if (!noteDesc) {
      setErrorMessage('Description is required.');
      return;
    }

    const note = {
      name: noteName,
      description: noteDesc,
    };

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    onClose(); // Close the popup after adding the note
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="popup-title">Add New Note</h2>
        <div className="form-group">
          <label htmlFor="note-name">Note Name</label>
          <input
            type="text"
            id="note-name"
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
            maxLength="50"
          />
        </div>
        <div className="form-group">
          <label htmlFor="note-desc">Description (max 1000 characters)</label> {/* Updated to 1000 characters */}
          <textarea
            id="note-desc"
            value={noteDesc}
            onChange={(e) => setNoteDesc(e.target.value)}
            maxLength="1000" // Changed to allow up to 1000 characters
          />
        </div>

        {/* Display the error message between the buttons if there is one */} 
        <div className="error-popup">
          {errorMessage && <span>{errorMessage}</span>}
        </div>

        <div className="popup-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="add-btn" onClick={handleAddNote}>Add Note</button>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
