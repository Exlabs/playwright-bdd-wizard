"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureUrls = configureUrls;
exports.getUrl = getUrl;
let urlMap = {};
function configureUrls(urls) {
    urlMap = urls;
}
function getUrl(key) {
    const urlFunc = urlMap[key];
    return urlFunc ? urlFunc() : '';
}
