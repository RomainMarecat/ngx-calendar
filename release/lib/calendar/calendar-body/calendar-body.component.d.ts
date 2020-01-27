import { EventEmitter, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { CalendarConfiguration } from '../../shared/configuration/calendar-configuration';
import { Day } from '../../shared/day/day';
import { OnlineSession } from '../../shared/session/online-session';
import { Session } from '../../shared/session/session';
import { SessionService } from '../../shared/session/session.service';
export declare class CalendarBodyComponent implements OnInit {
    private sessionService;
    /**
     * User could be passed to show session owner
     */
    user: any;
    /**
     * Customer could be passed to generate a personal calendar
     */
    customer: any;
    /**
     * current online session
     */
    onlineSession: OnlineSession;
    /**
     * View mode input
     */
    viewMode: string;
    /**
     * Start day week
     */
    start: Moment;
    /**
     * End day week
     */
    end: Moment;
    /**
     * Day of curretn week
     */
    days: Array<Day>;
    daysAvailability: Map<string, string[]>;
    daysBusySlotNumber: Map<string, number>;
    daysAvailabilitySlotNumber: Map<string, number>;
    busySlots: Set<string>;
    earlySlots: Set<string>;
    pauseSlots: Set<string>;
    sessionsSlots: Set<string>;
    sessionsEndSlots: Set<string>;
    sessionsStartSlots: Set<string>;
    sessions: Map<string, Session>;
    /**
     * Configuration body
     */
    bodyConfiguration: CalendarConfiguration;
    sessionAdded: EventEmitter<Session>;
    sessionRemoved: EventEmitter<{
        key: string;
        session: Session;
    }>;
    startChanged: EventEmitter<Moment>;
    endChanged: EventEmitter<Moment>;
    slotLocked: EventEmitter<boolean>;
    constructor(sessionService: SessionService);
    ngOnInit(): void;
    /**
     * On click next day button, trigger switch start
     */
    onNextDay(): void;
    /**
     * If all slot is not avalaibles all all days
     */
    isAllSlotNotAvailable(): boolean;
    /**
     * All Availabilities by key: string, title: string, value: Moment
     */
    getAvailabilities(day: string): string[];
    getSessionTitle(day: Day, time: string): string;
    getSessionTooltip(day: Day, time: string): string;
    onTimeSlotClicked(day: Day, time: string): void;
    addSession(start: Moment, end: Moment): void;
    removeSession(source: {
        key: string;
        session: Session;
    }): void;
    /**
     * If day is busy (occupé) by current key string
     */
    isDayBusy(day: Day, time: string): boolean;
    /**
     * If slot is busy by date
     */
    isSlotBusy(day: Day, time: string): boolean;
    /**
     * if slot is on previous (date plus tôt)
     */
    isSlotEarly(day: Day, time: string): boolean;
    /**
     * is Slot in current activities
     */
    isSlotInSession(day: Day, time: string): boolean;
    isDateTimeInSessionsFromCurrentUser(day: Day, time: string): boolean;
    isSlotSessionStart(day: Day, time: string): boolean;
    isSlotSessionEnd(day: Day, time: string): boolean;
}
