export interface CalendarConfiguration {
    calendar: {
        availability: {
            empty: string;
            slot: string;
        };
        cta: {
            previous: string;
            next: string;
        };
        title: string;
        subtitle: string;
        back_today: string;
        today: string;
        week: string;
        three_days: string;
        day: string;
        session: {
            info: string;
        };
    };
}
