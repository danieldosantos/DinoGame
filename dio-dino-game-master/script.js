const drag = document.querySelector('.drag');
const ray = document.querySelector('.ray');
const mewtwo = document.querySelector('.mewtwo');
const background = document.querySelector('.background');
const ceu = document.querySelector('.ceu');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          drag.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      drag.style.bottom = position + 'px';
    }
  }, 20);
}

function createDugtrio() {
  const dugtrio = document.createElement('div');
  let dugtrioPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  dugtrio.classList.add('dugtrio');
  background.appendChild(dugtrio);
  dugtrio.style.left = dugtrioPosition + 'px';

  let leftTimer = setInterval(() => {
    if (dugtrioPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(dugtrio);
    } else if (dugtrioPosition > 0 && dugtrioPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      dugtrioPosition -= 10;
      dugtrio.style.left = dugtrioPosition + 'px';
    }
  }, 20);

  setTimeout(createDugtrio, randomTime);
}

createDugtrio();
document.addEventListener('keyup', handleKeyUp);
