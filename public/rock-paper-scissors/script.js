const userScoreEl = document.getElementById('user-score');
const compScoreEl = document.getElementById('comp-score');
const resultEl = document.getElementById('result');
const choices = document.querySelectorAll('.choice');
const resetBtn = document.getElementById('reset-btn');
const userImg = document.getElementById('user-image');
const compImg = document.getElementById('comp-image');
const totalCountEl = document.getElementById('total-count'); // ⬅️ New Element

let userScore = 0;
let compScore = 0;
let count = 0;

const defaultImg = 'images/logo.jpg'; // ⬅️ Add this image to your images folder

const imageMap = {
  rock: 'images/rock.png',
  paper: 'images/paper.png',
  scissors: 'images/scissor.png',
};

window.onload = () => {
  userImg.src = defaultImg;
  compImg.src = defaultImg;
  totalCountEl.textContent = count;
};

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    const userChoice = choice.dataset.choice;
    const compChoice = getComputerChoice();
    const winner = getWinner(userChoice, compChoice);
    showResult(userChoice, compChoice, winner);
  });
});

resetBtn.addEventListener('click', () => {
  userScore = 0;
  compScore = 0;
  count = 0;
  userScoreEl.textContent = 0;
  compScoreEl.textContent = 0;
  totalCountEl.textContent = 0;
  resultEl.textContent = 'Game reset! Make your move!';
  userImg.src = defaultImg;
  compImg.src = defaultImg;
});

function getComputerChoice() {
  const options = ['rock', 'paper', 'scissors'];
  return options[Math.floor(Math.random() * options.length)];
}

function getWinner(user, computer) {
  if (user === computer) return 'draw';
  if (
    (user === 'rock' && computer === 'scissors') ||
    (user === 'paper' && computer === 'rock') ||
    (user === 'scissors' && computer === 'paper')
  ) {
    return 'user';
  } else {
    return 'computer';
  }
}

function showResult(user, computer, winner) {
  count++;
  totalCountEl.textContent = count;

  userImg.src = imageMap[user];
  compImg.src = imageMap[computer];

  userImg.classList.add('animate');
  compImg.classList.add('animate');

  setTimeout(() => {
    userImg.classList.remove('animate');
    compImg.classList.remove('animate');
  }, 300);

  if (winner === 'draw') {
    resultEl.textContent = `It's a draw! You both picked ${user}.`;
  } else if (winner === 'user') {
    userScore++;
    userScoreEl.textContent = userScore;
    resultEl.textContent = `You win! ${user} beats ${computer}.`;
  } else {
    compScore++;
    compScoreEl.textContent = compScore;
    resultEl.textContent = `You lose! ${computer} beats ${user}.`;
  }
}
