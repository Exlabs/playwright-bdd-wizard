import { Locator } from '@playwright/test';
export type LocatorStatesType = 'visible' | 'hidden' | 'editable' | 'disabled' | 'enabled' | 'read-only';
export type ValueAssertionType = 'greaterThanZero' | 'smallerThanZero' | 'equalsToZero' | 'notEmpty' | 'empty' | 'contains' | 'doesntContain' | 'equals' | 'ignore';
export default class Assertions {
    checkElementState(element: Promise<Locator>, expectedState: LocatorStatesType, timeout: number, message?: string): Promise<void>;
    checkLabels(element: Locator, labels: Array<string>): Promise<void>;
    checkAmountOfElements(elements: Locator, labels: Array<string>): Promise<void>;
    checkValue(value: string | number | undefined, expected: string | number, assertionType?: ValueAssertionType, message?: string): Promise<void>;
}
