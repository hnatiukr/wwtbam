import { z as zod } from "zod";

import {
  keySchema,
  keysSchema,
  optionSchema,
  optionsSchema,
  problemSchema,
  problemsSchema,
  questionSchema,
} from "./schemas";

export type Key = zod.infer<typeof keySchema>;
export type Keys = zod.infer<typeof keysSchema>;
export type Option = zod.infer<typeof optionSchema>;
export type Options = zod.infer<typeof optionsSchema>;
export type Problem = zod.infer<typeof problemSchema>;
export type Problems = zod.infer<typeof problemsSchema>;
export type Question = zod.infer<typeof questionSchema>;
