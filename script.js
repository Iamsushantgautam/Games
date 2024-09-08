const SIZE = 3;
let board = Array(SIZE).fill(null).map(() => Array(SIZE).fill(null));
let currentPlayer = 'X';
let gameMode = 'two-player'; // Default to two-player mode

function createBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';

  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', handleClick);
      gameBoard.appendChild(cell);
    }
  }
}

function handleClick(event) {
  const cell = event.target;
  const row = cell.dataset.row;
  const col = cell.dataset.col;

  if (board[row][col] || checkWin() || isBoardFull()) return;

  board[row][col] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    setTimeout(() => alert(`Player ${currentPlayer} wins!`), 100);
    return;
  }

  if (isBoardFull()) {
    setTimeout(() => alert('It\'s a draw!'), 100);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (gameMode === 'one-player' && currentPlayer === 'O') {
    setTimeout(computerMove, 500); // Add a small delay for the computer's move
  }
}

function computerMove() {
  let emptyCells = [];
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (board[row][col] === null) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length === 0) return;

  // Simple AI: Choose a random empty cell
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const { row, col } = emptyCells[randomIndex];

  board[row][col] = 'O';
  document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`).textContent = 'O';

  if (checkWin()) {
    setTimeout(() => alert('Computer wins!'), 100);
    return;
  }

  if (isBoardFull()) {
    setTimeout(() => alert('It\'s a draw!'), 100);
    return;
  }

  currentPlayer = 'X';
}

function isBoardFull() {
  return board.flat().every(cell => cell !== null);
}

function checkWin() {
  const winConditions = [
    // Rows
    ...board,
    // Columns
    ...board[0].map((_, colIndex) => board.map(row => row[colIndex])),
    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]]
  ];

  return winConditions.some(condition => condition.every(cell => cell === currentPlayer));
}

function restartGame() {
  board = Array(SIZE).fill(null).map(() => Array(SIZE).fill(null));
  currentPlayer = 'X';
  createBoard();
}

function selectMode(mode) {
  gameMode = mode;
  document.querySelectorAll('#mode1, #mode2').forEach(button => {
    button.classList.remove('selected-mode');
  });
  document.getElementById(`mode${mode === 'one-player' ? '1' : '2'}`).classList.add('selected-mode');
  restartGame();
}

document.getElementById('restart').addEventListener('click', restartGame);
document.getElementById('mode1').addEventListener('click', () => selectMode('one-player'));
document.getElementById('mode2').addEventListener('click', () => selectMode('two-player'));

createBoard();