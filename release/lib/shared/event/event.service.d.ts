import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../firebase/visitor.service';
import { Event } from './event';
export declare class EventService extends VisitorService {
    constructor(afs: AngularFirestore, table: string);
    getEvents(): Observable<Event[]>;
    getEvent(key: string): Observable<Event>;
    createEvent(event: Event): Promise<any>;
    updateEvent(event: Event): Promise<void>;
    deleteEvent(event: Event): Promise<void>;
}
