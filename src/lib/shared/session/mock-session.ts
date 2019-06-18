import * as moment_ from 'moment';
import { EventType } from '../event/event';

const moment = moment_;

export const mockSession = {
  details: {
    event_type: EventType.session,
    nb_persons: 1,
    booking: 1,
    info: 'test',
    customers: ['test']
  },
  start: new Date(),
  end: new Date(),
};

export const mockSessions = [
  {
    details: {
      event_type: EventType.session,
      nb_persons: 1,
      booking: 1,
      info: 'test1',
      customers: ['test']
    },
    start: moment().toDate(),
    end: moment().add('60', 'minute').toDate(),
  },
  {
    details: {
      event_type: EventType.session,
      nb_persons: 1,
      booking: 2,
      info: 'test2',
      customers: ['test']
    },
    start: moment().toDate(),
    end: moment().add('1', 'day').toDate(),
  }
];
