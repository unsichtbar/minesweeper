import React from "react";
import Game, { DIFFICULTY } from "./minesweeper";

function makeBoard(x: number, y: number): Array<Array<number | undefined>> {
  let array = new Array(x);
  for (let i = 0; i < x; i++) {
    array[i] = new Array(y);
  }
  return array;
}
const FLAG = 7;
const initialState = (function () {
  let game = new Game(DIFFICULTY.HARD);
  let { x, y } = game.getBoardSize();
  let board: Array<Array<number | undefined>> = makeBoard(x, y);
  return {
    game,
    board,
    started: false,
    gameOver: false,
  };
})();

const gameReducer: React.Reducer<typeof initialState, any> = (
  state,
  action
) => {
  if (action.type == "REVEAL") {
    if (state.started === false) {
      const { x, y } = action.payload;
      state.board[x][y] = state.game.reveal({ x, y });
      state.started = true;
      if (state.board[x][y] == -1) {
        state.gameOver = true;
      }
    } else {
      const { x, y } = action.payload;
      state.board[x][y] = state.game.reveal({ x, y });
      if (state.board[x][y] == -1) {
        state.gameOver = true;
      }
      return { ...state };
    }
    return { ...state };
  }
  if (action.type === "FLAG") {
    state.board[action.payload.x][action.payload.y] = FLAG;
    return { ...state };
  }
  return state;
};

function App() {
  const [state, dispatch] = React.useReducer(gameReducer, initialState);
  const elements: Array<JSX.Element> = [];
  for (let i = 0; i < state.board.length; i++) {
    for (let j = 0; j < state.board[0].length; j++) {
      elements.push(
        <Tile
          xPos={i}
          yPos={j}
          value={state.board[i][j]}
          onClick={() => {
            console.log("click");
            dispatch({ type: "REVEAL", payload: { x: i, y: j } });
          }}
          onRightClick={(e: any) => {
            e.preventDefault();
            dispatch({ type: "FLAG", payload: { x: i, y: j } });
          }}
        />
      );
    }
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${state.board.length}, auto)`,
        gridTemplateRows: `repeat(${state.board[0].length}, auto)`,
      }}
    >
      {state.gameOver && <div>Boom!</div>}
      {!state.gameOver && elements}
    </div>
  );
}

const Tile: React.FC<{
  xPos: number;
  yPos: number;
  onClick: any;
  onRightClick: any;
  value: number | undefined;
}> = ({ xPos, yPos, onClick, onRightClick, value }) => {
  let text = value ? String(value) : "";
  if (value == FLAG) text = "🚩";
  return (
    <span
      key={`${xPos}${yPos}`}
      onClick={onClick}
      onContextMenu={onRightClick}
      style={{ border: "1px solid black", width: "25px", height: "25px" }}
    >
      {text}
    </span>
  );
};

export default App;
