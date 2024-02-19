"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureEntitiesData = configureEntitiesData;
exports.getEntityData = getEntityData;
let entityDataMap = {};
function configureEntitiesData(entitiesData) {
    entityDataMap = entitiesData;
}
function getEntityData(name, version) {
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
