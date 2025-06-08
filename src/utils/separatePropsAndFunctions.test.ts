import { describe, it, expect, vi } from 'vitest';
import { separatePropsAndFunctions } from './separatePropsAndFunctions.js';

describe('separatePropsAndFunctions', () => {
  it('should return null and undefined for empty object', () => {
    const props: Record<string, any> = {};
    const result = separatePropsAndFunctions(props);

    expect(result.propsMock).toBeNull();
    expect(result.functionsMock).toBeUndefined();
  });

  it('should handle props with only regular values', () => {
    const props: Record<string, any> = {
      name: 'John',
      age: 30,
      isActive: true,
      data: { id: 1, title: 'Test' },
      items: [1, 2, 3],
    };

    const result = separatePropsAndFunctions(props);

    expect(result.propsMock).toEqual({
      name: 'John',
      age: 30,
      isActive: true,
      data: { id: 1, title: 'Test' },
      items: [1, 2, 3],
    });
    expect(result.functionsMock).toBeUndefined();
  });

  it('should handle props with only functions', () => {
    const mockFn1 = vi.fn();
    const mockFn2 = vi.fn();
    const props: Record<string, any> = {
      onClick: mockFn1,
      onSubmit: mockFn2,
    };

    const result = separatePropsAndFunctions(props);

    expect(result.propsMock).toEqual({
      onClick: '[Function: onClick]',
      onSubmit: '[Function: onSubmit]',
    });
    expect(result.functionsMock).toEqual({
      onClick: mockFn1,
      onSubmit: mockFn2,
    });
  });

  it('should handle props with mixed values and functions', () => {
    const mockFn = vi.fn();
    const hoverFn = (): void => console.log('hover');
    const props: Record<string, any> = {
      title: 'Test Title',
      count: 42,
      isEnabled: false,
      onClick: mockFn,
      data: { nested: 'value' },
      onHover: hoverFn,
    };

    const result = separatePropsAndFunctions(props);

    expect(result.propsMock).toEqual({
      title: 'Test Title',
      count: 42,
      isEnabled: false,
      onClick: '[Function: onClick]',
      data: { nested: 'value' },
      onHover: '[Function: onHover]',
    });

    expect(result.functionsMock).toEqual({
      onClick: mockFn,
      onHover: hoverFn,
    });
  });

  it('should handle anonymous functions correctly', () => {
    const regularFn = (): string => 'test';
    const arrowFn = (): string => 'arrow function';
    const props: Record<string, any> = {
      callback: regularFn,
      arrow: arrowFn,
    };

    const result = separatePropsAndFunctions(props);

    expect(result.propsMock).toEqual({
      callback: '[Function: callback]',
      arrow: '[Function: arrow]',
    });
    expect(result.functionsMock?.callback).toBe(props.callback);
    expect(result.functionsMock?.arrow).toBe(props.arrow);
  });

  it('should preserve original function references in functionsMock', () => {
    const originalFunction = vi.fn((): string => 'test result');
    const props: Record<string, any> = {
      testFn: originalFunction,
    };

    const result = separatePropsAndFunctions(props);

    // Check that the function in functionsMock is the same reference
    expect(result.functionsMock?.testFn).toBe(originalFunction);

    // Check that the function works
    if (result.functionsMock?.testFn) {
      const returnValue = result.functionsMock.testFn();
      expect(returnValue).toBe('test result');
      expect(originalFunction).toHaveBeenCalledOnce();
    }
  });

  it('should handle null and undefined values correctly', () => {
    const props: Record<string, any> = {
      nullValue: null,
      undefinedValue: undefined,
      emptyString: '',
      zero: 0,
      falsy: false,
    };

    const result = separatePropsAndFunctions(props);

    expect(result.propsMock).toEqual({
      nullValue: null,
      undefinedValue: undefined,
      emptyString: '',
      zero: 0,
      falsy: false,
    });
    expect(result.functionsMock).toBeUndefined();
  });
});
