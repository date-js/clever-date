import DateFormatter from '@date-js/date-formatter';
import DateInterval from '../DateInterval/DateInterval';
import Rule from './Rule';
import RuleRender from './RuleRender';

class RuleInterpreter {
  public render(rules: Rule[], itemDateInterval: DateInterval, locale: string): RuleRender | null {
    const ruleFound: Rule|undefined = rules.find(
      rule => rule.condition(itemDateInterval) && locale in rule.text
    );

    if (!ruleFound) {
      return null;
    }

    return new RuleRender(
      this.parseRule(ruleFound.text[locale], itemDateInterval, locale),
      this.calculateNextUpdate(ruleFound)
    );
  }

  private parseRule(text: string, diff: DateInterval, locale: string): string {
    let parsedText = this.parseConditions(text, text, diff, locale);
    parsedText = this.parseValues(text, parsedText, diff, locale);

    return parsedText.replace('\\', '');
  }

  private parseConditions(
    text: string,
    parsedText: string,
    diff: DateInterval,
    locale: string
  ): string {
    const regexp = /{%([a-z]+)\|([^|\[\]]*)\|([^|\[\]]*)}/gi;
    let condData;
    while ((condData = regexp.exec(text)) !== null) {
      const condValue = this.getValueFromSymbol(condData[1], diff, locale);
      if (condValue !== null) {
        parsedText = parsedText.replace(
          condData[0],
          parseInt(condValue, 10) <= 1 ? condData[2] : condData[3]
        );
      }
    }

    return parsedText;
  }

  private parseValues(
    text: string,
    parsedText: string,
    diff: DateInterval,
    locale: string
  ): string {
    let varData;
    const varRegexp = /%([a-z]+)/gi;
    while ((varData = varRegexp.exec(text)) !== null) {
      const variableValue = this.getValueFromSymbol(varData[1], diff, locale);
      if (variableValue !== null) {
        parsedText = parsedText.replace(varData[0], variableValue);
      }
    }

    return parsedText;
  }

  private calculateNextUpdate(rule: Rule): Date | null | undefined {
    if (rule.refresh === null) {
      return null;
    }

    if (rule.refresh === undefined) {
      return undefined;
    }

    const currentDate = new Date();
    return new Date(currentDate.setTime(currentDate.getTime() + rule.refresh * 1000));
  }

  private getValueFromSymbol(symbol: string, diff: DateInterval, locale: string): string | null {
    switch (symbol) {
      case 'dd':
        return diff.day.toString();
      case 'dh':
        return diff.hour.toString();
      case 'dm':
        return diff.minute.toString();
      case 'ds':
        return diff.second.toString();
      default:
        return DateFormatter.getValueFromSymbol(symbol, diff.date, locale);
    }
  }
}

export default new RuleInterpreter();
