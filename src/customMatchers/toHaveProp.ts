import { getMockComponentProps } from '../lib/getMockComponentProps.js';
import type { ComponentMockElement } from '../types/common.js';
import { deepEqual } from '../utils/deepEqual/index.js';
import { DiffError } from './helpers/DiffError.js';

interface MatcherResult {
  pass: boolean;
  message: () => string;
}

expect.extend({
  toHaveProp(
    received: ComponentMockElement,
    keyOrKeyValue: string | Record<string, any>,
    value?: any
  ): MatcherResult {
    try {
      const actualProps = getMockComponentProps(received);

      // for syntax toHaveProp(key, value)
      if (value) {
        if (typeof keyOrKeyValue !== 'string') {
          throw new Error(
            'Key must be a string when using two-argument syntax'
          );
        }

        const key = keyOrKeyValue;
        const expectedValue = value;
        const hasKey = key in actualProps;

        if (!hasKey) {
          return {
            pass: false,
            message: (): string => {
              const availableKeys = Object.keys(actualProps);
              const availableKeysFormatted =
                availableKeys.length > 0 ? availableKeys.join(', ') : 'none';
              return `Expected element to have prop "${key}", but it doesn't. Available props: ${availableKeysFormatted}`;
            },
          };
        }

        const actualValue = actualProps[key];
        const isMatch = deepEqual(actualValue, expectedValue);

        if (isMatch) {
          return {
            pass: true,
            message: (): string => {
              const expectedFormatted = JSON.stringify(expectedValue);
              return `Expected element not to have prop "${key}" with value ${expectedFormatted}, but it does`;
            },
          };
        }

        return {
          pass: false,
          message: (): string => {
            throw new DiffError(
              `Expected element to have prop "${key}" with correct value`,
              actualValue,
              expectedValue
            );
          },
        };
      }

      // syntax toHaveProp(key) or toHaveProp({ key: value })
      if (typeof keyOrKeyValue === 'string') {
        const hasKey = keyOrKeyValue in actualProps;

        if (hasKey) {
          return {
            pass: true,
            message: (): string => {
              return `Expected element not to have prop "${keyOrKeyValue}", but it does`;
            },
          };
        }

        return {
          pass: false,
          message: (): string => {
            const availableKeys = Object.keys(actualProps);
            const availableKeysFormatted =
              availableKeys.length > 0 ? availableKeys.join(', ') : 'none';
            return `Expected element to have prop "${keyOrKeyValue}", but it doesn't. Available props: ${availableKeysFormatted}`;
          },
        };
      }

      const entries = Object.entries(keyOrKeyValue);

      if (entries.length !== 1) {
        throw new Error('Expected exactly one key-value pair');
      }

      const entry = entries[0];

      if (!entry) {
        throw new Error('No key-value pair found');
      }

      const [key, expectedValue] = entry;
      const hasKey = key in actualProps;

      if (!hasKey) {
        return {
          pass: false,
          message: (): string => {
            const availableKeys = Object.keys(actualProps);
            const availableKeysFormatted =
              availableKeys.length > 0 ? availableKeys.join(', ') : 'none';
            return `Expected element to have prop "${key}", but it doesn't. Available props: ${availableKeysFormatted}`;
          },
        };
      }

      const actualValue = actualProps[key];
      const isMatch = deepEqual(actualValue, expectedValue);

      if (isMatch) {
        return {
          pass: true,
          message: (): string => {
            const expectedFormatted = JSON.stringify(expectedValue);
            return `Expected element not to have prop "${key}" with value ${expectedFormatted}, but it does`;
          },
        };
      }

      return {
        pass: false,
        message: (): string => {
          throw new DiffError(
            `Expected element to have prop "${key}" with correct value`,
            actualValue,
            expectedValue
          );
        },
      };
    } catch (error) {
      return {
        pass: false,
        message: (): string => {
          const errorMsg =
            error instanceof Error ? error.message : 'unknown error occurred';
          return `Expected element to have mock prop, but ${errorMsg}`;
        },
      };
    }
  },
});
