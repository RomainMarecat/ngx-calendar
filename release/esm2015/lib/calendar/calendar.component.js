/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            key: null,
            session_type: {
                name: '',
                max_persons: 1,
                booking_delay: 1,
                duration: 15,
                pause: 0,
            },
            prices: [10, 20],
            date_range: {
                start: '2019-01-01',
                end: '2030-12-31',
            },
            time_range: {
                start: '08:00',
                end: '19:00',
            }
        };
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
            this.loadCalendar();
        }
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
        return { time: time, mmtTime: CalendarComponent.getMinutesDifference(moment(time.toDate()), slotDuration) };
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
            start: start,
            end: end
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
        this.realDuration = this.onlineSession.session_type.duration;
        // session day start 00:00 - end 23:59
        /** @type {?} */
        const onlineSessionStart = moment(this.onlineSession.date_range.start, 'YYYY-MM-DD').startOf('day');
        /** @type {?} */
        const onlineSessionEnd = moment(this.onlineSession.date_range.end, 'YYYY-MM-DD').endOf('day');
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
            const mmtDayStartTime = moment(day + this.onlineSession.time_range.start, 'YYYY-MMDDHH:mm');
            // If session start time like 08:00 is before start today 00:00
            if (mmtDayStartTime.isBefore(moment().startOf('day'))) {
                return;
            }
            // booking delay
            /** @type {?} */
            const minMmtStartTime = moment().add(this.onlineSession.session_type.booking_delay, 'hours');
            // session time end
            /** @type {?} */
            const mmtDayEndTime = moment(day + this.onlineSession.time_range.end, 'YYYY-MM-DDHH:mm');
            mmtDayEndTime.subtract(this.realDuration, 'minutes');
            // slots iterator
            /** @type {?} */
            const timeRange = mmtDayStartTime.twix(mmtDayEndTime)
                .iterate(this.onlineSession.session_type.duration, 'minutes');
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
        const timeInnerRange = mmtStart.twix(mmtEnd).iterateInner(session.details.duration, 'minutes');
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
            (mmtEarlyStart.minutes() % session.details.duration) + session.details.duration);
        /** @type {?} */
        const timeEarlierRange = mmtEarlyStart.twix(mmtStart).iterate(session.details.duration, 'minutes');
        while (timeEarlierRange.hasNext()) {
            /** @type {?} */
            const time = timeEarlierRange.next();
            /** @type {?} */
            const mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.details.duration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                this.earlySlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* building pause slots after event */
        /** @type {?} */
        const mmtEarlyEnd = mmtEnd.clone();
        mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.details.duration);
        /** @type {?} */
        const mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
        /** @type {?} */
        const timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.details.duration, 'minutes');
        while (timePauseRange.hasNext()) {
            /** @type {?} */
            const time = timePauseRange.next();
            /** @type {?} */
            const mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.details.duration);
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
        const timeInnerRange = mmtStart.twix(mmtEnd).iterate(session.details.duration, 'minutes');
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
            (mmtEarlyStart.minutes() % session.details.duration) + session.details.duration);
        /** @type {?} */
        const timeEarlyRange = mmtEarlyStart.twix(mmtStart).iterate(session.details.duration, 'minutes');
        while (timeEarlyRange.hasNext()) {
            /** @type {?} */
            const time = timeEarlyRange.next();
            /** @type {?} */
            const mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.details.duration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                this.earlySlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* removing pause slots */
        if (session.pause) {
            /** @type {?} */
            const mmtEarlyEnd = mmtEnd.clone();
            mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.details.duration);
            /** @type {?} */
            const mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
            /** @type {?} */
            const timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.details.duration, 'minutes');
            while (timePauseRange.hasNext()) {
                /** @type {?} */
                const time = timePauseRange.next();
                /** @type {?} */
                const mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.details.duration);
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
        const eventsTimeRange = mmtEventStart.twix(mmtEventEnd).iterate(session.details.duration, 'minutes');
        /** @type {?} */
        let i = 0;
        while (eventsTimeRange.hasNext()) {
            const { time, mmtTime } = CalendarComponent.splitRangeToNextTime(eventsTimeRange, session.details.duration);
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
            (mmtEarlyStart.minutes() % this.onlineSession.session_type.duration) + this.onlineSession.session_type.duration);
        /** @type {?} */
        const earliestTimeRange = mmtEarlyStart.twix(mmtEventStart).iterate(this.onlineSession.session_type.duration, 'minutes');
        while (earliestTimeRange.hasNext()) {
            const { time, mmtTime } = CalendarComponent.splitRangeToNextTime(earliestTimeRange, this.onlineSession.session_type.duration);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFHbEMsT0FBTyxNQUFNLENBQUM7O01BT1IsTUFBTSxHQUFHLE9BQU87QUFTdEIsTUFBTSxPQUFPLGlCQUFpQjs7OztJQWlJNUIsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7Ozs7UUFySGhDLGtCQUFhLEdBQWtCO1lBQ3RDLEdBQUcsRUFBRSxJQUFJO1lBQ1QsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxFQUFFO2dCQUNSLFdBQVcsRUFBRSxDQUFDO2dCQUNkLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixRQUFRLEVBQUUsRUFBRTtnQkFDWixLQUFLLEVBQUUsQ0FBQzthQUNUO1lBQ0QsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNoQixVQUFVLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLEdBQUcsRUFBRSxZQUFZO2FBQ2xCO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLEtBQUssRUFBRSxPQUFPO2dCQUNkLEdBQUcsRUFBRSxPQUFPO2FBQ2I7U0FDRixDQUFDOzs7O1FBWU8sMEJBQXFCLEdBQTBCO1lBQ3RELFFBQVEsRUFBRTtnQkFDUixHQUFHLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCO2dCQUNELEtBQUssRUFBRSxjQUFjO2dCQUNyQixVQUFVLEVBQUUsbUNBQW1DO2dCQUMv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O0lBY2pDLHNDQUEyQjs7Ozs7SUFwQmYsK0JBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IFR3aXgsIFR3aXhJdGVyIH0gZnJvbSAndHdpeCc7XG5pbXBvcnQgJ3R3aXgnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL2NvbmZpZ3VyYXRpb24vY2FsZW5kYXItY29uZmlndXJhdGlvbic7XG5pbXBvcnQgeyBEYXkgfSBmcm9tICcuLi9zaGFyZWQvZGF5L2RheSc7XG5pbXBvcnQgeyBPbmxpbmVTZXNzaW9uIH0gZnJvbSAnLi4vc2hhcmVkL3Nlc3Npb24vb25saW5lLXNlc3Npb24nO1xuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gJy4uL3NoYXJlZC9zZXNzaW9uL3Nlc3Npb24nO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuLi9zaGFyZWQvZXZlbnQvZXZlbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGVcbiAgc2VsZWN0b3I6ICduZ3gtY2FsZW5kYXInLFxuICAvLyB0c2xpbnQ6ZW5hYmxlXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAvKipcbiAgICogVXNlciBjb3VsZCBiZSBwYXNzZWQgdG8gZ2VuZXJhdGUgYSBwZXJzb25hbCBjYWxlbmRhclxuICAgKi9cbiAgQElucHV0KCkgdXNlcjoge1xuICAgIHVpZDogc3RyaW5nO1xuICAgIGRpc3BsYXlOYW1lOiBzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbiAgfTtcbiAgLyoqXG4gICAqIE9ubGluZSBzZXNzaW9ucyBkZWZpbml0aW9uXG4gICAqL1xuICBASW5wdXQoKSBvbmxpbmVTZXNzaW9uOiBPbmxpbmVTZXNzaW9uID0ge1xuICAgIGtleTogbnVsbCxcbiAgICBzZXNzaW9uX3R5cGU6IHtcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgbWF4X3BlcnNvbnM6IDEsXG4gICAgICBib29raW5nX2RlbGF5OiAxLFxuICAgICAgZHVyYXRpb246IDE1LFxuICAgICAgcGF1c2U6IDAsXG4gICAgfSxcbiAgICBwcmljZXM6IFsxMCwgMjBdLFxuICAgIGRhdGVfcmFuZ2U6IHtcbiAgICAgIHN0YXJ0OiAnMjAxOS0wMS0wMScsXG4gICAgICBlbmQ6ICcyMDMwLTEyLTMxJyxcbiAgICB9LFxuICAgIHRpbWVfcmFuZ2U6IHtcbiAgICAgIHN0YXJ0OiAnMDg6MDAnLFxuICAgICAgZW5kOiAnMTk6MDAnLFxuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFN0YXJ0IGRheSBvZiBjYWxlbmRhciAoY291bGQgYmUgdXBkYXRlZClcbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0OiBNb21lbnQ7XG4gIC8qKlxuICAgKiBFbmQgZGF5IG9mIGNhbGVuZGFyIChjb3VsZCBiZSB1cGRhdGVkIGJ1dCByZWV3cml0ZW4gb24gc3dpdGNoIHdlZWsgbW9kZVxuICAgKi9cbiAgQElucHV0KCkgZW5kOiBNb21lbnQ7XG4gIC8qKlxuICAgKiBDb25maWd1cmF0aW9uIGNhbGVuZGFyXG4gICAqL1xuICBASW5wdXQoKSBjYWxlbmRhckNvbmZpZ3VyYXRpb246IENhbGVuZGFyQ29uZmlndXJhdGlvbiA9IHtcbiAgICBjYWxlbmRhcjoge1xuICAgICAgY3RhOiB7XG4gICAgICAgIG5leHQ6ICdzdWl2YW50JyxcbiAgICAgICAgcHJldmlvdXM6ICdwcsOpY8OpZGVudCcsXG4gICAgICB9LFxuICAgICAgdG9kYXk6ICdhdWpvdXJkXFwnaHVpJyxcbiAgICAgIGJhY2tfdG9kYXk6ICdyZXZlbmlyIMOgIGxhIGRhdGUgZFxcJ2F1am91cmRcXCdodWknLFxuICAgICAgZGF5OiAnam91cicsXG4gICAgICB0aHJlZV9kYXlzOiAnMyBqb3VycycsXG4gICAgICB3ZWVrOiAnc2VtYWluZScsXG4gICAgICB0aXRsZTogJ3LDqXNlcnZlciB2b3RyZSBjcsOpbmVhdScsXG4gICAgICBzdWJ0aXRsZTogJ3RvdXRlcyBsZXMgZGlzcG9uaWJpbGl0w6lzJyxcbiAgICAgIGF2YWlsYWJpbGl0eToge1xuICAgICAgICBlbXB0eTogJ0F1Y3VuZSBkaXNwb25pYmlsaXTDqScsXG4gICAgICAgIHNsb3Q6ICdQcm9jaGFpbmUgZGlzcG9uaWJpbGl0w6knLFxuICAgICAgfSxcbiAgICAgIHNlc3Npb246IHtcbiAgICAgICAgaW5mbzogJ0Nyw6luZWF1IHbDqXJyb3VpbGzDqSdcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBXaGVuIHVzZXIgc3doaXRjaCB2aWV3IG1vZGUgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSB2aWV3TW9kZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxTdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxTdHJpbmc+KCk7XG4gIC8qKlxuICAgKiBTZXNzaW9uIGNyZWF0ZWQgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSBzZXNzaW9uQ3JlYXRlZDogRXZlbnRFbWl0dGVyPFNlc3Npb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZXNzaW9uPigpO1xuICAvKipcbiAgICogU2Vzc2lvbiByZW1vdmVkIGV2ZW50XG4gICAqL1xuICBAT3V0cHV0KCkgc2Vzc2lvblJlbW92ZWQ6IEV2ZW50RW1pdHRlcjxTZXNzaW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4oKTtcbiAgLyoqXG4gICAqIEFycmF5IG9mIHNlbGVjdGFibGUgZGF5cyBmcm9tIHN0YXJ0IHRvIGVuZFxuICAgKi9cbiAgZGF5czogQXJyYXk8RGF5PiA9IFtdO1xuICAvKipcbiAgICogU2xvdCBEdXJhdGlvbiBpbiBtaW51dGVzXG4gICAqL1xuICByZWFsRHVyYXRpb246IG51bWJlcjtcbiAgLyoqXG4gICAqIER1cmluZyBkYXlzIGZyb20gc3RhcnQgdG8gZW5kLCBsaXN0IG9mIGVudHJpZXMgdGhhdCBhdmFpbGFibGVcbiAgICovXG4gIGRheXNBdmFpbGFiaWxpdHk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcbiAgLyoqXG4gICAqIE51bWJlciBvZiBidXN5IHNsb3QgaW4gZWFjaCBkYXlcbiAgICovXG4gIGRheXNCdXN5U2xvdE51bWJlcjogTWFwPHN0cmluZywgbnVtYmVyPjtcbiAgLyoqXG4gICAqIE51bWJlciBvZiBhdmFpbGFibGUgc2xvdCBpbiBlYWNoIGRheVxuICAgKi9cbiAgZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXI6IE1hcDxzdHJpbmcsIG51bWJlcj47XG4gIC8qKlxuICAgKiBTZXQgb2YgZGF0ZXRpbWUgd2hvIHJlcHJlbnNlbnRzIGF2YWlsYWJpbGl0eVxuICAgKi9cbiAgYnVzeVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIHNldCBvZiBkYXRldGltZSB3aG8gcmVwcmVzZW50cyBvdmVyIGV4dGVuZHMgYnVzeSBzbG90XG4gICAqL1xuICBlYXJseVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIHNldCBvZiBkYXRldGltZSB3aG8gcmVwcmVzZW50cyBwYXVzZSBzbG90XG4gICAqL1xuICBwYXVzZVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIHNldCBvZiBkYXRldGltZSB3aG8gcmVwcmVzZW50cyBzZXNzaW9uIHNsb3RcbiAgICovXG4gIHNlc3Npb25zU2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogc2V0IG9mIGRhdGV0aW1lIHdobyByZXByZXNlbnRzIGVuZCBzbG90IChub3QgdXNlZCBpbiBmcm9udClcbiAgICovXG4gIHNlc3Npb25zRW5kU2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogTWFwIG9mIHNlc3Npb25zIGZyb20gY3VycmVudCB1c2VyXG4gICAqL1xuICBzZXNzaW9uczogTWFwPHN0cmluZywgU2Vzc2lvbj47XG4gIC8qKlxuICAgKiBjYWxlbmRhciBzdGFydCBkYXkgYWZ0ZXIgc2V0IGZ1bGwgY2FsZW5kYXIgaW5mb3JtYXRpb25zXG4gICAqL1xuICBwcml2YXRlIGNhbGVuZGFyU3RhcnQ6IE1vbWVudDtcbiAgLyoqXG4gICAqIGNhbGVuZGFyIGVuZCBkYXkgYWZ0ZXIgc2V0IGZ1bGwgY2FsZW5kYXIgaW5mb3JtYXRpb25zXG4gICAqL1xuICBwcml2YXRlIGNhbGVuZGFyRW5kOiBNb21lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXNzaW9ucyBhcnJheSBsb2FkZWQgYnkgcGFyZW50IGNvbXBvbmVudFxuICAgKi9cbiAgX3Nlc3Npb25zRW50cmllczogU2Vzc2lvbltdID0gW107XG5cbiAgZ2V0IHNlc3Npb25zRW50cmllcygpOiBTZXNzaW9uW10ge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uc0VudHJpZXM7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgc2Vzc2lvbnNFbnRyaWVzKHNlc3Npb25zRW50cmllczogU2Vzc2lvbltdKSB7XG4gICAgaWYgKHNlc3Npb25zRW50cmllcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3Nlc3Npb25zRW50cmllcyA9IHNlc3Npb25zRW50cmllcztcbiAgICAgIHRoaXMubG9hZENhbGVuZGFyKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gRGVmYXVsdCBWaWV3IE1vZGUgb2YgV2VlayBDb21wb25lbnRcbiAgX3ZpZXdNb2RlOiBTdHJpbmcgPSAnd2Vlayc7XG5cbiAgZ2V0IHZpZXdNb2RlKCk6IFN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNb2RlO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHZpZXdNb2RlKHZpZXdNb2RlKSB7XG4gICAgdGhpcy5fdmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLnNldFZpZXdNb2RlKCk7XG4gIH1cblxuICBzdGF0aWMgc3BsaXRSYW5nZVRvTmV4dFRpbWUoc2xvdFRpbWVSYW5nZTogVHdpeEl0ZXIsIHNsb3REdXJhdGlvbjogbnVtYmVyKToge3RpbWU6IFR3aXgsIG1tdFRpbWU6IE1vbWVudH0ge1xuICAgIGNvbnN0IHRpbWU6IFR3aXggPSBzbG90VGltZVJhbmdlLm5leHQoKTtcbiAgICByZXR1cm4ge3RpbWU6IHRpbWUsIG1tdFRpbWU6IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgc2xvdER1cmF0aW9uKX07XG4gIH1cblxuICBzdGF0aWMgZ2V0TWludXRlc0RpZmZlcmVuY2UobW10VGltZTogTW9tZW50LCBzbG90RHVyYXRpb246IG51bWJlcik6IE1vbWVudCB7XG4gICAgaWYgKG1tdFRpbWUubWludXRlcygpICUgc2xvdER1cmF0aW9uICE9PSAwKSB7XG4gICAgICBtbXRUaW1lLm1pbnV0ZXMobW10VGltZS5taW51dGVzKCkgLSAobW10VGltZS5taW51dGVzKCkgJSBzbG90RHVyYXRpb24pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW10VGltZTtcbiAgfVxuXG4gIHN0YXRpYyBnZVN0YXJ0RW5kRnJvbVN0YXJ0QW5kU2Vzc2lvbkR1cmF0aW9uKHN0YXJ0OiBNb21lbnQsIGVuZDogTW9tZW50LCBkdXJhdGlvbjogbnVtYmVyKToge3N0YXJ0OiBNb21lbnQsIGVuZDogTW9tZW50fSB7XG4gICAgY29uc3QgZXZlbnRzVGltZVJhbmdlOiBUd2l4SXRlciA9IHN0YXJ0LnR3aXgoZW5kKS5pdGVyYXRlKGR1cmF0aW9uLCAnbWludXRlcycpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgIGVuZDogZW5kXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNwZWN0IGFsbCBjaGFuZ2VzXG4gICAqL1xuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBEZWZhdWx0IHZhcmlhYmxlc1xuICAgKi9cbiAgc2V0Q2FsZW5kYXIoKSB7XG4gICAgdGhpcy5zZXNzaW9uc1Nsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLmVhcmx5U2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5wYXVzZVNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuc2Vzc2lvbnMgPSBuZXcgTWFwKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFZpZXcgTW9kZSB3aXRoIHdlZWssIGRheSwgMyBkYXlzXG4gICAqIEluaXQgc3RhcnQsIGVuZCxcbiAgICpcbiAgICovXG4gIHNldFZpZXdNb2RlKCkge1xuICAgIGlmICh0aGlzLnZpZXdNb2RlID09PSAnZGF5Jykge1xuICAgICAgdGhpcy5lbmQgPSB0aGlzLnN0YXJ0O1xuICAgICAgdGhpcy5jYWxlbmRhclN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLnN0YXJ0T2YoJ2RheScpO1xuICAgICAgdGhpcy5jYWxlbmRhckVuZCA9IG1vbWVudCh0aGlzLmVuZCkuZW5kT2YoJ2RheScpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3RocmVlX2RheXMnKSB7XG4gICAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoMiwgJ2RheXMnKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdGFydE9mKCdkYXknKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJFbmQgPSBtb21lbnQodGhpcy5lbmQpLmVuZE9mKCdkYXknKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gSW5pdCBmaXJzdCBkYXkgd2VlayBudW1iZXJcbiAgICBjb25zdCBmaXJzdERheSA9IDA7XG4gICAgLy8gSWYgZW1wdHkgc3RhcnQgZGF0ZSB0aGVuIHN0YXJ0IHRvIHRvZGF5XG4gICAgaWYgKCF0aGlzLnN0YXJ0KSB7XG4gICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KCk7XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuZGF5KGZpcnN0RGF5KTtcbiAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoNiwgJ2RheXMnKTtcblxuICAgIHRoaXMuY2FsZW5kYXJTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdGFydE9mKCdkYXknKTtcbiAgICB0aGlzLmNhbGVuZGFyRW5kID0gbW9tZW50KHRoaXMuZW5kKS5lbmRPZignZGF5Jyk7XG4gIH1cblxuICAvKipcbiAgICogT24gc3RhcnQvdmlld01vZGUgY2hhbmdlZCwgZG8gYSByZWNhbGN1bGF0ZSBvZiBpbml0IHN0YXJ0LCBlbmRcbiAgICogZGF5cywgZGF5c0F2YWlsYWJpbGl0eSBhbmQgdmlld01vZGVcbiAgICovXG4gIGxvYWRDYWxlbmRhcigpIHtcbiAgICB0aGlzLnNldENhbGVuZGFyKCk7XG4gICAgdGhpcy5zZXRWaWV3TW9kZSgpO1xuICAgIHRoaXMubG9hZEV2ZW50cyh0aGlzLnN0YXJ0LCB0aGlzLmVuZCk7XG4gICAgdGhpcy5zZXREYXRlUmFuZ2UodGhpcy5zdGFydCwgdGhpcy5lbmQpO1xuICAgIHRoaXMubG9hZEF2YWlsYWJpbGl0aWVzKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGF2YWlsYWJsZSBkYXlzIGZyb20gc3RhcnQgdG8gZW5kIGRhdGVzXG4gICAqL1xuICBzZXREYXRlUmFuZ2Uoc3RhcnQ6IE1vbWVudCwgZW5kOiBNb21lbnQpIHtcbiAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkgPSBuZXcgTWFwKCk7XG4gICAgLy8gRGF5cyByYW5nZSBmcm9tIHN0YXJ0IHRvIGVuZFxuICAgIGNvbnN0IGRheXNSYW5nZTogVHdpeEl0ZXIgPSBzdGFydFxuICAgICAgLnR3aXgoZW5kKVxuICAgICAgLml0ZXJhdGUoMSwgJ2RheXMnKTtcbiAgICB0aGlzLmRheXMgPSBbXTtcbiAgICAvLyBMb2FkaW5nIGFsbCBkYXlzXG4gICAgd2hpbGUgKGRheXNSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZURheTogVHdpeCA9IGRheXNSYW5nZS5uZXh0KCk7XG4gICAgICB0aGlzLmRheXMucHVzaCh7XG4gICAgICAgIHRpdGxlOiBhdmFpbGFibGVEYXkuZm9ybWF0KCdERC9NTS9ZWVlZJyksXG4gICAgICAgIGtleTogYXZhaWxhYmxlRGF5LmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgICB2YWx1ZTogbW9tZW50KGF2YWlsYWJsZURheS50b0RhdGUoKSlcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LnNldChhdmFpbGFibGVEYXkuZm9ybWF0KCdZWVlZLU1NLUREJyksIFtdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT24gc3dpdGNoIGRhdGUgcmFuZ2VcbiAgICovXG4gIG9uU3dpdGhlZFZpZXcodmlld01vZGU6IFN0cmluZykge1xuICAgIHRoaXMudmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLnZpZXdNb2RlQ2hhbmdlZC5lbWl0KHZpZXdNb2RlKTtcbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHN0YXJ0IGNoYW5nZSBldmVudFxuICAgKi9cbiAgb25TdGFydENoYW5nZWQoc3RhcnQ6IE1vbWVudCkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHNlc3Npb24gYWRkZWQgb24gY2xpY2sgZXZlbnRcbiAgICovXG4gIG9uU2Vzc2lvbkFkZGVkKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICB0aGlzLnNlc3Npb25zLnNldChtb21lbnQoc2Vzc2lvbi5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSwgc2Vzc2lvbik7XG4gICAgdGhpcy5hZGRTZXNzaW9uKHNlc3Npb24pO1xuICAgIHRoaXMuc2Vzc2lvbkNyZWF0ZWQuZW1pdChzZXNzaW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiByZW1vdmVkIGV2ZW50XG4gICAqL1xuICBvblNlc3Npb25SZW1vdmVkKHNvdXJjZToge2tleTogc3RyaW5nLCBzZXNzaW9uOiBTZXNzaW9ufSkge1xuICAgIHRoaXMuc2Vzc2lvbnMuZGVsZXRlKHNvdXJjZS5rZXkpO1xuICAgIHRoaXMucmVtb3ZlU2Vzc2lvbihzb3VyY2Uuc2Vzc2lvbik7XG4gICAgdGhpcy5zZXNzaW9uUmVtb3ZlZC5lbWl0KHNvdXJjZS5zZXNzaW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGFsbCB0aW1lIGZvciBlYWNoIGRheXNcbiAgICovXG4gIGxvYWRBdmFpbGFiaWxpdGllcygpIHtcbiAgICAvLyBubyBvbmxpbmUgc2Vzc2lvbiBubyBjYWxlbmRhclxuICAgIGlmICghdGhpcy5kYXlzQXZhaWxhYmlsaXR5IHx8ICF0aGlzLm9ubGluZVNlc3Npb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gc2Vzc2lvbiBkdXJhdGlvblxuICAgIHRoaXMucmVhbER1cmF0aW9uID0gdGhpcy5vbmxpbmVTZXNzaW9uLnNlc3Npb25fdHlwZS5kdXJhdGlvbjtcbiAgICAvLyBzZXNzaW9uIGRheSBzdGFydCAwMDowMCAtIGVuZCAyMzo1OVxuICAgIGNvbnN0IG9ubGluZVNlc3Npb25TdGFydDogTW9tZW50ID0gbW9tZW50KHRoaXMub25saW5lU2Vzc2lvbi5kYXRlX3JhbmdlLnN0YXJ0LCAnWVlZWS1NTS1ERCcpLnN0YXJ0T2YoJ2RheScpO1xuICAgIGNvbnN0IG9ubGluZVNlc3Npb25FbmQ6IE1vbWVudCA9IG1vbWVudCh0aGlzLm9ubGluZVNlc3Npb24uZGF0ZV9yYW5nZS5lbmQsICdZWVlZLU1NLUREJykuZW5kT2YoJ2RheScpO1xuICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXIgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmZvckVhY2goKGF2YnMsIGRheSkgPT4ge1xuICAgICAgbGV0IHNsb3RzTnVtYmVyID0gMDtcbiAgICAgIC8vIGVhY2ggZGF5IG9mIGRheXMgYXZhaWxhYmlsaXR5IHdpdGggc3RhcnQgdGltZSAwODowMFxuICAgICAgY29uc3QgbW10RGF5ID0gbW9tZW50KGRheSwgJ1lZWVktTU0tREQnKS5ob3VyKDgpO1xuICAgICAgY29uc3QgbW10RGF5U3RhcnRUaW1lID0gbW9tZW50KGRheSArIHRoaXMub25saW5lU2Vzc2lvbi50aW1lX3JhbmdlLnN0YXJ0LCAnWVlZWS1NTURESEg6bW0nKTtcblxuICAgICAgLy8gSWYgc2Vzc2lvbiBzdGFydCB0aW1lIGxpa2UgMDg6MDAgaXMgYmVmb3JlIHN0YXJ0IHRvZGF5IDAwOjAwXG4gICAgICBpZiAobW10RGF5U3RhcnRUaW1lLmlzQmVmb3JlKG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBib29raW5nIGRlbGF5XG4gICAgICBjb25zdCBtaW5NbXRTdGFydFRpbWUgPSBtb21lbnQoKS5hZGQodGhpcy5vbmxpbmVTZXNzaW9uLnNlc3Npb25fdHlwZS5ib29raW5nX2RlbGF5LCAnaG91cnMnKTtcbiAgICAgIC8vIHNlc3Npb24gdGltZSBlbmRcbiAgICAgIGNvbnN0IG1tdERheUVuZFRpbWUgPSBtb21lbnQoZGF5ICsgdGhpcy5vbmxpbmVTZXNzaW9uLnRpbWVfcmFuZ2UuZW5kLCAnWVlZWS1NTS1EREhIOm1tJyk7XG4gICAgICBtbXREYXlFbmRUaW1lLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgLy8gc2xvdHMgaXRlcmF0b3JcbiAgICAgIGNvbnN0IHRpbWVSYW5nZTogVHdpeEl0ZXIgPSBtbXREYXlTdGFydFRpbWUudHdpeChtbXREYXlFbmRUaW1lKVxuICAgICAgICAuaXRlcmF0ZSh0aGlzLm9ubGluZVNlc3Npb24uc2Vzc2lvbl90eXBlLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgaWYgKHRoaXMuY2FsZW5kYXJTdGFydCAmJiB0aGlzLmNhbGVuZGFyRW5kICYmIG1tdERheS5pc0JldHdlZW4ob25saW5lU2Vzc2lvblN0YXJ0LCBvbmxpbmVTZXNzaW9uRW5kKSkge1xuICAgICAgICB3aGlsZSAodGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lUmFuZ2UubmV4dCgpO1xuICAgICAgICAgIGNvbnN0IHRpbWVNbXQ6IE1vbWVudCA9IG1vbWVudCh0aW1lLnRvRGF0ZSgpKTtcbiAgICAgICAgICBpZiAoIXRpbWVNbXQuaXNCZWZvcmUobWluTW10U3RhcnRUaW1lKSkge1xuICAgICAgICAgICAgYXZicy5wdXNoKHRpbWUuZm9ybWF0KCdISDptbScpKTtcbiAgICAgICAgICAgIHNsb3RzTnVtYmVyKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyLnNldChkYXksIHNsb3RzTnVtYmVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc2Vzc2lvbiBldmVudCBpbiBjYWxlbmRhclxuICAgKi9cbiAgYWRkU2Vzc2lvbihzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgY29uc3QgbW10U3RhcnQgPSBtb21lbnQoc2Vzc2lvbi5zdGFydCk7XG4gICAgY29uc3QgbW10RW5kID0gbW9tZW50KHNlc3Npb24uZW5kKTtcbiAgICBjb25zdCB0aW1lSW5uZXJSYW5nZTogVHdpeEl0ZXIgPSBtbXRTdGFydC50d2l4KG1tdEVuZCkuaXRlcmF0ZUlubmVyKHNlc3Npb24uZGV0YWlscy5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUlubmVyUmFuZ2UubmV4dCgpO1xuICAgICAgdGhpcy5zZXNzaW9uc1Nsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgaWYgKCF0aW1lSW5uZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBidWlsZGluZyBlYXJsaWVzdCBzbG90IGJlZm9yZSBldmVudCAqL1xuICAgIGNvbnN0IG1tdEVhcmx5U3RhcnQgPSBtbXRTdGFydC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIG1tdEVhcmx5U3RhcnQubWludXRlcyhcbiAgICAgIG1tdEVhcmx5U3RhcnQubWludXRlcygpIC1cbiAgICAgIChtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAlIHNlc3Npb24uZGV0YWlscy5kdXJhdGlvbikgKyBzZXNzaW9uLmRldGFpbHMuZHVyYXRpb24pO1xuICAgIGNvbnN0IHRpbWVFYXJsaWVyUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlTdGFydC50d2l4KG1tdFN0YXJ0KS5pdGVyYXRlKHNlc3Npb24uZGV0YWlscy5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUVhcmxpZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lRWFybGllclJhbmdlLm5leHQoKTtcbiAgICAgIGNvbnN0IG1tdFRpbWU6IE1vbWVudCA9IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgc2Vzc2lvbi5kZXRhaWxzLmR1cmF0aW9uKTtcbiAgICAgIGlmIChtbXRUaW1lLmlzU2FtZU9yQWZ0ZXIobW10RWFybHlTdGFydCkgJiYgbW10VGltZS5pc0JlZm9yZShtbXRTdGFydCkpIHtcbiAgICAgICAgdGhpcy5lYXJseVNsb3RzLmFkZChtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBidWlsZGluZyBwYXVzZSBzbG90cyBhZnRlciBldmVudCAqL1xuICAgIGNvbnN0IG1tdEVhcmx5RW5kID0gbW10RW5kLmNsb25lKCk7XG4gICAgbW10RWFybHlFbmQuc3VidHJhY3QobW10RWFybHlFbmQubWludXRlcygpICUgc2Vzc2lvbi5kZXRhaWxzLmR1cmF0aW9uKTtcbiAgICBjb25zdCBtbXRQYXVzZUVuZCA9IG1tdEVhcmx5RW5kLmNsb25lKCkuYWRkKHNlc3Npb24ucGF1c2UsICdtaW51dGVzJyk7XG4gICAgY29uc3QgdGltZVBhdXNlUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlFbmQudHdpeChtbXRQYXVzZUVuZCkuaXRlcmF0ZShzZXNzaW9uLmRldGFpbHMuZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVQYXVzZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVQYXVzZVJhbmdlLm5leHQoKTtcbiAgICAgIGNvbnN0IG1tdFRpbWU6IE1vbWVudCA9IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgc2Vzc2lvbi5kZXRhaWxzLmR1cmF0aW9uKTtcbiAgICAgIGlmIChtbXRUaW1lLmlzU2FtZU9yQWZ0ZXIobW10RWFybHlFbmQpICYmIG1tdFRpbWUuaXNCZWZvcmUobW10UGF1c2VFbmQpKSB7XG4gICAgICAgIHRoaXMucGF1c2VTbG90cy5hZGQobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHNlc3Npb24gZXZlbnQgaW4gQ2FsZW5kYXJcbiAgICovXG4gIHJlbW92ZVNlc3Npb24oc2Vzc2lvbjogU2Vzc2lvbikge1xuICAgIGNvbnN0IG1tdFN0YXJ0ID0gbW9tZW50KHNlc3Npb24uc3RhcnQpO1xuICAgIGNvbnN0IG1tdEVuZCA9IG1vbWVudChzZXNzaW9uLmVuZCk7XG4gICAgY29uc3QgdGltZUlubmVyUmFuZ2U6IFR3aXhJdGVyID0gbW10U3RhcnQudHdpeChtbXRFbmQpLml0ZXJhdGUoc2Vzc2lvbi5kZXRhaWxzLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHdoaWxlICh0aW1lSW5uZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lSW5uZXJSYW5nZS5uZXh0KCk7XG4gICAgICB0aGlzLnNlc3Npb25zU2xvdHMuZGVsZXRlKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICBpZiAoIXRpbWVJbm5lclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgICB0aGlzLnNlc3Npb25zRW5kU2xvdHMuZGVsZXRlKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIHJlbW92aW5nIGVhcmx5IHNsb3RzICovXG4gICAgY29uc3QgbW10RWFybHlTdGFydCA9IG1tdFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKFxuICAgICAgbW10RWFybHlTdGFydC5taW51dGVzKCkgLVxuICAgICAgKG1tdEVhcmx5U3RhcnQubWludXRlcygpICUgc2Vzc2lvbi5kZXRhaWxzLmR1cmF0aW9uKSArIHNlc3Npb24uZGV0YWlscy5kdXJhdGlvbik7XG4gICAgY29uc3QgdGltZUVhcmx5UmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlTdGFydC50d2l4KG1tdFN0YXJ0KS5pdGVyYXRlKHNlc3Npb24uZGV0YWlscy5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUVhcmx5UmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUVhcmx5UmFuZ2UubmV4dCgpO1xuICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzZXNzaW9uLmRldGFpbHMuZHVyYXRpb24pO1xuICAgICAgaWYgKG1tdFRpbWUuaXNTYW1lT3JBZnRlcihtbXRFYXJseVN0YXJ0KSAmJiBtbXRUaW1lLmlzQmVmb3JlKG1tdFN0YXJ0KSkge1xuICAgICAgICB0aGlzLmVhcmx5U2xvdHMuZGVsZXRlKG1tdFRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIHJlbW92aW5nIHBhdXNlIHNsb3RzICovXG4gICAgaWYgKHNlc3Npb24ucGF1c2UpIHtcbiAgICAgIGNvbnN0IG1tdEVhcmx5RW5kID0gbW10RW5kLmNsb25lKCk7XG4gICAgICBtbXRFYXJseUVuZC5zdWJ0cmFjdChtbXRFYXJseUVuZC5taW51dGVzKCkgJSBzZXNzaW9uLmRldGFpbHMuZHVyYXRpb24pO1xuICAgICAgY29uc3QgbW10UGF1c2VFbmQgPSBtbXRFYXJseUVuZC5jbG9uZSgpLmFkZChzZXNzaW9uLnBhdXNlLCAnbWludXRlcycpO1xuICAgICAgY29uc3QgdGltZVBhdXNlUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlFbmQudHdpeChtbXRQYXVzZUVuZCkuaXRlcmF0ZShzZXNzaW9uLmRldGFpbHMuZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgICB3aGlsZSAodGltZVBhdXNlUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lUGF1c2VSYW5nZS5uZXh0KCk7XG4gICAgICAgIGNvbnN0IG1tdFRpbWU6IE1vbWVudCA9IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgc2Vzc2lvbi5kZXRhaWxzLmR1cmF0aW9uKTtcbiAgICAgICAgaWYgKG1tdFRpbWUuaXNTYW1lT3JBZnRlcihtbXRFYXJseUVuZCkgJiYgbW10VGltZS5pc0JlZm9yZShtbXRQYXVzZUVuZCkpIHtcbiAgICAgICAgICB0aGlzLnBhdXNlU2xvdHMuZGVsZXRlKG1tdFRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqKioqKioqKioqKioqKioqKioqIERhdGUgZnVuY3Rpb25zICoqKioqKioqKioqKioqXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICovXG4gIGxvYWRFdmVudHMoc3RhcnQ6IE1vbWVudCwgZW5kOiBNb21lbnQpIHtcbiAgICB0aGlzLmJ1c3lTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlciA9IG5ldyBNYXAoKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuX3Nlc3Npb25zRW50cmllcykgJiYgdGhpcy5fc2Vzc2lvbnNFbnRyaWVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fc2Vzc2lvbnNFbnRyaWVzID0gW1xuICAgICAgICAuLi50aGlzLl9zZXNzaW9uc0VudHJpZXMuZmlsdGVyKChzZXNzaW9uOiBTZXNzaW9uKSA9PiB7XG4gICAgICAgICAgaWYgKG1vbWVudChzZXNzaW9uLnN0YXJ0KS5pc1NhbWVPckFmdGVyKHN0YXJ0KSAmJlxuICAgICAgICAgICAgbW9tZW50KHNlc3Npb24uZW5kKS5pc1NhbWVPckJlZm9yZShlbmQpKSB7XG4gICAgICAgICAgICBsZXQgbW10RXZlbnRTdGFydCA9IG1vbWVudChzZXNzaW9uLnN0YXJ0LCAnWVlZWS1NTS1EREhIOm1tJyk7XG4gICAgICAgICAgICBtbXRFdmVudFN0YXJ0ID0gdGhpcy5idWlsZGluQnVzeVNsb3QobW10RXZlbnRTdGFydCwgc2Vzc2lvbik7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nRWFybGllc3RTbG90KG1tdEV2ZW50U3RhcnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICBdO1xuICAgIH1cbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNsb3QgbG9ja2VkXG4gICAqL1xuICBidWlsZGluQnVzeVNsb3QobW10RXZlbnRTdGFydDogTW9tZW50LCBzZXNzaW9uOiBTZXNzaW9uKTogTW9tZW50IHtcbiAgICBjb25zdCBtbXRFdmVudEVuZCA9IG1vbWVudChzZXNzaW9uLmVuZCwgJ1lZWVktTU0tRERISDptbScpO1xuICAgIGlmICghbW10RXZlbnRTdGFydCB8fCAhbW10RXZlbnRTdGFydC5pc1ZhbGlkKClcbiAgICAgIHx8ICFtbXRFdmVudEVuZCB8fCAhbW10RXZlbnRFbmQuaXNWYWxpZCgpXG4gICAgICB8fCAhbW10RXZlbnRTdGFydC5pc0JlZm9yZShtbXRFdmVudEVuZCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2ludmFsaWQgZGF0ZXMnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKiBidWlsZGluZyBidXN5IHNsb3RzIGJ5IGV2ZW50cyAqL1xuICAgIGNvbnN0IGV2ZW50c1RpbWVSYW5nZTogVHdpeEl0ZXIgPSBtbXRFdmVudFN0YXJ0LnR3aXgobW10RXZlbnRFbmQpLml0ZXJhdGUoc2Vzc2lvbi5kZXRhaWxzLmR1cmF0aW9uLCAnbWludXRlcycpO1xuXG4gICAgbGV0IGkgPSAwO1xuICAgIHdoaWxlIChldmVudHNUaW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB7dGltZSwgbW10VGltZX0gPSBDYWxlbmRhckNvbXBvbmVudC5zcGxpdFJhbmdlVG9OZXh0VGltZShldmVudHNUaW1lUmFuZ2UsIHNlc3Npb24uZGV0YWlscy5kdXJhdGlvbik7XG4gICAgICAvKiBJRiB0aGUgYnVzeSBzbG90IGlzIGF2YWlsYWJlIGFuZCBub3QgYWxyZWFkeSBpbiBidXN5U2xvdHMgd2UgY291bnQgaXQgKi9cbiAgICAgIGlmICh0aGlzLmRheXNBdmFpbGFiaWxpdHkgJiYgdGhpcy5kYXlzQXZhaWxhYmlsaXR5Lmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSAmJlxuICAgICAgICAhdGhpcy5idXN5U2xvdHMuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSkgJiZcbiAgICAgICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmdldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKS5pbmRleE9mKHRpbWUuZm9ybWF0KCdISDptbScpKSA+PSAwKSB7XG5cbiAgICAgICAgaWYgKCghc2Vzc2lvbi51c2VyIHx8XG4gICAgICAgICAgKHNlc3Npb24udXNlciAmJlxuICAgICAgICAgICAgc2Vzc2lvbi51c2VyLnVpZCAhPT0gdGhpcy51c2VyLnVpZCkpKSB7XG4gICAgICAgICAgbGV0IGRheUJ1c3lOdW1iZXIgPSB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgP1xuICAgICAgICAgICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuZ2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpIDogMDtcbiAgICAgICAgICBkYXlCdXN5TnVtYmVyKys7XG4gICAgICAgICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuc2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJyksIGRheUJ1c3lOdW1iZXIpO1xuICAgICAgICAgIHRoaXMuYnVzeVNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXNzaW9uLnVzZXIgJiYgc2Vzc2lvbi51c2VyLnVpZCA9PT0gdGhpcy51c2VyLnVpZCkge1xuICAgICAgICAgIHRoaXMuc2Vzc2lvbnNTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgICAgICB0aGlzLnNlc3Npb25zLnNldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJyksIHNlc3Npb24pO1xuICAgICAgICAgIGlmICghZXZlbnRzVGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtbXRFdmVudFN0YXJ0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNsb3QgYmVmb3JlIGF2YWlsYWJpbGl0eSByYW5nZVxuICAgKi9cbiAgYnVpbGRpbmdFYXJsaWVzdFNsb3QobW10RXZlbnRTdGFydDogTW9tZW50KSB7XG4gICAgLyogYnVpbGRpbmcgZWFybGllc3Qgc2xvdCBiZWZvcmUgZXZlbnQgKi9cbiAgICBjb25zdCBtbXRFYXJseVN0YXJ0ID0gbW10RXZlbnRTdGFydC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIG1tdEVhcmx5U3RhcnQubWludXRlcyhtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAtXG4gICAgICAobW10RWFybHlTdGFydC5taW51dGVzKCkgJSB0aGlzLm9ubGluZVNlc3Npb24uc2Vzc2lvbl90eXBlLmR1cmF0aW9uKSArIHRoaXMub25saW5lU2Vzc2lvbi5zZXNzaW9uX3R5cGUuZHVyYXRpb24pO1xuICAgIGNvbnN0IGVhcmxpZXN0VGltZVJhbmdlOiBUd2l4SXRlciA9IG1tdEVhcmx5U3RhcnQudHdpeChtbXRFdmVudFN0YXJ0KS5pdGVyYXRlKHRoaXMub25saW5lU2Vzc2lvbi5zZXNzaW9uX3R5cGUuZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKGVhcmxpZXN0VGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3Qge3RpbWUsIG1tdFRpbWV9ID0gQ2FsZW5kYXJDb21wb25lbnQuc3BsaXRSYW5nZVRvTmV4dFRpbWUoZWFybGllc3RUaW1lUmFuZ2UsIHRoaXMub25saW5lU2Vzc2lvbi5zZXNzaW9uX3R5cGUuZHVyYXRpb24pO1xuICAgICAgLyogSUYgdGhlIGJ1c3kgc2xvdCBpcyBpbiBhdmFpbGFiaWxpdHkgYW5kIG5vdCBhbHJlYWR5IGluIGJ1c3lTbG9pdHMgd2UgY291bnQgaXQgKi9cbiAgICAgIGlmICh0aGlzLmRheXNBdmFpbGFiaWxpdHkgJiYgdGhpcy5kYXlzQXZhaWxhYmlsaXR5Lmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKVxuICAgICAgICAmJiAhdGhpcy5idXN5U2xvdHMuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSlcbiAgICAgICAgJiYgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmdldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKS5pbmRleE9mKHRpbWUuZm9ybWF0KCdISDptbScpKSA+PSAwKSB7XG4gICAgICAgIGxldCBkYXlCdXN5TnVtYmVyID0gdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpID9cbiAgICAgICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgOiAwO1xuICAgICAgICBkYXlCdXN5TnVtYmVyKys7XG4gICAgICAgIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLnNldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpLCBkYXlCdXN5TnVtYmVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYnVzeVNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgIH1cbiAgfVxufVxuIl19