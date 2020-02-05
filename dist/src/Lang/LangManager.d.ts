export default class LangManager {
    static getDay(dayId: number): string;
    static getMonth(monthId: number): string;
    static getLang(): {
        [key: string]: string[];
    };
    static getLangName(): string | null;
}
