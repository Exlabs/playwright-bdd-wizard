export type EntityDataType = {
    [key: string]: {
        [key: string]: string;
    }[];
};
export type EntitiesDataType = {
    [key: string]: EntityDataType;
};
export declare function configureEntitiesData(entitiesData: EntitiesDataType): void;
export declare function getEntityData(name: string, version: number): {
    [key: string]: string;
};
