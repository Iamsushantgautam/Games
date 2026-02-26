import './Ludo.css';
import React, { useState } from "react";
import { Dices } from "lucide-react";

// Path mappings from player start to center (57 steps)
const pathCoordinates = [
    { x: 6, y: 13 }, { x: 6, y: 12 }, { x: 6, y: 11 }, { x: 6, y: 10 }, { x: 6, y: 9 },
    { x: 5, y: 8 }, { x: 4, y: 8 }, { x: 3, y: 8 }, { x: 2, y: 8 }, { x: 1, y: 8 }, { x: 0, y: 8 },
    { x: 0, y: 7 }, { x: 0, y: 6 },
    { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 },
    { x: 6, y: 5 }, { x: 6, y: 4 }, { x: 6, y: 3 }, { x: 6, y: 2 }, { x: 6, y: 1 }, { x: 6, y: 0 },
    { x: 7, y: 0 }, { x: 8, y: 0 },
    { x: 8, y: 1 }, { x: 8, y: 2 }, { x: 8, y: 3 }, { x: 8, y: 4 }, { x: 8, y: 5 },
    { x: 9, y: 6 }, { x: 10, y: 6 }, { x: 11, y: 6 }, { x: 12, y: 6 }, { x: 13, y: 6 }, { x: 14, y: 6 },
    { x: 14, y: 7 }, { x: 14, y: 8 },
    { x: 13, y: 8 }, { x: 12, y: 8 }, { x: 11, y: 8 }, { x: 10, y: 8 }, { x: 9, y: 8 },
    { x: 8, y: 9 }, { x: 8, y: 10 }, { x: 8, y: 11 }, { x: 8, y: 12 }, { x: 8, y: 13 }, { x: 8, y: 14 },
    { x: 7, y: 14 }, { x: 6, y: 14 }
];

const homePaths = {
    red: [{ x: 7, y: 13 }, { x: 7, y: 12 }, { x: 7, y: 11 }, { x: 7, y: 10 }, { x: 7, y: 9 }],
    green: [{ x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }],
    yellow: [{ x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 4 }, { x: 7, y: 5 }],
    blue: [{ x: 13, y: 7 }, { x: 12, y: 7 }, { x: 11, y: 7 }, { x: 10, y: 7 }, { x: 9, y: 7 }],
};

const SAFES = [0, 8, 13, 21, 26, 34, 39, 47];
const OFFSETS = { red: 0, green: 13, yellow: 26, blue: 39 };
const PLAYERS = ["red", "green", "yellow", "blue"];

