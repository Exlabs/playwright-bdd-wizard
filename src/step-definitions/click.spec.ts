import { defineStep } from '@cucumber/cucumber';
import { PageActions, ProcessEnvironmentVariables, GetByType, ClickActionType } from '../helpers/index.js';

defineStep(
  'I {string} the {string} element that contains {string}',
  async function (action: ClickActionType, field: string, text: string) {
    const element = await this.page.locator(field).filter({ containsText: text }).first();
    const pageActions = new PageActions(this.page, this.context);

    if (element) {
      await pageActions.clickElement(element, action);
      await this.page.waitForTimeout(3000);
    } else {
      throw new Error(`Element with ${text} text not found`);
    }
  }
);

defineStep('I click on the top left corner of the page', async function () {
  await this.page.mouse.click(0, 0);
});

defineStep(
  'I {string} the {string} element with {string} {string}',
  async function (action: ClickActionType, number: string, text: string, getBy: GetByType) {
    const processEnv = new ProcessEnvironmentVariables();
    const resolvedText = await processEnv.getEnvVarOrDefault(text);
    const pageActions = new PageActions(this.page, this.context);
    const element = await pageActions.getNElementBy(getBy, parseInt(number), resolvedText);

    if (element) {
      await pageActions.clickElement(element, action);
    } else {
      throw new Error(`Element with ${getBy} ${text} not found`);
    }
  }
);

defineStep(
  'If its visible, I {string} the {string} element with {string} {string}',
  async function (action: ClickActionType, number: string, text: string, getBy: GetByType) {
    const processEnv = new ProcessEnvironmentVariables();
    const resolvedText = await processEnv.getEnvVarOrDefault(text);
    const pageActions = new PageActions(this.page, this.context);
    const element = await pageActions.getNElementBy(getBy, parseInt(number), resolvedText);

    if (await element.isVisible()) {
      await pageActions.clickElement(element, action);
    }
  }
);

export { defineStep };
