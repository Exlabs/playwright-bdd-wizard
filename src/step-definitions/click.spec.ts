import { defineStep } from '@cucumber/cucumber';
import PageActions from '../helpers/PageActions.js';
import ProcessEnvironmentVariables from '../helpers/ProcessEnvironmentVariables.js';

defineStep(
  'I {string} the {string} element that contains {string}',
  async function (action: 'click' | 'dispatch click', field: string, text: string) {
    console.log(" 1 clicking the element")
    const element = await this.page.locator(field).filter({ containsText: text }).first();
    console.log(" 2 clicking the element")
    console.log("element", element)
    if (action === 'click') {
      console.log(" 3 clicking the element")
      await element.click();
      console.log(" 4 clicking the element")
      await this.page.waitForTimeout(3000)
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
