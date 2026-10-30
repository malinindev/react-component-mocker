export { createMockComponent } from './lib/createMockComponent.js';
export { getMockComponentProps } from './lib/getMockComponentProps.js';

export type { ComponentMockElement } from './types/common.js';

import './customMatchers/toHaveProps.js';
import './customMatchers/toHaveProp.js';
import type {
  ToHavePropMatcherType,
  ToHavePropsMatcherType,
} from './types/matchers.js';

declare module 'expect' {
  interface Matchers<R> {
    toHaveProps: ToHavePropsMatcherType<R>;
    toHaveProp: ToHavePropMatcherType<R>;
  }
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveProps: ToHavePropsMatcherType<R>;
      toHaveProp: ToHavePropMatcherType<R>;
    }
  }
}
