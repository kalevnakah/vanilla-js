const formSearch = document.getElementById('search-form');
const boxSearch = document.getElementById('search');
const results = document.getElementById('result');
const extra = document.getElementById('extra');

const apiURL = 'https://api.lyrics.ovh';

// Search by song or artist
async function searchMusic(text) {
  // fetch(`${apiURL}/suggest/${text}`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  const res = await fetch(`${apiURL}/suggest/${text}`);
  const data = await res.json();

  showResults(data);
}

// Show song and artist in DOM
function showResults(info) {
  // let out = '';
  // info.data.forEach((song) => {
  //   out += `
  //   <li>
  //     <span><strong>${song.artist.name}</strong> - ${song.title}<span>
  //     <button class="butt" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Song Lyrics</button>
  //   </li>`;
  // });

  // results.innerHTML = `
  //   <ul class="music">
  //     ${out}
  //   </ul>
  // `;

  results.innerHTML = `
    <ul class="music">
     ${info.data
       .map(
         (song) => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="butt" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Song Lyrics</button>
    </li>`
       )
       .join('')}
    </ul>
  `;

  if (info.prev || info.next) {
    extra.innerHTML = `
      ${
        info.prev
          ? `<button class="butt" onclick="getExtraSongs('${info.prev}')
          ">Prev</button>`
          : ''
      }
      ${
        info.next
          ? `<button class="butt" onclick="getExtraSongs
      ('${info.next}')">Next</button>`
          : ''
      }
    `;
  } else {
    extra.innerHTML = '';
  }
}

// Get next or previous songs
async function getExtraSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showResults(data);
}

// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  results.innerHTML = `<h2><strong>${artist}<strong> - 
  ${songTitle}</h2>
  <span>${lyrics}</span>`;

  extra.innerHTML = '';
}

// Event Listeners
formSearch.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchText = boxSearch.value.trim();

  if (!searchText) {
    alert('Please type in a search term');
  } else {
    searchMusic(searchText);
  }
});

// Get lyrics button click
results.addEventListener('click', (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songtitle = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist, songtitle);
  }
});
