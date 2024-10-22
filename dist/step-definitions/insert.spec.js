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
(0, cucumber_1.defineStep)('I fill in the {string}, version: {string} data', function (name, version) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new index_js_1.PageActions(this.page);
        yield pageActions.fillInFormData(name, parseInt(version));
    });
});
(0, cucumber_1.defineStep)('I {string} {string} in the {string} element with {string} {string}', function (action, text, number, elementData, getBy) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new index_js_1.PageActions(this.page);
        const element = yield pageActions.getNElementBy(getBy, parseInt(number), elementData);
        switch (action) {
            case 'type':
                yield element.type(text);
                break;
            case 'fill':
                yield element.fill(text);
                break;
            case 'choose':
                yield pageActions.fillADropDown(element, text);
                break;
            default:
                throw new Error(`Unsupported action: ${action}`);
        }
    });
});
(0, cucumber_1.defineStep)('I fill {string} into the {string} dropdown', function (value, label) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new index_js_1.PageActions(this.page);
        yield pageActions.fillADropDown(this.page.getByLabel(label), value);
    });
});
