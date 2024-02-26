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
const Generic_js_1 = __importDefault(require("../helpers/Generic.js"));
const ProcessEnvironmentVariables_js_1 = __importDefault(require("../helpers/ProcessEnvironmentVariables.js"));
const urlConfig_js_1 = __importDefault(require("../testDataConfigs/urlConfig.js"));
(0, cucumber_1.defineStep)('I get a part of the URL based on {string} regular expression and save it as {string}', function (regExp, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = yield this.page.url();
        const generic = new Generic_js_1.default();
        const value = yield generic.getSubString(url, regExp);
        if (value) {
            const processEnv = new ProcessEnvironmentVariables_js_1.default();
            yield processEnv.set(name, value);
        }
        else {
            console.error(`Error: Step - I get a part of the URL based on ${regExp} regular expression and save it as ${name} - was called but the value was empty`);
        }
    });
});
(0, cucumber_1.defineStep)('I open {string} page', function (page) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new PageActions_js_1.default(this.page);
        const baseUrl = (0, urlConfig_js_1.default)('main');
        const pageUrl = (0, urlConfig_js_1.default)(page);
        const savedURL = process.env[page];
        if (savedURL) {
            yield this.page.goto(savedURL);
            return;
        }
        if (page.includes('http')) {
            yield this.page.goto(page);
            return;
        }
        let url = '';
        if (pageUrl.includes('http')) {
            url = pageUrl;
        }
        else {
            url = baseUrl + pageUrl;
        }
        if (url === '') {
            console.error(`Error: Step - I open ${page} page`);
            return;
        }
        yield this.page.goto(url);
        yield pageActions.waitForPageToLoad();
        yield this.page.waitForURL(url);
    });
});
(0, cucumber_1.defineStep)('I go back in the browser', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.goBack();
        const pageActions = new PageActions_js_1.default(this.page);
        yield pageActions.waitForPageToLoad();
    });
});
(0, cucumber_1.defineStep)('I save the current url as {string}', function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new PageActions_js_1.default(this.page);
        yield pageActions.saveCurrentURLToEnvAs(name);
    });
});
(0, cucumber_1.defineStep)('I zoom to {string} in the browser', function (zoom) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new PageActions_js_1.default(this.page);
        yield pageActions.zoom(zoom, 1800);
    });
});
(0, cucumber_1.defineStep)('I reload the page', function (ms) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.reload();
        const pageActions = new PageActions_js_1.default(this.page);
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
        const pageActions = new PageActions_js_1.default(this.page);
        yield pageActions.waitForPageToLoad();
    });
});
(0, cucumber_1.defineStep)('I {string} {string} on the keyboard', function (action, text) {
    return __awaiter(this, void 0, void 0, function* () {
        if (action === 'type') {
            yield this.page.keyboard.type(text);
        }
        else {
            yield this.page.keyboard.press(text);
        }
    });
});
