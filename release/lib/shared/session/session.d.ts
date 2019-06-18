import { EventType, Event } from '../../shared/event/event';
export declare class Session extends Event {
    details: {
        event_type: EventType;
        nb_persons: number;
        booking?: any;
        info: string;
        customers?: string[];
    };
}
