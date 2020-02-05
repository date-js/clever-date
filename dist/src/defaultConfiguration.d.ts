import DateInterval from './DateInterval/DateInterval';
declare const _default: {
    refresh: number;
    selector: string;
    rules: ({
        condition: (itemDate: DateInterval) => boolean;
        text: {
            fr: string;
            en: string;
        };
        refresh?: undefined;
    } | {
        condition: (itemDate: DateInterval) => boolean;
        refresh: number;
        text: {
            en: string;
            fr: string;
        };
    })[];
};
export default _default;
