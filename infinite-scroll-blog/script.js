const pegBox = document.getElementById('peg-box');
const fireUp = document.querySelector('fireup');
const filter = document.getElementById('filter');

let limit = 3;
let page = 1;

// Fetch posts from API
async function getPegs() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

// Show posts in DOM
async function revealPegs() {
  const pegs = await getPegs();

  pegs.forEach((peg) => {
    const pegEl = document.createElement('div');
    pegEl.classList.add('peg');
    pegEl.innerHTML = `
    <div class="index">${peg.id}</div>
    <div class="peg-data">
      <h2 class="peg-title">${peg.title}</h2>
      <p class="post-body">${peg.body}</p>
    </div>
    `;

    pegBox.appendChild(pegEl);
  });
}

// Show initial posts
revealPegs();
