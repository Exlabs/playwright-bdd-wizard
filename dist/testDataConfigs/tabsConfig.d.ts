export type TabType = {
    locator: string;
    labels: string[];
};
export type TabsType = {
    [key: string]: TabType;
};
export declare function configureTabs(tabs: TabsType): void;
export default function getTabs(key: string): TabType;
