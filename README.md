# 🎮 Wit Games Portal

A unified, responsive web portal built with **React + Vite** — a collection of polished browser games with a modern UI, custom thumbnails, and seamless mobile touch support.

🌐 **Live Demo old**: [https://shkgames.onrender.com/](https://shkgames.onrender.com/)

🌐 **Live Demo new**: [https://wit-games.vercel.app/](https://wit-games.vercel.app/)

---

## 🚀 Technologies Used

| Tech | Purpose |
|------|---------|
| **React.js** | UI component framework |
| **React Router DOM v6** | Client-side routing |
| **Vanilla CSS** | Styling (CSS Variables, Flexbox, Grid, Animations) |
| **Lucide React** | Icons |
| **Vite** | Build tool & dev server |
| **Render** | Deployment |

---

## 🕹️ Games Included

Each game lives in its own folder under `src/games/` — with a dedicated `<GameName>.jsx` and `<GameName>.css` file.

### 1. ❌⭕ Tic Tac Toe
A classic 2-player strategy game. Supports **Two Player** and **Play vs Computer** modes.
- `calculateWinner()` — checks all 8 winning combos (rows, cols, diagonals)
- `handleClick()` — places symbol, toggles turn
- Computer picks randomly from empty squares with a 500ms delay

### 2. 🧠 Memory
Flip and match pairs of emoji cards from a shuffled board.
- `startNewGame()` — shuffles and duplicates emoji array
- `handleCardClick()` — manages flipped/matched state with auto-reset via `setTimeout`

### 3. 🐍 Snake
Guide the snake to eat food and grow. Supports **Easy / Medium / Hard** difficulty.
- Speed: Easy = 200ms, Medium = 120ms, Hard = 70ms per tick
- `useEffect` loop handles movement, collision, and food spawning
- Full swipe (mobile) + arrow key (desktop) support

### 4. ✌️ Rock Paper Scissors (RPS)  
Battle against the CPU or in **Two Player** mode with Win/Loss tracking.
- `determineWinner()` — compares two choices
- **PvC**: Instant result vs random CPU pick
- **PvP**: Turn-based, Player 1 picks first, hidden, then Player 2 picks
- Live scoreboard shows wins and losses

### 5. 🔨 Whack a Mole
Tap/click moles as they pop up before the timer runs out.
- Random mole appears every 400–1200ms while `playing === true`
- `whack(idx)` — scores and triggers disappear animation

### 6. 🔢 2048
Slide numbered tiles to merge and reach the 2048 tile.
- `slide(row)` — core engine: compacts tiles, merges equals, pads with zeros
- `move(direction)` — maps swipe/arrow to column/row operations
- Swipe (mobile) + arrow key (desktop) support

### 7. 🎲 Ludo
A 4-player classic board game rendered on a 15×15 CSS grid.
- Turn-based dice roll (1–6), unlock tokens on 6
- Token paths mapped per player via coordinate arrays
- Kill mechanic — captures opponent tokens off non-safe squares ⭐
- Safe squares prevent captures on special positions
- Animated tokens bounce when it's your turn

---

## 📁 Project Structure

```
src/
├── App.jsx                    # Main router & game portal
├── index.css                  # Global shared styles only
├── assets/
│   └── thumbnails/            # AI-generated game card images
└── games/
    ├── TicTacToe/
    │   ├── TicTacToe.jsx
    │   └── TicTacToe.css
    ├── MemoryGame/
    │   ├── MemoryGame.jsx
    │   └── MemoryGame.css
    ├── Snake/
    │   ├── Snake.jsx
    │   └── Snake.css
    ├── RockPaperScissors/
    │   ├── RockPaperScissors.jsx
    │   └── RockPaperScissors.css
    ├── WhackAMole/
    │   ├── WhackAMole.jsx
    │   └── WhackAMole.css
    ├── 2048/
    │   ├── Game2048.jsx
    │   └── Game2048.css
    └── Ludo/
        ├── Ludo.jsx
        └── Ludo.css
```

---

## 🎨 Global UI Features

- **Custom Thumbnails** — Each game has an AI-generated thumbnail shown on the portal grid
- **Fullscreen API** — Every game supports a full-screen immersive mode via the topbar
- **Scroll Locking** — `overscroll-behavior: none` + `user-select: none` prevents browser interference during gameplay
- **Responsive Grid** — Portal adapts from 5 columns (desktop) down to 2 (mobile)
- **Micro-animations** — Hover effects, pop-in reveals, bounce animations throughout

---

## 🛠️ Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

