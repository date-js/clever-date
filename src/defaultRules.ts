import DateInterval from './DateInterval/DateInterval';

const justNow = (itemDate: DateInterval): boolean => itemDate.day === 0 && itemDate.hour === 0 && itemDate.minute === 0 && itemDate.second >= 0 && itemDate.second < 30;

const someSeconds = (itemDate: DateInterval): boolean => itemDate.day === 0 && itemDate.hour === 0 && itemDate.minute === 0 && itemDate.second >= 0 && itemDate.second < 60;

const someMinutes = (itemDate: DateInterval): boolean => itemDate.day === 0 && itemDate.hour === 0 && itemDate.minute >= 0 && itemDate.minute < 60;

const someHours = (itemDate: DateInterval): boolean => itemDate.day === 0 && itemDate.hour > 0 && itemDate.hour >= 0 && itemDate.hour < 12;

const today = (itemDate: DateInterval): boolean => (new Date()).toDateString() === itemDate.date.toDateString();

const yesterday = (itemDate: DateInterval): boolean => {
  const currentDate = new Date();
  const currentDateYesterday = currentDate.setDate(currentDate.getDate() - 1);
  return new Date(currentDateYesterday).toDateString() === itemDate.date.toDateString();
};

const someDays = (itemDate: DateInterval): boolean => itemDate.day > 0 && itemDate.day < 7;

const sameYear = (itemDate: DateInterval): boolean => itemDate.date.getFullYear() === (new Date()).getFullYear();

const otherwise = (): boolean => true;

export default [
  {
    condition: justNow,
    text: {
      fr: 'à l\'instant',
      en: 'just now'
    }
  },
  {
    condition: someSeconds,
    text: {
      en: '%ds second{%ds||s} ago',
      fr: 'il y a %ds seconde{%ds||s}'
    }
  },
  {
    condition: someMinutes,
    text: {
      en: '%dm minute{%dm||s} ago',
      fr: 'il y a %dm minute{%dm||s}'
    }
  },
  {
    condition: someHours,
    refresh: 300,
    text: {
      en: '%dh hour{%dh||s} ago',
      fr: 'il y a %dh heure{%dh||s}'
    }
  },
  {
    condition: today,
    refresh: 60,
    text: {
      en: 'today at %H:%i',
      fr: 'aujourd\'hui à %H\\h%i'
    }
  },
  {
    condition: yesterday,
    refresh: 60,
    text: {
      en: 'yesterday at %H:%i',
      fr: 'hier à %H\\h%i'
    }
  },
  {
    condition: someDays,
    refresh: 3600,
    text: {
      en: '%l at %H:%i',
      fr: '%l à %H\\h%i'
    }
  },
  {
    condition: sameYear,
    refresh: null,
    text: {
      en: '%F %d',
      fr: 'le %d{%d|er|} %F'
    }
  },
  {
    condition: otherwise,
    refresh: null,
    text: {
      en: '%F %d, %Y',
      fr: 'le %j{%d|er|} %F %Y'
    }
  },
];
