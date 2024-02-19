"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureEntitiesData = void 0;
let entityDataMap = {};
function configureEntitiesData(entitiesData) {
    entityDataMap = entitiesData;
}
exports.configureEntitiesData = configureEntitiesData;
function getEntityData(name, version) {
    var _a, _b;
    const entities = Object.keys(entityDataMap);
    for (const entity of entities) {
        if ((_b = (_a = entityDataMap === null || entityDataMap === void 0 ? void 0 : entityDataMap[entity]) === null || _a === void 0 ? void 0 : _a[name]) === null || _b === void 0 ? void 0 : _b[version]) {
            return entityDataMap[entity][name][version];
        }
        else {
            return {};
        }
    }
}
exports.default = getEntityData;
