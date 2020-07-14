import React from "react";
import { FLAG } from "./gameSlice";
export const Tile: React.FC<{
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
