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
  namedFunction?: () => string;
  anonymousFunction?: () => string;
}

type TestComponent = ComponentType<TestProps>;

describe('createMockComponent', () => {
  it('creates mock component with correct props', () => {
    const MockComponent = createMockComponent<TestComponent>('test-mock');
    const functionProp = vi.fn();

    render(
      <MockComponent
        stringProp="test"
        numberProp={42}
        booleanProp
        functionProp={functionProp}
      >
        <div>Test child</div>
      </MockComponent>
    );

    const element = screen.getByTestId('test-mock');
    const props = getMockComponentProps<TestComponent>(element);

    expect(props.stringProp).toBe('test');
    expect(props.numberProp).toBe(42);
    expect(props.booleanProp).toBe(true);
    expect(props.functionProp).toBe(functionProp);
    expect(element).toHaveTextContent('Test child');
  });

  it('handles multiple functions in props', () => {
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

    const element = screen.getByTestId('multi-function-mock');
    const props = getMockComponentProps<TestComponent>(element);

    expect(props.stringProp).toBe('test');
    expect(props.numberProp).toBe(123);
    expect(props.functionProp).toBe(functionProp);
    expect(props.anotherFunction).toBe(anotherFunction);
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
    const props = getMockComponentProps<TestComponent>(element);

    expect(props.stringProp).toBe('Hello World');
    expect(props.numberProp).toBe(456);
    expect(props.booleanProp).toBe(false);
  });

  it('handles empty props', () => {
    const MockComponent =
      createMockComponent<TestComponent>('empty-props-mock');

    render(<MockComponent />);

    const element = screen.getByTestId('empty-props-mock');

    expect(() => {
      getMockComponentProps<TestComponent>(element);
    }).toThrow('Props not found for element with testId: empty-props-mock');
  });

  it('displays debug output with functions properly formatted', () => {
    const MockComponent = createMockComponent<TestComponent>('debug-test');
    const namedFunction = function handleClick(): string {
      return 'clicked';
    };
    const anonymousFunction = (): string => {
      return 'anonymous';
    };

    render(
      <MockComponent
        stringProp="debug test"
        numberProp={99}
        namedFunction={namedFunction}
        anonymousFunction={anonymousFunction}
      />
    );

    const element = screen.getByTestId('debug-test');
    const debugData = element.getAttribute('data-props-for-debug');

    expect(debugData).toContain('[Function: handleClick]');
    expect(debugData).toContain('[Function: anonymousFunction]');
    expect(debugData).toContain('"stringProp":"debug test"');
    expect(debugData).toContain('"numberProp":99');
  });

  it('displays debug output for complex nested objects', () => {
    const MockComponent =
      createMockComponent<
        ComponentType<{ config: { theme: string; handler: () => void } }>
      >('nested-test');

    const config = {
      theme: 'dark',
      handler: function themeHandler(): void {
        return;
      },
    };

    render(<MockComponent config={config} />);

    const element = screen.getByTestId('nested-test');
    const debugData = element.getAttribute('data-props-for-debug');

    expect(debugData).toContain('"theme":"dark"');
    expect(debugData).toContain('[Function: themeHandler]');
  });

  it('handles tabContent with React elements without stack overflow', () => {
    const ModalTabsMock = createMockComponent('modal-tabs-mock');

    const TestComponent: React.FC = () => (
      <ModalTabsMock
        shouldShowTabs
        tabContent={{
          remove: <div>test1</div>,
          set: <div>test2</div>,
        }}
      />
    );

    render(<TestComponent />);

    const element = screen.getByTestId('modal-tabs-mock');
    expect(element).toBeInTheDocument();

    const props = getMockComponentProps(element);

    expect(props.shouldShowTabs).toBe(true);
    expect(props.tabContent).toBeDefined();
  });
});
