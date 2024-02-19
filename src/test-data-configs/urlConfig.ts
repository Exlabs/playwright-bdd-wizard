export type URLsType = { [key: string]: () => string };
let urlMap: URLsType = {};

export function configureUrls(urls: URLsType) {
  urlMap = urls;
}

export function getUrl(key: string): string {
  const urlFunc = urlMap[key];
  return urlFunc ? urlFunc() : '';
}
