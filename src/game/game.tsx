import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { flag, reveal, difficultySelected, selectGame } from "./gameSlice";
import { DifficultySelection } from "./DifficultySelection";
import { Tile } from "./Tile";
import { getBoardSize, reveal as gameReveal } from "../minesweeper";
export const Game: React.FC<any> = (props) => {
  const game = useSelector(selectGame);
  const dispatch = useDispatch();
  const { x, y } = getBoardSize(game.game) ?? { x: 0, y: 0 };
  let elements: Array<JSX.Element> = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      elements.push(
        <Tile
          xPos={i}
          yPos={j}
          key={`x${i}y${j}`}
          value={game?.board?.[i][j]}
          bombsAround={gameReveal(game.game, { x: i, y: j })}
          onClick={() => {
            dispatch(reveal({ x: i, y: j }));
          }}
          onRightClick={(e: any) => {
            e.preventDefault();
            dispatch(flag({ x: i, y: j }));
          }}
        />
      );
    }
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${game?.board?.length}, auto)`,
        gridTemplateRows: `repeat(${game?.board?.[0].length}, auto)`,
      }}
    >
      {!game.game && (
        <DifficultySelection
          onSelection={(difficulty) => {
            dispatch(difficultySelected(difficulty));
          }}
        />
      )}
      {game.game && elements}
    </div>
  );
};
