export default class Generic {
    getSubString(string: string, regExp: RegExp): Promise<string | undefined>;
    getUrlBasedOnUserInput(input: string): Promise<string>;
    timeDelta(startTime: number, timeout: number): Promise<number>;
    getRandomNumberString(length: number): Promise<string>;
    getFormattedDate(): Promise<string>;
    generateUniqueName(name?: string, numbersLength?: number): Promise<string>;
}
