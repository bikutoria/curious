import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';
import questions from './questions';

function App() {
  const [index, setIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => navigateQuestion('next'),
    onSwipedRight: () => navigateQuestion('prev'),
  });

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
      <div {...handlers} className="card">
        <p>{questions[index]}</p>
      </div>
    </div>
  );
}

export default App;
