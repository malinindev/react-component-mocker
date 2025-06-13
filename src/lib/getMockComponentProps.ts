import type { ComponentProps, ComponentType } from 'react';
import { checkIsMockElement } from '../utils/checkIsMockElement.js';

export function getMockComponentProps(
  element: HTMLElement
): Record<string, any>;
export function getMockComponentProps<T extends ComponentType<any>>(
  element: HTMLElement
): ComponentProps<T>;

export function getMockComponentProps<
  T extends ComponentType<any> = ComponentType<unknown>,
>(element: HTMLElement): ComponentProps<T> | Record<string, any> {
  if (!checkIsMockElement(element)) {
    const testIdAttr = element.getAttribute('data-testid');

    throw new Error(
      `Element with testId "${testIdAttr ?? 'unknown'}" is not a mock component. Please create a mock component first using createMockComponent("${testIdAttr ?? 'unknown'}").`
    );
  }

  if (!element.props) {
    const testIdAttr = element.getAttribute('data-testid');
    throw new Error(
      `Props not found for element with testId: ${testIdAttr ?? 'unknown'}`
    );
  }

  return element.props;
}
