import { z as zod } from "zod";

/**
 * problem property schemas
 */

export const questionSchema = zod
  .string()
  .trim()
  .min(5, "question schema: min 5 chars length")
  .endsWith("?", "question schema: must ends with '?'");

export const optionSchema = zod
  .string()
  .trim()
  .min(1, "option schema: min 1 char length");

export const optionsSchema = zod
  .array(optionSchema)
  .min(2, "options schema: min 2 options");

export const keySchema = zod
  .number()
  .int("key schema: number must be an integer")
  .min(0, "key schema: must be a positive integer");

export const keysSchema = zod
  .array(keySchema)
  .min(1, "keys schema: at least 1 key is required");

/**
 * problem shape schema
 */

export const problemSchema = zod
  .object({
    question: questionSchema,
    options: optionsSchema,
    keys: keysSchema,
  })
  .refine(
    (problem) => problem.keys.length <= problem.options.length,
    "problem schema: cannot be more keys than options",
  )
  .refine(
    (problem) =>
      problem.keys.every((index) => index <= problem.options.length - 1),
    "problem schema: key index cannot be greater than the available option indices",
  )
  .readonly();

/**
 * problems shape schema
 */

export const problemsSchema = zod
  .array(problemSchema)
  .min(1, "problems schema: at least 1 problem is required")
  .readonly();
