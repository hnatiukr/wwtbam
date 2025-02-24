import Image from "next/image";
import { match } from "ts-pattern";

import { State } from "@/store/types";
import { select } from "@/store/selectors";
import { useStore } from "@/store/context";

import styles from "./styles.module.css";

function StartGameMessage() {
  return (
    <h1 aria-level={1} className={styles.heading}>
      Who wants to be a millionaire?
    </h1>
  );
}

function GameOverMessage({ score }: { score: number }) {
  const formattedScore = score.toLocaleString("en-US");

  return (
    <div className={styles.heading_container}>
      <span className={styles.preheading}>Total score:</span>

      <span className={styles.heading}>${formattedScore} earned</span>
    </div>
  );
}

/**
 * This screen is used for the start game and game over stages
 */
export default function LobbyScreen({
  state,
}: {
  state: Exclude<State, "playing">;
}) {
  const score = useStore(select.score);
  const startGame = useStore(select.startAction);

  const buttonLabel = match(state)
    .with("idle", () => "Start")
    .otherwise(() => "Try again");

  return (
    <main className={styles.main} data-state={state} aria-live="polite">
      <Image
        priority
        src="/logo.svg"
        alt="Game logo"
        role="banner"
        width={288}
        height={192}
        quality={100}
        className={styles.logo}
      />

      <div>
        {match(state)
          .with("idle", () => <StartGameMessage />)
          .otherwise(() => (
            <GameOverMessage score={score} />
          ))}

        <button
          type="button"
          onClick={startGame}
          aria-label={buttonLabel}
          className={styles.button}
        >
          {buttonLabel}
        </button>
      </div>
    </main>
  );
}
