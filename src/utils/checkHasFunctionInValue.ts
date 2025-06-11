export const checkHasFunctionInValue = (
  obj: Record<string, unknown>
): boolean => {
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'function') {
      return true;
    }

    if (!value || typeof value !== 'object') {
      continue;
    }

    if (checkHasFunctionInValue(value as Record<string, unknown>)) {
      return true;
    }
  }

  return false;
};
