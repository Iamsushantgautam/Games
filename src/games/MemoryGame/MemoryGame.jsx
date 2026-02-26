import './MemoryGame.css';
import React, { useState, useEffect } from "react";

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

export default function MemoryGame() {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const isWon = matched.length === EMOJIS.length * 2;

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const shuffled = [...EMOJIS, ...EMOJIS]
            .sort(() => Math.random() - 0.5)
            .map((emoji, idx) => ({ id: idx, emoji }));
        setCards(shuffled);
        setFlipped([]);
        setMatched([]);
    };

    const handleCardClick = (index) => {
        if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            if (cards[first].emoji === cards[second].emoji) {
                setMatched(prev => [...prev, first, second]);
            }
            setTimeout(() => setFlipped([]), 800);
        }
    };

    return (
        <>
            <div className="status-bar">
                <div className={`status-pill ${isWon ? "accent" : ""}`}>
                    {isWon ? "You Won! 🎉" : `Matches: ${matched.length / 2} / ${EMOJIS.length}`}
                </div>
            </div>

            <div className="memory-board">
                {cards.map((card, idx) => {
                    const isFlipped = flipped.includes(idx);
                    const isMatched = matched.includes(idx);
                    const isVisible = isFlipped || isMatched;

                    let cardClass = "memory-card";
                    if (!isVisible) cardClass += " hidden";
                    if (isMatched) cardClass += " matched";

                    return (
                        <div
                            key={card.id}
                            className={cardClass}
                            onClick={() => handleCardClick(idx)}
                        >
                            {isVisible ? card.emoji : null}
                        </div>
                    );
                })}
            </div>

            <button className="btn" onClick={startNewGame}>Restart Game</button>
        </>
    );
}
