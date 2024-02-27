export let loadingMessages: string[] = [];

export function configureLoadingMessages(messages: string[]) {
  loadingMessages = messages;
}

export default function getLoadingMessages(): string[] {
  return loadingMessages;
}
