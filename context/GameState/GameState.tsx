import { Perk } from "@/lib/types";
import { createContext, PropsWithChildren, useContext, useReducer } from "react";
import { flipAction, playHandAction, rollAction, selectAction } from "./actions";
import { initialState, ROUND_POINTS } from "./constants";
import { GameState, GameStateAction, GameStateProps, GameStatus } from "./types";

const GameStateContext = createContext<GameStateProps | null>(null);

const reducer = (state: GameState, action: GameStateAction) => {
  console.log("GameState: action received", action);
  let newState: GameState;

  switch (action.type) {
    case "reset":
      return initialState;
    case "round":
      newState = {
        ...state,
        roll: initialState.roll,
        score: initialState.score,
        hand: initialState.hand,
        round: state.round + 1,
        dice: [],
      };
      break;
    case "hand":
      newState = {
        ...state,
        roll: initialState.roll,
        selected: [],
        hand: state.hand < state.maxHand ? state.hand + 1 : state.hand,
      };
      break;
    case "roll":
      newState = rollAction(state, action.payload);
      break;
    case "setScore":
      newState = { ...state, score: parseInt(action.payload!) };
      break;
    case "select":
      newState = selectAction(state, action.payload);
      break;
    case "playHand": // TODO: first roll (pistolon, olimpico)
      newState = playHandAction(state, action.payload);
      break;
    case "flip": // TODO: Different animation for flip
      newState = flipAction(state, action.payload);
      break;
    case "addPerk":
      newState = { ...state, perks: [...state.perks, action.payload as Perk] };
      break;
  }

  // check status
  if (newState.score >= newState.round * ROUND_POINTS) {
    newState = { ...newState, status: GameStatus.WON };
  } else if (newState.hand === newState.maxHand) {
    newState = { ...newState, status: GameStatus.DEAD };
  } else {
    newState = { ...newState, status: GameStatus.PLAYING };
  }

  console.log("GameState: state updated", newState);
  return newState;
};

export const GameStateProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <GameStateContext.Provider value={{ state, dispatch }}>{children}</GameStateContext.Provider>;
};

export const useGameStateContext = () => {
  const context = useContext(GameStateContext);

  if (!context) {
    throw new Error("useStateContext has to be used within <StateContext.Provider>");
  }

  return context;
};
