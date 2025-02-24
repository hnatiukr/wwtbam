import { Store } from "./types";

export const select = {
  /**
   * The player's current score (money won).
   */
  score: (store: Store) => store.score,

  /**
   * The number of available problems
   */
  count: (store: Store) => store.count,

  /**
   * Represents the possible states of the game:
   * - `idle`: game has not started
   * - `playing`: game is in progress
   * - `won`: player has won the game
   * - `lost`: player has lost the game
   */
  state: (store: Store) => store.state,

  /**
   * A number from 1 to 12 that represents the current quiz level.
   */
  turn: (store: Store) => store.history + 1,

  /**
   * The current problem to solve being presented to the player.
   * @see Problem
   */
  problem: (store: Store) => store.problem,

  /**
   * Starts a new game session.
   * Resets store to the initial values.
   */
  startAction: (store: Store) => store.start,

  /**
   * Processes the player's selected answer and advances the game state.
   * @param selectedOptionIndex - The index of the selected answer option.
   */
  makeMoveAction: (store: Store) => store.makeMove,
};
