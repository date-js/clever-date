import DateInterval from '../DateInterval/DateInterval';
import Rule from './Rule';
import LangManager from "../Lang/LangManager";

class RuleInterpreter {
  public render(rules: Rule[], itemDateInterval: DateInterval): { render: string; nextUpdate: Date | null } | null {
    const ruleFound = rules.find(rule => rule.condition(itemDateInterval));

    if (!ruleFound) {
      return null;
    }

    const currentLang = LangManager.getLangName();

    return {
      render: this.parseRule(ruleFound.text[currentLang], itemDateInterval),
      nextUpdate: this.calculateNextUpdate(ruleFound),
    };
  }

  private parseRule(text: string, diff: DateInterval): string {
    let parsedText = text;
    const regexp = /\[%([a-z]+)\|([^|\[\]]*)\|([^|\[\]]*)\]/g;
    let condData;
    while ((condData = regexp.exec(text)) !== null) {
      const condValue = this.getVariableValue(condData[1], diff);
      if (condValue !== null) {
        parsedText = parsedText.replace(condData[0], parseInt(condValue, 10) <= 1 ? condData[2] : condData[3]);
      }
    }

    let varData;
    const varRegexp = /\[%([a-z]+)\]/gi;
    while ((varData = varRegexp.exec(text)) !== null) {
      const variableValue = this.getVariableValue(varData[1], diff);
      if (variableValue !== null) {
        parsedText = parsedText.replace(varData[0], variableValue);
      }
    }

    return parsedText;
  }

  private calculateNextUpdate(rule: Rule): Date | null{
    if (!rule.refresh) {
      return null;
    }

    const currentDate = new Date();

    return new Date(currentDate.setTime(currentDate.getTime() + rule.refresh * 1000));
  }

  private getVariableValue(varName: string, diff: DateInterval): string | null {
    switch (varName) {
      case 'dd':
        return diff.day.toString();
      case 'dh':
        return diff.hour.toString();
      case 'dm':
        return diff.minute.toString();
      case 'ds':
        return diff.second.toString();
      case 'Y':
        return diff.date.getFullYear().toString();
      case 'd':
        return diff.date.getDate().toString();
      case 'l':
        return LangManager.getDay(diff.date.getDay());
      case 'F':
        return LangManager.getMonth(diff.date.getMonth());
      case 'G':
        return diff.date.getHours().toString();
      case 'H':
        return `0${diff.date.getHours()}`.slice(-2);
      case 'i':
        return `0${diff.date.getMinutes()}`.slice(-2);
      default:
        return null;
    }
  }
}

export default new RuleInterpreter();
