export default class LocaleManager {
  public static getLocaleName(): string {
    return navigator.language.split('-')[0];
  }
}
