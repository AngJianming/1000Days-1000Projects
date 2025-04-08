const quotes = [
    "The quick brown fox jumps over the lazy dog",
    "Practice makes perfect",
    "Never stop learning",
    "Code is like humor when you have to explain it it's bad",
    "Simplicity is the soul of efficiency",
    "First solve the problem then write the code"
];

const quoteEl = document.getElementById('quote');
const inputEl = document.getElementById('input');
const startBtn = document.getElementById('start-btn');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');

let startTime, timerInterval;
let timerStarted = false;

function pickRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function startTest() {
    // reset stats & timer
    clearInterval(timerInterval);
    timerStarted = false;
    inputEl.value = '';
    wpmEl.textContent = '0';
    accuracyEl.textContent = '0';
    timerEl.textContent = '0.00';

    // load a new quote and enable typing
    quoteEl.textContent = pickRandomQuote();
    inputEl.disabled = false;
    inputEl.focus();

    // update button text
    startBtn.textContent = 'Ready...';
}

// called on first keystroke
function beginTimer() {
    timerStarted = true;
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        timerEl.textContent = elapsed.toFixed(2);
    }, 50);
}

function endTest() {
    clearInterval(timerInterval);
    inputEl.disabled = true;
    startBtn.textContent = 'Start Test';

    const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;
    const wordCount = quoteEl.textContent.split(' ').length;
    const wpm = Math.round(wordCount / elapsedMinutes);
    wpmEl.textContent = wpm;

    // accuracy calc
    const entered = inputEl.value.trim();
    const original = quoteEl.textContent.trim();
    let correctChars = 0;
    for (let i = 0; i < Math.min(entered.length, original.length); i++) {
        if (entered[i] === original[i]) correctChars++;
    }
    const accuracy = Math.round((correctChars / original.length) * 100);
    accuracyEl.textContent = accuracy;
}

// listen for typing
inputEl.addEventListener('input', () => {
    const entered = inputEl.value;
    const original = quoteEl.textContent;

    // start timer on first keystroke
    if (!timerStarted && entered.length > 0) {
        beginTimer();
        startBtn.textContent = 'Testing...';
    }

    // mistake detection
    const isMistake = [...entered].some((char, i) => char !== original[i]);
    if (isMistake) {
        inputEl.classList.add('error');
    } else {
        inputEl.classList.remove('error');
    }

    // finish test when fully correct
    if (entered.trim() === original) {
        endTest();
    }
});


startBtn.addEventListener('click', startTest);
