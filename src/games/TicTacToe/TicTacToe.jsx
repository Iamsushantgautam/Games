import './TicTacToe.css';
import React, { useState, useEffect } from "react";

export default function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [mode, setMode] = useState("pvp"); // pvp or pvc

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
        }
        return null;
    };

    const winner = calculateWinner(board);

    useEffect(() => {
        if (mode === "pvc" && !isXNext && !winner) {
            const emptyIndices = board.map((c, i) => c === null ? i : null).filter(i => i !== null);
            if (emptyIndices.length > 0) {
                const randomChoice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                const timer = setTimeout(() => {
                    handleClick(randomChoice, true);
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [isXNext, board, mode, winner]);

    const handleClick = (index, isComputer = false) => {
        if (board[index] || winner) return;
        if (mode === "pvc" && !isXNext && !isComputer) return; // Prevent player from overriding computer's turn

        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    return (
        <>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "15px", flexWrap: "wrap" }}>
                <button className={`btn ${mode === "pvp" ? "" : "btn-outline"}`} onClick={() => { setMode("pvp"); resetGame(); }}>Two Player</button>
                <button className={`btn ${mode === "pvc" ? "" : "btn-outline"}`} onClick={() => { setMode("pvc"); resetGame(); }}>Play with Computer</button>
            </div>

            <div className="status-bar">
                <div className={`status-pill ${winner ? "accent" : ""}`}>
                    {winner ? `Winner: ${winner}` : `Turn: ${isXNext ? "X" : "O"}`}
                </div>
            </div>

            <div className="ttt-board">
                {board.map((cell, index) => (
                    <button key={index} className={`ttt-square ${cell === "X" ? "x" : cell === "O" ? "o" : ""}`} onClick={() => handleClick(index)}>
                        {cell}
                    </button>
                ))}
            </div>

            <button className="btn" style={{ marginTop: "20px" }} onClick={resetGame}>Restart Game</button>
        </>
    );
}
