import React from 'react';

const WelcomeScreen = ({ onSubmit }) => {
    return (
        <div className="welcome-screen">
            <h2>What is your intent for tonight?</h2>
            <form onSubmit={onSubmit}>
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
};

export default WelcomeScreen;