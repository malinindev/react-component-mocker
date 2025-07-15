import { isValidElement } from 'react';

/**
 * Recursively processes individual values within props
 */
const processValue = (value: unknown, visited = new WeakSet()): unknown => {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'function') {
    return `[Function: ${value.name || 'anonymous'}]`;
  }

  if (isValidElement(value)) {
    return '[React Element]';
  }

  if (Array.isArray(value)) {
    if (visited.has(value)) {
      return '[Circular Array]';
    }
    visited.add(value);
    return value.map((item) => processValue(item, visited));
  }

  if (typeof value === 'object') {
    if (visited.has(value)) {
      return '[Circular Object]';
    }

    visited.add(value);

    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = processValue(val, visited);
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
  const visited = new WeakSet();

  for (const [key, value] of Object.entries(props)) {
    result[key] = processValue(value, visited);
  }

  return result;
};
