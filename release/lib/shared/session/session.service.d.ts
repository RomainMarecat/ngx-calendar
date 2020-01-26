import { BehaviorSubject } from 'rxjs';
import { Session } from './session';
export declare class SessionService {
    sessionsEntries$: BehaviorSubject<Session[]>;
    sessions: BehaviorSubject<Map<string, Session>>;
    constructor();
}
