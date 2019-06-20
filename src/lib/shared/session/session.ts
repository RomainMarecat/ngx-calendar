import { EventType, Event } from '../event/event';

export class Session extends Event {
  details: {
    event_type: EventType,
    nb_persons: number,
    duration: number;
    booking?: any;
    info: string;
    customers?: string[];
  };
}
