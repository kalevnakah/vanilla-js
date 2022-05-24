const main = document.getElementById('box');
const addPersonBtn = document.getElementById('add-person');
const twoTimesBtn = document.getElementById('times-two');
const filterMillBtn = document.getElementById('filter-mill');
const organizeBtn = document.getElementById('organize');
const totalMoneyBtn = document.getElementById('total-money');

let allTheThings = [];

getRandomPerson();
getRandomPerson();
getRandomPerson();

// fetch random user and add money
async function getRandomPerson() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  console.log(data);
}
