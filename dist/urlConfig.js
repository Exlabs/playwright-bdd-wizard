"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = exports.configureUrls = void 0;
let urlMap = {};
// Function to set URLs
function configureUrls(urls) {
    urlMap = urls;
}
exports.configureUrls = configureUrls;
// Function to get a specific URL
function getUrl(key) {
    const urlFunc = urlMap[key];
    return urlFunc ? urlFunc() : '';
}
exports.getUrl = getUrl;
