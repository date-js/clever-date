import Configuration from './Configuration/Configuration';
export default class App {
    private static readonly EVENT_REFRESH;
    private items;
    private rules;
    private timer;
    private readonly locale;
    constructor();
    start(userConfig?: Configuration | null): void;
    stop(): void;
    private extractItems;
    private analyse;
    private manageItem;
    private startTimer;
    private removeItem;
}
