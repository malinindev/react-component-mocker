import { getMockComponentProps } from '../lib/getMockComponentProps.js';
import type { ComponentMockElement } from '../types/common.js';
import { deepEqual } from '../utils/deepEqual/index.js';
import { DiffError } from './helpers/DiffError.js';

interface MatcherResult {
  pass: boolean;
  message: () => string;
}

expect.extend({
  toHaveProps: (
    received: ComponentMockElement,
    expectedProps?: Record<string, unknown>
  ): MatcherResult => {
    try {
      const actualProps = getMockComponentProps(received);

      if (!expectedProps) {
        return {
          pass: true,
          message: (): string => {
            const formatted = JSON.stringify(actualProps, null, 2);
            return `Expected element not to have mock props, but it has: ${formatted}`;
          },
        };
      }

      const isMatch = deepEqual(actualProps, expectedProps);

      if (isMatch) {
        return {
          pass: true,
          message: (): string => {
            const formatted = JSON.stringify(expectedProps, null, 2);
            return `Expected element not to have props ${formatted}, but it does`;
          },
        };
      }

      return {
        pass: false,
        message: (): string => {
          throw new DiffError(
            'Expected props to match',
            actualProps,
            expectedProps
          );
        },
      };
    } catch (error) {
      return {
        pass: false,
        message: (): string => {
          const errorMsg =
            error instanceof Error ? error.message : 'unknown error occurred';
          return `Expected element to have mock props, but ${errorMsg}`;
        },
      };
    }
  },
});
