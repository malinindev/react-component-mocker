import type { ComponentType } from 'react';
import { checkHasMockFunctions } from '../utils/checkHasMockFunctions.js';
import type { MockedComponentFunctions } from '../types/mockFunctions.js';

export const getMockedFunctions = <T extends ComponentType<any>>(
  testId: string
): MockedComponentFunctions<T> => {
  const element = document.querySelector(`[data-testid="${testId}"]`);

  if (!element) {
    throw new Error(`Element with testId "${testId}" not found`);
  }

  if (!checkHasMockFunctions(element)) {
    throw new Error(
      `Element with testId "${testId}" has no mock functions property inside. Something went wrong`
    );
  }

  return element.functionsMock;
};
