
export class Utility {
  static path(...urls: string[]): string {
    let resultUrl = '';
    for (let i = 0; i < urls.length; ++i) {
      resultUrl += '/' + urls[i];
    }
    return resultUrl;
  }
}
