export type entityDataType = {
    [key: string]: {
        [key: string]: string;
    }[];
};
export type entititesDataType = {
    [key: string]: entityDataType;
};
export declare function configureEntitiesData(entitiesData: entititesDataType): void;
export default function getEntityData(name: string, version: number): {
    [key: string]: string;
};
