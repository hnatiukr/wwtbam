import clsx from "clsx";
import { match } from "ts-pattern";
import type { HTMLAttributes } from "react";
import { memo, useEffect, useRef, useState } from "react";

import baseStyles from "./styles/base.module.css";
import scoreLevelStyles from "./styles/score.module.css";
import optionButtonStyles from "./styles/option.module.css";

type CellProps = {
  children: string | number;
  "aria-label": "option" | "score";

  "data-hint"?: boolean;
  "data-valid"?: boolean;
  onDelayedClick?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "aria-label">;

const selection_delay = 2000;
const revelation_delay = 1000;

/**
 * A generic component used to represent a hexagonal shaped element for:
 * - option (an answer option button within the prompt screen)
 * - score (a current money prize displayed within the scoreboard panel)
 */
export default memo(function Cell({
  onClick,
  children,
  onDelayedClick,
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
  "aria-disabled": ariaDisabled,
  "data-hint": dataHint,
  "data-valid": dataValid,
  ...htmlAttrs
}: CellProps) {
  const [delayedDataValid, delayDataValidity] = useState<boolean>();

  const selectionTimer = useRef<NodeJS.Timeout>(null);
  const revelationTimer = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      if (selectionTimer.current && revelationTimer.current) {
        clearTimeout(selectionTimer.current);
        clearTimeout(revelationTimer.current);
      }
    };
  }, []);

  const handleDelayedClick = () => {
    if (onDelayedClick && dataValid !== undefined) {
      selectionTimer.current = setTimeout(() => {
        delayDataValidity(dataValid);

        revelationTimer.current = setTimeout(() => {
          onDelayedClick();
        }, revelation_delay);
      }, selection_delay);
    }
  };

  const dedicatedStyles = match(ariaLabel)
    .with("option", () => optionButtonStyles)
    .with("score", () => scoreLevelStyles)
    .exhaustive();

  return (
    <div
      aria-current={ariaCurrent}
      aria-disabled={ariaDisabled}
      data-valid={delayedDataValid}
      className={clsx(
        "cell_component_tokens",
        baseStyles.container,
        dedicatedStyles.container,
      )}
    >
      <div
        aria-disabled={ariaDisabled}
        className={clsx(baseStyles.cell, dedicatedStyles.cell)}
        onClick={(event) => {
          onClick?.(event);
          handleDelayedClick();
        }}
        {...htmlAttrs}
      >
        <span
          data-hint={dataHint}
          className={clsx(baseStyles.label, dedicatedStyles.label)}
        >
          {children}
        </span>
      </div>

      {match(ariaLabel)
        .with("option", () => (
          <div
            aria-label="overlay"
            aria-hidden={ariaDisabled || undefined}
            className={dedicatedStyles.overlay}
          />
        ))
        .with("score", () => null)
        .exhaustive()}
    </div>
  );
});
