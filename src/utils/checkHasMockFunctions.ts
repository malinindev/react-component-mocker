import type { MockedElement } from '../types/common.js';

export const checkHasMockFunctions = (
  element: Element
): element is MockedElement =>
  ('functionsMock' satisfies keyof MockedElement) in element;
