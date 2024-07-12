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
const index_js_1 = require("../test-data-configs/index.js");
class Generic {
    getSubString(string, regExp) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
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
    getUrlBasedOnUserInput(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = (0, index_js_1.getUrl)('main');
            const pageUrl = (0, index_js_1.getUrl)(input);
            const savedURL = process.env[input];
            switch (true) {
                case Boolean(savedURL):
                    return savedURL || '';
                case input.includes('http'):
                    return input;
                case input === 'main':
                    return baseUrl;
                case pageUrl.includes('http'):
                    return pageUrl;
                case pageUrl !== '':
                    return baseUrl + pageUrl;
                case input !== '':
                    return baseUrl + input;
                default:
                    console.error(`Error: Couldn't define the ${input} url`);
                    return '';
            }
        });
    }
    getMessageOrDefault(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = (0, index_js_1.getMessage)(text);
            return message || text;
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
    generateUniqueName() {
        return __awaiter(this, arguments, void 0, function* (name = 'Automated Test: ', numbersLength = 5) {
            return name + (yield this.getRandomNumberString(numbersLength));
        });
    }
}
exports.default = Generic;
