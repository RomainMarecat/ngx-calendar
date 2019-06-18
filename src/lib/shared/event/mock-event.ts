import * as moment_ from 'moment';
const moment = moment_;

export const mockEvent = {
  key: 'test',
  start: moment('2018-01-0110:00', 'YYYY-MM-DDHH:mm').toDate(),
  end: moment('2018-01-0112:00', 'YYYY-MM-DDHH:mm').toDate(),
  details: {},
  comment: '',
  pause: 0,
};
