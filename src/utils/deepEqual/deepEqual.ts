import { checkAsymmetricMatchers } from './helpers/checkAsymmetricMatchers.js';
import { isArray } from './helpers/isArray.js';
import { isObject } from './helpers/isObject.js';

const compareObjects = (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
): boolean => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

const compareArrays = (arr1: unknown[], arr2: unknown[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!deepEqual(arr1[i], arr2[i])) {
      return false;
    }
  }

  return true;
};

export const deepEqual = (obj1: unknown, obj2: unknown): boolean => {
  if (obj1 === obj2) {
    return true;
  }

  if (obj1 == null || obj2 == null) {
    return false;
  }

  if (checkAsymmetricMatchers(obj1, obj2)) {
    return true;
  }

  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  if (isArray(obj1) && isArray(obj2)) {
    return compareArrays(obj1, obj2);
  }

  if (isObject(obj1) && isObject(obj2)) {
    return compareObjects(obj1, obj2);
  }

  return obj1 === obj2;
};
