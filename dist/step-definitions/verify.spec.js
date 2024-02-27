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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineStep = void 0;
const cucumber_1 = require("@cucumber/cucumber");
Object.defineProperty(exports, "defineStep", { enumerable: true, get: function () { return cucumber_1.defineStep; } });
const test_1 = require("@playwright/test");
const Generic_js_1 = __importDefault(require("../helpers/Generic.js"));
const PageActions_js_1 = __importDefault(require("../helpers/PageActions.js"));
const tabsConfig_js_1 = __importDefault(require("../testDataConfigs/tabsConfig.js"));
const messagesConfig_js_1 = __importDefault(require("../testDataConfigs/messagesConfig.js"));
const ProcessEnvironmentVariables_js_1 = __importDefault(require("../helpers/ProcessEnvironmentVariables.js"));
(0, cucumber_1.defineStep)('I verify if a new tab which url {string} {string} opens', function (assertion, urlKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const generic = new Generic_js_1.default();
        const userUrl = yield generic.getUrlBasedOnUserInput(urlKey);
        const pageActions = new PageActions_js_1.default(this.page, this.context);
        const secoundTab = yield pageActions.getNPage(true, 2);
        test_1.expect.soft(yield generic.isAsExpected(secoundTab === null || secoundTab === void 0 ? void 0 : secoundTab.url(), userUrl, assertion)).toBeTruthy();
    });
});
(0, cucumber_1.defineStep)('I verify if URL {string} {string}', function (assertion, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const generic = new Generic_js_1.default();
        const expectedFullUrl = yield generic.getUrlBasedOnUserInput(name);
        let counter = 0;
        let result = false;
        do {
            let pageUrl = yield this.page.url();
            const generic = new Generic_js_1.default();
            if (assertion == 'equals') {
                result = yield generic.isAsExpected(pageUrl, expectedFullUrl, assertion);
            }
            else {
                result = yield generic.isAsExpected(pageUrl, expectedFullUrl, assertion);
            }
            if (result === true) {
                break;
            }
            counter++;
            yield this.page.waitForTimeout(400);
        } while (counter < 2);
        test_1.expect.soft(result).toBeTruthy();
    });
});
(0, cucumber_1.defineStep)('I verify the {string} tabs', function (dataKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new PageActions_js_1.default(this.page);
        const tabsData = (0, tabsConfig_js_1.default)(dataKey);
        yield pageActions.checkAmountOfElements(tabsData['locator'], tabsData['labels']);
        yield pageActions.checkLabels(tabsData['locator'], tabsData['labels']);
    });
});
(0, cucumber_1.defineStep)('I verify that a {string} element contains {string} image', function (element, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const imgDataIconAtributeValue = yield this.page.locator(element + '[role^="img"]').getAttribute('data-icon');
        test_1.expect.soft(imgDataIconAtributeValue).toEqual(text);
    });
});
(0, cucumber_1.defineStep)('I verify that a {string} element with {string} text {string} visible', function (elementType, text, visibility) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = (0, messagesConfig_js_1.default)(text);
        if (message) {
            text = message;
        }
        const element = yield this.page.locator(elementType).filter({ hasText: text }).first();
        if (visibility == 'is') {
            yield test_1.expect.soft(element, `${elementType} element with text - ${text} - should be visible`).toBeVisible();
        }
        else {
            yield test_1.expect
                .soft(element, `${elementType} element with text - ${text} - should not be visible`)
                .not.toBeVisible();
        }
    });
});
(0, cucumber_1.defineStep)('I verify the {string}, version: {string} data', function (name, version) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new PageActions_js_1.default(this.page);
        yield pageActions.checkTheFormData(name, parseInt(version));
    });
});
(0, cucumber_1.defineStep)('I verify that {string} element with {string} {string} is {string}', function (number, text, getBy, action) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new PageActions_js_1.default(this.page);
        const processEnv = new ProcessEnvironmentVariables_js_1.default();
        text = yield processEnv.getEnvVarOrDefault(text);
        const element = yield pageActions.getNElementBy(getBy, parseInt(number), text);
        const elementIsVisible = yield element.isVisible();
        const assertionMessage = `Element ${text} ${getBy} is not`;
        switch (action) {
            case 'visible':
                test_1.expect.soft(elementIsVisible, `${assertionMessage} visible`).toBeTruthy();
                break;
            case 'not visible':
                test_1.expect.soft(elementIsVisible, `${assertionMessage} visible`).toBeFalsy();
                break;
            case 'editable':
                test_1.expect.soft(element, `${assertionMessage} editable`).toBeEditable();
                break;
            case 'disabled':
                test_1.expect.soft(element, `${assertionMessage} disabled`).toBeDisabled();
        }
    });
});
(0, cucumber_1.defineStep)('I verify that {string} element with {string} {string} becomes {string} during {string} seconds', function (number, text, getBy, action, timeout) {
    return __awaiter(this, void 0, void 0, function* () {
        const timeoutInMs = timeout * 1000;
        const pageActions = new PageActions_js_1.default(this.page);
        const processEnv = new ProcessEnvironmentVariables_js_1.default();
        text = yield processEnv.getEnvVarOrDefault(text);
        const element = yield pageActions.getNElementBy(getBy, parseInt(number), text);
        const assertionMessage = `Element ${text} ${getBy} didnt become`;
        switch (action) {
            case 'visible':
                test_1.expect
                    .soft(yield pageActions.isElementBecomingVisible(element, true, timeoutInMs), `${assertionMessage} visible`)
                    .toBeTruthy();
                break;
            case 'hidden':
                test_1.expect
                    .soft(yield pageActions.isElementBecomingVisible(element, false, timeoutInMs), `${assertionMessage} hidden`)
                    .toBeFalsy();
                break;
        }
    });
});
(0, cucumber_1.defineStep)('I verify that {string} field, {string} drop down option {string} available', function (fieldLabel, dropDownOption, toBeAvailable) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new PageActions_js_1.default(this.page);
        const is_available = yield pageActions.isDropdownOptionAvailable(fieldLabel, dropDownOption);
        if (toBeAvailable == 'is') {
            test_1.expect.soft(is_available, `${dropDownOption} option is not visible in the ${fieldLabel} dropdown`).toBeTruthy();
        }
        else {
            test_1.expect
                .soft(is_available, `${dropDownOption} option is available in the ${fieldLabel} dropdown but it shouldnt`)
                .toBeFalsy();
        }
    });
});
