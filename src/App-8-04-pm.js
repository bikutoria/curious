import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';
import questions from './questions';

function App() {
    const [index, setIndex] = useState(0);
    const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
    const [animationClass, setAnimationClass] = useState('');

    // Function to advance to the next question
    const nextQuestion = () => {
        setAnimationClass('animate-next');
        setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % questions.length);
            setAnimationClass('');
        }, 300); // Match timeout duration with animation duration
    };

    // Function to go back to the previous question
    const prevQuestion = () => {
        setAnimationClass('animate-prev');
        setTimeout(() => {
            setIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
            setAnimationClass('');
        }, 300);
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
    }, [index]); // Ensures the effect is updated if the index changes

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowWelcomeScreen(false);
    };

    if (showWelcomeScreen) {
        return (
            <div className="welcome-screen">
                <h2>What is our intent for tonight?</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="have-fun">Have fun</label>
                        <input type="range" id="have-fun" name="haveFun" min="1" max="5" defaultValue="3" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="share-insights">Share personal insights</label>
                        <input type="range" id="share-insights" name="shareInsights" min="1" max="5" defaultValue="3" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="explore-dynamics">Explore relationship dynamics</label>
                        <input type="range" id="explore-dynamics" name="exploreDynamics" min="1" max="5" defaultValue="3" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

    return (
        <div className="App">
            <div {...handlers} className={`card ${animationClass}`}>
                <p>{questions[index]}</p>
            </div>
        </div>
    );
}

export default App;
