const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Home Page
app.get('/', (req, res) => {
  res.render('index'); // views/index.ejs
});

// Rock Paper Scissors Page
app.get('/rock-paper-scissors', (req, res) => {
  res.render('rock-paper-scissors/rps'); // views/rock-paper-scissors/rps.ejs
});

// Tic Tac Toe Page
app.get('/Tic-Tac-Toe', (req, res) => {
  res.render('Tic-Tac-Toe/ttt'); // views/Tic-Tac-Toe/ttt.ejs
});

// Tic Tac Toe Page
app.get('/Memory-Match-Game', (req, res) => {
  res.render('Memory-Match-Game/mm'); // views/Tic-Tac-Toe/ttt.ejs
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
