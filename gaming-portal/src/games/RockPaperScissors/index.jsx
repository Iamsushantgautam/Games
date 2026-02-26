import React, { useState } from "react";

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
        <div className="center">
            <h2>Choose your weapon:</h2>
            <div className="rps-options">
                {CHOICES.map(c => (
                    <button key={c} className="rps-btn" onClick={() => play(c)}>{c}</button>
                ))}
            </div>
            {playerChoice && (
                <div>
                    <h3>You: <span style={{ fontSize: "2rem" }}>{playerChoice}</span> vs CPU: <span style={{ fontSize: "2rem" }}>{compChoice}</span></h3>
                    <h2 style={{ color: "var(--accent)", marginTop: "1rem" }}>{result}</h2>
                </div>
            )}
        </div>
    );
}
