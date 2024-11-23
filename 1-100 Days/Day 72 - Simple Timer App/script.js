// Get references to DOM elements
const resetBtn = document.querySelector('#reset');
const playBtn = document.querySelector('#play');
const timerEl = document.querySelector('#timer');
const timerDisplayEl = document.querySelector('#timer-display');
const root = document.querySelector(':root');

// Initial setup
let playing = false;
let totalMilliseconds = 60000; // Default to 1 minute (60000 ms)
let currentMilliseconds = totalMilliseconds;
updateTimerDisplay(currentMilliseconds);
root.style.setProperty('--degrees', '0deg');

let timerInterval = null;

// Event listeners
playBtn.addEventListener('click', togglePlayPause);
resetBtn.addEventListener('click', resetAll);
timerEl.addEventListener('click', enableTimeInput);

// Toggle play/pause
function togglePlayPause() {
  playing = !playing;
  playBtn.classList.toggle('bg-green-500');
  const playIcon = playBtn.querySelector('i');
  playIcon.classList.toggle('fa-play');
  playIcon.classList.toggle('fa-pause');

  if (playing) {
    startTimer();
  } else {
    pauseTimer();
  }
}

// Start the timer
function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(run, 10); // Update every 10 ms
  }
}

// Pause the timer
function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Run the timer
function run() {
  if (playing) {
    currentMilliseconds -= 10;
    if (currentMilliseconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      playing = false;
      playBtn.classList.remove('bg-green-500');
      const playIcon = playBtn.querySelector('i');
      playIcon.classList.remove('fa-pause');
      playIcon.classList.add('fa-play');
      currentMilliseconds = 0;
    }

    updateTimerDisplay(currentMilliseconds);
    root.style.setProperty('--degrees', calcDeg());
  }
}

// Update the timer display
function updateTimerDisplay(milliseconds) {
  const time = millisecondsToTime(milliseconds);
  timerDisplayEl.innerText = `${time.days.toString().padStart(2, '0')}:${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}:${time.milliseconds.toString().padStart(3, '0')}`;
}

// Convert milliseconds to time components
function millisecondsToTime(ms) {
  let milliseconds = ms % 1000;
  let totalSeconds = Math.floor(ms / 1000);

  let seconds = totalSeconds % 60;
  let totalMinutes = Math.floor(totalSeconds / 60);

  let minutes = totalMinutes % 60;
  let totalHours = Math.floor(totalMinutes / 60);

  let hours = totalHours % 24;
  let days = Math.floor(totalHours / 24);

  return { days, hours, minutes, seconds, milliseconds };
}

// Calculate the degrees for the progress circle
function calcDeg() {
  const degrees = 360 - (currentMilliseconds / totalMilliseconds) * 360;
  return `${degrees}deg`;
}

// Reset all values
function resetAll() {
  playing = false;
  pauseTimer();
  playBtn.classList.remove('bg-green-500');
  const playIcon = playBtn.querySelector('i');
  playIcon.classList.remove('fa-pause');
  playIcon.classList.add('fa-play');
  currentMilliseconds = totalMilliseconds;
  updateTimerDisplay(currentMilliseconds);
  root.style.setProperty('--degrees', '0deg');
}

// Enable time input
function enableTimeInput() {
  if (playing) return; // Do not allow changing time while playing

  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.classList.add('timer-input');
  inputEl.value = timerDisplayEl.innerText;
  timerEl.replaceChild(inputEl, timerDisplayEl);
  inputEl.focus();

  inputEl.addEventListener('blur', () => {
    parseAndSetTime(inputEl.value);
    timerEl.replaceChild(timerDisplayEl, inputEl);
  });

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      parseAndSetTime(inputEl.value);
      timerEl.replaceChild(timerDisplayEl, inputEl);
    }
  });
}

// Parse the input time and set the timer
function parseAndSetTime(input) {
  const timeParts = input.split(':');
  if (timeParts.length !== 5) {
    alert('Please enter time in DD:HH:MM:SS:MS format.');
    updateTimerDisplay(currentMilliseconds);
    return;
  }

  let [days, hours, minutes, seconds, milliseconds] = timeParts.map(Number);

  if (
    isNaN(days) || isNaN(hours) || isNaN(minutes) ||
    isNaN(seconds) || isNaN(milliseconds)
  ) {
    alert('Please enter valid numbers.');
    updateTimerDisplay(currentMilliseconds);
    return;
  }

  // Convert all to milliseconds
  totalMilliseconds =
    days * 24 * 60 * 60 * 1000 +
    hours * 60 * 60 * 1000 +
    minutes * 60 * 1000 +
    seconds * 1000 +
    milliseconds;

  currentMilliseconds = totalMilliseconds;

  // Update the display and progress circle
  updateTimerDisplay(currentMilliseconds);
  root.style.setProperty('--degrees', '0deg');
}
