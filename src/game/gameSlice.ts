import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store/store";
import Game, { DIFFICULTY } from "../minesweeper";

interface GameState {
  game: Game | null;
  board: Array<Array<number | undefined>> | null;
  gameOver: boolean;
}

const initialState: GameState = {
  game: null,
  board: null,
  gameOver: false,
};

export const FLAG = 7;

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reveal: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload;
      console.log(state.board);
      if (state.board) {
        state.board[x][y] = state.game?.reveal({ x, y });
      }
    },
    flag: (state, action: PayloadAction<{ x: number; y: number }>) => {
      if (state.board) {
        if (state.board[action.payload.x][action.payload.y] == FLAG)
          state.board[action.payload.x][action.payload.y] = undefined;
        else state.board[action.payload.x][action.payload.y] = FLAG;
      }
    },
    difficultySelected: (state, action: PayloadAction<DIFFICULTY>) => {
      switch (action.payload) {
        case DIFFICULTY.HARD:
          state.game = new Game(DIFFICULTY.HARD);
          break;
        case DIFFICULTY.MEDIUM:
          state.game = new Game(DIFFICULTY.MEDIUM);
          break;
        case DIFFICULTY.EASY:
          state.game = new Game(DIFFICULTY.EASY);
          break;
        default:
          state.game = new Game(DIFFICULTY.EASY);
      }

      let { x, y } = state.game.getBoardSize();
      state.board = makeBoard(x, y);
      console.log(state.board);
    },
  },
});

function makeBoard(x: number, y: number): Array<Array<number | undefined>> {
  let array = new Array(x);
  for (let i = 0; i < x; i++) {
    array[i] = new Array(y);
  }
  return array;
}

export const { flag, difficultySelected, reveal } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
