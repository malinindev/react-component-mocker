import { render, screen } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import { createMockComponent } from './createMockComponent.js';

interface TestProps {
  stringProp?: string;
  numberProp?: number;
  booleanProp?: boolean;
  functionProp?: () => void;
  anotherFunction?: (arg: string) => void;
}

type TestComponent = ComponentType<TestProps>;

describe('createMockComponent', () => {
  it('creates mock component with correct props serialization', () => {
    const MockComponent = createMockComponent<TestComponent>('test-mock');

    render(
      <MockComponent
        stringProp="test"
        numberProp={42}
        booleanProp
        functionProp={(): void => undefined}
      >
        <div>Test child</div>
      </MockComponent>
    );

    const element = screen.getByTestId('test-mock');
    const propsString = element.getAttribute('data-props');

    if (!propsString) {
      throw new Error(
        'Props is not passed to data-props attribute of the mock component'
      );
    }

    const expectedProps = {
      stringProp: 'test',
      numberProp: 42,
      booleanProp: true,
      functionProp: '[Function: functionProp]',
    };

    expect(JSON.parse(propsString)).toEqual(expectedProps);
    expect(element).toHaveTextContent('Test child');
  });

  it('handles multiple functions in props', () => {
    const MockComponent = createMockComponent<TestComponent>(
      'multi-function-mock'
    );

    render(
      <MockComponent
        functionProp={(): void => undefined}
        anotherFunction={(): void => undefined}
        stringProp="test"
        numberProp={123}
      />
    );

    const element = screen.getByTestId('multi-function-mock');
    const propsString = element.getAttribute('data-props');

    if (!propsString) {
      throw new Error(
        'Props is not passed to data-props attribute of the mock component'
      );
    }

    const expectedProps = {
      stringProp: 'test',
      numberProp: 123,
      functionProp: '[Function: functionProp]',
      anotherFunction: '[Function: anotherFunction]',
    };

    expect(JSON.parse(propsString)).toEqual(expectedProps);
  });

  it('handles components without functions', () => {
    const MockComponent =
      createMockComponent<TestComponent>('no-functions-mock');

    render(
      <MockComponent
        stringProp="Hello World"
        numberProp={456}
        booleanProp={false}
      />
    );

    const element = screen.getByTestId('no-functions-mock');
    const propsString = element.getAttribute('data-props');

    if (!propsString) {
      throw new Error(
        'Props is not passed to data-props attribute of the mock component'
      );
    }

    const expectedProps = {
      stringProp: 'Hello World',
      numberProp: 456,
      booleanProp: false,
    };

    expect(JSON.parse(propsString)).toEqual(expectedProps);
  });

  it('handles empty props', () => {
    const MockComponent =
      createMockComponent<TestComponent>('empty-props-mock');

    render(<MockComponent />);

    const element = screen.getByTestId('empty-props-mock');
    const propsString = element.getAttribute('data-props');

    expect(propsString).toBeNull();
  });
});
