import DateInterval from '../DateInterval/DateInterval';
import Rule from './Rule';
declare class RuleInterpreter {
    render(rules: Rule[], itemDateInterval: DateInterval): {
        render: string;
        nextUpdate: Date | null;
    } | null;
    private parseRule;
    private calculateNextUpdate;
    private getVariableValue;
}
declare const _default: RuleInterpreter;
export default _default;
