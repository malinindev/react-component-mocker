import '@testing-library/jest-dom';
import { describe, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { createMockComponent, getMockComponentProps } from '../src/index.js';
import type { ComponentWithChildren } from './components/ComponentWithChildren.js';
import type { ComprehensiveComponent } from './components/ComprehensiveComponent.js';
import { ContainerComponent } from './components/ContainerComponent.js';

jest.mock('./components/ComprehensiveComponent.js', () => ({
  ComprehensiveComponent: createMockComponent('comprehensive-component-mock'),
}));

describe('ContainerComponent with Jest', () => {
  it('renders with correct title and pass props to ComprehensiveComponent', () => {
    render(<ContainerComponent title="Container component title" />);
    expect(screen.getByText('Container component title')).toBeInTheDocument();

    const componentMock = screen.getByTestId('comprehensive-component-mock');

    // just checks that props exist
    expect(componentMock).toHaveProp('text');
    expect(componentMock).toHaveProp('onFnOne');
    expect(componentMock).toHaveProp('onFnTwo');

    // you can also pass a generic to toHaveProp to make it type-safe
    expect(componentMock).toHaveProp<typeof ComprehensiveComponent>(
      'nestingProp'
    );

    // check the prop and its value
    expect(componentMock).toHaveProp({ text: 'test' });

    // check object props
    expect(componentMock).toHaveProp<typeof ComprehensiveComponent>({
      nestingProp: {
        one: '123',
        two: true,
        onNestingFn: undefined,
      },
    });

    // check that functions props are undefined
    expect(componentMock).toHaveProp({
      onFnOne: undefined,
    });

    expect(componentMock).toHaveProp({
      onFnTwo: undefined,
    });
  });

  it('passes all props at once to ComprehensiveComponent using toHaveProps', () => {
    render(<ContainerComponent title="Full Test" />);

    const componentMock = screen.getByTestId('comprehensive-component-mock');

    expect(componentMock).toHaveProps<typeof ComprehensiveComponent>({
      text: 'test',
      onFnOne: undefined,
      onFnTwo: undefined,
      nestingProp: {
        one: '123',
        two: true,
        onNestingFn: undefined,
      },
    });
  });

  it('passes function props correctly', () => {
    const onFnOneMock = jest.fn();
    const onFnTwoMock = jest.fn<(value: string) => string>();
    const onNestingFnMock = jest.fn();

    render(
      <ContainerComponent
        title="Full Test"
        onFnOne={onFnOneMock}
        onFnTwo={onFnTwoMock}
        onNestingFn={onNestingFnMock}
      />
    );

    const componentMock = screen.getByTestId('comprehensive-component-mock');

    expect(componentMock).toHaveProp({ onFnOne: onFnOneMock });
    expect(componentMock).toHaveProp({ onFnTwo: onFnTwoMock });

    expect(componentMock).toHaveProp({
      nestingProp: expect.objectContaining({
        onNestingFn: onNestingFnMock,
      }),
    });

    // you could also use toHaveProps to check it in a single expect
    expect(componentMock).toHaveProps(
      expect.objectContaining({
        onFnOne: onFnOneMock,
        onFnTwo: onFnTwoMock,
        nestingProp: expect.objectContaining({
          onNestingFn: onNestingFnMock,
        }),
      })
    );
  });

  it('calls internal component props correctly', () => {
    const onFnOneMock = jest.fn();
    const onFnTwoMock = jest.fn<(value: string) => string>();
    const onNestingFnMock = jest.fn();

    render(
      <ContainerComponent
        title="Full Test"
        onFnOne={onFnOneMock}
        onFnTwo={onFnTwoMock}
        onNestingFn={onNestingFnMock}
      />
    );

    // you have access here to all props, including functions that could be called
    const componentProps = getMockComponentProps<typeof ComprehensiveComponent>(
      screen.getByTestId('comprehensive-component-mock')
    );

    expect(onFnOneMock).not.toHaveBeenCalled();
    componentProps.onFnOne?.();
    expect(onFnOneMock).toHaveBeenCalled();

    expect(onFnTwoMock).not.toHaveBeenCalled();
    componentProps.onFnTwo?.('test');
    expect(onFnTwoMock).toHaveBeenCalled();
    expect(onFnTwoMock).toHaveBeenCalledWith('test');

    expect(onNestingFnMock).not.toHaveBeenCalled();
    componentProps.nestingProp.onNestingFn?.();
    expect(onNestingFnMock).toHaveBeenCalled();
  });

  it('should work with components that have required children prop', () => {
    const MockComponentWithChildren = createMockComponent<
      typeof ComponentWithChildren
    >('saved-signature-container');

    render(
      <MockComponentWithChildren onClick={jest.fn()}>
        <div>Some content</div>
      </MockComponentWithChildren>
    );

    const container = screen.getByTestId('saved-signature-container');

    expect(container).toHaveProps<typeof ComponentWithChildren>({
      onClick: expect.any(Function),
    });
  });
});
