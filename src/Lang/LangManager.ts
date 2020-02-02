import fr from '../../translations/fr.json';
import en from '../../translations/en.json';

export default class LangManager {

    public static getDay(dayId: number): string {
        return LangManager.getLang().days[dayId];
    }

    public static getMonth(monthId: number): string {
        return LangManager.getLang().months[monthId];
    }

    public static getLang(): { [key: string]: string[] } {
        switch (LangManager.getLangName()) {
            case 'fr': return fr;
            case 'en': return en;
            default: return en;
        }
    }

    public static getLangName(): string | null {
        let currentLang = navigator.language;
        if (currentLang) {
            [currentLang] = currentLang.split('-');
            return currentLang;
        }

        return 'en';
    }
}