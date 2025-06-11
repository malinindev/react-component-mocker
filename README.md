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
import { getMockComponentProps } from 'react-component-mocker';
import { Button } from '../components/Button';

it('should handle button click', () => {
  const onClickMock = vi.fn();
  render(<Button onClick={onClickMock} label="Click me" />);

  const buttonElement = screen.getByTestId('button-mock');
  const props = getMockComponentProps<typeof Button>(buttonElement);
  
  // Access function props directly
  props.onClick?.();
  expect(onClickMock).toHaveBeenCalled();
  
  // Access other props
  expect(props.label).toBe('Click me');
});
```

## API

### `createMockComponent<T>(testId: string)`

Creates a mock React component with type safety. Used inside `vi.mock()` or `jest.mock()`.

### `getMockComponentProps<T>(element: HTMLElement)`

Extracts all props (including functions) from a mock component. Functions remain as actual function references, not serialized strings.

## Roadmap

See our [TODO](TODO.md) for planned features and upcoming improvements.

## License

MIT
