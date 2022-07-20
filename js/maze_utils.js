export const MAZE_LENGTH = 50;

export const borders = {
  top: "border-top",
  right: "border-right",
  bottom: "border-bottom",
  left: "border-left",
};

const adjacentTop = (index) => {
  return index >= MAZE_LENGTH ? index - MAZE_LENGTH : undefined;
};

const adjacentRight = (index) => {
  return index % MAZE_LENGTH !== MAZE_LENGTH - 1 ? index + 1 : undefined;
};

const adjacentBottom = (index) => {
  return index < Math.pow(MAZE_LENGTH, 2) - MAZE_LENGTH
    ? index + MAZE_LENGTH
    : undefined;
};

const adjacentLeft = (index) => {
  return index % MAZE_LENGTH !== 0 ? index - 1 : undefined;
};

export const createEmptyMaze = () => {
  const maze = [];
  const mazeSize = Math.pow(MAZE_LENGTH, 2);
  for (let i = 0; i < mazeSize; i++) {
    maze.push({
      top: {
        border: true,
        index: adjacentTop(i),
        opposite: "bottom",
      },
      right: {
        border: true,
        index: adjacentRight(i),
        opposite: "left",
      },
      bottom: {
        border: true,
        index: adjacentBottom(i),
        opposite: "top",
      },
      left: {
        border: true,
        index: adjacentLeft(i),
        opposite: "right",
      },
    });
  }
  return maze;
};
