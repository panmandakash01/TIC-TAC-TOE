import "./App.css";
import "./style/root.scss";
import React, { useState } from "react";
import Board from "./componunts/Board";
import History from "./componunts/History";
import { calculateWinner } from "./helper";
import StatusMessage from "./componunts/StatusMessage";

const NEW_GAME =[
  { board: Array(9).fill(null), isXNext: true },
];
const App = () => {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];

  const {winner,winningSquares} = calculateWinner(current.board);
  

  const handleSquareClick = (position) => {
    if (current.board[position] || winner) {
      return;
    }

    setHistory((prev) => {
      const last = prev[prev.length - 1];

      const newBoard = last.board.map((Square, pos) => {
        if (pos === position) {
          return last.isXNext ? "X" : "O";
        }
        return Square;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });
    setCurrentMove((prev) => prev + 1);

    // setIsNext((prev) => !prev);
  };

  const moveTo = (move) => {
    setCurrentMove(move);
  };
  const onNewGame = () =>{
    setHistory(NEW_GAME);
    setCurrentMove(0)

  }

  return (
    <div className="app">
      <h1>TIC <span className="text-green" >TAC</span> TOE</h1>
      <StatusMessage winner={winner} current={current}/>
      <Board board={current.board} handleSquareClick={handleSquareClick} winningSquares={winningSquares} />
      <button type="button" onClick={onNewGame} className={`btn-reset ${winner ? 'active':''}` } >Start new game</button>
      <h2 style={{fontWeight :'normal'}} >Current game history</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls"
      />
    </div>
  );
};

export default App;
