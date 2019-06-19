var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import * as moment_ from 'moment';
import 'twix';
/** @type {?} */
var moment = moment_;
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(cd) {
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
    CalendarComponent.splitRangeToNextTime = /**
     * @param {?} slotTimeRange
     * @param {?} slotDuration
     * @return {?}
     */
    function (slotTimeRange, slotDuration) {
        /** @type {?} */
        var time = slotTimeRange.next();
        return { time: time, mmtTime: CalendarComponent.getMinutesDifference(moment(time.toDate()), slotDuration) };
    };
    /**
     * @param {?} mmtTime
     * @param {?} slotDuration
     * @return {?}
     */
    CalendarComponent.getMinutesDifference = /**
     * @param {?} mmtTime
     * @param {?} slotDuration
     * @return {?}
     */
    function (mmtTime, slotDuration) {
        if (mmtTime.minutes() % slotDuration !== 0) {
            mmtTime.minutes(mmtTime.minutes() - (mmtTime.minutes() % slotDuration));
        }
        return mmtTime;
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setCalendar();
        this.setDateRange();
    };
    Object.defineProperty(CalendarComponent.prototype, "viewMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._viewMode;
        },
        set: /**
         * @param {?} viewMode
         * @return {?}
         */
        function (viewMode) {
            this._viewMode = viewMode;
            this.setViewMode();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Inspect all changes
     */
    /**
     * Inspect all changes
     * @return {?}
     */
    CalendarComponent.prototype.ngOnChanges = /**
     * Inspect all changes
     * @return {?}
     */
    function () {
        this.setDateRange();
    };
    /**
     * Set Default variables
     */
    /**
     * Set Default variables
     * @return {?}
     */
    CalendarComponent.prototype.setCalendar = /**
     * Set Default variables
     * @return {?}
     */
    function () {
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
    };
    /**
     * Set View Mode with week, day, 3 days
     * Init start, end,
     *
     */
    /**
     * Set View Mode with week, day, 3 days
     * Init start, end,
     *
     * @return {?}
     */
    CalendarComponent.prototype.setViewMode = /**
     * Set View Mode with week, day, 3 days
     * Init start, end,
     *
     * @return {?}
     */
    function () {
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
        var firstDay = 0;
        // If empty start date then start to today
        if (!this.start) {
            this.start = moment();
        }
        this.start = moment(this.start).day(firstDay);
        this.end = moment(this.start).add(6, 'days');
        this.calendarStart = moment(this.start).startOf('day');
        this.calendarEnd = moment(this.end).endOf('day');
    };
    /**
     * On start/viewMode changed, do a recalculate of init start, end
     * days, daysAvailability and viewMode
     */
    /**
     * On start/viewMode changed, do a recalculate of init start, end
     * days, daysAvailability and viewMode
     * @return {?}
     */
    CalendarComponent.prototype.setDateRange = /**
     * On start/viewMode changed, do a recalculate of init start, end
     * days, daysAvailability and viewMode
     * @return {?}
     */
    function () {
        this.setCalendar();
        this.setViewMode();
        // this.buildTrueDuration();
        this.loadEvents(this.start, this.end);
        this.daysAvailability = new Map();
        /** @type {?} */
        var dateRange = this.start
            .twix(this.end)
            .iterate(1, 'days');
        this.days = [];
        // Loading all days
        while (dateRange.hasNext()) {
            /** @type {?} */
            var date = dateRange.next();
            this.days.push({
                title: date.format('DD/MM/YYYY'),
                key: date.format('YYYY-MM-DD'),
                value: moment(date.toDate())
            });
            this.daysAvailability.set(date.format('YYYY-MM-DD'), []);
        }
        this.loadAvailabilities();
    };
    /**
     * On switch date range
     */
    /**
     * On switch date range
     * @param {?} viewMode
     * @return {?}
     */
    CalendarComponent.prototype.onSwithedView = /**
     * On switch date range
     * @param {?} viewMode
     * @return {?}
     */
    function (viewMode) {
        this.viewMode = viewMode;
        this.viewModeChanged.emit(viewMode);
        this.setDateRange();
    };
    /**
     * On start change event
     */
    /**
     * On start change event
     * @param {?} start
     * @return {?}
     */
    CalendarComponent.prototype.onStartChanged = /**
     * On start change event
     * @param {?} start
     * @return {?}
     */
    function (start) {
        this.start = start;
        this.setDateRange();
    };
    /**
     * On session added on click event
     */
    /**
     * On session added on click event
     * @param {?} session
     * @return {?}
     */
    CalendarComponent.prototype.onSessionAdded = /**
     * On session added on click event
     * @param {?} session
     * @return {?}
     */
    function (session) {
        this.sessions.set(moment(session.start).format('YYYY-MM-DDHH:mm'), session);
        this.addSession(session);
        this.sessionCreated.emit(session);
    };
    /**
     * On removed event
     */
    /**
     * On removed event
     * @param {?} source
     * @return {?}
     */
    CalendarComponent.prototype.onSessionRemoved = /**
     * On removed event
     * @param {?} source
     * @return {?}
     */
    function (source) {
        this.sessions.delete(source.key);
        this.removeSession(source.session);
        this.sessionRemoved.emit(source.session);
    };
    /**
     * Load all time for each days
     */
    /**
     * Load all time for each days
     * @return {?}
     */
    CalendarComponent.prototype.loadAvailabilities = /**
     * Load all time for each days
     * @return {?}
     */
    function () {
        var _this = this;
        // no online session no calendar
        if (!this.daysAvailability || !this.onlineSession) {
            return;
        }
        // session duration
        /** @type {?} */
        var duration = this.onlineSession.session_type.duration;
        // session day start 00:00 - end 23:59
        /** @type {?} */
        var onlineSessionStart = moment(this.onlineSession.date_range.start, 'YYYY-MM-DD').startOf('day');
        /** @type {?} */
        var onlineSessionEnd = moment(this.onlineSession.date_range.end, 'YYYY-MM-DD').endOf('day');
        this.daysAvailabilitySlotNumber = new Map();
        this.daysAvailability.forEach((/**
         * @param {?} avbs
         * @param {?} day
         * @return {?}
         */
        function (avbs, day) {
            /** @type {?} */
            var slotsNumber = 0;
            // each day of days availability with start time 08:00
            /** @type {?} */
            var mmtDay = moment(day, 'YYYY-MM-DD').hour(8);
            /** @type {?} */
            var mmtDayStartTime = moment(day + _this.onlineSession.time_range.start, 'YYYY-MMDDHH:mm');
            // If session start time like 08:00 is before start today 00:00
            if (mmtDayStartTime.isBefore(moment().startOf('day'))) {
                return;
            }
            // booking delay
            /** @type {?} */
            var minMmtStartTime = moment().add(_this.onlineSession.session_type.booking_delay, 'hours');
            // session time end
            /** @type {?} */
            var mmtDayEndTime = moment(day + _this.onlineSession.time_range.end, 'YYYY-MM-DDHH:mm');
            mmtDayEndTime.subtract(duration, 'minutes');
            // slots iterator
            /** @type {?} */
            var timeRange = mmtDayStartTime.twix(mmtDayEndTime).iterate(_this.slotDuration, 'minutes');
            if (_this.calendarStart && _this.calendarEnd && mmtDay.isBetween(onlineSessionStart, onlineSessionEnd)) {
                while (timeRange.hasNext()) {
                    /** @type {?} */
                    var time = timeRange.next();
                    /** @type {?} */
                    var timeMmt = moment(time.toDate());
                    if (!timeMmt.isBefore(minMmtStartTime)) {
                        avbs.push(time.format('HH:mm'));
                        slotsNumber++;
                    }
                }
            }
            _this.daysAvailabilitySlotNumber.set(day, slotsNumber);
        }));
    };
    /**
     * Add session event in calendar
     */
    /**
     * Add session event in calendar
     * @param {?} session
     * @return {?}
     */
    CalendarComponent.prototype.addSession = /**
     * Add session event in calendar
     * @param {?} session
     * @return {?}
     */
    function (session) {
        /** @type {?} */
        var mmtStart = moment(session.start);
        /** @type {?} */
        var mmtEnd = moment(session.end);
        /** @type {?} */
        var timeInnerRange = mmtStart.twix(mmtEnd).iterateInner(this.slotDuration, 'minutes');
        while (timeInnerRange.hasNext()) {
            /** @type {?} */
            var time = timeInnerRange.next();
            this.sessionsSlots.add(time.format('YYYY-MM-DDHH:mm'));
            if (!timeInnerRange.hasNext()) {
                this.sessionsEndSlots.add(time.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* building earliest slot before event */
        /** @type {?} */
        var mmtEarlyStart = mmtStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() - (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
        /** @type {?} */
        var timeEarlierRange = mmtEarlyStart.twix(mmtStart).iterate(this.slotDuration, 'minutes');
        while (timeEarlierRange.hasNext()) {
            /** @type {?} */
            var time = timeEarlierRange.next();
            /** @type {?} */
            var mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), this.slotDuration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                this.earlySlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* building pause slots after event */
        /** @type {?} */
        var mmtEarlyEnd = mmtEnd.clone();
        mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % this.slotDuration);
        /** @type {?} */
        var mmtPauseEnd = mmtEarlyEnd.clone().add(this.onlineSession.session_type.pause, 'minutes');
        /** @type {?} */
        var timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(this.slotDuration, 'minutes');
        while (timePauseRange.hasNext()) {
            /** @type {?} */
            var time = timePauseRange.next();
            /** @type {?} */
            var mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), this.slotDuration);
            if (mmtTime.isSameOrAfter(mmtEarlyEnd) && mmtTime.isBefore(mmtPauseEnd)) {
                this.pauseSlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
    };
    /**
     * Remove session event in Calendar
     */
    /**
     * Remove session event in Calendar
     * @param {?} session
     * @return {?}
     */
    CalendarComponent.prototype.removeSession = /**
     * Remove session event in Calendar
     * @param {?} session
     * @return {?}
     */
    function (session) {
        /** @type {?} */
        var mmtStart = moment(session.start);
        /** @type {?} */
        var mmtEnd = moment(session.end);
        /** @type {?} */
        var timeInnerRange = mmtStart.twix(mmtEnd).iterate(this.slotDuration, 'minutes');
        while (timeInnerRange.hasNext()) {
            /** @type {?} */
            var time = timeInnerRange.next();
            this.sessionsSlots.delete(time.format('YYYY-MM-DDHH:mm'));
            if (!timeInnerRange.hasNext()) {
                this.sessionsEndSlots.delete(time.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* removing early slots */
        /** @type {?} */
        var mmtEarlyStart = mmtStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() - (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
        /** @type {?} */
        var timeEarlyRange = mmtEarlyStart.twix(mmtStart).iterate(this.slotDuration, 'minutes');
        while (timeEarlyRange.hasNext()) {
            /** @type {?} */
            var time = timeEarlyRange.next();
            /** @type {?} */
            var mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), this.slotDuration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                this.earlySlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* removing pause slots */
        if (session.pause) {
            /** @type {?} */
            var mmtEarlyEnd = mmtEnd.clone();
            mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % this.slotDuration);
            /** @type {?} */
            var mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
            /** @type {?} */
            var timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(this.slotDuration, 'minutes');
            while (timePauseRange.hasNext()) {
                /** @type {?} */
                var time = timePauseRange.next();
                /** @type {?} */
                var mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), this.slotDuration);
                if (mmtTime.isSameOrAfter(mmtEarlyEnd) && mmtTime.isBefore(mmtPauseEnd)) {
                    this.pauseSlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
                }
            }
        }
    };
    /************************************************
     ******************* Date functions **************
     *************************************************/
    /**
     * *********************************************
     * ****************** Date functions **************
     * ***********************************************
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    CalendarComponent.prototype.loadEvents = /**
     * *********************************************
     * ****************** Date functions **************
     * ***********************************************
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    function (start, end) {
        var _this = this;
        if (Array.isArray(this.sessionsEntries)) {
            this.sessionsEntries = __spread(this.sessionsEntries.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                return event && event.start >= start.toDate() && event.end <= end.toDate();
            })));
        }
        this.busySlots = new Set();
        this.daysBusySlotNumber = new Map();
        this.sessionsEntries.forEach((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var mmtEventStart = moment(event.start, 'YYYY-MM-DDHH:mm');
            mmtEventStart = _this.buildinBusySlot(mmtEventStart, event);
            _this.buildingEarliestSlot(mmtEventStart);
        }));
        this.cd.markForCheck();
    };
    /**
     * @param {?} mmtEventStart
     * @param {?} event
     * @return {?}
     */
    CalendarComponent.prototype.buildinBusySlot = /**
     * @param {?} mmtEventStart
     * @param {?} event
     * @return {?}
     */
    function (mmtEventStart, event) {
        /** @type {?} */
        var mmtEventEnd = moment(event.end, 'YYYY-MM-DDHH:mm');
        if (!mmtEventStart || !mmtEventStart.isValid()
            || !mmtEventEnd || !mmtEventEnd.isValid()
            || !mmtEventStart.isBefore(mmtEventEnd)) {
            console.error('invalid dates');
            return null;
        }
        /* building busy slots by events*/
        /** @type {?} */
        var eventsTimeRange = mmtEventStart.twix(mmtEventEnd).iterate(this.slotDuration, 'minutes');
        while (eventsTimeRange.hasNext()) {
            var _a = CalendarComponent.splitRangeToNextTime(eventsTimeRange, this.slotDuration), time = _a.time, mmtTime = _a.mmtTime;
            /* IF the busy slot is in availability and not already in busySloits we count it */
            if (this.daysAvailability && this.daysAvailability.has(time.format('YYYY-MM-DD'))
                && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
                && this.daysAvailability.get(time.format('YYYY-MM-DD')).indexOf(time.format('HH:mm')) >= 0) {
                /** @type {?} */
                var dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
                    this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
                dayBusyNumber++;
                this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
            }
            this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
        }
        return mmtEventStart;
    };
    /**
     * @param {?} mmtEventStart
     * @return {?}
     */
    CalendarComponent.prototype.buildingEarliestSlot = /**
     * @param {?} mmtEventStart
     * @return {?}
     */
    function (mmtEventStart) {
        /* building earliest slot before event */
        /** @type {?} */
        var mmtEarlyStart = mmtEventStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
        /** @type {?} */
        var earliestTimeRange = mmtEarlyStart.twix(mmtEventStart).iterate(this.slotDuration, 'minutes');
        while (earliestTimeRange.hasNext()) {
            var _a = CalendarComponent.splitRangeToNextTime(earliestTimeRange, this.slotDuration), time = _a.time, mmtTime = _a.mmtTime;
            /* IF the busy slot is in availability and not already in busySloits we count it */
            if (this.daysAvailability && this.daysAvailability.has(time.format('YYYY-MM-DD'))
                && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
                && this.daysAvailability.get(time.format('YYYY-MM-DD')).indexOf(time.format('HH:mm')) >= 0) {
                /** @type {?} */
                var dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
                    this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
                dayBusyNumber++;
                this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
            }
            this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
        }
    };
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
    CalendarComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
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
    return CalendarComponent;
}());
export { CalendarComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUdsQyxPQUFPLE1BQU0sQ0FBQzs7SUFPUixNQUFNLEdBQUcsT0FBTztBQUV0QjtJQThGRSwyQkFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7O1FBckZ6QyxjQUFTLEdBQVcsTUFBTSxDQUFDOzs7O1FBTWxCLFVBQUssR0FBVyxNQUFNLEVBQUUsQ0FBQzs7OztRQUl6QixRQUFHLEdBQVcsTUFBTSxFQUFFLENBQUM7Ozs7UUFJdkIsaUJBQVksR0FBRyxFQUFFLENBQUM7Ozs7UUFLbEIsMEJBQXFCLEdBQTBCO1lBQ3RELFFBQVEsRUFBRTtnQkFDUixHQUFHLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCO2dCQUNELEtBQUssRUFBRSxjQUFjO2dCQUNyQixVQUFVLEVBQUUsbUNBQW1DO2dCQUMvQyxHQUFHLEVBQUUsTUFBTTtnQkFDWCxVQUFVLEVBQUUsU0FBUztnQkFDckIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLHdCQUF3QjtnQkFDL0IsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsWUFBWSxFQUFFO29CQUNaLEtBQUssRUFBRSxzQkFBc0I7b0JBQzdCLElBQUksRUFBRSx5QkFBeUI7aUJBQ2hDO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsb0JBQW9CO2lC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QUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3ZFO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7U0FDcEQ7SUFDSCxDQUFDOztnQkFqYkYsU0FBUyxTQUFDOztvQkFFVCxRQUFRLEVBQUUsY0FBYzs7b0JBRXhCLHlxREFBd0M7O2lCQUV6Qzs7OztnQkExQkMsaUJBQWlCOzs7Z0NBK0JoQixLQUFLO3dCQUlMLEtBQUs7c0JBSUwsS0FBSzsrQkFJTCxLQUFLO3dDQUtMLEtBQUs7a0NBZ0NMLEtBQUs7a0NBRUwsTUFBTTtpQ0FFTixNQUFNO2lDQUVOLE1BQU07MkJBb0NOLEtBQUs7O0lBNFVSLHdCQUFDO0NBQUEsQUFsYkQsSUFrYkM7U0EzYVksaUJBQWlCOzs7SUFFNUIsc0NBQTJCOztJQUUzQiwwQ0FBc0M7Ozs7O0lBSXRDLGtDQUFrQzs7Ozs7SUFJbEMsZ0NBQWdDOzs7OztJQUloQyx5Q0FBMkI7Ozs7O0lBSzNCLGtEQXFCRTs7Ozs7O0lBS0YsMENBQThCOzs7Ozs7SUFJOUIsd0NBQTRCOztJQUU1Qiw0Q0FBeUM7O0lBRXpDLDRDQUE2RTs7SUFFN0UsMkNBQThFOztJQUU5RSwyQ0FBOEU7O0lBRTlFLGlDQUFzQjs7SUFDdEIseUNBQXFCOztJQUNyQiw2Q0FBd0M7O0lBRXhDLCtDQUF3Qzs7SUFDeEMsdURBQWdEOztJQUNoRCxzQ0FBdUI7O0lBQ3ZCLHVDQUF3Qjs7SUFDeEIsdUNBQXdCOztJQUN4QiwwQ0FBMkI7O0lBQzNCLDZDQUE4Qjs7SUFDOUIscUNBQStCOzs7OztJQWVuQiwrQkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBUd2l4LCBUd2l4SXRlciB9IGZyb20gJ3R3aXgnO1xuaW1wb3J0ICd0d2l4JztcbmltcG9ydCB7IENhbGVuZGFyQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL3NoYXJlZC9jb25maWd1cmF0aW9uL2NhbGVuZGFyLWNvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgRGF5IH0gZnJvbSAnLi4vc2hhcmVkL2RheS9kYXknO1xuaW1wb3J0IHsgT25saW5lU2Vzc2lvbiB9IGZyb20gJy4uL3NoYXJlZC9zZXNzaW9uL29ubGluZS1zZXNzaW9uJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi9zaGFyZWQvc2Vzc2lvbi9zZXNzaW9uJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi4vc2hhcmVkL2V2ZW50L2V2ZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlXG4gIHNlbGVjdG9yOiAnbmd4LWNhbGVuZGFyJyxcbiAgLy8gdHNsaW50OmVuYWJsZVxuICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvLyBEZWZhdWx0IFZpZXcgTW9kZSBvZiBXZWVrIENvbXBvbmVudFxuICBfdmlld01vZGU6IFN0cmluZyA9ICd3ZWVrJztcblxuICBASW5wdXQoKSBvbmxpbmVTZXNzaW9uOiBPbmxpbmVTZXNzaW9uO1xuICAvKipcbiAgICogU3RhcnQgZGF5IG9mIGNhbGVuZGFyIChjb3VsZCBiZSB1cGRhdGVkKVxuICAgKi9cbiAgQElucHV0KCkgc3RhcnQ6IE1vbWVudCA9IG1vbWVudCgpO1xuICAvKipcbiAgICogRW5kIGRheSBvZiBjYWxlbmRhciAoY291bGQgYmUgdXBkYXRlZCBidXQgcmVld3JpdGVuIG9uIHN3aXRjaCB3ZWVrIG1vZGVcbiAgICovXG4gIEBJbnB1dCgpIGVuZDogTW9tZW50ID0gbW9tZW50KCk7XG4gIC8qKlxuICAgKiBTbG90IHNlc3Npb24gZHVyYXRpb24gaW4gbWludXRlc1xuICAgKi9cbiAgQElucHV0KCkgc2xvdER1cmF0aW9uID0gNjA7XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyYXRpb24gY2FsZW5kYXJcbiAgICovXG4gIEBJbnB1dCgpIGNhbGVuZGFyQ29uZmlndXJhdGlvbjogQ2FsZW5kYXJDb25maWd1cmF0aW9uID0ge1xuICAgIGNhbGVuZGFyOiB7XG4gICAgICBjdGE6IHtcbiAgICAgICAgbmV4dDogJ3N1aXZhbnQnLFxuICAgICAgICBwcmV2aW91czogJ3Byw6ljw6lkZW50JyxcbiAgICAgIH0sXG4gICAgICB0b2RheTogJ2F1am91cmRcXCdodWknLFxuICAgICAgYmFja190b2RheTogJ3JldmVuaXIgw6AgbGEgZGF0ZSBkXFwnYXVqb3VyZFxcJ2h1aScsXG4gICAgICBkYXk6ICdqb3VyJyxcbiAgICAgIHRocmVlX2RheXM6ICczIGpvdXJzJyxcbiAgICAgIHdlZWs6ICdzZW1haW5lJyxcbiAgICAgIHRpdGxlOiAncsOpc2VydmVyIHZvdHJlIGNyw6luZWF1JyxcbiAgICAgIHN1YnRpdGxlOiAndG91dGVzIGxlcyBkaXNwb25pYmlsaXTDqXMnLFxuICAgICAgYXZhaWxhYmlsaXR5OiB7XG4gICAgICAgIGVtcHR5OiAnQXVjdW5lIGRpc3BvbmliaWxpdMOpJyxcbiAgICAgICAgc2xvdDogJ1Byb2NoYWluZSBkaXNwb25pYmlsaXTDqScsXG4gICAgICB9LFxuICAgICAgc2Vzc2lvbjoge1xuICAgICAgICBpbmZvOiAnQ3LDqW5lYXUgdsOpcnJvdWlsbMOpJ1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogY2FsZW5kYXIgc3RhcnQgZGF5IGFmdGVyIHNldCBmdWxsIGNhbGVuZGFyIGluZm9ybWF0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBjYWxlbmRhclN0YXJ0OiBNb21lbnQ7XG4gIC8qKlxuICAgKiBjYWxlbmRhciBlbmQgZGF5IGFmdGVyIHNldCBmdWxsIGNhbGVuZGFyIGluZm9ybWF0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBjYWxlbmRhckVuZDogTW9tZW50O1xuXG4gIEBJbnB1dCgpIHNlc3Npb25zRW50cmllczogU2Vzc2lvbltdID0gW107XG5cbiAgQE91dHB1dCgpIHZpZXdNb2RlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPFN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPFN0cmluZz4oKTtcblxuICBAT3V0cHV0KCkgc2Vzc2lvbkNyZWF0ZWQ6IEV2ZW50RW1pdHRlcjxTZXNzaW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4oKTtcblxuICBAT3V0cHV0KCkgc2Vzc2lvblJlbW92ZWQ6IEV2ZW50RW1pdHRlcjxTZXNzaW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4oKTtcblxuICBkYXlzOiBBcnJheTxEYXk+ID0gW107XG4gIHJlYWxEdXJhdGlvbjogbnVtYmVyO1xuICBkYXlzQXZhaWxhYmlsaXR5OiBNYXA8c3RyaW5nLCBzdHJpbmdbXT47XG5cbiAgZGF5c0J1c3lTbG90TnVtYmVyOiBNYXA8c3RyaW5nLCBudW1iZXI+O1xuICBkYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlcjogTWFwPHN0cmluZywgbnVtYmVyPjtcbiAgYnVzeVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgZWFybHlTbG90czogU2V0PHN0cmluZz47XG4gIHBhdXNlU2xvdHM6IFNldDxzdHJpbmc+O1xuICBzZXNzaW9uc1Nsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgc2Vzc2lvbnNFbmRTbG90czogU2V0PHN0cmluZz47XG4gIHNlc3Npb25zOiBNYXA8c3RyaW5nLCBTZXNzaW9uPjtcblxuICBzdGF0aWMgc3BsaXRSYW5nZVRvTmV4dFRpbWUoc2xvdFRpbWVSYW5nZTogVHdpeEl0ZXIsIHNsb3REdXJhdGlvbjogbnVtYmVyKToge3RpbWU6IFR3aXgsIG1tdFRpbWU6IE1vbWVudH0ge1xuICAgIGNvbnN0IHRpbWU6IFR3aXggPSBzbG90VGltZVJhbmdlLm5leHQoKTtcbiAgICByZXR1cm4ge3RpbWU6IHRpbWUsIG1tdFRpbWU6IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgc2xvdER1cmF0aW9uKX07XG4gIH1cblxuICBzdGF0aWMgZ2V0TWludXRlc0RpZmZlcmVuY2UobW10VGltZTogTW9tZW50LCBzbG90RHVyYXRpb246IG51bWJlcik6IE1vbWVudCB7XG4gICAgaWYgKG1tdFRpbWUubWludXRlcygpICUgc2xvdER1cmF0aW9uICE9PSAwKSB7XG4gICAgICBtbXRUaW1lLm1pbnV0ZXMobW10VGltZS5taW51dGVzKCkgLSAobW10VGltZS5taW51dGVzKCkgJSBzbG90RHVyYXRpb24pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW10VGltZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNldENhbGVuZGFyKCk7XG4gICAgdGhpcy5zZXREYXRlUmFuZ2UoKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB2aWV3TW9kZSh2aWV3TW9kZSkge1xuICAgIHRoaXMuX3ZpZXdNb2RlID0gdmlld01vZGU7XG4gICAgdGhpcy5zZXRWaWV3TW9kZSgpO1xuICB9XG5cbiAgZ2V0IHZpZXdNb2RlKCk6IFN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3BlY3QgYWxsIGNoYW5nZXNcbiAgICovXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuc2V0RGF0ZVJhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IERlZmF1bHQgdmFyaWFibGVzXG4gICAqL1xuICBzZXRDYWxlbmRhcigpIHtcbiAgICB0aGlzLm9ubGluZVNlc3Npb24gPSB7XG4gICAgICBrZXk6ICd0ZXN0MScsXG4gICAgICBzZXNzaW9uX3R5cGU6IHtcbiAgICAgICAgbmFtZTogJ3Rlc3QxJyxcbiAgICAgICAgbWF4X3BlcnNvbnM6IDEsXG4gICAgICAgIGJvb2tpbmdfZGVsYXk6IDEsXG4gICAgICAgIGR1cmF0aW9uOiA2MCxcbiAgICAgICAgcGF1c2U6IDAsXG4gICAgICB9LFxuICAgICAgcHJpY2VzOiBbMTAsIDIwXSxcbiAgICAgIGRhdGVfcmFuZ2U6IHtcbiAgICAgICAgc3RhcnQ6ICcyMDE4LTAxLTAxJyxcbiAgICAgICAgZW5kOiAnMjAxOS0xMi0zMScsXG4gICAgICB9LFxuICAgICAgdGltZV9yYW5nZToge1xuICAgICAgICBzdGFydDogJzA4OjAwJyxcbiAgICAgICAgZW5kOiAnMTk6MDAnLFxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5zZXNzaW9uc1Nsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLmVhcmx5U2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5wYXVzZVNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuc2Vzc2lvbnMgPSBuZXcgTWFwKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFZpZXcgTW9kZSB3aXRoIHdlZWssIGRheSwgMyBkYXlzXG4gICAqIEluaXQgc3RhcnQsIGVuZCxcbiAgICpcbiAgICovXG4gIHNldFZpZXdNb2RlKCkge1xuICAgIGlmICh0aGlzLnZpZXdNb2RlID09PSAnZGF5Jykge1xuICAgICAgdGhpcy5lbmQgPSB0aGlzLnN0YXJ0O1xuICAgICAgdGhpcy5jYWxlbmRhclN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLnN0YXJ0T2YoJ2RheScpO1xuICAgICAgdGhpcy5jYWxlbmRhckVuZCA9IG1vbWVudCh0aGlzLmVuZCkuZW5kT2YoJ2RheScpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3RocmVlX2RheXMnKSB7XG4gICAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoMiwgJ2RheXMnKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdGFydE9mKCdkYXknKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJFbmQgPSBtb21lbnQodGhpcy5lbmQpLmVuZE9mKCdkYXknKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gSW5pdCBmaXJzdCBkYXkgd2VlayBudW1iZXJcbiAgICBjb25zdCBmaXJzdERheSA9IDA7XG4gICAgLy8gSWYgZW1wdHkgc3RhcnQgZGF0ZSB0aGVuIHN0YXJ0IHRvIHRvZGF5XG4gICAgaWYgKCF0aGlzLnN0YXJ0KSB7XG4gICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KCk7XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuZGF5KGZpcnN0RGF5KTtcbiAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoNiwgJ2RheXMnKTtcblxuICAgIHRoaXMuY2FsZW5kYXJTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdGFydE9mKCdkYXknKTtcbiAgICB0aGlzLmNhbGVuZGFyRW5kID0gbW9tZW50KHRoaXMuZW5kKS5lbmRPZignZGF5Jyk7XG4gIH1cblxuICAvKipcbiAgICogT24gc3RhcnQvdmlld01vZGUgY2hhbmdlZCwgZG8gYSByZWNhbGN1bGF0ZSBvZiBpbml0IHN0YXJ0LCBlbmRcbiAgICogZGF5cywgZGF5c0F2YWlsYWJpbGl0eSBhbmQgdmlld01vZGVcbiAgICovXG4gIHNldERhdGVSYW5nZSgpIHtcbiAgICB0aGlzLnNldENhbGVuZGFyKCk7XG4gICAgdGhpcy5zZXRWaWV3TW9kZSgpO1xuICAgIC8vIHRoaXMuYnVpbGRUcnVlRHVyYXRpb24oKTtcbiAgICB0aGlzLmxvYWRFdmVudHModGhpcy5zdGFydCwgdGhpcy5lbmQpO1xuICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eSA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBkYXRlUmFuZ2U6IFR3aXhJdGVyID0gdGhpcy5zdGFydFxuICAgICAgLnR3aXgodGhpcy5lbmQpXG4gICAgICAuaXRlcmF0ZSgxLCAnZGF5cycpO1xuICAgIHRoaXMuZGF5cyA9IFtdO1xuICAgIC8vIExvYWRpbmcgYWxsIGRheXNcbiAgICB3aGlsZSAoZGF0ZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgZGF0ZTogVHdpeCA9IGRhdGVSYW5nZS5uZXh0KCk7XG4gICAgICB0aGlzLmRheXMucHVzaCh7XG4gICAgICAgIHRpdGxlOiBkYXRlLmZvcm1hdCgnREQvTU0vWVlZWScpLFxuICAgICAgICBrZXk6IGRhdGUuZm9ybWF0KCdZWVlZLU1NLUREJyksXG4gICAgICAgIHZhbHVlOiBtb21lbnQoZGF0ZS50b0RhdGUoKSlcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LnNldChkYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpLCBbXSk7XG4gICAgfVxuICAgIHRoaXMubG9hZEF2YWlsYWJpbGl0aWVzKCk7XG4gIH1cblxuICAvKipcbiAgICogT24gc3dpdGNoIGRhdGUgcmFuZ2VcbiAgICovXG4gIG9uU3dpdGhlZFZpZXcodmlld01vZGU6IFN0cmluZykge1xuICAgIHRoaXMudmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLnZpZXdNb2RlQ2hhbmdlZC5lbWl0KHZpZXdNb2RlKTtcbiAgICB0aGlzLnNldERhdGVSYW5nZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHN0YXJ0IGNoYW5nZSBldmVudFxuICAgKi9cbiAgb25TdGFydENoYW5nZWQoc3RhcnQ6IE1vbWVudCkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLnNldERhdGVSYW5nZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHNlc3Npb24gYWRkZWQgb24gY2xpY2sgZXZlbnRcbiAgICovXG4gIG9uU2Vzc2lvbkFkZGVkKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICB0aGlzLnNlc3Npb25zLnNldChtb21lbnQoc2Vzc2lvbi5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSwgc2Vzc2lvbik7XG4gICAgdGhpcy5hZGRTZXNzaW9uKHNlc3Npb24pO1xuICAgIHRoaXMuc2Vzc2lvbkNyZWF0ZWQuZW1pdChzZXNzaW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiByZW1vdmVkIGV2ZW50XG4gICAqL1xuICBvblNlc3Npb25SZW1vdmVkKHNvdXJjZToge2tleTogc3RyaW5nLCBzZXNzaW9uOiBTZXNzaW9ufSkge1xuICAgIHRoaXMuc2Vzc2lvbnMuZGVsZXRlKHNvdXJjZS5rZXkpO1xuICAgIHRoaXMucmVtb3ZlU2Vzc2lvbihzb3VyY2Uuc2Vzc2lvbik7XG4gICAgdGhpcy5zZXNzaW9uUmVtb3ZlZC5lbWl0KHNvdXJjZS5zZXNzaW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGFsbCB0aW1lIGZvciBlYWNoIGRheXNcbiAgICovXG4gIGxvYWRBdmFpbGFiaWxpdGllcygpIHtcbiAgICAvLyBubyBvbmxpbmUgc2Vzc2lvbiBubyBjYWxlbmRhclxuICAgIGlmICghdGhpcy5kYXlzQXZhaWxhYmlsaXR5IHx8ICF0aGlzLm9ubGluZVNlc3Npb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gc2Vzc2lvbiBkdXJhdGlvblxuICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5vbmxpbmVTZXNzaW9uLnNlc3Npb25fdHlwZS5kdXJhdGlvbjtcbiAgICAvLyBzZXNzaW9uIGRheSBzdGFydCAwMDowMCAtIGVuZCAyMzo1OVxuICAgIGNvbnN0IG9ubGluZVNlc3Npb25TdGFydDogTW9tZW50ID0gbW9tZW50KHRoaXMub25saW5lU2Vzc2lvbi5kYXRlX3JhbmdlLnN0YXJ0LCAnWVlZWS1NTS1ERCcpLnN0YXJ0T2YoJ2RheScpO1xuICAgIGNvbnN0IG9ubGluZVNlc3Npb25FbmQ6IE1vbWVudCA9IG1vbWVudCh0aGlzLm9ubGluZVNlc3Npb24uZGF0ZV9yYW5nZS5lbmQsICdZWVlZLU1NLUREJykuZW5kT2YoJ2RheScpO1xuICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXIgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmZvckVhY2goKGF2YnMsIGRheSkgPT4ge1xuICAgICAgbGV0IHNsb3RzTnVtYmVyID0gMDtcbiAgICAgIC8vIGVhY2ggZGF5IG9mIGRheXMgYXZhaWxhYmlsaXR5IHdpdGggc3RhcnQgdGltZSAwODowMFxuICAgICAgY29uc3QgbW10RGF5ID0gbW9tZW50KGRheSwgJ1lZWVktTU0tREQnKS5ob3VyKDgpO1xuICAgICAgY29uc3QgbW10RGF5U3RhcnRUaW1lID0gbW9tZW50KGRheSArIHRoaXMub25saW5lU2Vzc2lvbi50aW1lX3JhbmdlLnN0YXJ0LCAnWVlZWS1NTURESEg6bW0nKTtcblxuICAgICAgLy8gSWYgc2Vzc2lvbiBzdGFydCB0aW1lIGxpa2UgMDg6MDAgaXMgYmVmb3JlIHN0YXJ0IHRvZGF5IDAwOjAwXG4gICAgICBpZiAobW10RGF5U3RhcnRUaW1lLmlzQmVmb3JlKG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBib29raW5nIGRlbGF5XG4gICAgICBjb25zdCBtaW5NbXRTdGFydFRpbWUgPSBtb21lbnQoKS5hZGQodGhpcy5vbmxpbmVTZXNzaW9uLnNlc3Npb25fdHlwZS5ib29raW5nX2RlbGF5LCAnaG91cnMnKTtcbiAgICAgIC8vIHNlc3Npb24gdGltZSBlbmRcbiAgICAgIGNvbnN0IG1tdERheUVuZFRpbWUgPSBtb21lbnQoZGF5ICsgdGhpcy5vbmxpbmVTZXNzaW9uLnRpbWVfcmFuZ2UuZW5kLCAnWVlZWS1NTS1EREhIOm1tJyk7XG4gICAgICBtbXREYXlFbmRUaW1lLnN1YnRyYWN0KGR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgLy8gc2xvdHMgaXRlcmF0b3JcbiAgICAgIGNvbnN0IHRpbWVSYW5nZTogVHdpeEl0ZXIgPSBtbXREYXlTdGFydFRpbWUudHdpeChtbXREYXlFbmRUaW1lKS5pdGVyYXRlKHRoaXMuc2xvdER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgaWYgKHRoaXMuY2FsZW5kYXJTdGFydCAmJiB0aGlzLmNhbGVuZGFyRW5kICYmIG1tdERheS5pc0JldHdlZW4ob25saW5lU2Vzc2lvblN0YXJ0LCBvbmxpbmVTZXNzaW9uRW5kKSkge1xuICAgICAgICB3aGlsZSAodGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lUmFuZ2UubmV4dCgpO1xuICAgICAgICAgIGNvbnN0IHRpbWVNbXQ6IE1vbWVudCA9IG1vbWVudCh0aW1lLnRvRGF0ZSgpKTtcbiAgICAgICAgICBpZiAoIXRpbWVNbXQuaXNCZWZvcmUobWluTW10U3RhcnRUaW1lKSkge1xuICAgICAgICAgICAgYXZicy5wdXNoKHRpbWUuZm9ybWF0KCdISDptbScpKTtcbiAgICAgICAgICAgIHNsb3RzTnVtYmVyKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyLnNldChkYXksIHNsb3RzTnVtYmVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc2Vzc2lvbiBldmVudCBpbiBjYWxlbmRhclxuICAgKi9cbiAgYWRkU2Vzc2lvbihzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgY29uc3QgbW10U3RhcnQgPSBtb21lbnQoc2Vzc2lvbi5zdGFydCk7XG4gICAgY29uc3QgbW10RW5kID0gbW9tZW50KHNlc3Npb24uZW5kKTtcbiAgICBjb25zdCB0aW1lSW5uZXJSYW5nZTogVHdpeEl0ZXIgPSBtbXRTdGFydC50d2l4KG1tdEVuZCkuaXRlcmF0ZUlubmVyKHRoaXMuc2xvdER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHdoaWxlICh0aW1lSW5uZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lSW5uZXJSYW5nZS5uZXh0KCk7XG4gICAgICB0aGlzLnNlc3Npb25zU2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICBpZiAoIXRpbWVJbm5lclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgICB0aGlzLnNlc3Npb25zRW5kU2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIGJ1aWxkaW5nIGVhcmxpZXN0IHNsb3QgYmVmb3JlIGV2ZW50ICovXG4gICAgY29uc3QgbW10RWFybHlTdGFydCA9IG1tdFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKG1tdEVhcmx5U3RhcnQubWludXRlcygpIC0gKG1tdEVhcmx5U3RhcnQubWludXRlcygpICUgdGhpcy5zbG90RHVyYXRpb24pICsgdGhpcy5zbG90RHVyYXRpb24pO1xuICAgIGNvbnN0IHRpbWVFYXJsaWVyUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlTdGFydC50d2l4KG1tdFN0YXJ0KS5pdGVyYXRlKHRoaXMuc2xvdER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHdoaWxlICh0aW1lRWFybGllclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVFYXJsaWVyUmFuZ2UubmV4dCgpO1xuICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCB0aGlzLnNsb3REdXJhdGlvbik7XG4gICAgICBpZiAobW10VGltZS5pc1NhbWVPckFmdGVyKG1tdEVhcmx5U3RhcnQpICYmIG1tdFRpbWUuaXNCZWZvcmUobW10U3RhcnQpKSB7XG4gICAgICAgIHRoaXMuZWFybHlTbG90cy5hZGQobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyogYnVpbGRpbmcgcGF1c2Ugc2xvdHMgYWZ0ZXIgZXZlbnQgKi9cbiAgICBjb25zdCBtbXRFYXJseUVuZCA9IG1tdEVuZC5jbG9uZSgpO1xuICAgIG1tdEVhcmx5RW5kLnN1YnRyYWN0KG1tdEVhcmx5RW5kLm1pbnV0ZXMoKSAlIHRoaXMuc2xvdER1cmF0aW9uKTtcbiAgICBjb25zdCBtbXRQYXVzZUVuZCA9IG1tdEVhcmx5RW5kLmNsb25lKCkuYWRkKHRoaXMub25saW5lU2Vzc2lvbi5zZXNzaW9uX3R5cGUucGF1c2UsICdtaW51dGVzJyk7XG4gICAgY29uc3QgdGltZVBhdXNlUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlFbmQudHdpeChtbXRQYXVzZUVuZCkuaXRlcmF0ZSh0aGlzLnNsb3REdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZVBhdXNlUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZVBhdXNlUmFuZ2UubmV4dCgpO1xuICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCB0aGlzLnNsb3REdXJhdGlvbik7XG4gICAgICBpZiAobW10VGltZS5pc1NhbWVPckFmdGVyKG1tdEVhcmx5RW5kKSAmJiBtbXRUaW1lLmlzQmVmb3JlKG1tdFBhdXNlRW5kKSkge1xuICAgICAgICB0aGlzLnBhdXNlU2xvdHMuYWRkKG1tdFRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzZXNzaW9uIGV2ZW50IGluIENhbGVuZGFyXG4gICAqL1xuICByZW1vdmVTZXNzaW9uKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICBjb25zdCBtbXRTdGFydCA9IG1vbWVudChzZXNzaW9uLnN0YXJ0KTtcbiAgICBjb25zdCBtbXRFbmQgPSBtb21lbnQoc2Vzc2lvbi5lbmQpO1xuICAgIGNvbnN0IHRpbWVJbm5lclJhbmdlOiBUd2l4SXRlciA9IG1tdFN0YXJ0LnR3aXgobW10RW5kKS5pdGVyYXRlKHRoaXMuc2xvdER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHdoaWxlICh0aW1lSW5uZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lSW5uZXJSYW5nZS5uZXh0KCk7XG4gICAgICB0aGlzLnNlc3Npb25zU2xvdHMuZGVsZXRlKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICBpZiAoIXRpbWVJbm5lclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgICB0aGlzLnNlc3Npb25zRW5kU2xvdHMuZGVsZXRlKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIHJlbW92aW5nIGVhcmx5IHNsb3RzICovXG4gICAgY29uc3QgbW10RWFybHlTdGFydCA9IG1tdFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKG1tdEVhcmx5U3RhcnQubWludXRlcygpIC0gKG1tdEVhcmx5U3RhcnQubWludXRlcygpICUgdGhpcy5zbG90RHVyYXRpb24pICsgdGhpcy5zbG90RHVyYXRpb24pO1xuICAgIGNvbnN0IHRpbWVFYXJseVJhbmdlOiBUd2l4SXRlciA9IG1tdEVhcmx5U3RhcnQudHdpeChtbXRTdGFydCkuaXRlcmF0ZSh0aGlzLnNsb3REdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUVhcmx5UmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUVhcmx5UmFuZ2UubmV4dCgpO1xuICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCB0aGlzLnNsb3REdXJhdGlvbik7XG4gICAgICBpZiAobW10VGltZS5pc1NhbWVPckFmdGVyKG1tdEVhcmx5U3RhcnQpICYmIG1tdFRpbWUuaXNCZWZvcmUobW10U3RhcnQpKSB7XG4gICAgICAgIHRoaXMuZWFybHlTbG90cy5kZWxldGUobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyogcmVtb3ZpbmcgcGF1c2Ugc2xvdHMgKi9cbiAgICBpZiAoc2Vzc2lvbi5wYXVzZSkge1xuICAgICAgY29uc3QgbW10RWFybHlFbmQgPSBtbXRFbmQuY2xvbmUoKTtcbiAgICAgIG1tdEVhcmx5RW5kLnN1YnRyYWN0KG1tdEVhcmx5RW5kLm1pbnV0ZXMoKSAlIHRoaXMuc2xvdER1cmF0aW9uKTtcbiAgICAgIGNvbnN0IG1tdFBhdXNlRW5kID0gbW10RWFybHlFbmQuY2xvbmUoKS5hZGQoc2Vzc2lvbi5wYXVzZSwgJ21pbnV0ZXMnKTtcbiAgICAgIGNvbnN0IHRpbWVQYXVzZVJhbmdlOiBUd2l4SXRlciA9IG1tdEVhcmx5RW5kLnR3aXgobW10UGF1c2VFbmQpLml0ZXJhdGUodGhpcy5zbG90RHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgICB3aGlsZSAodGltZVBhdXNlUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lUGF1c2VSYW5nZS5uZXh0KCk7XG4gICAgICAgIGNvbnN0IG1tdFRpbWU6IE1vbWVudCA9IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgdGhpcy5zbG90RHVyYXRpb24pO1xuICAgICAgICBpZiAobW10VGltZS5pc1NhbWVPckFmdGVyKG1tdEVhcmx5RW5kKSAmJiBtbXRUaW1lLmlzQmVmb3JlKG1tdFBhdXNlRW5kKSkge1xuICAgICAgICAgIHRoaXMucGF1c2VTbG90cy5kZWxldGUobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICoqKioqKioqKioqKioqKioqKiogRGF0ZSBmdW5jdGlvbnMgKioqKioqKioqKioqKipcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgbG9hZEV2ZW50cyhzdGFydDogTW9tZW50LCBlbmQ6IE1vbWVudCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuc2Vzc2lvbnNFbnRyaWVzKSkge1xuICAgICAgdGhpcy5zZXNzaW9uc0VudHJpZXMgPSBbLi4udGhpcy5zZXNzaW9uc0VudHJpZXMuZmlsdGVyKChldmVudCkgPT4ge1xuICAgICAgICByZXR1cm4gZXZlbnQgJiYgZXZlbnQuc3RhcnQgPj0gc3RhcnQudG9EYXRlKCkgJiYgZXZlbnQuZW5kIDw9IGVuZC50b0RhdGUoKTtcbiAgICAgIH0pXTtcbiAgICB9XG4gICAgdGhpcy5idXN5U2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIgPSBuZXcgTWFwKCk7XG5cbiAgICB0aGlzLnNlc3Npb25zRW50cmllcy5mb3JFYWNoKChldmVudDogRXZlbnQpID0+IHtcbiAgICAgIGxldCBtbXRFdmVudFN0YXJ0ID0gbW9tZW50KGV2ZW50LnN0YXJ0LCAnWVlZWS1NTS1EREhIOm1tJyk7XG4gICAgICBtbXRFdmVudFN0YXJ0ID0gdGhpcy5idWlsZGluQnVzeVNsb3QobW10RXZlbnRTdGFydCwgZXZlbnQpO1xuICAgICAgdGhpcy5idWlsZGluZ0VhcmxpZXN0U2xvdChtbXRFdmVudFN0YXJ0KTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBidWlsZGluQnVzeVNsb3QobW10RXZlbnRTdGFydDogTW9tZW50LCBldmVudDogRXZlbnQpOiBNb21lbnQge1xuICAgIGNvbnN0IG1tdEV2ZW50RW5kID0gbW9tZW50KGV2ZW50LmVuZCwgJ1lZWVktTU0tRERISDptbScpO1xuICAgIGlmICghbW10RXZlbnRTdGFydCB8fCAhbW10RXZlbnRTdGFydC5pc1ZhbGlkKClcbiAgICAgIHx8ICFtbXRFdmVudEVuZCB8fCAhbW10RXZlbnRFbmQuaXNWYWxpZCgpXG4gICAgICB8fCAhbW10RXZlbnRTdGFydC5pc0JlZm9yZShtbXRFdmVudEVuZCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2ludmFsaWQgZGF0ZXMnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKiBidWlsZGluZyBidXN5IHNsb3RzIGJ5IGV2ZW50cyovXG4gICAgY29uc3QgZXZlbnRzVGltZVJhbmdlOiBUd2l4SXRlciA9IG1tdEV2ZW50U3RhcnQudHdpeChtbXRFdmVudEVuZCkuaXRlcmF0ZSh0aGlzLnNsb3REdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAoZXZlbnRzVGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3Qge3RpbWUsIG1tdFRpbWV9ID0gQ2FsZW5kYXJDb21wb25lbnQuc3BsaXRSYW5nZVRvTmV4dFRpbWUoZXZlbnRzVGltZVJhbmdlLCB0aGlzLnNsb3REdXJhdGlvbik7XG4gICAgICAvKiBJRiB0aGUgYnVzeSBzbG90IGlzIGluIGF2YWlsYWJpbGl0eSBhbmQgbm90IGFscmVhZHkgaW4gYnVzeVNsb2l0cyB3ZSBjb3VudCBpdCAqL1xuICAgICAgaWYgKHRoaXMuZGF5c0F2YWlsYWJpbGl0eSAmJiB0aGlzLmRheXNBdmFpbGFiaWxpdHkuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpXG4gICAgICAgICYmICF0aGlzLmJ1c3lTbG90cy5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKVxuICAgICAgICAmJiB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZ2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpLmluZGV4T2YodGltZS5mb3JtYXQoJ0hIOm1tJykpID49IDApIHtcbiAgICAgICAgbGV0IGRheUJ1c3lOdW1iZXIgPSB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgP1xuICAgICAgICAgIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmdldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSA6IDA7XG4gICAgICAgIGRheUJ1c3lOdW1iZXIrKztcbiAgICAgICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuc2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJyksIGRheUJ1c3lOdW1iZXIpO1xuICAgICAgfVxuICAgICAgdGhpcy5idXN5U2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1tdEV2ZW50U3RhcnQ7XG4gIH1cblxuICBidWlsZGluZ0VhcmxpZXN0U2xvdChtbXRFdmVudFN0YXJ0OiBNb21lbnQpIHtcbiAgICAvKiBidWlsZGluZyBlYXJsaWVzdCBzbG90IGJlZm9yZSBldmVudCAqL1xuICAgIGNvbnN0IG1tdEVhcmx5U3RhcnQgPSBtbXRFdmVudFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKG1tdEVhcmx5U3RhcnQubWludXRlcygpIC1cbiAgICAgIChtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAlIHRoaXMuc2xvdER1cmF0aW9uKSArIHRoaXMuc2xvdER1cmF0aW9uKTtcbiAgICBjb25zdCBlYXJsaWVzdFRpbWVSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseVN0YXJ0LnR3aXgobW10RXZlbnRTdGFydCkuaXRlcmF0ZSh0aGlzLnNsb3REdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAoZWFybGllc3RUaW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB7dGltZSwgbW10VGltZX0gPSBDYWxlbmRhckNvbXBvbmVudC5zcGxpdFJhbmdlVG9OZXh0VGltZShlYXJsaWVzdFRpbWVSYW5nZSwgdGhpcy5zbG90RHVyYXRpb24pO1xuICAgICAgLyogSUYgdGhlIGJ1c3kgc2xvdCBpcyBpbiBhdmFpbGFiaWxpdHkgYW5kIG5vdCBhbHJlYWR5IGluIGJ1c3lTbG9pdHMgd2UgY291bnQgaXQgKi9cbiAgICAgIGlmICh0aGlzLmRheXNBdmFpbGFiaWxpdHkgJiYgdGhpcy5kYXlzQXZhaWxhYmlsaXR5Lmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKVxuICAgICAgICAmJiAhdGhpcy5idXN5U2xvdHMuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSlcbiAgICAgICAgJiYgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmdldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKS5pbmRleE9mKHRpbWUuZm9ybWF0KCdISDptbScpKSA+PSAwKSB7XG4gICAgICAgIGxldCBkYXlCdXN5TnVtYmVyID0gdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpID9cbiAgICAgICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgOiAwO1xuICAgICAgICBkYXlCdXN5TnVtYmVyKys7XG4gICAgICAgIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLnNldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpLCBkYXlCdXN5TnVtYmVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYnVzeVNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgIH1cbiAgfVxufVxuIl19