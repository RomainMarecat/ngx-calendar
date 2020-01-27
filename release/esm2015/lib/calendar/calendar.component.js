/**
 * @fileoverview added by tsickle
 * Generated from: lib/calendar/calendar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import * as moment_ from 'moment';
import 'twix';
import { SessionService } from '../shared/session/session.service';
/** @type {?} */
const moment = moment_;
export class CalendarComponent {
    /**
     * @param {?} cd
     * @param {?} sessionService
     */
    constructor(cd, sessionService) {
        this.cd = cd;
        this.sessionService = sessionService;
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
        this.days = [];
        this.daysAvailability = new Map();
        this.sessionsSlots = new Set();
        this.sessionsEndSlots = new Set();
        this.sessionsStartSlots = new Set();
        this.earlySlots = new Set();
        this.pauseSlots = new Set();
        this.busySlots = new Set();
        this.daysBusySlotNumber = new Map();
        this.sessions = new Map();
        this.sessionService.sessions.next(this.sessions);
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
        this.start = moment(this.start).day(firstDay).startOf('day');
        this.end = moment(this.start).add(6, 'days').endOf('day');
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
        this.setDateRange(this.start, this.end);
        this.loadEvents(this.start, this.end);
        this.loadAvailabilities();
    }
    /**
     * Add available days from start to end dates
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    setDateRange(start, end) {
        // Days range from start to end
        /** @type {?} */
        const daysRange = start
            .twix(end)
            .iterate(1, 'days');
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
        this.sessionService.sessions.next(this.sessions);
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
        this.sessionService.sessions.next(this.sessions);
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
            else {
                this.sessionsStartSlots.add(time.format('YYYY-MM-DDHH:mm'));
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
            if (!timeInnerRange.hasNext()) {
                this.sessionsEndSlots.delete(time.format('YYYY-MM-DDHH:mm'));
            }
            else {
                this.sessionsStartSlots.delete(time.format('YYYY-MM-DDHH:mm'));
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
        if (!this.onlineSession) {
            return;
        }
        if (Array.isArray(this._sessionsEntries) && this._sessionsEntries.length) {
            this._sessionsEntries.forEach((/**
             * @param {?} session
             * @return {?}
             */
            (session) => {
                if (moment(session.start).isSameOrAfter(start) &&
                    moment(session.end).isSameOrBefore(end)) {
                    this.buildinBusySlot(session);
                    this.buildingEarliestSlot(session);
                }
            }));
        }
    }
    /**
     * Slot locked
     * @param {?} session
     * @return {?}
     */
    buildinBusySlot(session) {
        /** @type {?} */
        const mmtEventStart = moment(session.start, 'YYYY-MM-DDHH:mm');
        /** @type {?} */
        const mmtEventEnd = moment(session.end, 'YYYY-MM-DDHH:mm');
        if (!mmtEventStart || !mmtEventStart.isValid()
            || !mmtEventEnd || !mmtEventEnd.isValid()
            || !mmtEventStart.isSameOrBefore(mmtEventEnd)) {
            console.error('invalid dates', mmtEventStart, mmtEventEnd);
            return null;
        }
        /* building busy slots by events */
        /** @type {?} */
        const eventsTimeRange = mmtEventStart.twix(mmtEventEnd).iterate(session.duration, 'minutes');
        while (eventsTimeRange.hasNext()) {
            const { time, mmtTime } = CalendarComponent.splitRangeToNextTime(eventsTimeRange, session.duration);
            /* IF the busy slot is availabe and not already in busySlots we count it */
            if (this.daysAvailability &&
                this.daysAvailability.has(time.format('YYYY-MM-DD')) &&
                !this.busySlots.has(time.format('YYYY-MM-DDHH:mm')) &&
                !this.daysAvailability.get(time.format('YYYY-MM-DD')).includes(time.format('HH:mm'))) {
                if ((!session.customers ||
                    (session.customers &&
                        this.customer &&
                        !session.customers.map((/**
                         * @param {?} c
                         * @return {?}
                         */
                        c => c.id)).includes(this.customer.id)))) {
                    this.setOtherBusySlots(time);
                }
                if (session.customers && this.customer && session.customers.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => c.id)).includes(this.customer.id)) {
                    this.setSessionSlot(eventsTimeRange, time, session);
                }
            }
        }
        this.sessionService.sessions.next(this.sessions);
        return mmtEventStart;
    }
    /**
     * @param {?} time
     * @return {?}
     */
    setOtherBusySlots(time) {
        /** @type {?} */
        let dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
            this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
        dayBusyNumber++;
        this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
        this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
    }
    /**
     * Build in sessions Map only start session with its session
     * @param {?} eventsTimeRange
     * @param {?} time
     * @param {?} session
     * @return {?}
     */
    setSessionSlot(eventsTimeRange, time, session) {
        this.sessionsSlots.add(time.format('YYYY-MM-DDHH:mm'));
        if (!eventsTimeRange.hasNext()) {
            this.sessionsEndSlots.add(time.format('YYYY-MM-DDHH:mm'));
            return;
        }
        this.sessions.set(time.format('YYYY-MM-DDHH:mm'), session);
        this.sessionsStartSlots.add(time.format('YYYY-MM-DDHH:mm'));
    }
    /**
     * Slot before availability range
     * @param {?} session
     * @return {?}
     */
    buildingEarliestSlot(session) {
        /** @type {?} */
        const mmtEventStart = moment(session.start, 'YYYY-MM-DDHH:mm');
        if (!mmtEventStart || !this.realDuration) {
            return;
        }
        /* building earliest slot before event */
        /** @type {?} */
        const mmtEarlyStart = mmtEventStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % this.onlineSession.duration) + this.onlineSession.duration);
        /** @type {?} */
        const earliestTimeRange = mmtEarlyStart.twix(mmtEventStart).iterate(this.onlineSession.duration, 'minutes');
        while (earliestTimeRange.hasNext()) {
            const { time, mmtTime } = CalendarComponent.splitRangeToNextTime(earliestTimeRange, this.onlineSession.duration);
            /* IF the busy slot is in availability and not already in busySlots we count it */
            if (this.daysAvailability &&
                this.daysAvailability.has(time.format('YYYY-MM-DD'))
                && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
                && this.daysAvailability.get(time.format('YYYY-MM-DD')).includes(time.format('HH:mm'))) {
                /** @type {?} */
                let dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
                    this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
                dayBusyNumber++;
                this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
                this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
            }
        }
    }
}
CalendarComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable
                selector: 'ngx-calendar',
                // tslint:enable
                template: "<div class=\"week-calendar-wrapper\">\n  <div class=\"week-calendar-header\">\n\n\n    <div class=\"week-calendar-title\">\n\n\n      <lib-calendar-header [start]=\"start\"\n                           [end]=\"end\"\n                           [headerConfiguration]=\"calendarConfiguration\"\n                           [viewMode]=\"viewMode\"\n                           (switchedView)=\"onSwithedView($event)\"\n                           (startChanged)=\"onStartChanged($event)\"></lib-calendar-header>\n\n    </div>\n\n  </div>\n\n  <div>\n\n\n    <lib-calendar-body [bodyConfiguration]=\"calendarConfiguration\"\n                       [onlineSession]=\"onlineSession\"\n                       [days]=\"days\"\n                       [viewMode]=\"viewMode\"\n                       [start]=\"start\"\n                       [end]=\"end\"\n                       [daysAvailability]=\"daysAvailability\"\n                       [daysBusySlotNumber]=\"daysBusySlotNumber\"\n                       [daysAvailabilitySlotNumber]=\"daysAvailabilitySlotNumber\"\n                       [busySlots]=\"busySlots\"\n                       [user]=\"user\"\n                       [customer]=\"customer\"\n                       [earlySlots]=\"earlySlots\"\n                       [pauseSlots]=\"pauseSlots\"\n                       [sessionsSlots]=\"sessionsSlots\"\n                       [sessionsStartSlots]=\"sessionsStartSlots\"\n                       [sessionsEndSlots]=\"sessionsEndSlots\"\n                       (startChanged)=\"onStartChanged($event)\"\n                       (sessionAdded)=\"onSessionAdded($event)\"\n                       (sessionRemoved)=\"onSessionRemoved($event)\"\n                       *ngIf=\"start && end && days && viewMode\"></lib-calendar-body>\n\n  </div>\n</div>\n",
                styles: [".week-calendar-wrapper .week-calendar-header{padding-bottom:20px}@media (min-width:768px){.week-calendar-wrapper .week-calendar-header .week-calendar-title{width:90vw}}"]
            }] }
];
/** @nocollapse */
CalendarComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: SessionService }
];
CalendarComponent.propDecorators = {
    user: [{ type: Input }],
    customer: [{ type: Input }],
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
     * User could be passed to show the owner
     * @type {?}
     */
    CalendarComponent.prototype.user;
    /**
     * Customer could be passed to generate a personal calendar
     * @type {?}
     */
    CalendarComponent.prototype.customer;
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
     * set of datetime who represents end slot (not used in front)
     * @type {?}
     */
    CalendarComponent.prototype.sessionsStartSlots;
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
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.sessionService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEdBQUcsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFHbEMsT0FBTyxNQUFNLENBQUM7QUFLZCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7O01BRTdELE1BQU0sR0FBRyxPQUFPO0FBU3RCLE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBZ0k1QixZQUFvQixFQUFxQixFQUNyQixjQUE4QjtRQUQ5QixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7Ozs7UUFySHpDLGtCQUFhLEdBQWtCO1lBQ3RDLEVBQUUsRUFBRSxJQUFJO1lBQ1IsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLEVBQUUsRUFBRTtZQUNSLFdBQVcsRUFBRSxDQUFDO1lBQ2QsYUFBYSxFQUFFLENBQUM7WUFDaEIsUUFBUSxFQUFFLEVBQUU7WUFDWixLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxFQUFFO1lBQ1QsVUFBVSxFQUFFLFlBQVk7WUFDeEIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsVUFBVSxFQUFFLE9BQU87WUFDbkIsUUFBUSxFQUFFLE9BQU87U0FDbEIsQ0FBQzs7OztRQUlPLFVBQUssR0FBVyxNQUFNLEVBQUUsQ0FBQzs7OztRQUl6QixRQUFHLEdBQVcsTUFBTSxFQUFFLENBQUM7Ozs7UUFJdkIsMEJBQXFCLEdBQTBCO1lBQ3RELFFBQVEsRUFBRTtnQkFDUixHQUFHLEVBQUU7b0JBQ0gsSUFBSSxFQUFF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RXhCLHF4REFBd0M7O2FBRXpDOzs7O1lBbkJRLGlCQUFpQjtZQVNqQixjQUFjOzs7bUJBZXBCLEtBQUs7dUJBSUwsS0FBSzs0QkFJTCxLQUFLO29CQWlCTCxLQUFLO2tCQUlMLEtBQUs7b0NBSUwsS0FBSzs4QkF5QkwsTUFBTTs2QkFJTixNQUFNOzZCQUlOLE1BQU07OEJBdUVOLEtBQUs7dUJBY0wsS0FBSzs7Ozs7OztJQXZKTixpQ0FBbUI7Ozs7O0lBSW5CLHFDQUF1Qjs7Ozs7SUFJdkIsMENBYUU7Ozs7O0lBSUYsa0NBQWtDOzs7OztJQUlsQyxnQ0FBZ0M7Ozs7O0lBSWhDLGtEQXFCRTs7Ozs7SUFJRiw0Q0FBNkU7Ozs7O0lBSTdFLDJDQUE4RTs7Ozs7SUFJOUUsMkNBQThFOzs7OztJQUk5RSxpQ0FBc0I7Ozs7O0lBSXRCLHlDQUFxQjs7Ozs7SUFJckIsNkNBQXdDOzs7OztJQUl4QywrQ0FBd0M7Ozs7O0lBSXhDLHVEQUFnRDs7Ozs7SUFJaEQsc0NBQXVCOzs7OztJQUl2Qix1Q0FBd0I7Ozs7O0lBSXhCLHVDQUF3Qjs7Ozs7SUFJeEIsMENBQTJCOzs7OztJQUkzQiw2Q0FBOEI7Ozs7O0lBSTlCLCtDQUFnQzs7Ozs7SUFJaEMscUNBQStCOzs7Ozs7SUFJL0IsMENBQThCOzs7Ozs7SUFJOUIsd0NBQTRCOzs7OztJQVM1Qiw2Q0FBaUM7O0lBY2pDLHNDQUFtQjs7Ozs7SUFyQlAsK0JBQTZCOzs7OztJQUM3QiwyQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBUd2l4LCBUd2l4SXRlciB9IGZyb20gJ3R3aXgnO1xuaW1wb3J0ICd0d2l4JztcbmltcG9ydCB7IENhbGVuZGFyQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL3NoYXJlZC9jb25maWd1cmF0aW9uL2NhbGVuZGFyLWNvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgRGF5IH0gZnJvbSAnLi4vc2hhcmVkL2RheS9kYXknO1xuaW1wb3J0IHsgT25saW5lU2Vzc2lvbiB9IGZyb20gJy4uL3NoYXJlZC9zZXNzaW9uL29ubGluZS1zZXNzaW9uJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi9zaGFyZWQvc2Vzc2lvbi9zZXNzaW9uJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlXG4gIHNlbGVjdG9yOiAnbmd4LWNhbGVuZGFyJyxcbiAgLy8gdHNsaW50OmVuYWJsZVxuICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIFVzZXIgY291bGQgYmUgcGFzc2VkIHRvIHNob3cgdGhlIG93bmVyXG4gICAqL1xuICBASW5wdXQoKSB1c2VyOiBhbnk7XG4gIC8qKlxuICAgKiBDdXN0b21lciBjb3VsZCBiZSBwYXNzZWQgdG8gZ2VuZXJhdGUgYSBwZXJzb25hbCBjYWxlbmRhclxuICAgKi9cbiAgQElucHV0KCkgY3VzdG9tZXI6IGFueTtcbiAgLyoqXG4gICAqIE9ubGluZSBzZXNzaW9ucyBkZWZpbml0aW9uXG4gICAqL1xuICBASW5wdXQoKSBvbmxpbmVTZXNzaW9uOiBPbmxpbmVTZXNzaW9uID0ge1xuICAgIGlkOiBudWxsLFxuICAgIGNvbW1lbnQ6ICcnLFxuICAgIG5hbWU6ICcnLFxuICAgIG1heF9wZXJzb25zOiAxLFxuICAgIGJvb2tpbmdfZGVsYXk6IDEsXG4gICAgZHVyYXRpb246IDE1LFxuICAgIHBhdXNlOiAwLFxuICAgIHByaWNlOiAxMCxcbiAgICBzdGFydF9kYXRlOiAnMjAxOS0wMS0wMScsXG4gICAgZW5kX2RhdGU6ICcyMDMwLTEyLTMxJyxcbiAgICBzdGFydF90aW1lOiAnMDg6MDAnLFxuICAgIGVuZF90aW1lOiAnMTk6MDAnXG4gIH07XG4gIC8qKlxuICAgKiBTdGFydCBkYXkgb2YgY2FsZW5kYXIgKGNvdWxkIGJlIHVwZGF0ZWQpXG4gICAqL1xuICBASW5wdXQoKSBzdGFydDogTW9tZW50ID0gbW9tZW50KCk7XG4gIC8qKlxuICAgKiBFbmQgZGF5IG9mIGNhbGVuZGFyIChjb3VsZCBiZSB1cGRhdGVkIGJ1dCByZWV3cml0ZW4gb24gc3dpdGNoIHdlZWsgbW9kZVxuICAgKi9cbiAgQElucHV0KCkgZW5kOiBNb21lbnQgPSBtb21lbnQoKTtcbiAgLyoqXG4gICAqIENvbmZpZ3VyYXRpb24gY2FsZW5kYXJcbiAgICovXG4gIEBJbnB1dCgpIGNhbGVuZGFyQ29uZmlndXJhdGlvbjogQ2FsZW5kYXJDb25maWd1cmF0aW9uID0ge1xuICAgIGNhbGVuZGFyOiB7XG4gICAgICBjdGE6IHtcbiAgICAgICAgbmV4dDogJ3N1aXZhbnQnLFxuICAgICAgICBwcmV2aW91czogJ3Byw6ljw6lkZW50JyxcbiAgICAgIH0sXG4gICAgICB0b2RheTogJ2F1am91cmRcXCdodWknLFxuICAgICAgYmFja190b2RheTogJ3JldmVuaXIgw6AgbGEgZGF0ZSBkXFwnYXVqb3VyZFxcJ2h1aScsXG4gICAgICBkYXk6ICdqb3VyJyxcbiAgICAgIHRocmVlX2RheXM6ICczIGpvdXJzJyxcbiAgICAgIHdlZWs6ICdzZW1haW5lJyxcbiAgICAgIHRpdGxlOiAncsOpc2VydmVyIHZvdHJlIGNyw6luZWF1JyxcbiAgICAgIHN1YnRpdGxlOiAndG91dGVzIGxlcyBkaXNwb25pYmlsaXTDqXMnLFxuICAgICAgYXZhaWxhYmlsaXR5OiB7XG4gICAgICAgIGVtcHR5OiAnQXVjdW5lIGRpc3BvbmliaWxpdMOpJyxcbiAgICAgICAgc2xvdDogJ1Byb2NoYWluZSBkaXNwb25pYmlsaXTDqScsXG4gICAgICB9LFxuICAgICAgc2Vzc2lvbjoge1xuICAgICAgICBpbmZvOiAnQ3LDqW5lYXUgdsOpcnJvdWlsbMOpJ1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFdoZW4gdXNlciBzd2hpdGNoIHZpZXcgbW9kZSBldmVudFxuICAgKi9cbiAgQE91dHB1dCgpIHZpZXdNb2RlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgLyoqXG4gICAqIFNlc3Npb24gY3JlYXRlZCBldmVudFxuICAgKi9cbiAgQE91dHB1dCgpIHNlc3Npb25DcmVhdGVkOiBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlc3Npb24+KCk7XG4gIC8qKlxuICAgKiBTZXNzaW9uIHJlbW92ZWQgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSBzZXNzaW9uUmVtb3ZlZDogRXZlbnRFbWl0dGVyPFNlc3Npb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZXNzaW9uPigpO1xuICAvKipcbiAgICogQXJyYXkgb2Ygc2VsZWN0YWJsZSBkYXlzIGZyb20gc3RhcnQgdG8gZW5kXG4gICAqL1xuICBkYXlzOiBBcnJheTxEYXk+ID0gW107XG4gIC8qKlxuICAgKiBTbG90IER1cmF0aW9uIGluIG1pbnV0ZXNcbiAgICovXG4gIHJlYWxEdXJhdGlvbjogbnVtYmVyO1xuICAvKipcbiAgICogRHVyaW5nIGRheXMgZnJvbSBzdGFydCB0byBlbmQsIGxpc3Qgb2YgZW50cmllcyB0aGF0IGF2YWlsYWJsZVxuICAgKi9cbiAgZGF5c0F2YWlsYWJpbGl0eTogTWFwPHN0cmluZywgc3RyaW5nW10+O1xuICAvKipcbiAgICogTnVtYmVyIG9mIGJ1c3kgc2xvdCBpbiBlYWNoIGRheVxuICAgKi9cbiAgZGF5c0J1c3lTbG90TnVtYmVyOiBNYXA8c3RyaW5nLCBudW1iZXI+O1xuICAvKipcbiAgICogTnVtYmVyIG9mIGF2YWlsYWJsZSBzbG90IGluIGVhY2ggZGF5XG4gICAqL1xuICBkYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlcjogTWFwPHN0cmluZywgbnVtYmVyPjtcbiAgLyoqXG4gICAqIFNldCBvZiBkYXRldGltZSB3aG8gcmVwcmVuc2VudHMgYXZhaWxhYmlsaXR5XG4gICAqL1xuICBidXN5U2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogc2V0IG9mIGRhdGV0aW1lIHdobyByZXByZXNlbnRzIG92ZXIgZXh0ZW5kcyBidXN5IHNsb3RcbiAgICovXG4gIGVhcmx5U2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogc2V0IG9mIGRhdGV0aW1lIHdobyByZXByZXNlbnRzIHBhdXNlIHNsb3RcbiAgICovXG4gIHBhdXNlU2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogc2V0IG9mIGRhdGV0aW1lIHdobyByZXByZXNlbnRzIHNlc3Npb24gc2xvdFxuICAgKi9cbiAgc2Vzc2lvbnNTbG90czogU2V0PHN0cmluZz47XG4gIC8qKlxuICAgKiBzZXQgb2YgZGF0ZXRpbWUgd2hvIHJlcHJlc2VudHMgZW5kIHNsb3QgKG5vdCB1c2VkIGluIGZyb250KVxuICAgKi9cbiAgc2Vzc2lvbnNFbmRTbG90czogU2V0PHN0cmluZz47XG4gIC8qKlxuICAgKiBzZXQgb2YgZGF0ZXRpbWUgd2hvIHJlcHJlc2VudHMgZW5kIHNsb3QgKG5vdCB1c2VkIGluIGZyb250KVxuICAgKi9cbiAgc2Vzc2lvbnNTdGFydFNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIE1hcCBvZiBzZXNzaW9ucyBmcm9tIGN1cnJlbnQgdXNlclxuICAgKi9cbiAgc2Vzc2lvbnM6IE1hcDxzdHJpbmcsIFNlc3Npb24+O1xuICAvKipcbiAgICogY2FsZW5kYXIgc3RhcnQgZGF5IGFmdGVyIHNldCBmdWxsIGNhbGVuZGFyIGluZm9ybWF0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBjYWxlbmRhclN0YXJ0OiBNb21lbnQ7XG4gIC8qKlxuICAgKiBjYWxlbmRhciBlbmQgZGF5IGFmdGVyIHNldCBmdWxsIGNhbGVuZGFyIGluZm9ybWF0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBjYWxlbmRhckVuZDogTW9tZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSkge1xuICB9XG5cbiAgLyoqXG4gICAqIFNlc3Npb25zIGFycmF5IGxvYWRlZCBieSBwYXJlbnQgY29tcG9uZW50XG4gICAqL1xuICBfc2Vzc2lvbnNFbnRyaWVzOiBTZXNzaW9uW10gPSBbXTtcblxuICBnZXQgc2Vzc2lvbnNFbnRyaWVzKCk6IFNlc3Npb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb25zRW50cmllcztcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzZXNzaW9uc0VudHJpZXMoc2Vzc2lvbnNFbnRyaWVzOiBTZXNzaW9uW10pIHtcbiAgICBpZiAoc2Vzc2lvbnNFbnRyaWVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fc2Vzc2lvbnNFbnRyaWVzID0gc2Vzc2lvbnNFbnRyaWVzO1xuICAgIH1cbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBWaWV3IE1vZGUgb2YgV2VlayBDb21wb25lbnRcbiAgX3ZpZXdNb2RlID0gJ3dlZWsnO1xuXG4gIGdldCB2aWV3TW9kZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl92aWV3TW9kZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB2aWV3TW9kZSh2aWV3TW9kZSkge1xuICAgIHRoaXMuX3ZpZXdNb2RlID0gdmlld01vZGU7XG4gICAgdGhpcy5zZXRWaWV3TW9kZSgpO1xuICB9XG5cbiAgc3RhdGljIHNwbGl0UmFuZ2VUb05leHRUaW1lKHNsb3RUaW1lUmFuZ2U6IFR3aXhJdGVyLCBzbG90RHVyYXRpb246IG51bWJlcik6IHt0aW1lOiBUd2l4LCBtbXRUaW1lOiBNb21lbnR9IHtcbiAgICBjb25zdCB0aW1lOiBUd2l4ID0gc2xvdFRpbWVSYW5nZS5uZXh0KCk7XG4gICAgcmV0dXJuIHt0aW1lLCBtbXRUaW1lOiBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHNsb3REdXJhdGlvbil9O1xuICB9XG5cbiAgc3RhdGljIGdldE1pbnV0ZXNEaWZmZXJlbmNlKG1tdFRpbWU6IE1vbWVudCwgc2xvdER1cmF0aW9uOiBudW1iZXIpOiBNb21lbnQge1xuICAgIGlmIChtbXRUaW1lLm1pbnV0ZXMoKSAlIHNsb3REdXJhdGlvbiAhPT0gMCkge1xuICAgICAgbW10VGltZS5taW51dGVzKG1tdFRpbWUubWludXRlcygpIC0gKG1tdFRpbWUubWludXRlcygpICUgc2xvdER1cmF0aW9uKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1tdFRpbWU7XG4gIH1cblxuICAvKipcbiAgICogSW5zcGVjdCBhbGwgY2hhbmdlc1xuICAgKi9cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5sb2FkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgRGVmYXVsdCB2YXJpYWJsZXNcbiAgICovXG4gIHNldENhbGVuZGFyKCkge1xuICAgIHRoaXMuZGF5cyA9IFtdO1xuICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eSA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLnNlc3Npb25zU2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuc2Vzc2lvbnNTdGFydFNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuZWFybHlTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLnBhdXNlU2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5idXN5U2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5zZXNzaW9ucyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLnNlc3Npb25zLm5leHQodGhpcy5zZXNzaW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFZpZXcgTW9kZSB3aXRoIHdlZWssIGRheSwgMyBkYXlzXG4gICAqIEluaXQgc3RhcnQsIGVuZCxcbiAgICpcbiAgICovXG4gIHNldFZpZXdNb2RlKCkge1xuICAgIGlmICh0aGlzLnZpZXdNb2RlID09PSAnZGF5Jykge1xuICAgICAgdGhpcy5lbmQgPSB0aGlzLnN0YXJ0O1xuICAgICAgdGhpcy5jYWxlbmRhclN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLnN0YXJ0T2YoJ2RheScpO1xuICAgICAgdGhpcy5jYWxlbmRhckVuZCA9IG1vbWVudCh0aGlzLmVuZCkuZW5kT2YoJ2RheScpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3RocmVlX2RheXMnKSB7XG4gICAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoMiwgJ2RheXMnKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdGFydE9mKCdkYXknKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJFbmQgPSBtb21lbnQodGhpcy5lbmQpLmVuZE9mKCdkYXknKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gSW5pdCBmaXJzdCBkYXkgd2VlayBudW1iZXJcbiAgICBjb25zdCBmaXJzdERheSA9IDA7XG4gICAgLy8gSWYgZW1wdHkgc3RhcnQgZGF0ZSB0aGVuIHN0YXJ0IHRvIHRvZGF5XG4gICAgaWYgKCF0aGlzLnN0YXJ0KSB7XG4gICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KCk7XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuZGF5KGZpcnN0RGF5KS5zdGFydE9mKCdkYXknKTtcbiAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoNiwgJ2RheXMnKS5lbmRPZignZGF5Jyk7XG5cbiAgICB0aGlzLmNhbGVuZGFyU3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuc3RhcnRPZignZGF5Jyk7XG4gICAgdGhpcy5jYWxlbmRhckVuZCA9IG1vbWVudCh0aGlzLmVuZCkuZW5kT2YoJ2RheScpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHN0YXJ0L3ZpZXdNb2RlIGNoYW5nZWQsIGRvIGEgcmVjYWxjdWxhdGUgb2YgaW5pdCBzdGFydCwgZW5kXG4gICAqIGRheXMsIGRheXNBdmFpbGFiaWxpdHkgYW5kIHZpZXdNb2RlXG4gICAqL1xuICBsb2FkQ2FsZW5kYXIoKSB7XG4gICAgdGhpcy5zZXRDYWxlbmRhcigpO1xuICAgIHRoaXMuc2V0Vmlld01vZGUoKTtcbiAgICB0aGlzLnNldERhdGVSYW5nZSh0aGlzLnN0YXJ0LCB0aGlzLmVuZCk7XG4gICAgdGhpcy5sb2FkRXZlbnRzKHRoaXMuc3RhcnQsIHRoaXMuZW5kKTtcbiAgICB0aGlzLmxvYWRBdmFpbGFiaWxpdGllcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhdmFpbGFibGUgZGF5cyBmcm9tIHN0YXJ0IHRvIGVuZCBkYXRlc1xuICAgKi9cbiAgc2V0RGF0ZVJhbmdlKHN0YXJ0OiBNb21lbnQsIGVuZDogTW9tZW50KSB7XG4gICAgLy8gRGF5cyByYW5nZSBmcm9tIHN0YXJ0IHRvIGVuZFxuICAgIGNvbnN0IGRheXNSYW5nZTogVHdpeEl0ZXIgPSBzdGFydFxuICAgICAgLnR3aXgoZW5kKVxuICAgICAgLml0ZXJhdGUoMSwgJ2RheXMnKTtcbiAgICAvLyBMb2FkaW5nIGFsbCBkYXlzXG4gICAgd2hpbGUgKGRheXNSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZURheTogVHdpeCA9IGRheXNSYW5nZS5uZXh0KCk7XG4gICAgICB0aGlzLmRheXMucHVzaCh7XG4gICAgICAgIHRpdGxlOiBhdmFpbGFibGVEYXkuZm9ybWF0KCdERC9NTS9ZWVlZJyksXG4gICAgICAgIGtleTogYXZhaWxhYmxlRGF5LmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgICB2YWx1ZTogbW9tZW50KGF2YWlsYWJsZURheS50b0RhdGUoKSlcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LnNldChhdmFpbGFibGVEYXkuZm9ybWF0KCdZWVlZLU1NLUREJyksIFtdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT24gc3dpdGNoIGRhdGUgcmFuZ2VcbiAgICovXG4gIG9uU3dpdGhlZFZpZXcodmlld01vZGU6IHN0cmluZykge1xuICAgIHRoaXMudmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLnZpZXdNb2RlQ2hhbmdlZC5lbWl0KHZpZXdNb2RlKTtcbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHN0YXJ0IGNoYW5nZSBldmVudFxuICAgKi9cbiAgb25TdGFydENoYW5nZWQoc3RhcnQ6IE1vbWVudCkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHNlc3Npb24gYWRkZWQgb24gY2xpY2sgZXZlbnRcbiAgICovXG4gIG9uU2Vzc2lvbkFkZGVkKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICB0aGlzLnNlc3Npb25zLnNldChtb21lbnQoc2Vzc2lvbi5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSwgc2Vzc2lvbik7XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5zZXNzaW9ucy5uZXh0KHRoaXMuc2Vzc2lvbnMpO1xuICAgIHRoaXMuYWRkU2Vzc2lvbihzZXNzaW9uKTtcbiAgICB0aGlzLnNlc3Npb25DcmVhdGVkLmVtaXQoc2Vzc2lvbik7XG4gIH1cblxuICAvKipcbiAgICogT24gcmVtb3ZlZCBldmVudFxuICAgKi9cbiAgb25TZXNzaW9uUmVtb3ZlZChzb3VyY2U6IHtrZXk6IHN0cmluZywgc2Vzc2lvbjogU2Vzc2lvbn0pIHtcbiAgICB0aGlzLnNlc3Npb25zLmRlbGV0ZShzb3VyY2Uua2V5KTtcbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLnNlc3Npb25zLm5leHQodGhpcy5zZXNzaW9ucyk7XG4gICAgdGhpcy5yZW1vdmVTZXNzaW9uKHNvdXJjZS5zZXNzaW9uKTtcbiAgICB0aGlzLnNlc3Npb25SZW1vdmVkLmVtaXQoc291cmNlLnNlc3Npb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgYWxsIHRpbWUgZm9yIGVhY2ggZGF5c1xuICAgKi9cbiAgbG9hZEF2YWlsYWJpbGl0aWVzKCkge1xuICAgIC8vIG5vIG9ubGluZSBzZXNzaW9uIG5vIGNhbGVuZGFyXG4gICAgaWYgKCF0aGlzLmRheXNBdmFpbGFiaWxpdHkgfHwgIXRoaXMub25saW5lU2Vzc2lvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBzZXNzaW9uIGR1cmF0aW9uXG4gICAgdGhpcy5yZWFsRHVyYXRpb24gPSB0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb247XG4gICAgLy8gc2Vzc2lvbiBkYXkgc3RhcnQgMDA6MDAgLSBlbmQgMjM6NTlcbiAgICBjb25zdCBvbmxpbmVTZXNzaW9uU3RhcnQ6IE1vbWVudCA9IG1vbWVudCh0aGlzLm9ubGluZVNlc3Npb24uc3RhcnRfZGF0ZSwgJ1lZWVktTU0tREQnKS5zdGFydE9mKCdkYXknKTtcbiAgICBjb25zdCBvbmxpbmVTZXNzaW9uRW5kOiBNb21lbnQgPSBtb21lbnQodGhpcy5vbmxpbmVTZXNzaW9uLmVuZF9kYXRlLCAnWVlZWS1NTS1ERCcpLmVuZE9mKCdkYXknKTtcbiAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5mb3JFYWNoKChhdmJzLCBkYXkpID0+IHtcbiAgICAgIGxldCBzbG90c051bWJlciA9IDA7XG4gICAgICAvLyBlYWNoIGRheSBvZiBkYXlzIGF2YWlsYWJpbGl0eSB3aXRoIHN0YXJ0IHRpbWUgMDg6MDBcbiAgICAgIGNvbnN0IG1tdERheSA9IG1vbWVudChkYXksICdZWVlZLU1NLUREJykuaG91cig4KTtcbiAgICAgIGNvbnN0IG1tdERheVN0YXJ0VGltZSA9IG1vbWVudChkYXkgKyB0aGlzLm9ubGluZVNlc3Npb24uc3RhcnRfdGltZSwgJ1lZWVktTU1EREhIOm1tJyk7XG5cbiAgICAgIC8vIElmIHNlc3Npb24gc3RhcnQgdGltZSBsaWtlIDA4OjAwIGlzIGJlZm9yZSBzdGFydCB0b2RheSAwMDowMFxuICAgICAgaWYgKG1tdERheVN0YXJ0VGltZS5pc0JlZm9yZShtb21lbnQoKS5zdGFydE9mKCdkYXknKSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gYm9va2luZyBkZWxheVxuICAgICAgY29uc3QgbWluTW10U3RhcnRUaW1lID0gbW9tZW50KCkuYWRkKHRoaXMub25saW5lU2Vzc2lvbi5ib29raW5nX2RlbGF5LCAnaG91cnMnKTtcbiAgICAgIC8vIHNlc3Npb24gdGltZSBlbmRcbiAgICAgIGNvbnN0IG1tdERheUVuZFRpbWUgPSBtb21lbnQoZGF5ICsgdGhpcy5vbmxpbmVTZXNzaW9uLmVuZF90aW1lLCAnWVlZWS1NTS1EREhIOm1tJyk7XG4gICAgICBtbXREYXlFbmRUaW1lLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgLy8gc2xvdHMgaXRlcmF0b3JcbiAgICAgIGNvbnN0IHRpbWVSYW5nZTogVHdpeEl0ZXIgPSBtbXREYXlTdGFydFRpbWUudHdpeChtbXREYXlFbmRUaW1lKVxuICAgICAgICAuaXRlcmF0ZSh0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgICBpZiAodGhpcy5jYWxlbmRhclN0YXJ0ICYmIHRoaXMuY2FsZW5kYXJFbmQgJiYgbW10RGF5LmlzQmV0d2VlbihvbmxpbmVTZXNzaW9uU3RhcnQsIG9ubGluZVNlc3Npb25FbmQpKSB7XG4gICAgICAgIHdoaWxlICh0aW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVSYW5nZS5uZXh0KCk7XG4gICAgICAgICAgY29uc3QgdGltZU1tdDogTW9tZW50ID0gbW9tZW50KHRpbWUudG9EYXRlKCkpO1xuICAgICAgICAgIGlmICghdGltZU1tdC5pc0JlZm9yZShtaW5NbXRTdGFydFRpbWUpKSB7XG4gICAgICAgICAgICBhdmJzLnB1c2godGltZS5mb3JtYXQoJ0hIOm1tJykpO1xuICAgICAgICAgICAgc2xvdHNOdW1iZXIrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXIuc2V0KGRheSwgc2xvdHNOdW1iZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBzZXNzaW9uIGV2ZW50IGluIGNhbGVuZGFyXG4gICAqL1xuICBhZGRTZXNzaW9uKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICBjb25zdCBtbXRTdGFydCA9IG1vbWVudChzZXNzaW9uLnN0YXJ0KTtcbiAgICBjb25zdCBtbXRFbmQgPSBtb21lbnQoc2Vzc2lvbi5lbmQpO1xuICAgIGNvbnN0IHRpbWVJbm5lclJhbmdlOiBUd2l4SXRlciA9IG1tdFN0YXJ0LnR3aXgobW10RW5kKS5pdGVyYXRlSW5uZXIoc2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUlubmVyUmFuZ2UubmV4dCgpO1xuICAgICAgdGhpcy5zZXNzaW9uc1Nsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgaWYgKCF0aW1lSW5uZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uc1N0YXJ0U2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIGJ1aWxkaW5nIGVhcmxpZXN0IHNsb3QgYmVmb3JlIGV2ZW50ICovXG4gICAgY29uc3QgbW10RWFybHlTdGFydCA9IG1tdFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKFxuICAgICAgbW10RWFybHlTdGFydC5taW51dGVzKCkgLVxuICAgICAgKG1tdEVhcmx5U3RhcnQubWludXRlcygpICUgc2Vzc2lvbi5kdXJhdGlvbikgKyBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICBjb25zdCB0aW1lRWFybGllclJhbmdlOiBUd2l4SXRlciA9IG1tdEVhcmx5U3RhcnQudHdpeChtbXRTdGFydCkuaXRlcmF0ZShzZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHdoaWxlICh0aW1lRWFybGllclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVFYXJsaWVyUmFuZ2UubmV4dCgpO1xuICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgIGlmIChtbXRUaW1lLmlzU2FtZU9yQWZ0ZXIobW10RWFybHlTdGFydCkgJiYgbW10VGltZS5pc0JlZm9yZShtbXRTdGFydCkpIHtcbiAgICAgICAgdGhpcy5lYXJseVNsb3RzLmFkZChtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBidWlsZGluZyBwYXVzZSBzbG90cyBhZnRlciBldmVudCAqL1xuICAgIGNvbnN0IG1tdEVhcmx5RW5kID0gbW10RW5kLmNsb25lKCk7XG4gICAgbW10RWFybHlFbmQuc3VidHJhY3QobW10RWFybHlFbmQubWludXRlcygpICUgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgY29uc3QgbW10UGF1c2VFbmQgPSBtbXRFYXJseUVuZC5jbG9uZSgpLmFkZChzZXNzaW9uLnBhdXNlLCAnbWludXRlcycpO1xuICAgIGNvbnN0IHRpbWVQYXVzZVJhbmdlOiBUd2l4SXRlciA9IG1tdEVhcmx5RW5kLnR3aXgobW10UGF1c2VFbmQpLml0ZXJhdGUoc2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZVBhdXNlUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZVBhdXNlUmFuZ2UubmV4dCgpO1xuICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgIGlmIChtbXRUaW1lLmlzU2FtZU9yQWZ0ZXIobW10RWFybHlFbmQpICYmIG1tdFRpbWUuaXNCZWZvcmUobW10UGF1c2VFbmQpKSB7XG4gICAgICAgIHRoaXMucGF1c2VTbG90cy5hZGQobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHNlc3Npb24gZXZlbnQgaW4gQ2FsZW5kYXJcbiAgICovXG4gIHJlbW92ZVNlc3Npb24oc2Vzc2lvbjogU2Vzc2lvbikge1xuICAgIGNvbnN0IG1tdFN0YXJ0ID0gbW9tZW50KHNlc3Npb24uc3RhcnQpO1xuICAgIGNvbnN0IG1tdEVuZCA9IG1vbWVudChzZXNzaW9uLmVuZCk7XG4gICAgY29uc3QgdGltZUlubmVyUmFuZ2U6IFR3aXhJdGVyID0gbW10U3RhcnQudHdpeChtbXRFbmQpLml0ZXJhdGUoc2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUlubmVyUmFuZ2UubmV4dCgpO1xuICAgICAgaWYgKCF0aW1lSW5uZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmRlbGV0ZSh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uc1N0YXJ0U2xvdHMuZGVsZXRlKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIHJlbW92aW5nIGVhcmx5IHNsb3RzICovXG4gICAgY29uc3QgbW10RWFybHlTdGFydCA9IG1tdFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKFxuICAgICAgbW10RWFybHlTdGFydC5taW51dGVzKCkgLVxuICAgICAgKG1tdEVhcmx5U3RhcnQubWludXRlcygpICUgc2Vzc2lvbi5kdXJhdGlvbikgKyBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICBjb25zdCB0aW1lRWFybHlSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseVN0YXJ0LnR3aXgobW10U3RhcnQpLml0ZXJhdGUoc2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUVhcmx5UmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUVhcmx5UmFuZ2UubmV4dCgpO1xuICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgIGlmIChtbXRUaW1lLmlzU2FtZU9yQWZ0ZXIobW10RWFybHlTdGFydCkgJiYgbW10VGltZS5pc0JlZm9yZShtbXRTdGFydCkpIHtcbiAgICAgICAgdGhpcy5lYXJseVNsb3RzLmRlbGV0ZShtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiByZW1vdmluZyBwYXVzZSBzbG90cyAqL1xuICAgIGlmIChzZXNzaW9uLnBhdXNlKSB7XG4gICAgICBjb25zdCBtbXRFYXJseUVuZCA9IG1tdEVuZC5jbG9uZSgpO1xuICAgICAgbW10RWFybHlFbmQuc3VidHJhY3QobW10RWFybHlFbmQubWludXRlcygpICUgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgICBjb25zdCBtbXRQYXVzZUVuZCA9IG1tdEVhcmx5RW5kLmNsb25lKCkuYWRkKHNlc3Npb24ucGF1c2UsICdtaW51dGVzJyk7XG4gICAgICBjb25zdCB0aW1lUGF1c2VSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseUVuZC50d2l4KG1tdFBhdXNlRW5kKS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgICB3aGlsZSAodGltZVBhdXNlUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lUGF1c2VSYW5nZS5uZXh0KCk7XG4gICAgICAgIGNvbnN0IG1tdFRpbWU6IE1vbWVudCA9IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgICAgIGlmIChtbXRUaW1lLmlzU2FtZU9yQWZ0ZXIobW10RWFybHlFbmQpICYmIG1tdFRpbWUuaXNCZWZvcmUobW10UGF1c2VFbmQpKSB7XG4gICAgICAgICAgdGhpcy5wYXVzZVNsb3RzLmRlbGV0ZShtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKioqKioqKioqKioqKioqKioqKiBEYXRlIGZ1bmN0aW9ucyAqKioqKioqKioqKioqKlxuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqL1xuICBsb2FkRXZlbnRzKHN0YXJ0OiBNb21lbnQsIGVuZDogTW9tZW50KSB7XG4gICAgaWYgKCF0aGlzLm9ubGluZVNlc3Npb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fc2Vzc2lvbnNFbnRyaWVzKSAmJiB0aGlzLl9zZXNzaW9uc0VudHJpZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9zZXNzaW9uc0VudHJpZXMuZm9yRWFjaCgoc2Vzc2lvbjogU2Vzc2lvbikgPT4ge1xuICAgICAgICBpZiAobW9tZW50KHNlc3Npb24uc3RhcnQpLmlzU2FtZU9yQWZ0ZXIoc3RhcnQpICYmXG4gICAgICAgICAgbW9tZW50KHNlc3Npb24uZW5kKS5pc1NhbWVPckJlZm9yZShlbmQpKSB7XG4gICAgICAgICAgdGhpcy5idWlsZGluQnVzeVNsb3Qoc2Vzc2lvbik7XG4gICAgICAgICAgdGhpcy5idWlsZGluZ0VhcmxpZXN0U2xvdChzZXNzaW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNsb3QgbG9ja2VkXG4gICAqL1xuICBidWlsZGluQnVzeVNsb3Qoc2Vzc2lvbjogU2Vzc2lvbik6IE1vbWVudCB7XG4gICAgY29uc3QgbW10RXZlbnRTdGFydCA9IG1vbWVudChzZXNzaW9uLnN0YXJ0LCAnWVlZWS1NTS1EREhIOm1tJyk7XG4gICAgY29uc3QgbW10RXZlbnRFbmQgPSBtb21lbnQoc2Vzc2lvbi5lbmQsICdZWVlZLU1NLURESEg6bW0nKTtcblxuICAgIGlmICghbW10RXZlbnRTdGFydCB8fCAhbW10RXZlbnRTdGFydC5pc1ZhbGlkKClcbiAgICAgIHx8ICFtbXRFdmVudEVuZCB8fCAhbW10RXZlbnRFbmQuaXNWYWxpZCgpXG4gICAgICB8fCAhbW10RXZlbnRTdGFydC5pc1NhbWVPckJlZm9yZShtbXRFdmVudEVuZCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2ludmFsaWQgZGF0ZXMnLCBtbXRFdmVudFN0YXJ0LCBtbXRFdmVudEVuZCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyogYnVpbGRpbmcgYnVzeSBzbG90cyBieSBldmVudHMgKi9cbiAgICBjb25zdCBldmVudHNUaW1lUmFuZ2U6IFR3aXhJdGVyID0gbW10RXZlbnRTdGFydC50d2l4KG1tdEV2ZW50RW5kKS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG5cbiAgICB3aGlsZSAoZXZlbnRzVGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3Qge3RpbWUsIG1tdFRpbWV9ID0gQ2FsZW5kYXJDb21wb25lbnQuc3BsaXRSYW5nZVRvTmV4dFRpbWUoZXZlbnRzVGltZVJhbmdlLCBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgIC8qIElGIHRoZSBidXN5IHNsb3QgaXMgYXZhaWxhYmUgYW5kIG5vdCBhbHJlYWR5IGluIGJ1c3lTbG90cyB3ZSBjb3VudCBpdCAqL1xuICAgICAgaWYgKHRoaXMuZGF5c0F2YWlsYWJpbGl0eSAmJlxuICAgICAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpICYmXG4gICAgICAgICF0aGlzLmJ1c3lTbG90cy5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKSAmJlxuICAgICAgICAhdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmdldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKS5pbmNsdWRlcyh0aW1lLmZvcm1hdCgnSEg6bW0nKSkpIHtcbiAgICAgICAgaWYgKCghc2Vzc2lvbi5jdXN0b21lcnMgfHxcbiAgICAgICAgICAoc2Vzc2lvbi5jdXN0b21lcnMgJiZcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXIgJiZcbiAgICAgICAgICAgICFzZXNzaW9uLmN1c3RvbWVycy5tYXAoYyA9PiBjLmlkKS5pbmNsdWRlcyh0aGlzLmN1c3RvbWVyLmlkKSkpKSB7XG4gICAgICAgICAgdGhpcy5zZXRPdGhlckJ1c3lTbG90cyh0aW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2Vzc2lvbi5jdXN0b21lcnMgJiYgdGhpcy5jdXN0b21lciAmJiBzZXNzaW9uLmN1c3RvbWVycy5tYXAoYyA9PiBjLmlkKS5pbmNsdWRlcyh0aGlzLmN1c3RvbWVyLmlkKSkge1xuICAgICAgICAgIHRoaXMuc2V0U2Vzc2lvblNsb3QoZXZlbnRzVGltZVJhbmdlLCB0aW1lLCBzZXNzaW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLnNlc3Npb25zLm5leHQodGhpcy5zZXNzaW9ucyk7XG5cbiAgICByZXR1cm4gbW10RXZlbnRTdGFydDtcbiAgfVxuXG4gIHNldE90aGVyQnVzeVNsb3RzKHRpbWU6IFR3aXgpIHtcbiAgICBsZXQgZGF5QnVzeU51bWJlciA9IHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSA/XG4gICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgOiAwO1xuICAgIGRheUJ1c3lOdW1iZXIrKztcbiAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5zZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSwgZGF5QnVzeU51bWJlcik7XG4gICAgdGhpcy5idXN5U2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgaW4gc2Vzc2lvbnMgTWFwIG9ubHkgc3RhcnQgc2Vzc2lvbiB3aXRoIGl0cyBzZXNzaW9uXG4gICAqL1xuICBzZXRTZXNzaW9uU2xvdChldmVudHNUaW1lUmFuZ2U6IFR3aXhJdGVyLCB0aW1lOiBUd2l4LCBzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgdGhpcy5zZXNzaW9uc1Nsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgIGlmICghZXZlbnRzVGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNlc3Npb25zLnNldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJyksIHNlc3Npb24pO1xuICAgIHRoaXMuc2Vzc2lvbnNTdGFydFNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNsb3QgYmVmb3JlIGF2YWlsYWJpbGl0eSByYW5nZVxuICAgKi9cbiAgYnVpbGRpbmdFYXJsaWVzdFNsb3Qoc2Vzc2lvbjogU2Vzc2lvbikge1xuICAgIGNvbnN0IG1tdEV2ZW50U3RhcnQ6IE1vbWVudCA9IG1vbWVudChzZXNzaW9uLnN0YXJ0LCAnWVlZWS1NTS1EREhIOm1tJyk7XG4gICAgaWYgKCFtbXRFdmVudFN0YXJ0IHx8ICF0aGlzLnJlYWxEdXJhdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qIGJ1aWxkaW5nIGVhcmxpZXN0IHNsb3QgYmVmb3JlIGV2ZW50ICovXG4gICAgY29uc3QgbW10RWFybHlTdGFydCA9IG1tdEV2ZW50U3RhcnQuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLnJlYWxEdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICBtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMobW10RWFybHlTdGFydC5taW51dGVzKCkgLVxuICAgICAgKG1tdEVhcmx5U3RhcnQubWludXRlcygpICUgdGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uKSArIHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgY29uc3QgZWFybGllc3RUaW1lUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlTdGFydC50d2l4KG1tdEV2ZW50U3RhcnQpLml0ZXJhdGUodGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHdoaWxlIChlYXJsaWVzdFRpbWVSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHt0aW1lLCBtbXRUaW1lfSA9IENhbGVuZGFyQ29tcG9uZW50LnNwbGl0UmFuZ2VUb05leHRUaW1lKGVhcmxpZXN0VGltZVJhbmdlLCB0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb24pO1xuICAgICAgLyogSUYgdGhlIGJ1c3kgc2xvdCBpcyBpbiBhdmFpbGFiaWxpdHkgYW5kIG5vdCBhbHJlYWR5IGluIGJ1c3lTbG90cyB3ZSBjb3VudCBpdCAqL1xuICAgICAgaWYgKHRoaXMuZGF5c0F2YWlsYWJpbGl0eSAmJlxuICAgICAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpXG4gICAgICAgICYmICF0aGlzLmJ1c3lTbG90cy5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKVxuICAgICAgICAmJiB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZ2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpLmluY2x1ZGVzKHRpbWUuZm9ybWF0KCdISDptbScpKSkge1xuICAgICAgICBsZXQgZGF5QnVzeU51bWJlciA9IHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSA/XG4gICAgICAgICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuZ2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpIDogMDtcbiAgICAgICAgZGF5QnVzeU51bWJlcisrO1xuICAgICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5zZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSwgZGF5QnVzeU51bWJlcik7XG4gICAgICAgIHRoaXMuYnVzeVNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19