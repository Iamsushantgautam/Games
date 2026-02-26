import React, { useState, useEffect } from "react";

const CHOICES = ["✊", "✋", "✌️"];

export default function RockPaperScissors() {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [compChoice, setCompChoice] = useState(null);
    const [result, setResult] = useState("");

    const play = (choice) => {
        const comp = CHOICES[Math.floor(Math.random() * 3)];
        setPlayerChoice(choice);
        setCompChoice(comp);

        if (choice === comp) setResult("It's a Tie!");
        else if (
            (choice === "✊" && comp === "✌️") ||
            (choice === "✋" && comp === "✊") ||
            (choice === "✌️" && comp === "✋")
        ) setResult("You Win! 🎉");
        else setResult("You Lose! 😢");
    };

    return (
        <>
            <div className="status-bar">
                <div className="status-pill">
                    {result ? result : "Choose your weapon"}
                </div>
            </div>

            <div className="rps-options">
                {CHOICES.map(c => (
                    <button key={c} className="rps-btn" onClick={() => play(c)}>{c}</button>
                ))}
            </div>

            {playerChoice && (
                <div className="rps-results">
                    <div className="rps-battle">
                        <div className="rps-player">
                            <small>You</small>
                            <span>{playerChoice}</span>
                        </div>
                        <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--text-muted)" }}>VS</span>
                        <div className="rps-player">
                            <small>CPU</small>
                            <span>{compChoice}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
