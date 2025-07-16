import type { ComponentType, JSX, ReactNode } from 'react';
import { createElement, useRef } from 'react';
import { MOCK_COMPONENT } from '../const.js';
import type { ComponentMockElement } from '../types/common.js';
import { preparePropsToStringify } from '../utils/preparePropsToStringify.js';

type MockComponentType<P = Record<string, unknown>> = (props: P) => JSX.Element;

type InferredProps<T> = T extends ComponentType<infer P>
  ? P & { children?: ReactNode }
  : { children?: ReactNode; [key: string]: any };

export const createMockComponent = <T extends ComponentType<any>>(
  testId: string
): MockComponentType<InferredProps<T>> => {
  const MockComponent: MockComponentType<InferredProps<T>> = ({
    children,
    ...restProps
  }: InferredProps<T>) => {
    const ref = useRef<ComponentMockElement>(null);
    const propsToAssign =
      Object.keys(restProps).length > 0 ? restProps : undefined;

    // Update props on every render (except first, when ref.current is still null)
    if (ref.current) {
      ref.current.props = propsToAssign;
    }

    return createElement(
      MOCK_COMPONENT.tag,
      {
        ref: (element: ComponentMockElement | null): void => {
          ref.current = element;
          // Set props on first element creation
          // (at this moment component body already executed, but ref.current was null)
          if (element) {
            element.props = propsToAssign;
          }
        },
        'data-testid': testId,
        'data-props-for-debug': propsToAssign
          ? JSON.stringify(preparePropsToStringify(propsToAssign))
          : undefined,
      },
      children
    );
  };

  return MockComponent;
};
