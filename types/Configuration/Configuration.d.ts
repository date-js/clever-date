import Rule from '../Rule/Rule';
export default class Configuration {
    /**
     * Interval between new analyse (in seconds)
     */
    refresh: number;
    /**
     * Selector used to find date to manage
     */
    selector: string;
    /**
     * Set of rules merged in default rules
     */
    rules: Rule[];
}
