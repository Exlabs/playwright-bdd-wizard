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
(0, cucumber_1.defineStep)('I {string} the {string} element that contains {string}', function (action, field, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const element = yield this.page.locator(field).filter({ containsText: text }).first();
        const pageActions = new index_js_1.PageActions(this.page, this.context);
        if (element) {
            yield pageActions.clickElement(element, action);
            yield this.page.waitForTimeout(3000);
        }
        else {
            throw new Error(`Element with ${text} text not found`);
        }
    });
});
(0, cucumber_1.defineStep)('I click on the top left corner of the page', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.mouse.click(0, 0);
    });
});
(0, cucumber_1.defineStep)('I {string} the {string} element with {string} {string}', function (action, number, text, getBy) {
    return __awaiter(this, void 0, void 0, function* () {
        const processEnv = new index_js_1.ProcessEnvironmentVariables();
        const resolvedText = yield processEnv.getEnvVarOrDefault(text);
        const pageActions = new index_js_1.PageActions(this.page, this.context);
        const element = yield pageActions.getNElementBy(getBy, parseInt(number), resolvedText);
        if (element) {
            yield pageActions.clickElement(element, action);
        }
        else {
            throw new Error(`Element with ${getBy} ${text} not found`);
        }
    });
});
(0, cucumber_1.defineStep)('If its visible, I {string} the {string} element with {string} {string}', function (action, number, text, getBy) {
    return __awaiter(this, void 0, void 0, function* () {
        const processEnv = new index_js_1.ProcessEnvironmentVariables();
        const resolvedText = yield processEnv.getEnvVarOrDefault(text);
        const pageActions = new index_js_1.PageActions(this.page, this.context);
        const element = yield pageActions.getNElementBy(getBy, parseInt(number), resolvedText);
        if (yield element.isVisible()) {
            yield pageActions.clickElement(element, action);
        }
    });
});
