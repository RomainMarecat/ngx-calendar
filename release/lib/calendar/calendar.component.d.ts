import { ChangeDetectorRef, EventEmitter, OnChanges } from '@angular/core';
import { Moment } from 'moment';
import { Twix, TwixIter } from 'twix';
import 'twix';
import { CalendarConfiguration } from '../shared/configuration/calendar-configuration';
import { Day } from '../shared/day/day';
import { OnlineSession } from '../shared/session/online-session';
import { Session } from '../shared/session/session';
import { SessionService } from '../shared/session/session.service';
export declare class CalendarComponent implements OnChanges {
    private cd;
    private sessionService;
    /**
     * User could be passed to show the owner
     */
    user: any;
    /**
     * Customer could be passed to generate a personal calendar
     */
    customer: any;
    /**
     * Online sessions definition
     */
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
     * Configuration calendar
     */
    calendarConfiguration: CalendarConfiguration;
    /**
     * When user swhitch view mode event
     */
    viewModeChanged: EventEmitter<string>;
    /**
     * Session created event
     */
    sessionCreated: EventEmitter<Session>;
    /**
     * Session removed event
     */
    sessionRemoved: EventEmitter<Session>;
    /**
     * Array of selectable days from start to end
     */
    days: Array<Day>;
    /**
     * Slot Duration in minutes
     */
    realDuration: number;
    /**
     * During days from start to end, list of entries that available
     */
    daysAvailability: Map<string, string[]>;
    /**
     * Number of busy slot in each day
     */
    daysBusySlotNumber: Map<string, number>;
    /**
     * Number of available slot in each day
     */
    daysAvailabilitySlotNumber: Map<string, number>;
    /**
     * Set of datetime who reprensents availability
     */
    busySlots: Set<string>;
    /**
     * set of datetime who represents over extends busy slot
     */
    earlySlots: Set<string>;
    /**
     * set of datetime who represents pause slot
     */
    pauseSlots: Set<string>;
    /**
     * set of datetime who represents session slot
     */
    sessionsSlots: Set<string>;
    /**
     * set of datetime who represents end slot (not used in front)
     */
    sessionsEndSlots: Set<string>;
    /**
     * Map of sessions from current user
     */
    sessions: Map<string, Session>;
    /**
     * calendar start day after set full calendar informations
     */
    private calendarStart;
    /**
     * calendar end day after set full calendar informations
     */
    private calendarEnd;
    constructor(cd: ChangeDetectorRef, sessionService: SessionService);
    /**
     * Sessions array loaded by parent component
     */
    _sessionsEntries: Session[];
    sessionsEntries: Session[];
    _viewMode: string;
    viewMode: string;
    static splitRangeToNextTime(slotTimeRange: TwixIter, slotDuration: number): {
        time: Twix;
        mmtTime: Moment;
    };
    static getMinutesDifference(mmtTime: Moment, slotDuration: number): Moment;
    static geStartEndFromStartAndSessionDuration(start: Moment, end: Moment, duration: number): {
        start: Moment;
        end: Moment;
    };
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
    loadCalendar(): void;
    /**
     * Add available days from start to end dates
     */
    setDateRange(start: Moment, end: Moment): void;
    /**
     * On switch date range
     */
    onSwithedView(viewMode: string): void;
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
     ************************************************
     */
    loadEvents(start: Moment, end: Moment): void;
    /**
     * Slot locked
     */
    buildinBusySlot(mmtEventStart: Moment, session: Session): Moment;
    /**
     * Build in sessions Map only start session with its session
     * @param eventsTimeRange
     * @param time
     * @param session
     */
    setSessionSlot(eventsTimeRange: TwixIter, time: Twix, session: Session): void;
    /**
     * Slot before availability range
     */
    buildingEarliestSlot(mmtEventStart: Moment): void;
}
