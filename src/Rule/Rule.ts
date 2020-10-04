import DateInterval from '../DateInterval/DateInterval';

export default class Rule {
  public condition: (dateInterval: DateInterval) => boolean = () => false;

  public text: { [key: string]: string } = {}

  /**
   * =number => refresh each n seconds
   * =null => No refresh needed
   * =undefined => Refresh following global refresh
   */
  public refresh?: number | null | undefined = undefined;
}
