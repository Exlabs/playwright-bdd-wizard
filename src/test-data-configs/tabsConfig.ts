export type TabType = { locator: string; labels: string[] };
export type TabsType = { [key: string]: TabType };
let tabsMap: TabsType = {};

export function configureTabs(tabs: TabsType) {
  tabsMap = tabs;
}

export function getTabs(key: string): TabType {
  const tabs = tabsMap[key];
  return tabs;
}
