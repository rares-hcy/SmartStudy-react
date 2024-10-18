import React, { useEffect, useState } from 'react';
import './MoodFilter.css';

// Dynamic sorting algorithm based on mood
const sortTasksByMoodDynamically = (tasks, moodScore) => {
  const sortedTasks = [];
  const priorities = [1, 2, 3, 4]; // 1 is lowest priority, 4 is highest
  let currentPriorityIndex; // Index to track current priority in `priorities` array

  // Determine starting point based on mood score
  if (moodScore <= -0.5) {
    currentPriorityIndex = 0; // Start at priority 1 (lowest)
  } else if (moodScore > -0.5 && moodScore <= 0.5) {
    currentPriorityIndex = 1; // Start at priority 2
  } else if (moodScore > 0.5 && moodScore <= 1.5) {
    currentPriorityIndex = 2; // Start at priority 3
  } else {
    currentPriorityIndex = 3; // Start at priority 4 (highest)
  }

  // Iterate through tasks and build sorted list dynamically
  while (tasks.length > 0) {
    const currentPriority = priorities[currentPriorityIndex];
    const matchingTasks = tasks.filter(task => task.priority === currentPriority);

    // Add matching tasks to the sorted list
    sortedTasks.push(...matchingTasks);

    // Remove matched tasks from the original task array
    tasks = tasks.filter(task => task.priority !== currentPriority);

    // Move to the next priority index, cycling through the priorities
    currentPriorityIndex = (currentPriorityIndex + 1) % priorities.length;
  }

  return sortedTasks;
};

const MoodFilter = ({ tasks, moodScore, onSortedTasks }) => {
  const [sortedTasks, setSortedTasks] = useState([]);

  useEffect(() => {
    if (tasks.length > 0) {
      const orderedTasks = sortTasksByMoodDynamically([...tasks], moodScore); // Pass a copy of tasks
      setSortedTasks(orderedTasks);
      onSortedTasks(orderedTasks); // Send sorted tasks to the parent component
    }
  }, [moodScore, tasks, onSortedTasks]); // Include all dependencies

  return null; // No need to render anything, just handle sorting
};

export default MoodFilter;
