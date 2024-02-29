export type URLsType = {
    [key: string]: () => string;
};
export declare function configureUrls(urls: URLsType): void;
export declare function getUrl(key: string): string;
