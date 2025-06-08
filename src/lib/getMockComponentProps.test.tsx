import { render, screen } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createMockComponent } from './createMockComponent.js';
import { getMockComponentProps } from './getMockComponentProps.js';

interface TestProps {
  stringProp?: string;
  numberProp?: number;
  booleanProp?: boolean;
  functionProp?: () => void;
  anotherFunction?: (arg: string) => void;
}

type TestComponent = ComponentType<TestProps>;

describe('getMockComponentProps', () => {
  it('returns correct props with proper typing', () => {
    const MockComponent = createMockComponent<TestComponent>('test-mock');
    const functionProp = vi.fn();

    render(
      <MockComponent
        stringProp="test"
        numberProp={42}
        booleanProp={true}
        functionProp={functionProp}
      />
    );

    const element = screen.getByTestId('test-mock');
    const props = getMockComponentProps<TestComponent>(element);

    const expectedProps = {
      stringProp: 'test',
      numberProp: 42,
      booleanProp: true,
      functionProp: '[Function: functionProp]',
    };

    expect(props).toEqual(expectedProps);
  });

  it('works with multiple functions in props', () => {
    const MockComponent = createMockComponent<TestComponent>(
      'multi-function-mock'
    );
    const functionProp = vi.fn();
    const anotherFunction = vi.fn();

    render(
      <MockComponent
        stringProp="test"
        numberProp={456}
        functionProp={functionProp}
        anotherFunction={anotherFunction}
      />
    );

    const element = screen.getByTestId('multi-function-mock');
    const props = getMockComponentProps<TestComponent>(element);

    const expectedProps = {
      stringProp: 'test',
      numberProp: 456,
      functionProp: '[Function: functionProp]',
      anotherFunction: '[Function: anotherFunction]',
    };

    expect(props).toEqual(expectedProps);
  });

  it('throws error when element is not a mock component', () => {
    render(<div data-testid="no-props" />);

    const element = screen.getByTestId('no-props');

    expect(() => {
      getMockComponentProps<TestComponent>(element);
    }).toThrow(
      'Element with testId "no-props" is not a mock component. Please create a mock component first using createMockComponent("no-props").'
    );
  });

  it('throws error when mock component has no data-props attribute', () => {
    const MockComponent =
      createMockComponent<ComponentType<{ text?: string }>>('no-data-props');

    render(<MockComponent />);

    const element = screen.getByTestId('no-data-props');

    expect(() => {
      getMockComponentProps<TestComponent>(element);
    }).toThrow('Props not found for element with testId: no-data-props');
  });
});
