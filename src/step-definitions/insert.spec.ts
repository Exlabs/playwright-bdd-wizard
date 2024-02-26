import { defineStep } from '@cucumber/cucumber';
import PageActions from '../helpers/PageActions';

defineStep('I fill in the {string}, version: {string} data', async function (name: string, version: string) {
  const pageActions = new PageActions(this.page);
  await pageActions.fillInFormData(name, parseInt(version));
});

defineStep('I type {string} on the keyboard', async function (text: string) {
  await this.page.keyboard.type(text);
});

defineStep(
  'I {string} {string} in the {string} element with {string} {string}',
  async function (
    action: 'type' | 'fill' | 'choose',
    text: string,
    number: string,
    elementData: string,
    getBy: 'text' | 'label' | 'placeholder' | 'role' | 'CSS'
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
    }
  }
);

defineStep('I fill {string} into the {string} dropdown', async function (value: string, label: string) {
  const pageActions = new PageActions(this.page);
  await pageActions.fillADropDown(this.page.getByLabel(label), value);
});
export { defineStep };
