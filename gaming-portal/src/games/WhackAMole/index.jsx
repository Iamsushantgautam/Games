import React, { useState, useEffect } from "react";

export default function WhackAMole() {
    const [activeHole, setActiveHole] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (playing && timeLeft > 0) {
            const ms = Math.random() * 800 + 400;
            const hole = Math.floor(Math.random() * 9);
            setActiveHole(hole);
            const timeout = setTimeout(() => setActiveHole(null), ms);
            const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
            return () => { clearTimeout(timeout); clearTimeout(timer); };
        } else if (timeLeft === 0) {
            setPlaying(false);
            setActiveHole(null);
        }
    }, [playing, timeLeft]);

    const whack = (idx) => {
        if (idx === activeHole) {
            setScore(s => s + 1);
            setActiveHole(null);
        }
    };

    const start = () => {
        setScore(0);
        setTimeLeft(30);
        setPlaying(true);
    };

    return (
        <div className="center">
            <h2>Score: {score} | Time: {timeLeft}s</h2>
            <button className="btn" onClick={start} disabled={playing}>
                {timeLeft === 0 ? "Play Again" : "Start Game"}
            </button>
            <div className="mole-board" style={{ marginTop: "2rem" }}>
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="mole-hole" onClick={() => whack(i)}>
                        <div className={`mole ${activeHole === i ? "up" : ""}`}>🐹</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
