export default class ProcessEnvironmentVariables {
    static get(name: string): string | undefined;
    set(name: string, value: string): Promise<void>;
    getEnvVarOrDefault(value: string): Promise<string>;
}
