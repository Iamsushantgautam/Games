import './RockPaperScissors.css';
import React, { useState } from "react";
import { Bot, Swords, RotateCcw } from "lucide-react";

const CHOICES = [
    { emoji: "✊", id: "rock", name: "Rock" },
    { emoji: "✋", id: "paper", name: "Paper" },
    { emoji: "✌️", id: "scissors", name: "Scissors" }
];

export default function RockPaperScissors() {
    const [mode, setMode] = useState("pvc"); // "pvc" or "pvp"
    const [p1Score, setP1Score] = useState(0);
    const [p2Score, setP2Score] = useState(0); // Used for Computer in pvc mode

    const [playerChoice, setPlayerChoice] = useState(null);
    const [p2Choice, setP2Choice] = useState(null);
    const [result, setResult] = useState("");
    const [turn, setTurn] = useState(1); // 1 or 2 for pvp

    const determineWinner = (c1, c2) => {
        if (c1 === c2) return "tie";
        if ((c1 === "✊" && c2 === "✌️") ||
            (c1 === "✋" && c2 === "✊") ||
            (c1 === "✌️" && c2 === "✋")) return "p1";
        return "p2";
    };

    const play = (choiceObj) => {
        const choice = choiceObj.emoji;
        if (mode === "pvc") {
            const compObj = CHOICES[Math.floor(Math.random() * 3)];
            const comp = compObj.emoji;
            setPlayerChoice(choice);
            setP2Choice(comp);
            const winner = determineWinner(choice, comp);

            if (winner === "tie") {
                setResult("It's a Draw! 🤝");
            } else if (winner === "p1") {
                setResult("Epic Victory! You Win! 🎉");
                setP1Score(s => s + 1);
            } else {
                setResult("Defeat! Computer Wins! 🤖");
                setP2Score(s => s + 1);
            }
        } else {
            if (turn === 1) {
                setPlayerChoice(choice);
                setP2Choice(null);
                setResult("Time for Player 2! 🎭");
                setTurn(2);
            } else {
                setP2Choice(choice);
                const winner = determineWinner(playerChoice, choice);
                if (winner === "tie") {
                    setResult("It's a Tie! 🤝");
                } else if (winner === "p1") {
                    setResult("Player 1 Claims Victory! �");
                    setP1Score(s => s + 1);
                } else {
                    setResult("Player 2 Dominates! �");
                    setP2Score(s => s + 1);
                }
                setTurn(3); // Result shown state before Player 1 starts next round
            }
        }
    };

    const resetScores = () => {
        setP1Score(0);
        setP2Score(0);
        setPlayerChoice(null);
        setP2Choice(null);
        setResult("");
        setTurn(1);
    };

    const changeMode = (newMode) => {
        setMode(newMode);
        resetScores();
    };

    const nextRound = () => {
        setPlayerChoice(null);
        setP2Choice(null);
        setResult("");
        setTurn(1);
    };

    const isGameOverPvp = mode === "pvp" && turn === 3;
    const isP2Turn = mode === "pvp" && turn === 2;

    const statusMessage = result
        ? result
        : (mode === "pvc" ? "Select Your Weapon!" : (isP2Turn ? "Player 2, Choose Wisely!" : "Player 1, Select Your Weapon!"));

    return (
        <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>


            {/* Scoreboard */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--panel)", padding: "1.25rem 2rem", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", border: "2px solid var(--border)" }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
                        {mode === "pvc" ? "You" : "Player 1"}
                    </div>
                    <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--text)", lineHeight: 1.2 }}>{p1Score}</div>
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--border)", padding: "0 1rem" }}>-</div>
                <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
                        {mode === "pvc" ? "Computer" : "Player 2"}
                    </div>
                    <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--text)", lineHeight: 1.2 }}>{p2Score}</div>
                </div>
            </div>

            {/* Status Pill */}
            <div className="status-bar">
                <div className={`status-pill ${(result.includes("Win") || result.includes("Victory") || result.includes("Dominates")) ? "accent" : ""}`} style={{ fontSize: "1.05rem", padding: "0.75rem 2rem", width: "100%", textAlign: "center", minHeight: "52px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {statusMessage}
                </div>
            </div>

            {/* Selection Options */}
            {!isGameOverPvp && (
                <div className="rps-options" style={{ gap: "1rem" }}>
                    {CHOICES.map(c => (
                        <button
                            key={c.id}
                            className="rps-btn"
                            onClick={() => play(c)}
                            title={c.name}
                            style={{ flex: 1, minWidth: "100px", maxWidth: "150px", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}
                        >
                            <span style={{ fontSize: "3.5rem", lineHeight: 1 }}>{c.emoji}</span>
                            <span style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--text-muted)", letterSpacing: "0.5px", transition: "color 0.2s" }}>{c.name}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Next Round Button for PvP */}
            {isGameOverPvp && (
                <div style={{ textAlign: "center" }}>
                    <button className="btn" onClick={nextRound} style={{ padding: "0.8rem 2.5rem", fontSize: "1.05rem" }}>
                        <RotateCcw size={18} /> Next Round
                    </button>
                </div>
            )}

            {/* Results */}
            {playerChoice && p2Choice && (
                <div className="rps-results">
                    <div className="rps-battle">
                        <div className="rps-player">
                            <small>{mode === "pvc" ? "You" : "Player 1"}</small>
                            <span style={{ animation: "popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>{playerChoice}</span>
                        </div>
                        <span style={{ fontSize: "2rem", fontWeight: "800", color: "var(--border)" }}>VS</span>
                        <div className="rps-player">
                            <small>{mode === "pvc" ? "Computer" : "Player 2"}</small>
                            <span style={{ animation: "popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both" }}>{p2Choice}</span>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes popIn {
                    0% { transform: scale(0.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .rps-btn:hover {
                    background: var(--accent-light);
                }
                .rps-btn:hover span:last-child {
                    color: var(--accent-dark);
                }
            `}</style>
        </div>
    );
}
