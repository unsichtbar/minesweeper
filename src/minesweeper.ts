export enum DIFFICULTY {
  EASY,
  MEDIUM,
  HARD,
}

export interface ICoords {
  x: number;
  y: number;
}

export let BOMB = -1;
export type BOMB = -1;
type Tile = BOMB | number;

export interface Minesweeper {
  board: Array<Array<Tile>>;
  numMines: number;
}

export function createGame(difficulty: DIFFICULTY = DIFFICULTY.MEDIUM) {
  let game: Minesweeper = {} as any;
  switch (difficulty) {
    case DIFFICULTY.EASY: {
      game.board = makeBoard(10);
      game.numMines = 10;
      break;
    }
    case DIFFICULTY.MEDIUM: {
      game.board = makeBoard(18);
      game.numMines = 40;
      break;
    }
    case DIFFICULTY.HARD: {
      game.board = makeBoard(25);
      game.numMines = 99;
      break;
    }
  }
  return game;
}

export function reveal(game: Minesweeper, { x, y }: ICoords) {
  if (isOutOfBounds(game, { x, y })) return undefined;
  return bombsAround(game, { x, y });
}
function isOutOfBounds(game: Minesweeper, { x, y }: ICoords) {
  return x >= game.board.length || x < 0 || y < 0 || y >= game.board.length;
}

export function fillMines(game: Minesweeper, startNode: ICoords) {
  let boardLength = game.board.length;
  let placedMines = 0;
  while (placedMines < game.numMines) {
    let x = Math.floor(Math.random() * boardLength);
    let y = Math.floor(Math.random() * boardLength);
    if (game.board[x][y] !== BOMB && x !== startNode.x && y !== startNode.y) {
      game.board[x][y] = BOMB;
      placedMines++;
    }
  }
  return game;
}

export function getBoardSize(game: Minesweeper): { x: number; y: number } {
  return { x: game.board.length, y: game.board[0].length };
}

function makeBoard(n: number): Array<Array<Tile>> {
  let array = new Array(n);
  for (let i = 0; i < n; i++) {
    array[i] = new Array(n);
  }
  return array;
}

function bombsAround(game: Minesweeper, { x, y }: ICoords): number {
  let surroundMines = 0;
  if (game.board[x][y] === BOMB) return -1;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (
        game.board[x + i] &&
        game.board[x + i][y + j] !== undefined &&
        game.board[x + i][y + j] === BOMB
      ) {
        surroundMines++;
      }
    }
  }
  return surroundMines;
}
