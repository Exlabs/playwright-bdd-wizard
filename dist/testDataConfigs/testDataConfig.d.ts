export type EntityDataType = {
    [key: string]: {
        [key: string]: string;
    }[];
};
export type EntititesDataType = {
    [key: string]: EntityDataType;
};
export declare function configureEntitiesData(entitiesData: EntititesDataType): void;
export default function getEntityData(name: string, version: number): {
    [key: string]: string;
};
