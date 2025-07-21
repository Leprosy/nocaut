import { GameStateActionHandler } from "../types";

export const selectAction: GameStateActionHandler = (state, payload) => {
  let newSelected = [];

  if (state.selected.indexOf(payload)) {
    newSelected = state.selected.filter((i) => i !== payload);
  } else {
    newSelected = [...state.selected, payload];
  }
  return { ...state, selected: newSelected };
};
