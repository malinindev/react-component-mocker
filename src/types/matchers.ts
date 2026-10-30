import type { ComponentProps, ComponentType } from 'react';

export type ToHavePropsMatcherType<R> = <TComponent extends ComponentType<any>>(
  expectedProps?: Omit<ComponentProps<TComponent>, 'children'>
) => R;

export type ToHavePropMatcherType<R> = {
  <TComponent extends ComponentType<any>>(
    keyOrKeyValue:
      | keyof ComponentProps<TComponent>
      | Partial<ComponentProps<TComponent>>
  ): R;
  <TComponent extends ComponentType<any>>(
    key: keyof ComponentProps<TComponent>,
    value: ComponentProps<TComponent>[keyof ComponentProps<TComponent>]
  ): R;
};
