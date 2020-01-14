export interface OnlineSession {
  key?: string;
  detail: {
    name: string;
    max_persons: number;
    booking_delay: number;
    duration: number;
    pause: number;
  };
  prices: number[];
  date_range: {
    start: string;
    end: string;
  };
  time_range: {
    start: string;
    end: string;
  };
}
