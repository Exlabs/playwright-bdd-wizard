type tabsType = {
    [key: string]: {
        locator: string;
        labels: string[];
    };
};
export declare function configureTabs(tabs: tabsType): void;
export default function getTabs(key: string): any;
export {};
