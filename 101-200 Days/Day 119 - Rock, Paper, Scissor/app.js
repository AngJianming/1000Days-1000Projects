// Define the possible moves in the game
const choices = ["rock", "paper", "scissors"];

// Initialize scores for player and computer
let playerScore = 0;
let computerScore = 0;

// Array to store player's move history for smart computer strategy
let playerMoveHistory = [];

// Get references to DOM elements for later manipulation
const buttons = document.querySelectorAll(".choice");
const resultText = document.getElementById("result-text");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");

// Attach click event listeners to each move button
buttons.forEach(button => {
    button.addEventListener("click", () => {
        // Retrieve the player's choice from the button's data attribute
        const playerChoice = button.getAttribute("data-choice");

        // Record the player's move into history for smart algorithm analysis
        playerMoveHistory.push(playerChoice);

        // Get computer's move using our improved algorithm
        const computerChoice = getComputerChoice();

        // Determine the result of this round (win, lose, or tie)
        const result = getResult(playerChoice, computerChoice);

        // Update the scores based on the outcome
        updateScores(result);

        // Play the animation corresponding to the result and moves chosen
        playAnimation(result, playerChoice, computerChoice);
    });
});

/**
 * Function to get the computer's move.
 * It uses a smart algorithm: if there are enough past moves, it analyzes the player's most frequent move
 * and counters it. Otherwise, it falls back to pure randomness.
 */
function getComputerChoice() {
    // If player has made 3 or more moves, analyze the history
    if (playerMoveHistory.length >= 3) {
        // Create a frequency counter for player's moves
        let frequency = { rock: 0, paper: 0, scissors: 0 };
        for (let move of playerMoveHistory) {
            frequency[move] = (frequency[move] || 0) + 1;
        }

        // Determine the player's most frequent move
        let mostFrequent = null;
        let maxCount = 0;
        for (let move of choices) {
            if (frequency[move] > maxCount) {
                maxCount = frequency[move];
                mostFrequent = move;
            }
        }

        // Mapping of what move beats what:
        // rock is beaten by paper, paper is beaten by scissors, scissors is beaten by rock
        const counterMove = { rock: "paper", paper: "scissors", scissors: "rock" };

        // To avoid being too predictable, use the counter move 70% of the time.
        if (Math.random() < 0.7) {
            return counterMove[mostFrequent];
        }
    }
    // Fallback: choose randomly among all moves (ensuring all three options are possible)
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

/**
 * Function to determine the game result.
 * Returns "You win!", "You lose!", or "It's a tie!" based on the moves.
 */
function getResult(player, computer) {
    if (player === computer) {
        return "It's a tie!";
    }
    // Check if player wins by comparing winning scenarios
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "You win!";
    } else {
        return "You lose!";
    }
}

/**
 * Function to update the scores based on the round result.
 */
function updateScores(result) {
    if (result === "You win!") {
        playerScore++;
        playerScoreSpan.textContent = playerScore;
    } else if (result === "You lose!") {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
    }
}

/**
 * Function to play the animation for each round.
 * Depending on the result, different animations are triggered:
 * - Winning or losing animations for move clashes (rock beats scissors, etc.)
 * - A bounce animation for ties.
 */
function playAnimation(result, playerChoice, computerChoice) {
    let animationClass = "";
    let winner = "";
    const animationWrapper = document.getElementById("animation-wrapper");
    const playerMoveElem = document.querySelector(".player-move");
    const computerMoveElem = document.querySelector(".computer-move");

    // Map moves to corresponding emojis
    const emojiMap = { rock: "✊", paper: "✋", scissors: "✌️" };
    playerMoveElem.textContent = emojiMap[playerChoice];
    computerMoveElem.textContent = emojiMap[computerChoice];

    // Determine which animation class to use based on the result and moves chosen
    if (result === "It's a tie!") {
        // For ties, both moves get a bounce effect
        animationClass = "animate-tie";
    } else if (result === "You win!") {
        // If player wins, choose the appropriate animation based on player's move beating computer's move
        if (playerChoice === "rock" && computerChoice === "scissors") {
            animationClass = "animate-rock-beats-scissors";
        } else if (playerChoice === "paper" && computerChoice === "rock") {
            animationClass = "animate-paper-beats-rock";
        } else if (playerChoice === "scissors" && computerChoice === "paper") {
            animationClass = "animate-scissors-beats-paper";
        }
        winner = "player";
    } else if (result === "You lose!") {
        // If computer wins, choose the animation based on computer's winning move
        if (computerChoice === "rock" && playerChoice === "scissors") {
            animationClass = "animate-rock-beats-scissors";
        } else if (computerChoice === "paper" && playerChoice === "rock") {
            animationClass = "animate-paper-beats-rock";
        } else if (computerChoice === "scissors" && playerChoice === "paper") {
            animationClass = "animate-scissors-beats-paper";
        }
        winner = "computer";
    }

    // Display the animation container with the proper animation class.
    // Append the "computer-win" modifier if the computer is the winner.
    animationWrapper.style.display = "flex";
    animationWrapper.className = "animation-wrapper " + animationClass + (winner === "computer" ? " computer-win" : "");

    // Clear the result text during the animation
    resultText.textContent = "";

    // After the animation duration (1 second), hide the animation and show the round result
    setTimeout(() => {
        animationWrapper.style.display = "none";
        animationWrapper.className = "animation-wrapper";
        resultText.textContent = result;
    }, 1000);
}
