const gameBoard = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');

const cardValues = ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h'];
let flippedCards = [];
let matchedCards = [];

// Shuffle cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the game
function initGame() {
    gameBoard.innerHTML = '';
    shuffledValues = shuffle(cardValues);
    flippedCards = [];
    matchedCards = [];
    
    shuffledValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !matchedCards.includes(this)) {
        this.classList.add('flipped');
        this.textContent = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Check for a match
function checkMatch() {
    const [card1, card2] = flippedCards;
    // Compare values in a case-insensitive way
    if (card1.dataset.value.toLowerCase() === card2.dataset.value.toLowerCase()) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        checkWin();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Check if the player has won
function checkWin() {
    if (matchedCards.length === cardValues.length) {
        setTimeout(() => alert('You won!'), 500);
    }
}

// Reset game
resetBtn.addEventListener('click', initGame);

// Start the game
initGame();
