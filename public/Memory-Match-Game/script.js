const board = document.getElementById('game-board');
const movesCounter = document.getElementById('moves');
const restartBtn = document.getElementById('restart-btn');
const startBtn = document.getElementById('start-btn');

let moves = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let cardElements = [];

const emojis = ['🍕','🍔','🍟','🌮','🍣','🍩','🍪','🍦'];

function initializeGame() {
  board.innerHTML = '';
  moves = 0;
  movesCounter.innerText = `Moves: ${moves}`;
  firstCard = null;
  secondCard = null;
  lockBoard = true;

  let cards = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
  cardElements = [];

  cards.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.innerText = emoji; // Show initially
    board.appendChild(card);
    cardElements.push(card);
  });

  setTimeout(() => {
    cardElements.forEach(card => {
      card.innerText = '';
      card.classList.remove('revealed');
      card.classList.remove('matched');
      card.addEventListener('click', flipCard);
    });
    lockBoard = false;
  }, 2000);
}

function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains('matched')) return;

  this.innerText = this.dataset.emoji;
  this.classList.add('revealed');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  moves++;
  movesCounter.innerText = `Moves: ${moves}`;

  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
  } else {
    setTimeout(() => {
      firstCard.innerText = '';
      secondCard.innerText = '';
      firstCard.classList.remove('revealed');
      secondCard.classList.remove('revealed');
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Button events
restartBtn.addEventListener('click', initializeGame);

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  board.style.display = 'grid';
  restartBtn.style.display = 'inline-block';
  initializeGame();
});
