import React, { useState } from "react";

const WORDS = ["REACT", "DEVELOPER", "JAVASCRIPT", "FRONTEND", "PORTAL", "GAMING", "APPLICATION"];

export default function Hangman() {
    const [word, setWord] = useState(WORDS[0]);
    const [guessed, setGuessed] = useState(new Set());
    const [mistakes, setMistakes] = useState(0);

    const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const MAX_MISTAKES = 6;

    const guess = (letter) => {
        const newGuessed = new Set(guessed).add(letter);
        setGuessed(newGuessed);
        if (!word.includes(letter)) setMistakes(m => m + 1);
    };

    const isWin = word.split("").every(l => guessed.has(l));
    const isLoss = mistakes >= MAX_MISTAKES;

    return (
        <>
            <div className="status-bar">
                <div className={`status-pill ${(isWin || isLoss) ? "accent" : ""}`}>
                    {isWin ? "You Won! 🎉" : isLoss ? "Game Over! 😢" : `Mistakes: ${mistakes} / ${MAX_MISTAKES}`}
                </div>
            </div>

            <div className="hangman-word">
                {word.split("").map((l, i) => (
                    <div key={i} className="hangman-letter">
                        {guessed.has(l) || isLoss ? l : ""}
                    </div>
                ))}
            </div>

            <div className="hangman-keyboard">
                {ALPHABET.map(l => (
                    <button
                        key={l}
                        className="hangman-key"
                        onClick={() => guess(l)}
                        disabled={guessed.has(l) || isWin || isLoss}
                    >
                        {l}
                    </button>
                ))}
            </div>

            {(isWin || isLoss) && (
                <button className="btn" style={{ marginTop: "1rem" }} onClick={() => {
                    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
                    setGuessed(new Set());
                    setMistakes(0);
                }}>Play Again</button>
            )}
        </>
    );
}
