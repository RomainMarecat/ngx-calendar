import { ChangeDetectorRef, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Twix, TwixIter } from 'twix';
import 'twix';
import { CalendarConfiguration } from '../shared/configuration/calendar-configuration';
import { Day } from '../shared/day/day';
import { OnlineSession } from '../shared/session/online-session';
import { Session } from '../shared/session/session';
import { Event } from '../shared/event/event';
export declare class CalendarComponent implements OnInit, OnChanges {
    private cd;
    _viewMode: String;
    onlineSession: OnlineSession;
    /**
     * Start day of calendar (could be updated)
     */
    start: Moment;
    /**
     * End day of calendar (could be updated but reewriten on switch week mode
     */
    end: Moment;
    /**
     * Slot session duration in minutes
     */
    slotDuration: number;
    /**
     * Configuration calendar
     */
    calendarConfiguration: CalendarConfiguration;
    /**
     * calendar start day after set full calendar informations
     */
    private calendarStart;
    /**
     * calendar end day after set full calendar informations
     */
    private calendarEnd;
    sessionsEntries: Session[];
    viewModeChanged: EventEmitter<String>;
    sessionCreated: EventEmitter<Session>;
    sessionRemoved: EventEmitter<Session>;
    days: Array<Day>;
    realDuration: number;
    daysAvailability: Map<string, string[]>;
    daysBusySlotNumber: Map<string, number>;
    daysAvailabilitySlotNumber: Map<string, number>;
    busySlots: Set<string>;
    earlySlots: Set<string>;
    pauseSlots: Set<string>;
    sessionsSlots: Set<string>;
    sessionsEndSlots: Set<string>;
    sessions: Map<string, Session>;
    static splitRangeToNextTime(slotTimeRange: TwixIter, slotDuration: number): {
        time: Twix;
        mmtTime: Moment;
    };
    static getMinutesDifference(mmtTime: Moment, slotDuration: number): Moment;
    constructor(cd: ChangeDetectorRef);
    ngOnInit(): void;
    viewMode: String;
    /**
     * Inspect all changes
     */
    ngOnChanges(): void;
    /**
     * Set Default variables
     */
    setCalendar(): void;
    /**
     * Set View Mode with week, day, 3 days
     * Init start, end,
     *
     */
    setViewMode(): void;
    /**
     * On start/viewMode changed, do a recalculate of init start, end
     * days, daysAvailability and viewMode
     */
    setDateRange(): void;
    /**
     * On switch date range
     */
    onSwithedView(viewMode: String): void;
    /**
     * On start change event
     */
    onStartChanged(start: Moment): void;
    /**
     * On session added on click event
     */
    onSessionAdded(session: Session): void;
    /**
     * On removed event
     */
    onSessionRemoved(source: {
        key: string;
        session: Session;
    }): void;
    /**
     * Load all time for each days
     */
    loadAvailabilities(): void;
    /**
     * Add session event in calendar
     */
    addSession(session: Session): void;
    /**
     * Remove session event in Calendar
     */
    removeSession(session: Session): void;
    /************************************************
     ******************* Date functions **************
     *************************************************/
    loadEvents(start: Moment, end: Moment): void;
    buildinBusySlot(mmtEventStart: Moment, event: Event): Moment;
    buildingEarliestSlot(mmtEventStart: Moment): void;
}
