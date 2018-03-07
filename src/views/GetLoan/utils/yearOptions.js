import moment from 'moment';

const YEARS_BACK = 100;

export default [...Array(YEARS_BACK)].map((_, index) => {
  const year = moment().subtract(index, 'years').format('YYYY');
  return { name: year, value: parseInt(year, 10) };
});
