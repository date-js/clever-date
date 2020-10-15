import DateInterval from './DateInterval/DateInterval';
declare const _default: ({
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
} | {
    condition: (itemDate: DateInterval) => boolean;
    refresh: null;
    text: {
        en: string;
        fr: string;
    };
})[];
export default _default;
