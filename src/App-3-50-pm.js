import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';
import questions from './questions';

function App() {
    const [index, setIndex] = useState(0);
    const [showWelcomeScreen, setShowWelcomeScreen] = useState(true); // State to toggle welcome screen
    const [animationClass, setAnimationClass] = useState('');

    const nextQuestion = () => {
        setAnimationClass('animate-next');
        setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % questions.length);
            setAnimationClass('');
        }, 300); // Match timeout duration with animation duration
    };

    const prevQuestion = () => {
        setAnimationClass('animate-prev');
        setTimeout(() => {
            setIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
            setAnimationClass('');
        }, 300);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => nextQuestion(),
        onSwipedRight: () => prevQuestion(),
    });

    // Handle submission of the welcome screen form
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
