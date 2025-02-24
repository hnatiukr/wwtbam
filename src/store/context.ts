import { create } from "zustand";
import { match } from "ts-pattern";

import { problems } from "@/db/problems";
import { matchScore } from "@/lib/score-matcher";

import type { Store, State } from "./types";

export const useStore = create<Store>((set) => ({
  score: 0,
  history: 0,
  state: "idle",
  count: problems.size(),
  problem: problems.first(),

  start: () =>
    set(() => ({
      score: 0,
      history: 0,
      state: "playing",
      problem: problems.first(),
    })),

  makeMove: (selectedOptionIndex: number) =>
    set((store) => {
      const currProblem = store.problem;
      const nextProblem = problems.next();
      const currentLevel = store.history + 1;
      const hasGuessed = currProblem.keys.includes(selectedOptionIndex);

      return {
        history: currentLevel,
        problem: nextProblem || currProblem,

        score: match(hasGuessed)
          .with(true, () => matchScore(currentLevel))
          .with(false, () => store.score)
          .exhaustive(),

        state: match<boolean, State>(true)
          .with(hasGuessed && store.history === store.count - 1, () => "won")
          .with(hasGuessed && store.history < store.count - 1, () => "playing")
          .otherwise(() => "lost"),
      };
    }),
}));
