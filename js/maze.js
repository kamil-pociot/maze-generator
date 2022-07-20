import "regenerator-runtime/runtime";
import { createEmptyMaze, MAZE_LENGTH } from "./maze_utils";
import { printMazeInDOM } from "./maze_grid";

const maze = createEmptyMaze();
let skipPrinting = false;

async function dfs(graph, index) {
  let s = [];
  let explored = new Array(Math.pow(MAZE_LENGTH, 2));
  explored.fill(false);
  s.push(index);

  explored[index] = true;

  while (explored.indexOf(false) !== -1) {
    if (!skipPrinting) {
      printMazeInDOM(graph);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    let currentIndex = s.pop();

    const adjacents = Object.entries(graph[currentIndex]).filter(
      (cell) => cell[1].index && !explored[cell[1].index]
    );
    if (adjacents.length > 0) {
      const nextAdjacent =
        adjacents[Math.floor(Math.random() * adjacents.length)];
      explored[nextAdjacent[1].index] = true;
      graph[nextAdjacent[1].index][nextAdjacent[1].opposite].border = false;
      graph[currentIndex][nextAdjacent[0]].border = false;
      s.push(nextAdjacent[1].index);
    } else {
      const nextUnvisitedIndex = explored.indexOf(false);
      const nextAdjacent = Object.entries(graph[nextUnvisitedIndex]).find(
        (entry) => entry[1].index && explored[entry[1].index]
      );
      if (nextAdjacent) {
        explored[nextUnvisitedIndex] = true;
        graph[nextAdjacent[1].index][nextAdjacent[1].opposite].border = false;
        graph[nextUnvisitedIndex][nextAdjacent[0]].border = false;
      }
      s.push(nextUnvisitedIndex);
    }
  }
  printMazeInDOM(graph);
}

document.getElementById("skip-button").addEventListener("click", (e) => {
  skipPrinting = true;
  e.target.remove();
});

dfs(maze, 0)
  .then(() => console.log("success"))
  .catch((error) => console.error("Error happened.", error));
