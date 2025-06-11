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

    expect(props.stringProp).toBe('test');
    expect(props.numberProp).toBe(42);
    expect(props.booleanProp).toBe(true);
    expect(props.functionProp).toBe(functionProp);
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

    expect(props.stringProp).toBe('test');
    expect(props.numberProp).toBe(456);
    expect(props.functionProp).toBe(functionProp);
    expect(props.anotherFunction).toBe(anotherFunction);
  });

  it('allows calling functions from props', () => {
    const MockComponent = createMockComponent<TestComponent>('test-functions');
    const functionProp = vi.fn();
    const anotherFunction = vi.fn();

    render(
      <MockComponent
        functionProp={functionProp}
        anotherFunction={anotherFunction}
        stringProp="test"
        numberProp={123}
      />
    );

    const element = screen.getByTestId('test-functions');
    const props = getMockComponentProps<TestComponent>(element);

    props.functionProp?.();
    props.anotherFunction?.('test-arg');

    expect(functionProp).toHaveBeenCalledTimes(1);
    expect(anotherFunction).toHaveBeenCalledWith('test-arg');
  });

  it('works with components containing only functions', () => {
    const MockComponent = createMockComponent<TestComponent>('only-functions');
    const functionProp = vi.fn();
    const anotherFunction = vi.fn();

    render(
      <MockComponent
        functionProp={functionProp}
        anotherFunction={anotherFunction}
      />
    );

    const element = screen.getByTestId('only-functions');
    const props = getMockComponentProps<TestComponent>(element);

    expect(props.functionProp).toBe(functionProp);
    expect(props.anotherFunction).toBe(anotherFunction);

    props.functionProp?.();
    props.anotherFunction?.('test');

    expect(functionProp).toHaveBeenCalled();
    expect(anotherFunction).toHaveBeenCalledWith('test');
  });

  it('handles different function instances for different components', () => {
    const MockComponent1 = createMockComponent<TestComponent>('test-1');
    const MockComponent2 = createMockComponent<TestComponent>('test-2');

    const functionProp1 = vi.fn();
    const functionProp2 = vi.fn();

    render(
      <>
        <MockComponent1 functionProp={functionProp1} stringProp="first" />
        <MockComponent2 functionProp={functionProp2} stringProp="second" />
      </>
    );

    const element1 = screen.getByTestId('test-1');
    const element2 = screen.getByTestId('test-2');

    const props1 = getMockComponentProps<TestComponent>(element1);
    const props2 = getMockComponentProps<TestComponent>(element2);

    expect(props1.functionProp).toBe(functionProp1);
    expect(props2.functionProp).toBe(functionProp2);
    expect(props1.functionProp).not.toBe(props2.functionProp);

    props1.functionProp?.();
    props2.functionProp?.();

    expect(functionProp1).toHaveBeenCalledTimes(1);
    expect(functionProp2).toHaveBeenCalledTimes(1);
  });

  it('updates props correctly on rerender', () => {
    const MockComponent = createMockComponent<TestComponent>('rerender-test');
    const initialFunction = vi.fn();
    const updatedFunction = vi.fn();

    const { rerender } = render(
      <MockComponent
        stringProp="initial"
        numberProp={1}
        functionProp={initialFunction}
      />
    );

    const element = screen.getByTestId('rerender-test');

    let props = getMockComponentProps<TestComponent>(element);

    expect(props.stringProp).toBe('initial');
    expect(props.numberProp).toBe(1);
    expect(props.functionProp).toBe(initialFunction);

    rerender(
      <MockComponent
        stringProp="updated"
        numberProp={2}
        functionProp={updatedFunction}
      />
    );

    props = getMockComponentProps<TestComponent>(element);
    expect(props.stringProp).toBe('updated');
    expect(props.numberProp).toBe(2);
    expect(props.functionProp).toBe(updatedFunction);

    props.functionProp?.();
    expect(updatedFunction).toHaveBeenCalledTimes(1);
    expect(initialFunction).not.toHaveBeenCalled();
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

  it('throws error when mock component has no props', () => {
    const MockComponent =
      createMockComponent<ComponentType<{ text?: string }>>('no-props');

    render(<MockComponent />);

    const element = screen.getByTestId('no-props');

    expect(() => {
      getMockComponentProps<TestComponent>(element);
    }).toThrow('Props not found for element with testId: no-props');
  });

  it('throws error for components with only non-function props when accessing functions', () => {
    const MockComponent =
      createMockComponent<ComponentType<{ text: string }>>('text-component');

    render(<MockComponent text="Click me" />);

    const element = screen.getByTestId('text-component');
    const props = getMockComponentProps(element);

    expect(typeof (props as any).functionProp).toBe('undefined');
  });
});
