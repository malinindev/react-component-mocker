---
"react-component-mocker": minor
---

Add `react-component-mocker/vitest`: import it in a setup file on Vitest 5, which no longer reads the `jest.Matchers` types of `toHaveProp` and `toHaveProps`. The package now has an `exports` map, so only `react-component-mocker` and `react-component-mocker/vitest` can be imported. `jest-diff`, which the matchers import, is now a dependency.
