import { render, screen } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createMockComponent } from '../lib/createMockComponent.js';

interface TestProps {
  title: string;
  count: number;
  onClick: () => void;
  isActive?: boolean;
}

type TestComponent = ComponentType<TestProps>;

describe('Custom Matcher: toHaveProp', () => {
  it('should pass when element has prop by key (string)', () => {
    const MockComponent = createMockComponent<TestComponent>('test-component');
    const mockClick = vi.fn();

    render(
      <MockComponent title="Hello World" count={42} onClick={mockClick} />
    );

    const element = screen.getByTestId('test-component');

    expect(element).toHaveProp('title');
    expect(element).toHaveProp('count');
    expect(element).toHaveProp('onClick');
  });

  it('should fail when element does not have prop by key', () => {
    const MockComponent =
      createMockComponent<TestComponent>('test-component-2');
    const mockClick = vi.fn();

    render(
      <MockComponent title="Hello World" count={42} onClick={mockClick} />
    );

    const element = screen.getByTestId('test-component-2');

    expect(() => {
      expect(element).toHaveProp('nonExistentProp');
    }).toThrow(
      /Expected element to have prop "nonExistentProp", but it doesn't. Available props:/
    );
  });

  it('should pass when element has prop with expected value', () => {
    const MockComponent =
      createMockComponent<TestComponent>('test-component-3');
    const mockClick = vi.fn();

    render(
      <MockComponent title="Hello World" count={42} onClick={mockClick} />
    );

    const element = screen.getByTestId('test-component-3');

    expect(element).toHaveProp({ title: 'Hello World' });
    expect(element).toHaveProp({ count: 42 });
    expect(element).toHaveProp({ onClick: mockClick });
  });

  it('should fail when prop value does not match expected', () => {
    const MockComponent =
      createMockComponent<TestComponent>('test-component-4');
    const mockClick = vi.fn();

    render(
      <MockComponent title="Actual Title" count={100} onClick={mockClick} />
    );

    const element = screen.getByTestId('test-component-4');

    expect(() => {
      expect(element).toHaveProp({ title: 'Expected Title' });
    }).toThrow('Expected element to have prop "title" with correct value');
  });

  it('should fail when prop key does not exist for key-value check', () => {
    const MockComponent =
      createMockComponent<TestComponent>('test-component-5');
    const mockClick = vi.fn();

    render(<MockComponent title="Test" count={1} onClick={mockClick} />);

    const element = screen.getByTestId('test-component-5');

    expect(() => {
      expect(element).toHaveProp({ nonExistentProp: 'value' });
    }).toThrow(
      /Expected element to have prop "nonExistentProp", but it doesn't. Available props:/
    );
  });

  it('should work with boolean values', () => {
    const MockComponent =
      createMockComponent<TestComponent>('test-component-6');
    const mockClick = vi.fn();

    render(
      <MockComponent
        title="Test"
        count={1}
        onClick={mockClick}
        isActive={true}
      />
    );

    const element = screen.getByTestId('test-component-6');

    expect(element).toHaveProp('isActive');
    expect(element).toHaveProp({ isActive: true });
  });

  it('should fail when element is not a mock component', () => {
    render(<div data-testid="regular-div">Regular div</div>);

    const element = screen.getByTestId('regular-div');

    expect(() => {
      expect(element).toHaveProp('title');
    }).toThrow(
      'Element with testId "regular-div" is not a mock component. Please create a mock component first using createMockComponent("regular-div").'
    );
  });

  it('should throw error when multiple key-value pairs are passed', () => {
    const MockComponent =
      createMockComponent<TestComponent>('test-component-7');
    const mockClick = vi.fn();

    render(<MockComponent title="Test" count={1} onClick={mockClick} />);

    const element = screen.getByTestId('test-component-7');

    expect(() => {
      expect(element).toHaveProp({ title: 'Test', count: 1 });
    }).toThrow('Expected exactly one key-value pair');
  });
});
