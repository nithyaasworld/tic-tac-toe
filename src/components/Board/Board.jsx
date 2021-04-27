import Square from "../Square/Square.jsx";
import { useState } from "react";
import "./board.css";
export default function Board(props) {
  let [squares, setSquares] = useState(new Array(9).fill(" "));
  let [currentPlayer, setCurrentPlayer] = useState("X");
  let [gameState, setGameState] = useState("In Progress");
  let clickHandler = (index) => {
    if (["X", "O"].includes(squares[index])) {
      return;
    }
    if (gameState !== "In Progress") {
      return;
    }
    let squaresCopy = [...squares];
    squaresCopy[index] = currentPlayer;
    setSquares(squaresCopy);
    if (currentPlayer === "X") setCurrentPlayer("O");
    else setCurrentPlayer("X");
    checkWinner(squaresCopy);
  };
  let checkWinner = (squaresCopy) => {
    let firstRow = squaresCopy.slice(0, 3).join("");
    if (isThereAWinner(firstRow)) return;
    let secondRow = squaresCopy.slice(3, 6).join("");
    if (isThereAWinner(secondRow)) return;
    let thirdRow = squaresCopy.slice(6).join("");
    if (isThereAWinner(thirdRow)) return;
    let lefttoRightDiagonal = squaresCopy[0] + squaresCopy[4] + squaresCopy[8];
    if (isThereAWinner(lefttoRightDiagonal)) return;
    let rightToLeftDiagonal = squaresCopy[2] + squaresCopy[4] + squaresCopy[6];
    if (isThereAWinner(rightToLeftDiagonal)) return;
    let firstCol = squaresCopy[0] + squaresCopy[3] + squaresCopy[6];
    if (isThereAWinner(firstCol)) return;
    let secondCol = squaresCopy[1] + squaresCopy[4] + squaresCopy[7];
    if (isThereAWinner(secondCol)) return;
    let thridCol = squaresCopy[2] + squaresCopy[5] + squaresCopy[8];
    if (isThereAWinner(thridCol)) return;

    if (squaresCopy.filter((cell) => cell !== " ").length === 9) {
        setGameState(`Draw`);
      return;
    }
  };
  let isThereAWinner = (value) => {
    if (value.length === 3 && ["XXX", "OOO"].includes(value)) {
      setGameState(`${value[0]} won`);
      return true;
    }
    return false;
  };
  return (
    <>
      <div className="game-stats">
        <p>Current Turn: {currentPlayer}</p>
        <p>Game State: {gameState}</p>
      </div>
      <div className="board" style={{ pointerEvents: gameState !== 'In Progress' ? 'none' : 'auto' }}>
        {squares.map((cell, i) => <Square value={cell} index={i} clickHandler={clickHandler} gameState={gameState} />)}
      </div>
    </>
  );
}