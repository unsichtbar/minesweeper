import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {
  DIFFICULTY,
  createGame,
  Minesweeper,
  getBoardSize,
  fillMines,
  ICoords,
  BOMB,
} from "../minesweeper";

type Board = Array<Array<CLICK_TYPE | undefined>>;
interface GameState {
  game: Minesweeper;
  board: Board;
  gameOver: boolean;
  started: boolean;
  difficultySelected: boolean;
}

const initialState: GameState = (function () {
  let game = createGame();
  let board = makeBoard(getBoardSize(game));
  return {
    game,
    board,
    gameOver: false,
    started: false,
    difficultySelected: false,
  };
})();

export const FLAG = 7;
export enum CLICK_TYPE {
  LEFT,
  RIGHT,
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reveal(state, action: PayloadAction<{ x: number; y: number }>) {
      const { x, y } = action.payload;
      if (!state.started) {
        state.game = fillMines(state.game, { x, y });
        state.started = true;
      }
      if (state.game.board[x][y] === BOMB) {
        state.gameOver = true;
        return;
      }
      if (state.board[x][y] !== CLICK_TYPE.RIGHT)
        state.board[x][y] = CLICK_TYPE.LEFT;
    },
    flag(state, action: PayloadAction<{ x: number; y: number }>) {
      if (state.board[action.payload.x][action.payload.y] === CLICK_TYPE.LEFT)
        return;
      if (state.board[action.payload.x][action.payload.y] === CLICK_TYPE.RIGHT)
        state.board[action.payload.x][action.payload.y] = undefined;
      else state.board[action.payload.x][action.payload.y] = CLICK_TYPE.RIGHT;
    },
    difficultySelected(state, action: PayloadAction<DIFFICULTY>) {
      switch (action.payload) {
        case DIFFICULTY.HARD:
          state.game = createGame(DIFFICULTY.HARD);
          break;
        case DIFFICULTY.MEDIUM:
          state.game = createGame(DIFFICULTY.MEDIUM);
          break;
        case DIFFICULTY.EASY:
          state.game = createGame(DIFFICULTY.EASY);
          break;
        default:
          state.game = createGame(DIFFICULTY.EASY);
      }
      state.difficultySelected = true;
      let { x, y } = getBoardSize(state.game);
      state.board = makeBoard({ x, y });
    },
  },
});

function makeBoard({ x, y }: { x: number; y: number }): Board {
  let array = new Array(x);
  for (let i = 0; i < x; i++) {
    array[i] = new Array(y);
    for (let j = 0; j < y; j++) {
      array[i][j] = null;
    }
  }
  return array;
}

export const { flag, difficultySelected, reveal } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
