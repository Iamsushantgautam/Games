import './Snake.css';
import React, { useState, useEffect, useRef } from "react";

const BOARD_SIZE = 20;

export default function SnakeGame() {
    const [snake, setSnake] = useState([[10, 10]]);
    const [food, setFood] = useState([5, 5]);
    const [dir, setDir] = useState([0, -1]);
    const [gameOver, setGameOver] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [difficulty, setDifficulty] = useState("medium");
    const boardRef = useRef(null);

    const speeds = {
        easy: 200,
        medium: 120,
        hard: 70
    };

    useEffect(() => {
        boardRef.current?.focus();
        if (gameOver) return;
        const interval = setInterval(() => {
            setSnake(prev => {
                const head = prev[0];
                const newHead = [head[0] + dir[0], head[1] + dir[1]];
                if (newHead[0] < 0 || newHead[0] >= BOARD_SIZE || newHead[1] < 0 || newHead[1] >= BOARD_SIZE || prev.some(seg => seg[0] === newHead[0] && seg[1] === newHead[1])) {
                    setGameOver(true);
                    return prev;
                }
                const newSnake = [newHead, ...prev];
                if (newHead[0] === food[0] && newHead[1] === food[1]) {
                    setFood([Math.floor(Math.random() * BOARD_SIZE), Math.floor(Math.random() * BOARD_SIZE)]);
                } else {
                    newSnake.pop();
                }
                return newSnake;
            });
        }, speeds[difficulty]);
        return () => clearInterval(interval);
    }, [dir, gameOver, food, difficulty]);

    const handleKeyDown = (e) => {
        // Prevent default scrolling when playing
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
        }
        if (gameOver) return;
        switch (e.key) {
            case "ArrowUp": if (dir[1] !== 1) setDir([0, -1]); break;
            case "ArrowDown": if (dir[1] !== -1) setDir([0, 1]); break;
            case "ArrowLeft": if (dir[0] !== 1) setDir([-1, 0]); break;
            case "ArrowRight": if (dir[0] !== -1) setDir([1, 0]); break;
        }
    };

    const handleTouchStart = (e) => {
        if (gameOver) return;
        const touch = e.touches[0];
        setTouchStart({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchEnd = (e) => {
        if (!touchStart || gameOver) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStart.x;
        const dy = touch.clientY - touchStart.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 30 && dir[0] !== -1) setDir([1, 0]);
            else if (dx < -30 && dir[0] !== 1) setDir([-1, 0]);
        } else {
            if (dy > 30 && dir[1] !== -1) setDir([0, 1]);
            else if (dy < -30 && dir[1] !== 1) setDir([0, -1]);
        }
        setTouchStart(null);
    };

    const resetGame = () => {
        setGameOver(false);
        setSnake([[10, 10]]);
        setDir([0, -1]);
        boardRef.current?.focus();
    };

    return (
        <>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "15px", flexWrap: "wrap" }}>
                {["easy", "medium", "hard"].map(level => (
                    <button
                        key={level}
                        className={`btn ${difficulty === level ? "" : "btn-outline"}`}
                        onClick={() => { setDifficulty(level); resetGame(); }}
                    >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                ))}
            </div>

            <div className="status-bar">
                <div className={`status-pill ${gameOver ? "accent" : ""}`}>
                    {gameOver ? "Game Over! " : ""}Score: {snake.length - 1}
                </div>
            </div>

            <div className="swipe-hint"><span>👆</span> Swipe or Arrow Keys to Move</div>

            <div
                className="snake-board-container"
                onKeyDown={handleKeyDown}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                tabIndex="0"
                ref={boardRef}
            >
                <div className="snake-board">
                    {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => {
                        const x = idx % BOARD_SIZE;
                        const y = Math.floor(idx / BOARD_SIZE);
                        const isHead = snake[0][0] === x && snake[0][1] === y;
                        const isSnakeBody = !isHead && snake.some(s => s[0] === x && s[1] === y);
                        const isFood = food[0] === x && food[1] === y;

                        let cellClass = "";
                        if (isHead) cellClass = "snake-segment snake-head";
                        else if (isSnakeBody) cellClass = "snake-segment";
                        else if (isFood) cellClass = "snake-food";

                        return <div key={idx} className="snake-cell">
                            {cellClass && <div className={cellClass} />}
                        </div>;
                    })}
                </div>
            </div>

            {gameOver && <button className="btn" style={{ marginTop: "20px" }} onClick={resetGame}>Play Again</button>}
        </>
    );
}
