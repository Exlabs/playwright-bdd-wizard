import { defineStep } from '@cucumber/cucumber';
import PageActions from '../helpers/PageActions.js';
import Generic from '../helpers/Generic.js';
import ProcessEnvironmentVariables from '../helpers/ProcessEnvironmentVariables.js';
import getUrl from '../testDataConfigs/urlConfig.js';

defineStep(
  'I get a part of the URL based on {string} regular expression and save it as {string}',
  async function (regExp: RegExp, name: string) {
    const url = await this.page.url();
    const generic = new Generic();
    const value = await generic.getSubString(url, regExp);
    if (value) {
      const processEnv = new ProcessEnvironmentVariables();
      await processEnv.set(name, value);
    } else {
      console.error(
        `Error: Step - I get a part of the URL based on ${regExp} regular expression and save it as ${name} - was called but the value was empty`
      );
    }
  }
);

defineStep('I open {string} page', async function (page: string) {
  const pageActions = new PageActions(this.page);
  const baseUrl = getUrl('main');
  const pageUrl = getUrl(page);
  const savedURL = process.env[page];
  if (savedURL) {
    await this.page.goto(savedURL);
    return;
  }
  if (page.includes('http')) {
    await this.page.goto(page);
    return;
  }
  let url = '';
  if (pageUrl.includes('http')) {
    url = pageUrl;
  } else if (pageUrl || !pageUrl.includes('http')) {
    url = baseUrl + pageUrl;
  } else {
    console.error(`Error: Step - I open ${page} page`);
    return;
  }
  await pageActions.waitForPageToLoad();
  await this.page.waitForURL(url);
});

defineStep('I go back in the browser', async function () {
  await this.page.goBack();
  const pageActions = new PageActions(this.page);
  await pageActions.waitForPageToLoad();
});

defineStep('I save the current url as {string}', async function (name: string) {
  const pageActions = new PageActions(this.page);
  await pageActions.saveCurrentURLToEnvAs(name);
});

defineStep('I zoom to {string} in the browser', async function (zoom: string) {
  const pageActions = new PageActions(this.page);
  await pageActions.zoom(zoom, 1800);
});

defineStep('I reload the page', async function (ms: string) {
  await this.page.reload();
  const pageActions = new PageActions(this.page);
  await pageActions.waitForPageToLoad();
});

defineStep('I wait {string} seconds', async function (seconds: string) {
  const msInteger = Math.floor(parseFloat(seconds) * 1000);
  await this.page.waitForTimeout(msInteger, { timeout: msInteger });
});

defineStep('I wait for the page to load', async function () {
  const pageActions = new PageActions(this.page);
  await pageActions.waitForPageToLoad();
});

defineStep('I {string} {string} on the keyboard', async function (action: 'type' | 'press', text: string) {
  if (action === 'type') {
    await this.page.keyboard.type(text);
  } else {
    await this.page.keyboard.press(text);
  }
});
export { defineStep };
