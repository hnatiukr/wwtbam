export const BASE_SCORE = 500;

const overrides: Record<number, number> = {
  128000: 125000,
};

const cache: Record<number, number> = {};

/**
 * Matches score by level/turn and returns the amount of money won.
 * The level (or turn) - is the current stage of the playing game.
 * Thus, practically, you can define any number of questions/turns/levels and
 * the prize will flexibly depend on the number of questions even below or beyond $1 000 000.
 * See tests for more details.
 */
export const matchScore = (level: number) => {
  if (level < 1) {
    throw new TypeError(`score macther: matching level must be gte 1`);
  }

  if (level === 1) {
    return BASE_SCORE;
  }

  if (cache[level]) {
    return cache[level];
  }

  let score = BASE_SCORE;

  for (let i = 2; i <= level; i += 1) {
    const nextScore = score * 2;

    score = overrides[nextScore] ?? nextScore;
  }

  cache[level] = score;

  return score;
};
