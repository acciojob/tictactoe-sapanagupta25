//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

document.getElementById("submit").addEventListener("click", () => {
    player1 = document.getElementById("player1").value.trim();
    player2 = document.getElementById("player2").value.trim();

    if (player1 && player2) {
        document.querySelector(".input-section").classList.add("hidden");
        document.querySelector(".game-section").classList.remove("hidden");
        currentPlayer = player1;
        updateMessage(`${currentPlayer}, you're up!`);
        createBoard();
    } else {
        alert("Please enter names for both players.");
    }
});

function createBoard() {
    const boardElement = document.querySelector(".board");
    boardElement.innerHTML = "";
    board = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("id", i + 1); // IDs start from 1 for Cypress
        cell.addEventListener("click", () => handleCellClick(i));
        boardElement.appendChild(cell);
    }
}

function handleCellClick(index) {
    if (board[index] || gameOver) return;

    board[index] = currentPlayer === player1 ? "x" : "o";
    document.getElementById(index + 1).innerText = board[index];
    document.getElementById(index + 1).classList.add("taken");

    if (checkWinner()) {
        updateMessage(`${currentPlayer} congratulations you won!`);
        gameOver = true;
        document.getElementById("restart").classList.remove("hidden");
        return;
    }

    if (board.every(cell => cell !== "")) {
        updateMessage("It's a draw!");
        gameOver = true;
        document.getElementById("restart").classList.remove("hidden");
        return;
    }

    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    updateMessage(`${currentPlayer}, you're up!`);
}

function updateMessage(msg) {
    document.querySelector(".message").innerText = msg;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[b] === board[c];
    });
}

document.getElementById("restart").addEventListener("click", () => {
    createBoard();
    currentPlayer = player1;
    updateMessage(`${currentPlayer}, you're up!`);
    document.getElementById("restart").classList.add("hidden");
});
