import { Event, EventType } from '../event/event';

export interface Session extends Event {
  event_type: EventType;
  booking?: any;
  comment: string;
  customers?: any[];
  price?: number;
  duration: number;
  nb_persons: number;
  age?: number;
  level?: number;
  sport?: any;
  speciality?: any;
  city?: any;
  meeting_point?: any;
}
