"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureMessages = void 0;
let messagesMap = {};
function configureMessages(messages) {
    messagesMap = messages;
}
exports.configureMessages = configureMessages;
function getMessages(key) {
    return messagesMap[key];
}
exports.default = getMessages;
