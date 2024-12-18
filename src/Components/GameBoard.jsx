import React from "react";

const Scoreboard = ({ score, bestScore }) => {
    return (
        <>
            <div className="gameboard">
                <h1>Memory Card Game</h1>
                <div className="scores">

                    <p>Score: <span>{score}</span></p>
                    <p>Best Score: <span>{bestScore}</span> </p>
                </div>
            </div>
        </>
    );
};

export default Scoreboard;
