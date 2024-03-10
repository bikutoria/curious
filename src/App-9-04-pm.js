import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';
import { fetchQuestions } from './services/fetchQuestions'; // Adjusted import path
import { shuffleArray } from './services/shuffle'; // Import the shuffle function
import { initializeAmplitude, trackEvent } from './analytics/amplitude';

function App() {
    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        const loadQuestions = async () => {
            const fetchedQuestions = await fetchQuestions();
            const shuffledQuestions = shuffleArray(fetchedQuestions); // Shuffle the questions after fetching
            setQuestions(shuffledQuestions);
        };

        loadQuestions();
        initializeAmplitude();
    }, []);

    // Function to advance to the next question
    const nextQuestion = () => {
        setAnimationClass('animate-next');
        setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % questions.length);
            setAnimationClass('');
        }, 700); // Adjusted to match the CSS animation timing
        trackEvent('Next Question', { questionIndex: index });
    };

    // Function to go back to the previous question
    const prevQuestion = () => {
        setAnimationClass('animate-prev');
        setTimeout(() => {
            setIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
            setAnimationClass('');
        }, 700); // Adjusted to match the CSS animation timing
        trackEvent('Previous Question', { questionIndex: index });
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
    }, [index, questions.length]); // Added questions.length to ensure re-binding when questions load

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
                {/* Ensure questions array is not empty before trying to access its elements */}
                <p>{questions.length > 0 ? questions[index] : 'Loading...'}</p>
            </div>
        </div>
    );
}

export default App;
