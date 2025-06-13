import { describe, expect, it } from 'vitest';
import { checkHasFunctionInValue } from './checkHasFunctionInValue.js';

describe('checkHasFunctionInValue', () => {
  it('returns false for empty object', () => {
    const obj = {};
    const result = checkHasFunctionInValue(obj);
    expect(result).toBe(false);
  });

  it('returns false for object with only primitive values', () => {
    const obj = {
      string: 'test',
      number: 42,
      boolean: true,
      nullValue: null,
      undefinedValue: undefined,
    };
    const result = checkHasFunctionInValue(obj);
    expect(result).toBe(false);
  });

  it('returns true when object contains a function', () => {
    const obj = {
      name: 'test',
      handler: (): string => 'function',
    };
    const result = checkHasFunctionInValue(obj);
    expect(result).toBe(true);
  });

  it('returns true when object contains a named function', () => {
    function namedFunction(): string {
      return 'named';
    }

    const obj = {
      callback: namedFunction,
      value: 'test',
    };
    const result = checkHasFunctionInValue(obj);
    expect(result).toBe(true);
  });

  it('returns true when nested object contains a function', () => {
    const obj = {
      config: {
        theme: 'dark',
        handler: (): string => 'nested function',
      },
      name: 'test',
    };
    const result = checkHasFunctionInValue(obj);
    expect(result).toBe(true);
  });

  it('returns true when deeply nested object contains a function', () => {
    const obj = {
      level1: {
        level2: {
          level3: {
            deepFunction: function deep(): string {
              return 'deep';
            },
            value: 'test',
          },
        },
      },
    };
    const result = checkHasFunctionInValue(obj);
    expect(result).toBe(true);
  });

  it('returns false when nested objects contain no functions', () => {
    const obj = {
      config: {
        theme: 'dark',
        options: {
          nested: 'value',
          count: 10,
        },
      },
      metadata: {
        version: '1.0.0',
        enabled: true,
      },
    };
    const result = checkHasFunctionInValue(obj);
    expect(result).toBe(false);
  });

  it('handles arrays as values correctly', () => {
    const obj = {
      items: ['string', 42, true],
      config: {
        values: [1, 2, 3],
      },
    };
    const result = checkHasFunctionInValue(obj);
    expect(result).toBe(false);
  });

  it('skips null and undefined nested values', () => {
    const obj = {
      nullValue: null,
      undefinedValue: undefined,
      nested: {
        alsoNull: null,
        value: 'test',
      },
    };
    const result = checkHasFunctionInValue(obj);
    expect(result).toBe(false);
  });

  it('handles mixed primitive and object values without functions', () => {
    const obj = {
      string: 'test',
      object: {
        nested: 'value',
        number: 42,
      },
      array: [1, 2, 3],
      boolean: false,
    };
    const result = checkHasFunctionInValue(obj);
    expect(result).toBe(false);
  });

  it('returns true for object with function at root level among other values', () => {
    const obj = {
      name: 'component',
      version: '1.0.0',
      onClick: (): void => console.log('clicked'),
      config: {
        theme: 'light',
        enabled: true,
      },
    };
    const result = checkHasFunctionInValue(obj);
    expect(result).toBe(true);
  });
});
