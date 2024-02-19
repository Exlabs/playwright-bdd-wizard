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
const PageActions_1 = __importDefault(require("../helpers/PageActions"));
(0, cucumber_1.defineStep)('I fill in the {string}, version: {string} data', function (name, version) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new PageActions_1.default(this.page);
        yield pageActions.fillInFormData(name, parseInt(version));
    });
});
(0, cucumber_1.defineStep)('I type {string} on the keyboard', function (text) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.page.keyboard.type(text);
    });
});
(0, cucumber_1.defineStep)('I {string} {string} in the {string} element with {string} {string}', function (action, text, number, elementData, getBy) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new PageActions_1.default(this.page);
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
        }
    });
});
(0, cucumber_1.defineStep)('I fill {string} into the {string} dropdown', function (value, label) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageActions = new PageActions_1.default(this.page);
        yield pageActions.fillADropDown(this.page.getByLabel(label), value);
    });
});
