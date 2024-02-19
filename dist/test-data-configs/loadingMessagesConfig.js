"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadingMessages = void 0;
exports.configureLoadingMessages = configureLoadingMessages;
exports.getLoadingMessages = getLoadingMessages;
exports.loadingMessages = [];
function configureLoadingMessages(messages) {
    exports.loadingMessages = messages;
}
function getLoadingMessages() {
    return exports.loadingMessages;
}
