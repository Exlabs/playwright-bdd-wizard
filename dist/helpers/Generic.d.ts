export default class Generic {
    getSubString(string: string, regExp: RegExp): Promise<string | undefined>;
    getUrlBasedOnUserInput(page: string): Promise<string>;
    timeDelta(startTime: number, timeout: number): Promise<number>;
    getRandomNumberString(length: number): Promise<string>;
    getFormattedDate(): Promise<string>;
    generateUniqueName(name?: string, numbersLength?: number): Promise<string>;
    isAsExpected(value: string | number | undefined, expected: string | number, assertionType?: 'greaterThanZero' | 'notEmpty' | 'empty' | 'contains' | 'doesnt contain' | 'equals' | 'ignore'): Promise<boolean>;
}
