import './index.js';
import type {
  ToHavePropMatcherType,
  ToHavePropsMatcherType,
} from './types/matchers.js';

// Vitest 5 no longer reads Jest's global `jest.Matchers`, which the main entry
// extends. Its `Matchers` takes other type parameters than in Vitest 3 and 4, so
// this entry is opt-in: `import 'react-component-mocker/vitest'`
declare module 'vitest' {
  interface Matchers<
    R extends void | Promise<void> = void | Promise<void>,
    // biome-ignore lint/correctness/noUnusedVariables: every declaration of Matchers must have Vitest's type parameters
    T = unknown,
  > {
    toHaveProps: ToHavePropsMatcherType<R>;
    toHaveProp: ToHavePropMatcherType<R>;
  }
}
