import { GameStateActionHandler } from "../types";

export const selectAction: GameStateActionHandler = (state, payload) => {
  if (state.roll === 0) return { ...state };
  let newSelected = [];

  if (state.selected.includes(payload)) {
    newSelected = state.selected.filter((i) => i !== payload);
  } else {
    newSelected = [...state.selected, payload];
  }

  return { ...state, selected: newSelected };
};
