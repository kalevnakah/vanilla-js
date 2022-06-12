const musicBoxEl = document.getElementById('music-box');
const goBtnEl = document.getElementById('go');
const backBtnEl = document.getElementById('back');
const forwardBtnEl = document.getElementById('forward');

const musicEl = document.getElementById('music');
const sliderEl = document.getElementById('slider');
const sliderBoxEl = document.getElementById('slider-bar-box');
const titleEl = document.getElementById('header');
const albumImageEl = document.getElementById('album-img');

// Song Titles
const tracks = [
  '01 Intro',
  '02 Good Good Father',
  '03 Come as you are',
  '04 Prayer - Unity',
  '05 This Is Amazing Grace',
  "06 You'll Come",
  '07 Devotion - Delight in the Lord',
  '08 How He Loves',
  '09 Even When It Hurts',
  '10 Prayer - Strength',
  '11 Set A Fire',
  '12 Prayer - Amen',
];

// keep track of track
let trackIndex = 4;

// Initially load song details into DOM
insertTrack(tracks[trackIndex]);

// Update track details
function insertTrack(track) {
  titleEl.innerHTML = track;
  musicEl.src = `music/${track}.mp3`;
  albumImageEl.src = `images/${track}.JPG`;
}

// Play track
function playTrack() {
  musicBoxEl.classList.add('running');
  goBtnEl.querySelector('i.fas').classList.remove('fa-play');
  goBtnEl.querySelector('i.fas').classList.add('fa-pause');

  musicEl.play();
}

// Pause track
function pauseTrack() {
  musicBoxEl.classList.remove('running');
  goBtnEl.querySelector('i.fas').classList.remove('fa-pause');
  goBtnEl.querySelector('i.fas').classList.add('fa-play');

  musicEl.pause();
}

// Event Listeners
goBtnEl.addEventListener('click', () => {
  const isRunning = musicBoxEl.classList.contains('running');

  if (isRunning) {
    pauseTrack();
  } else {
    playTrack();
  }
});
