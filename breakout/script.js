const infoBtn = document.getElementById('info-btn');
const shutBtn = document.getElementById('shut-btn');
const info = document.getElementById('info');
const canvas = document.getElementById('canva');
const ctx = canva.getContext('2d');

let score = 0;

const blockRowCnt = 9;
const blockColCnt = 5;

// Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// Create bricks props
const blockInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// Create bricks
const blocks = [];
for (let i = 0; i < blockRowCnt; i++) {
  blocks[i] = [];
  for (let j = 0; j < blockColCnt; j++) {
    const x = i * (blockInfo.w + blockInfo.padding) + blockInfo.offsetX;
    const y = j * (blockInfo.h + blockInfo.padding) + blockInfo.offsetY;
    blocks[i][j] = { x, y, ...blockInfo };
  }
}

//Draw paddle
function makePaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Draw ball on canvas
function makeBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Draw Score
function makeScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Draw bricks on canvas
function makeBlocks() {
  blocks.forEach((column) => {
    column.forEach((block) => {
      ctx.beginPath();
      ctx.rect(block.x, block.y, block.w, block.h);
      ctx.fillStyle = block.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Move paddle on canvas
function slidePaddle() {
  paddle.x += paddle.dx;

  //wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// Move ball on canvas
function throwBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision (left/right)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }

  // Wall collision (top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  //Brick collision
  blocks.forEach((col) => {
    col.forEach((block) => {
      if (block.visible) {
        if (
          ball.x - ball.size > block.x && // left brick side check
          ball.x + ball.size < block.x + block.w && // right brick side check
          ball.y + ball.size > block.y && // top brick side check
          ball.y - ball.size < block.y + block.h // bottom brick side check
        ) {
          ball.dy *= -1;
          block.visible = false;

          addPoints();
        }
      }
    });
  });

  // Hit bottom wall - lose
  if (ball.y + ball.size > canvas.height) {
    showAllBlocks();
    score = 0;
  }
}

// Increase Score
function addPoints() {
  score++;
  if (score % (blockRowCnt * blockColCnt) === 0) {
    showAllBlocks();
  }
}

// Make all bricks appear
function showAllBlocks() {
  blocks.forEach((col) => {
    col.forEach((block) => (block.visible = true));
  });
}

// Draw everything
function make() {
  //claer canvas
  ctx.clearRect(0, 0, canvas.width, canvas.width);

  makeBall();
  makePaddle();
  makeScore();
  makeBlocks();
}

// Update canvas drawing and animation
function update() {
  slidePaddle();
  throwBall();
  // Draw everything
  make();

  requestAnimationFrame(update);
}

update();

// Keydown event
function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

// Keydown event
function keyUp(e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
}

// Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Rules and close event handlers
infoBtn.addEventListener('click', () => info.classList.add('reveal'));
shutBtn.addEventListener('click', () => info.classList.remove('reveal'));
