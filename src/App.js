import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';
import questions from './questions';

function App() {
    const [index, setIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('');

    const nextQuestion = () => {
        setAnimationClass('animateSwipeRight'); // Set class for swipe right animation
        setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % questions.length);
            setAnimationClass(''); // Reset class to remove animation
        }, 500); // Timeout matches animation duration
    };

    const prevQuestion = () => {
        setAnimationClass('animateSwipeLeft'); // Set class for swipe left animation
        setTimeout(() => {
            setIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
            setAnimationClass(''); // Reset class to remove animation
        }, 500); // Timeout matches animation duration
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => prevQuestion(),
        onSwipedRight: () => nextQuestion(),
    });

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                nextQuestion();
            } else if (event.key === 'ArrowLeft') {
                prevQuestion();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Removed index dependency to prevent re-binding

    return (
        <div className="App">
            <div {...handlers} className={`card ${animationClass}`}>
                <p>{questions[index]}</p>
            </div>
        </div>
    );
}

export default App;
