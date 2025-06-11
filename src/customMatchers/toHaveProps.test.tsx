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
  it('should pass when element has mock props (without expectedProps)', () => {
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
      onClick: mockClick,
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
        onClick: mockClick,
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

  it('should pass when expectedProps contains actual functions', () => {
    const MockComponent = createMockComponent<TestComponent>(
      'test-component-func'
    );
    const mockClick = vi.fn();

    render(<MockComponent title="Test" count={1} onClick={mockClick} />);

    const element = screen.getByTestId('test-component-func');

    expect(element).toHaveProps({
      title: 'Test',
      count: 1,
      onClick: mockClick,
    });
  });

  it('should pass when nested expectedProps contains functions', () => {
    const MockComponent = createMockComponent<
      ComponentType<{
        config: { handler: () => void };
      }>
    >('test-component-nested');

    const handler = vi.fn();
    render(<MockComponent config={{ handler }} />);

    const element = screen.getByTestId('test-component-nested');

    expect(element).toHaveProps({
      config: { handler },
    });
  });

  it('should pass when using expect.any(Function) matcher', () => {
    const MockComponent = createMockComponent<TestComponent>(
      'test-component-any-function'
    );
    const mockClick = vi.fn();

    render(<MockComponent title="Test Title" count={99} onClick={mockClick} />);

    const element = screen.getByTestId('test-component-any-function');

    expect(element).toHaveProps({
      title: 'Test Title',
      count: 99,
      onClick: expect.any(Function),
    });
  });

  it('should pass when using multiple expect.any() matchers', () => {
    const MockComponent = createMockComponent<TestComponent>(
      'test-component-multiple-any'
    );
    const mockClick = vi.fn();

    render(<MockComponent title="Any Title" count={42} onClick={mockClick} />);

    const element = screen.getByTestId('test-component-multiple-any');

    expect(element).toHaveProps({
      title: expect.any(String),
      count: expect.any(Number),
      onClick: expect.any(Function),
    });
  });
});
