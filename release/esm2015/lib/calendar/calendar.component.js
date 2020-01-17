/**
 * @fileoverview added by tsickle
 * Generated from: lib/calendar/calendar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import * as moment_ from 'moment';
import 'twix';
/** @type {?} */
const moment = moment_;
export class CalendarComponent {
    /**
     * @param {?} cd
     */
    constructor(cd) {
        this.cd = cd;
        /**
         * Online sessions definition
         */
        this.onlineSession = {
            id: null,
            comment: '',
            name: '',
            max_persons: 1,
            booking_delay: 1,
            duration: 15,
            pause: 0,
            price: 10,
            start_date: '2019-01-01',
            end_date: '2030-12-31',
            start_time: '08:00',
            end_time: '19:00'
        };
        /**
         * Start day of calendar (could be updated)
         */
        this.start = moment();
        /**
         * End day of calendar (could be updated but reewriten on switch week mode
         */
        this.end = moment();
        /**
         * Configuration calendar
         */
        this.calendarConfiguration = {
            calendar: {
                cta: {
                    next: 'suivant',
                    previous: 'précédent',
                },
                today: 'aujourd\'hui',
                back_today: 'revenir à la date d\'aujourd\'hui',
                day: 'jour',
                three_days: '3 jours',
                week: 'semaine',
                title: 'réserver votre créneau',
                subtitle: 'toutes les disponibilités',
                availability: {
                    empty: 'Aucune disponibilité',
                    slot: 'Prochaine disponibilité',
                },
                session: {
                    info: 'Créneau vérrouillé'
                }
            }
        };
        /**
         * When user swhitch view mode event
         */
        this.viewModeChanged = new EventEmitter();
        /**
         * Session created event
         */
        this.sessionCreated = new EventEmitter();
        /**
         * Session removed event
         */
        this.sessionRemoved = new EventEmitter();
        /**
         * Array of selectable days from start to end
         */
        this.days = [];
        /**
         * Sessions array loaded by parent component
         */
        this._sessionsEntries = [];
        // Default View Mode of Week Component
        this._viewMode = 'week';
    }
    /**
     * @return {?}
     */
    get sessionsEntries() {
        return this._sessionsEntries;
    }
    /**
     * @param {?} sessionsEntries
     * @return {?}
     */
    set sessionsEntries(sessionsEntries) {
        if (sessionsEntries.length) {
            this._sessionsEntries = sessionsEntries;
        }
        this.loadCalendar();
    }
    /**
     * @return {?}
     */
    get viewMode() {
        return this._viewMode;
    }
    /**
     * @param {?} viewMode
     * @return {?}
     */
    set viewMode(viewMode) {
        this._viewMode = viewMode;
        this.setViewMode();
    }
    /**
     * @param {?} slotTimeRange
     * @param {?} slotDuration
     * @return {?}
     */
    static splitRangeToNextTime(slotTimeRange, slotDuration) {
        /** @type {?} */
        const time = slotTimeRange.next();
        return { time, mmtTime: CalendarComponent.getMinutesDifference(moment(time.toDate()), slotDuration) };
    }
    /**
     * @param {?} mmtTime
     * @param {?} slotDuration
     * @return {?}
     */
    static getMinutesDifference(mmtTime, slotDuration) {
        if (mmtTime.minutes() % slotDuration !== 0) {
            mmtTime.minutes(mmtTime.minutes() - (mmtTime.minutes() % slotDuration));
        }
        return mmtTime;
    }
    /**
     * @param {?} start
     * @param {?} end
     * @param {?} duration
     * @return {?}
     */
    static geStartEndFromStartAndSessionDuration(start, end, duration) {
        /** @type {?} */
        const eventsTimeRange = start.twix(end).iterate(duration, 'minutes');
        return {
            start,
            end
        };
    }
    /**
     * Inspect all changes
     * @return {?}
     */
    ngOnChanges() {
        this.loadCalendar();
    }
    /**
     * Set Default variables
     * @return {?}
     */
    setCalendar() {
        this.sessionsSlots = new Set();
        this.sessionsEndSlots = new Set();
        this.earlySlots = new Set();
        this.pauseSlots = new Set();
        this.sessions = new Map();
    }
    /**
     * Set View Mode with week, day, 3 days
     * Init start, end,
     *
     * @return {?}
     */
    setViewMode() {
        if (this.viewMode === 'day') {
            this.end = this.start;
            this.calendarStart = moment(this.start).startOf('day');
            this.calendarEnd = moment(this.end).endOf('day');
            return;
        }
        else if (this.viewMode === 'three_days') {
            this.end = moment(this.start).add(2, 'days');
            this.calendarStart = moment(this.start).startOf('day');
            this.calendarEnd = moment(this.end).endOf('day');
            return;
        }
        // Init first day week number
        /** @type {?} */
        const firstDay = 0;
        // If empty start date then start to today
        if (!this.start) {
            this.start = moment();
        }
        this.start = moment(this.start).day(firstDay);
        this.end = moment(this.start).add(6, 'days');
        this.calendarStart = moment(this.start).startOf('day');
        this.calendarEnd = moment(this.end).endOf('day');
    }
    /**
     * On start/viewMode changed, do a recalculate of init start, end
     * days, daysAvailability and viewMode
     * @return {?}
     */
    loadCalendar() {
        this.setCalendar();
        this.setViewMode();
        this.loadEvents(this.start, this.end);
        this.setDateRange(this.start, this.end);
        this.loadAvailabilities();
    }
    /**
     * Add available days from start to end dates
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    setDateRange(start, end) {
        this.daysAvailability = new Map();
        // Days range from start to end
        /** @type {?} */
        const daysRange = start
            .twix(end)
            .iterate(1, 'days');
        this.days = [];
        // Loading all days
        while (daysRange.hasNext()) {
            /** @type {?} */
            const availableDay = daysRange.next();
            this.days.push({
                title: availableDay.format('DD/MM/YYYY'),
                key: availableDay.format('YYYY-MM-DD'),
                value: moment(availableDay.toDate())
            });
            this.daysAvailability.set(availableDay.format('YYYY-MM-DD'), []);
        }
    }
    /**
     * On switch date range
     * @param {?} viewMode
     * @return {?}
     */
    onSwithedView(viewMode) {
        this.viewMode = viewMode;
        this.viewModeChanged.emit(viewMode);
        this.loadCalendar();
    }
    /**
     * On start change event
     * @param {?} start
     * @return {?}
     */
    onStartChanged(start) {
        this.start = start;
        this.loadCalendar();
    }
    /**
     * On session added on click event
     * @param {?} session
     * @return {?}
     */
    onSessionAdded(session) {
        this.sessions.set(moment(session.start).format('YYYY-MM-DDHH:mm'), session);
        this.addSession(session);
        this.sessionCreated.emit(session);
    }
    /**
     * On removed event
     * @param {?} source
     * @return {?}
     */
    onSessionRemoved(source) {
        this.sessions.delete(source.key);
        this.removeSession(source.session);
        this.sessionRemoved.emit(source.session);
    }
    /**
     * Load all time for each days
     * @return {?}
     */
    loadAvailabilities() {
        // no online session no calendar
        if (!this.daysAvailability || !this.onlineSession) {
            return;
        }
        // session duration
        this.realDuration = this.onlineSession.duration;
        // session day start 00:00 - end 23:59
        /** @type {?} */
        const onlineSessionStart = moment(this.onlineSession.start_date, 'YYYY-MM-DD').startOf('day');
        /** @type {?} */
        const onlineSessionEnd = moment(this.onlineSession.end_date, 'YYYY-MM-DD').endOf('day');
        this.daysAvailabilitySlotNumber = new Map();
        this.daysAvailability.forEach((/**
         * @param {?} avbs
         * @param {?} day
         * @return {?}
         */
        (avbs, day) => {
            /** @type {?} */
            let slotsNumber = 0;
            // each day of days availability with start time 08:00
            /** @type {?} */
            const mmtDay = moment(day, 'YYYY-MM-DD').hour(8);
            /** @type {?} */
            const mmtDayStartTime = moment(day + this.onlineSession.start_time, 'YYYY-MMDDHH:mm');
            // If session start time like 08:00 is before start today 00:00
            if (mmtDayStartTime.isBefore(moment().startOf('day'))) {
                return;
            }
            // booking delay
            /** @type {?} */
            const minMmtStartTime = moment().add(this.onlineSession.booking_delay, 'hours');
            // session time end
            /** @type {?} */
            const mmtDayEndTime = moment(day + this.onlineSession.end_time, 'YYYY-MM-DDHH:mm');
            mmtDayEndTime.subtract(this.realDuration, 'minutes');
            // slots iterator
            /** @type {?} */
            const timeRange = mmtDayStartTime.twix(mmtDayEndTime)
                .iterate(this.onlineSession.duration, 'minutes');
            if (this.calendarStart && this.calendarEnd && mmtDay.isBetween(onlineSessionStart, onlineSessionEnd)) {
                while (timeRange.hasNext()) {
                    /** @type {?} */
                    const time = timeRange.next();
                    /** @type {?} */
                    const timeMmt = moment(time.toDate());
                    if (!timeMmt.isBefore(minMmtStartTime)) {
                        avbs.push(time.format('HH:mm'));
                        slotsNumber++;
                    }
                }
            }
            this.daysAvailabilitySlotNumber.set(day, slotsNumber);
        }));
    }
    /**
     * Add session event in calendar
     * @param {?} session
     * @return {?}
     */
    addSession(session) {
        /** @type {?} */
        const mmtStart = moment(session.start);
        /** @type {?} */
        const mmtEnd = moment(session.end);
        /** @type {?} */
        const timeInnerRange = mmtStart.twix(mmtEnd).iterateInner(session.duration, 'minutes');
        while (timeInnerRange.hasNext()) {
            /** @type {?} */
            const time = timeInnerRange.next();
            this.sessionsSlots.add(time.format('YYYY-MM-DDHH:mm'));
            if (!timeInnerRange.hasNext()) {
                this.sessionsEndSlots.add(time.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* building earliest slot before event */
        /** @type {?} */
        const mmtEarlyStart = mmtStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % session.duration) + session.duration);
        /** @type {?} */
        const timeEarlierRange = mmtEarlyStart.twix(mmtStart).iterate(session.duration, 'minutes');
        while (timeEarlierRange.hasNext()) {
            /** @type {?} */
            const time = timeEarlierRange.next();
            /** @type {?} */
            const mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.duration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                this.earlySlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* building pause slots after event */
        /** @type {?} */
        const mmtEarlyEnd = mmtEnd.clone();
        mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.duration);
        /** @type {?} */
        const mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
        /** @type {?} */
        const timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.duration, 'minutes');
        while (timePauseRange.hasNext()) {
            /** @type {?} */
            const time = timePauseRange.next();
            /** @type {?} */
            const mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.duration);
            if (mmtTime.isSameOrAfter(mmtEarlyEnd) && mmtTime.isBefore(mmtPauseEnd)) {
                this.pauseSlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
    }
    /**
     * Remove session event in Calendar
     * @param {?} session
     * @return {?}
     */
    removeSession(session) {
        /** @type {?} */
        const mmtStart = moment(session.start);
        /** @type {?} */
        const mmtEnd = moment(session.end);
        /** @type {?} */
        const timeInnerRange = mmtStart.twix(mmtEnd).iterate(session.duration, 'minutes');
        while (timeInnerRange.hasNext()) {
            /** @type {?} */
            const time = timeInnerRange.next();
            this.sessionsSlots.delete(time.format('YYYY-MM-DDHH:mm'));
            if (!timeInnerRange.hasNext()) {
                this.sessionsEndSlots.delete(time.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* removing early slots */
        /** @type {?} */
        const mmtEarlyStart = mmtStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % session.duration) + session.duration);
        /** @type {?} */
        const timeEarlyRange = mmtEarlyStart.twix(mmtStart).iterate(session.duration, 'minutes');
        while (timeEarlyRange.hasNext()) {
            /** @type {?} */
            const time = timeEarlyRange.next();
            /** @type {?} */
            const mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.duration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                this.earlySlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* removing pause slots */
        if (session.pause) {
            /** @type {?} */
            const mmtEarlyEnd = mmtEnd.clone();
            mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.duration);
            /** @type {?} */
            const mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
            /** @type {?} */
            const timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.duration, 'minutes');
            while (timePauseRange.hasNext()) {
                /** @type {?} */
                const time = timePauseRange.next();
                /** @type {?} */
                const mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.duration);
                if (mmtTime.isSameOrAfter(mmtEarlyEnd) && mmtTime.isBefore(mmtPauseEnd)) {
                    this.pauseSlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
                }
            }
        }
    }
    /**
     * *********************************************
     * ****************** Date functions **************
     * ***********************************************
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    loadEvents(start, end) {
        this.busySlots = new Set();
        this.daysBusySlotNumber = new Map();
        if (Array.isArray(this._sessionsEntries) && this._sessionsEntries.length) {
            this._sessionsEntries = [
                ...this._sessionsEntries.filter((/**
                 * @param {?} session
                 * @return {?}
                 */
                (session) => {
                    if (moment(session.start).isSameOrAfter(start) &&
                        moment(session.end).isSameOrBefore(end)) {
                        /** @type {?} */
                        let mmtEventStart = moment(session.start, 'YYYY-MM-DDHH:mm');
                        mmtEventStart = this.buildinBusySlot(mmtEventStart, session);
                        this.buildingEarliestSlot(mmtEventStart);
                        return true;
                    }
                    return false;
                }))
            ];
        }
        this.cd.markForCheck();
    }
    /**
     * Slot locked
     * @param {?} mmtEventStart
     * @param {?} session
     * @return {?}
     */
    buildinBusySlot(mmtEventStart, session) {
        /** @type {?} */
        const mmtEventEnd = moment(session.end, 'YYYY-MM-DDHH:mm');
        if (!mmtEventStart || !mmtEventStart.isValid()
            || !mmtEventEnd || !mmtEventEnd.isValid()
            || !mmtEventStart.isBefore(mmtEventEnd)) {
            console.error('invalid dates');
            return null;
        }
        /* building busy slots by events */
        /** @type {?} */
        const eventsTimeRange = mmtEventStart.twix(mmtEventEnd).iterate(session.duration, 'minutes');
        while (eventsTimeRange.hasNext()) {
            const { time, mmtTime } = CalendarComponent.splitRangeToNextTime(eventsTimeRange, session.duration);
            /* IF the busy slot is availabe and not already in busySlots we count it */
            if (this.daysAvailability && this.daysAvailability.has(time.format('YYYY-MM-DD')) &&
                !this.busySlots.has(time.format('YYYY-MM-DDHH:mm')) &&
                this.daysAvailability.get(time.format('YYYY-MM-DD')).indexOf(time.format('HH:mm')) >= 0) {
                if ((!session.user ||
                    (session.user &&
                        session.user.uid !== this.user.uid))) {
                    /** @type {?} */
                    let dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
                        this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
                    dayBusyNumber++;
                    this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
                    this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
                }
                if (session.user && session.user.uid === this.user.uid) {
                    this.sessionsSlots.add(time.format('YYYY-MM-DDHH:mm'));
                    this.sessions.set(time.format('YYYY-MM-DDHH:mm'), session);
                    if (!eventsTimeRange.hasNext()) {
                        this.sessionsEndSlots.add(time.format('YYYY-MM-DDHH:mm'));
                    }
                }
            }
        }
        return mmtEventStart;
    }
    /**
     * Slot before availability range
     * @param {?} mmtEventStart
     * @return {?}
     */
    buildingEarliestSlot(mmtEventStart) {
        /* building earliest slot before event */
        /** @type {?} */
        const mmtEarlyStart = mmtEventStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % this.onlineSession.duration) + this.onlineSession.duration);
        /** @type {?} */
        const earliestTimeRange = mmtEarlyStart.twix(mmtEventStart).iterate(this.onlineSession.duration, 'minutes');
        while (earliestTimeRange.hasNext()) {
            const { time, mmtTime } = CalendarComponent.splitRangeToNextTime(earliestTimeRange, this.onlineSession.duration);
            /* IF the busy slot is in availability and not already in busySloits we count it */
            if (this.daysAvailability && this.daysAvailability.has(time.format('YYYY-MM-DD'))
                && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
                && this.daysAvailability.get(time.format('YYYY-MM-DD')).indexOf(time.format('HH:mm')) >= 0) {
                /** @type {?} */
                let dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
                    this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
                dayBusyNumber++;
                this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
            }
            this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
        }
    }
}
CalendarComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable
                selector: 'ngx-calendar',
                // tslint:enable
                template: "<div class=\"week-calendar-wrapper\">\n  <div class=\"week-calendar-header\">\n\n\n    <div class=\"week-calendar-title\">\n\n\n      <lib-calendar-header [start]=\"start\"\n                           [end]=\"end\"\n                           [headerConfiguration]=\"calendarConfiguration\"\n                           [viewMode]=\"viewMode\"\n                           (switchedView)=\"onSwithedView($event)\"\n                           (startChanged)=\"onStartChanged($event)\"></lib-calendar-header>\n\n    </div>\n\n  </div>\n\n  <div>\n\n\n    <lib-calendar-body [bodyConfiguration]=\"calendarConfiguration\"\n                       [onlineSession]=\"onlineSession\"\n                       [days]=\"days\"\n                       [viewMode]=\"viewMode\"\n                       [start]=\"start\"\n                       [end]=\"end\"\n                       [daysAvailability]=\"daysAvailability\"\n                       [daysBusySlotNumber]=\"daysBusySlotNumber\"\n                       [daysAvailabilitySlotNumber]=\"daysAvailabilitySlotNumber\"\n                       [busySlots]=\"busySlots\"\n                       [user]=\"user\"\n                       [earlySlots]=\"earlySlots\"\n                       [pauseSlots]=\"pauseSlots\"\n                       [sessionsSlots]=\"sessionsSlots\"\n                       [sessionsEndSlots]=\"sessionsEndSlots\"\n                       [sessions]=\"sessions\"\n                       (startChanged)=\"onStartChanged($event)\"\n                       (sessionAdded)=\"onSessionAdded($event)\"\n                       (sessionRemoved)=\"onSessionRemoved($event)\"\n                       *ngIf=\"start && end && days && viewMode\"></lib-calendar-body>\n\n  </div>\n</div>\n",
                styles: [".week-calendar-wrapper .week-calendar-header{padding-bottom:20px}@media (min-width:768px){.week-calendar-wrapper .week-calendar-header .week-calendar-title{width:90vw}}"]
            }] }
];
/** @nocollapse */
CalendarComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
CalendarComponent.propDecorators = {
    user: [{ type: Input }],
    onlineSession: [{ type: Input }],
    start: [{ type: Input }],
    end: [{ type: Input }],
    calendarConfiguration: [{ type: Input }],
    viewModeChanged: [{ type: Output }],
    sessionCreated: [{ type: Output }],
    sessionRemoved: [{ type: Output }],
    sessionsEntries: [{ type: Input }],
    viewMode: [{ type: Input }]
};
if (false) {
    /**
     * User could be passed to generate a personal calendar
     * @type {?}
     */
    CalendarComponent.prototype.user;
    /**
     * Online sessions definition
     * @type {?}
     */
    CalendarComponent.prototype.onlineSession;
    /**
     * Start day of calendar (could be updated)
     * @type {?}
     */
    CalendarComponent.prototype.start;
    /**
     * End day of calendar (could be updated but reewriten on switch week mode
     * @type {?}
     */
    CalendarComponent.prototype.end;
    /**
     * Configuration calendar
     * @type {?}
     */
    CalendarComponent.prototype.calendarConfiguration;
    /**
     * When user swhitch view mode event
     * @type {?}
     */
    CalendarComponent.prototype.viewModeChanged;
    /**
     * Session created event
     * @type {?}
     */
    CalendarComponent.prototype.sessionCreated;
    /**
     * Session removed event
     * @type {?}
     */
    CalendarComponent.prototype.sessionRemoved;
    /**
     * Array of selectable days from start to end
     * @type {?}
     */
    CalendarComponent.prototype.days;
    /**
     * Slot Duration in minutes
     * @type {?}
     */
    CalendarComponent.prototype.realDuration;
    /**
     * During days from start to end, list of entries that available
     * @type {?}
     */
    CalendarComponent.prototype.daysAvailability;
    /**
     * Number of busy slot in each day
     * @type {?}
     */
    CalendarComponent.prototype.daysBusySlotNumber;
    /**
     * Number of available slot in each day
     * @type {?}
     */
    CalendarComponent.prototype.daysAvailabilitySlotNumber;
    /**
     * Set of datetime who reprensents availability
     * @type {?}
     */
    CalendarComponent.prototype.busySlots;
    /**
     * set of datetime who represents over extends busy slot
     * @type {?}
     */
    CalendarComponent.prototype.earlySlots;
    /**
     * set of datetime who represents pause slot
     * @type {?}
     */
    CalendarComponent.prototype.pauseSlots;
    /**
     * set of datetime who represents session slot
     * @type {?}
     */
    CalendarComponent.prototype.sessionsSlots;
    /**
     * set of datetime who represents end slot (not used in front)
     * @type {?}
     */
    CalendarComponent.prototype.sessionsEndSlots;
    /**
     * Map of sessions from current user
     * @type {?}
     */
    CalendarComponent.prototype.sessions;
    /**
     * calendar start day after set full calendar informations
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.calendarStart;
    /**
     * calendar end day after set full calendar informations
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.calendarEnd;
    /**
     * Sessions array loaded by parent component
     * @type {?}
     */
    CalendarComponent.prototype._sessionsEntries;
    /** @type {?} */
    CalendarComponent.prototype._viewMode;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEdBQUcsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFHbEMsT0FBTyxNQUFNLENBQUM7O01BTVIsTUFBTSxHQUFHLE9BQU87QUFTdEIsTUFBTSxPQUFPLGlCQUFpQjs7OztJQTRINUIsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7Ozs7UUFoSGhDLGtCQUFhLEdBQWtCO1lBQ3RDLEVBQUUsRUFBRSxJQUFJO1lBQ1IsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLEVBQUUsRUFBRTtZQUNSLFdBQVcsRUFBRSxDQUFDO1lBQ2QsYUFBYSxFQUFFLENBQUM7WUFDaEIsUUFBUSxFQUFFLEVBQUU7WUFDWixLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxFQUFFO1lBQ1QsVUFBVSxFQUFFLFlBQVk7WUFDeEIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsVUFBVSxFQUFFLE9BQU87WUFDbkIsUUFBUSxFQUFFLE9BQU87U0FDbEIsQ0FBQzs7OztRQUlPLFVBQUssR0FBVyxNQUFNLEVBQUUsQ0FBQzs7OztRQUl6QixRQUFHLEdBQVcsTUFBTSxFQUFFLENBQUM7Ozs7UUFJdkIsMEJBQXFCLEdBQTBCO1lBQ3RELFFBQVEsRUFBRTtnQkFDUixHQUFHLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCO2dCQUNELEtBQUssRUFBRSxjQUFjO2dCQUNyQixVQUFVLEVBQUUsbUNBQW1DO2dCQUMv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UyxTQUFDOztnQkFFVCxRQUFRLEVBQUUsY0FBYzs7Z0JBRXhCLGl0REFBd0M7O2FBRXpDOzs7O1lBbEJRLGlCQUFpQjs7O21CQXVCdkIsS0FBSzs0QkFRTCxLQUFLO29CQWlCTCxLQUFLO2tCQUlMLEtBQUs7b0NBSUwsS0FBSzs4QkF5QkwsTUFBTTs2QkFJTixNQUFNOzZCQUlOLE1BQU07OEJBa0VOLEtBQUs7dUJBY0wsS0FBSzs7Ozs7OztJQWxKTixpQ0FJRTs7Ozs7SUFJRiwwQ0FhRTs7Ozs7SUFJRixrQ0FBa0M7Ozs7O0lBSWxDLGdDQUFnQzs7Ozs7SUFJaEMsa0RBcUJFOzs7OztJQUlGLDRDQUE2RTs7Ozs7SUFJN0UsMkNBQThFOzs7OztJQUk5RSwyQ0FBOEU7Ozs7O0lBSTlFLGlDQUFzQjs7Ozs7SUFJdEIseUNBQXFCOzs7OztJQUlyQiw2Q0FBd0M7Ozs7O0lBSXhDLCtDQUF3Qzs7Ozs7SUFJeEMsdURBQWdEOzs7OztJQUloRCxzQ0FBdUI7Ozs7O0lBSXZCLHVDQUF3Qjs7Ozs7SUFJeEIsdUNBQXdCOzs7OztJQUl4QiwwQ0FBMkI7Ozs7O0lBSTNCLDZDQUE4Qjs7Ozs7SUFJOUIscUNBQStCOzs7Ozs7SUFJL0IsMENBQThCOzs7Ozs7SUFJOUIsd0NBQTRCOzs7OztJQVE1Qiw2Q0FBaUM7O0lBY2pDLHNDQUFtQjs7Ozs7SUFwQlAsK0JBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgVHdpeCwgVHdpeEl0ZXIgfSBmcm9tICd0d2l4JztcbmltcG9ydCAndHdpeCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9zaGFyZWQvY29uZmlndXJhdGlvbi9jYWxlbmRhci1jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IERheSB9IGZyb20gJy4uL3NoYXJlZC9kYXkvZGF5JztcbmltcG9ydCB7IE9ubGluZVNlc3Npb24gfSBmcm9tICcuLi9zaGFyZWQvc2Vzc2lvbi9vbmxpbmUtc2Vzc2lvbic7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vc2hhcmVkL3Nlc3Npb24vc2Vzc2lvbic7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZVxuICBzZWxlY3RvcjogJ25neC1jYWxlbmRhcicsXG4gIC8vIHRzbGludDplbmFibGVcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBVc2VyIGNvdWxkIGJlIHBhc3NlZCB0byBnZW5lcmF0ZSBhIHBlcnNvbmFsIGNhbGVuZGFyXG4gICAqL1xuICBASW5wdXQoKSB1c2VyOiB7XG4gICAgdWlkOiBzdHJpbmc7XG4gICAgZGlzcGxheU5hbWU6IHN0cmluZztcbiAgICBlbWFpbDogc3RyaW5nO1xuICB9O1xuICAvKipcbiAgICogT25saW5lIHNlc3Npb25zIGRlZmluaXRpb25cbiAgICovXG4gIEBJbnB1dCgpIG9ubGluZVNlc3Npb246IE9ubGluZVNlc3Npb24gPSB7XG4gICAgaWQ6IG51bGwsXG4gICAgY29tbWVudDogJycsXG4gICAgbmFtZTogJycsXG4gICAgbWF4X3BlcnNvbnM6IDEsXG4gICAgYm9va2luZ19kZWxheTogMSxcbiAgICBkdXJhdGlvbjogMTUsXG4gICAgcGF1c2U6IDAsXG4gICAgcHJpY2U6IDEwLFxuICAgIHN0YXJ0X2RhdGU6ICcyMDE5LTAxLTAxJyxcbiAgICBlbmRfZGF0ZTogJzIwMzAtMTItMzEnLFxuICAgIHN0YXJ0X3RpbWU6ICcwODowMCcsXG4gICAgZW5kX3RpbWU6ICcxOTowMCdcbiAgfTtcbiAgLyoqXG4gICAqIFN0YXJ0IGRheSBvZiBjYWxlbmRhciAoY291bGQgYmUgdXBkYXRlZClcbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0OiBNb21lbnQgPSBtb21lbnQoKTtcbiAgLyoqXG4gICAqIEVuZCBkYXkgb2YgY2FsZW5kYXIgKGNvdWxkIGJlIHVwZGF0ZWQgYnV0IHJlZXdyaXRlbiBvbiBzd2l0Y2ggd2VlayBtb2RlXG4gICAqL1xuICBASW5wdXQoKSBlbmQ6IE1vbWVudCA9IG1vbWVudCgpO1xuICAvKipcbiAgICogQ29uZmlndXJhdGlvbiBjYWxlbmRhclxuICAgKi9cbiAgQElucHV0KCkgY2FsZW5kYXJDb25maWd1cmF0aW9uOiBDYWxlbmRhckNvbmZpZ3VyYXRpb24gPSB7XG4gICAgY2FsZW5kYXI6IHtcbiAgICAgIGN0YToge1xuICAgICAgICBuZXh0OiAnc3VpdmFudCcsXG4gICAgICAgIHByZXZpb3VzOiAncHLDqWPDqWRlbnQnLFxuICAgICAgfSxcbiAgICAgIHRvZGF5OiAnYXVqb3VyZFxcJ2h1aScsXG4gICAgICBiYWNrX3RvZGF5OiAncmV2ZW5pciDDoCBsYSBkYXRlIGRcXCdhdWpvdXJkXFwnaHVpJyxcbiAgICAgIGRheTogJ2pvdXInLFxuICAgICAgdGhyZWVfZGF5czogJzMgam91cnMnLFxuICAgICAgd2VlazogJ3NlbWFpbmUnLFxuICAgICAgdGl0bGU6ICdyw6lzZXJ2ZXIgdm90cmUgY3LDqW5lYXUnLFxuICAgICAgc3VidGl0bGU6ICd0b3V0ZXMgbGVzIGRpc3BvbmliaWxpdMOpcycsXG4gICAgICBhdmFpbGFiaWxpdHk6IHtcbiAgICAgICAgZW1wdHk6ICdBdWN1bmUgZGlzcG9uaWJpbGl0w6knLFxuICAgICAgICBzbG90OiAnUHJvY2hhaW5lIGRpc3BvbmliaWxpdMOpJyxcbiAgICAgIH0sXG4gICAgICBzZXNzaW9uOiB7XG4gICAgICAgIGluZm86ICdDcsOpbmVhdSB2w6lycm91aWxsw6knXG4gICAgICB9XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogV2hlbiB1c2VyIHN3aGl0Y2ggdmlldyBtb2RlIGV2ZW50XG4gICAqL1xuICBAT3V0cHV0KCkgdmlld01vZGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAvKipcbiAgICogU2Vzc2lvbiBjcmVhdGVkIGV2ZW50XG4gICAqL1xuICBAT3V0cHV0KCkgc2Vzc2lvbkNyZWF0ZWQ6IEV2ZW50RW1pdHRlcjxTZXNzaW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4oKTtcbiAgLyoqXG4gICAqIFNlc3Npb24gcmVtb3ZlZCBldmVudFxuICAgKi9cbiAgQE91dHB1dCgpIHNlc3Npb25SZW1vdmVkOiBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlc3Npb24+KCk7XG4gIC8qKlxuICAgKiBBcnJheSBvZiBzZWxlY3RhYmxlIGRheXMgZnJvbSBzdGFydCB0byBlbmRcbiAgICovXG4gIGRheXM6IEFycmF5PERheT4gPSBbXTtcbiAgLyoqXG4gICAqIFNsb3QgRHVyYXRpb24gaW4gbWludXRlc1xuICAgKi9cbiAgcmVhbER1cmF0aW9uOiBudW1iZXI7XG4gIC8qKlxuICAgKiBEdXJpbmcgZGF5cyBmcm9tIHN0YXJ0IHRvIGVuZCwgbGlzdCBvZiBlbnRyaWVzIHRoYXQgYXZhaWxhYmxlXG4gICAqL1xuICBkYXlzQXZhaWxhYmlsaXR5OiBNYXA8c3RyaW5nLCBzdHJpbmdbXT47XG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgYnVzeSBzbG90IGluIGVhY2ggZGF5XG4gICAqL1xuICBkYXlzQnVzeVNsb3ROdW1iZXI6IE1hcDxzdHJpbmcsIG51bWJlcj47XG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgYXZhaWxhYmxlIHNsb3QgaW4gZWFjaCBkYXlcbiAgICovXG4gIGRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyOiBNYXA8c3RyaW5nLCBudW1iZXI+O1xuICAvKipcbiAgICogU2V0IG9mIGRhdGV0aW1lIHdobyByZXByZW5zZW50cyBhdmFpbGFiaWxpdHlcbiAgICovXG4gIGJ1c3lTbG90czogU2V0PHN0cmluZz47XG4gIC8qKlxuICAgKiBzZXQgb2YgZGF0ZXRpbWUgd2hvIHJlcHJlc2VudHMgb3ZlciBleHRlbmRzIGJ1c3kgc2xvdFxuICAgKi9cbiAgZWFybHlTbG90czogU2V0PHN0cmluZz47XG4gIC8qKlxuICAgKiBzZXQgb2YgZGF0ZXRpbWUgd2hvIHJlcHJlc2VudHMgcGF1c2Ugc2xvdFxuICAgKi9cbiAgcGF1c2VTbG90czogU2V0PHN0cmluZz47XG4gIC8qKlxuICAgKiBzZXQgb2YgZGF0ZXRpbWUgd2hvIHJlcHJlc2VudHMgc2Vzc2lvbiBzbG90XG4gICAqL1xuICBzZXNzaW9uc1Nsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIHNldCBvZiBkYXRldGltZSB3aG8gcmVwcmVzZW50cyBlbmQgc2xvdCAobm90IHVzZWQgaW4gZnJvbnQpXG4gICAqL1xuICBzZXNzaW9uc0VuZFNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIE1hcCBvZiBzZXNzaW9ucyBmcm9tIGN1cnJlbnQgdXNlclxuICAgKi9cbiAgc2Vzc2lvbnM6IE1hcDxzdHJpbmcsIFNlc3Npb24+O1xuICAvKipcbiAgICogY2FsZW5kYXIgc3RhcnQgZGF5IGFmdGVyIHNldCBmdWxsIGNhbGVuZGFyIGluZm9ybWF0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBjYWxlbmRhclN0YXJ0OiBNb21lbnQ7XG4gIC8qKlxuICAgKiBjYWxlbmRhciBlbmQgZGF5IGFmdGVyIHNldCBmdWxsIGNhbGVuZGFyIGluZm9ybWF0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBjYWxlbmRhckVuZDogTW9tZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gIH1cblxuICAvKipcbiAgICogU2Vzc2lvbnMgYXJyYXkgbG9hZGVkIGJ5IHBhcmVudCBjb21wb25lbnRcbiAgICovXG4gIF9zZXNzaW9uc0VudHJpZXM6IFNlc3Npb25bXSA9IFtdO1xuXG4gIGdldCBzZXNzaW9uc0VudHJpZXMoKTogU2Vzc2lvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbnNFbnRyaWVzO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHNlc3Npb25zRW50cmllcyhzZXNzaW9uc0VudHJpZXM6IFNlc3Npb25bXSkge1xuICAgIGlmIChzZXNzaW9uc0VudHJpZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9zZXNzaW9uc0VudHJpZXMgPSBzZXNzaW9uc0VudHJpZXM7XG4gICAgfVxuICAgIHRoaXMubG9hZENhbGVuZGFyKCk7XG4gIH1cblxuICAvLyBEZWZhdWx0IFZpZXcgTW9kZSBvZiBXZWVrIENvbXBvbmVudFxuICBfdmlld01vZGUgPSAnd2Vlayc7XG5cbiAgZ2V0IHZpZXdNb2RlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNb2RlO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHZpZXdNb2RlKHZpZXdNb2RlKSB7XG4gICAgdGhpcy5fdmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLnNldFZpZXdNb2RlKCk7XG4gIH1cblxuICBzdGF0aWMgc3BsaXRSYW5nZVRvTmV4dFRpbWUoc2xvdFRpbWVSYW5nZTogVHdpeEl0ZXIsIHNsb3REdXJhdGlvbjogbnVtYmVyKToge3RpbWU6IFR3aXgsIG1tdFRpbWU6IE1vbWVudH0ge1xuICAgIGNvbnN0IHRpbWU6IFR3aXggPSBzbG90VGltZVJhbmdlLm5leHQoKTtcbiAgICByZXR1cm4ge3RpbWUsIG1tdFRpbWU6IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgc2xvdER1cmF0aW9uKX07XG4gIH1cblxuICBzdGF0aWMgZ2V0TWludXRlc0RpZmZlcmVuY2UobW10VGltZTogTW9tZW50LCBzbG90RHVyYXRpb246IG51bWJlcik6IE1vbWVudCB7XG4gICAgaWYgKG1tdFRpbWUubWludXRlcygpICUgc2xvdER1cmF0aW9uICE9PSAwKSB7XG4gICAgICBtbXRUaW1lLm1pbnV0ZXMobW10VGltZS5taW51dGVzKCkgLSAobW10VGltZS5taW51dGVzKCkgJSBzbG90RHVyYXRpb24pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW10VGltZTtcbiAgfVxuXG4gIHN0YXRpYyBnZVN0YXJ0RW5kRnJvbVN0YXJ0QW5kU2Vzc2lvbkR1cmF0aW9uKHN0YXJ0OiBNb21lbnQsIGVuZDogTW9tZW50LCBkdXJhdGlvbjogbnVtYmVyKToge3N0YXJ0OiBNb21lbnQsIGVuZDogTW9tZW50fSB7XG4gICAgY29uc3QgZXZlbnRzVGltZVJhbmdlOiBUd2l4SXRlciA9IHN0YXJ0LnR3aXgoZW5kKS5pdGVyYXRlKGR1cmF0aW9uLCAnbWludXRlcycpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0LFxuICAgICAgZW5kXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNwZWN0IGFsbCBjaGFuZ2VzXG4gICAqL1xuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBEZWZhdWx0IHZhcmlhYmxlc1xuICAgKi9cbiAgc2V0Q2FsZW5kYXIoKSB7XG4gICAgdGhpcy5zZXNzaW9uc1Nsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLmVhcmx5U2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5wYXVzZVNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuc2Vzc2lvbnMgPSBuZXcgTWFwKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFZpZXcgTW9kZSB3aXRoIHdlZWssIGRheSwgMyBkYXlzXG4gICAqIEluaXQgc3RhcnQsIGVuZCxcbiAgICpcbiAgICovXG4gIHNldFZpZXdNb2RlKCkge1xuICAgIGlmICh0aGlzLnZpZXdNb2RlID09PSAnZGF5Jykge1xuICAgICAgdGhpcy5lbmQgPSB0aGlzLnN0YXJ0O1xuICAgICAgdGhpcy5jYWxlbmRhclN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLnN0YXJ0T2YoJ2RheScpO1xuICAgICAgdGhpcy5jYWxlbmRhckVuZCA9IG1vbWVudCh0aGlzLmVuZCkuZW5kT2YoJ2RheScpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3RocmVlX2RheXMnKSB7XG4gICAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoMiwgJ2RheXMnKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdGFydE9mKCdkYXknKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJFbmQgPSBtb21lbnQodGhpcy5lbmQpLmVuZE9mKCdkYXknKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gSW5pdCBmaXJzdCBkYXkgd2VlayBudW1iZXJcbiAgICBjb25zdCBmaXJzdERheSA9IDA7XG4gICAgLy8gSWYgZW1wdHkgc3RhcnQgZGF0ZSB0aGVuIHN0YXJ0IHRvIHRvZGF5XG4gICAgaWYgKCF0aGlzLnN0YXJ0KSB7XG4gICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KCk7XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuZGF5KGZpcnN0RGF5KTtcbiAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoNiwgJ2RheXMnKTtcblxuICAgIHRoaXMuY2FsZW5kYXJTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdGFydE9mKCdkYXknKTtcbiAgICB0aGlzLmNhbGVuZGFyRW5kID0gbW9tZW50KHRoaXMuZW5kKS5lbmRPZignZGF5Jyk7XG4gIH1cblxuICAvKipcbiAgICogT24gc3RhcnQvdmlld01vZGUgY2hhbmdlZCwgZG8gYSByZWNhbGN1bGF0ZSBvZiBpbml0IHN0YXJ0LCBlbmRcbiAgICogZGF5cywgZGF5c0F2YWlsYWJpbGl0eSBhbmQgdmlld01vZGVcbiAgICovXG4gIGxvYWRDYWxlbmRhcigpIHtcbiAgICB0aGlzLnNldENhbGVuZGFyKCk7XG4gICAgdGhpcy5zZXRWaWV3TW9kZSgpO1xuICAgIHRoaXMubG9hZEV2ZW50cyh0aGlzLnN0YXJ0LCB0aGlzLmVuZCk7XG4gICAgdGhpcy5zZXREYXRlUmFuZ2UodGhpcy5zdGFydCwgdGhpcy5lbmQpO1xuICAgIHRoaXMubG9hZEF2YWlsYWJpbGl0aWVzKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGF2YWlsYWJsZSBkYXlzIGZyb20gc3RhcnQgdG8gZW5kIGRhdGVzXG4gICAqL1xuICBzZXREYXRlUmFuZ2Uoc3RhcnQ6IE1vbWVudCwgZW5kOiBNb21lbnQpIHtcbiAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkgPSBuZXcgTWFwKCk7XG4gICAgLy8gRGF5cyByYW5nZSBmcm9tIHN0YXJ0IHRvIGVuZFxuICAgIGNvbnN0IGRheXNSYW5nZTogVHdpeEl0ZXIgPSBzdGFydFxuICAgICAgLnR3aXgoZW5kKVxuICAgICAgLml0ZXJhdGUoMSwgJ2RheXMnKTtcbiAgICB0aGlzLmRheXMgPSBbXTtcbiAgICAvLyBMb2FkaW5nIGFsbCBkYXlzXG4gICAgd2hpbGUgKGRheXNSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZURheTogVHdpeCA9IGRheXNSYW5nZS5uZXh0KCk7XG4gICAgICB0aGlzLmRheXMucHVzaCh7XG4gICAgICAgIHRpdGxlOiBhdmFpbGFibGVEYXkuZm9ybWF0KCdERC9NTS9ZWVlZJyksXG4gICAgICAgIGtleTogYXZhaWxhYmxlRGF5LmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgICB2YWx1ZTogbW9tZW50KGF2YWlsYWJsZURheS50b0RhdGUoKSlcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LnNldChhdmFpbGFibGVEYXkuZm9ybWF0KCdZWVlZLU1NLUREJyksIFtdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT24gc3dpdGNoIGRhdGUgcmFuZ2VcbiAgICovXG4gIG9uU3dpdGhlZFZpZXcodmlld01vZGU6IHN0cmluZykge1xuICAgIHRoaXMudmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLnZpZXdNb2RlQ2hhbmdlZC5lbWl0KHZpZXdNb2RlKTtcbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHN0YXJ0IGNoYW5nZSBldmVudFxuICAgKi9cbiAgb25TdGFydENoYW5nZWQoc3RhcnQ6IE1vbWVudCkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHNlc3Npb24gYWRkZWQgb24gY2xpY2sgZXZlbnRcbiAgICovXG4gIG9uU2Vzc2lvbkFkZGVkKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICB0aGlzLnNlc3Npb25zLnNldChtb21lbnQoc2Vzc2lvbi5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSwgc2Vzc2lvbik7XG4gICAgdGhpcy5hZGRTZXNzaW9uKHNlc3Npb24pO1xuICAgIHRoaXMuc2Vzc2lvbkNyZWF0ZWQuZW1pdChzZXNzaW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiByZW1vdmVkIGV2ZW50XG4gICAqL1xuICBvblNlc3Npb25SZW1vdmVkKHNvdXJjZToge2tleTogc3RyaW5nLCBzZXNzaW9uOiBTZXNzaW9ufSkge1xuICAgIHRoaXMuc2Vzc2lvbnMuZGVsZXRlKHNvdXJjZS5rZXkpO1xuICAgIHRoaXMucmVtb3ZlU2Vzc2lvbihzb3VyY2Uuc2Vzc2lvbik7XG4gICAgdGhpcy5zZXNzaW9uUmVtb3ZlZC5lbWl0KHNvdXJjZS5zZXNzaW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGFsbCB0aW1lIGZvciBlYWNoIGRheXNcbiAgICovXG4gIGxvYWRBdmFpbGFiaWxpdGllcygpIHtcbiAgICAvLyBubyBvbmxpbmUgc2Vzc2lvbiBubyBjYWxlbmRhclxuICAgIGlmICghdGhpcy5kYXlzQXZhaWxhYmlsaXR5IHx8ICF0aGlzLm9ubGluZVNlc3Npb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gc2Vzc2lvbiBkdXJhdGlvblxuICAgIHRoaXMucmVhbER1cmF0aW9uID0gdGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uO1xuICAgIC8vIHNlc3Npb24gZGF5IHN0YXJ0IDAwOjAwIC0gZW5kIDIzOjU5XG4gICAgY29uc3Qgb25saW5lU2Vzc2lvblN0YXJ0OiBNb21lbnQgPSBtb21lbnQodGhpcy5vbmxpbmVTZXNzaW9uLnN0YXJ0X2RhdGUsICdZWVlZLU1NLUREJykuc3RhcnRPZignZGF5Jyk7XG4gICAgY29uc3Qgb25saW5lU2Vzc2lvbkVuZDogTW9tZW50ID0gbW9tZW50KHRoaXMub25saW5lU2Vzc2lvbi5lbmRfZGF0ZSwgJ1lZWVktTU0tREQnKS5lbmRPZignZGF5Jyk7XG4gICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlciA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZm9yRWFjaCgoYXZicywgZGF5KSA9PiB7XG4gICAgICBsZXQgc2xvdHNOdW1iZXIgPSAwO1xuICAgICAgLy8gZWFjaCBkYXkgb2YgZGF5cyBhdmFpbGFiaWxpdHkgd2l0aCBzdGFydCB0aW1lIDA4OjAwXG4gICAgICBjb25zdCBtbXREYXkgPSBtb21lbnQoZGF5LCAnWVlZWS1NTS1ERCcpLmhvdXIoOCk7XG4gICAgICBjb25zdCBtbXREYXlTdGFydFRpbWUgPSBtb21lbnQoZGF5ICsgdGhpcy5vbmxpbmVTZXNzaW9uLnN0YXJ0X3RpbWUsICdZWVlZLU1NRERISDptbScpO1xuXG4gICAgICAvLyBJZiBzZXNzaW9uIHN0YXJ0IHRpbWUgbGlrZSAwODowMCBpcyBiZWZvcmUgc3RhcnQgdG9kYXkgMDA6MDBcbiAgICAgIGlmIChtbXREYXlTdGFydFRpbWUuaXNCZWZvcmUobW9tZW50KCkuc3RhcnRPZignZGF5JykpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGJvb2tpbmcgZGVsYXlcbiAgICAgIGNvbnN0IG1pbk1tdFN0YXJ0VGltZSA9IG1vbWVudCgpLmFkZCh0aGlzLm9ubGluZVNlc3Npb24uYm9va2luZ19kZWxheSwgJ2hvdXJzJyk7XG4gICAgICAvLyBzZXNzaW9uIHRpbWUgZW5kXG4gICAgICBjb25zdCBtbXREYXlFbmRUaW1lID0gbW9tZW50KGRheSArIHRoaXMub25saW5lU2Vzc2lvbi5lbmRfdGltZSwgJ1lZWVktTU0tRERISDptbScpO1xuICAgICAgbW10RGF5RW5kVGltZS5zdWJ0cmFjdCh0aGlzLnJlYWxEdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICAgIC8vIHNsb3RzIGl0ZXJhdG9yXG4gICAgICBjb25zdCB0aW1lUmFuZ2U6IFR3aXhJdGVyID0gbW10RGF5U3RhcnRUaW1lLnR3aXgobW10RGF5RW5kVGltZSlcbiAgICAgICAgLml0ZXJhdGUodGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgaWYgKHRoaXMuY2FsZW5kYXJTdGFydCAmJiB0aGlzLmNhbGVuZGFyRW5kICYmIG1tdERheS5pc0JldHdlZW4ob25saW5lU2Vzc2lvblN0YXJ0LCBvbmxpbmVTZXNzaW9uRW5kKSkge1xuICAgICAgICB3aGlsZSAodGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lUmFuZ2UubmV4dCgpO1xuICAgICAgICAgIGNvbnN0IHRpbWVNbXQ6IE1vbWVudCA9IG1vbWVudCh0aW1lLnRvRGF0ZSgpKTtcbiAgICAgICAgICBpZiAoIXRpbWVNbXQuaXNCZWZvcmUobWluTW10U3RhcnRUaW1lKSkge1xuICAgICAgICAgICAgYXZicy5wdXNoKHRpbWUuZm9ybWF0KCdISDptbScpKTtcbiAgICAgICAgICAgIHNsb3RzTnVtYmVyKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyLnNldChkYXksIHNsb3RzTnVtYmVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc2Vzc2lvbiBldmVudCBpbiBjYWxlbmRhclxuICAgKi9cbiAgYWRkU2Vzc2lvbihzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgY29uc3QgbW10U3RhcnQgPSBtb21lbnQoc2Vzc2lvbi5zdGFydCk7XG4gICAgY29uc3QgbW10RW5kID0gbW9tZW50KHNlc3Npb24uZW5kKTtcbiAgICBjb25zdCB0aW1lSW5uZXJSYW5nZTogVHdpeEl0ZXIgPSBtbXRTdGFydC50d2l4KG1tdEVuZCkuaXRlcmF0ZUlubmVyKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVJbm5lclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVJbm5lclJhbmdlLm5leHQoKTtcbiAgICAgIHRoaXMuc2Vzc2lvbnNTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIGlmICghdGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyogYnVpbGRpbmcgZWFybGllc3Qgc2xvdCBiZWZvcmUgZXZlbnQgKi9cbiAgICBjb25zdCBtbXRFYXJseVN0YXJ0ID0gbW10U3RhcnQuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLnJlYWxEdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICBtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoXG4gICAgICBtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAtXG4gICAgICAobW10RWFybHlTdGFydC5taW51dGVzKCkgJSBzZXNzaW9uLmR1cmF0aW9uKSArIHNlc3Npb24uZHVyYXRpb24pO1xuICAgIGNvbnN0IHRpbWVFYXJsaWVyUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlTdGFydC50d2l4KG1tdFN0YXJ0KS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVFYXJsaWVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUVhcmxpZXJSYW5nZS5uZXh0KCk7XG4gICAgICBjb25zdCBtbXRUaW1lOiBNb21lbnQgPSBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHNlc3Npb24uZHVyYXRpb24pO1xuICAgICAgaWYgKG1tdFRpbWUuaXNTYW1lT3JBZnRlcihtbXRFYXJseVN0YXJ0KSAmJiBtbXRUaW1lLmlzQmVmb3JlKG1tdFN0YXJ0KSkge1xuICAgICAgICB0aGlzLmVhcmx5U2xvdHMuYWRkKG1tdFRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIGJ1aWxkaW5nIHBhdXNlIHNsb3RzIGFmdGVyIGV2ZW50ICovXG4gICAgY29uc3QgbW10RWFybHlFbmQgPSBtbXRFbmQuY2xvbmUoKTtcbiAgICBtbXRFYXJseUVuZC5zdWJ0cmFjdChtbXRFYXJseUVuZC5taW51dGVzKCkgJSBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICBjb25zdCBtbXRQYXVzZUVuZCA9IG1tdEVhcmx5RW5kLmNsb25lKCkuYWRkKHNlc3Npb24ucGF1c2UsICdtaW51dGVzJyk7XG4gICAgY29uc3QgdGltZVBhdXNlUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlFbmQudHdpeChtbXRQYXVzZUVuZCkuaXRlcmF0ZShzZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHdoaWxlICh0aW1lUGF1c2VSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lUGF1c2VSYW5nZS5uZXh0KCk7XG4gICAgICBjb25zdCBtbXRUaW1lOiBNb21lbnQgPSBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHNlc3Npb24uZHVyYXRpb24pO1xuICAgICAgaWYgKG1tdFRpbWUuaXNTYW1lT3JBZnRlcihtbXRFYXJseUVuZCkgJiYgbW10VGltZS5pc0JlZm9yZShtbXRQYXVzZUVuZCkpIHtcbiAgICAgICAgdGhpcy5wYXVzZVNsb3RzLmFkZChtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgc2Vzc2lvbiBldmVudCBpbiBDYWxlbmRhclxuICAgKi9cbiAgcmVtb3ZlU2Vzc2lvbihzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgY29uc3QgbW10U3RhcnQgPSBtb21lbnQoc2Vzc2lvbi5zdGFydCk7XG4gICAgY29uc3QgbW10RW5kID0gbW9tZW50KHNlc3Npb24uZW5kKTtcbiAgICBjb25zdCB0aW1lSW5uZXJSYW5nZTogVHdpeEl0ZXIgPSBtbXRTdGFydC50d2l4KG1tdEVuZCkuaXRlcmF0ZShzZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHdoaWxlICh0aW1lSW5uZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lSW5uZXJSYW5nZS5uZXh0KCk7XG4gICAgICB0aGlzLnNlc3Npb25zU2xvdHMuZGVsZXRlKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICBpZiAoIXRpbWVJbm5lclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgICB0aGlzLnNlc3Npb25zRW5kU2xvdHMuZGVsZXRlKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIHJlbW92aW5nIGVhcmx5IHNsb3RzICovXG4gICAgY29uc3QgbW10RWFybHlTdGFydCA9IG1tdFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKFxuICAgICAgbW10RWFybHlTdGFydC5taW51dGVzKCkgLVxuICAgICAgKG1tdEVhcmx5U3RhcnQubWludXRlcygpICUgc2Vzc2lvbi5kdXJhdGlvbikgKyBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICBjb25zdCB0aW1lRWFybHlSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseVN0YXJ0LnR3aXgobW10U3RhcnQpLml0ZXJhdGUoc2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUVhcmx5UmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUVhcmx5UmFuZ2UubmV4dCgpO1xuICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgIGlmIChtbXRUaW1lLmlzU2FtZU9yQWZ0ZXIobW10RWFybHlTdGFydCkgJiYgbW10VGltZS5pc0JlZm9yZShtbXRTdGFydCkpIHtcbiAgICAgICAgdGhpcy5lYXJseVNsb3RzLmRlbGV0ZShtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiByZW1vdmluZyBwYXVzZSBzbG90cyAqL1xuICAgIGlmIChzZXNzaW9uLnBhdXNlKSB7XG4gICAgICBjb25zdCBtbXRFYXJseUVuZCA9IG1tdEVuZC5jbG9uZSgpO1xuICAgICAgbW10RWFybHlFbmQuc3VidHJhY3QobW10RWFybHlFbmQubWludXRlcygpICUgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgICBjb25zdCBtbXRQYXVzZUVuZCA9IG1tdEVhcmx5RW5kLmNsb25lKCkuYWRkKHNlc3Npb24ucGF1c2UsICdtaW51dGVzJyk7XG4gICAgICBjb25zdCB0aW1lUGF1c2VSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseUVuZC50d2l4KG1tdFBhdXNlRW5kKS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgICB3aGlsZSAodGltZVBhdXNlUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lUGF1c2VSYW5nZS5uZXh0KCk7XG4gICAgICAgIGNvbnN0IG1tdFRpbWU6IE1vbWVudCA9IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgICAgIGlmIChtbXRUaW1lLmlzU2FtZU9yQWZ0ZXIobW10RWFybHlFbmQpICYmIG1tdFRpbWUuaXNCZWZvcmUobW10UGF1c2VFbmQpKSB7XG4gICAgICAgICAgdGhpcy5wYXVzZVNsb3RzLmRlbGV0ZShtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKioqKioqKioqKioqKioqKioqKiBEYXRlIGZ1bmN0aW9ucyAqKioqKioqKioqKioqKlxuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqL1xuICBsb2FkRXZlbnRzKHN0YXJ0OiBNb21lbnQsIGVuZDogTW9tZW50KSB7XG4gICAgdGhpcy5idXN5U2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIgPSBuZXcgTWFwKCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9zZXNzaW9uc0VudHJpZXMpICYmIHRoaXMuX3Nlc3Npb25zRW50cmllcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3Nlc3Npb25zRW50cmllcyA9IFtcbiAgICAgICAgLi4udGhpcy5fc2Vzc2lvbnNFbnRyaWVzLmZpbHRlcigoc2Vzc2lvbjogU2Vzc2lvbikgPT4ge1xuICAgICAgICAgIGlmIChtb21lbnQoc2Vzc2lvbi5zdGFydCkuaXNTYW1lT3JBZnRlcihzdGFydCkgJiZcbiAgICAgICAgICAgIG1vbWVudChzZXNzaW9uLmVuZCkuaXNTYW1lT3JCZWZvcmUoZW5kKSkge1xuICAgICAgICAgICAgbGV0IG1tdEV2ZW50U3RhcnQgPSBtb21lbnQoc2Vzc2lvbi5zdGFydCwgJ1lZWVktTU0tRERISDptbScpO1xuICAgICAgICAgICAgbW10RXZlbnRTdGFydCA9IHRoaXMuYnVpbGRpbkJ1c3lTbG90KG1tdEV2ZW50U3RhcnQsIHNlc3Npb24pO1xuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0VhcmxpZXN0U2xvdChtbXRFdmVudFN0YXJ0KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KVxuICAgICAgXTtcbiAgICB9XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTbG90IGxvY2tlZFxuICAgKi9cbiAgYnVpbGRpbkJ1c3lTbG90KG1tdEV2ZW50U3RhcnQ6IE1vbWVudCwgc2Vzc2lvbjogU2Vzc2lvbik6IE1vbWVudCB7XG4gICAgY29uc3QgbW10RXZlbnRFbmQgPSBtb21lbnQoc2Vzc2lvbi5lbmQsICdZWVlZLU1NLURESEg6bW0nKTtcbiAgICBpZiAoIW1tdEV2ZW50U3RhcnQgfHwgIW1tdEV2ZW50U3RhcnQuaXNWYWxpZCgpXG4gICAgICB8fCAhbW10RXZlbnRFbmQgfHwgIW1tdEV2ZW50RW5kLmlzVmFsaWQoKVxuICAgICAgfHwgIW1tdEV2ZW50U3RhcnQuaXNCZWZvcmUobW10RXZlbnRFbmQpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdpbnZhbGlkIGRhdGVzJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyogYnVpbGRpbmcgYnVzeSBzbG90cyBieSBldmVudHMgKi9cbiAgICBjb25zdCBldmVudHNUaW1lUmFuZ2U6IFR3aXhJdGVyID0gbW10RXZlbnRTdGFydC50d2l4KG1tdEV2ZW50RW5kKS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG5cbiAgICB3aGlsZSAoZXZlbnRzVGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3Qge3RpbWUsIG1tdFRpbWV9ID0gQ2FsZW5kYXJDb21wb25lbnQuc3BsaXRSYW5nZVRvTmV4dFRpbWUoZXZlbnRzVGltZVJhbmdlLCBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgIC8qIElGIHRoZSBidXN5IHNsb3QgaXMgYXZhaWxhYmUgYW5kIG5vdCBhbHJlYWR5IGluIGJ1c3lTbG90cyB3ZSBjb3VudCBpdCAqL1xuICAgICAgaWYgKHRoaXMuZGF5c0F2YWlsYWJpbGl0eSAmJiB0aGlzLmRheXNBdmFpbGFiaWxpdHkuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpICYmXG4gICAgICAgICF0aGlzLmJ1c3lTbG90cy5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKSAmJlxuICAgICAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZ2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpLmluZGV4T2YodGltZS5mb3JtYXQoJ0hIOm1tJykpID49IDApIHtcblxuICAgICAgICBpZiAoKCFzZXNzaW9uLnVzZXIgfHxcbiAgICAgICAgICAoc2Vzc2lvbi51c2VyICYmXG4gICAgICAgICAgICBzZXNzaW9uLnVzZXIudWlkICE9PSB0aGlzLnVzZXIudWlkKSkpIHtcbiAgICAgICAgICBsZXQgZGF5QnVzeU51bWJlciA9IHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSA/XG4gICAgICAgICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgOiAwO1xuICAgICAgICAgIGRheUJ1c3lOdW1iZXIrKztcbiAgICAgICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5zZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSwgZGF5QnVzeU51bWJlcik7XG4gICAgICAgICAgdGhpcy5idXN5U2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlc3Npb24udXNlciAmJiBzZXNzaW9uLnVzZXIudWlkID09PSB0aGlzLnVzZXIudWlkKSB7XG4gICAgICAgICAgdGhpcy5zZXNzaW9uc1Nsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgICAgIHRoaXMuc2Vzc2lvbnMuc2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSwgc2Vzc2lvbik7XG4gICAgICAgICAgaWYgKCFldmVudHNUaW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNlc3Npb25zRW5kU2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1tdEV2ZW50U3RhcnQ7XG4gIH1cblxuICAvKipcbiAgICogU2xvdCBiZWZvcmUgYXZhaWxhYmlsaXR5IHJhbmdlXG4gICAqL1xuICBidWlsZGluZ0VhcmxpZXN0U2xvdChtbXRFdmVudFN0YXJ0OiBNb21lbnQpIHtcbiAgICAvKiBidWlsZGluZyBlYXJsaWVzdCBzbG90IGJlZm9yZSBldmVudCAqL1xuICAgIGNvbnN0IG1tdEVhcmx5U3RhcnQgPSBtbXRFdmVudFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKG1tdEVhcmx5U3RhcnQubWludXRlcygpIC1cbiAgICAgIChtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAlIHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbikgKyB0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb24pO1xuICAgIGNvbnN0IGVhcmxpZXN0VGltZVJhbmdlOiBUd2l4SXRlciA9IG1tdEVhcmx5U3RhcnQudHdpeChtbXRFdmVudFN0YXJ0KS5pdGVyYXRlKHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAoZWFybGllc3RUaW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB7dGltZSwgbW10VGltZX0gPSBDYWxlbmRhckNvbXBvbmVudC5zcGxpdFJhbmdlVG9OZXh0VGltZShlYXJsaWVzdFRpbWVSYW5nZSwgdGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgIC8qIElGIHRoZSBidXN5IHNsb3QgaXMgaW4gYXZhaWxhYmlsaXR5IGFuZCBub3QgYWxyZWFkeSBpbiBidXN5U2xvaXRzIHdlIGNvdW50IGl0ICovXG4gICAgICBpZiAodGhpcy5kYXlzQXZhaWxhYmlsaXR5ICYmIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSlcbiAgICAgICAgJiYgIXRoaXMuYnVzeVNsb3RzLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpXG4gICAgICAgICYmIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkuaW5kZXhPZih0aW1lLmZvcm1hdCgnSEg6bW0nKSkgPj0gMCkge1xuICAgICAgICBsZXQgZGF5QnVzeU51bWJlciA9IHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSA/XG4gICAgICAgICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuZ2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpIDogMDtcbiAgICAgICAgZGF5QnVzeU51bWJlcisrO1xuICAgICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5zZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSwgZGF5QnVzeU51bWJlcik7XG4gICAgICB9XG4gICAgICB0aGlzLmJ1c3lTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==