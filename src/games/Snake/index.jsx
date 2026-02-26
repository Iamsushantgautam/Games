import React, { useState, useEffect, useRef } from "react";

const BOARD_SIZE = 20;

export default function SnakeGame() {
    const [snake, setSnake] = useState([[10, 10]]);
    const [food, setFood] = useState([5, 5]);
    const [dir, setDir] = useState([0, -1]);
    const [gameOver, setGameOver] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
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

    return (
        <>
            <div className="status-bar">
                <div className={`status-pill ${gameOver ? "accent" : ""}`}>
                    {gameOver ? "Game Over! " : ""}Score: {snake.length - 1}
                </div>
            </div>

            <div className="swipe-hint"><span>👆</span> Swipe to Move</div>

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

            {gameOver && <button className="btn" onClick={() => { setGameOver(false); setSnake([[10, 10]]); setDir([0, -1]); boardRef.current?.focus(); }}>Play Again</button>}
        </>
    );
}
