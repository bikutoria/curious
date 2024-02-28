import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';
import questions from './questions';

function App() {
    const [index, setIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('');

    const nextQuestion = () => {
        setAnimationClass('animate-next');
        setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % questions.length);
            setAnimationClass('');
        }, 300); // timeout duration should match the animation duration
    };

    const prevQuestion = () => {
        setAnimationClass('animate-prev');
        setTimeout(() => {
            setIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
            setAnimationClass('');
        }, 300); // timeout duration should match the animation duration
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => nextQuestion(),
        onSwipedRight: () => prevQuestion(),
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
    }, [index]);

    return (
        <div className="App">
            <div {...handlers} className={`card ${animationClass}`}>
                <p>{questions[index]}</p>
            </div>
        </div>
    );
}

export default App;
