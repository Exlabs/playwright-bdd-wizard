"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const index_js_1 = require("./index.js");
const index_js_2 = require("../testDataConfigs/index.js");
class PageActions {
    constructor(page, context) {
        this.page = page;
        this.context = context;
        this.generic = new index_js_1.Generic();
        this.processEnv = new index_js_1.ProcessEnvironmentVariables();
    }
    zoom(setting, milisecounds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.evaluate('document.body.style.zoom=' + setting);
            yield this.page.waitForTimeout(milisecounds);
        });
    }
    getNElementBy(getBy, N, text) {
        return __awaiter(this, void 0, void 0, function* () {
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
                case 'test ID':
                    return this.page.getByTestId(text).nth(sequence);
                case 'alternative text':
                    return this.page.getByAltText(text).nth(sequence);
                case 'title':
                    return this.page.getByTitle(text).nth(sequence);
                case 'locator':
                    return this.page.locator(text).nth(sequence);
            }
        });
    }
    getNPage(closeIt, N) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.context) {
                yield this.context.waitForEvent('page', { timeout: 1000 }).catch(() => null);
                const pages = this.context.pages();
                const newTab = pages[N - 1];
                if (closeIt) {
                    newTab.close();
                }
                return newTab;
            }
            else {
                throw new Error('chekNewTab, context is not defined');
            }
        });
    }
    elementIsVisible(getBy, elementNumber, text) {
        return __awaiter(this, void 0, void 0, function* () {
            let element = yield this.getNElementBy(getBy, elementNumber, text);
            return yield element.isVisible();
        });
    }
    testElementState(element, expectedState, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (expectedState) {
                case 'visible':
                    yield test_1.expect.soft(yield element).toBeVisible({ timeout: timeout });
                    break;
                case 'hidden':
                    yield test_1.expect.soft(yield element).toBeHidden({ timeout: timeout });
                    break;
                case 'editable':
                    yield test_1.expect.soft(yield element).toBeEditable({ timeout: timeout, editable: true });
                    break;
                case 'read-only':
                    yield test_1.expect.soft(yield element).toBeEditable({ timeout: timeout, editable: false });
                    break;
                case 'disabled':
                    yield test_1.expect.soft(yield element).toBeDisabled({ timeout: timeout });
                    break;
                case 'enabled':
                    yield test_1.expect.soft(yield element).toBeEnabled({ timeout: timeout });
            }
        });
    }
    isElementBecomingVisible(getBy, elementNumber, text, waitToBeVisible, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let is_visible = yield this.elementIsVisible(getBy, elementNumber, text);
            let timePerLoop = timeout / 10;
            let timeSpent = 0;
            if (waitToBeVisible) {
                while (!is_visible && timeout >= timeSpent) {
                    yield this.page.waitForTimeout(timePerLoop);
                    is_visible = yield this.elementIsVisible(getBy, elementNumber, text);
                    timeSpent += timePerLoop;
                }
            }
            else {
                while (is_visible && timeout > timeSpent) {
                    yield this.page.waitForTimeout(timePerLoop);
                    is_visible = yield this.elementIsVisible(getBy, elementNumber, text);
                    timeSpent += timePerLoop;
                }
            }
            return is_visible;
        });
    }
    waitForMessagesToDisappear(timeout = 30000, messages = (0, index_js_2.getLoadingMessages)()) {
        return __awaiter(this, void 0, void 0, function* () {
            const assertionMessage = `message stays visible for more than ${timeout}ms`;
            const startTime = Date.now();
            for (const message of messages) {
                const messageElement = this.page.getByText(message).first();
                const isVisitble = yield messageElement.isVisible();
                if (isVisitble) {
                    test_1.expect
                        .soft(yield this.isElementBecomingVisible('text', 1, message, false, timeout), `${message} ${assertionMessage}`)
                        .toBeFalsy();
                    const timeoutLeft = yield this.generic.timeDelta(startTime, timeout);
                    if (timeoutLeft <= 0) {
                        (0, test_1.expect)(timeoutLeft, `Messages keep appearing for more than ${timeout}ms`).toBeGreaterThan(0);
                    }
                    yield this.waitForMessagesToDisappear(timeoutLeft, messages);
                    break;
                }
            }
        });
    }
    saveCurrentURLToEnvAs(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.processEnv.set(name, this.page.url());
        });
    }
    waitForPageToLoad(timeout = 100000) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = Date.now();
            let timeoutLeft = yield this.generic.timeDelta(startTime, timeout);
            yield this.waitForMessagesToDisappear(timeoutLeft);
            timeoutLeft = yield this.generic.timeDelta(startTime, timeout);
            yield this.page.waitForLoadState('load', { timeout: timeoutLeft });
        });
    }
    fillADropDown(dropDownLocator, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataToFill = yield this.processEnv.getEnvVarOrDefault(value);
            yield dropDownLocator.fill(dataToFill);
            yield this.page.keyboard.press('ArrowDown');
            yield this.page.keyboard.press('Enter');
        });
    }
    isDropdownOptionAvailable(fieldLabel, option) {
        return __awaiter(this, void 0, void 0, function* () {
            const fieldLocator = this.page.getByLabel(fieldLabel);
            yield this.fillADropDown(fieldLocator, option);
            yield this.page.mouse.click(0, 0, { delay: 150 });
            yield this.page.waitForTimeout(200);
            const value = yield fieldLocator.getAttribute('value');
            return option === value;
        });
    }
    fillInFormData(name, version) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (0, index_js_2.getEntityData)(name, version);
            let nameSaved = false;
            for (const key in data) {
                if (!nameSaved) {
                    this.processEnv.set('latestName', data[key]);
                    nameSaved = true;
                }
                const fieldLocator = this.page.getByLabel(key);
                if ((yield fieldLocator.getAttribute('role')) === 'combobox') {
                    yield this.fillADropDown(fieldLocator, data[key]);
                }
                else {
                    yield fieldLocator.fill(data[key]);
                }
                yield this.page.waitForTimeout(150);
                (0, test_1.expect)(yield fieldLocator.inputValue(), `Couldnt type the ${data[key]}`).toEqual(data[key]);
            }
        });
    }
    checkTheFormData(name, version) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (0, index_js_2.getEntityData)(name, version);
            for (const key in data) {
                const value = (yield this.page.getByLabel(key).getAttribute('value'));
                test_1.expect
                    .soft(yield this.generic.isAsExpected(value, data[key]), `Unexpected value at ${name} form, version ${version}`)
                    .toBeTruthy();
            }
        });
    }
    checkLabels(locatorString, labels) {
        return __awaiter(this, void 0, void 0, function* () {
            const locator = this.page.locator(locatorString);
            const tabs = yield locator.allInnerTexts();
            for (let key in labels) {
                test_1.expect.soft(yield this.generic.isAsExpected(labels[key], tabs[key]), 'Unexpected label').toBeTruthy();
            }
        });
    }
    checkAmountOfElements(locatorString, labels) {
        return __awaiter(this, void 0, void 0, function* () {
            const locator = this.page.locator(locatorString);
            test_1.expect.soft(yield locator.count(), 'Unexpected count').toEqual(labels.length);
        });
    }
}
exports.default = PageActions;
