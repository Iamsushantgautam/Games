import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Maximize, Minimize } from "lucide-react";
import "./index.css";

import TicTacToe from "./games/TicTacToe/TicTacToe";
import MemoryGame from "./games/MemoryGame/MemoryGame";
import SnakeGame from "./games/Snake/Snake";
import RockPaperScissors from "./games/RockPaperScissors/RockPaperScissors";
import WhackAMole from "./games/WhackAMole/WhackAMole";
import Game2048 from "./games/2048/Game2048";
import Ludo from "./games/Ludo/Ludo";

import ticTacToeImg from "./assets/thumbnails/tictactoe.png";
import memoryImg from "./assets/thumbnails/memory.png";
import snakeImg from "./assets/thumbnails/snake.png";
import rpsImg from "./assets/thumbnails/rps.png";
import whackamoleImg from "./assets/thumbnails/whackamole.png";
import game2048Img from "./assets/thumbnails/2048.png";
import ludoImg from "./assets/thumbnails/ludo.png";

const GAMES = [
  { id: "tictactoe", name: "Tic Tac Toe", image: ticTacToeImg, component: TicTacToe },
  { id: "memory", name: "Memory", image: memoryImg, component: MemoryGame },
  { id: "snake", name: "Snake", image: snakeImg, component: SnakeGame },
  { id: "rps", name: "RPS", image: rpsImg, component: RockPaperScissors },
  { id: "whackamole", name: "Whack a Mole", image: whackamoleImg, component: WhackAMole },
  { id: "2048", name: "2048", image: game2048Img, component: Game2048 },
  { id: "ludo", name: "Ludo", image: ludoImg, component: Ludo },
];

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <div className="logo-row">
          <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ea580c" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="12" rx="4" />
            <path d="M6 12h4" stroke="#ffffff" />
            <path d="M8 10v4" stroke="#ffffff" />
            <circle cx="15" cy="13" r="1.5" fill="#ffffff" stroke="none" />
            <circle cx="18" cy="11" r="1.5" fill="#ffffff" stroke="none" />
          </svg>
          <h1 className="title">Wit Games</h1>
        </div>
        <p className="home-subtitle">Play classic browser games anywhere.</p>
      </div>

      <div className="games-grid">
        {GAMES.map((game) => (
          <Link key={game.id} to={`/${game.id}`} className="game-card">
            <div className="game-card-image-wrapper">
              <img src={game.image} alt={game.name} className="game-card-image" />
            </div>
            <h3>{game.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

function GameWrapper({ game }) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="game-wrapper">
      <div className="game-topbar">
        <Link to="/" className="topbar-btn">← Portal</Link>
        <span className="game-topbar-title">{game.name}</span>
        <button className="topbar-btn" onClick={toggleFullscreen}>
          {isFullscreen ? <><Minimize size={16} /> Exit</> : <><Maximize size={16} /> Full Screen</>}
        </button>
      </div>
      <div className="game-content">
        <game.component />
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
            element={<GameWrapper game={game} />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
