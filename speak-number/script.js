const msgEl = document.getElementById('msg');

const randomNum = getRandom();

console.log(randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
  <div>You Said:</div>
  <span class="box">${msg}</span>
  `;
}

// Check Number
function checkNumber(msg) {
  const num = +msg;

  // Check if valid Number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>That is not a valid number</div>`;
    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
    return;
  }

  // Check Number
  if (num === randomNum) {
    console.log('equal');
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>`;
  } else if (num > randomNum) {
    console.log('High');
    msgEl.innerHTML += `<div>GO LOWER</div>`;
  } else {
    console.log('LOW');
    msgEl.innerHTML += `<div>GO HIGHER</div>`;
  }
}

// Generate Random Number
function getRandom() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

// Play Button
document.body.addEventListener('click', (e) => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});
