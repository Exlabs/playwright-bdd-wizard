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
class Assertions {
    checkElementState(element_1, expectedState_1, timeout_1) {
        return __awaiter(this, arguments, void 0, function* (element, expectedState, timeout, message = `Element state assertion failed`) {
            switch (expectedState) {
                case 'visible':
                    yield test_1.expect.soft(yield element, message).toBeVisible({ timeout: timeout });
                    break;
                case 'hidden':
                    yield test_1.expect.soft(yield element, message).toBeHidden({ timeout: timeout });
                    break;
                case 'editable':
                    yield test_1.expect.soft(yield element, message).toBeEditable({ timeout: timeout, editable: true });
                    break;
                case 'read-only':
                    yield test_1.expect.soft(yield element, message).toBeEditable({ timeout: timeout, editable: false });
                    break;
                case 'disabled':
                    yield test_1.expect.soft(yield element, message).toBeDisabled({ timeout: timeout });
                    break;
                case 'enabled':
                    yield test_1.expect.soft(yield element, message).toBeEnabled({ timeout: timeout });
            }
        });
    }
    checkLabels(element, labels) {
        return __awaiter(this, void 0, void 0, function* () {
            const tabs = yield element.allInnerTexts();
            for (const key in labels) {
                yield this.checkValue(tabs[key], labels[key], 'equals', 'Unexpected label');
            }
        });
    }
    checkAmountOfElements(elements, labels) {
        return __awaiter(this, void 0, void 0, function* () {
            test_1.expect.soft(yield elements.count(), 'Unexpected count').toEqual(labels.length);
        });
    }
    checkValue(value_1, expected_1, assertionType_1) {
        return __awaiter(this, arguments, void 0, function* (value, expected, assertionType, message = `Assertion failed`) {
            if (!assertionType && (expected == 'empty' || expected == 'notEmpty' || expected == 'ignore')) {
                return;
            }
            switch (assertionType) {
                case 'notEmpty':
                    test_1.expect.soft(value, message).not.toEqual('');
                    break;
                case 'empty':
                    test_1.expect.soft(value, message).toEqual('');
                    break;
                case 'ignore':
                    break;
                case 'greaterThanZero':
                    test_1.expect.soft(value, message).toBeGreaterThan(0);
                    break;
                case 'smallerThanZero':
                    test_1.expect.soft(value, message).toBeLessThan(0);
                    break;
                case 'equalsToZero':
                    test_1.expect.soft(value, message).toEqual(0);
                    break;
                case 'contains':
                    return test_1.expect
                        .soft(typeof value === 'string' && typeof expected === 'string' && value.includes(expected), `${value} doesn't contain ${expected}. ${message}`)
                        .toEqual(true);
                case 'doesntContain':
                    return test_1.expect
                        .soft(typeof value === 'string' && typeof expected === 'string' && !value.includes(expected), `${value} contains ${expected}. ${message}`)
                        .toEqual(true);
            }
        });
    }
}
exports.default = Assertions;
