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
exports.defineStep = void 0;
const cucumber_1 = require("@cucumber/cucumber");
Object.defineProperty(exports, "defineStep", { enumerable: true, get: function () { return cucumber_1.defineStep; } });
const test_1 = require("@playwright/test");
const index_js_1 = require("../helpers/index.js");
const index_js_2 = require("../testDataConfigs/index.js");
(0, cucumber_1.defineStep)('I verify if a new tab which url {string} {string} opens', function (assertion, urlKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const generic = new index_js_1.Generic();
        const userUrl = yield generic.getUrlBasedOnUserInput(urlKey);
        const pageActions = new index_js_1.PageActions(this.page, this.context);
        const secoundTab = yield pageActions.getNPage(true, 2);
        test_1.expect.soft(yield generic.isAsExpected(secoundTab === null || secoundTab === void 0 ? void 0 : secoundTab.url(), userUrl, assertion)).toBeTruthy();
    });
});
(0, cucumber_1.defineStep)('I verify if URL {string} {string}', function (assertion, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const generic = new index_js_1.Generic();
        const url = yield generic.getUrlBasedOnUserInput(name);
        const pageUrl = yield this.page.url();
        let counter = 0;
        let result = false;
        do {
            result = yield generic.isAsExpected(pageUrl, url, assertion);
            if (result === true) {
                break;
            }
            counter++;
            yield this.page.waitForTimeout(400);
        } while (counter < 2);
        test_1.expect
            .soft(result, `The page URL ${assertion} ${name} failed. Expected ${pageUrl} to ${assertion} ${url}`)
            .toBeTruthy();
    });
});
(0, cucumber_1.defineStep)('I verify the {string} tabs', function (dataKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new index_js_1.PageActions(this.page);
        const tabsData = (0, index_js_2.getTabs)(dataKey);
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
        const message = (0, index_js_2.getMessage)(text);
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
        const pageActions = new index_js_1.PageActions(this.page);
        yield pageActions.checkTheFormData(name, parseInt(version));
    });
});
(0, cucumber_1.defineStep)('I verify that {string} element with {string} {string} is {string}', function (number, text, getBy, expectedState) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new index_js_1.PageActions(this.page);
        const processEnv = new index_js_1.ProcessEnvironmentVariables();
        text = yield processEnv.getEnvVarOrDefault(text);
        const element = pageActions.getNElementBy(getBy, parseInt(number), text);
        yield pageActions.testElementState(element, expectedState, 0);
    });
});
(0, cucumber_1.defineStep)('I verify that {string} element with {string} {string} becomes {string} during {string} seconds', function (number, text, getBy, expectedState, timeout) {
    return __awaiter(this, void 0, void 0, function* () {
        const timeoutInMs = timeout * 1000;
        const pageActions = new index_js_1.PageActions(this.page);
        const processEnv = new index_js_1.ProcessEnvironmentVariables();
        text = yield processEnv.getEnvVarOrDefault(text);
        const element = pageActions.getNElementBy(getBy, parseInt(number), text);
        yield pageActions.testElementState(element, expectedState, timeoutInMs);
    });
});
(0, cucumber_1.defineStep)('I verify that {string} field, {string} drop down option {string} available', function (fieldLabel, dropDownOption, toBeAvailable) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new index_js_1.PageActions(this.page);
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
