import { diff as jestDiff } from 'jest-diff';

const isVitest: boolean =
  typeof process !== 'undefined' && 'VITEST' in process.env;

/**
 * Error class with actual and expected fields for Jest/Vitest diff display.
 * Jest requires manual diff generation, Vitest does it automatically.
 */
export class DiffError extends Error {
  actual?: unknown;
  expected?: unknown;

  constructor(message: string, actual?: unknown, expected?: unknown) {
    super(
      isVitest || actual === undefined || expected === undefined
        ? message
        : `${message}\n\n${jestDiff(expected, actual)}`
    );
    this.name = 'DiffError';
    this.actual = actual;
    this.expected = expected;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DiffError);
    }
  }
}
