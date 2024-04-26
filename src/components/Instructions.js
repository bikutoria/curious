import React, { useState, useEffect } from 'react';

const Instructions = ({ onProceed }) => {
    const [animation, setAnimation] = useState('fadeIn');

    const handleClick = () => {
        setAnimation('fadeOut');
        setTimeout(onProceed, 800);
    };

    return (
        <div className={`instructions ${animation}`} onClick={handleClick}>
            <p>
                <b>Welcome to a deeper kind of connection.</b> Let's spark meaningful conversations and craft your date night, together.
                <br></br><br></br>
                <b>No worries, we'll keep it simple!</b> This app is your date night companion, suggesting questions tailored just for you. Answer together, spark conversation, and rediscover the magic in your connection.
                <br></br><br></br>Click to continue.</p>
        </div>
    );
};

export default Instructions;
