// src/services/shuffle.js

// Function to shuffle an array using the Fisher-Yates (aka Knuth) shuffle algorithm
export const shuffleArray = (array) => {
  let shuffledArray = [...array]; // Create a copy of the array to avoid mutating the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
};

console.log("Shuffle triggered");
