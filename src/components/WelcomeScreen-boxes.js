import React, { useState } from 'react';
import { trackEvent } from '../analytics/amplitude';

const WelcomeScreen = ({ onSubmit }) => {
    // State to track selected intents
    const [selectedIntents, setSelectedIntents] = useState([]);

    const intents = [
        'Have fun',
        'Get to know each other',
        'Introspect together',
        'Explore life goals',
        'Soul-connect',
        'Simply chat'
    ];

    const toggleIntent = (intent) => {
        // Check if the intent is already selected
        const index = selectedIntents.indexOf(intent);
        if (index > -1) {
            // Intent is currently selected, remove it
            setSelectedIntents(selectedIntents.filter(item => item !== intent));
        } else {
            // Intent is not selected, add it
            setSelectedIntents([...selectedIntents, intent]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Track event with selected intents
        trackEvent('Intent Submit', { intents: selectedIntents });
        onSubmit(); // Proceed to the next view or logic
    };

    return (
        <div className="welcome-screen" >
            <h2>Set the intent.</h2>
            <p>Start by choosing the mood you're going for - a fun night or a deeper connection - and we'll pick the perfect questions to get you there! (Pick all that applies.)</p>
            <div className="intent-boxes">
                {intents.map(intent => (
                    <button
                        key={intent}
                        className={`intent-box ${selectedIntents.includes(intent) ? 'selected' : ''}`}
                        onClick={() => toggleIntent(intent)}
                    >
                        {intent}
                    </button>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Continue</button>
            </form>
        </div>
    );
};

export default WelcomeScreen;
