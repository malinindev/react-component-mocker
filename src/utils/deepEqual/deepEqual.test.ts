import { describe, expect, it } from 'vitest';
import { deepEqual } from './deepEqual.js';

describe('deepEqual', () => {
  it('returns true for identical primitive values', () => {
    expect(deepEqual(5, 5)).toBe(true);
    expect(deepEqual('test', 'test')).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
    expect(deepEqual(false, false)).toBe(true);
  });

  it('returns false for different primitive values', () => {
    expect(deepEqual(5, 10)).toBe(false);
    expect(deepEqual('test', 'other')).toBe(false);
    expect(deepEqual(true, false)).toBe(false);
    expect(deepEqual(0, false)).toBe(false);
    expect(deepEqual('', false)).toBe(false);
  });

  it('handles null and undefined correctly', () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
    expect(deepEqual(null, 0)).toBe(false);
    expect(deepEqual(undefined, 0)).toBe(false);
    expect(deepEqual(null, '')).toBe(false);
  });

  it('returns true for identical simple objects', () => {
    const obj1 = { name: 'test', age: 25 };
    const obj2 = { name: 'test', age: 25 };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  it('returns false for objects with different values', () => {
    const obj1 = { name: 'test', age: 25 };
    const obj2 = { name: 'test', age: 30 };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  it('returns false for objects with different keys', () => {
    const obj1 = { name: 'test', age: 25 };
    const obj2 = { name: 'test', height: 180 };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  it('returns false for objects with different number of keys', () => {
    const obj1 = { name: 'test' };
    const obj2 = { name: 'test', age: 25 };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  it('handles nested objects correctly', () => {
    const obj1 = {
      user: {
        name: 'John',
        details: {
          age: 30,
          city: 'New York',
        },
      },
    };
    const obj2 = {
      user: {
        name: 'John',
        details: {
          age: 30,
          city: 'New York',
        },
      },
    };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  it('returns false for nested objects with different values', () => {
    const obj1 = {
      user: {
        name: 'John',
        details: {
          age: 30,
          city: 'New York',
        },
      },
    };
    const obj2 = {
      user: {
        name: 'John',
        details: {
          age: 25,
          city: 'New York',
        },
      },
    };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  it('handles arrays correctly', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(deepEqual(arr1, arr2)).toBe(true);

    const arr3 = [1, 2, 4];
    expect(deepEqual(arr1, arr3)).toBe(false);
  });

  it('handles arrays with different lengths', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2];
    expect(deepEqual(arr1, arr2)).toBe(false);
  });

  it('handles objects with array properties', () => {
    const obj1 = {
      name: 'test',
      items: [1, 2, 3],
      config: { enabled: true },
    };
    const obj2 = {
      name: 'test',
      items: [1, 2, 3],
      config: { enabled: true },
    };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  it('returns false for objects with different array properties', () => {
    const obj1 = {
      name: 'test',
      items: [1, 2, 3],
    };
    const obj2 = {
      name: 'test',
      items: [1, 2, 4],
    };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  it('handles empty objects and arrays', () => {
    expect(deepEqual({}, {})).toBe(true);
    expect(deepEqual([], [])).toBe(true);
    expect(deepEqual({}, [])).toBe(false);
  });

  it('handles complex nested structures', () => {
    const complex1 = {
      users: [
        {
          id: 1,
          profile: {
            name: 'John',
            preferences: {
              theme: 'dark',
              notifications: true,
            },
          },
        },
        {
          id: 2,
          profile: {
            name: 'Jane',
            preferences: {
              theme: 'light',
              notifications: false,
            },
          },
        },
      ],
      metadata: {
        version: '1.0.0',
        created: new Date('2023-01-01'),
      },
    };

    const complex2 = {
      users: [
        {
          id: 1,
          profile: {
            name: 'John',
            preferences: {
              theme: 'dark',
              notifications: true,
            },
          },
        },
        {
          id: 2,
          profile: {
            name: 'Jane',
            preferences: {
              theme: 'light',
              notifications: false,
            },
          },
        },
      ],
      metadata: {
        version: '1.0.0',
        created: new Date('2023-01-01'),
      },
    };

    expect(deepEqual(complex1, complex2)).toBe(true);
  });

  it('returns true for same reference', () => {
    const obj = { name: 'test' };
    expect(deepEqual(obj, obj)).toBe(true);
  });

  it('handles objects with null properties', () => {
    const obj1 = { name: 'test', value: null };
    const obj2 = { name: 'test', value: null };
    expect(deepEqual(obj1, obj2)).toBe(true);

    const obj3 = { name: 'test', value: undefined };
    expect(deepEqual(obj1, obj3)).toBe(false);
  });

  it('handles different types correctly', () => {
    expect(deepEqual('5', 5)).toBe(false);
    expect(deepEqual([], {})).toBe(false);
    expect(deepEqual(null, {})).toBe(false);
    expect(deepEqual(undefined, {})).toBe(false);
  });

  it('handles functions correctly', () => {
    const func1 = (): string => 'test';
    const func2 = (): string => 'test';
    const func3 = func1;

    expect(deepEqual(func1, func2)).toBe(false);
    expect(deepEqual(func1, func3)).toBe(true);
  });

  it('handles objects with function properties', () => {
    const func = (): void => {
      // Empty function for testing
    };
    const obj1 = { name: 'test', handler: func };
    const obj2 = { name: 'test', handler: func };
    expect(deepEqual(obj1, obj2)).toBe(true);

    const obj3 = {
      name: 'test',
      handler: (): void => {
        // Different empty function
      },
    };
    expect(deepEqual(obj1, obj3)).toBe(false);
  });

  it('handles asymmetric matchers like expect.any()', () => {
    const actualFunc = (): void => {
      // Empty function for testing asymmetric matchers
    };
    const actualString = 'test';
    const actualNumber = 42;

    const obj1 = {
      name: actualString,
      count: actualNumber,
      handler: actualFunc,
    };

    const obj2 = {
      name: expect.any(String),
      count: expect.any(Number),
      handler: expect.any(Function),
    };

    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  it('returns false when asymmetric matchers do not match', () => {
    const obj1 = {
      name: 'test',
      count: 'not a number',
    };

    const obj2 = {
      name: expect.any(String),
      count: expect.any(Number), // This should fail
    };

    expect(deepEqual(obj1, obj2)).toBe(false);
  });
});
