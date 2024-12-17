import React, { useState } from "react";
import Board from "./Board";

export default function Whack() {
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [point, setPoint] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem("highScore");
    return savedHighScore ? parseInt(savedHighScore) : 0;
  });
  const [isGameRunning, setIsGameRunning] = useState(false);

  const handleStart = () => {
    setIsGameRunning(true);
    setBoxes(Array(9).fill(""));
    setPoint(0); // Reset points at the start of the game

    let intervalId = setInterval(() => {
      const newArray = Array(9).fill("");
      const randomIndex = Math.floor(Math.random() * 9);
      newArray[randomIndex] = "Quack";
      setBoxes(newArray);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      setBoxes(Array(9).fill(""));
      setIsGameRunning(false);

      setPoint((prevPoint) => {
        console.log(`🟢 Final points: ${prevPoint}, Previous High Score: ${highScore}`);
        if (prevPoint > highScore) {
          console.log(`🏆 New High Score: ${prevPoint} (old was ${highScore})`);
          localStorage.setItem("highScore", prevPoint.toString());
          setHighScore(prevPoint);
        }
        return prevPoint; // Return the current point to avoid resetting it
      });
    }, 10000);
  };

  const handleClick = (index) => {
    if (boxes[index] === "Quack") {
      setPoint((prevPoint) => prevPoint + 1);
      const newArray = [...boxes];
      newArray[index] = "";
      setBoxes(newArray);
    }
  };

  return (
    <div className="text-center mt-6">
      <h1 className="text-3xl font-bold mb-4">Whack-a-Quack Game</h1>
      <div className="flex gap-9 justify-center">
        <p className="text-xl mb-2">Points: {point}</p>
        <p className="text-xl mb-2 text-green-600">High Score: {highScore}</p>
      </div>

      <Board boxes={boxes} handleClick={handleClick} />

      <button
        onClick={handleStart}
        disabled={isGameRunning}
        className={`mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-300 ${
          isGameRunning ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Start
      </button>
    </div>
  );
}
