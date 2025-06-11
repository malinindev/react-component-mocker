import type { MOCK_COMPONENT } from '../const.js';

export interface ComponentMockElement extends HTMLElement {
  tagName: typeof MOCK_COMPONENT.tagName;
  props: Record<string, any> | undefined;
}
