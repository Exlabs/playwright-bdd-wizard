export type messagesType = { [key: string]: string };
let messagesMap: messagesType = {};

export function configureMessages(messages: messagesType) {
  messagesMap = messages;
}

export default function getMessages(key: string): string {
  return messagesMap[key];
}
