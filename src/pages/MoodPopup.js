import React, { useState, useEffect } from 'react';
import './MoodPopup.css';

const MoodPopup = ({ onClose, onMoodScore }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [moodScore, setMoodScore] = useState(
    parseFloat(sessionStorage.getItem('moodScore')) || 0 // Load mood score from sessionStorage if available
  );
  const [chatHistory, setChatHistory] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  // Questions with answers and scores
  const questions = [
    {
      question: "How are you feeling physically today?",
      answers: [
        { text: "Energetic", value: 0.8 },
        { text: "Normal", value: 0.3 },
        { text: "A bit tired", value: -0.3 },
        { text: "Exhausted", value: -0.8 }
      ]
    },
    {
      question: "How motivated do you feel right now?",
      answers: [
        { text: "Super motivated", value: 0.9 },
        { text: "Moderately motivated", value: 0.4 },
        { text: "A little unmotivated", value: -0.4 },
        { text: "Not motivated at all", value: -0.9 }
      ]
    },
    {
      question: "How well did you sleep last night?",
      answers: [
        { text: "I slept great", value: 0.7 },
        { text: "I slept okay", value: 0.2 },
        { text: "I didn’t sleep much", value: -0.5 },
        { text: "I barely slept at all", value: -0.7 }
      ]
    },
    {
      question: "How is your stress level today?",
      answers: [
        { text: "I feel completely calm", value: 0.6 },
        { text: "I’m handling things well", value: 0.2 },
        { text: "I’m feeling somewhat stressed", value: -0.3 },
        { text: "I’m really stressed out", value: -0.8 }
      ]
    },
    {
      question: "How productive have you been so far today?",
      answers: [
        { text: "Extremely productive", value: 0.7 },
        { text: "Fairly productive", value: 0.3 },
        { text: "Not very productive", value: -0.2 },
        { text: "Not productive at all", value: -0.7 }
      ]
    }
  ];

  useEffect(() => {
    // Randomize question order to ensure variation
    setCurrentQuestionIndex(0);
  }, []);

  const handleAnswerClick = (answer) => {
    setIsThinking(true); // Introduce thinking delay for realism
    setTimeout(() => {
      const newScore = moodScore + answer.value;
      setMoodScore(newScore); // Update mood score in state
      sessionStorage.setItem('moodScore', newScore); // Store updated score in sessionStorage

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { message: questions[currentQuestionIndex].question, type: "left" },
        { message: answer.text, type: "right" }
      ]);

      setIsThinking(false);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        onMoodScore(newScore); // Pass final score to parent component
        onClose(); // Close chat when questions are done
      }
    }, Math.random() * 1500 + 1500); // Random delay between 1.5s and 3s
  };

  return (
    <div className="popup-overlay">
      <div className="chat-popup">
        <h2 className="mood-title">Mood Chat</h2>
        <div className="chat-box">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`message ${chat.type}`}>
              {chat.message}
            </div>
          ))}
          {isThinking && <div className="message left">...</div>}

          {/* Show next question */}
          {currentQuestionIndex < questions.length && !isThinking && (
            <div className="message left">
              {questions[currentQuestionIndex].question}
            </div>
          )}
        </div>
        <div className="answer-options">
          {!isThinking &&
            questions[currentQuestionIndex].answers
              .map((answer, index) => (
                <button
                  key={index}
                  className="answer-button"
                  onClick={() => handleAnswerClick(answer)}
                >
                  {answer.text}
                </button>
              ))}
        </div>
        <button className="close-chat" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MoodPopup;
