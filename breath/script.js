const box = document.getElementById('box');
const msg = document.getElementById('char');

const totalTime = 7500;
const breathTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

relaxingAnimation();

function relaxingAnimation() {
  msg.innerHTML = 'Breath In!';
  box.className = 'box bigger';

  setTimeout(() => {
    msg.innerHTML = 'Hold';

    setTimeout(() => {
      msg.innerHTML = 'Breath Out!';
      box.className = 'box smaller';
    }, holdTime);
  }, breathTime);
}

setInterval(relaxingAnimation, totalTime);
