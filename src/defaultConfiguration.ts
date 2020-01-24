import DateDiff from './DateDiff/DateDiff';

const isToday = (currentDate: Date, itemDate: DateDiff) => {
  return currentDate.toDateString() === itemDate.date.toDateString();
};

const isYesterday = (currentDate: Date, itemDate: DateDiff) => {
  const currentDate_1 = currentDate.setDate(currentDate.getDate() - 1);
  return new Date(currentDate_1).toDateString() === itemDate.date.toDateString();
};

export default {
  refresh: 10,
  rules: {
    en: [
      { d_day: '0', d_hour: '0', d_min: '0', d_sec: '<30', text: 'Just now' },
      {
        d_day: '0',
        d_hour: '0',
        d_min: '0',
        d_sec: '<60',
        text: '[%ds] second[%ds||s] ago',
      },
      {
        d_day: '0',
        d_hour: '0',
        d_min: '<60',
        text: '[%dm] minute[%dm||s] ago',
      },
      { d_day: '0', d_hour: '<12', text: '[%dh] hour[%dm||s] ago' },
      {
        text: 'Today at [%H]h[%i]',
        checker: isToday,
      },
      {
        text: 'Yesterday at [%H]h[%i]',
        checker: isYesterday,
      },
    ],
    fr: [
      {
        d_day: '0',
        d_hour: '0',
        d_min: '0',
        d_sec: '<60',
        text: "A l'instant",
      },
      {
        d_day: '0',
        d_hour: '0',
        d_min: '0',
        d_sec: '<60',
        text: 'Il y a [%ds] seconde[%ds||s]',
      },
      {
        d_day: '0',
        d_hour: '0',
        d_min: '<60',
        text: 'il y a [%dm] minutes[%dm||s]',
      },
      { d_day: '0', d_hour: '<1', text: 'il y a [%dh] heure[%dh||s]' },
      {
        text: "Aujourd'hui à [%H]h[%i]",
        checker: isToday,
      },
      {
        text: 'Hier à [%H]h[%i]',
        checker: isYesterday,
      },
    ],
  },
};
