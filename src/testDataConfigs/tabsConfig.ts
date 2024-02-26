type tabsType = { [key: string]: { locator: string; labels: string[] } };
let tabsMap: tabsType = {};

export function configureTabs(tabs: tabsType) {
  tabsMap = tabs;
}

export default function getTabs(key: string): any {
  const tabs = tabsMap[key];
  return tabs;
}
