export interface OnlineSession {
  id: string;
  user?: any;
  sport_teached?: any;
  city_teached?: any;
  name: string;
  comment: string;
  max_persons: number;
  booking_delay: number;
  duration: number;
  pause: number;
  price: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
}
