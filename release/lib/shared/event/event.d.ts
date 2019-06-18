export declare class Event {
    key?: string;
    start: Date;
    end: Date;
    details: any;
    comment?: string;
    custom_title?: string;
    group_booking?: string;
    pause?: number;
}
export declare enum EventType {
    absence = 0,
    session = 1
}
