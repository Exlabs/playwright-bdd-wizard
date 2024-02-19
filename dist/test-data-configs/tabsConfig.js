"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureTabs = configureTabs;
exports.getTabs = getTabs;
let tabsMap = {};
function configureTabs(tabs) {
    tabsMap = tabs;
}
function getTabs(key) {
    const tabs = tabsMap[key];
    return tabs;
}
