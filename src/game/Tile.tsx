import React from "react";
import { FLAG, CLICK_TYPE } from "./gameSlice";
export const Tile: React.FC<{
  xPos: number;
  yPos: number;
  onClick: any;
  onRightClick: any;
  value: CLICK_TYPE | undefined;
  bombsAround: number | undefined;
}> = ({ xPos, yPos, onClick, onRightClick, value, bombsAround }) => {
  let text = "";
  if (value === CLICK_TYPE.LEFT) text = String(bombsAround);
  if (value === CLICK_TYPE.RIGHT) text = "🚩";
  return (
    <span
      key={`x${xPos}y${yPos}`}
      onClick={onClick}
      onContextMenu={onRightClick}
      style={{ border: "1px solid black", width: "25px", height: "25px" }}
    >
      {text}
    </span>
  );
};
