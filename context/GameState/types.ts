import { Die } from "@/lib/Die";
import { Perk } from "@/lib/types";

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
  perks: Perk[];
};

export type GameStateProps = {
  state: GameState;
  dispatch: React.ActionDispatch<[action: GameStateAction]>;
};

export type GameStateAction = {
  type: "roll" | "hand" | "round" | "reset" | "setScore" | "select" | "playHand" | "flip" | "addPerk";
  payload?: any;
};

export type GameStateActionHandler = (state: GameState, payload: any) => GameState;
