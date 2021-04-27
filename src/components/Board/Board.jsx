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
      <div className="board" style={{pointerEvents: gameState !== 'In Progress' ? 'none' : 'auto'}}>
        <div className="row1">
          <Square value={squares[0]} index={0} clickHandler={clickHandler} gameState = {gameState} />
          <Square value={squares[1]} index={1} clickHandler={clickHandler} gameState = {gameState} />
          <Square value={squares[2]} index={2} clickHandler={clickHandler} gameState = {gameState} />
        </div>
        <div className="row2">
          <Square value={squares[3]} index={3} clickHandler={clickHandler} gameState = {gameState} />
          <Square value={squares[4]} index={4} clickHandler={clickHandler} gameState = {gameState} />
          <Square value={squares[5]} index={5} clickHandler={clickHandler} gameState = {gameState} />
        </div>
        <div className="row3">
          <Square value={squares[6]} index={6} clickHandler={clickHandler} gameState = {gameState} />
          <Square value={squares[7]} index={7} clickHandler={clickHandler} gameState = {gameState} />
          <Square value={squares[8]} index={8} clickHandler={clickHandler} gameState = {gameState} />
        </div>
      </div>
    </>
  );
}