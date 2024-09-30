const gameBoard = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');
const statusText = document.getElementById('status');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Create the game board
function createBoard() {
    gameBoard.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        gameBoard.appendChild(cellElement);
    });
}

// Handle cell click
function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    createBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

// Check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusText.textContent = `${board[a]} wins!`;
            return;
        }
    }

    if (!board.includes('')) {
        gameActive = false;
        statusText.textContent = 'It\'s a draw!';
    }
}

// Update the status text
function updateStatus() {
    if (gameActive) {
        statusText.textContent = `Current Player: ${currentPlayer}`;
    }
}

// Reset the game
resetBtn.addEventListener('click', resetGame);
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    createBoard();
    statusText.textContent = 'Current Player: X';
}

// Initialize the game
createBoard();
updateStatus();
