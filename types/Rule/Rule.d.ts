import DateInterval from '../DateInterval/DateInterval';
export default class Rule {
    condition: (dateInterval: DateInterval) => boolean;
    text: {
        [key: string]: string;
    };
    /**
     * =number => refresh each n seconds
     * =null => No refresh needed
     * =undefined => Refresh following global refresh
     */
    refresh?: number | null | undefined;
}
