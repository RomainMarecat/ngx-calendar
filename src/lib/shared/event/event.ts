export interface Event {
  id: string;
  start: Date;
  end: Date;
  comment?: string;
  custom_title?: string;
  group_booking?: string;
  pause?: number;
  user?: any;
}

export enum EventType {
  absence,
  session,
}
