const options = document.querySelectorAll('.option');
const resultText = document.getElementById('result');
const resetBtn = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer');

let userChoice;
let computerChoice;
let timer;
let timeLeft = 3; // Countdown time in seconds

// Function to get the computer's choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(user, computer) {
    if (user === computer) {
        return "It's a draw!";
    } else if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'scissors' && computer === 'paper') ||
        (user === 'paper' && computer === 'rock')
    ) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}

// Function to handle user choice
function handleUserChoice(choice) {
    clearInterval(timer); // Clear timer if the user makes a choice
    userChoice = choice;
    computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);
    resultText.textContent = `You chose: ${userChoice}, Computer chose: ${computerChoice}. ${result}`;
}

// Function to start the countdown
function startCountdown() {
    timeLeft = 3; // Reset timer
    timerDisplay.textContent = timeLeft; // Display the initial time

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            computerChoice = getComputerChoice(); // Computer makes a choice automatically
            resultText.textContent = `Time's up! Computer chose: ${computerChoice}. You lost!`;
        }
    }, 1000);
}

// Add click event listeners for options
options.forEach(option => {
    option.addEventListener('click', () => {
        handleUserChoice(option.id);
    });
});

// Reset game
resetBtn.addEventListener('click', () => {
    resultText.textContent = '';
    timerDisplay.textContent = ''; // Clear timer display
    startCountdown(); // Restart the countdown
});

// Start the game and the countdown
startCountdown();
