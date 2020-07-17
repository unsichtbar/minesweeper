import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {
  DIFFICULTY,
  startGame,
  Minesweeper,
  getBoardSize,
  fillMines,
} from "../minesweeper";

interface GameState {
  game: Minesweeper | null | undefined;
  board: Array<Array<CLICK_TYPE | undefined>> | null;
  gameOver: boolean;
  started: boolean;
}

const initialState: GameState = {
  game: null,
  board: null,
  gameOver: false,
  started: false,
};

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
      if (state.board && state.board[0] && state.board[0].length > 0) {
        if (state.board[x][y] !== CLICK_TYPE.RIGHT)
          state.board[x][y] = CLICK_TYPE.LEFT;
      }
    },
    flag(state, action: PayloadAction<{ x: number; y: number }>) {
      if (state.board) {
        if (state.board[action.payload.x][action.payload.y] === CLICK_TYPE.LEFT)
          return;
        if (
          state.board[action.payload.x][action.payload.y] === CLICK_TYPE.RIGHT
        )
          state.board[action.payload.x][action.payload.y] = undefined;
        else state.board[action.payload.x][action.payload.y] = CLICK_TYPE.RIGHT;
      }
    },
    difficultySelected(state, action: PayloadAction<DIFFICULTY>) {
      switch (action.payload) {
        case DIFFICULTY.HARD:
          state.game = startGame(DIFFICULTY.HARD);
          break;
        case DIFFICULTY.MEDIUM:
          state.game = startGame(DIFFICULTY.MEDIUM);
          break;
        case DIFFICULTY.EASY:
          state.game = startGame(DIFFICULTY.EASY);
          break;
        default:
          state.game = startGame(DIFFICULTY.EASY);
      }

      let { x, y } = getBoardSize(state.game);
      state.board = makeBoard(x, y);
    },
  },
});

function makeBoard(x: number, y: number): Array<Array<CLICK_TYPE>> {
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
