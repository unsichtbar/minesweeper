import React from "react";
import { DIFFICULTY } from "./minesweeper";

interface DifficultySelectionProps {
  onSelection(difficulty: DIFFICULTY): void;
}
export const DifficultySelection: React.FC<DifficultySelectionProps> = (
  props
) => {
  return (
    <section>
      <button
        onClick={() => {
          props.onSelection(DIFFICULTY.EASY);
        }}
      >
        Easy
      </button>
      <button
        onClick={() => {
          props.onSelection(DIFFICULTY.MEDIUM);
        }}
      >
        Medium
      </button>
      <button
        onClick={() => {
          props.onSelection(DIFFICULTY.HARD);
        }}
      >
        Hard
      </button>
    </section>
  );
};
