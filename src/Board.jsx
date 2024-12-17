import React from "react";

export default function Board({ boxes, handleClick }) {
  return (
    <ul className="grid grid-cols-3 gap-4 w-fit mx-auto mt-6">
      {boxes.map((box, index) => (
        <li key={index} className="flex justify-center items-center">
          <button
            value={box}
            onClick={() => handleClick(index)}
            className="w-28 h-28 text-4xl font-bold text-gray-700 border-2 border-gray-300 "
          >
            {box}
          </button>
        </li>
      ))}
    </ul>
  );
}
