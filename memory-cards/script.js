const cardsBox = document.getElementById('cards-box');
const prvBtn = document.getElementById('prv');
const nxtBtn = document.getElementById('nxt');
const currentP = document.getElementById('crnt');
const shwBtn = document.getElementById('show-card-add');
const hidBtn = document.getElementById('hid');
const questEl = document.getElementById('quest');
const answrEl = document.getElementById('answr');
const addCardBtn = document.getElementById('insert-card');
const cleanrBtn = document.getElementById('clean');
const addBox = document.getElementById('add-box');

// Keep track of current card
let crntActCard = 0;

// Store Dom cards
const cardsEl = [];

// Store card Data
const cardsInfo = getCrdDt();

// const cardsInfo = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _',
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data',
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable',
//   },
// ];

// Create all cards
function createCrds() {
  cardsInfo.forEach((data, index) => createCrd(data, index));
}

// Create a single card DOM
function createCrd(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
      <p>${data.answer}</p>
    </div>
  </div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answr'));

  //add to DOM cards
  cardsEl.push(card);

  cardsBox.appendChild(card);

  upCrntTxt();
}

// Show number of cards
function upCrntTxt() {
  currentP.innerText = `${crntActCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
function getCrdDt() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Set card to local storage
function setCrdsInfo(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createCrds();

// Event Listener

// Next Button
nxtBtn.addEventListener('click', () => {
  cardsEl[crntActCard].className = 'card left';

  crntActCard = crntActCard + 1;

  if (crntActCard > cardsEl.length - 1) {
    crntActCard = cardsEl.length - 1;
  }

  cardsEl[crntActCard].className = 'card active';
  upCrntTxt();
});

// Previous Button
prvBtn.addEventListener('click', () => {
  cardsEl[crntActCard].className = 'card right';

  crntActCard = crntActCard - 1;

  if (crntActCard < 0) {
    crntActCard = 0;
  }

  cardsEl[crntActCard].className = 'card active';
  upCrntTxt();
});

// Show add container
shwBtn.addEventListener('click', () => addBox.classList.add('reveal'));

// Hide add container
hidBtn.addEventListener('click', () => addBox.classList.remove('reveal'));

// Add new card
addCardBtn.addEventListener('click', () => {
  const question = questEl.value;
  const answer = answrEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    console.log(newCard);
    createCrd(newCard);

    questEl.value = '';
    answrEl.value = '';

    addBox.classList.remove('show');

    cardsInfo.push(newCard);
    setCrdsInfo(cardsInfo);
  }
});

// Clear cards button
cleanrBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsBox.innerHTML = '';
  window.location.reload();
});
