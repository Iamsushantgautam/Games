import React, { useState, useEffect, useRef } from "react";

const BOARD_SIZE = 20;

export default function SnakeGame() {
    const [snake, setSnake] = useState([[10, 10]]);
    const [food, setFood] = useState([5, 5]);
    const [dir, setDir] = useState([0, -1]);
    const [gameOver, setGameOver] = useState(false);
    const boardRef = useRef(null);

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
        }, 150);
        return () => clearInterval(interval);
    }, [dir, gameOver, food]);

    const handleKeyDown = (e) => {
        switch (e.key) {
            case "ArrowUp": if (dir[1] !== 1) setDir([0, -1]); break;
            case "ArrowDown": if (dir[1] !== -1) setDir([0, 1]); break;
            case "ArrowLeft": if (dir[0] !== 1) setDir([-1, 0]); break;
            case "ArrowRight": if (dir[0] !== -1) setDir([1, 0]); break;
        }
    };

    return (
        <div className="center snake-board-container" onKeyDown={handleKeyDown} tabIndex="0" ref={boardRef}>
            <div>
                <h2 style={{ marginBottom: "1rem" }}>{gameOver ? "Game Over! " : ""}Score: {snake.length - 1}</h2>
                <div className="snake-board">
                    {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => {
                        const x = idx % BOARD_SIZE;
                        const y = Math.floor(idx / BOARD_SIZE);
                        const isSnake = snake.some(s => s[0] === x && s[1] === y);
                        const isFood = food[0] === x && food[1] === y;
                        return <div key={idx} className={isSnake ? "snake-segment" : isFood ? "snake-food" : ""} />;
                    })}
                </div>
                {gameOver && <button className="btn" onClick={() => { setGameOver(false); setSnake([[10, 10]]); setDir([0, -1]); boardRef.current?.focus(); }}>Restart</button>}
            </div>
        </div>
    );
}
