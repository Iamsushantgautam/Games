import React, { useState, useEffect } from "react";

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

export default function MemoryGame() {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);

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
                setMatched([...matched, first, second]);
            }
            setTimeout(() => setFlipped([]), 1000);
        }
    };

    return (
        <div className="center">
            <h2 style={{ marginBottom: "1rem" }}>Matches: {matched.length / 2} / {EMOJIS.length}</h2>
            <div className="memory-board">
                {cards.map((card, idx) => {
                    const isVisible = flipped.includes(idx) || matched.includes(idx);
                    return (
                        <div
                            key={card.id}
                            className={`memory-card ${isVisible ? "" : "hidden"}`}
                            onClick={() => handleCardClick(idx)}
                        >
                            {isVisible ? card.emoji : "?"}
                        </div>
                    );
                })}
            </div>
            <button className="btn" onClick={startNewGame}>Restart</button>
        </div>
    );
}
