import React, { useState, useEffect } from "react";
import Overlay from "../overlay/Overlay";
import Tile from "../tile/Tile";
import Winner from "../winner/Winner";
import NewGame from "../new-game/NewGame";
import Timer from "../timer/Timer";
import "./Board.css";

const Board = () => {
  const shuffle = () =>
    new Array(16)
      .fill()
      .map((_, i) => i + 1)
      .sort(() => Math.random() - 0.5)
      .map((x, i) => ({ value: x, index: i }));

  const [paused, setPaused] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (paused) {
      setTimerActive(false); 
    } else {
      setTimerActive(true);
    }
  }, [paused]);

  const handlePause = () => {
    setPaused(!paused);
  };

  const moveTile = (tile) => {
    const i16 = numbers.find((n) => n.value === 16).index;
    if (![i16 - 1, i16 + 1, i16 - 4, i16 + 4].includes(tile.index) || animating)
      return;

    const newNumbers = [...numbers].map((number) => {
      if (number.index !== i16 && number.index !== tile.index) return number;
      else if (number.value === 16) return { value: 16, index: tile.index };

      return { value: tile.value, index: i16 };
    });
    setAnimating(true);
    setNumbers(newNumbers);
    setMoves((prevMoves) => prevMoves + 1);
    setTimerActive(true);
    setTimeout(() => setAnimating(false), 400);
  };

  const handleKeyDown = (e) => {
    const i16 = numbers.find((n) => n.value === 16).index;
    if (e.keyCode === 37 && !(i16 % 4 === 3))
      moveTile(numbers.find((n) => n.index === i16 + 1));
    if (e.keyCode === 38 && !(i16 > 11))
      moveTile(numbers.find((n) => n.index === i16 + 4));
    if (e.keyCode === 39 && !(i16 % 4 === 0))
      moveTile(numbers.find((n) => n.index === i16 - 1));
    if (e.keyCode === 40 && !(i16 < 4))
      moveTile(numbers.find((n) => n.index === i16 - 4));
  };

  const reset = () => {
    setNumbers(shuffle());
    setMoves(0);
    setTime(0);
    setTimerActive(false);
  };

  useEffect(reset, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    let won = true;
    for (let i = 0; i < numbers.length - 1; i++) {
      const { value, index } = numbers[i];
      if (index !== value - 1) {
        won = false;
        break;
      }
    }
    if (won) {
      setTimerActive(false);
    }
  }, [numbers]);

  return (
    <div className="container">
      <div className="card">
        <div className="game">
          <div className="moves">
            <p>Moves: {moves}</p>
            <Timer time={time} timerActive={timerActive} setTime={setTime} />
          </div>

          <div className="board">
            <Overlay />
            {numbers.map((x, i) => (
              <Tile key={i} number={x} moveTile={moveTile} />
            ))}
          </div>

          <Winner numbers={numbers} reset={reset} />

          <div className="pause-button">
            <button onClick={handlePause}>{paused ? "Resume" : "Pause"}</button>
          </div>

          <NewGame reset={reset} />
        </div>
      </div>
    </div>
  );
};

export default Board;
