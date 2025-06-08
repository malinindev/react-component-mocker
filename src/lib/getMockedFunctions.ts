import type { ComponentType } from 'react';
import { checkIsMockElement } from '../utils/checkIsMockElement.js';
import type { MockedComponentFunctions } from '../types/mockFunctions.js';

export const getMockedFunctions = <T extends ComponentType<any>>(
  testId: string
): MockedComponentFunctions<T> => {
  const element = document.querySelector(`[data-testid="${testId}"]`);

  if (!element) {
    throw new Error(`Element with testId "${testId}" not found`);
  }

  if (!checkIsMockElement(element)) {
    throw new Error(
      `Element with testId "${testId}" is not a mock component. Please create a mock component first using createMockComponent("${testId}").`
    );
  }

  if (!element.functionsMock) {
    throw new Error(
      `Element with testId "${testId}" has no mock functions property inside. Something went wrong`
    );
  }

  return element.functionsMock;
};
