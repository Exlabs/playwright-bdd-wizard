type URLsType = {
    [key: string]: () => string;
};
export declare function configureUrls(urls: URLsType): void;
export default function getUrl(key: string): string;
export {};
