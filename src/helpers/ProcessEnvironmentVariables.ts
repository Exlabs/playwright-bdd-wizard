export default class ProcessEnvironmentVariables {
  static get(name: string): string | undefined {
    return process.env[name];
  }

  set(name: string, value: string) {
    process.env[name] = value;
  }

  async getEnvVarOrDefault(value: string): Promise<string> {
    const processEnvVar = process.env[value];
    return processEnvVar || value;
  }
}
