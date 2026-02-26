import React, { useState } from "react";

const ROWS = 6;
const COLS = 7;

export default function ConnectFour() {
    const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState("Red");
    const [winner, setWinner] = useState(null);

    const checkWin = (b) => {
        const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (!b[r][c]) continue;
                for (let [dr, dc] of directions) {
                    let win = true;
                    for (let i = 1; i < 4; i++) {
                        const nr = r + dr * i, nc = c + dc * i;
                        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || b[nr][nc] !== b[r][c]) {
                            win = false; break;
                        }
                    }
                    if (win) return b[r][c];
                }
            }
        }
        return null;
    };

    const handleClick = (col) => {
        if (winner) return;
        const newBoard = board.map(row => [...row]);
        for (let r = ROWS - 1; r >= 0; r--) {
            if (!newBoard[r][col]) {
                newBoard[r][col] = currentPlayer;
                setBoard(newBoard);
                if (checkWin(newBoard)) setWinner(currentPlayer);
                else setCurrentPlayer(currentPlayer === "Red" ? "Yellow" : "Red");
                break;
            }
        }
    };

    return (
        <>
            <div className="status-bar">
                <div className={`status-pill ${winner ? "accent" : ""}`}>
                    {winner ? `${winner} Wins! 🎉` : `Current turn: ${currentPlayer}`}
                </div>
            </div>

            <div className="c4-board">
                {board.map((row, rIdx) => (
                    <div key={rIdx} className="c4-row">
                        {row.map((cell, cIdx) => (
                            <div
                                key={cIdx}
                                className={`c4-cell ${cell === "Red" ? "p1" : cell === "Yellow" ? "p2" : ""}`}
                                onClick={() => handleClick(cIdx)}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <button className="btn" onClick={() => {
                setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
                setWinner(null);
                setCurrentPlayer("Red");
            }}>Restart Game</button>
        </>
    );
}
