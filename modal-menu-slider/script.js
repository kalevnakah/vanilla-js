const flipper = document.getElementById('flip');
const door = document.getElementById('shut');
const ignite = document.getElementById('reveal');
const popup = document.getElementById('yodal');

//toggle nav
flipper.addEventListener('click', () =>
  document.body.classList.toggle('show-slide')
);

// Show modal
ignite.addEventListener('click', () => yodal.classList.add('reveal-yodal'));

// Close modal
door.addEventListener('click', () => yodal.classList.remove('reveal-yodal'));

// Hide modal on outside click
window.addEventListener('click', (e) =>
  e.target == popup ? popup.classList.remove('reveal-yodal') : false
);
