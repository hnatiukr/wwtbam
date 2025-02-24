import { LinkedList } from "@/lib/linked-list";

import { problemsSchema } from "./schemas";
import unvalidatedProblems from "./problems.json";

export const parsedProblems = problemsSchema.parse(unvalidatedProblems);
export const problems = new LinkedList(parsedProblems);
