import DateInterval from '../DateInterval/DateInterval';
import Rule from './Rule';
import RuleRender from './RuleRender';
declare class RuleInterpreter {
    render(rules: Rule[], itemDateInterval: DateInterval, locale: string): RuleRender | null;
    private parseRule;
    private parseConditions;
    private parseValues;
    private calculateNextUpdate;
    private getValueFromSymbol;
}
declare const _default: RuleInterpreter;
export default _default;
