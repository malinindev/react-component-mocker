import type { ComponentType } from 'react';
import type { MockedComponentFunctions } from './mockFunctions.js';

export interface MockedElement extends Element {
  functionsMock: MockedComponentFunctions<ComponentType<any>>;
}
