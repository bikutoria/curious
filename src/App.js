import React, { useState, useEffect } from 'react';
import './App.css';
import { trackEvent, initializeAmplitude } from './analytics/amplitude';
import WelcomeScreen from './components/WelcomeScreen';
import Card from './components/Card';
import Instructions from './components/Instructions';

function App() {
    const [view, setView] = useState('instructions');

    useEffect(() => {
        initializeAmplitude();
        if (view === 'welcomeScreen') {
            trackEvent('Welcome Page View');
        }
    }, [view]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const inputs = {
            haveFun: 3,
            shareInsights: 3,
            exploreDynamics: 3
            /*haveFun: document.getElementById('have-fun').value,
            shareInsights: document.getElementById('share-insights').value,
            exploreDynamics: document.getElementById('explore-dynamics').value*/
        };
        trackEvent('Welcome Page Submit', inputs);
        setView('cardGame');
    };

    const handleInstructionsProceed = () => {
        setView('welcomeScreen');  // Transition to the Welcome Screen
    };

    const views = {
        instructions: <Instructions onProceed={handleInstructionsProceed} />,
        welcomeScreen: <WelcomeScreen onSubmit={handleSubmit} />,
        cardGame: <Card />
    };

    return (
        <div className="App">
            {views[view]}
        </div>
    );
}

export default App;