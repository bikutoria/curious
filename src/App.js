import React, { useState, useEffect } from 'react';
import './App.css';
import { trackEvent, initializeAmplitude } from './analytics/amplitude';
import WelcomeScreen from './components/WelcomeScreen';
import Card from './components/Card';

function App() {
    const [view, setView] = useState('welcomeScreen');

    useEffect(() => {
        initializeAmplitude();
        if (view === 'welcomeScreen') {
            trackEvent('Welcome Page View');
        }
    }, [view]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submit clicked");
        const inputs = {
            haveFun: document.getElementById('have-fun').value,
            shareInsights: document.getElementById('share-insights').value,
            exploreDynamics: document.getElementById('explore-dynamics').value
        };
        trackEvent('Welcome Page Submit', inputs);
        setView('cardGame');
    };

    const views = {
        welcomeScreen: <WelcomeScreen onSubmit={handleSubmit} />,
        cardGame: <Card />
    }

    return (
        <div className="App">
            {views[view]}
        </div>
    );
}

export default App;
