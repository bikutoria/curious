export const shuffleArray = (array) => {
    let shuffledArray = [...array];

    // Function to shuffle a subset of the array
    const shuffleSubset = (subArray) => {
        for (let i = subArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [subArray[i], subArray[j]] = [subArray[j], subArray[i]];
        }
        return subArray;
    };

    // Separate questions based on the Familiarity score
    const familiarity1 = shuffledArray.filter(q => q.familiarity === '1');
    const familiarity2 = shuffledArray.filter(q => q.familiarity === '2');
    const familiarity3 = shuffledArray.filter(q => q.familiarity === '3');

    // Shuffle each group
    const shuffledFamiliarity1 = shuffleSubset(familiarity1);
    const shuffledFamiliarity2 = shuffleSubset(familiarity2);
    const shuffledFamiliarity3 = shuffleSubset(familiarity3);

    // Get the specific number of questions from each shuffled subset
    const firstThree = shuffledFamiliarity1.slice(0, 3);
    const nextFour = shuffledFamiliarity1.slice(3, 4).concat(shuffledFamiliarity2.slice(0, 3));
    const followingFour = shuffledFamiliarity2.slice(3, 4).concat(shuffledFamiliarity3.slice(0, 3));

    // Combine all the rest
    const rest = shuffledFamiliarity1.slice(4)
        .concat(shuffledFamiliarity2.slice(4), shuffledFamiliarity3.slice(3));

    // Shuffle the rest of the questions
    const shuffledRest = shuffleSubset(rest);

    // Combine all parts into the final array, ensuring the sequence and no repetition
    return firstThree.concat(nextFour, followingFour, shuffledRest);
};
