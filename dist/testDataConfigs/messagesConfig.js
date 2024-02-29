"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = exports.configureMessages = void 0;
let messagesMap = {};
function configureMessages(messages) {
    messagesMap = messages;
}
exports.configureMessages = configureMessages;
function getMessage(key) {
    return messagesMap[key];
}
exports.getMessage = getMessage;
