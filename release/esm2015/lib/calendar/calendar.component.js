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
        // Default View Mode of Week Component
        this._viewMode = 'week';
        /**
         * Start day of calendar (could be updated)
         */
        this.start = moment();
        /**
         * End day of calendar (could be updated but reewriten on switch week mode
         */
        this.end = moment();
        /**
         * Slot session duration in minutes
         */
        this.slotDuration = 60;
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
        this.sessionsEntries = [];
        this.viewModeChanged = new EventEmitter();
        this.sessionCreated = new EventEmitter();
        this.sessionRemoved = new EventEmitter();
        this.days = [];
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
     * @return {?}
     */
    ngOnInit() {
        this.setCalendar();
        this.setDateRange();
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
     * @return {?}
     */
    get viewMode() {
        return this._viewMode;
    }
    /**
     * Inspect all changes
     * @return {?}
     */
    ngOnChanges() {
        this.setDateRange();
    }
    /**
     * Set Default variables
     * @return {?}
     */
    setCalendar() {
        this.onlineSession = {
            key: 'test1',
            session_type: {
                name: 'test1',
                max_persons: 1,
                booking_delay: 1,
                duration: 60,
                pause: 0,
            },
            prices: [10, 20],
            date_range: {
                start: '2018-01-01',
                end: '2019-12-31',
            },
            time_range: {
                start: '08:00',
                end: '19:00',
            }
        };
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
    setDateRange() {
        this.setCalendar();
        this.setViewMode();
        // this.buildTrueDuration();
        this.loadEvents(this.start, this.end);
        this.daysAvailability = new Map();
        /** @type {?} */
        const dateRange = this.start
            .twix(this.end)
            .iterate(1, 'days');
        this.days = [];
        // Loading all days
        while (dateRange.hasNext()) {
            /** @type {?} */
            const date = dateRange.next();
            this.days.push({
                title: date.format('DD/MM/YYYY'),
                key: date.format('YYYY-MM-DD'),
                value: moment(date.toDate())
            });
            this.daysAvailability.set(date.format('YYYY-MM-DD'), []);
        }
        this.loadAvailabilities();
    }
    /**
     * On switch date range
     * @param {?} viewMode
     * @return {?}
     */
    onSwithedView(viewMode) {
        this.viewMode = viewMode;
        this.viewModeChanged.emit(viewMode);
        this.setDateRange();
    }
    /**
     * On start change event
     * @param {?} start
     * @return {?}
     */
    onStartChanged(start) {
        this.start = start;
        this.setDateRange();
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
        /** @type {?} */
        const duration = this.onlineSession.session_type.duration;
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
            mmtDayEndTime.subtract(duration, 'minutes');
            // slots iterator
            /** @type {?} */
            const timeRange = mmtDayStartTime.twix(mmtDayEndTime).iterate(this.slotDuration, 'minutes');
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
        const timeInnerRange = mmtStart.twix(mmtEnd).iterateInner(this.slotDuration, 'minutes');
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
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() - (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
        /** @type {?} */
        const timeEarlierRange = mmtEarlyStart.twix(mmtStart).iterate(this.slotDuration, 'minutes');
        while (timeEarlierRange.hasNext()) {
            /** @type {?} */
            const time = timeEarlierRange.next();
            /** @type {?} */
            const mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), this.slotDuration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                this.earlySlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* building pause slots after event */
        /** @type {?} */
        const mmtEarlyEnd = mmtEnd.clone();
        mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % this.slotDuration);
        /** @type {?} */
        const mmtPauseEnd = mmtEarlyEnd.clone().add(this.onlineSession.session_type.pause, 'minutes');
        /** @type {?} */
        const timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(this.slotDuration, 'minutes');
        while (timePauseRange.hasNext()) {
            /** @type {?} */
            const time = timePauseRange.next();
            /** @type {?} */
            const mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), this.slotDuration);
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
        const timeInnerRange = mmtStart.twix(mmtEnd).iterate(this.slotDuration, 'minutes');
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
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() - (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
        /** @type {?} */
        const timeEarlyRange = mmtEarlyStart.twix(mmtStart).iterate(this.slotDuration, 'minutes');
        while (timeEarlyRange.hasNext()) {
            /** @type {?} */
            const time = timeEarlyRange.next();
            /** @type {?} */
            const mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), this.slotDuration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                this.earlySlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* removing pause slots */
        if (session.pause) {
            /** @type {?} */
            const mmtEarlyEnd = mmtEnd.clone();
            mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % this.slotDuration);
            /** @type {?} */
            const mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
            /** @type {?} */
            const timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(this.slotDuration, 'minutes');
            while (timePauseRange.hasNext()) {
                /** @type {?} */
                const time = timePauseRange.next();
                /** @type {?} */
                const mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), this.slotDuration);
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
        if (Array.isArray(this.sessionsEntries)) {
            this.sessionsEntries = [...this.sessionsEntries.filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    return event && event.start >= start.toDate() && event.end <= end.toDate();
                }))];
        }
        this.busySlots = new Set();
        this.daysBusySlotNumber = new Map();
        this.sessionsEntries.forEach((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            let mmtEventStart = moment(event.start, 'YYYY-MM-DDHH:mm');
            mmtEventStart = this.buildinBusySlot(mmtEventStart, event);
            this.buildingEarliestSlot(mmtEventStart);
        }));
        this.cd.markForCheck();
    }
    /**
     * @param {?} mmtEventStart
     * @param {?} event
     * @return {?}
     */
    buildinBusySlot(mmtEventStart, event) {
        /** @type {?} */
        const mmtEventEnd = moment(event.end, 'YYYY-MM-DDHH:mm');
        if (!mmtEventStart || !mmtEventStart.isValid()
            || !mmtEventEnd || !mmtEventEnd.isValid()
            || !mmtEventStart.isBefore(mmtEventEnd)) {
            console.error('invalid dates');
            return null;
        }
        /* building busy slots by events*/
        /** @type {?} */
        const eventsTimeRange = mmtEventStart.twix(mmtEventEnd).iterate(this.slotDuration, 'minutes');
        while (eventsTimeRange.hasNext()) {
            const { time, mmtTime } = CalendarComponent.splitRangeToNextTime(eventsTimeRange, this.slotDuration);
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
        return mmtEventStart;
    }
    /**
     * @param {?} mmtEventStart
     * @return {?}
     */
    buildingEarliestSlot(mmtEventStart) {
        /* building earliest slot before event */
        /** @type {?} */
        const mmtEarlyStart = mmtEventStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
        /** @type {?} */
        const earliestTimeRange = mmtEarlyStart.twix(mmtEventStart).iterate(this.slotDuration, 'minutes');
        while (earliestTimeRange.hasNext()) {
            const { time, mmtTime } = CalendarComponent.splitRangeToNextTime(earliestTimeRange, this.slotDuration);
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
                template: "<div class=\"week-calendar-wrapper\">\n  <div class=\"week-calendar-header\">\n\n\n    <div class=\"week-calendar-title\">\n\n\n      <lib-calendar-header [start]=\"start\"\n                           [end]=\"end\"\n                           [headerConfiguration]=\"calendarConfiguration\"\n                           [viewMode]=\"viewMode\"\n                           (switchedView)=\"onSwithedView($event)\"\n                           (startChanged)=\"onStartChanged($event)\"></lib-calendar-header>\n\n    </div>\n\n  </div>\n\n  <div>\n\n\n    <lib-calendar-body [bodyConfiguration]=\"calendarConfiguration\"\n                       [onlineSession]=\"onlineSession\"\n                       [days]=\"days\"\n                       [viewMode]=\"viewMode\"\n                       [start]=\"start\"\n                       [end]=\"end\"\n                       [daysAvailability]=\"daysAvailability\"\n                       [daysBusySlotNumber]=\"daysBusySlotNumber\"\n                       [daysAvailabilitySlotNumber]=\"daysAvailabilitySlotNumber\"\n                       [busySlots]=\"busySlots\"\n                       [earlySlots]=\"earlySlots\"\n                       [pauseSlots]=\"pauseSlots\"\n                       [sessionsSlots]=\"sessionsSlots\"\n                       [sessionsEndSlots]=\"sessionsEndSlots\"\n                       [sessions]=\"sessions\"\n                       (startChanged)=\"onStartChanged($event)\"\n                       (sessionAdded)=\"onSessionAdded($event)\"\n                       (sessionRemoved)=\"onSessionRemoved($event)\"\n                       *ngIf=\"start && end && days && viewMode\"></lib-calendar-body>\n\n  </div>\n</div>\n",
                styles: [".week-calendar-wrapper .week-calendar-header{padding-bottom:20px}@media (min-width:768px){.week-calendar-wrapper .week-calendar-header .week-calendar-title{width:90vw}}"]
            }] }
];
/** @nocollapse */
CalendarComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
CalendarComponent.propDecorators = {
    onlineSession: [{ type: Input }],
    start: [{ type: Input }],
    end: [{ type: Input }],
    slotDuration: [{ type: Input }],
    calendarConfiguration: [{ type: Input }],
    sessionsEntries: [{ type: Input }],
    viewModeChanged: [{ type: Output }],
    sessionCreated: [{ type: Output }],
    sessionRemoved: [{ type: Output }],
    viewMode: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CalendarComponent.prototype._viewMode;
    /** @type {?} */
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
     * Slot session duration in minutes
     * @type {?}
     */
    CalendarComponent.prototype.slotDuration;
    /**
     * Configuration calendar
     * @type {?}
     */
    CalendarComponent.prototype.calendarConfiguration;
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
    /** @type {?} */
    CalendarComponent.prototype.sessionsEntries;
    /** @type {?} */
    CalendarComponent.prototype.viewModeChanged;
    /** @type {?} */
    CalendarComponent.prototype.sessionCreated;
    /** @type {?} */
    CalendarComponent.prototype.sessionRemoved;
    /** @type {?} */
    CalendarComponent.prototype.days;
    /** @type {?} */
    CalendarComponent.prototype.realDuration;
    /** @type {?} */
    CalendarComponent.prototype.daysAvailability;
    /** @type {?} */
    CalendarComponent.prototype.daysBusySlotNumber;
    /** @type {?} */
    CalendarComponent.prototype.daysAvailabilitySlotNumber;
    /** @type {?} */
    CalendarComponent.prototype.busySlots;
    /** @type {?} */
    CalendarComponent.prototype.earlySlots;
    /** @type {?} */
    CalendarComponent.prototype.pauseSlots;
    /** @type {?} */
    CalendarComponent.prototype.sessionsSlots;
    /** @type {?} */
    CalendarComponent.prototype.sessionsEndSlots;
    /** @type {?} */
    CalendarComponent.prototype.sessions;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFHbEMsT0FBTyxNQUFNLENBQUM7O01BT1IsTUFBTSxHQUFHLE9BQU87QUFTdEIsTUFBTSxPQUFPLGlCQUFpQjs7OztJQXVGNUIsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7O1FBckZ6QyxjQUFTLEdBQVcsTUFBTSxDQUFDOzs7O1FBTWxCLFVBQUssR0FBVyxNQUFNLEVBQUUsQ0FBQzs7OztRQUl6QixRQUFHLEdBQVcsTUFBTSxFQUFFLENBQUM7Ozs7UUFJdkIsaUJBQVksR0FBRyxFQUFFLENBQUM7Ozs7UUFLbEIsMEJBQXFCLEdBQTBCO1lBQ3RELFFBQVEsRUFBRTtnQkFDUixHQUFHLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCO2dCQUNELEtBQUssRUFBRSxjQUFjO2dCQUNyQixVQUFVLEVBQUUsbUNBQW1DO2dCQUMvQyxHQUFHLEVBQUUsTUFBTTtnQkFDWCxVQUFVLEVBQUUsU0FBUztnQkFDckIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLHdCQUF3QjtnQkFDL0IsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsWUFBWSxFQUFFO29CQUNaLEtBQUssRUFBRSxzQkFBc0I7b0JBQzdCLElBQUksRUFBRSx5QkFBeUI7aUJBQ2hDO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsb0JBQW9CO2lCQUMzQjthQUNGO1NBQ0YsQ0FBQztRQVdPLG9CQUFlLEdBQWMsRUFBRSxDQUFDO1FBRS9CLG9CQUFlLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFFbkUsbUJBQWMsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUVwRSxtQkFBYyxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO1FBRTlFLFNBQUksR0FBZSxFQUFFLENBQUM7SUEyQnRCLENBQUM7Ozs7OztJQWRELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxhQUF1QixFQUFFLFlBQW9COztjQUNqRSxJQUFJLEdBQVMsYUFBYSxDQUFDLElBQUksRUFBRTtRQUN2QyxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxFQUFDLENBQUM7SUFDNUcsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQWUsRUFBRSxZQUFvQjtRQUMvRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxZQUFZLEtBQUssQ0FBQyxFQUFFO1lBQzFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FDekU7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7O0lBS0QsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFRCxJQUFhLFFBQVEsQ0FBQyxRQUFRO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBS0QsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUtELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLEdBQUcsRUFBRSxPQUFPO1lBQ1osWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxPQUFPO2dCQUNiLFdBQVcsRUFBRSxDQUFDO2dCQUNkLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixRQUFRLEVBQUUsRUFBRTtnQkFDWixLQUFLLEVBQUUsQ0FBQzthQUNUO1lBQ0QsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNoQixVQUFVLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLEdBQUcsRUFBRSxZQUFZO2FBQ2xCO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLEtBQUssRUFBRSxPQUFPO2dCQUNkLEdBQUcsRUFBRSxPQUFPO2FBQ2I7U0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7Ozs7SUFPRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtZQUMzQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pELE9BQU87U0FDUjthQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUU7WUFDekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pELE9BQU87U0FDUjs7O2NBRUssUUFBUSxHQUFHLENBQUM7UUFDbEIsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLEVBQUUsQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7OztJQU1ELFlBQVk7UUFDVixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDOztjQUM1QixTQUFTLEdBQWEsSUFBSSxDQUFDLEtBQUs7YUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDZCxPQUFPLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLG1CQUFtQjtRQUNuQixPQUFPLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs7a0JBQ3BCLElBQUksR0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztnQkFDaEMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO2dCQUM5QixLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUM3QixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDMUQ7UUFDRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7Ozs7SUFLRCxhQUFhLENBQUMsUUFBZ0I7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7OztJQUtELGNBQWMsQ0FBQyxLQUFhO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7Ozs7SUFLRCxjQUFjLENBQUMsT0FBZ0I7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQUtELGdCQUFnQixDQUFDLE1BQXVDO1FBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFLRCxrQkFBa0I7UUFDaEIsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2pELE9BQU87U0FDUjs7O2NBRUssUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVE7OztjQUVuRCxrQkFBa0IsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7O2NBQ3JHLGdCQUFnQixHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNyRyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTzs7Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTs7Z0JBQ3RDLFdBQVcsR0FBRyxDQUFDOzs7a0JBRWIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7a0JBQzFDLGVBQWUsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQztZQUUzRiwrREFBK0Q7WUFDL0QsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNyRCxPQUFPO2FBQ1I7OztrQkFFSyxlQUFlLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7OztrQkFFdEYsYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDO1lBQ3hGLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDOzs7a0JBRXRDLFNBQVMsR0FBYSxlQUFlLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQztZQUNyRyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLGdCQUFnQixDQUFDLEVBQUU7Z0JBQ3BHLE9BQU8sU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFOzswQkFDcEIsSUFBSSxHQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUU7OzBCQUM3QixPQUFPLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7d0JBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxXQUFXLEVBQUUsQ0FBQztxQkFDZjtpQkFDRjthQUNGO1lBQ0QsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFLRCxVQUFVLENBQUMsT0FBZ0I7O2NBQ25CLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzs7Y0FDaEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOztjQUM1QixjQUFjLEdBQWEsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUM7UUFDakcsT0FBTyxjQUFjLENBQUMsT0FBTyxFQUFFLEVBQUU7O2tCQUN6QixJQUFJLEdBQVMsY0FBYyxDQUFDLElBQUksRUFBRTtZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2FBQzNEO1NBQ0Y7OztjQUVLLGFBQWEsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDO1FBQzdFLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O2NBQzdHLGdCQUFnQixHQUFhLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDO1FBQ3JHLE9BQU8sZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEVBQUU7O2tCQUMzQixJQUFJLEdBQVMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFOztrQkFDcEMsT0FBTyxHQUFXLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3hHLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN0RSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzthQUN4RDtTQUNGOzs7Y0FFSyxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRTtRQUNsQyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O2NBQzFELFdBQVcsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUM7O2NBQ3ZGLGNBQWMsR0FBYSxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQztRQUNwRyxPQUFPLGNBQWMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs7a0JBQ3pCLElBQUksR0FBUyxjQUFjLENBQUMsSUFBSSxFQUFFOztrQkFDbEMsT0FBTyxHQUFXLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3hHLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzthQUN4RDtTQUNGO0lBQ0gsQ0FBQzs7Ozs7O0lBS0QsYUFBYSxDQUFDLE9BQWdCOztjQUN0QixRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7O2NBQ2hDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7Y0FDNUIsY0FBYyxHQUFhLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDO1FBQzVGLE9BQU8sY0FBYyxDQUFDLE9BQU8sRUFBRSxFQUFFOztrQkFDekIsSUFBSSxHQUFTLGNBQWMsQ0FBQyxJQUFJLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzthQUM5RDtTQUNGOzs7Y0FFSyxhQUFhLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQztRQUM3RSxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDOztjQUM3RyxjQUFjLEdBQWEsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUM7UUFDbkcsT0FBTyxjQUFjLENBQUMsT0FBTyxFQUFFLEVBQUU7O2tCQUN6QixJQUFJLEdBQVMsY0FBYyxDQUFDLElBQUksRUFBRTs7a0JBQ2xDLE9BQU8sR0FBVyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN4RyxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7YUFDM0Q7U0FDRjtRQUNELDBCQUEwQjtRQUMxQixJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7O2tCQUNYLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2xDLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7a0JBQzFELFdBQVcsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDOztrQkFDL0QsY0FBYyxHQUFhLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDO1lBQ3BHLE9BQU8sY0FBYyxDQUFDLE9BQU8sRUFBRSxFQUFFOztzQkFDekIsSUFBSSxHQUFTLGNBQWMsQ0FBQyxJQUFJLEVBQUU7O3NCQUNsQyxPQUFPLEdBQVcsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3hHLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztpQkFDM0Q7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7Ozs7O0lBTUQsVUFBVSxDQUFDLEtBQWEsRUFBRSxHQUFXO1FBQ25DLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNOzs7O2dCQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQy9ELE9BQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUM3RSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1NBQ0w7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFFcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTs7Z0JBQ3hDLGFBQWEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQztZQUMxRCxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNDLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7Ozs7SUFFRCxlQUFlLENBQUMsYUFBcUIsRUFBRSxLQUFZOztjQUMzQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUM7UUFDeEQsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7ZUFDekMsQ0FBQyxXQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO2VBQ3RDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN6QyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQy9CLE9BQU8sSUFBSSxDQUFDO1NBQ2I7OztjQUVLLGVBQWUsR0FBYSxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQztRQUN2RyxPQUFPLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtrQkFDMUIsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLEdBQUcsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDbEcsbUZBQW1GO1lBQ25GLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQzttQkFDNUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7bUJBQ25ELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFOztvQkFDeEYsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxhQUFhLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3ZFO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7U0FDcEQ7UUFFRCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELG9CQUFvQixDQUFDLGFBQXFCOzs7Y0FFbEMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUM7UUFDbEYsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQzNDLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O2NBQy9ELGlCQUFpQixHQUFhLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDO1FBQzNHLE9BQU8saUJBQWlCLENBQUMsT0FBTyxFQUFFLEVBQUU7a0JBQzVCLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxHQUFHLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDcEcsbUZBQW1GO1lBQ25GLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQzttQkFDNUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7bUJBQ25ELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFOztvQkFDeEYsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxhQUFhLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3ZFO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7U0FDcEQ7SUFDSCxDQUFDOzs7WUFqYkYsU0FBUyxTQUFDOztnQkFFVCxRQUFRLEVBQUUsY0FBYzs7Z0JBRXhCLHlxREFBd0M7O2FBRXpDOzs7O1lBMUJDLGlCQUFpQjs7OzRCQStCaEIsS0FBSztvQkFJTCxLQUFLO2tCQUlMLEtBQUs7MkJBSUwsS0FBSztvQ0FLTCxLQUFLOzhCQWdDTCxLQUFLOzhCQUVMLE1BQU07NkJBRU4sTUFBTTs2QkFFTixNQUFNO3VCQW9DTixLQUFLOzs7O0lBN0ZOLHNDQUEyQjs7SUFFM0IsMENBQXNDOzs7OztJQUl0QyxrQ0FBa0M7Ozs7O0lBSWxDLGdDQUFnQzs7Ozs7SUFJaEMseUNBQTJCOzs7OztJQUszQixrREFxQkU7Ozs7OztJQUtGLDBDQUE4Qjs7Ozs7O0lBSTlCLHdDQUE0Qjs7SUFFNUIsNENBQXlDOztJQUV6Qyw0Q0FBNkU7O0lBRTdFLDJDQUE4RTs7SUFFOUUsMkNBQThFOztJQUU5RSxpQ0FBc0I7O0lBQ3RCLHlDQUFxQjs7SUFDckIsNkNBQXdDOztJQUV4QywrQ0FBd0M7O0lBQ3hDLHVEQUFnRDs7SUFDaEQsc0NBQXVCOztJQUN2Qix1Q0FBd0I7O0lBQ3hCLHVDQUF3Qjs7SUFDeEIsMENBQTJCOztJQUMzQiw2Q0FBOEI7O0lBQzlCLHFDQUErQjs7Ozs7SUFlbkIsK0JBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgVHdpeCwgVHdpeEl0ZXIgfSBmcm9tICd0d2l4JztcbmltcG9ydCAndHdpeCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9zaGFyZWQvY29uZmlndXJhdGlvbi9jYWxlbmRhci1jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IERheSB9IGZyb20gJy4uL3NoYXJlZC9kYXkvZGF5JztcbmltcG9ydCB7IE9ubGluZVNlc3Npb24gfSBmcm9tICcuLi9zaGFyZWQvc2Vzc2lvbi9vbmxpbmUtc2Vzc2lvbic7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vc2hhcmVkL3Nlc3Npb24vc2Vzc2lvbic7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4uL3NoYXJlZC9ldmVudC9ldmVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZVxuICBzZWxlY3RvcjogJ25neC1jYWxlbmRhcicsXG4gIC8vIHRzbGludDplbmFibGVcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLy8gRGVmYXVsdCBWaWV3IE1vZGUgb2YgV2VlayBDb21wb25lbnRcbiAgX3ZpZXdNb2RlOiBTdHJpbmcgPSAnd2Vlayc7XG5cbiAgQElucHV0KCkgb25saW5lU2Vzc2lvbjogT25saW5lU2Vzc2lvbjtcbiAgLyoqXG4gICAqIFN0YXJ0IGRheSBvZiBjYWxlbmRhciAoY291bGQgYmUgdXBkYXRlZClcbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0OiBNb21lbnQgPSBtb21lbnQoKTtcbiAgLyoqXG4gICAqIEVuZCBkYXkgb2YgY2FsZW5kYXIgKGNvdWxkIGJlIHVwZGF0ZWQgYnV0IHJlZXdyaXRlbiBvbiBzd2l0Y2ggd2VlayBtb2RlXG4gICAqL1xuICBASW5wdXQoKSBlbmQ6IE1vbWVudCA9IG1vbWVudCgpO1xuICAvKipcbiAgICogU2xvdCBzZXNzaW9uIGR1cmF0aW9uIGluIG1pbnV0ZXNcbiAgICovXG4gIEBJbnB1dCgpIHNsb3REdXJhdGlvbiA9IDYwO1xuXG4gIC8qKlxuICAgKiBDb25maWd1cmF0aW9uIGNhbGVuZGFyXG4gICAqL1xuICBASW5wdXQoKSBjYWxlbmRhckNvbmZpZ3VyYXRpb246IENhbGVuZGFyQ29uZmlndXJhdGlvbiA9IHtcbiAgICBjYWxlbmRhcjoge1xuICAgICAgY3RhOiB7XG4gICAgICAgIG5leHQ6ICdzdWl2YW50JyxcbiAgICAgICAgcHJldmlvdXM6ICdwcsOpY8OpZGVudCcsXG4gICAgICB9LFxuICAgICAgdG9kYXk6ICdhdWpvdXJkXFwnaHVpJyxcbiAgICAgIGJhY2tfdG9kYXk6ICdyZXZlbmlyIMOgIGxhIGRhdGUgZFxcJ2F1am91cmRcXCdodWknLFxuICAgICAgZGF5OiAnam91cicsXG4gICAgICB0aHJlZV9kYXlzOiAnMyBqb3VycycsXG4gICAgICB3ZWVrOiAnc2VtYWluZScsXG4gICAgICB0aXRsZTogJ3LDqXNlcnZlciB2b3RyZSBjcsOpbmVhdScsXG4gICAgICBzdWJ0aXRsZTogJ3RvdXRlcyBsZXMgZGlzcG9uaWJpbGl0w6lzJyxcbiAgICAgIGF2YWlsYWJpbGl0eToge1xuICAgICAgICBlbXB0eTogJ0F1Y3VuZSBkaXNwb25pYmlsaXTDqScsXG4gICAgICAgIHNsb3Q6ICdQcm9jaGFpbmUgZGlzcG9uaWJpbGl0w6knLFxuICAgICAgfSxcbiAgICAgIHNlc3Npb246IHtcbiAgICAgICAgaW5mbzogJ0Nyw6luZWF1IHbDqXJyb3VpbGzDqSdcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIGNhbGVuZGFyIHN0YXJ0IGRheSBhZnRlciBzZXQgZnVsbCBjYWxlbmRhciBpbmZvcm1hdGlvbnNcbiAgICovXG4gIHByaXZhdGUgY2FsZW5kYXJTdGFydDogTW9tZW50O1xuICAvKipcbiAgICogY2FsZW5kYXIgZW5kIGRheSBhZnRlciBzZXQgZnVsbCBjYWxlbmRhciBpbmZvcm1hdGlvbnNcbiAgICovXG4gIHByaXZhdGUgY2FsZW5kYXJFbmQ6IE1vbWVudDtcblxuICBASW5wdXQoKSBzZXNzaW9uc0VudHJpZXM6IFNlc3Npb25bXSA9IFtdO1xuXG4gIEBPdXRwdXQoKSB2aWV3TW9kZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxTdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxTdHJpbmc+KCk7XG5cbiAgQE91dHB1dCgpIHNlc3Npb25DcmVhdGVkOiBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlc3Npb24+KCk7XG5cbiAgQE91dHB1dCgpIHNlc3Npb25SZW1vdmVkOiBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlc3Npb24+KCk7XG5cbiAgZGF5czogQXJyYXk8RGF5PiA9IFtdO1xuICByZWFsRHVyYXRpb246IG51bWJlcjtcbiAgZGF5c0F2YWlsYWJpbGl0eTogTWFwPHN0cmluZywgc3RyaW5nW10+O1xuXG4gIGRheXNCdXN5U2xvdE51bWJlcjogTWFwPHN0cmluZywgbnVtYmVyPjtcbiAgZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXI6IE1hcDxzdHJpbmcsIG51bWJlcj47XG4gIGJ1c3lTbG90czogU2V0PHN0cmluZz47XG4gIGVhcmx5U2xvdHM6IFNldDxzdHJpbmc+O1xuICBwYXVzZVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgc2Vzc2lvbnNTbG90czogU2V0PHN0cmluZz47XG4gIHNlc3Npb25zRW5kU2xvdHM6IFNldDxzdHJpbmc+O1xuICBzZXNzaW9uczogTWFwPHN0cmluZywgU2Vzc2lvbj47XG5cbiAgc3RhdGljIHNwbGl0UmFuZ2VUb05leHRUaW1lKHNsb3RUaW1lUmFuZ2U6IFR3aXhJdGVyLCBzbG90RHVyYXRpb246IG51bWJlcik6IHt0aW1lOiBUd2l4LCBtbXRUaW1lOiBNb21lbnR9IHtcbiAgICBjb25zdCB0aW1lOiBUd2l4ID0gc2xvdFRpbWVSYW5nZS5uZXh0KCk7XG4gICAgcmV0dXJuIHt0aW1lOiB0aW1lLCBtbXRUaW1lOiBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHNsb3REdXJhdGlvbil9O1xuICB9XG5cbiAgc3RhdGljIGdldE1pbnV0ZXNEaWZmZXJlbmNlKG1tdFRpbWU6IE1vbWVudCwgc2xvdER1cmF0aW9uOiBudW1iZXIpOiBNb21lbnQge1xuICAgIGlmIChtbXRUaW1lLm1pbnV0ZXMoKSAlIHNsb3REdXJhdGlvbiAhPT0gMCkge1xuICAgICAgbW10VGltZS5taW51dGVzKG1tdFRpbWUubWludXRlcygpIC0gKG1tdFRpbWUubWludXRlcygpICUgc2xvdER1cmF0aW9uKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1tdFRpbWU7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZXRDYWxlbmRhcigpO1xuICAgIHRoaXMuc2V0RGF0ZVJhbmdlKCk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgdmlld01vZGUodmlld01vZGUpIHtcbiAgICB0aGlzLl92aWV3TW9kZSA9IHZpZXdNb2RlO1xuICAgIHRoaXMuc2V0Vmlld01vZGUoKTtcbiAgfVxuXG4gIGdldCB2aWV3TW9kZSgpOiBTdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl92aWV3TW9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNwZWN0IGFsbCBjaGFuZ2VzXG4gICAqL1xuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnNldERhdGVSYW5nZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBEZWZhdWx0IHZhcmlhYmxlc1xuICAgKi9cbiAgc2V0Q2FsZW5kYXIoKSB7XG4gICAgdGhpcy5vbmxpbmVTZXNzaW9uID0ge1xuICAgICAga2V5OiAndGVzdDEnLFxuICAgICAgc2Vzc2lvbl90eXBlOiB7XG4gICAgICAgIG5hbWU6ICd0ZXN0MScsXG4gICAgICAgIG1heF9wZXJzb25zOiAxLFxuICAgICAgICBib29raW5nX2RlbGF5OiAxLFxuICAgICAgICBkdXJhdGlvbjogNjAsXG4gICAgICAgIHBhdXNlOiAwLFxuICAgICAgfSxcbiAgICAgIHByaWNlczogWzEwLCAyMF0sXG4gICAgICBkYXRlX3JhbmdlOiB7XG4gICAgICAgIHN0YXJ0OiAnMjAxOC0wMS0wMScsXG4gICAgICAgIGVuZDogJzIwMTktMTItMzEnLFxuICAgICAgfSxcbiAgICAgIHRpbWVfcmFuZ2U6IHtcbiAgICAgICAgc3RhcnQ6ICcwODowMCcsXG4gICAgICAgIGVuZDogJzE5OjAwJyxcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuc2Vzc2lvbnNTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLnNlc3Npb25zRW5kU2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5lYXJseVNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMucGF1c2VTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLnNlc3Npb25zID0gbmV3IE1hcCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBWaWV3IE1vZGUgd2l0aCB3ZWVrLCBkYXksIDMgZGF5c1xuICAgKiBJbml0IHN0YXJ0LCBlbmQsXG4gICAqXG4gICAqL1xuICBzZXRWaWV3TW9kZSgpIHtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ2RheScpIHtcbiAgICAgIHRoaXMuZW5kID0gdGhpcy5zdGFydDtcbiAgICAgIHRoaXMuY2FsZW5kYXJTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdGFydE9mKCdkYXknKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJFbmQgPSBtb21lbnQodGhpcy5lbmQpLmVuZE9mKCdkYXknKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudmlld01vZGUgPT09ICd0aHJlZV9kYXlzJykge1xuICAgICAgdGhpcy5lbmQgPSBtb21lbnQodGhpcy5zdGFydCkuYWRkKDIsICdkYXlzJyk7XG4gICAgICB0aGlzLmNhbGVuZGFyU3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuc3RhcnRPZignZGF5Jyk7XG4gICAgICB0aGlzLmNhbGVuZGFyRW5kID0gbW9tZW50KHRoaXMuZW5kKS5lbmRPZignZGF5Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIEluaXQgZmlyc3QgZGF5IHdlZWsgbnVtYmVyXG4gICAgY29uc3QgZmlyc3REYXkgPSAwO1xuICAgIC8vIElmIGVtcHR5IHN0YXJ0IGRhdGUgdGhlbiBzdGFydCB0byB0b2RheVxuICAgIGlmICghdGhpcy5zdGFydCkge1xuICAgICAgdGhpcy5zdGFydCA9IG1vbWVudCgpO1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLmRheShmaXJzdERheSk7XG4gICAgdGhpcy5lbmQgPSBtb21lbnQodGhpcy5zdGFydCkuYWRkKDYsICdkYXlzJyk7XG5cbiAgICB0aGlzLmNhbGVuZGFyU3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuc3RhcnRPZignZGF5Jyk7XG4gICAgdGhpcy5jYWxlbmRhckVuZCA9IG1vbWVudCh0aGlzLmVuZCkuZW5kT2YoJ2RheScpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHN0YXJ0L3ZpZXdNb2RlIGNoYW5nZWQsIGRvIGEgcmVjYWxjdWxhdGUgb2YgaW5pdCBzdGFydCwgZW5kXG4gICAqIGRheXMsIGRheXNBdmFpbGFiaWxpdHkgYW5kIHZpZXdNb2RlXG4gICAqL1xuICBzZXREYXRlUmFuZ2UoKSB7XG4gICAgdGhpcy5zZXRDYWxlbmRhcigpO1xuICAgIHRoaXMuc2V0Vmlld01vZGUoKTtcbiAgICAvLyB0aGlzLmJ1aWxkVHJ1ZUR1cmF0aW9uKCk7XG4gICAgdGhpcy5sb2FkRXZlbnRzKHRoaXMuc3RhcnQsIHRoaXMuZW5kKTtcbiAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgZGF0ZVJhbmdlOiBUd2l4SXRlciA9IHRoaXMuc3RhcnRcbiAgICAgIC50d2l4KHRoaXMuZW5kKVxuICAgICAgLml0ZXJhdGUoMSwgJ2RheXMnKTtcbiAgICB0aGlzLmRheXMgPSBbXTtcbiAgICAvLyBMb2FkaW5nIGFsbCBkYXlzXG4gICAgd2hpbGUgKGRhdGVSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IGRhdGU6IFR3aXggPSBkYXRlUmFuZ2UubmV4dCgpO1xuICAgICAgdGhpcy5kYXlzLnB1c2goe1xuICAgICAgICB0aXRsZTogZGF0ZS5mb3JtYXQoJ0REL01NL1lZWVknKSxcbiAgICAgICAga2V5OiBkYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgICB2YWx1ZTogbW9tZW50KGRhdGUudG9EYXRlKCkpXG4gICAgICB9KTtcbiAgICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5zZXQoZGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSwgW10pO1xuICAgIH1cbiAgICB0aGlzLmxvYWRBdmFpbGFiaWxpdGllcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHN3aXRjaCBkYXRlIHJhbmdlXG4gICAqL1xuICBvblN3aXRoZWRWaWV3KHZpZXdNb2RlOiBTdHJpbmcpIHtcbiAgICB0aGlzLnZpZXdNb2RlID0gdmlld01vZGU7XG4gICAgdGhpcy52aWV3TW9kZUNoYW5nZWQuZW1pdCh2aWV3TW9kZSk7XG4gICAgdGhpcy5zZXREYXRlUmFuZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBzdGFydCBjaGFuZ2UgZXZlbnRcbiAgICovXG4gIG9uU3RhcnRDaGFuZ2VkKHN0YXJ0OiBNb21lbnQpIHtcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5zZXREYXRlUmFuZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBzZXNzaW9uIGFkZGVkIG9uIGNsaWNrIGV2ZW50XG4gICAqL1xuICBvblNlc3Npb25BZGRlZChzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgdGhpcy5zZXNzaW9ucy5zZXQobW9tZW50KHNlc3Npb24uc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJyksIHNlc3Npb24pO1xuICAgIHRoaXMuYWRkU2Vzc2lvbihzZXNzaW9uKTtcbiAgICB0aGlzLnNlc3Npb25DcmVhdGVkLmVtaXQoc2Vzc2lvbik7XG4gIH1cblxuICAvKipcbiAgICogT24gcmVtb3ZlZCBldmVudFxuICAgKi9cbiAgb25TZXNzaW9uUmVtb3ZlZChzb3VyY2U6IHtrZXk6IHN0cmluZywgc2Vzc2lvbjogU2Vzc2lvbn0pIHtcbiAgICB0aGlzLnNlc3Npb25zLmRlbGV0ZShzb3VyY2Uua2V5KTtcbiAgICB0aGlzLnJlbW92ZVNlc3Npb24oc291cmNlLnNlc3Npb24pO1xuICAgIHRoaXMuc2Vzc2lvblJlbW92ZWQuZW1pdChzb3VyY2Uuc2Vzc2lvbik7XG4gIH1cblxuICAvKipcbiAgICogTG9hZCBhbGwgdGltZSBmb3IgZWFjaCBkYXlzXG4gICAqL1xuICBsb2FkQXZhaWxhYmlsaXRpZXMoKSB7XG4gICAgLy8gbm8gb25saW5lIHNlc3Npb24gbm8gY2FsZW5kYXJcbiAgICBpZiAoIXRoaXMuZGF5c0F2YWlsYWJpbGl0eSB8fCAhdGhpcy5vbmxpbmVTZXNzaW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHNlc3Npb24gZHVyYXRpb25cbiAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMub25saW5lU2Vzc2lvbi5zZXNzaW9uX3R5cGUuZHVyYXRpb247XG4gICAgLy8gc2Vzc2lvbiBkYXkgc3RhcnQgMDA6MDAgLSBlbmQgMjM6NTlcbiAgICBjb25zdCBvbmxpbmVTZXNzaW9uU3RhcnQ6IE1vbWVudCA9IG1vbWVudCh0aGlzLm9ubGluZVNlc3Npb24uZGF0ZV9yYW5nZS5zdGFydCwgJ1lZWVktTU0tREQnKS5zdGFydE9mKCdkYXknKTtcbiAgICBjb25zdCBvbmxpbmVTZXNzaW9uRW5kOiBNb21lbnQgPSBtb21lbnQodGhpcy5vbmxpbmVTZXNzaW9uLmRhdGVfcmFuZ2UuZW5kLCAnWVlZWS1NTS1ERCcpLmVuZE9mKCdkYXknKTtcbiAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5mb3JFYWNoKChhdmJzLCBkYXkpID0+IHtcbiAgICAgIGxldCBzbG90c051bWJlciA9IDA7XG4gICAgICAvLyBlYWNoIGRheSBvZiBkYXlzIGF2YWlsYWJpbGl0eSB3aXRoIHN0YXJ0IHRpbWUgMDg6MDBcbiAgICAgIGNvbnN0IG1tdERheSA9IG1vbWVudChkYXksICdZWVlZLU1NLUREJykuaG91cig4KTtcbiAgICAgIGNvbnN0IG1tdERheVN0YXJ0VGltZSA9IG1vbWVudChkYXkgKyB0aGlzLm9ubGluZVNlc3Npb24udGltZV9yYW5nZS5zdGFydCwgJ1lZWVktTU1EREhIOm1tJyk7XG5cbiAgICAgIC8vIElmIHNlc3Npb24gc3RhcnQgdGltZSBsaWtlIDA4OjAwIGlzIGJlZm9yZSBzdGFydCB0b2RheSAwMDowMFxuICAgICAgaWYgKG1tdERheVN0YXJ0VGltZS5pc0JlZm9yZShtb21lbnQoKS5zdGFydE9mKCdkYXknKSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gYm9va2luZyBkZWxheVxuICAgICAgY29uc3QgbWluTW10U3RhcnRUaW1lID0gbW9tZW50KCkuYWRkKHRoaXMub25saW5lU2Vzc2lvbi5zZXNzaW9uX3R5cGUuYm9va2luZ19kZWxheSwgJ2hvdXJzJyk7XG4gICAgICAvLyBzZXNzaW9uIHRpbWUgZW5kXG4gICAgICBjb25zdCBtbXREYXlFbmRUaW1lID0gbW9tZW50KGRheSArIHRoaXMub25saW5lU2Vzc2lvbi50aW1lX3JhbmdlLmVuZCwgJ1lZWVktTU0tRERISDptbScpO1xuICAgICAgbW10RGF5RW5kVGltZS5zdWJ0cmFjdChkdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICAgIC8vIHNsb3RzIGl0ZXJhdG9yXG4gICAgICBjb25zdCB0aW1lUmFuZ2U6IFR3aXhJdGVyID0gbW10RGF5U3RhcnRUaW1lLnR3aXgobW10RGF5RW5kVGltZSkuaXRlcmF0ZSh0aGlzLnNsb3REdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICAgIGlmICh0aGlzLmNhbGVuZGFyU3RhcnQgJiYgdGhpcy5jYWxlbmRhckVuZCAmJiBtbXREYXkuaXNCZXR3ZWVuKG9ubGluZVNlc3Npb25TdGFydCwgb25saW5lU2Vzc2lvbkVuZCkpIHtcbiAgICAgICAgd2hpbGUgKHRpbWVSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZVJhbmdlLm5leHQoKTtcbiAgICAgICAgICBjb25zdCB0aW1lTW10OiBNb21lbnQgPSBtb21lbnQodGltZS50b0RhdGUoKSk7XG4gICAgICAgICAgaWYgKCF0aW1lTW10LmlzQmVmb3JlKG1pbk1tdFN0YXJ0VGltZSkpIHtcbiAgICAgICAgICAgIGF2YnMucHVzaCh0aW1lLmZvcm1hdCgnSEg6bW0nKSk7XG4gICAgICAgICAgICBzbG90c051bWJlcisrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlci5zZXQoZGF5LCBzbG90c051bWJlcik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHNlc3Npb24gZXZlbnQgaW4gY2FsZW5kYXJcbiAgICovXG4gIGFkZFNlc3Npb24oc2Vzc2lvbjogU2Vzc2lvbikge1xuICAgIGNvbnN0IG1tdFN0YXJ0ID0gbW9tZW50KHNlc3Npb24uc3RhcnQpO1xuICAgIGNvbnN0IG1tdEVuZCA9IG1vbWVudChzZXNzaW9uLmVuZCk7XG4gICAgY29uc3QgdGltZUlubmVyUmFuZ2U6IFR3aXhJdGVyID0gbW10U3RhcnQudHdpeChtbXRFbmQpLml0ZXJhdGVJbm5lcih0aGlzLnNsb3REdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUlubmVyUmFuZ2UubmV4dCgpO1xuICAgICAgdGhpcy5zZXNzaW9uc1Nsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgaWYgKCF0aW1lSW5uZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBidWlsZGluZyBlYXJsaWVzdCBzbG90IGJlZm9yZSBldmVudCAqL1xuICAgIGNvbnN0IG1tdEVhcmx5U3RhcnQgPSBtbXRTdGFydC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIG1tdEVhcmx5U3RhcnQubWludXRlcyhtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAtIChtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAlIHRoaXMuc2xvdER1cmF0aW9uKSArIHRoaXMuc2xvdER1cmF0aW9uKTtcbiAgICBjb25zdCB0aW1lRWFybGllclJhbmdlOiBUd2l4SXRlciA9IG1tdEVhcmx5U3RhcnQudHdpeChtbXRTdGFydCkuaXRlcmF0ZSh0aGlzLnNsb3REdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUVhcmxpZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lRWFybGllclJhbmdlLm5leHQoKTtcbiAgICAgIGNvbnN0IG1tdFRpbWU6IE1vbWVudCA9IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgdGhpcy5zbG90RHVyYXRpb24pO1xuICAgICAgaWYgKG1tdFRpbWUuaXNTYW1lT3JBZnRlcihtbXRFYXJseVN0YXJ0KSAmJiBtbXRUaW1lLmlzQmVmb3JlKG1tdFN0YXJ0KSkge1xuICAgICAgICB0aGlzLmVhcmx5U2xvdHMuYWRkKG1tdFRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIGJ1aWxkaW5nIHBhdXNlIHNsb3RzIGFmdGVyIGV2ZW50ICovXG4gICAgY29uc3QgbW10RWFybHlFbmQgPSBtbXRFbmQuY2xvbmUoKTtcbiAgICBtbXRFYXJseUVuZC5zdWJ0cmFjdChtbXRFYXJseUVuZC5taW51dGVzKCkgJSB0aGlzLnNsb3REdXJhdGlvbik7XG4gICAgY29uc3QgbW10UGF1c2VFbmQgPSBtbXRFYXJseUVuZC5jbG9uZSgpLmFkZCh0aGlzLm9ubGluZVNlc3Npb24uc2Vzc2lvbl90eXBlLnBhdXNlLCAnbWludXRlcycpO1xuICAgIGNvbnN0IHRpbWVQYXVzZVJhbmdlOiBUd2l4SXRlciA9IG1tdEVhcmx5RW5kLnR3aXgobW10UGF1c2VFbmQpLml0ZXJhdGUodGhpcy5zbG90RHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVQYXVzZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVQYXVzZVJhbmdlLm5leHQoKTtcbiAgICAgIGNvbnN0IG1tdFRpbWU6IE1vbWVudCA9IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgdGhpcy5zbG90RHVyYXRpb24pO1xuICAgICAgaWYgKG1tdFRpbWUuaXNTYW1lT3JBZnRlcihtbXRFYXJseUVuZCkgJiYgbW10VGltZS5pc0JlZm9yZShtbXRQYXVzZUVuZCkpIHtcbiAgICAgICAgdGhpcy5wYXVzZVNsb3RzLmFkZChtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgc2Vzc2lvbiBldmVudCBpbiBDYWxlbmRhclxuICAgKi9cbiAgcmVtb3ZlU2Vzc2lvbihzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgY29uc3QgbW10U3RhcnQgPSBtb21lbnQoc2Vzc2lvbi5zdGFydCk7XG4gICAgY29uc3QgbW10RW5kID0gbW9tZW50KHNlc3Npb24uZW5kKTtcbiAgICBjb25zdCB0aW1lSW5uZXJSYW5nZTogVHdpeEl0ZXIgPSBtbXRTdGFydC50d2l4KG1tdEVuZCkuaXRlcmF0ZSh0aGlzLnNsb3REdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUlubmVyUmFuZ2UubmV4dCgpO1xuICAgICAgdGhpcy5zZXNzaW9uc1Nsb3RzLmRlbGV0ZSh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgaWYgKCF0aW1lSW5uZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmRlbGV0ZSh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiByZW1vdmluZyBlYXJseSBzbG90cyAqL1xuICAgIGNvbnN0IG1tdEVhcmx5U3RhcnQgPSBtbXRTdGFydC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIG1tdEVhcmx5U3RhcnQubWludXRlcyhtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAtIChtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAlIHRoaXMuc2xvdER1cmF0aW9uKSArIHRoaXMuc2xvdER1cmF0aW9uKTtcbiAgICBjb25zdCB0aW1lRWFybHlSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseVN0YXJ0LnR3aXgobW10U3RhcnQpLml0ZXJhdGUodGhpcy5zbG90RHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVFYXJseVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVFYXJseVJhbmdlLm5leHQoKTtcbiAgICAgIGNvbnN0IG1tdFRpbWU6IE1vbWVudCA9IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgdGhpcy5zbG90RHVyYXRpb24pO1xuICAgICAgaWYgKG1tdFRpbWUuaXNTYW1lT3JBZnRlcihtbXRFYXJseVN0YXJ0KSAmJiBtbXRUaW1lLmlzQmVmb3JlKG1tdFN0YXJ0KSkge1xuICAgICAgICB0aGlzLmVhcmx5U2xvdHMuZGVsZXRlKG1tdFRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIHJlbW92aW5nIHBhdXNlIHNsb3RzICovXG4gICAgaWYgKHNlc3Npb24ucGF1c2UpIHtcbiAgICAgIGNvbnN0IG1tdEVhcmx5RW5kID0gbW10RW5kLmNsb25lKCk7XG4gICAgICBtbXRFYXJseUVuZC5zdWJ0cmFjdChtbXRFYXJseUVuZC5taW51dGVzKCkgJSB0aGlzLnNsb3REdXJhdGlvbik7XG4gICAgICBjb25zdCBtbXRQYXVzZUVuZCA9IG1tdEVhcmx5RW5kLmNsb25lKCkuYWRkKHNlc3Npb24ucGF1c2UsICdtaW51dGVzJyk7XG4gICAgICBjb25zdCB0aW1lUGF1c2VSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseUVuZC50d2l4KG1tdFBhdXNlRW5kKS5pdGVyYXRlKHRoaXMuc2xvdER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgd2hpbGUgKHRpbWVQYXVzZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZVBhdXNlUmFuZ2UubmV4dCgpO1xuICAgICAgICBjb25zdCBtbXRUaW1lOiBNb21lbnQgPSBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHRoaXMuc2xvdER1cmF0aW9uKTtcbiAgICAgICAgaWYgKG1tdFRpbWUuaXNTYW1lT3JBZnRlcihtbXRFYXJseUVuZCkgJiYgbW10VGltZS5pc0JlZm9yZShtbXRQYXVzZUVuZCkpIHtcbiAgICAgICAgICB0aGlzLnBhdXNlU2xvdHMuZGVsZXRlKG1tdFRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqKioqKioqKioqKioqKioqKioqIERhdGUgZnVuY3Rpb25zICoqKioqKioqKioqKioqXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIGxvYWRFdmVudHMoc3RhcnQ6IE1vbWVudCwgZW5kOiBNb21lbnQpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnNlc3Npb25zRW50cmllcykpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbnNFbnRyaWVzID0gWy4uLnRoaXMuc2Vzc2lvbnNFbnRyaWVzLmZpbHRlcigoZXZlbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIGV2ZW50ICYmIGV2ZW50LnN0YXJ0ID49IHN0YXJ0LnRvRGF0ZSgpICYmIGV2ZW50LmVuZCA8PSBlbmQudG9EYXRlKCk7XG4gICAgICB9KV07XG4gICAgfVxuICAgIHRoaXMuYnVzeVNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyID0gbmV3IE1hcCgpO1xuXG4gICAgdGhpcy5zZXNzaW9uc0VudHJpZXMuZm9yRWFjaCgoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICBsZXQgbW10RXZlbnRTdGFydCA9IG1vbWVudChldmVudC5zdGFydCwgJ1lZWVktTU0tRERISDptbScpO1xuICAgICAgbW10RXZlbnRTdGFydCA9IHRoaXMuYnVpbGRpbkJ1c3lTbG90KG1tdEV2ZW50U3RhcnQsIGV2ZW50KTtcbiAgICAgIHRoaXMuYnVpbGRpbmdFYXJsaWVzdFNsb3QobW10RXZlbnRTdGFydCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgYnVpbGRpbkJ1c3lTbG90KG1tdEV2ZW50U3RhcnQ6IE1vbWVudCwgZXZlbnQ6IEV2ZW50KTogTW9tZW50IHtcbiAgICBjb25zdCBtbXRFdmVudEVuZCA9IG1vbWVudChldmVudC5lbmQsICdZWVlZLU1NLURESEg6bW0nKTtcbiAgICBpZiAoIW1tdEV2ZW50U3RhcnQgfHwgIW1tdEV2ZW50U3RhcnQuaXNWYWxpZCgpXG4gICAgICB8fCAhbW10RXZlbnRFbmQgfHwgIW1tdEV2ZW50RW5kLmlzVmFsaWQoKVxuICAgICAgfHwgIW1tdEV2ZW50U3RhcnQuaXNCZWZvcmUobW10RXZlbnRFbmQpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdpbnZhbGlkIGRhdGVzJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyogYnVpbGRpbmcgYnVzeSBzbG90cyBieSBldmVudHMqL1xuICAgIGNvbnN0IGV2ZW50c1RpbWVSYW5nZTogVHdpeEl0ZXIgPSBtbXRFdmVudFN0YXJ0LnR3aXgobW10RXZlbnRFbmQpLml0ZXJhdGUodGhpcy5zbG90RHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKGV2ZW50c1RpbWVSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHt0aW1lLCBtbXRUaW1lfSA9IENhbGVuZGFyQ29tcG9uZW50LnNwbGl0UmFuZ2VUb05leHRUaW1lKGV2ZW50c1RpbWVSYW5nZSwgdGhpcy5zbG90RHVyYXRpb24pO1xuICAgICAgLyogSUYgdGhlIGJ1c3kgc2xvdCBpcyBpbiBhdmFpbGFiaWxpdHkgYW5kIG5vdCBhbHJlYWR5IGluIGJ1c3lTbG9pdHMgd2UgY291bnQgaXQgKi9cbiAgICAgIGlmICh0aGlzLmRheXNBdmFpbGFiaWxpdHkgJiYgdGhpcy5kYXlzQXZhaWxhYmlsaXR5Lmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKVxuICAgICAgICAmJiAhdGhpcy5idXN5U2xvdHMuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSlcbiAgICAgICAgJiYgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmdldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKS5pbmRleE9mKHRpbWUuZm9ybWF0KCdISDptbScpKSA+PSAwKSB7XG4gICAgICAgIGxldCBkYXlCdXN5TnVtYmVyID0gdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpID9cbiAgICAgICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgOiAwO1xuICAgICAgICBkYXlCdXN5TnVtYmVyKys7XG4gICAgICAgIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLnNldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpLCBkYXlCdXN5TnVtYmVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYnVzeVNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgIH1cblxuICAgIHJldHVybiBtbXRFdmVudFN0YXJ0O1xuICB9XG5cbiAgYnVpbGRpbmdFYXJsaWVzdFNsb3QobW10RXZlbnRTdGFydDogTW9tZW50KSB7XG4gICAgLyogYnVpbGRpbmcgZWFybGllc3Qgc2xvdCBiZWZvcmUgZXZlbnQgKi9cbiAgICBjb25zdCBtbXRFYXJseVN0YXJ0ID0gbW10RXZlbnRTdGFydC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIG1tdEVhcmx5U3RhcnQubWludXRlcyhtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAtXG4gICAgICAobW10RWFybHlTdGFydC5taW51dGVzKCkgJSB0aGlzLnNsb3REdXJhdGlvbikgKyB0aGlzLnNsb3REdXJhdGlvbik7XG4gICAgY29uc3QgZWFybGllc3RUaW1lUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlTdGFydC50d2l4KG1tdEV2ZW50U3RhcnQpLml0ZXJhdGUodGhpcy5zbG90RHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKGVhcmxpZXN0VGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3Qge3RpbWUsIG1tdFRpbWV9ID0gQ2FsZW5kYXJDb21wb25lbnQuc3BsaXRSYW5nZVRvTmV4dFRpbWUoZWFybGllc3RUaW1lUmFuZ2UsIHRoaXMuc2xvdER1cmF0aW9uKTtcbiAgICAgIC8qIElGIHRoZSBidXN5IHNsb3QgaXMgaW4gYXZhaWxhYmlsaXR5IGFuZCBub3QgYWxyZWFkeSBpbiBidXN5U2xvaXRzIHdlIGNvdW50IGl0ICovXG4gICAgICBpZiAodGhpcy5kYXlzQXZhaWxhYmlsaXR5ICYmIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSlcbiAgICAgICAgJiYgIXRoaXMuYnVzeVNsb3RzLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpXG4gICAgICAgICYmIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkuaW5kZXhPZih0aW1lLmZvcm1hdCgnSEg6bW0nKSkgPj0gMCkge1xuICAgICAgICBsZXQgZGF5QnVzeU51bWJlciA9IHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSA/XG4gICAgICAgICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuZ2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpIDogMDtcbiAgICAgICAgZGF5QnVzeU51bWJlcisrO1xuICAgICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5zZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSwgZGF5QnVzeU51bWJlcik7XG4gICAgICB9XG4gICAgICB0aGlzLmJ1c3lTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==