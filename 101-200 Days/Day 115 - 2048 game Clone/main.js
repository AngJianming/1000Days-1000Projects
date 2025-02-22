document.addEventListener("DOMContentLoaded", () => {
    const gridSize = 4;
    let board = [];
    let score = 0;

    // Initialize the game board with zeros and add two starting tiles.
    function initBoard() {
        board = [];
        for (let i = 0; i < gridSize; i++) {
            board.push(new Array(gridSize).fill(0));
        }
        addRandomTile();
        addRandomTile();
        updateBoard();
    }

    // Add a new tile (2 or 4) at a random empty cell.
    function addRandomTile() {
        let emptyCells = [];
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (board[i][j] === 0) {
                    emptyCells.push({ i, j });
                }
            }
        }
        if (emptyCells.length > 0) {
            let { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[i][j] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    // Render the board by creating tile elements for non-zero cells.
    function updateBoard() {
        const tileContainer = document.querySelector('.tile-container');
        tileContainer.innerHTML = ''; // Clear previous tiles

        board.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell !== 0) {
                    let tile = document.createElement('div');
                    tile.classList.add('tile');
                    // Use CSS Grid to position the tile.
                    tile.style.gridRowStart = i + 1;
                    tile.style.gridColumnStart = j + 1;
                    tile.textContent = cell;
                    tileContainer.appendChild(tile);
                }
            });
        });
    }

    // Helper function to slide and merge a row to the left.
    function slide(row) {
        let arr = row.filter(val => val);
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] === arr[i + 1]) {
                arr[i] *= 2;
                score += arr[i];
                arr[i + 1] = 0;
            }
        }
        arr = arr.filter(val => val);
        while (arr.length < gridSize) {
            arr.push(0);
        }
        return arr;
    }

    // Transpose the board (useful for vertical moves).
    function transpose(matrix) {
        return matrix[0].map((_, i) => matrix.map(row => row[i]));
    }

    // Move functions for each direction.
    function moveLeft() {
        for (let i = 0; i < gridSize; i++) {
            board[i] = slide(board[i]);
        }
    }

    function moveRight() {
        for (let i = 0; i < gridSize; i++) {
            board[i] = slide(board[i].slice().reverse()).reverse();
        }
    }

    function moveUp() {
        board = transpose(board);
        moveLeft();
        board = transpose(board);
    }

    function moveDown() {
        board = transpose(board);
        moveRight();
        board = transpose(board);
    }

    // Listen for key events to control the game.
    document.addEventListener("keydown", e => {
        let previousBoard = JSON.stringify(board);
        let directionClass = "";
        const tileContainer = document.querySelector('.tile-container');

        switch (e.key) {
            case "ArrowLeft":
                directionClass = "move-left";
                moveLeft();
                break;
            case "ArrowRight":
                directionClass = "move-right";
                moveRight();
                break;
            case "ArrowUp":
                directionClass = "move-up";
                moveUp();
                break;
            case "ArrowDown":
                directionClass = "move-down";
                moveDown();
                break;
            default:
                return; // Ignore other keys
        }

        // Apply the movement animation class.
        if (directionClass) {
            tileContainer.classList.add(directionClass);
            setTimeout(() => {
                tileContainer.classList.remove(directionClass);
            }, 200); // Match the animation duration
        }

        // Only add a new tile if the move changed the board.
        if (previousBoard !== JSON.stringify(board)) {
            addRandomTile();
            updateBoard();
        }
    });

    // Toggle the display of instructions.
    const toggleBtn = document.getElementById("toggle-instructions");
    const instructionsText = document.getElementById("instructions-text");

    toggleBtn.addEventListener("click", () => {
        if (instructionsText.style.display === "none") {
            instructionsText.style.display = "block";
            toggleBtn.textContent = "Hide Instructions";
        } else {
            instructionsText.style.display = "none";
            toggleBtn.textContent = "Show Instructions";
        }
    });

    // Start the game.
    initBoard();
});
