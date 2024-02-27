// src/App.js
import React, { useState } from 'react';
import './App.css';
import questions from './questions';

function App() {
  const [index, setIndex] = useState(0);

  // Function to get a random question index
  const getRandomIndex = () => {
    let randomIndex = Math.floor(Math.random() * questions.length);
    // Ensure the new random index is different from the current index
    while (randomIndex === index) {
      randomIndex = Math.floor(Math.random() * questions.length);
    }
    return randomIndex;
  };

  // Navigate to a new question
  const navigateQuestion = (direction) => {
    const newIndex = direction === 'next' ? getRandomIndex() : getRandomIndex();
    setIndex(newIndex);
  };

  return (
    <div className="App">
      <div className="card">
        <p>{questions[index]}</p>
        <button onClick={() => navigateQuestion('prev')}>Previous</button>
        <button onClick={() => navigateQuestion('next')}>Next</button>
      </div>
    </div>
  );
}

export default App;
