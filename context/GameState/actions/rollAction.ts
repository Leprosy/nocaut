import { Die } from "@/lib/Die";
import { GameStateActionHandler } from "../types";

export const rollAction: GameStateActionHandler = (state, payload) => {
  if (state.roll >= state.maxRoll) return state;

  const newDice = Array(5); // TODO: only 5 die?

  for (let i = 0; i < 5; ++i) {
    if (state.selected.indexOf(i) < 0) {
      newDice[i] = new Die();
      newDice[i].roll = state.roll;
    } else {
      newDice[i] = state.dice[i];
    }
  }

  return { ...state, roll: state.roll + 1, dice: newDice };
};
