export type EntityDataType = { [key: string]: { [key: string]: string }[] };
export type EntititesDataType = { [key: string]: EntityDataType };
let entityDataMap: EntititesDataType = {};

export function configureEntitiesData(entitiesData: EntititesDataType) {
  entityDataMap = entitiesData;
}

export default function getEntityData(name: string, version: number) {
  const entities = Object.keys(entityDataMap);
  for (const entity of entities) {
    const entityVersions = entityDataMap[entity][name];
    if (entityVersions && entityVersions[version]) {
      return entityVersions[version];
    }
  }
  console.error(`Didn't find any entity data with name: ${name}, version: ${version}`);
  return {};
}
