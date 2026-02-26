import './WhackAMole.css';
import React, { useState, useEffect } from "react";

export default function WhackAMole() {
    const [activeHole, setActiveHole] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [playing, setPlaying] = useState(false);
    const [whackedHoles, setWhackedHoles] = useState([]);

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
            setWhackedHoles(prev => [...prev, idx]);
            setActiveHole(null);
            setTimeout(() => {
                setWhackedHoles(prev => prev.filter(h => h !== idx));
            }, 300);
        }
    };

    const start = () => {
        setScore(0);
        setTimeLeft(30);
        setPlaying(true);
    };

    return (
        <>
            <div className="status-bar">
                <div className="status-pill">Score: {score}</div>
                <div className={`status-pill ${timeLeft <= 5 && timeLeft > 0 ? "accent" : ""}`}>
                    Time: {timeLeft}s
                </div>
            </div>

            <div className="mole-board">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="mole-hole" onClick={() => whack(i)}>
                        <div className={`mole ${activeHole === i ? "up" : ""} ${whackedHoles.includes(i) ? "whacked" : ""}`}>
                            {whackedHoles.includes(i) ? "💫" : "🐹"}
                        </div>
                    </div>
                ))}
            </div>

            <button className="btn" onClick={start} disabled={playing}>
                {timeLeft === 0 ? "Play Again" : "Start Game"}
            </button>
        </>
    );
}
