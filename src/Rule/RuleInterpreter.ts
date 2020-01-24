import DateDiff from '../DateDiff/DateDiff';
import Rule from './Rule';

class RuleInterpreter {
  public render(rules: Rule[], diff: DateDiff): { render: string; nextUpdate: Date | null } | null {
    const currentDate = new Date();

    const ruleFound = rules.find(rule => {
      return (
        (rule.checker === undefined || rule.checker(currentDate, diff)) &&
        (rule.d_day === undefined || this.isVerifiedRestriction(rule.d_day, diff.day)) &&
        (rule.d_hour === undefined || this.isVerifiedRestriction(rule.d_hour, diff.hour)) &&
        (rule.d_min === undefined || this.isVerifiedRestriction(rule.d_min, diff.minute)) &&
        (rule.d_sec === undefined || this.isVerifiedRestriction(rule.d_sec, diff.second))
      );
    });

    if (!ruleFound) {
      return null;
    }

    let nextUpdate: Date | null = null;
    if (ruleFound.refresh) {
      nextUpdate = new Date(currentDate.setTime(currentDate.getTime() + ruleFound.refresh * 1000));
    }

    return {
      render: this.parseRule(ruleFound.text, diff),
      nextUpdate,
    };
  }

  private isVerifiedRestriction(condition: string, value: number): boolean {
    const conditionDetail = condition.match(/^([><=]+)([0-9]+)$/);
    if (!conditionDetail) {
      return parseInt(condition, 10) === value;
    }

    const conditionOperator = conditionDetail[1];
    const conditionValue = parseInt(conditionDetail[2], 10);

    if (Math.sign(value) === Math.sign(conditionValue)) {
      if (conditionOperator === '<') {
        return value < conditionValue;
      }

      if (conditionOperator === '>') {
        return value > conditionValue;
      }
    }

    return false;
  }

  private parseRule(text: string, diff: DateDiff): string {
    let parsedText = text;
    const regexp = /\[%([a-z]+)\|([^\|\[\]]*)\|([^\|\[\]]*)\]/g;
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

  private getVariableValue(varName: string, diff: DateDiff): string | null {
    switch (varName) {
      case 'G':
        return diff.date.getHours().toString();
      case 'H':
        return (`0${diff.date.getHours()}`).slice(-2);
      case 'i':
        return (`0${diff.date.getMinutes()}`).slice(-2);
      case 'dd':
        return diff.day.toString();
      case 'dh':
        return diff.hour.toString();
      case 'dm':
        return diff.minute.toString();
      case 'ds':
        return diff.second.toString();
      default:
        return null;
    }
  }
}

export default new RuleInterpreter();
