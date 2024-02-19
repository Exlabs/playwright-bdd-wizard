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
class Generic {
    getSubString(string, regExp) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myRe = new RegExp(regExp);
                const result = myRe.exec(string);
                return (_a = result === null || result === void 0 ? void 0 : result[1]) !== null && _a !== void 0 ? _a : undefined;
            }
            catch (error) {
                console.error('An error occurred while extracting substring:', error);
                return undefined;
            }
        });
    }
    timeDelta(startTime, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const elapsedTime = Date.now() - startTime;
            return timeout - elapsedTime;
        });
    }
    getRandomNumberString(length) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomDigit = Math.floor(Math.random() * 10);
                result += randomDigit.toString();
            }
            return result;
        });
    }
    getFormattedDate() {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = String(today.getFullYear());
            return `${day}-${month}-${year}`;
        });
    }
    generateUniqueName(name = 'Automated Test: ', numbersLength = 5) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityName = name + (yield this.getRandomNumberString(numbersLength));
            return entityName;
        });
    }
    isAsExpected(value, expected, assertionType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!assertionType && (expected == 'empty' || expected == 'notEmpty' || expected == 'ignore')) {
                assertionType = expected;
            }
            switch (assertionType) {
                case 'notEmpty':
                    return value != '';
                case 'empty':
                    return value == '';
                case 'ignore':
                    return true;
                case 'greaterThanZero':
                    return typeof value === 'number' && value > 0;
                case 'contains':
                    return typeof value === 'string' && typeof expected === 'string' && value.includes(expected);
                case 'doesnt contain':
                    return typeof value === 'string' && typeof expected === 'string' && !value.includes(expected);
                default:
                    return value == expected;
            }
        });
    }
}
exports.default = Generic;
