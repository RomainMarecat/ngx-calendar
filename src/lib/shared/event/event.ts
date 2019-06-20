export class Event {
  key?: string;
  start: Date;
  end: Date;
  details: any;
  comment?: string;
  custom_title?: string;
  group_booking?: string;
  pause?: number;
  user?: {
    uid: string;
    email: string;
    displayName: string;
  };
}

export enum EventType {
  absence,
  session,
}
