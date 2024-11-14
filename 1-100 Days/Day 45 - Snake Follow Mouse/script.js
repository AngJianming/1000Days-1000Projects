// Number of segments in the snake
const segmentCount = 20;

// Delay between each segment
const delay = 5;

// Create the snake segments
const snakeContainer = document.getElementById("snake-container");
const segments = Array.from({ length: segmentCount }, () => {
    const segment = document.createElement("div");
    segment.classList.add("snake-segment");
    snakeContainer.appendChild(segment);
    return segment;
});

// Initialize position arrays for x and y
const xPos = Array(segmentCount).fill(0);
const yPos = Array(segmentCount).fill(0);

// Update mouse position
let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Animation loop
function animateSnake() {
    // Set the first segment to follow the mouse
    xPos[0] += (mouseX - xPos[0]) / delay;
    yPos[0] += (mouseY - yPos[0]) / delay;
    segments[0].style.left = `${xPos[0]}px`;
    segments[0].style.top = `${yPos[0]}px`;

    // Move each segment to follow the one in front of it
    for (let i = 1; i < segmentCount; i++) {
        xPos[i] += (xPos[i - 1] - xPos[i]) / delay;
        yPos[i] += (yPos[i - 1] - yPos[i]) / delay;
        segments[i].style.left = `${xPos[i]}px`;
        segments[i].style.top = `${yPos[i]}px`;
    }

    // Request the next frame
    requestAnimationFrame(animateSnake);
}

// Start the animation
animateSnake();
