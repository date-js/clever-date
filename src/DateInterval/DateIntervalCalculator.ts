import DateInterval from './DateInterval';

export default class DateIntervalCalculator {
  private static readonly SECONDS_IN_DAY = 86400;

  private static readonly SECONDS_IN_HOUR = 3600;

  private static readonly SECONDS_IN_MINUTE = 60;

  public static getDateInterval(date: Date): DateInterval {
    let diff = (Date.now() - date.getTime()) / 1000;

    const diffDays = Math.trunc(diff / DateIntervalCalculator.SECONDS_IN_DAY);
    diff -= DateIntervalCalculator.SECONDS_IN_DAY * diffDays;

    const diffHours = Math.trunc(diff / DateIntervalCalculator.SECONDS_IN_HOUR);
    diff -= DateIntervalCalculator.SECONDS_IN_HOUR * diffHours;

    const diffMinutes = Math.trunc(diff / DateIntervalCalculator.SECONDS_IN_MINUTE);
    diff -= DateIntervalCalculator.SECONDS_IN_MINUTE * diffMinutes;

    const diffSeconds = Math.trunc(diff);

    return new DateInterval(date, diffDays, diffHours, diffMinutes, diffSeconds);
  }
}
