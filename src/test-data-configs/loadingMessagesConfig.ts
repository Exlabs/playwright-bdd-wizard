export type LoadingMessagesType = string[];
export let loadingMessages: LoadingMessagesType = [];

export function configureLoadingMessages(messages: LoadingMessagesType) {
  loadingMessages = messages;
}

export function getLoadingMessages(): LoadingMessagesType {
  return loadingMessages;
}
