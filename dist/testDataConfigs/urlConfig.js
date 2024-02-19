"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureUrls = void 0;
let urlMap = {};
function configureUrls(urls) {
    urlMap = urls;
}
exports.configureUrls = configureUrls;
function getUrl(key) {
    const urlFunc = urlMap[key];
    return urlFunc ? urlFunc() : '';
}
exports.default = getUrl;
