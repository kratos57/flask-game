const wordDisplay = document.getElementById('word-display');
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const incorrectGuessesDisplay = document.getElementById('incorrect-guesses');
const resultDisplay = document.getElementById('result');
const resetBtn = document.getElementById('reset-btn');

const words = ["javascript", "hangman", "flask", "python", "programming"]; // Add more words here
let selectedWord;
let guessedLetters = [];
let incorrectGuesses = [];
let maxIncorrectGuesses = 6;
let helpUsed = false; 
function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    incorrectGuesses = [];
    wordDisplay.textContent = '_ '.repeat(selectedWord.length).trim();
    incorrectGuessesDisplay.textContent = '';
    resultDisplay.textContent = '';
}

function displayWord() {
    const display = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    wordDisplay.textContent = display;

    if (!display.includes('_')) {
        resultDisplay.textContent = 'You won!';
    }
}

function handleGuess() {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = '';

    if (!guess || guessedLetters.includes(guess) || incorrectGuesses.includes(guess)) {
        return; // Ignore empty input or repeated guesses
    }

    if (selectedWord.includes(guess)) {
        guessedLetters.push(guess);
    } else {
        incorrectGuesses.push(guess);
        incorrectGuessesDisplay.textContent = `Incorrect guesses: ${incorrectGuesses.join(', ')}`;
        if (incorrectGuesses.length >= maxIncorrectGuesses) {
            resultDisplay.textContent = `You lost! The word was "${selectedWord}".`;
        }
    }

    displayWord();
}
// Track if help has been used

function provideHelp() {
    if (!helpUsed) {
        // Get a letter that hasn't been guessed yet
        const unrevealedLetters = selectedWord.split('').filter(letter => !guessedLetters.includes(letter));
        if (unrevealedLetters.length > 0) {
            const letterToReveal = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)];
            guessedLetters.push(letterToReveal);
            displayWord(); // Update the displayed word with the newly revealed letter
            helpUsed = true; // Mark help as used
            alert(`Help! The letter "${letterToReveal}" is in the word.`);
        } else {
            alert("No help available; all letters are already revealed!");
        }
    } else {
        alert("You've already used your help!");
    }
}

document.getElementById('help-btn').addEventListener('click', provideHelp);

guessBtn.addEventListener('click', handleGuess);
resetBtn.addEventListener('click', startGame);

// Start the game on page load
startGame();
