import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { fetchQuestions } from '../services/fetchQuestions';
import { shuffleArray } from '../services/shuffle';
import { trackEvent } from '../analytics/amplitude';

const Card = () => {
    const [questions, setQuestions] = useState([]);
    const [animationClass, setAnimationClass] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetchQuestions().then((fetchedQuestions) => {
            const shuffledQuestions = shuffleArray(fetchedQuestions);
            setQuestions(shuffledQuestions);
            if (shuffledQuestions.length > 0) {
                trackEvent('Card Page View', { questionID: shuffledQuestions[0].id });
            }
        })
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                Like();
            } else if (event.key === 'ArrowLeft') {
                Dislike();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [index, questions.length]);

    const Like = () => {
        const currentQuestion = questions[index];
        setAnimationClass('animate-fwd');
        setTimeout(() => {
            const newIndex = (index + 1) % questions.length;
            setIndex(newIndex);
            setAnimationClass('');
            trackEvent('Next Question', { questionID: currentQuestion.id, score: '+1' });
        }, 700);
    };

    const Dislike = () => {
        const currentQuestion = questions[index];
        setAnimationClass('animate-back');
        setTimeout(() => {
            const newIndex = (index + 1 + questions.length) % questions.length;
            setIndex(newIndex);
            setAnimationClass('');
            trackEvent('Next Question', { questionID: currentQuestion.id, score: '-1' });
        }, 700);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => Dislike(),
        onSwipedRight: () => Like(),
    });

    return (
        <div {...handlers} className={`card ${animationClass}`}>
            {/* Ensure questions array is not empty and access the text property */}
            <p>{questions.length > 0 ? questions[index].text : 'Loading...'}</p>
        </div>
    );
};

export default Card;