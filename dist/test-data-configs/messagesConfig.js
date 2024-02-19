"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureMessages = configureMessages;
exports.getMessage = getMessage;
let messagesMap = {};
function configureMessages(messages) {
    messagesMap = messages;
}
function getMessage(key) {
    return messagesMap[key];
}
