import type { ComponentType, ReactNode, JSX } from 'react';
import { useRef, useLayoutEffect, createElement } from 'react';
import type { ComponentMockElement } from '../types/common.js';
import { separatePropsAndFunctions } from '../utils/separatePropsAndFunctions.js';
import { MOCK_COMPONENT } from '../const.js';

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
  }) => {
    const ref = useRef<ComponentMockElement>(null);
    const { propsMock, functionsMock } = separatePropsAndFunctions(restProps);

    useLayoutEffect(() => {
      if (!ref.current) {
        return;
      }

      const mockedElement = ref.current;
      mockedElement.functionsMock = functionsMock;
    });

    return createElement(
      MOCK_COMPONENT.tag,
      {
        ref,
        'data-testid': testId,
        ...(propsMock ? { 'data-props': JSON.stringify(propsMock) } : {}),
      },
      children
    );
  };

  return MockComponent;
};
