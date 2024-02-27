import { defineStep } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import Generic from '../helpers/Generic.js';
import PageActions from '../helpers/PageActions.js';
import getTabs from '../testDataConfigs/tabsConfig.js';
import getMessages from '../testDataConfigs/messagesConfig.js';
import ProcessEnvironmentVariables from '../helpers/ProcessEnvironmentVariables.js';

defineStep(
  'I verify if a new tab which url {string} {string} opens',
  async function (assertion: 'contains' | 'equals' | 'doesnt contain', urlKey: string) {
    const generic = new Generic();
    const userUrl = await generic.getUrlBasedOnUserInput(urlKey);
    const pageActions = new PageActions(this.page, this.context);
    const secoundTab = await pageActions.getNPage(true, 2);
    expect.soft(await generic.isAsExpected(secoundTab?.url(), userUrl, assertion)).toBeTruthy();
  }
);

defineStep(
  'I verify if URL {string} {string}',
  async function (assertion: 'contains' | 'equals' | 'doesnt contain', name: string) {
    const generic = new Generic();
    const expectedFullUrl = await generic.getUrlBasedOnUserInput(name);
    let counter = 0;
    let result = false;
    do {
      let pageUrl = await this.page.url();
      const generic = new Generic();
      if (assertion == 'equals') {
        result = await generic.isAsExpected(pageUrl, expectedFullUrl, assertion);
      } else {
        result = await generic.isAsExpected(pageUrl, expectedFullUrl, assertion);
      }
      if (result === true) {
        break;
      }
      counter++;
      await this.page.waitForTimeout(400);
    } while (counter < 2);
    expect.soft(result, `The URL doesnt ${assertion} ${name} - ${name} URL was ${expectedFullUrl}`).toBeTruthy();
  }
);

defineStep('I verify the {string} tabs', async function (dataKey: string) {
  const pageActions = new PageActions(this.page);
  const tabsData = getTabs(dataKey);
  await pageActions.checkAmountOfElements(tabsData['locator'], tabsData['labels']);
  await pageActions.checkLabels(tabsData['locator'], tabsData['labels']);
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
    const message = getMessages(text);
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
  async function (
    number: string,
    text: string,
    getBy: 'text' | 'label' | 'placeholder',
    action: 'visible' | 'not visible' | 'editable' | 'disabled'
  ) {
    const pageActions = new PageActions(this.page);
    const processEnv = new ProcessEnvironmentVariables();
    text = await processEnv.getEnvVarOrDefault(text);
    const element = await pageActions.getNElementBy(getBy, parseInt(number), text);
    const elementIsVisible = await element.isVisible();
    const assertionMessage = `Element ${text} ${getBy} is not`;
    switch (action) {
      case 'visible':
        expect.soft(elementIsVisible, `${assertionMessage} visible`).toBeTruthy();
        break;
      case 'not visible':
        expect.soft(elementIsVisible, `${assertionMessage} visible`).toBeFalsy();
        break;
      case 'editable':
        expect.soft(element, `${assertionMessage} editable`).toBeEditable();
        break;
      case 'disabled':
        expect.soft(element, `${assertionMessage} disabled`).toBeDisabled();
    }
  }
);

defineStep(
  'I verify that {string} element with {string} {string} becomes {string} during {string} seconds',
  async function (
    number: string,
    text: string,
    getBy: 'text' | 'label' | 'placeholder',
    action: 'visible' | 'hidden',
    timeout: number
  ) {
    const timeoutInMs = timeout * 1000;
    const pageActions = new PageActions(this.page);
    const processEnv = new ProcessEnvironmentVariables();
    text = await processEnv.getEnvVarOrDefault(text);
    const element = await pageActions.getNElementBy(getBy, parseInt(number), text);
    const assertionMessage = `Element ${text} ${getBy} didnt become`;
    switch (action) {
      case 'visible':
        expect
          .soft(await pageActions.isElementBecomingVisible(element, true, timeoutInMs), `${assertionMessage} visible`)
          .toBeTruthy();
        break;
      case 'hidden':
        expect
          .soft(await pageActions.isElementBecomingVisible(element, false, timeoutInMs), `${assertionMessage} hidden`)
          .toBeFalsy();
        break;
    }
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
