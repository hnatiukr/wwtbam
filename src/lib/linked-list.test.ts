import { describe, it, expect, beforeEach } from "vitest";

import type { Problem } from "@/db/types";
import { parsedProblems } from "@/db/problems";

import { LinkedList } from "./linked-list";

describe("lib/linked-list", () => {
  let problemsList: LinkedList<Problem>;

  beforeEach(() => {
    problemsList = new LinkedList(parsedProblems, true);
  });

  it("should initialize with the first element as head", () => {
    expect(problemsList.first()).toBe(parsedProblems[0]);
  });

  it("should iterate correctly through first() next()", () => {
    parsedProblems.forEach((problem, index) => {
      if (index === 0) {
        expect(problemsList.first()).toBe(problem);
      } else {
        expect(problemsList.next()).toBe(problem);
      }
    });

    expect(problemsList.next()).toBeNull();
  });

  it("should throw an error when trying to create multiple instances", () => {
    expect(() => new LinkedList([1, 2, 3])).toThrow(Error);
  });
});
