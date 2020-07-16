export enum DIFFICULTY {
  EASY,
  MEDIUM,
  HARD,
}

interface ICoords {
  x: number;
  y: number;
}

let BOMB = -1;
type BOMB = -1;
type Tile = BOMB | number;

export interface Minesweeper {
  board: Array<Array<Tile>>;
  numMines: number;
}

export function startGame(
  difficulty: DIFFICULTY = DIFFICULTY.MEDIUM,
  startNode: ICoords = { x: 0, y: 0 }
) {
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
  fillMines(game.numMines, game.board, startNode);
  return game;
}

export function reveal(
  game: Minesweeper | null | undefined,
  { x, y }: ICoords
) {
  if (game === null || game === undefined) return undefined;
  if (isOutOfBounds(game, { x, y })) return undefined;
  return bombsAround(game, { x, y });
}
function isOutOfBounds(game: Minesweeper, { x, y }: ICoords) {
  return x >= game.board.length || x < 0 || y < 0 || y >= game.board.length;
}

function fillMines(
  numMines: number,
  board: Array<Array<Tile>>,
  startNode: ICoords
) {
  let boardLength = board.length;
  let placedMines = 0;
  while (placedMines < numMines) {
    let x = Math.floor(Math.random() * boardLength);
    let y = Math.floor(Math.random() * boardLength);
    if (board[x][y] != BOMB && x != startNode.x && y != startNode.y) {
      board[x][y] = BOMB;
      placedMines++;
    }
  }
}

export function getBoardSize(
  game: Minesweeper | null | undefined
): { x: number; y: number } {
  if (game === null || game === undefined) return { x: -1, y: -1 };
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
  if (game.board[x][y] == BOMB) return -1;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (
        game.board[x + i] &&
        game.board[x + i][y + j] != undefined &&
        game.board[x + i][y + j] == BOMB
      ) {
        surroundMines++;
      }
    }
  }
  return surroundMines;
}

// export default class MinesweeperOld {
//   private _board: Array<Array<Tile>>;
//   private numMines: number;
//   constructor(
//     difficulty: DIFFICULTY = DIFFICULTY.MEDIUM,
//     startNode: ICoords = { x: 0, y: 0 }
//   ) {
//     switch (difficulty) {
//       case DIFFICULTY.EASY: {
//         this._board = this.makeBoard(10);
//         this.numMines = 10;
//         break;
//       }
//       case DIFFICULTY.MEDIUM: {
//         this._board = this.makeBoard(18);
//         this.numMines = 40;
//         break;
//       }
//       case DIFFICULTY.HARD: {
//         this._board = this.makeBoard(25);
//         this.numMines = 99;
//         break;
//       }
//     }
//     this.fillMines(this.numMines, this._board, startNode);
//   }
//   reveal({ x, y }: ICoords) {
//     if (this.isOutOfBounds({ x, y })) return undefined;
//     return this.bombsAround({ x, y });
//   }
//   private isOutOfBounds({ x, y }: ICoords) {
//     return x >= this.board.length || x < 0 || y < 0 || y >= this.board.length;
//   }
//   private get board() {
//     return this._board;
//   }
//   private bombsAround({ x, y }: ICoords): number {
//     let surroundMines = 0;
//     if (this.board[x][y] == BOMB) return -1;
//     for (let i = -1; i < 2; i++) {
//       for (let j = -1; j < 2; j++) {
//         if (
//           this.board[x + i] &&
//           this.board[x + i][y + j] != undefined &&
//           this.board[x + i][y + j] == BOMB
//         ) {
//           surroundMines++;
//         }
//       }
//     }
//     return surroundMines;
//   }

//   private fillMines(
//     numMines: number,
//     board: Array<Array<Tile>>,
//     startNode: ICoords
//   ) {
//     let boardLength = board.length;
//     let placedMines = 0;
//     while (placedMines < numMines) {
//       let x = Math.floor(Math.random() * boardLength);
//       let y = Math.floor(Math.random() * boardLength);
//       if (board[x][y] != BOMB && x != startNode.x && y != startNode.y) {
//         board[x][y] = BOMB;
//         placedMines++;
//       }
//     }
//   }
//   private makeBoard(n: number): Array<Array<Tile>> {
//     let array = new Array(n);
//     for (let i = 0; i < n; i++) {
//       array[i] = new Array(n);
//     }
//     return array;
//   }

//   public getBoardSize(): { x: number; y: number } {
//     return { x: this.board.length, y: this.board[0].length };
//   }
// }
