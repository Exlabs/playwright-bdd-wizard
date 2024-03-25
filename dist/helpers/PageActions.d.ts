import { Page, Locator, BrowserContext } from '@playwright/test';
import { Generic, Assertions, ProcessEnvironmentVariables } from './index.js';
export type GetByType = 'text' | 'label' | 'placeholder' | 'role' | 'test ID' | 'alternative text' | 'title' | 'locator';
export default class PageActions {
    readonly page: Page;
    readonly generic: Generic;
    readonly processEnv: ProcessEnvironmentVariables;
    readonly assertions: Assertions;
    private context?;
    constructor(page: Page, context?: BrowserContext);
    zoom(setting: string, milisecounds: number): Promise<void>;
    getNElementBy(getBy: GetByType, N: number, text: any): Promise<Locator>;
    getNPage(closeIt: boolean, N: number): Promise<Page>;
    saveCurrentURLToEnvAs(name: string): Promise<void>;
    waitForPageToLoad(timeout?: number): Promise<void>;
    checkIfMessagesDisappear(timeout?: number, messages?: string[]): Promise<void>;
    fillADropDown(dropDownLocator: Locator, value: string): Promise<void>;
    isDropdownOptionAvailable(fieldLabel: string, option: string): Promise<boolean>;
    fillInFormData(name: string, version: number): Promise<void>;
    checkTheFormData(entityName: string, version: number): Promise<void>;
}
