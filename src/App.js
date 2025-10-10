import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    generateGrid(rows, cols);
  }, [rows, cols]);

  const generateGrid = (n, m) => {
    if (n <= 1 || m <= 1) return;
    const newGrid = [];
    let count = 1;
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < m; j++) {
        if (i === n - 1 && j === m - 1) {
          row.push(""); // Blank space
        } else {
          row.push(count++);
        }
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };

  const handleSlide = (row, col) => {
    const blankPosition = findBlankPosition();
    if (isAdjacent(row, col, blankPosition)) {
      const newGrid = [...grid];
      newGrid[blankPosition.row][blankPosition.col] =
        newGrid[row][col];
      newGrid[row][col] = "";
      setGrid(newGrid);
    }
  };

  const findBlankPosition = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === "") {
          return { row: i, col: j };
        }
      }
    }
    return null;
  };

  const isAdjacent = (row, col, blankPosition) => {
    const { row: blankRow, col: blankCol } = blankPosition;
    return (
      (Math.abs(row - blankRow) === 1 && col === blankCol) ||
      (Math.abs(col - blankCol) === 1 && row === blankRow)
    );
  };

  const handleEdit = (row, col) => {
    const newValue = prompt("Enter new value:", grid[row][col]);
    if (newValue !== null) {
      const newGrid = [...grid];
      newGrid[row][col] = newValue;
      setGrid(newGrid);
    }
  };

  const handleGenerate = () => {
    generateGrid(rows, cols);
  };

  return (
    <div className="App">
        <h1>8-puzzle playground</h1>
        <p><a href="https://github.com/ShobanChiddarth/8-puzzle-playground" target="_blank" rel="noreferrer">Github</a></p>
      <div className="controls">
        <input
          type="number"
          value={rows}
          min="2"
          onChange={(e) => setRows(parseInt(e.target.value))}
        />
        <input
          type="number"
          value={cols}
          min="2"
          onChange={(e) => setCols(parseInt(e.target.value))}
        />
        <button onClick={handleGenerate}>Generate</button>
      </div>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`grid-cell ${cell === "" ? "blank" : ""}`}
                onClick={() => handleSlide(rowIndex, colIndex)}
              >
                <div className="cell-content">{cell}</div>
                {cell !== "" && (
                  <button
                    className="edit-button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering slide when clicking "Edit"
                      handleEdit(rowIndex, colIndex);
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
