import DateInterval from './DateInterval/DateInterval';

const justNow = (itemDate: DateInterval): boolean => {
  return itemDate.day === 0 && itemDate.hour === 0 && itemDate.minute === 0 && itemDate.second < 30;
};

const someSeconds = (itemDate: DateInterval): boolean => {
  return itemDate.day === 0 && itemDate.hour === 0 && itemDate.minute === 0 && itemDate.second < 60;
};

const someMinutes = (itemDate: DateInterval): boolean => {
  return itemDate.day === 0 && itemDate.hour === 0 && itemDate.minute < 60;
};

const someHours = (itemDate: DateInterval): boolean => {
  return itemDate.day === 0 && itemDate.hour > 0 && itemDate.hour < 12;
};

const today = (itemDate: DateInterval): boolean => {
  return (new Date()).toDateString() === itemDate.date.toDateString();
};

const yesterday = (itemDate: DateInterval): boolean => {
  const currentDate = new Date();
  const currentDate_1 = currentDate.setDate(currentDate.getDate() - 1);
  return new Date(currentDate_1).toDateString() === itemDate.date.toDateString();
};

const someDays = (itemDate: DateInterval): boolean => {
  return itemDate.day > 0 && itemDate.day < 7;
};

const sameYear = (itemDate: DateInterval): boolean => {
  return itemDate.date.getFullYear() === (new Date()).getFullYear();
};

const otherwise = (): boolean => {
  return true;
};

export default {
  refresh: 5,
  selector: 'data-clever-date',
  rules: [
    {
      condition: justNow, text: {
        fr: 'à l\'instant',
        en: 'just now'
      }
    },
    {
      condition: someSeconds, text: {
        en: '[%ds] second[%ds||s] ago',
        fr: 'il y a [%ds] seconde[%ds||s]'
      }
    },
    {
      condition: someMinutes, text: {
        en: '[%dm] minute[%dm||s] ago',
        fr: 'il y a [%dm] minute[%dm||s]'
      }
    },
    {
      condition: someHours, refresh: 300, text: {
        en: '[%dh] hour[%dh||s] ago',
        fr: 'il y a [%dh] heure[%dh||s]'
      }
    },
    {
      condition: today, refresh: 60, text: {
        en: 'today at [%H]h[%i]',
        fr: 'aujourd\'hui à [%H]h[%i]'
      }
    },
    {
      condition: yesterday, refresh: 60, text: {
        en: 'yesterday at [%H]h[%i]',
        fr: 'hier à [%H]h[%i]'
      }
    },
    {
      condition: someDays, refresh: 3600, text: {
        en: '[%l] at [%H]h[%i]',
        fr: '[%l] à [%H]h[%i]'
      }
    },
    {
      condition: sameYear, refresh: 100000, text: {
        en: '[%F] [%d]',
        fr: 'le [%d][%d|er|] [%F]'
      }
    },
    {
      condition: otherwise, refresh: 100000, text: {
        en: '[%F] [%d], [%Y]',
        fr: 'le [%d][%d|er|] [%F] [%Y]'
      }
    },
  ]
}
