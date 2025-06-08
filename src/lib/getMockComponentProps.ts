import type { ComponentProps, ComponentType } from 'react';
import { checkIsMockElement } from '../utils/checkIsMockElement.js';

type SerializeValue<T> = T extends (...args: any[]) => any
  ? `[Function: ${string}]`
  : T;

type SerializedProps<T> = {
  [K in keyof T]: SerializeValue<T[K]>;
};

export const getMockComponentProps = <
  T extends ComponentType<any> = ComponentType<unknown>,
>(
  element: HTMLElement
): SerializedProps<ComponentProps<T>> => {
  if (!checkIsMockElement(element)) {
    const testIdAttr = element.getAttribute('data-testid');

    throw new Error(
      `Element with testId "${testIdAttr ?? 'unknown'}" is not a mock component. Please create a mock component first using createMockComponent("${testIdAttr ?? 'unknown'}").`
    );
  }

  const propsString = element.getAttribute('data-props');

  if (!propsString) {
    const testIdAttr = element.getAttribute('data-testid');
    throw new Error(
      `Props not found for element with testId: ${testIdAttr ?? 'unknown'}`
    );
  }

  return JSON.parse(propsString);
};
