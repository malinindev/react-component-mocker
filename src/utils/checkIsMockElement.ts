import { MOCK_COMPONENT } from '../const.js';
import type { ComponentMockElement } from '../types/common.js';

export const checkIsMockElement = (
  element: Element
): element is ComponentMockElement =>
  element?.tagName === MOCK_COMPONENT.tagName;
