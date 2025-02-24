import { match, P } from "ts-pattern";

import { select } from "@/store/selectors";
import { useStore } from "@/store/context";
import { matchScore } from "@/lib/score-matcher";

import ScoreCell from "../cell";
import styles from "./styles.module.css";

/**
 * The scoreboard panel. Is displayed within the drawer or next to the prompt screen.
 */
export default function ScoreboardPanel() {
  const currentTurn = useStore(select.turn);
  const turnsAvailable = useStore(select.count);

  const levelsSequence = makeQuizLevels(turnsAvailable);

  return (
    <div className={styles.layout}>
      {levelsSequence.map((level) => {
        const score = matchScore(level);

        return (
          <ScoreCell
            key={`scoreboard-item-${score}`}
            aria-label="score"
            aria-current={match(level)
              .with(P.number.lt(currentTurn), () => false)
              .with(P.number.gt(currentTurn), () => undefined)
              .otherwise(() => true)}
          >
            {formatScoreToMoney(score)}
          </ScoreCell>
        );
      })}
    </div>
  );
}

function makeQuizLevels(maxLevel: number): number[] {
  return [...Array(maxLevel).keys()].map((n) => n + 1).reverse();
}

function formatScoreToMoney(score: number) {
  return `$${score.toLocaleString("en-US")}`;
}
