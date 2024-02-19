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
const index_js_1 = require("../helpers/index.js");
(0, cucumber_1.defineStep)('I get a part of the URL based on {string} regular expression and save it as {string}', function (regExp, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = yield this.page.url();
        const generic = new index_js_1.Generic();
        const value = yield generic.getSubString(url, regExp);
        if (value) {
            const processEnv = new index_js_1.ProcessEnvironmentVariables();
            yield processEnv.set(name, value);
        }
        else {
            console.error(`Error: Step - I get a part of the URL based on ${regExp} regular expression and save it as ${name} - was called but the value was empty`);
        }
    });
});
(0, cucumber_1.defineStep)('I open {string} page', function (page) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new index_js_1.PageActions(this.page);
        const generic = new index_js_1.Generic();
        const url = yield generic.getUrlBasedOnUserInput(page);
        yield this.page.goto(url);
        yield pageActions.waitForPageToLoad();
    });
});
(0, cucumber_1.defineStep)('I go back in the browser', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.goBack();
        const pageActions = new index_js_1.PageActions(this.page);
        yield pageActions.waitForPageToLoad();
    });
});
(0, cucumber_1.defineStep)('I save the current url as {string}', function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new index_js_1.PageActions(this.page);
        yield pageActions.saveCurrentURLToEnvAs(name);
    });
});
(0, cucumber_1.defineStep)('I zoom to {string} in the browser', function (zoom) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new index_js_1.PageActions(this.page);
        yield pageActions.zoom(zoom, 1800);
    });
});
(0, cucumber_1.defineStep)('I reload the page', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.reload();
        const pageActions = new index_js_1.PageActions(this.page);
        yield pageActions.waitForPageToLoad();
    });
});
(0, cucumber_1.defineStep)('I wait {string} seconds', function (seconds) {
    return __awaiter(this, void 0, void 0, function* () {
        const msInteger = Math.floor(parseFloat(seconds) * 1000);
        yield this.page.waitForTimeout(msInteger, { timeout: msInteger });
    });
});
(0, cucumber_1.defineStep)('I wait for the page to load', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new index_js_1.PageActions(this.page);
        yield pageActions.waitForPageToLoad();
    });
});
(0, cucumber_1.defineStep)('I {string} {string} on the keyboard', function (action, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const processEnv = new index_js_1.ProcessEnvironmentVariables();
        const resolvedText = yield processEnv.getEnvVarOrDefault(text);
        if (action === 'type') {
            yield this.page.keyboard.type(resolvedText);
        }
        else {
            yield this.page.keyboard.press(text);
        }
    });
});
