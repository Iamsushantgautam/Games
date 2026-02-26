import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Gamepad2, Hash, MemoryStick as Memory, Activity as Snake, Scissors, Hand, Mouse, CircleDashed, Dice1 as Dice, Calculator, CircleDot } from "lucide-react";
import "./index.css";

import TicTacToe from "./games/TicTacToe";
import MemoryGame from "./games/MemoryGame";
import SnakeGame from "./games/Snake";
import RockPaperScissors from "./games/RockPaperScissors";
import WhackAMole from "./games/WhackAMole";
import Simon from "./games/Simon";
import ConnectFour from "./games/ConnectFour";
import Hangman from "./games/Hangman";
import Game2048 from "./games/2048";
import Pong from "./games/Pong";

const GAMES = [
  { id: "tictactoe", name: "Tic Tac Toe", icon: <Hash size={48} />, component: TicTacToe },
  { id: "memory", name: "Memory Game", icon: <Memory size={48} />, component: MemoryGame },
  { id: "snake", name: "Snake", icon: <Gamepad2 size={48} />, component: SnakeGame },
  { id: "rps", name: "Rock Paper Scissors", icon: <Scissors size={48} />, component: RockPaperScissors },
  { id: "whackamole", name: "Whack a Mole", icon: <Mouse size={48} />, component: WhackAMole },
  { id: "simon", name: "Simon Says", icon: <CircleDashed size={48} />, component: Simon },
  { id: "connect4", name: "Connect Four", icon: <Dice size={48} />, component: ConnectFour },
  { id: "hangman", name: "Hangman", icon: <Gamepad2 size={48} />, component: Hangman },
  { id: "2048", name: "2048", icon: <Calculator size={48} />, component: Game2048 },
  { id: "pong", name: "Pong", icon: <CircleDot size={48} />, component: Pong },
];

function Home() {
  return (
    <div className="home-container">
      <h1 className="title">🎮 WebGames Portal</h1>
      <div className="games-grid">
        {GAMES.map((game) => (
          <Link key={game.id} to={`/${game.id}`} className="game-card">
            {game.icon}
            <h3>{game.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {GAMES.map((game) => (
          <Route
            key={game.id}
            path={`/${game.id}`}
            element={
              <div className="game-container">
                <Link to="/" className="back-btn">← Back to Portal</Link>
                <h1 className="game-title">{game.name}</h1>
                <game.component />
              </div>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
