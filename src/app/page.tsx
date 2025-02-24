"use client";

import { match } from "ts-pattern";

import QuizScreen from "@/screens/quiz";
import LobbyScreen from "@/screens/lobby";
import { select } from "@/store/selectors";
import { useStore } from "@/store/context";

export default function IndexPage() {
  const state = useStore(select.state);

  return match(state)
    .with("playing", () => <QuizScreen />)
    .otherwise((state) => <LobbyScreen state={state} />);
}
