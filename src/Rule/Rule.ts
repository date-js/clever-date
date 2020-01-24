import DateDiff from '../DateDiff/DateDiff';

export default class Rule {
  public d_day?: string;

  public d_hour?: string;

  public d_min?: string;

  public d_sec?: string;

  public checker?: (currentDate: Date, itemDate: DateDiff) => boolean;

  public text: string;

  public refresh?: number;
}
