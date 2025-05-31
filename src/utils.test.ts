import { sum } from './utils.js';
import { test as it, expect } from 'vitest';

it('sum', () => {
  expect(sum(1, 2)).toBe(3);
});
