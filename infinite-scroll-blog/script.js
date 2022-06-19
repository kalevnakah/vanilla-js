const pegBox = document.getElementById('peg-box');
const fireUp = document.querySelector('.fireup');
const filter = document.getElementById('filter');

let limit = 5;
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

// Show loader & Fetch more posts
function showFireup() {
  fireUp.classList.add('reveal');

  setTimeout(() => {
    fireUp.classList.remove('reveal');

    setTimeout(() => {
      page++;
      revealPegs();
    }, 300);
  }, 1000);
}

// Show initial posts
revealPegs();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showFireup();
  }
});
