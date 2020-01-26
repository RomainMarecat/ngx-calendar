import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Session } from './session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionsEntries$: BehaviorSubject<Session[]> = new BehaviorSubject<Session[]>([]);

  sessions: BehaviorSubject<Map<string, Session>> = new BehaviorSubject<Map<string, Session>>(new Map<string, Session>());

  constructor() {
  }
}
