/**
 * Error class with actual and expected fields for Jest/Vitest diff display.
 * When an error has these fields, both Jest and Vitest automatically generate
 * a nice diff showing the differences between expected and actual values with highlighting.
 */
export class DiffError extends Error {
  public actual?: unknown;
  public expected?: unknown;

  constructor(message: string, actual?: unknown, expected?: unknown) {
    super(message);
    this.name = 'DiffError';
    this.actual = actual;
    this.expected = expected;

    // Maintain proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DiffError);
    }
  }
}
