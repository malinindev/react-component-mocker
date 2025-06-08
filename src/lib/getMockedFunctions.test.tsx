import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createMockComponent } from './createMockComponent.js';
import { getMockedFunctions } from './getMockedFunctions.js';

interface TestProps {
  stringProp?: string;
  numberProp?: number;
  booleanProp?: boolean;
  functionProp?: () => void;
  anotherFunction?: (arg: string) => void;
}

type TestComponent = ComponentType<TestProps>;

describe('getMockedFunctions', () => {
  it('returns mocked function when component has functions', () => {
    const MockComponent = createMockComponent<TestComponent>('test-mock');
    const functionProp = vi.fn();

    render(
      <MockComponent
        functionProp={functionProp}
        stringProp="test"
        numberProp={42}
      />
    );

    const mockedFunctions = getMockedFunctions<TestComponent>('test-mock');

    expect(mockedFunctions).toBeDefined();
    expect(mockedFunctions.functionProp).toBe(functionProp);
  });

  it('returns all mocked functions for component with multiple functions', () => {
    const MockComponent = createMockComponent<TestComponent>(
      'multi-function-mock'
    );
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

    const functions = getMockedFunctions<TestComponent>('multi-function-mock');

    expect(functions).toBeDefined();
    expect(functions.functionProp).toBe(functionProp);
    expect(functions.anotherFunction).toBe(anotherFunction);
  });

  it('throws error when component has no functions', () => {
    const MockComponent =
      createMockComponent<ComponentType<{ text: string }>>('text-component');

    render(<MockComponent text="Click me" />);

    expect(() => getMockedFunctions('text-component')).toThrow(
      'Element with testId "text-component" has no mock functions property inside. Something went wrong'
    );
  });

  it('throws error for non-existent testId', () => {
    expect(() => getMockedFunctions('non-existent-test-id')).toThrow(
      'Element with testId "non-existent-test-id" not found'
    );
  });

  it('throws error when element is not a mock component', () => {
    render(<div data-testid="regular-div" />);

    expect(() => getMockedFunctions('regular-div')).toThrow(
      'Element with testId "regular-div" is not a mock component. Please create a mock component first using createMockComponent("regular-div").'
    );
  });

  it('returns different functions for different testIds', () => {
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

    const functions1 = getMockedFunctions<TestComponent>('test-1');
    const functions2 = getMockedFunctions<TestComponent>('test-2');

    expect(functions1).toBeDefined();
    expect(functions2).toBeDefined();

    expect(functions1.functionProp).toBe(functionProp1);
    expect(functions2.functionProp).toBe(functionProp2);
    expect(functions1.functionProp).not.toBe(functions2.functionProp);
  });
});
