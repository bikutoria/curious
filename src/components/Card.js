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
                trackEvent('Card Page View');
            }
        })
    }, []);

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
        onSwipedLeft: () => prevQuestion(),
        onSwipedRight: () => nextQuestion(),
    });

    return (
        <div {...handlers} className={`card ${animationClass}`}>
            <p>{questions.length > 0 ? questions[index] : 'Loading...'}</p>
        </div>
    )
};

export default Card;