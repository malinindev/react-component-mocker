# react-component-mocker

## 0.3.0

### Minor Changes

- 4bd0ae5: Add `react-component-mocker/vitest`: import it in a setup file on Vitest 5, which no longer reads the `jest.Matchers` types of `toHaveProp` and `toHaveProps`. The package now has an `exports` map, so only `react-component-mocker` and `react-component-mocker/vitest` can be imported. `jest-diff`, which the matchers import, is now a dependency.

## 0.2.3

### Patch Changes

- 053673c: replace npm with bun
- 6524d23: update to have prop matcher

## 0.2.2

### Patch Changes

- f77f966: Omit children prop type from toHaveProps matcher

## 0.2.1

### Patch Changes

- e587719: update deps
- 8391b75: prevent call stack error when React component is passed to mock

## 0.2.0

### Minor Changes

- b0f8aa8: add jest compatibility

### Patch Changes

- a5bcd16: add docs and examples
- 42e84b9: add generic types to custom matchers

## 0.1.9

### Patch Changes

- 198d5ac: adjust release ci
