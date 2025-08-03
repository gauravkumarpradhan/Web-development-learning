import { useState } from "react";
import "./style.css";
const initialState = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => null)
);

function TicTacToe() {
    const [gameState, setGameState] = useState(initialState);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState(null);

    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function computeWinner(nextGameState) {
        return winningPatterns.reduce((hasWon, pattern) => {
            const [firstIndex, secondIndex, thirdIndex] = pattern;
            const nextGameStateFlat = nextGameState.flat();
            const firstVal = nextGameStateFlat[firstIndex];
            const secondVal = nextGameStateFlat[secondIndex];
            const thirdVal = nextGameStateFlat[thirdIndex];

            if (!firstVal || !secondVal || !thirdVal)
                return hasWon || false;
            if (firstVal === secondVal && secondVal === thirdVal)
                return hasWon || firstVal;
            return hasWon || false;
        }, false)
    }

    function handleItemClick(row, col) {
        // Do nothing if there's already a winner or cell is filled
        if (winner || gameState[row][col]) return;

        const nextGameState = gameState.map((r) => [...r]);
        nextGameState[row][col] = currentPlayer;

        const result = computeWinner(nextGameState);
        setWinner(result);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        setGameState(nextGameState);
    }

    function handleReset() {
        setCurrentPlayer(null);
        setGameState(initialState);
        setWinner(null);
    }

    return (
        <div className="item-container">
            <h1>Tic tac toe</h1>

            {winner ? (
                <div>
                    <div>Winner: {winner}</div>
                    <button onClick={handleReset}>Reset</button>
                </div>
            ) : null}

            {gameState.map((row, index) => {
                return (
                    <div
                        className="row"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "1px",
                        }}
                    >
                        {gameState[index].map((item, ind) => {
                            return (
                                <div
                                    className={`${gameState[index][ind]
                                        ? "item-selected"
                                        : ""
                                        } item`}
                                    onClick={() => handleItemClick(index, ind)}
                                >
                                    {gameState[index][ind] ?? ""}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default TicTacToe;
