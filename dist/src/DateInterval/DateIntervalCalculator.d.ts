import DateInterval from './DateInterval';
declare class DateIntervalCalculator {
    private static readonly SECONDS_IN_DAY;
    private static readonly SECONDS_IN_HOUR;
    private static readonly SECONDS_IN_MINUTE;
    getDateInterval(date: Date): DateInterval;
}
declare const _default: DateIntervalCalculator;
export default _default;
