// Select all cells, status text, and the restart button
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

// Define win conditions
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize game state
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// Initialize the game
initializeGame();

function initializeGame() {
    // Add click event listeners to all cells
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    // Add click event listener to the restart button
    restartBtn.addEventListener("click", restartGame);
    // Display the initial game status
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    // Get the index of the clicked cell
    const cellIndex = this.getAttribute("cellIndex");

    // Ignore clicks on filled cells or if the game is over
    if (options[cellIndex] !== "" || !running) {
        return;
    }

    // Update the cell and check for a winner
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    // Set the value in the options array and update the cell's content
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    // Switch players and update the status text
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    // Check all win conditions
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        // Skip if any cell in the condition is empty
        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        // Check if all cells in the condition are the same
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;

            // Highlight the winning cells
            cells[condition[0]].style.backgroundColor = "#90ee90";
            cells[condition[1]].style.backgroundColor = "#90ee90";
            cells[condition[2]].style.backgroundColor = "#90ee90";
            break;
        }
    }

    if (roundWon) {
        // Announce the winner and stop the game
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes("")) {
        // Announce a draw if all cells are filled
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        // Continue the game with the other player
        changePlayer();
    }
}

function restartGame() {
    // Reset the game state
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;

    // Clear all cells and remove highlight
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "";
    });
}
