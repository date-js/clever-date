import DateDiff from './DateDiff';

class DateDiffCalculator {
  private static readonly SECONDS_IN_DAY = 86400;

  private static readonly SECONDS_IN_HOUR = 3600;

  private static readonly SECONDS_IN_MINUTE = 60;

  public getDateDiff(date: Date): DateDiff {
    const dateDiff = new DateDiff();
    let diff = (Date.now() - date.getTime()) / 1000;

    dateDiff.date = date;

    dateDiff.day = Math.trunc(diff / DateDiffCalculator.SECONDS_IN_DAY);
    diff -= DateDiffCalculator.SECONDS_IN_DAY * dateDiff.day;

    dateDiff.hour = Math.trunc(diff / DateDiffCalculator.SECONDS_IN_HOUR);
    diff -= DateDiffCalculator.SECONDS_IN_HOUR * dateDiff.hour;

    dateDiff.minute = Math.trunc(diff / DateDiffCalculator.SECONDS_IN_MINUTE);
    diff -= DateDiffCalculator.SECONDS_IN_MINUTE * dateDiff.minute;

    dateDiff.second = Math.trunc(diff);

    return dateDiff;
  }
}

export default new DateDiffCalculator();
