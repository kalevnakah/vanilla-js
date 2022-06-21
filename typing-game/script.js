const wordyEl = document.getElementById('logos');
const charEl = document.getElementById('char');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endEl = document.getElementById('end-game-box');
const setBtnEl = document.getElementById('settings-button');
const setEl = document.getElementById('settings');
const setFormEl = document.getElementById('settings-form');
const difficultyEl = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

// Initial Word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Init difficulty
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Set difficulty select value
difficultyEl.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Focus on text on start
charEl.focus();

// Start counting down
const timeInterval = setInterval(updateTimer, 1000);

// Generate a random word array
function getRandomLogos() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addLogosToDOM() {
  randomWord = getRandomLogos();
  wordyEl.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTimer() {
  time--;
  timeEl.innerHTML = time + `s`;

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endEl.style.display = 'flex';
}

addLogosToDOM();

// Event Listeners
charEl.addEventListener('input', (e) => {
  const insertedLogos = e.target.value;

  if (insertedLogos === randomWord) {
    addLogosToDOM();
    updateScore();

    // Clear
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 1;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTimer();
  }
});

// Settings button click
setBtnEl.addEventListener('click', () => setEl.classList.toggle('disappear'));

// Settings select
setFormEl.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
