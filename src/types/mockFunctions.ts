import type { ComponentProps, ComponentType } from 'react';

type IsFunction<T> = T extends (...args: any[]) => any
  ? true
  : T extends ((...args: any[]) => any) | undefined
    ? true
    : false;

type FunctionKeys<T> = {
  [K in keyof T]: IsFunction<T[K]> extends true ? K : never;
}[keyof T];

// Create object with only function properties
export type MockedComponentFunctions<T extends ComponentType<any>> = {
  [K in FunctionKeys<ComponentProps<T>>]?: ComponentProps<T>[K];
};
