import { describe, expect, it } from 'vitest';
import { preparePropsToStringify } from './preparePropsToStringify.js';

describe('preparePropsToStringify', () => {
  it('handles props with null and undefined values', () => {
    const result = preparePropsToStringify({
      nullProp: null,
      undefinedProp: undefined,
    });

    expect(result).toEqual({
      nullProp: null,
      undefinedProp: undefined,
    });
  });

  it('handles props with primitive values', () => {
    const result = preparePropsToStringify({
      stringProp: 'test',
      numberProp: 42,
      booleanProp: true,
      falseProp: false,
    });

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
    const result = preparePropsToStringify({
      items: [
        'string',
        42,
        () => 'test',
        function namedFunc() {
          return 'named';
        },
      ],
    });

    expect(result).toEqual({
      items: ['string', 42, '[Function: anonymous]', '[Function: namedFunc]'],
    });
  });

  it('processes objects recursively', () => {
    const result = preparePropsToStringify({
      stringProp: 'test',
      numberProp: 99,
      functionProp: (): string => 'test',
      namedFunction: function handleClick(): string {
        return 'clicked';
      },
    });

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

  it('handles React elements', () => {
    const reactElement = <div>test content</div>;
    const props = {
      component: reactElement,
      components: {
        component1: <div>1</div>,
        component2: <div>2</div>,
      },
    };

    const result = preparePropsToStringify(props);
    expect(result).toEqual({
      component: '[React Element]',
      components: {
        component1: '[React Element]',
        component2: '[React Element]',
      },
    });
  });

  it('handles circular references in objects', () => {
    const circularObj: any = { name: 'test' };
    circularObj.self = circularObj;

    const props = { data: circularObj };
    const result = preparePropsToStringify(props);

    expect(result).toEqual({
      data: {
        name: 'test',
        self: '[Circular Object]',
      },
    });
  });

  it('handles circular references in arrays', () => {
    const circularArray: any[] = ['item1'];
    circularArray.push(circularArray);

    const props = { items: circularArray };
    const result = preparePropsToStringify(props);

    expect(result).toEqual({
      items: ['item1', '[Circular Array]'],
    });
  });

  it('handles complex circular references with React elements', () => {
    const obj1: any = { name: 'obj1' };
    const obj2: any = { name: 'obj2', ref: obj1 };
    obj1.ref = obj2;

    const props = {
      circularData: obj1,
      component: <div>test</div>,
      normalData: 'test',
    };

    const result = preparePropsToStringify(props);
    expect(result).toEqual({
      circularData: {
        name: 'obj1',
        ref: {
          name: 'obj2',
          ref: '[Circular Object]',
        },
      },
      component: '[React Element]',
      normalData: 'test',
    });
  });
});
