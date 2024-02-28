import getUrl from '../testDataConfigs/urlConfig.js';
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

  async getUrlBasedOnUserInput(page: string): Promise<string> {
    const baseUrl = getUrl('main');
    const pageUrl = getUrl(page);
    const savedURL = process.env[page];
    let url = '';
    if (savedURL) {
      url = savedURL;
    } else if (page.includes('http')) {
      url = page;
    } else if (page === 'main') {
      url = baseUrl;
    } else if (pageUrl.includes('http')) {
      url = pageUrl;
    } else {
      url = baseUrl + pageUrl;
    }
    if (url === '') {
      console.error(`Error: Couldn't define the ${page} url`);
    }
    return url;
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

  async isAsExpected(
    value: string | number | undefined,
    expected: string | number,
    assertionType?: 'greaterThanZero' | 'notEmpty' | 'empty' | 'contains' | 'doesnt contain' | 'equals' | 'ignore'
  ) {
    if (!assertionType && (expected == 'empty' || expected == 'notEmpty' || expected == 'ignore')) {
      assertionType = expected;
    }
    switch (assertionType) {
      case 'notEmpty':
        return value != '';
      case 'empty':
        return value == '';
      case 'ignore':
        return true;
      case 'greaterThanZero':
        return typeof value === 'number' && value > 0;
      case 'contains':
        return typeof value === 'string' && typeof expected === 'string' && value.includes(expected);
      case 'doesnt contain':
        return typeof value === 'string' && typeof expected === 'string' && !value.includes(expected);
      default:
        return value == expected;
    }
  }
}
