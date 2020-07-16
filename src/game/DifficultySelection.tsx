import React from "react";
import { DIFFICULTY } from "../minesweeper";

interface DifficultySelectionProps {
  onSelection(difficulty: DIFFICULTY): void;
}
export const DifficultySelection: React.FC<DifficultySelectionProps> = (
  props
) => {
  const difficulties = [
    [DIFFICULTY.EASY, "Easy"],
    [DIFFICULTY.MEDIUM, "Medium"],
    [DIFFICULTY.HARD, "Hard"],
  ];
  return (
    <section>
      {difficulties.map((pair) => (
        <button
          key={pair[1]}
          onClick={() => props.onSelection(pair[0] as DIFFICULTY)}
        >
          {pair[1]}
        </button>
      ))}
    </section>
  );
};
