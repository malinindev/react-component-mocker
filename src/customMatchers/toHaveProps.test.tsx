import { render, screen } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createMockComponent } from '../lib/createMockComponent.js';

interface TestProps {
  title: string;
  count: number;
  onClick: () => void;
}

type TestComponent = ComponentType<TestProps>;

describe('Custom Matcher: toHaveProps', () => {
  it('should pass when element has mock props (без expectedProps)', () => {
    const MockComponent = createMockComponent<TestComponent>('test-component');
    const mockClick = vi.fn();

    render(
      <MockComponent title="Hello World" count={42} onClick={mockClick} />
    );

    const element = screen.getByTestId('test-component');

    expect(element).toHaveProps();
  });

  it('should pass when element has expected props', () => {
    const MockComponent =
      createMockComponent<TestComponent>('test-component-2');
    const mockClick = vi.fn();

    render(
      <MockComponent title="Hello World" count={42} onClick={mockClick} />
    );

    const element = screen.getByTestId('test-component-2');

    expect(element).toHaveProps({
      title: 'Hello World',
      count: 42,
      onClick: '[Function: onClick]',
    });
  });

  it('should fail when props do not match expected', () => {
    const MockComponent =
      createMockComponent<TestComponent>('test-component-3');
    const mockClick = vi.fn();

    render(
      <MockComponent title="Different Title" count={99} onClick={mockClick} />
    );

    const element = screen.getByTestId('test-component-3');

    expect(() => {
      expect(element).toHaveProps({
        title: 'Expected Title',
        count: 42,
        onClick: '[Function: onClick]',
      });
    }).toThrow();
  });

  it('should show detailed error message when props mismatch', () => {
    const MockComponent =
      createMockComponent<TestComponent>('test-component-4');
    const mockClick = vi.fn();

    render(
      <MockComponent title="Actual Title" count={100} onClick={mockClick} />
    );

    const element = screen.getByTestId('test-component-4');

    expect(() => {
      expect(element).toHaveProps({
        title: 'Expected Title',
        count: 50,
      });
    }).toThrow('Expected props to match');
  });

  it('should fail when element does not have mock props', () => {
    render(<div data-testid="regular-div">Regular div</div>);

    const element = screen.getByTestId('regular-div');

    expect(() => {
      expect(element).toHaveProps();
    }).toThrow(
      'Element with testId "regular-div" is not a mock component. Please create a mock component first using createMockComponent("regular-div").'
    );
  });

  it('should check that created elements are component-mock elements', () => {
    const MockComponent = createMockComponent<TestComponent>(
      'test-component-check'
    );
    const mockClick = vi.fn();

    render(<MockComponent title="Test" count={1} onClick={mockClick} />);

    const element = screen.getByTestId('test-component-check');

    expect(element.tagName).toBe('COMPONENT-MOCK');
  });
});
