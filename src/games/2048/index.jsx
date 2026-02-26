import React, { useState, useEffect, useRef } from "react";

export default function Game2048() {
    const [board, setBoard] = useState(Array(4).fill(null).map(() => Array(4).fill(0)));
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const boardRef = useRef(null);

    const initializeGame = () => {
        let b = Array(4).fill(null).map(() => Array(4).fill(0));
        addRandom(b);
        addRandom(b);
        setBoard(b);
        setScore(0);
        setGameOver(false);
    };

    useEffect(() => {
        initializeGame();
        boardRef.current?.focus();
    }, []);

    const addRandom = (b) => {
        let empty = [];
        b.forEach((r, i) => r.forEach((c, j) => { if (c === 0) empty.push([i, j]); }));
        if (empty.length > 0) {
            const [r, c] = empty[Math.floor(Math.random() * empty.length)];
            b[r][c] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    const move = (direction) => {
        if (gameOver) return;

        let b = board.map(r => [...r]);
        let moved = false;
        let newScore = score;

        const slide = (row) => {
            let arr = row.filter(val => val !== 0);
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i] !== 0 && arr[i] === arr[i + 1]) {
                    arr[i] *= 2;
                    newScore += arr[i];
                    arr[i + 1] = 0;
                }
            }
            arr = arr.filter(val => val !== 0);
            while (arr.length < 4) arr.push(0);
            return arr;
        };

        if (direction === "ArrowLeft") {
            for (let i = 0; i < 4; i++) {
                const newRow = slide(b[i]);
                if (b[i].join(',') !== newRow.join(',')) moved = true;
                b[i] = newRow;
            }
        } else if (direction === "ArrowRight") {
            for (let i = 0; i < 4; i++) {
                const newRow = slide(b[i].slice().reverse()).reverse();
                if (b[i].join(',') !== newRow.join(',')) moved = true;
                b[i] = newRow;
            }
        } else if (direction === "ArrowUp") {
            for (let j = 0; j < 4; j++) {
                let col = [b[0][j], b[1][j], b[2][j], b[3][j]];
                const newCol = slide(col);
                for (let i = 0; i < 4; i++) {
                    if (b[i][j] !== newCol[i]) moved = true;
                    b[i][j] = newCol[i];
                }
            }
        } else if (direction === "ArrowDown") {
            for (let j = 0; j < 4; j++) {
                let col = [b[3][j], b[2][j], b[1][j], b[0][j]];
                const newCol = slide(col).reverse();
                for (let i = 0; i < 4; i++) {
                    if (b[i][j] !== newCol[i]) moved = true;
                    b[i][j] = newCol[i];
                }
            }
        }

        if (moved) {
            addRandom(b);
            setBoard([...b]);
            setScore(newScore);
            checkGameOver(b);
        }
    };

    const checkGameOver = (b) => {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (b[i][j] === 0) return;
                if (i < 3 && b[i][j] === b[i + 1][j]) return;
                if (j < 3 && b[i][j] === b[i][j + 1]) return;
            }
        }
        setGameOver(true);
    };

    const handleKeyDown = (e) => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
            move(e.key);
        }
    };

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        setTouchStart({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchEnd = (e) => {
        if (!touchStart) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStart.x;
        const dy = touch.clientY - touchStart.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 30) move("ArrowRight");
            else if (dx < -30) move("ArrowLeft");
        } else {
            if (dy > 30) move("ArrowDown");
            else if (dy < -30) move("ArrowUp");
        }
        setTouchStart(null);
    };

    return (
        <>
            <div className="status-bar">
                <div className={`status-pill ${gameOver ? "accent" : ""}`}>
                    {gameOver ? "Game Over! " : ""}Score: {score}
                </div>
            </div>

            <div className="swipe-hint"><span>👆</span> Swipe to Move</div>

            <div
                className="game-2048-board"
                tabIndex="0"
                onKeyDown={handleKeyDown}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                ref={boardRef}
            >
                {board.flat().map((val, i) => (
                    <div key={i} className="game-2048-cell" data-val={val || ""}>
                        {val !== 0 && val}
                    </div>
                ))}
            </div>

            {(gameOver || score > 0) && <button className="btn" onClick={() => {
                initializeGame();
                boardRef.current?.focus();
            }}>Restart Game</button>}
        </>
    );
}
