export default class Item {
    reference: Element;
    initialContent: string;
    date: Date;
    nextUpdate: Date | null | undefined;
    constructor(reference: Element, initialContent: string, date: Date);
}
