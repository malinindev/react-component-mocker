# React Component Mocker

TypeScript NPM package for mocking React components in unit tests.

## Installation

```bash
npm i -D react-component-mocker
```

## Quick Start

### 1. Setup Mock Component

First, mock your component using `vi.mock()` or `jest.mock()`:

```typescript
// File with your test
import { vi } from 'vitest'; // or jest
import { createMockComponent } from 'react-component-mocker';

vi.mock('../components/Button', (): typeof import('../components/Button') => ({
  Button: createMockComponent<typeof Button>('button-mock'),
}));
```

### 2. Use in Tests

Now you can use the mocked component in your tests:

```typescript
import { getMockedFunctions, getMockComponentProps } from 'react-component-mocker';
import { Button } from '../components/Button';

it('should handle button click', () => {
  const onClickMock = vi.fn();
  render(<Button onClick={onClickMock} label="Click me" />);

  const { onClick } = getMockedFunctions<typeof Button>('button-mock');

  onClick?.();
  expect(onClickMock).toHaveBeenCalled();

  const buttonElement = screen.getByTestId('button-mock');
  const props = getMockComponentProps<typeof Button>(buttonElement);
  expect(props.label).toBe('Click me');
});
```

## API

### `createMockComponent<T>(testId: string)`

Creates a mock React component with type safety. Used inside `vi.mock()` or `jest.mock()`.

### `getMockedFunctions<T>(testId: string)`

Extracts mocked functions from a component by test ID. Throws an error if element is not found or has no mock functions.

### `getMockComponentProps<T>(element: HTMLElement)`

Extracts props from a mock component.

## Roadmap

See our [TODO](TODO.md) for planned features and upcoming improvements.

## License

MIT
