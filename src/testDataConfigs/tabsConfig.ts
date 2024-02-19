type tabsType = { [key: string]: { locator: string; labels: string[] } };
let tabs: tabsType = {};

export function configureTabs(tabs: tabsType) {
  tabs = tabs;
}

export default function getTabs(): tabsType {
  return tabs;
}
