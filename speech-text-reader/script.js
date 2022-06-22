const main = document.querySelector('main');
const voicesSel = document.getElementById('voices');
const stringBox = document.getElementById('string');
const readBtn = document.getElementById('read');
const flipBtn = document.getElementById('flip');
const shutBtn = document.getElementById('shut');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('frame');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="data">${text}</p>
  `;

  box.addEventListener('click', () => {
    defineText(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const logos = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function findVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSel.appendChild(option);
  });
}

// Set text
function defineText(text) {
  logos.text = text;
}

// Speak Text
function speakText() {
  speechSynthesis.speak(logos);
}

// Set voice
function pickVoice(e) {
  logos.voice = voices.find((voice) => voice.name === e.target.value);
}

//voices changed
speechSynthesis.addEventListener('voiceschanged', findVoices);

//Toggle text box
flipBtn.addEventListener('click', () =>
  document.getElementById('string-box').classList.toggle('reveal')
);

// Close button
shutBtn.addEventListener('click', () =>
  document.getElementById('string-box').classList.toggle('reveal')
);

// Change voice
voicesSel.addEventListener('change', pickVoice);

// Read text button
readBtn.addEventListener('click', () => {
  defineText(stringBox.value);
  speakText();
});

findVoices();
