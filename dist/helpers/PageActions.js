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
const index_js_1 = require("./index.js");
const index_js_2 = require("../testDataConfigs/index.js");
class PageActions {
    constructor(page, context) {
        this.page = page;
        this.context = context;
        this.generic = new index_js_1.Generic();
        this.processEnv = new index_js_1.ProcessEnvironmentVariables();
        this.assertions = new index_js_1.Assertions();
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
    clickElement(element, clickAction) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (clickAction) {
                case 'click':
                    return yield element.click();
                case 'dispatch click':
                    return yield element.dispatchEvent('click');
                case 'force click':
                    return yield element.click({ force: true });
                case 'force dispatch click':
                    return yield element.dispatchEvent('click', { force: true });
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
                throw new Error('getNPage, context is not defined');
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
            yield this.checkIfMessagesDisappear(timeout);
            const timeoutLeft = yield this.generic.timeDelta(startTime, timeout);
            yield this.page.waitForLoadState('load', { timeout: timeoutLeft });
        });
    }
    checkIfMessagesDisappear(timeout = 30000, messages = (0, index_js_2.getLoadingMessages)()) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = Date.now();
            for (const message of messages) {
                const elementPromise = this.getNElementBy('text', 1, message);
                const element = yield elementPromise;
                if (yield element.isVisible({ timeout: 0 })) {
                    const assertionMessage = `${message} element stays visible for more than ${timeout}ms`;
                    yield this.assertions.checkElementState(elementPromise, 'hidden', timeout, assertionMessage);
                    timeout = yield this.generic.timeDelta(startTime, timeout);
                    yield this.assertions.checkValue(timeout, 0, 'greaterThanZero', 'Loading messages were appearing for too long');
                    yield this.checkIfMessagesDisappear(timeout, messages);
                    break;
                }
            }
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
                if ((yield fieldLocator.inputValue()) !== data[key]) {
                    console.error(`Couldnt type the ${data[key]}`);
                }
            }
        });
    }
    checkTheFormData(entityName, version) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (0, index_js_2.getEntityData)(entityName, version);
            for (const key in data) {
                const value = (yield this.page.getByLabel(key).getAttribute('value'));
                yield this.assertions.checkValue(value, data[key]),
                    'equals',
                    `Unexpected value at ${entityName} form, version ${version}`;
            }
        });
    }
}
exports.default = PageActions;
