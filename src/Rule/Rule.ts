import DateInterval from '../DateInterval/DateInterval';

export default class Rule {

  public condition: (itemDateInterval: DateInterval) => boolean;

  public text: { [key: string]: string } = {}

  public refresh?: number;
}
