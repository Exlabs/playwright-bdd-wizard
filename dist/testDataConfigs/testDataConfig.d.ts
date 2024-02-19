type entityDataType = {
    [key: string]: {
        [key: string]: string;
    }[];
};
type entititesDataType = {
    [key: string]: entityDataType;
};
export declare function configureEntitiesData(entitiesData: entititesDataType): void;
export default function getEntityData(name: string, version: number): {
    [key: string]: string;
} | undefined;
export {};
