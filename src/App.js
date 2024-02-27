import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';
import questions from './questions';

function App() {
    const [index, setIndex] = useState(0);

    // Function to go to the next question
    const nextQuestion = () => {
        setIndex(prevIndex => (prevIndex + 1) % questions.length); // Loop back to the first question at the end
    };

    // Handlers for swipe gestures
    const handlers = useSwipeable({
        onSwipedLeft: () => nextQuestion(), // Go to next question on swipe left
        onSwipedRight: () => nextQuestion(), // Go to next question on swipe right
    });

    return (
        <div className="App">
            <div {...handlers} className="card">
                <p>{questions[index]}</p>
            </div>
        </div>
    );
}

export default App;
