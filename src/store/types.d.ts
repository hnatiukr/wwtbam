import type { Problem } from "@/db/types";

/**
 * Represents the possible states of the game:
 * - `idle`: game has not started
 * - `playing`: game is in progress
 * - `won`: player has won the game
 * - `lost`: player has lost the game
 */
export type State = "idle" | "playing" | "won" | "lost";

export type Store = {
  /**
   * Tracks the number of turns passed and serves as a pointer
   * to the current problem in the problems array.
   * Starts at `0` and increments after each turn.
   */
  history: number;

  /**
   * Implies a number of available questions.
   */
  count: number;

  /**
   * Represents the possible states of the game:
   * - `idle`: game has not started
   * - `playing`: game is in progress
   * - `won`: player has won the game
   * - `lost`: player has lost the game
   */
  state: State;

  /**
   * The current score of the player.
   */
  score: number;

  /**
   * The current problem being presented to the player.
   * @see Problem
   */
  problem: Problem;

  /**
   * Starts a new game session.
   * Resets store to the initial values.
   */
  start: () => void;

  /**
   * Processes the player's selected answer and advances the game state.
   * @param selectedOptionIndex - The index of the selected answer option.
   */
  makeMove: (selectedOptionIndex: number) => void;
};
