import type { ComponentProps, ComponentType } from 'react';

type SerializeValue<T> = T extends (...args: any[]) => any
  ? `[Function: ${string}]`
  : T;

type SerializedProps<T> = {
  [K in keyof T]: SerializeValue<T[K]>;
};

export const getMockComponentProps = <T extends ComponentType<any>>(
  element: HTMLElement
): SerializedProps<ComponentProps<T>> => {
  const propsString = element.getAttribute('data-props');

  if (!propsString) {
    const testIdAttr = element.getAttribute('data-testid');
    throw new Error(
      `Props not found for element with testId: ${testIdAttr ?? 'unknown'}`
    );
  }

  return JSON.parse(propsString);
};
