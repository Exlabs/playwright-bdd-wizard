"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoadingMessages = exports.configureMessages = void 0;
let loadingMessages = [];
// Function to set messages
function configureMessages(messages) {
    loadingMessages = messages;
}
exports.configureMessages = configureMessages;
// Function to get loading messages
function getLoadingMessages() {
    return loadingMessages;
}
exports.getLoadingMessages = getLoadingMessages;
