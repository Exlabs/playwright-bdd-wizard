"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureLoadingMessages = void 0;
let loadingMessages = [];
function configureLoadingMessages(messages) {
    loadingMessages = messages;
}
exports.configureLoadingMessages = configureLoadingMessages;
function getLoadingMessages() {
    return loadingMessages;
}
exports.default = getLoadingMessages;
