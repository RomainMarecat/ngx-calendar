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
export declare enum EventType {
    absence = 0,
    session = 1
}
