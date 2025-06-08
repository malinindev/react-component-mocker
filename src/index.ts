export { createMockComponent } from './lib/createMockComponent.js';
export { getMockComponentProps } from './lib/getMockComponentProps.js';
export { getMockedFunctions } from './lib/getMockedFunctions.js';

export type { ComponentMockElement } from './types/common.js';

import './customMatchers/toHaveProps.js';
import 'vitest';

declare module 'vitest' {
  interface CustomMatchers<R = unknown> {
    toHaveProps: (expectedProps?: Record<string, any>) => R;
  }

  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
