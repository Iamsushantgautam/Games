import React, { useState, useEffect } from "react";

const COLORS = ["green", "red", "yellow", "blue"];

export default function Simon() {
    const [sequence, setSequence] = useState([]);
    const [playerInput, setPlayerInput] = useState([]);
    const [activeColor, setActiveColor] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [message, setMessage] = useState("Press Start to Play");

    useEffect(() => {
        if (playing && playerInput.length === sequence.length && sequence.length > 0) {
            setTimeout(() => nextRound(), 1000);
        }
    }, [playerInput]);

    const start = () => {
        setSequence([]);
        setPlayerInput([]);
        setPlaying(true);
        setMessage("Watch carefully...");
        setTimeout(nextRound, 500);
    };

    const nextRound = () => {
        setPlayerInput([]);
        const nextColor = COLORS[Math.floor(Math.random() * 4)];
        const newSeq = [...sequence, nextColor];
        setSequence(newSeq);
        playSequence(newSeq);
    };

    const playSequence = (seq) => {
        setMessage("Watch carefully...");
        let delay = 0;
        seq.forEach((color, idx) => {
            setTimeout(() => {
                setActiveColor(color);
                setTimeout(() => setActiveColor(null), 350);
            }, delay);
            delay += 650;
        });
        setTimeout(() => setMessage("Your Turn!"), delay);
    };

    const handleInput = (color) => {
        if (!playing || message === "Watch carefully...") return;
        const newInput = [...playerInput, color];
        setPlayerInput(newInput);
        setActiveColor(color);
        setTimeout(() => setActiveColor(null), 150);

        if (newInput[newInput.length - 1] !== sequence[newInput.length - 1]) {
            setPlaying(false);
            setMessage(`Game Over! Final Score: ${sequence.length - 1}`);
        }
    };

    return (
        <>
            <div className="status-bar">
                <div className={`status-pill ${!playing && sequence.length > 0 ? "accent" : ""}`}>
                    {message}
                </div>
            </div>

            <div className="simon-board">
                {COLORS.map(color => (
                    <button
                        key={color}
                        className={`simon-btn simon-${color} ${activeColor === color ? "active" : ""}`}
                        onClick={() => handleInput(color)}
                    />
                ))}
            </div>

            {(!playing) && <button className="btn" onClick={start}>
                {sequence.length > 0 ? "Play Again" : "Start Game"}
            </button>}
        </>
    );
}
