import { Page, Locator, BrowserContext } from '@playwright/test';
import { Generic, ProcessEnvironmentVariables } from './index.js';
export type GetByType = 'text' | 'label' | 'placeholder' | 'role' | 'test ID' | 'alternative text' | 'title' | 'locator';
export type ElementStatesType = 'visible' | 'hidden' | 'editable' | 'disabled' | 'enabled' | 'read-only';
export default class PageActions {
    readonly page: Page;
    readonly generic: Generic;
    readonly processEnv: ProcessEnvironmentVariables;
    private context?;
    constructor(page: Page, context?: BrowserContext);
    zoom(setting: string, milisecounds: number): Promise<void>;
    getNElementBy(getBy: GetByType, N: number, text: any): Promise<Locator>;
    getNPage(closeIt: boolean, N: number): Promise<Page>;
    elementIsVisible(getBy: GetByType, elementNumber: number, text: string): Promise<boolean>;
    testElementState(element: Promise<Locator>, expectedState: ElementStatesType, timeout: number): Promise<void>;
    isElementBecomingVisible(getBy: GetByType, elementNumber: number, text: string, waitToBeVisible: boolean, timeout: number): Promise<boolean>;
    waitForMessagesToDisappear(timeout?: number, messages?: string[]): Promise<void>;
    saveCurrentURLToEnvAs(name: string): Promise<void>;
    waitForPageToLoad(timeout?: number): Promise<void>;
    fillADropDown(dropDownLocator: Locator, value: string): Promise<void>;
    isDropdownOptionAvailable(fieldLabel: string, option: string): Promise<boolean>;
    fillInFormData(name: string, version: number): Promise<void>;
    checkTheFormData(name: string, version: number): Promise<void>;
    checkLabels(locatorString: string, labels: Array<string>): Promise<void>;
    checkAmountOfElements(locatorString: string, labels: Array<string>): Promise<void>;
}
