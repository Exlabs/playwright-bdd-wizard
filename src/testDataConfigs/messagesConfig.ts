type messagesType = { [key: string]: string };
let messages: messagesType = {};

export function configureMessages(messages: messagesType) {
  messages = messages;
}

export default function getMessages(): messagesType {
  return messages;
}
