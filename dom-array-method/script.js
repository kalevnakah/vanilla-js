const thingHolder = document.getElementById('thing');
const addPersonBtn = document.getElementById('add_person');
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
  const fruit = await fetch('https://randomuser.me/api');
  const profile = await fruit.json();

  const person = profile.results[0];

  const newPerson = {
    handle: `${person.name.first} ${person.name.last}`,
    worth: Math.floor(Math.random() * 1000000),
  };

  addStuff(newPerson);

  console.log(newPerson);
}

//Double everyone's money
function timesTwoCurrency() {
  allTheThings = allTheThings.map((user) => {
    return { ...user, worth: user.worth * 2 };
  });

  addToDOM();
}

//Sort users by riches
function organizeByWealth() {
  allTheThings.sort((a, z) => z.worth - a.worth);

  addToDOM();
}

//Filter by Millionaire
function filterByMill() {
  allTheThings = allTheThings.filter(
    (coolPerson) => coolPerson.worth > 1000000
  );

  addToDOM();
}

// Add new obj to data arr
function addStuff(thing) {
  allTheThings.push(thing);

  addToDOM();
}

//Update DOM
function addToDOM(providedThing = allTheThings) {
  //clear main div
  thingHolder.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedThing.forEach((person) => {
    const elephant = document.createElement('div');
    elephant.classList.add('pplz');
    elephant.innerHTML = `<strong>${person.handle}</strong> ${formatCurrency(
      person.worth
    )}`;
    thingHolder.appendChild(elephant);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatCurrency(digits) {
  return '$' + digits.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listers
addPersonBtn.addEventListener('click', getRandomPerson);
twoTimesBtn.addEventListener('click', timesTwoCurrency);
organizeBtn.addEventListener('click', organizeByWealth);
filterMillBtn.addEventListener('click', filterByMill);
