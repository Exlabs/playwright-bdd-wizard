export type MessagesType = { [key: string]: string };
let messagesMap: MessagesType = {};

export function configureMessages(messages: MessagesType) {
  messagesMap = messages;
}

export function getMessage(key: string): string {
  return messagesMap[key];
}
