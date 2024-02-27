import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';
import questions from './questions';

function App() {
    const [index, setIndex] = useState(0);

    // Function to go to the next question
    const nextQuestion = () => {
        setIndex((prevIndex) => (prevIndex + 1) % questions.length); // Loop back to the first question at the end
    };

    // Function to go to the previous question
    const prevQuestion = () => {
        setIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length); // Loop to the last question if at the first
    };

    // Handlers for swipe gestures
    const handlers = useSwipeable({
        onSwipedLeft: () => nextQuestion(), // Go to next question on swipe left
        onSwipedRight: () => prevQuestion(), // Go to previous question on swipe right
    });

    // Handle keyboard events for left and right arrow keys
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                nextQuestion();
            } else if (event.key === 'ArrowLeft') {
                prevQuestion();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [index]); // This effect depends on index to ensure the callback has the current state

    return (
        <div className="App">
            <div {...handlers} className="card">
                <p>{questions[index]}</p>
            </div>
        </div>
    );
}

export default App;
