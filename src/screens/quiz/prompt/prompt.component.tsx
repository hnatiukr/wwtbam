import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { select } from "@/store/selectors";
import { useStore } from "@/store/context";

import OptionCell from "../cell";
import styles from "./styles.module.css";

/**
 * The main gaming area where you can see a question and clickable answer options.
 */
export default function PromptArea() {
  const problem = useStore(select.problem);
  const makeMove = useStore(select.makeMoveAction);

  const searchParams = useSearchParams();
  const [disabled, disable] = useState(false);

  const hints = searchParams.get("hints");

  return (
    <section className={styles.layout}>
      <h2 aria-level={2} className={styles.question}>
        {problem.question}
      </h2>

      <div className={styles.options}>
        {problem.options.map((option, optionIndex) => {
          const isCorrectOption = problem.keys.includes(optionIndex);

          return (
            <OptionCell
              key={option}
              tabIndex={0}
              role="button"
              aria-label="option"
              aria-disabled={disabled || undefined}
              data-valid={isCorrectOption}
              data-hint={hints ? Boolean(hints && isCorrectOption) : undefined}
              onClick={() => disable(true)}
              onDelayedClick={() => {
                makeMove(optionIndex);
                disable(false);
              }}
            >
              {option}
            </OptionCell>
          );
        })}
      </div>
    </section>
  );
}
