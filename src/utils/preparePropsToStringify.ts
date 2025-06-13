/**
 * Recursively processes individual values within props
 */
const processValue = (value: unknown): unknown => {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'function') {
    return `[Function: ${value.name || 'anonymous'}]`;
  }

  if (Array.isArray(value)) {
    return value.map(processValue);
  }

  if (typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = processValue(val);
    }
    return result;
  }

  return value;
};

/**
 * Recursively processes props object and replaces functions with string representations
 * for debugging purposes only
 */
export const preparePropsToStringify = (
  props: Record<string, unknown>
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    result[key] = processValue(value);
  }

  return result;
};
