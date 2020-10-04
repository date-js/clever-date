export default class Item {
  public reference: Element;

  public initialContent: string;

  public date: Date;

  public nextUpdate: Date | null | undefined;

  public constructor(reference: Element, initialContent: string, date: Date) {
    this.reference = reference;
    this.initialContent = initialContent;
    this.date = date;
  }
}
