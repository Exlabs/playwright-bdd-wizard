"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTabs = exports.configureTabs = void 0;
let tabsMap = {};
function configureTabs(tabs) {
    tabsMap = tabs;
}
exports.configureTabs = configureTabs;
function getTabs(key) {
    const tabs = tabsMap[key];
    return tabs;
}
exports.getTabs = getTabs;
