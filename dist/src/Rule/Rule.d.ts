import DateInterval from '../DateInterval/DateInterval';
export default class Rule {
    condition: (itemDateInterval: DateInterval) => boolean;
    text: {
        [key: string]: string;
    };
    refresh?: number;
}
