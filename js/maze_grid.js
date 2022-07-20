import { borders, MAZE_LENGTH } from "./maze_utils";

const printMaze = (maze) => {
  const mazeContainer = document.createElement("div");
  mazeContainer.classList.add("maze");
  for (let i = 0; i < MAZE_LENGTH; i++) {
    const row = document.createElement("div");
    row.classList.add("maze-row");
    for (let j = 0; j < MAZE_LENGTH; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      const adj = Object.entries(maze[i * MAZE_LENGTH + j]);
      adj.forEach((entry) => {
        if (entry[1].border) {
          cell.classList.add(`${borders[entry[0]]}-black`);
        } else {
          cell.classList.add(`${borders[entry[0]]}-white`);
        }
      });
      row.appendChild(cell);
    }
    mazeContainer.appendChild(row);
  }
  return mazeContainer;
};

export const printMazeInDOM = (graph) => {
  let container = document.getElementById("maze-container");
  container.innerHTML = "";
  container.appendChild(printMaze(graph));
};
