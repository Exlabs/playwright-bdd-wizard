"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureEntitiesData = void 0;
let entityDataMap = {};
function configureEntitiesData(entitiesData) {
    entityDataMap = entitiesData;
}
exports.configureEntitiesData = configureEntitiesData;
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
exports.default = getEntityData;
