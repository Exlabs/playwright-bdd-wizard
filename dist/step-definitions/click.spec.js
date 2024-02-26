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
const PageActions_js_1 = __importDefault(require("../helpers/PageActions.js"));
const ProcessEnvironmentVariables_js_1 = __importDefault(require("../helpers/ProcessEnvironmentVariables.js"));
(0, cucumber_1.defineStep)('I {string} the {string} element that contains {string}', function (action, field, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const element = yield this.page.locator(field).filter({ containsText: text }).first();
        if (action === 'click') {
            yield element.click();
            yield this.page.waitForTimeout(3000);
        }
        else {
            yield element.dispatchEvent('click');
        }
    });
});
(0, cucumber_1.defineStep)('I {string} the {string} element with {string} {string}', function (action, number, text, getBy) {
    return __awaiter(this, void 0, void 0, function* () {
        const processEnv = new ProcessEnvironmentVariables_js_1.default();
        text = yield processEnv.getEnvVarOrDefault(text);
        const pageActions = new PageActions_js_1.default(this.page, this.context);
        const element = yield pageActions.getNElementBy(getBy, parseInt(number), text);
        if (action === 'click') {
            yield element.click();
        }
        else {
            yield element.dispatchEvent('click');
        }
    });
});
