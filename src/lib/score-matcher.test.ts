import { describe, expect, it } from "vitest";

import { BASE_SCORE, matchScore } from "./score-matcher";

describe("score matcher", () => {
  it("should throw a type error if level lte 1", () => {
    expect(() => matchScore(0)).toThrow(TypeError);
    expect(() => matchScore(-5)).toThrow(TypeError);
  });

  it(`should return base score (${BASE_SCORE}) for level 1`, () => {
    expect(matchScore(1)).toBe(BASE_SCORE);
  });

  it("should double the score for each level", () => {
    expect(matchScore(2)).toBe(1000);
    expect(matchScore(3)).toBe(2000);
    expect(matchScore(4)).toBe(4000);
    expect(matchScore(5)).toBe(8000);
    expect(matchScore(6)).toBe(16000);
    expect(matchScore(7)).toBe(32000);
    expect(matchScore(8)).toBe(64000);
  });

  it("should continue doubling after level 9", () => {
    expect(matchScore(10)).toBe(250000);
    expect(matchScore(11)).toBe(500000);
    expect(matchScore(12)).toBe(1000000);
  });

  //

  it("should return the base score for level 1", () => {
    expect(matchScore(1)).toBe(500);
  });

  it("should correctly calculate scores for levels 2 to 8", () => {
    expect(matchScore(2)).toBe(1000);
    expect(matchScore(3)).toBe(2000);
    expect(matchScore(4)).toBe(4000);
    expect(matchScore(5)).toBe(8000);
    expect(matchScore(6)).toBe(16000);
    expect(matchScore(7)).toBe(32000);
    expect(matchScore(8)).toBe(64000);
  });

  it("should apply the score override at level 9", () => {
    expect(matchScore(9)).toBe(125000);
  });

  it("should continue the correct calculation beyond level 9", () => {
    expect(matchScore(10)).toBe(250000);
    expect(matchScore(11)).toBe(500000);
    expect(matchScore(12)).toBe(1000000);
  });

  it("should correctly calculate scores beyond predefined levels", () => {
    expect(matchScore(13)).toBe(2000000);
    expect(matchScore(14)).toBe(4000000);
  });
});
