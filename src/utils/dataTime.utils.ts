import moment from 'moment';

export const fomatDateForUpcoming = (date: string | Date): string => {
  const today = moment();
  const tomorrow = moment().add(1, 'day');
  const nextWeek = moment().add(7, 'days');

  if (moment(date).isSame(tomorrow, 'day')) {
    return 'Tomorrow';
  } else if (moment(date).isBetween(today, nextWeek, 'day')) {
    return moment(date).format('dddd hh:mm A');
  } else {
    return moment(date).format('MM/DD/YYYY hh:mm A');
  }
};
