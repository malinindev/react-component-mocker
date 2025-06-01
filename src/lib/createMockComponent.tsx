import type { ComponentType, ReactNode, JSX } from 'react';
import { useRef, useLayoutEffect } from 'react';
import type { MockedElement } from '../types/common.js';
import { separatePropsAndFunctions } from '../utils/separatePropsAndFunctions.js';

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
    const ref = useRef<HTMLDivElement>(null);
    const { propsMock, functionsMock } = separatePropsAndFunctions(restProps);

    useLayoutEffect(() => {
      if (ref.current && functionsMock) {
        (ref.current as unknown as MockedElement).functionsMock = functionsMock;
      }
    });

    return (
      <div
        ref={ref}
        data-testid={testId}
        {...(propsMock ? { 'data-props': JSON.stringify(propsMock) } : {})}
      >
        {children}
      </div>
    );
  };

  return MockComponent;
};
