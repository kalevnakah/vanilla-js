const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check-it');

const commandments = [
  'Have no other gods before Me.',
  'Make no idols',
  'Do not take the name of the Lord your God in vain.',
  'Keep the Sabbath day holy.',
  'Honor your father and your mother.',
  'Do not murder.',
  'Do not commit adultery.',
  'Do not steal.',
  'Do not bear false witness against your neighbor.',
  'Do not covet.',
];

const listCommands = [];

let dragStartCom;

createList();

//Insert list into Dom
function createList() {
  [...commandments]
    .map((c) => ({ value: c, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((c) => c.value)
    .forEach((com, index) => {
      const listCom = document.createElement('li');

      listCom.setAttribute('data-index', index);
      listCom.innerHTML = `
          <span class="number">${index + 1}</span>
          <div class="draggable" draggable="true">
            <p class="com-name">${com}</p>
            <i class="fas fa-grip-lines"></i>
          </div>
        `;

      listCommands.push(listCom);

      draggableList.appendChild(listCom);
    });
  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartCom = +this.closest('li').getAttribute('data-index');
  // console.log(dragStartCom);
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

function dragOver(e) {
  // console.log('Event: ', 'dragOver');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndCom = +this.getAttribute('data-index');
  swapComs(dragStartCom, dragEndCom);

  this.classList.remove('over');
}

// Swap list that are dragged and dropped.
function swapComs(fromCom, toCom) {
  const comOne = listCommands[fromCom].querySelector('.draggable');
  const comTwo = listCommands[toCom].querySelector('.draggable');

  listCommands[fromCom].appendChild(comTwo);
  listCommands[toCom].appendChild(comOne);
}

// Check the order of the list items
function checkOrder() {
  listCommands.forEach((listCom, index) => {
    const comName = listCom.querySelector('.draggable').innerText.trim();

    if (comName !== commandments[index]) {
      listCom.classList.add('wrong');
    } else {
      listCom.classList.remove('wrong');
      listCom.classList.add('right');
    }
  });
}

// Event Listners
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragList = document.querySelectorAll('.graggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragList.forEach((i) => {
    i.addEventListener('dragover', dragOver);
    i.addEventListener('drop', dragDrop);
    i.addEventListener('dragenter', dragEnter);
    i.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);
