export { createMockComponent } from './lib/createMockComponent.js';
export { getMockComponentProps } from './lib/getMockComponentProps.js';

export type { ComponentMockElement } from './types/common.js';

import './customMatchers/toHaveProps.js';
import './customMatchers/toHaveProp.js';
import 'vitest';
import type { ComponentProps, ComponentType } from 'react';

declare module 'vitest' {
  interface CustomMatchers<R = unknown> {
    toHaveProps: <T extends ComponentType<any>>(
      expectedProps?: ComponentProps<T>
    ) => R;
    toHaveProp: <T extends ComponentType<any>>(
      keyOrKeyValue: keyof ComponentProps<T> | Partial<ComponentProps<T>>
    ) => R;
  }

  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
