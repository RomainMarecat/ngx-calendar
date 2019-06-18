import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../firebase/visitor.service';
import { Session } from './session';
export declare class SessionService extends VisitorService {
    constructor(afs: AngularFirestore, table: string);
    getSessions(): Observable<Session[]>;
    getSession(key: string): Observable<Session>;
    createSession(session: Session): Promise<any>;
    updateSession(session: Session): Promise<void>;
    deleteSession(session: Session): Promise<void>;
}
