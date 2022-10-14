import React, { Fragment, useCallback, useRef, useState } from "react";
import produce from "immer";
import gridClass from "./MainGrid.module.css";
import Controls from "./Controls/Controls";
import Toggle from "./ThemeToggle/Toggle";

const coords = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const rowNum = 75;
const colNum = 75;

export default function Grid(props) {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < rowNum; i++) {
      rows.push(Array.from(Array(colNum), () => 0));
    }
    return rows;
  });

  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const runRef = useRef(running);
  runRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runRef.current) return;

    setGrid((prevGrid) => {
      return produce(prevGrid, (gridCopy) => {
        for (let x = 0; x < rowNum; x++) {
          for (let y = 0; y < colNum; y++) {
            let neighbhours = 0;

            coords.forEach(([i, j]) => {
              const newX = x + i;
              const newY = y + j;

              if (newX >= 0 && newX < rowNum && newY >= 0 && newY < colNum) {
                neighbhours += prevGrid[newX][newY];
              }
            });

            if (neighbhours < 2 || neighbhours > 3) {
              gridCopy[x][y] = 0;
            } else if (prevGrid[x][y] === 0 && neighbhours === 3) {
              gridCopy[x][y] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, speed);
  }, [speed]);

  return (
    <Fragment>
      <div>
        <Controls
          clickHandler={() => {
            setRunning(!running);
            if (!running) {
              runRef.current = true;
              runSimulation();
            }
          }}
          speeder={setSpeed}
          runner={running}
          opener={props.openHandler}
        />
        <Toggle />
      </div>
      <div className={gridClass.grid}>
        {grid.map((rows, x) =>
          rows.map((col, y) => (
            <div
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[x][y] = grid[x][y] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              key={`${x}-${y}`}
              className={gridClass.grid__blocks}
              style={{
                backgroundColor: grid[x][y] ? "#27CDB0" : undefined,
              }}
            />
          ))
        )}
      </div>
    </Fragment>
  );
}
