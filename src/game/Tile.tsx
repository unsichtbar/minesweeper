import React from "react";
import { CLICK_TYPE } from "./gameSlice";
import "./Tile.css";
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
    <span className="square-box">
      <span
        key={`x${xPos}y${yPos}`}
        onClick={onClick}
        onContextMenu={onRightClick}
        className="square-content"
        style={{
          backgroundColor: CLICK_TYPE.LEFT === value ? "#D4C192" : "",
        }}
      >
        <div>
          <span
            style={{
              color: CLICK_TYPE.LEFT === value ? "black" : "",
              fontSize: "2em",
            }}
          >
            {text}
          </span>
        </div>
      </span>
    </span>
  );
};
