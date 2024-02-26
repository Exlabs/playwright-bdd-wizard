import { defineStep } from '@cucumber/cucumber';
import PageActions from '../helpers/PageActions.js';
import ProcessEnvironmentVariables from '../helpers/ProcessEnvironmentVariables.js';

defineStep(
  'I {string} the {string} element that contains {string}',
  async function (action: 'click' | 'dispatch click', field: string, text: string) {
    const element = await this.page.locator(field).filter({ containsText: text }).first();
    if (action === 'click') {
      await element.click();
      await this.page.waitForTimeout(3000);
    } else {
      await element.dispatchEvent('click');
    }
  }
);

defineStep(
  'I {string} the {string} element with {string} {string}',
  async function (
    action: 'click' | 'dispatch click',
    number: string,
    text: string,
    getBy: 'text' | 'label' | 'placeholder' | 'role' | 'CSS'
  ) {
    const processEnv = new ProcessEnvironmentVariables();
    text = await processEnv.getEnvVarOrDefault(text);
    const pageActions = new PageActions(this.page, this.context);
    const element = await pageActions.getNElementBy(getBy, parseInt(number), text);
    if (action === 'click') {
      await element.click();
    } else {
      await element.dispatchEvent('click');
    }
  }
);
export { defineStep };
