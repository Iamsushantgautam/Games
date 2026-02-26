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
        <div className="center">
            <h2>Mistakes: {mistakes} / {MAX_MISTAKES}</h2>
            <div className="hangman-text">
                {word.split("").map((l, i) => (guessed.has(l) || isLoss ? l : "_")).join(" ")}
            </div>
            <div>
                <h3>{isWin ? "You Won! 🎉" : isLoss ? "Game Over! 😢" : "Keep guessing!"}</h3>
                <button className="btn" onClick={() => {
                    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
                    setGuessed(new Set());
                    setMistakes(0);
                }}>Play Again</button>
            </div>
            <div className="hangman-keys" style={{ marginTop: "2rem" }}>
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
        </div>
    );
}
