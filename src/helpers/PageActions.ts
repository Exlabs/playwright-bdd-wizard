import { Page, Locator, BrowserContext } from '@playwright/test';
import { Generic, Assertions, ProcessEnvironmentVariables } from './index.js';
import { getEntityData, getLoadingMessages } from '../test-data-configs/index.js';

export type GetByType =
  | 'text'
  | 'label'
  | 'placeholder'
  | 'role'
  | 'test ID'
  | 'alternative text'
  | 'title'
  | 'locator';
export type ClickActionType = 'click' | 'dispatch click' | 'force click' | 'force dispatch click';
type RoleType =
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'blockquote'
  | 'button'
  | 'caption'
  | 'cell'
  | 'checkbox'
  | 'code'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'deletion'
  | 'dialog'
  | 'directory'
  | 'document'
  | 'emphasis'
  | 'feed'
  | 'figure'
  | 'form'
  | 'generic'
  | 'grid'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'insertion'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'main'
  | 'marquee'
  | 'math'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'navigation'
  | 'none'
  | 'note'
  | 'option'
  | 'paragraph'
  | 'presentation'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'scrollbar'
  | 'search'
  | 'searchbox'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'strong'
  | 'subscript'
  | 'superscript'
  | 'switch'
  | 'tab'
  | 'table'
  | 'tablist'
  | 'tabpanel'
  | 'term'
  | 'textbox'
  | 'time'
  | 'timer'
  | 'toolbar'
  | 'tooltip'
  | 'tree'
  | 'treegrid'
  | 'treeitem';

export default class PageActions {
  readonly page: Page;
  readonly generic: Generic;
  readonly processEnv: ProcessEnvironmentVariables;
  readonly assertions: Assertions;
  private context?: BrowserContext;

  constructor(page: Page, context?: BrowserContext) {
    this.page = page;
    this.context = context;
    this.generic = new Generic();
    this.processEnv = new ProcessEnvironmentVariables();
    this.assertions = new Assertions();
  }

  async zoom(setting: string, milisecounds: number) {
    await this.page.evaluate('document.body.style.zoom=' + setting);
    await this.page.waitForTimeout(milisecounds);
  }

  async getNElementBy(getBy: GetByType, N: number, text: string) {
    const sequence = Number(N) - 1;
    switch (getBy) {
      case 'text':
        return this.page.getByText(text).nth(sequence);
      case 'label':
        return this.page.getByLabel(text).nth(sequence);
      case 'placeholder':
        return this.page.getByPlaceholder(text).nth(sequence);
      case 'role':
        return this.page.getByRole(text as RoleType).nth(sequence);
      case 'test ID':
        return this.page.getByTestId(text).nth(sequence);
      case 'alternative text':
        return this.page.getByAltText(text).nth(sequence);
      case 'title':
        return this.page.getByTitle(text).nth(sequence);
      case 'locator':
        return this.page.locator(text).nth(sequence);
    }
  }

  async clickElement(element: Locator, clickAction: ClickActionType) {
    switch (clickAction) {
      case 'click':
        return await element.click();
      case 'dispatch click':
        return await element.dispatchEvent('click');
      case 'force click':
        return await element.click({ force: true });
      case 'force dispatch click':
        return await element.dispatchEvent('click', { force: true });
    }
  }

  async getNPage(closeIt: boolean, N: number) {
    if (!this.context) {
      throw new Error('getNPage, context is not defined');
    }

    await this.context.waitForEvent('page', { timeout: 1000 }).catch(() => null);
    const pages = this.context.pages();
    const newTab = pages[N - 1];

    if (closeIt) {
      newTab.close();
    }

    return newTab;
  }

  async saveCurrentURLToEnvAs(name: string) {
    await this.processEnv.set(name, this.page.url());
  }

  async waitForPageToLoad(timeout: number = 100000) {
    const startTime = Date.now();
    await this.checkIfMessagesDisappear(timeout);
    const timeoutLeft = await this.generic.timeDelta(startTime, timeout);
    await this.page.waitForLoadState('load', { timeout: timeoutLeft });
  }

  async checkIfMessagesDisappear(timeout: number = 30000, messages: string[] = getLoadingMessages()) {
    const startTime = Date.now();
    for (const message of messages) {
      const elementPromise = this.getNElementBy('text', 1, message);
      const element = await elementPromise;

      if (await element.isVisible({ timeout: 0 })) {
        const assertionMessage = `${message} element stays visible for more than ${timeout}ms`;
        await this.assertions.checkElementState(elementPromise, 'hidden', timeout, assertionMessage);
        timeout = await this.generic.timeDelta(startTime, timeout);
        await this.assertions.checkValue(timeout, 0, 'greaterThanZero', 'Loading messages were appearing for too long');
        await this.checkIfMessagesDisappear(timeout, messages);
        break;
      }
    }
  }

  async fillADropDown(dropDownLocator: Locator, value: string) {
    const dataToFill = await this.processEnv.getEnvVarOrDefault(value);
    await dropDownLocator.fill(dataToFill);
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  }

  async isDropdownOptionAvailable(fieldLabel: string, option: string) {
    const fieldLocator = this.page.getByLabel(fieldLabel).last();
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
      const value = data[key];
      if (!nameSaved) {
        this.processEnv.set('latestName', value);
        nameSaved = true;
      }

      const fieldLocator = this.page.getByLabel(key).last();
      if ((await fieldLocator.getAttribute('role')) === 'combobox') {
        await this.fillADropDown(fieldLocator, value);
      } else {
        await fieldLocator.fill(data[key]);
      }

      await this.page.waitForTimeout(150);
      if ((await fieldLocator.inputValue()) !== value) {
        console.error(`Couldnt type the ${data[key]}`);
      }
    }
  }

  async checkTheFormData(entityName: string, version: number) {
    const data = getEntityData(entityName, version);
    for (const key in data) {
      const value = (await this.page.getByLabel(key).getAttribute('value')) as string;
      await this.assertions.checkValue(value, data[key]),
        'equals',
        `Unexpected value at ${entityName} form, version ${version}`;
    }
  }
}
