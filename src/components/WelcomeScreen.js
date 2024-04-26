import React, { useEffect, useRef } from 'react';

const WelcomeScreen = ({ onSubmit }) => {
    const haveFunRef = useRef(null);
    const shareInsightsRef = useRef(null);
    const exploreDynamicsRef = useRef(null);

    const setSliderBackground = (slider) => {
        const value = slider.value;
        const min = slider.min;
        const max = slider.max;
        const percentage = ((value - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, #E94057 0%, #E94057 ${percentage}%, #ddd ${percentage}%, #ddd 100%)`;
    };

    useEffect(() => {
        setSliderBackground(haveFunRef.current);
        setSliderBackground(shareInsightsRef.current);
        setSliderBackground(exploreDynamicsRef.current);
    }, []);

    const handleSliderChange = (event) => {
        setSliderBackground(event.target);
    };

    return (
        <div className="welcome-screen">
            <h2>Set the intent.</h2>
            <p>Start by choosing the mood you're going for - a fun night or a deeper connection - and we'll pick the perfect questions to get you there!</p>
            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <label htmlFor="have-fun">Have fun</label>
                    <input type="range" ref={haveFunRef} id="have-fun" name="haveFun" min="1" max="5" defaultValue="3" onChange={handleSliderChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="share-insights">Share personal insights</label>
                    <input type="range" ref={shareInsightsRef} id="share-insights" name="shareInsights" min="1" max="5" defaultValue="3" onChange={handleSliderChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="explore-dynamics">Explore relationship dynamics</label>
                    <input type="range" ref={exploreDynamicsRef} id="explore-dynamics" name="exploreDynamics" min="1" max="5" defaultValue="3" onChange={handleSliderChange} />
                </div>
                <button type="submit">Continue</button>
            </form>
        </div>
    );
};

export default WelcomeScreen;