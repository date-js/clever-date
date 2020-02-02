import DateInterval from './DateInterval';

class DateIntervalCalculator {
  private static readonly SECONDS_IN_DAY = 86400;

  private static readonly SECONDS_IN_HOUR = 3600;

  private static readonly SECONDS_IN_MINUTE = 60;

  public getDateInterval(date: Date): DateInterval {
    const dateDiff = new DateInterval();
    let diff = (Date.now() - date.getTime()) / 1000;

    dateDiff.date = date;

    dateDiff.day = Math.trunc(diff / DateIntervalCalculator.SECONDS_IN_DAY);
    diff -= DateIntervalCalculator.SECONDS_IN_DAY * dateDiff.day;

    dateDiff.hour = Math.trunc(diff / DateIntervalCalculator.SECONDS_IN_HOUR);
    diff -= DateIntervalCalculator.SECONDS_IN_HOUR * dateDiff.hour;

    dateDiff.minute = Math.trunc(diff / DateIntervalCalculator.SECONDS_IN_MINUTE);
    diff -= DateIntervalCalculator.SECONDS_IN_MINUTE * dateDiff.minute;

    dateDiff.second = Math.trunc(diff);

    return dateDiff;
  }
}

export default new DateIntervalCalculator();
