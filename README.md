# React Component Mocker

TypeScript NPM package for mocking React components in unit tests.

## Installation

```bash
npm i -D react-component-mocker
```

## Quick Start

```typescript
import { createMockComponent, getMockedFunctions, getMockComponentProps } from 'react-component-mocker';

// 1. Create a mock component
const MockButton = createMockComponent<ButtonComponent>('my-button');

// 2. Use in tests
const onClickMock = vi.fn() // or jest.fn()
render(<MockButton onClick={mockClick} label="Click me" />);

// 3. Get mocked functions
const { onClick } = getMockedFunctions<ButtonComponent>('my-button');

onClick?.()
expect(mockClick).toHaveBeenCalled();

// 4. Check props
const props = getMockComponentProps<ButtonComponent>(screen.getByTestId('my-button'));
expect(props.label).toBe('Click me');
```

## API

### `createMockComponent<T>(testId: string)`

Creates a mock React component with type safety.

### `getMockedFunctions<T>(testId: string)`

Extracts mocked functions from a component. Throws an error if the element is not found or has no mock functions.

### `getMockComponentProps<T>(element: HTMLElement)`

Extracts props from a mock component.

## Roadmap

See our [TODO](TODO.md) for planned features and upcoming improvements.

## License

MIT
