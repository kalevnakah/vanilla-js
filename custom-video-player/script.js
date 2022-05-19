const film = document.getElementById('film');
const go = document.getElementById('go');
const halt = document.getElementById('halt');
const indicator = document.getElementById('indicator');
const timecounter = document.getElementById('timecounter');

// Play & Pause video
function toggleFilmStatus() {
  if (film.paused) {
    film.play();
  } else {
    film.pause();
  }
}

// update play/pause icon
function updateGoIcon() {
  if (film.paused) {
    go.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    go.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// update progress & timestamp
function updateLocation() {
  indicator.value = (film.currentTime / film.duration) * 100;

  // Get minutes
  let mins = Math.floor(film.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  let secs = Math.floor(film.currentTime % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }

  timecounter.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setFilmStatus() {
  film.currentTime = (+indicator.value * film.duration) / 100;
}

//Stop video
function haltFilm() {
  film.currentTime = 0;
  film.pause();
}

//Event listeners
film.addEventListener('click', toggleFilmStatus);
film.addEventListener('pause', updateGoIcon);
film.addEventListener('play', updateGoIcon);
film.addEventListener('timeupdate', updateLocation);

go.addEventListener('click', toggleFilmStatus);

halt.addEventListener('click', haltFilm);

indicator.addEventListener('change', setFilmStatus);
