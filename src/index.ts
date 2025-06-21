export { createMockComponent } from './lib/createMockComponent.js';
export { getMockComponentProps } from './lib/getMockComponentProps.js';

export type { ComponentMockElement } from './types/common.js';

import './customMatchers/toHaveProps.js';
import './customMatchers/toHaveProp.js';
import type { ComponentProps, ComponentType } from 'react';

type ToHavePropsMatcherType<R> = <TComponent extends ComponentType<any>>(
  expectedProps?: ComponentProps<TComponent>
) => R;

type ToHavePropMatcherType<R> = <TComponent extends ComponentType<any>>(
  keyOrKeyValue:
    | keyof ComponentProps<TComponent>
    | Partial<ComponentProps<TComponent>>
) => R;

declare module 'expect' {
  interface Matchers<R> {
    toHaveProps: ToHavePropsMatcherType<R>;
    toHaveProp: ToHavePropMatcherType<R>;
  }
}

declare global {
  // biome-ignore lint/style/noNamespace: Jest type augmentation requires namespace
  namespace jest {
    interface Matchers<R> {
      toHaveProps: ToHavePropsMatcherType<R>;
      toHaveProp: ToHavePropMatcherType<R>;
    }
  }
}
