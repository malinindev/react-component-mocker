import type { ComponentType } from 'react';
import type { MockedComponentFunctions } from './mockFunctions.js';
import type { MOCK_COMPONENT } from '../const.js';

export interface ComponentMockElement extends HTMLElement {
  tagName: typeof MOCK_COMPONENT.tagName;
  functionsMock: MockedComponentFunctions<ComponentType<any>> | undefined;
}
