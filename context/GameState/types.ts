import { Die } from "@/lib/Die";

export enum GameStatus {
  PLAYING,
  DEAD,
  WON,
}

export type GameState = {
  dice: Die[];
  selected: number[];
  round: number;
  maxHand: number;
  hand: number;
  maxRoll: number;
  roll: number;
  score: number;
  status: GameStatus;
};

export type GameStateProps = {
  state: GameState;
  dispatch: React.ActionDispatch<[action: GameStateAction]>;
};

export type GameStateAction = {
  type: "roll" | "hand" | "round" | "reset" | "setScore" | "select" | "playHand";
  payload?: any;
};

export type GameStateActionHandler = (state: GameState, payload: any) => GameState;
