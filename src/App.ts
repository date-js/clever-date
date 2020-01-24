import Configuration from './Model/Configuration';
import Item from './Model/Item';
import DateDiffCalculator from './DateDiff/DateDiffCalculator';
import RuleInterpreter from './Rule/RuleInterpreter';
import Rule from './Rule/Rule';
import defaultConfiguration from './defaultConfiguration';

export default class App {
  private static readonly ATTRIBUTE = 'data-clever-date';

  private items: Item[] = [];

  private rules: Rule[] = [];

  private timer: number | null;

  public start(userConfig: Configuration): void {
    const config = this.mergeConfiguration(userConfig);

    if (!this.timer) {
      this.timer = this.startTimer(config.refresh);
    }

    const currentLang = document.documentElement.lang;
    this.rules = config.rules.hasOwnProperty(currentLang) ? config.rules[currentLang] : config.rules.en;

    this.extractItems();
    this.analyse();
  }

  private extractItems(): void {
    const matches = document.querySelectorAll(`[${App.ATTRIBUTE}]`);

    matches.forEach(element => {
      const newItem = new Item();
      newItem.reference = element;
      newItem.initialText = element.innerHTML;
      const timestamp = Date.parse(element.getAttribute(App.ATTRIBUTE));
      if (!isNaN(timestamp)) {
        newItem.date = new Date(timestamp);
        this.items.push(newItem);
      }

      element.removeAttribute(App.ATTRIBUTE);
    });
  }

  private analyse(): void {
    const currentDate = new Date();

    const itemsToAnalyse = this.items.filter(item => {
      return !item.nextUpdate || item.nextUpdate < currentDate;
    });

    itemsToAnalyse.forEach(item => {
      this.manageItem(item);
    });
  }

  private manageItem(item: Item): void {
    const dateDiff = DateDiffCalculator.getDateDiff(item.date);
    const ruleResult = RuleInterpreter.render(this.rules, dateDiff);

    const setHtml = (newContent: string) => {
      if (item.reference.innerHTML !== newContent) {
        item.reference.innerHTML = newContent;
      }
    };

    if (ruleResult) {
      item.nextUpdate = ruleResult.nextUpdate;
      setHtml(ruleResult.render);
    } else {
      setHtml(item.initialText);
    }
  }

  private startTimer(interval: number): number {
    return window.setInterval(() => {
      this.analyse();
    }, interval * 1000);
  }

  private mergeConfiguration(config: Configuration): Configuration {
    return { ...defaultConfiguration, ...config};
  }
}
