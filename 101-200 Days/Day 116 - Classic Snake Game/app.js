const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;

let snake, food, d, gameInterval, score;
let speed = 150; // default speed (ms per tick)
const goalFruits = 10; // win when score reaches this value

// Modal elements
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");
const modalRestart = document.getElementById("modalRestart");
const modalSettings = document.getElementById("modalSettings");
const settingsModal = document.getElementById("settingsModal");
const settingsSave = document.getElementById("settingsSave");
const settingsCancel = document.getElementById("settingsCancel");
const speedInput = document.getElementById("speedInput");

// UI buttons
const restartBtn = document.getElementById("restartBtn");
const settingsBtn = document.getElementById("settingsBtn");
const scoreDisplay = document.getElementById("score");

function initGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    d = "RIGHT";
    score = 0;
    scoreDisplay.innerText = "Score: " + score;
    // Hide modals if they're open
    modal.style.display = "none";
    settingsModal.style.display = "none";
    // Clear any existing interval
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(draw, speed);
}

// Listen for arrow keys and WASD
document.addEventListener("keydown", direction);
function direction(event) {
    if ((event.key === "ArrowLeft" || event.key === "a" || event.key === "A") && d !== "RIGHT") d = "LEFT";
    else if ((event.key === "ArrowUp" || event.key === "w" || event.key === "W") && d !== "DOWN") d = "UP";
    else if ((event.key === "ArrowRight" || event.key === "d" || event.key === "D") && d !== "LEFT") d = "RIGHT";
    else if ((event.key === "ArrowDown" || event.key === "s" || event.key === "S") && d !== "UP") d = "DOWN";
}

// Check for collision with self
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) return true;
    }
    return false;
}

// Main draw loop
function draw() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lime" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "#111";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Current head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (d === "LEFT") snakeX -= box;
    if (d === "UP") snakeY -= box;
    if (d === "RIGHT") snakeX += box;
    if (d === "DOWN") snakeY += box;

    // Check if snake eats food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        scoreDisplay.innerText = "Score: " + score;
        // If goal reached, win the game
        if (score >= goalFruits) {
            clearInterval(gameInterval);
            modalMessage.innerText = "Congrats! You ate all the fruits! Your score: " + score;
            modal.style.display = "flex";
            return;
        }
        // Generate new food
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
        // Don't remove tail so snake grows
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Game over conditions: wall or self collision
    if (
        snakeX < 0 || snakeY < 0 ||
        snakeX >= canvas.width || snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(gameInterval);
        modalMessage.innerText = "Oops, you crashed! Your final score: " + score;
        modal.style.display = "flex";
        return;
    }

    snake.unshift(newHead);
}

// Event listeners for UI buttons
restartBtn.addEventListener("click", initGame);
settingsBtn.addEventListener("click", () => {
    settingsModal.style.display = "flex";
});
modalRestart.addEventListener("click", initGame);
modalSettings.addEventListener("click", () => {
    modal.style.display = "none";
    settingsModal.style.display = "flex";
});

// Settings modal controls
settingsSave.addEventListener("click", () => {
    const newSpeed = parseInt(speedInput.value, 10);
    if (!isNaN(newSpeed) && newSpeed > 0) {
        speed = newSpeed;
        // If game is running, update interval immediately
        if (gameInterval) {
            clearInterval(gameInterval);
            gameInterval = setInterval(draw, speed);
        }
    }
    settingsModal.style.display = "none";
});
settingsCancel.addEventListener("click", () => {
    settingsModal.style.display = "none";
});

// Start game on load
initGame();
