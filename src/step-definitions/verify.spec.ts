import { defineStep } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {
  PageActions,
  Generic,
  Assertions,
  ProcessEnvironmentVariables,
  GetByType,
  ValueAssertionType,
  LocatorStatesType
} from '../helpers/index.js';
import { getTabs, getMessage } from '../test-data-configs/index.js';

defineStep(
  'I verify if a new tab which url {string} {string} opens',
  async function (assertion: ValueAssertionType, urlKey: string) {
    const assertions = new Assertions();
    const generic = new Generic();
    const userUrl = await generic.getUrlBasedOnUserInput(urlKey);
    const pageActions = new PageActions(this.page, this.context);
    const secoundTab = await pageActions.getNPage(true, 2);

    await assertions.checkValue(secoundTab?.url(), userUrl, assertion, `New tab with ${urlKey} url didnt open`);
  }
);

defineStep('I verify if the URL {string} {string}', async function (assertion: ValueAssertionType, name: string) {
  const generic = new Generic();
  const assertions = new Assertions();
  const expectedUrl = await generic.getUrlBasedOnUserInput(name);
  const pageUrl = await this.page.url();
  const message = `The page URL ${assertion} ${name} failed. Expected ${pageUrl} to ${assertion} ${expectedUrl}`;

  await assertions.checkValue(pageUrl, expectedUrl, assertion, message);
});

defineStep('I verify the {string} tabs', async function (dataKey: string) {
  const assertions = new Assertions();
  const tabsData = getTabs(dataKey);
  const tabs = await this.page.locator(tabsData['locator']);

  await assertions.checkAmountOfElements(tabs, tabsData['labels']);
  await assertions.checkLabels(tabs, tabsData['labels']);
});

defineStep(
  'I verify that a {string} element contains {string} image',
  async function (element: string, text: 'question' | 'face-grin') {
    const imgDataIconAtributeValue = await this.page.locator(element + '[role^="img"]').getAttribute('data-icon');
    expect.soft(imgDataIconAtributeValue).toEqual(text);
  }
);

defineStep(
  'I verify that a {string} element with {string} text {string} visible',
  async function (elementType: string, text: string, visibility: string) {
    const message = getMessage(text);
    if (message) {
      text = message;
    }

    const element = await this.page.locator(elementType).filter({ hasText: text }).first();
    if (visibility == 'is') {
      await expect.soft(element, `${elementType} element with text - ${text} - should be visible`).toBeVisible();
    } else {
      await expect
        .soft(element, `${elementType} element with text - ${text} - should not be visible`)
        .not.toBeVisible();
    }
  }
);

defineStep('I verify the {string}, version: {string} data', async function (name: string, version: string) {
  const pageActions = new PageActions(this.page);
  await pageActions.checkTheFormData(name, parseInt(version));
});

defineStep(
  'I verify that {string} element with {string} {string} is {string}',
  async function (number: string, text: string, getBy: GetByType, expectedState: LocatorStatesType) {
    const pageActions = new PageActions(this.page);
    const processEnv = new ProcessEnvironmentVariables();
    const assertions = new Assertions();
    const generic = new Generic();
    let resolvedText = await processEnv.getEnvVarOrDefault(text);
    resolvedText = await generic.getMessageOrDefault(resolvedText);
    const element = pageActions.getNElementBy(getBy, parseInt(number), resolvedText);
    await assertions.checkElementState(element, expectedState, 0);
  }
);

defineStep(
  'I verify that {string} element with {string} {string} becomes {string} during {string} seconds',
  async function (number: string, text: string, getBy: GetByType, expectedState: LocatorStatesType, timeout: number) {
    const timeoutInMs = timeout * 1000;
    const pageActions = new PageActions(this.page);
    const processEnv = new ProcessEnvironmentVariables();
    const assertions = new Assertions();
    const resolvedText = await processEnv.getEnvVarOrDefault(text);
    const element = pageActions.getNElementBy(getBy, parseInt(number), resolvedText);
    await assertions.checkElementState(element, expectedState, timeoutInMs);
  }
);

defineStep(
  'I verify that {string} field, {string} drop down option {string} available',
  async function (fieldLabel, dropDownOption: string, toBeAvailable: 'is' | 'is not') {
    const pageActions = new PageActions(this.page);
    const is_available = await pageActions.isDropdownOptionAvailable(fieldLabel, dropDownOption);

    if (toBeAvailable == 'is') {
      expect.soft(is_available, `${dropDownOption} option is not visible in the ${fieldLabel} dropdown`).toBeTruthy();
    } else {
      expect
        .soft(is_available, `${dropDownOption} option is available in the ${fieldLabel} dropdown but it shouldnt`)
        .toBeFalsy();
    }
  }
);
export { defineStep };
