import React, { useState } from "react";

export default function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

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

    const handleClick = (index) => {
        if (board[index] || winner) return;
        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    return (
        <div className="center">
            <h2 style={{ marginBottom: "1rem" }}>{winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`}</h2>
            <div className="ttt-board">
                {board.map((cell, index) => (
                    <div key={index} className="ttt-square" onClick={() => handleClick(index)}>
                        {cell}
                    </div>
                ))}
            </div>
            <button className="btn" onClick={() => { setBoard(Array(9).fill(null)); setIsXNext(true); }}>Restart</button>
        </div>
    );
}
