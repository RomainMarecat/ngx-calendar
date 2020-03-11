import { BehaviorSubject } from 'rxjs';
import { Session } from './session';
import * as i0 from "@angular/core";
export declare class SessionService {
    sessionsEntries$: BehaviorSubject<Session[]>;
    sessions: BehaviorSubject<Map<string, Session>>;
    constructor();
    static ɵfac: i0.ɵɵFactoryDef<SessionService>;
    static ɵprov: i0.ɵɵInjectableDef<SessionService>;
}
