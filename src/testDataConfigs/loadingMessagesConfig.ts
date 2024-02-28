export type LoadingMessagesType = string[];
export let loadingMessages: LoadingMessagesType = [];

export function configureLoadingMessages(messages: LoadingMessagesType) {
  loadingMessages = messages;
}

export default function getLoadingMessages(): LoadingMessagesType {
  return loadingMessages;
}
