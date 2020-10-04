import Configuration from './Configuration/Configuration';
import Item from './Item/Item';
import DateIntervalCalculator from './DateInterval/DateIntervalCalculator';
import RuleInterpreter from './Rule/RuleInterpreter';
import Rule from './Rule/Rule';
import defaultRules from './defaultRules';
import ConfigurationValidator from './Configuration/ConfigurationValidator';
import RuleRender from './Rule/RuleRender';
import LocaleManager from './Locale/LocaleManager';

export default class App {
  private static readonly EVENT_REFRESH = 'clever-date.update';

  private items: Item[] = [];

  private rules: Rule[] = [];

  private timer: number | null = null;

  private readonly locale: string;

  public constructor() {
    this.locale = LocaleManager.getLocaleName();
  }

  public start(userConfig: Configuration|null = null): void {
    const config = { ...new Configuration(), ...userConfig };
    config.rules = config.rules.concat(defaultRules);

    const error = ConfigurationValidator.validate(config);
    if (error instanceof Error) {
      throw error;
    }

    this.rules = config.rules;

    const execProcess = (): void => {
      this.extractItems(config.selector);
      this.analyse();
    };

    if (this.timer === null) {
      this.timer = this.startTimer(config.refresh, execProcess);
    }

    window.addEventListener(App.EVENT_REFRESH, () => execProcess());

    execProcess();
  }

  public stop(): void {
    if (this.timer !== null) {
      window.clearInterval(this.timer);
    }
  }

  private extractItems(selector: string): void {
    const matches = document.querySelectorAll(`[${selector}]`);

    matches.forEach(element => {
      let attributeValue: string|number = element.getAttribute(selector) as string;

      if (!Number.isNaN(Number(attributeValue))) {
        const timestamp = parseInt(attributeValue, 10);
        attributeValue = timestamp * 1000;
      }

      const itemDate = new Date(attributeValue);

      if (itemDate.getTime() > 0) {
        this.items.push(new Item(element, element.innerHTML, itemDate));
      }

      element.removeAttribute(selector);
      if (!element.hasAttribute('title')) {
        element.setAttribute('title', element.textContent as string);
      }
    });
  }

  private analyse(): void {
    const currentDate = new Date();

    const itemsToAnalyse = this.items.filter(
      item => item.nextUpdate === undefined || (item.nextUpdate !== null && item.nextUpdate < currentDate)
    );

    itemsToAnalyse.forEach(item => this.manageItem(item));
  }

  private manageItem(item: Item): void {
    const dateInterval = DateIntervalCalculator.getDateInterval(item.date);
    const ruleResult = RuleInterpreter.render(this.rules, dateInterval, this.locale);

    const setHtml = (newContent: string): void => {
      if (item.reference.innerHTML !== newContent) {
        item.reference.innerHTML = newContent;
      }
    };

    if (ruleResult instanceof RuleRender) {
      if (ruleResult.nextUpdate === null) {
        this.removeItem(item);
      }

      item.nextUpdate = ruleResult.nextUpdate;
      setHtml(ruleResult.render);
    } else {
      setHtml(item.initialContent);
    }
  }

  private startTimer(interval: number, callback: () => void): number {
    return window.setInterval(() => {
      callback();
    }, interval * 1000);
  }

  private removeItem(itemToRemove: Item): void {
    const index = this.items.findIndex(item => item === itemToRemove);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }
}
