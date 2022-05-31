const logosEl = document.getElementById('logos');
const failCharsEl = document.getElementById('fail-char');
const newGameBtn = document.getElementById('newgame');
const showBox = document.getElementById('show-box');
const remindBox = document.getElementById('remind-box');
const showMsg = document.getElementById('end-msg');

const stickmanParts = document.querySelectorAll('.stickman-part');
const dictionary = ['application', 'programming', 'interface', 'wizzard'];

let pickLogo = dictionary[Math.floor(Math.random() * dictionary.length)];

const okChars = [];
const failChars = [];

// Show hidden word
function showLogo() {
  logosEl.innerHTML = `${pickLogo
    .split('')
    .map(
      (char) =>
        `<span class="char"> ${okChars.includes(char) ? char : ''} </span>`
    )
    .join('')}
  `;

  const innerLogo = logosEl.innerText.replace(/[ \n]/g, '');

  if (innerLogo === pickLogo) {
    showMsg.innerText = 'What is the meaning of life! 42 😃';
    showBox.style.display = 'flex';
  }
}

// show notification
function slideRemind() {
  remindBox.classList.add('slide-up');

  setTimeout(() => {
    remindBox.classList.remove('slide-up');
  }, 2000);
}

// update the wrong letters
function refreshFailCharEl() {
  //display
  failCharsEl.innerHTML = `
    ${failChars.length > 0 ? `<p>Wrong</p>` : ''}
    ${failChars.map((char) => `<span>${char}</span>`)}
  `;
  //display parts
  stickmanParts.forEach((stick, tab) => {
    const fails = failChars.length;

    if (tab < fails) {
      stick.style.display = 'block';
    } else {
      stick.style.display = 'none';
    }
  });
  //check if lost
  if (failChars.length === stickmanParts.length) {
    showMsg.innerText = 'You are not worthy. 😕';
    showBox.style.display = 'flex';
  }
}

//keydown letter press
window.addEventListener('keydown', (e) => {
  if (/^[a-zA-Z]$/g.test(e.key) == true) {
    const char = e.key;
    if (pickLogo.includes(char)) {
      if (!okChars.includes(char)) {
        okChars.push(char);

        showLogo();
      } else {
        slideRemind();
      }
    } else {
      if (!failChars.includes(char)) {
        failChars.push(char);

        refreshFailCharEl();
      } else {
        slideRemind();
      }
    }
  }
});

//restart game and play again
newGameBtn.addEventListener('click', () => {
  //Empty arrays
  okChars.splice(0);
  failChars.splice(0);

  pickLogo = dictionary[Math.floor(Math.random() * dictionary.length)];

  showLogo();

  refreshFailCharEl();

  showBox.style.display = 'none';
});

showLogo();
