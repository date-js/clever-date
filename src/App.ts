import Configuration from './Configuration/Configuration';
import Item from './Item/Item';
import DateDiffCalculator from './DateInterval/DateIntervalCalculator';
import RuleInterpreter from './Rule/RuleInterpreter';
import Rule from './Rule/Rule';
import defaultConfiguration from './defaultConfiguration';
import ConfigurationValidator from './Configuration/ConfigurationValidator';

export default class App {

  private items: Item[] = [];

  private rules: Rule[] = [];

  private timer: number | null;

  public start(userConfig: Configuration = {}): void {
    const config = this.mergeConfiguration(userConfig);

    const error = ConfigurationValidator.validate(config);
    if (error instanceof Error) {
      throw error;
    }

    const exec = (): void => {
      this.extractItems(config.selector);
      this.analyse();
    };

    if (!this.timer) {
      this.timer = this.startTimer(config.refresh, exec);
    }

    this.rules = config.rules;

    exec();
  }

  private extractItems(selector: string): void {
    const matches = document.querySelectorAll(`[${selector}]`);

    matches.forEach(element => {
      const newItem = new Item();
      newItem.reference = element;
      newItem.initialText = element.innerHTML;

      const dateValue = element.getAttribute(selector);
      if (!Number.isNaN(Number(dateValue))) {
        const timestamp = parseInt(dateValue, 10);
        newItem.date = new Date(timestamp * 1000);
        this.items.push(newItem);
      }

      element.removeAttribute(selector);
      if (!element.hasAttribute('title')) {
        element.setAttribute('title', newItem.initialText);
      }
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
    const dateDiff = DateDiffCalculator.getDateInterval(item.date);
    const ruleResult = RuleInterpreter.render(this.rules, dateDiff);

    const setHtml = (newContent: string): void => {
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

  private startTimer(interval: number, callback: () => void): number {
    return window.setInterval(() => {
      callback();
    }, interval * 1000);
  }

  private mergeConfiguration(userConfig: Configuration): Configuration {
    return {
      refresh: userConfig.refresh ?? defaultConfiguration.refresh,
      selector: userConfig.selector ?? defaultConfiguration.selector,
      rules: userConfig.rules ? userConfig.rules.concat(defaultConfiguration.rules) : defaultConfiguration.rules
    };
  }
}