export default function Ludo() {
    const [turn, setTurn] = useState(0); // Index in PLAYERS
    const [dice, setDice] = useState(null);
    const [hasRolled, setHasRolled] = useState(false);
    const [msg, setMsg] = useState("Red's Turn to Roll");

    const [tokens, setTokens] = useState({
        red: [-1, -1, -1, -1],
        green: [-1, -1, -1, -1],
        yellow: [-1, -1, -1, -1],
        blue: [-1, -1, -1, -1]
    });

    const activePlayer = PLAYERS[turn];

    const getBasePos = (player, i) => {
        const bases = {
            red: [{ x: 2, y: 11 }, { x: 3, y: 11 }, { x: 2, y: 12 }, { x: 3, y: 12 }],
            green: [{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3 }],
            yellow: [{ x: 11, y: 2 }, { x: 12, y: 2 }, { x: 11, y: 3 }, { x: 12, y: 3 }],
            blue: [{ x: 11, y: 11 }, { x: 12, y: 11 }, { x: 11, y: 12 }, { x: 12, y: 12 }]
        };
        return bases[player][i];
    };

    const rollDice = () => {
        if (hasRolled) return;
        const val = Math.floor(Math.random() * 6) + 1;
        setDice(val);
        setHasRolled(true);

        // Check if any valid moves exist
        const pTokens = tokens[activePlayer];
        const canMoveAny = pTokens.some((tPos) => {
            if (tPos === -1 && val === 6) return true;
            if (tPos !== -1 && tPos + val <= 56) return true;
            return false;
        });

        if (!canMoveAny) {
            setMsg(`${activePlayer.charAt(0).toUpperCase() + activePlayer.slice(1)} has no moves. Passing...`);
            setTimeout(() => advanceTurn(false), 1500);
        } else {
            setMsg(`${activePlayer.charAt(0).toUpperCase() + activePlayer.slice(1)} rolled a ${val}! Select token.`);
        }
    };

    const advanceTurn = (rolledSix) => {
        if (rolledSix) {
            setHasRolled(false);
            setDice(null);
            setMsg(`${activePlayer.charAt(0).toUpperCase() + activePlayer.slice(1)} rolls again!`);
        } else {
            const next = (turn + 1) % 4;
            setTurn(next);
            setHasRolled(false);
            setDice(null);
            setMsg(`${PLAYERS[next].charAt(0).toUpperCase() + PLAYERS[next].slice(1)}'s Turn!`);
        }
    };

    const handleTokenClick = (player, tIdx) => {
        if (player !== activePlayer || !hasRolled) return;

        const currentPos = tokens[player][tIdx];

        if (currentPos === -1) {
            if (dice === 6) {
                // Unlock
                const newTokens = { ...tokens };
                newTokens[player][tIdx] = 0;
                setTokens(newTokens);
                advanceTurn(true);
            }
        } else {
            // Move on board
            const nextPos = currentPos + dice;
            if (nextPos <= 56) {
                const newTokens = { ...tokens };
                newTokens[player][tIdx] = nextPos;

                // Checking killing mechanics (simplified)
                if (nextPos <= 50) {
                    const globalTargetPos = (nextPos + OFFSETS[player]) % 52;
                    let gotKill = false;

                    if (!SAFES.includes(globalTargetPos)) {
                        PLAYERS.forEach(opp => {
                            if (opp !== player) {
                                newTokens[opp] = newTokens[opp].map(oppPos => {
                                    if (oppPos !== -1 && oppPos <= 50) {
                                        const oppGlobal = (oppPos + OFFSETS[opp]) % 52;
                                        if (oppGlobal === globalTargetPos) {
                                            gotKill = true;
                                            return -1; // Killed!
                                        }
                                    }
                                    return oppPos;
                                });
                            }
                        });
                    }
                    if (gotKill) {
                        setTokens(newTokens);
                        setMsg(`Kill! ${player} rolls again!`);
                        setHasRolled(false);
                        setDice(null);
                        return;
                    }
                }

                setTokens(newTokens);
                advanceTurn(dice === 6);
            }
        }
    };

    const renderBoardTokens = () => {
        const els = [];
        PLAYERS.forEach(player => {
            tokens[player].forEach((pos, idx) => {
                let coords;
                if (pos === -1) coords = getBasePos(player, idx);
                else if (pos > 50) coords = pos >= 56 ? { x: 7, y: 7 } : homePaths[player][pos - 51];
                else coords = pathCoordinates[(pos + OFFSETS[player]) % 52];

                els.push(
                    <div
                        key={`${player}-${idx}`}
                        className={`ludo-token t-${player} ${player === activePlayer && hasRolled ? "active" : ""}`}
                        style={{
                            gridColumn: coords.x + 1,
                            gridRow: coords.y + 1,
                            transform: `translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px)`
                        }}
                        onClick={() => handleTokenClick(player, idx)}
                    />
                );
            });
        });
        return els;
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", width: "100%" }}>

            <div className="status-bar">
                <div className={`status-pill ${activePlayer}`} style={{ minWidth: "250px", textAlign: "center" }}>
                    {msg}
                </div>
            </div>

            <div className="ludo-container">
                <div className="ludo-grid">
                    {/* Render Base Areas */}
                    <div className="ludo-base base-red" style={{ gridColumn: "1 / 7", gridRow: "10 / 16" }}>
                        <div className="base-inner"></div>
                    </div>
                    <div className="ludo-base base-green" style={{ gridColumn: "1 / 7", gridRow: "1 / 7" }}>
                        <div className="base-inner"></div>
                    </div>
                    <div className="ludo-base base-yellow" style={{ gridColumn: "10 / 16", gridRow: "1 / 7" }}>
                        <div className="base-inner"></div>
                    </div>
                    <div className="ludo-base base-blue" style={{ gridColumn: "10 / 16", gridRow: "10 / 16" }}>
                        <div className="base-inner"></div>
                    </div>

                    {/* Render Center */}
                    <div className="ludo-center" style={{ gridColumn: "7 / 10", gridRow: "7 / 10" }}>
                        <div className="center-tri red-tri"></div>
                        <div className="center-tri green-tri"></div>
                        <div className="center-tri yellow-tri"></div>
                        <div className="center-tri blue-tri"></div>
                    </div>

                    {/* Rendering the Path cells (just visualizing some colored tracks) */}
                    {Object.entries(homePaths).map(([color, pathArr]) =>
                        pathArr.map((pt, i) => (
                            <div key={`hp-${color}-${i}`} style={{ gridColumn: pt.x + 1, gridRow: pt.y + 1, background: `var(--ludo-${color})`, opacity: 0.5, border: "1px solid rgba(0,0,0,0.1)" }}></div>
                        ))
                    )}

                    {/* Rendering safe stars */}
                    {SAFES.map(idx => {
                        const pt = pathCoordinates[idx];
                        return <div key={`safe-${idx}`} style={{ gridColumn: pt.x + 1, gridRow: pt.y + 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", opacity: 0.3 }}>⭐</div>
                    })}

                    {renderBoardTokens()}
                </div>
            </div>

            <button
                className="btn"
                onClick={rollDice}
                disabled={hasRolled}
                style={{
                    marginTop: "10px",
                    fontSize: "1.2rem",
                    padding: "1rem 2rem",
                    background: `var(--ludo-${activePlayer})`,
                    boxShadow: `0 4px 0 var(--ludo-${activePlayer}-dark), var(--shadow-sm)`
                }}
            >
                <Dices style={{ marginRight: "10px" }} />
                {hasRolled ? `Rolled a ${dice}` : "Roll Dice"}
            </button>

        </div>
    );
}
