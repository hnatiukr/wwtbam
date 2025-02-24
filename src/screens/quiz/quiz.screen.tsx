import Drawer from "./drawer";
import PromptArea from "./prompt";
import ScoreboardPanel from "./scoreboard";
import styles from "./styles.module.css";

/**
 * This screen is used for the playing stage.
 * Includes quiz area with a question, answer options, and a scoreboard panel.
 *  - `floating` placed within the drawer, aka 'burger menu'
 *  - `inline` placed next to the prompt screen
 */
export default function QuizScreen() {
  return (
    <main className={styles.main}>
      <PromptArea />

      <aside className={styles.inline_scoreboard}>
        <ScoreboardPanel />
      </aside>

      <Drawer className={styles.floating_scoreboard}>
        <ScoreboardPanel />
      </Drawer>
    </main>
  );
}
