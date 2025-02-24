import Image from "next/image";
import type { ReactNode } from "react";
import { memo, useState } from "react";

import openIcon from "./icons/open.svg";
import closeIcon from "./icons/close.svg";

import styles from "./styles.module.css";

/**
 * A generic drawer component used for emulation the "burger menu".
 * By design, takes a scoreboard as a child prop.
 */
export default memo(function Drawer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [open, toggle] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`${className} ${styles.toggle}`}
        onClick={() => toggle((hasOpened) => !hasOpened)}
      >
        <Image src={open ? closeIcon : openIcon} alt="Drawer open/close icon" />
      </button>

      <aside
        aria-hidden={!open}
        className={`${className} ${styles.drawer}`}
        aria-label="Side drawer with the quiz score ladder"
      >
        <section
          aria-label="Quiz score ladder section"
          className={styles.placeholder}
        >
          {children}
        </section>
      </aside>
    </>
  );
});
