const total = document.getElementById('scale');
const wealth_add = document.getElementById('wealth-plus');
const wealth_sub = document.getElementById('wealth-minus');
const regEl = document.getElementById('registry');
const fillEl = document.getElementById('fillable');
const transEl = document.getElementById('trans-name');
const moniesEl = document.getElementById('monies');

// const funnyTrans = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 },
// ];

const localStoreTrans = JSON.parse(localStorage.getItem(`trans`));

let trans = localStorage.getItem('trans') !== null ? localStoreTrans : [];

// Add transactions
function plusTrans(e) {
  e.preventDefault();

  if (transEl.value.trim() === '' || moniesEl.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const tran = {
      id: genID(),
      text: transEl.value,
      amount: +moniesEl.value,
    };

    trans.push(tran);
    plusTransDom(tran);

    upLocalStore();
    upBalance();

    transEl.value = '';
    moniesEl.value = '';
  }
}

// generate random ID
function genID() {
  return Math.floor(Math.random() * 1000000000);
}

// Add transactions to DOM list
function plusTransDom(lineItem) {
  //Get sign
  const sign = lineItem.amount < 0 ? '-' : '+';

  const listItem = document.createElement('li');

  //add class based on value
  listItem.classList.add(lineItem.amount < 0 ? 'sub' : 'add');
  listItem.innerHTML = `
  ${lineItem.text}<span>${sign}${Math.abs(lineItem.amount)}</span>
  <button class="remove" onclick="removeTrans(${lineItem.id})">x</button>
  `;

  regEl.appendChild(listItem);
}

// Update the balance, income and expense
function upBalance() {
  const amounts = trans.map((tran) => tran.amount);
  const balance = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const plusMoney = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const subMoney = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  total.innerText = `$${balance}`;
  wealth_add.innerText = `$${plusMoney}`;
  wealth_sub.innerText = `$${subMoney}`;
}

// Remove Transaction by ID
function removeTrans(id) {
  trans = trans.filter((tran) => tran.id !== id);

  upLocalStore();
  init();
}

// Update local storage transactions
function upLocalStore() {
  localStorage.setItem('trans', JSON.stringify(trans));
}

// Init app
function init() {
  regEl.innerHTML = '';

  trans.forEach(plusTransDom);
  upBalance();
}

init();

fillEl.addEventListener('submit', plusTrans);
