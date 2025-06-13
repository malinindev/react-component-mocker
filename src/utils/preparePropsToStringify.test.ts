import { describe, expect, it } from 'vitest';
import { preparePropsToStringify } from './preparePropsToStringify.js';

describe('preparePropsToStringify', () => {
  it('handles props with null and undefined values', () => {
    const props = {
      nullProp: null,
      undefinedProp: undefined,
    };
    const result = preparePropsToStringify(props);
    expect(result).toEqual({
      nullProp: null,
      undefinedProp: undefined,
    });
  });

  it('handles props with primitive values', () => {
    const props = {
      stringProp: 'test',
      numberProp: 42,
      booleanProp: true,
      falseProp: false,
    };
    const result = preparePropsToStringify(props);
    expect(result).toEqual({
      stringProp: 'test',
      numberProp: 42,
      booleanProp: true,
      falseProp: false,
    });
  });

  it('replaces named functions with string representation', () => {
    function namedFunction(): string {
      return 'test';
    }

    const props = { handler: namedFunction };
    const result = preparePropsToStringify(props);
    expect(result).toEqual({
      handler: '[Function: namedFunction]',
    });
  });

  it('replaces anonymous functions with generic string', () => {
    const anonymousFunc = (): string => 'test';
    const props = { callback: anonymousFunc };
    const result = preparePropsToStringify(props);
    expect(result).toEqual({
      callback: '[Function: anonymousFunc]',
    });
  });

  it('processes arrays recursively', () => {
    const props = {
      items: [
        'string',
        42,
        () => 'test',
        function namedFunc() {
          return 'named';
        },
      ],
    };

    const result = preparePropsToStringify(props);
    expect(result).toEqual({
      items: ['string', 42, '[Function: anonymous]', '[Function: namedFunc]'],
    });
  });

  it('processes objects recursively', () => {
    const testObject = {
      stringProp: 'test',
      numberProp: 99,
      functionProp: (): string => 'test',
      namedFunction: function handleClick(): string {
        return 'clicked';
      },
    };

    const result = preparePropsToStringify(testObject);
    expect(result).toEqual({
      stringProp: 'test',
      numberProp: 99,
      functionProp: '[Function: functionProp]',
      namedFunction: '[Function: handleClick]',
    });
  });

  it('processes nested objects and arrays', () => {
    const complexObject = {
      config: {
        theme: 'dark',
        handler: function themeHandler(): string {
          return 'handled';
        },
        options: ['option1', () => 'option2'],
      },
      callbacks: [
        function callback1() {
          return 'cb1';
        },
        {
          nested: (): string => 'nested',
          value: 'test',
        },
      ],
    };

    const result = preparePropsToStringify(complexObject);
    expect(result).toEqual({
      config: {
        theme: 'dark',
        handler: '[Function: themeHandler]',
        options: ['option1', '[Function: anonymous]'],
      },
      callbacks: [
        '[Function: callback1]',
        {
          nested: '[Function: nested]',
          value: 'test',
        },
      ],
    });
  });

  it('handles empty objects and arrays', () => {
    expect(preparePropsToStringify({})).toEqual({});

    const propsWithEmptyArray = { items: [] };
    expect(preparePropsToStringify(propsWithEmptyArray)).toEqual({ items: [] });
  });

  it('handles functions with empty names', () => {
    const func = (): string => 'test';

    Object.defineProperty(func, 'name', { value: '' });

    const props = { handler: func };
    const result = preparePropsToStringify(props);
    expect(result).toEqual({
      handler: '[Function: anonymous]',
    });
  });
});
