import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { createMockComponent, getMockComponentProps } from '../src/index.js';
import { ContainerComponent } from './components/ContainerComponent.js';
import type { ComprehensiveComponent } from './components/ComprehensiveComponent.js';

vi.mock('./components/ComprehensiveComponent.js', () => ({
  ComprehensiveComponent: createMockComponent('comprehensive-component-mock'),
}));

describe('ContainerComponent', () => {
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
    const onFnOneMock = vi.fn();
    const onFnTwoMock = vi.fn();
    const onNestingFnMock = vi.fn();

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
    const onFnOneMock = vi.fn();
    const onFnTwoMock = vi.fn();
    const onNestingFnMock = vi.fn();

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
});
