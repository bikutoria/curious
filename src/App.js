import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';
import { fetchQuestions } from './services/fetchQuestions';
import { shuffleArray } from './services/shuffle';
import { trackEvent, initializeAmplitude } from './analytics/amplitude';
import WelcomeScreen from './components/WelcomeScreen';
import Card from './components/Card';

function App() {
    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        initializeAmplitude();
        if (showWelcomeScreen) {
            trackEvent('Welcome Page View');
        }
    }, [showWelcomeScreen]);

    useEffect(() => {
        const loadQuestions = async () => {
            const fetchedQuestions = await fetchQuestions();
            const shuffledQuestions = shuffleArray(fetchedQuestions);
            setQuestions(shuffledQuestions);
            if (!showWelcomeScreen && shuffledQuestions.length > 0) {
                trackEvent('Cards Page View');
            }
            console.log("loadQuestions triggered inside useEffect");
        };

        loadQuestions();
        console.log("loadQuestions triggered outside useEffect");
    }, [showWelcomeScreen]);

    const nextQuestion = () => {
        const currentQuestionText = questions[index];
        setAnimationClass('animate-next');
        setTimeout(() => {
            const newIndex = (index + 1) % questions.length;
            setIndex(newIndex);
            setAnimationClass('');
            trackEvent('Next Question', { questionIndex: index, questionText: currentQuestionText });
        }, 700);
    };

    const prevQuestion = () => {
        const currentQuestionText = questions[index];
        setAnimationClass('animate-prev');
        setTimeout(() => {
            const newIndex = (index - 1 + questions.length) % questions.length;
            setIndex(newIndex);
            setAnimationClass('');
            trackEvent('Previous Question', { questionIndex: index, questionText: currentQuestionText });
        }, 700);
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
    }, [index, questions.length]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submit clicked");
        const inputs = {
            haveFun: document.getElementById('have-fun').value,
            shareInsights: document.getElementById('share-insights').value,
            exploreDynamics: document.getElementById('explore-dynamics').value
        };
        trackEvent('Welcome Page Submit', inputs);
        setShowWelcomeScreen(false);
    };

    return (
        <div className="App">
            {showWelcomeScreen ? (
                <WelcomeScreen onSubmit={handleSubmit} />
            ) : (
                <div {...handlers} className={`card ${animationClass}`}>
                    <Card question={questions.length > 0 ? questions[index] : 'Loading...'} />
                </div>
            )}
        </div>
    );
}

export default App;
