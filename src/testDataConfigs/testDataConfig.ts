export type entityDataType = { [key: string]: { [key: string]: string }[] };
export type entititesDataType = { [key: string]: entityDataType };
let entityDataMap: entititesDataType = {};

export function configureEntitiesData(entitiesData: entititesDataType) {
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
