"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoadingMessages = exports.configureLoadingMessages = exports.loadingMessages = void 0;
exports.loadingMessages = [];
function configureLoadingMessages(messages) {
    exports.loadingMessages = messages;
}
exports.configureLoadingMessages = configureLoadingMessages;
function getLoadingMessages() {
    return exports.loadingMessages;
}
exports.getLoadingMessages = getLoadingMessages;
