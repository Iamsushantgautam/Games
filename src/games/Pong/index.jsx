import React, { useState, useEffect, useRef } from "react";

export default function Pong() {
    const [paddle1, setPaddle1] = useState(160);
    const [paddle2, setPaddle2] = useState(160);
    const [ball, setBall] = useState({ x: 300, y: 200, dx: 3, dy: 3 });
    const [score, setScore] = useState({ p1: 0, p2: 0 });
    const [playing, setPlaying] = useState(false);
    const boardRef = useRef(null);

    useEffect(() => {
        if (!playing) return;
        const interval = setInterval(() => {
            setBall(b => {
                let newX = b.x + b.dx;
                let newY = b.y + b.dy;
                let newDx = b.dx;
                let newDy = b.dy;

                if (newY <= 0 || newY >= 386) newDy *= -1;

                if (newX <= 26 && newY >= paddle1 && newY <= paddle1 + 80) {
                    newDx *= -1;
                    newX = 26;
                }
                if (newX >= 560 && newY >= paddle2 && newY <= paddle2 + 80) {
                    newDx *= -1;
                    newX = 560;
                }

                if (newX < 0) { setScore(s => ({ ...s, p2: s.p2 + 1 })); return { x: 300, y: 200, dx: -3, dy: 3 }; }
                if (newX > 600) { setScore(s => ({ ...s, p1: s.p1 + 1 })); return { x: 300, y: 200, dx: 3, dy: 3 }; }

                setPaddle2(p2 => {
                    if (b.dx > 0) {
                        if (p2 + 40 < newY) return Math.min(p2 + 2, 320);
                        if (p2 + 40 > newY) return Math.max(p2 - 2, 0);
                    }
                    return p2;
                });

                return { x: newX, y: newY, dx: newDx, dy: newDy };
            });
        }, 16);
        return () => clearInterval(interval);
    }, [playing, paddle1, paddle2]);

    const handleTouchMove = (e) => {
        if (!playing || !boardRef.current) return;
        const touch = e.touches[0];
        const rect = boardRef.current.getBoundingClientRect();
        const y = touch.clientY - rect.top;
        setPaddle1(Math.max(0, Math.min(y - 40, 320)));
    };

    const handleMouseMove = (e) => {
        if (!playing || !boardRef.current) return;
        const rect = boardRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top;
        setPaddle1(Math.max(0, Math.min(y - 40, 320)));
    };

    const handleKeyDown = (e) => {
        if (!playing) return;
        // Adjust step size based on need, but let's keep mouse/touch primary
    };

    return (
        <>
            <div className="status-bar">
                <div className="status-pill">
                    Score: {score.p1} - {score.p2}
                </div>
            </div>

            <div className="swipe-hint"><span>👆</span> Drag to Move Paddle</div>

            <div
                className="pong-board"
                ref={boardRef}
                onTouchMove={handleTouchMove}
                onMouseMove={handleMouseMove}
                tabIndex="0"
                onKeyDown={handleKeyDown}
            >
                <div className="pong-paddle" style={{ left: 10, top: paddle1 }} />
                <div className="pong-paddle" style={{ right: 10, top: paddle2 }} />
                <div className="pong-ball" style={{ left: ball.x, top: ball.y }} />
            </div>

            <button className="btn" onClick={() => {
                setScore({ p1: 0, p2: 0 });
                setBall({ x: 300, y: 200, dx: 3, dy: 3 });
                setPlaying(true);
            }} disabled={playing}>
                Start Game
            </button>
        </>
    );
}
