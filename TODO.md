# Roadmap

## Planned Features

### Short Term (v0.2.x)
- [ ] **Documentation** - docs with examples and best practices
- [ ] **Ref Support** - Add support for forwarding refs in mock components
- [ ] **Jest/Vitest Matchers** - Custom matchers for easier testing:
  ```typescript
  // Instead of verbose checks
  const props = getMockComponentProps<ButtonComponent>(element);
  expect(props.onClick).toBeDefined();
  expect(props.label).toBe('Click me');
  
  // Write clean assertions
  expect(element).toHaveProps({ label: 'Click me' });
  expect(element).toHaveMockFunction('onClick');
  expect(element).toHaveFunctionCalledWith('onClick', [arg1, arg2]);
  ```
  Supports both Jest and Vitest out of the box.

## Contributing
Want to help? Check out [CONTRIBUTING.md](CONTRIBUTING.md) and pick a feature to work on!
