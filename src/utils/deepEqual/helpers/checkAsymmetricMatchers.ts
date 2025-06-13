const isAsymmetricMatcher = (
  value: unknown
): value is {
  $$typeof: symbol;
  asymmetricMatch?: (actual: unknown) => boolean;
} =>
  !!value &&
  typeof value === 'object' &&
  value !== null &&
  (value as any).$$typeof === Symbol.for('jest.asymmetricMatcher');

const testAsymmetricMatcher = (actual: unknown, expected: unknown): boolean => {
  if (!isAsymmetricMatcher(expected)) {
    return false;
  }

  if (
    expected.asymmetricMatch &&
    typeof expected.asymmetricMatch === 'function'
  ) {
    return expected.asymmetricMatch(actual);
  }

  return false;
};

export const checkAsymmetricMatchers = (
  obj1: unknown,
  obj2: unknown
): boolean => {
  if (isAsymmetricMatcher(obj2) && testAsymmetricMatcher(obj1, obj2)) {
    return true;
  }

  if (isAsymmetricMatcher(obj1) && testAsymmetricMatcher(obj2, obj1)) {
    return true;
  }

  return false;
};
