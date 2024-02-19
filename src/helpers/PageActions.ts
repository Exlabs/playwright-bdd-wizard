import { Page, expect, Locator, BrowserContext } from '@playwright/test';
import Generic from './Generic.js';
import ProcessEnvironmentVariables from './ProcessEnvironmentVariables.js';
import getLoadingMessages from '../testDataConfigs/loadingMessagesConfig.js';
import getEntityData from '../testDataConfigs/testDataConfig.js';
export default class PageActions {
  readonly page: Page;
  readonly generic: Generic;
  readonly processEnv: ProcessEnvironmentVariables;
  private context?: BrowserContext;

  constructor(page: Page, context?: BrowserContext) {
    this.page = page;
    this.context = context;
    this.generic = new Generic();
    this.processEnv = new ProcessEnvironmentVariables();
  }

  async zoom(setting: string, milisecounds: number) {
    await this.page.evaluate('document.body.style.zoom=' + setting);
    await this.page.waitForTimeout(milisecounds);
  }

  async getNElementBy(getBy: 'text' | 'label' | 'placeholder' | 'role' | 'CSS', N: number, text: any) {
    const sequence = Number(N) - 1;
    switch (getBy) {
      case 'text':
        return this.page.getByText(text).nth(sequence);
      case 'label':
        return this.page.getByLabel(text).nth(sequence);
      case 'placeholder':
        return this.page.getByPlaceholder(text).nth(sequence);
      case 'role':
        return this.page.getByRole(text).nth(sequence);
      case 'CSS':
        return this.page.locator(text).nth(sequence);
    }
  }

  async getNPage(closeIt: boolean, N: number) {
    if (this.context) {
      await this.context.waitForEvent('page', { timeout: 1000 }).catch(() => null);
      const pages = this.context.pages();
      const newTab = pages[N - 1];
      if (closeIt) {
        newTab.close();
      }
      return newTab;
    } else {
      throw new Error('chekNewTab, context is not defined');
    }
  }

  async isElementBecomingVisible(elementLocator: Locator, waitToBeVisible: boolean, timeout: number) {
    let is_visible = await elementLocator.isVisible();
    let timePerLoop = timeout / 10;
    let timeSpent = 0;
    if (waitToBeVisible) {
      while (!is_visible && timeout >= timeSpent) {
        await this.page.waitForTimeout(timePerLoop);
        is_visible = await elementLocator.isVisible();
        timeSpent += timePerLoop;
      }
    } else {
      while (is_visible && timeout > timeSpent) {
        await this.page.waitForTimeout(timePerLoop);
        is_visible = await elementLocator.isVisible();
        timeSpent += timePerLoop;
      }
    }
    return is_visible;
  }

  async waitForMessagesToDisappear(timeout: number = 30000) {
    const messages = getLoadingMessages();
    const assertionMessage = `message stays visible for more than ${timeout}ms`;
    const startTime = Date.now();
    for (const message of messages) {
      const messageElement = this.page.getByText(message).first();
      const isVisitble = await messageElement.isVisible();
      if (isVisitble) {
        expect
          .soft(await this.isElementBecomingVisible(messageElement, false, timeout), `${message} ${assertionMessage}`)
          .toBeFalsy();
        const timeoutLeft = await this.generic.timeDelta(startTime, timeout);
        if (timeoutLeft <= 0) {
          expect(timeoutLeft, `Messages keep appearing for more than ${timeout}ms`).toBeGreaterThan(0);
        }
        await this.waitForMessagesToDisappear(timeoutLeft);
        break;
      }
    }
  }

  async saveCurrentURLToEnvAs(name: string) {
    await this.processEnv.set(name, this.page.url());
  }

  async waitForPageToLoad(timeout: number = 100000) {
    const startTime = Date.now();
    let timeoutLeft = await this.generic.timeDelta(startTime, timeout);
    await this.waitForMessagesToDisappear(timeoutLeft);
    timeoutLeft = await this.generic.timeDelta(startTime, timeout);
    await this.page.waitForLoadState('load', { timeout: timeoutLeft });
  }

  async fillADropDown(dropDownLocator: Locator, value: string) {
    let dataToFill = await this.processEnv.getEnvVarOrDefault(value);
    await dropDownLocator.fill(dataToFill);
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  }

  async isDropdownOptionAvailable(fieldLabel: string, option: string) {
    const fieldLocator = this.page.getByLabel(fieldLabel);
    await this.fillADropDown(fieldLocator, option);
    await this.page.mouse.click(0, 0, { delay: 150 });
    await this.page.waitForTimeout(200);
    const value = await fieldLocator.getAttribute('value');
    return option === value;
  }

  async fillInFormData(name: string, version: number) {
    const data = getEntityData(name, version);
    let nameSaved = false;
    for (const key in data) {
      if (!nameSaved) {
        this.processEnv.set('latestName', data[key]);
        nameSaved = true;
      }
      const fieldLocator = this.page.getByLabel(key);
      if ((await fieldLocator.getAttribute('role')) === 'combobox') {
        await this.fillADropDown(fieldLocator, data[key]);
      } else {
        await fieldLocator.fill(data[key]);
      }
      await this.page.waitForTimeout(150);
      expect(await fieldLocator.inputValue(), `Couldnt type the ${data[key]}`).toEqual(data[key]);
    }
  }

  async checkTheFormData(name: string, version: number) {
    const data = getEntityData(name, version);
    for (const key in data) {
      const value = (await this.page.getByLabel(key).getAttribute('value')) as string;
      expect
        .soft(await this.generic.isAsExpected(value, data[key]), `Unexpected value at ${name} form, version ${version}`)
        .toBeTruthy();
    }
  }

  async checkLabels(locatorString: string, labels: Array<string>) {
    const locator = this.page.locator(locatorString);
    const tabs = await locator.allInnerTexts();
    for (let key in labels) {
      expect.soft(await this.generic.isAsExpected(labels[key], tabs[key]), 'Unexpected label').toBeTruthy();
    }
  }

  async checkAmountOfElements(locatorString: string, labels: Array<string>) {
    const locator = this.page.locator(locatorString);
    expect.soft(await locator.count(), 'Unexpected count').toEqual(labels.length);
  }
}
