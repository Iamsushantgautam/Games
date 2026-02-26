import React, { useState, useEffect, useRef } from "react";

export default function Pong() {
    const [ball, setBall] = useState({ x: 295, y: 195, dx: 3, dy: 3 });
    const [p1Y, setP1Y] = useState(160);
    const [p2Y, setP2Y] = useState(160);
    const boardRef = useRef(null);

    useEffect(() => {
        boardRef.current?.focus();
        const interval = setInterval(() => {
            setBall(b => {
                let { x, y, dx, dy } = b;
                x += dx; y += dy;
                // Bounce top/bottom
                if (y <= 0 || y >= 390) dy *= -1;
                // Bounce paddles
                if (x <= 20 && y + 10 >= p1Y && y <= p1Y + 80) dx *= -1.1; // p1 hit
                if (x >= 570 && y + 10 >= p2Y && y <= p2Y + 80) dx *= -1.1; // p2 hit

                // Boundaries
                if (x < 0) { dx = 3; dy = 3; x = 295; y = 195; }
                if (x > 600) { dx = -3; dy = 3; x = 295; y = 195; }
                return { x, y, dx, dy };
            });

            // Basic AI for p2
            setP2Y(prev => {
                const diff = ball.y - (prev + 40);
                return Math.max(0, Math.min(320, prev + diff * 0.1));
            });

        }, 16);
        return () => clearInterval(interval);
    }, [p1Y, ball.y]);

    const handleKeyDown = (e) => {
        if (e.key === "ArrowUp") setP1Y(y => Math.max(0, y - 20));
        if (e.key === "ArrowDown") setP1Y(y => Math.min(320, y + 20));
    };

    return (
        <div className="center">
            <p style={{ marginBottom: "1rem" }}>Use Arrow Up/Down to move left paddle!</p>
            <div className="pong-board" tabIndex="0" ref={boardRef} onKeyDown={handleKeyDown}>
                <div className="pong-paddle" style={{ left: 10, top: p1Y }} />
                <div className="pong-paddle" style={{ right: 10, top: p2Y }} />
                <div className="pong-ball" style={{ left: ball.x, top: ball.y }} />
            </div>
        </div>
    );
}
