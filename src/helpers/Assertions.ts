import { expect, Locator } from '@playwright/test';

export type LocatorStatesType = 'visible' | 'hidden' | 'editable' | 'disabled' | 'enabled' | 'read-only';
export type ValueAssertionType =
  | 'greaterThanZero'
  | 'smallerThanZero'
  | 'equalsToZero'
  | 'notEmpty'
  | 'empty'
  | 'contains'
  | 'doesntContain'
  | 'equals'
  | 'ignore';

export default class Assertions {
  async checkElementState(
    element: Promise<Locator>,
    expectedState: LocatorStatesType,
    timeout: number,
    message = `Element state assertion failed`
  ) {
    switch (expectedState) {
      case 'visible':
        await expect.soft(await element, message).toBeVisible({ timeout: timeout });
        break;
      case 'hidden':
        await expect.soft(await element, message).toBeHidden({ timeout: timeout });
        break;
      case 'editable':
        await expect.soft(await element, message).toBeEditable({ timeout: timeout, editable: true });
        break;
      case 'read-only':
        await expect.soft(await element, message).toBeEditable({ timeout: timeout, editable: false });
        break;
      case 'disabled':
        await expect.soft(await element, message).toBeDisabled({ timeout: timeout });
        break;
      case 'enabled':
        await expect.soft(await element, message).toBeEnabled({ timeout: timeout });
    }
  }

  async checkLabels(element: Locator, labels: Array<string>) {
    const tabs = await element.allInnerTexts();
    for (const key in labels) {
      await this.checkValue(tabs[key], labels[key], 'equals', 'Unexpected label');
    }
  }

  async checkAmountOfElements(elements: Locator, labels: Array<string>) {
    expect.soft(await elements.count(), 'Unexpected count').toEqual(labels.length);
  }

  async checkValue(
    value: string | number | undefined,
    expected: string | number,
    assertionType?: ValueAssertionType,
    message = `Assertion failed`
  ) {
    if (!assertionType && (expected == 'empty' || expected == 'notEmpty' || expected == 'ignore')) {
      return;
    }
    switch (assertionType) {
      case 'notEmpty':
        expect.soft(value, message).not.toEqual('');
        break;
      case 'empty':
        expect.soft(value, message).toEqual('');
        break;
      case 'ignore':
        break;
      case 'greaterThanZero':
        expect.soft(value, message).toBeGreaterThan(0);
        break;
      case 'smallerThanZero':
        expect.soft(value, message).toBeLessThan(0);
        break;
      case 'equalsToZero':
        expect.soft(value, message).toEqual(0);
        break;
      case 'contains':
        return expect
          .soft(
            typeof value === 'string' && typeof expected === 'string' && value.includes(expected),
            `${value} doesn't contain ${expected}. ${message}`
          )
          .toEqual(true);
      case 'doesntContain':
        return expect
          .soft(
            typeof value === 'string' && typeof expected === 'string' && !value.includes(expected),
            `${value} contains ${expected}. ${message}`
          )
          .toEqual(true);
    }
  }
}
