import { defineStep } from '@cucumber/cucumber';
import { PageActions, GetByType } from '../helpers/index.js';

defineStep('I fill in the {string}, version: {string} data', async function (name: string, version: string) {
  const pageActions = new PageActions(this.page);
  await pageActions.fillInFormData(name, parseInt(version));
});

defineStep(
  'I {string} {string} in the {string} element with {string} {string}',
  async function (
    action: 'type' | 'fill' | 'choose',
    text: string,
    number: string,
    elementData: string,
    getBy: GetByType
  ) {
    const pageActions = new PageActions(this.page);
    const element = await pageActions.getNElementBy(getBy, parseInt(number), elementData);

    switch (action) {
      case 'type':
        await element.type(text);
        break;
      case 'fill':
        await element.fill(text);
        break;
      case 'choose':
        await pageActions.fillADropDown(element, text);
        break;
      default:
        throw new Error(`Unsupported action: ${action}`);
    }
  }
);

defineStep('I fill {string} into the {string} dropdown', async function (value: string, label: string) {
  const pageActions = new PageActions(this.page);
  await pageActions.fillADropDown(this.page.getByLabel(label), value);
});

export { defineStep };
