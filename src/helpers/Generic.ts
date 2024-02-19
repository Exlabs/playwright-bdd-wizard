import { getUrl, getMessage } from '../test-data-configs/index.js';

export default class Generic {
  async getSubString(string: string, regExp: RegExp) {
    try {
      const myRe = new RegExp(regExp);
      const result = myRe.exec(string);
      return result?.[1] ?? undefined;
    } catch (error) {
      console.error('An error occurred while extracting substring:', error);
      return undefined;
    }
  }

  async getUrlBasedOnUserInput(input: string): Promise<string> {
    const baseUrl = getUrl('main');
    const pageUrl = getUrl(input);
    const savedURL = process.env[input];

    switch (true) {
      case Boolean(savedURL):
        return savedURL || '';
      case input.includes('http'):
        return input;
      case input === 'main':
        return baseUrl;
      case pageUrl.includes('http'):
        return pageUrl;
      case pageUrl !== '':
        return baseUrl + pageUrl;
      case input !== '':
        return baseUrl + input;
      default:
        console.error(`Error: Couldn't define the ${input} url`);
        return '';
    }
  }

  async getMessageOrDefault(text: string) {
    const message = getMessage(text);
    return message || text;
  }

  async timeDelta(startTime: number, timeout: number) {
    const elapsedTime = Date.now() - startTime;
    return timeout - elapsedTime;
  }

  async getRandomNumberString(length: number) {
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      result += randomDigit.toString();
    }
    return result;
  }

  async getFormattedDate(): Promise<string> {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear());
    return `${day}-${month}-${year}`;
  }

  async generateUniqueName(name: string = 'Automated Test: ', numbersLength: number = 5) {
    const entityName = name + (await this.getRandomNumberString(numbersLength));
    return entityName;
  }
}
