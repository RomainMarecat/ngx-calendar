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
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChildren } from '@angular/core';
import * as moment_ from 'moment';
import 'twix';
import { EventService } from '../shared/event/event.service';
import { SessionService } from '../shared/session/session.service';
/** @type {?} */
var moment = moment_;
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(eventService, sessionService, cd, rd) {
        this.eventService = eventService;
        this.sessionService = sessionService;
        this.cd = cd;
        this.rd = rd;
        // Default View Mode of Week Component
        this._viewMode = 'week';
        this.start = moment();
        this.end = moment();
        this.slotDuration = 15;
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
        else if (this.viewMode === '3days') {
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
        var mmtEarlyStart = mmtStart.clone().subtract(this.trueDuration, 'minutes');
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
        var mmtEarlyStart = mmtStart.clone().subtract(this.trueDuration, 'minutes');
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
        this.sessionService.filters$.next([
            {
                column: 'start',
                operator: '>=',
                value: moment(start).toDate()
            }
        ]);
        this.sessionService.getSessions()
            .subscribe((/**
         * @param {?} events
         * @return {?}
         */
        function (events) {
            _this.events = __spread(events.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event && event.end <= end.toDate(); })));
            _this.busySlots = new Set();
            _this.daysBusySlotNumber = new Map();
            _this.events.forEach((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var mmtEventStart = moment(event.start, 'YYYY-MM-DDHH:mm');
                mmtEventStart = _this.buildinBusySlot(mmtEventStart, event);
                _this.buildingEarliestSlot(mmtEventStart);
            }));
            _this.cd.markForCheck();
        }));
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
        var mmtEarlyStart = mmtEventStart.clone().subtract(this.trueDuration, 'minutes');
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
                    template: "<mat-card class=\"week-calendar-wrapper\">\n  <mat-card-header class=\"week-calendar-header\">\n\n\n    <mat-card-title class=\"week-calendar-title\">\n\n\n      <lib-calendar-header [start]=\"start\"\n                           [end]=\"end\"\n                           [viewMode]=\"viewMode\"\n                           (switchedView)=\"onSwithedView($event)\"\n                           (startChanged)=\"onStartChanged($event)\"></lib-calendar-header>\n\n    </mat-card-title>\n\n\n  </mat-card-header>\n\n  <mat-card-content>\n\n\n    <lib-calendar-body [onlineSession]=\"onlineSession\"\n                       [days]=\"days\"\n                       [viewMode]=\"viewMode\"\n                       [start]=\"start\"\n                       [end]=\"end\"\n                       [daysAvailability]=\"daysAvailability\"\n                       [daysBusySlotNumber]=\"daysBusySlotNumber\"\n                       [daysAvailabilitySlotNumber]=\"daysAvailabilitySlotNumber\"\n                       [busySlots]=\"busySlots\"\n                       [earlySlots]=\"earlySlots\"\n                       [pauseSlots]=\"pauseSlots\"\n                       [sessionsSlots]=\"sessionsSlots\"\n                       [sessionsEndSlots]=\"sessionsEndSlots\"\n                       [sessions]=\"sessions\"\n                       (startChanged)=\"onStartChanged($event)\"\n                       (sessionAdded)=\"onSessionAdded($event)\"\n                       (sessionRemoved)=\"onSessionRemoved($event)\"\n                       *ngIf=\"start && end && days && viewMode\"></lib-calendar-body>\n\n  </mat-card-content>\n</mat-card>\n",
                    styles: ["@media (min-width:768px){.week-calendar-wrapper .week-calendar-header .week-calendar-title{width:90vw}}"]
                }] }
    ];
    /** @nocollapse */
    CalendarComponent.ctorParameters = function () { return [
        { type: EventService },
        { type: SessionService },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    CalendarComponent.propDecorators = {
        onlineSession: [{ type: Input }],
        start: [{ type: Input }],
        end: [{ type: Input }],
        slotDuration: [{ type: Input }],
        viewModeChanged: [{ type: Output }],
        sessionCreated: [{ type: Output }],
        sessionRemoved: [{ type: Output }],
        el: [{ type: ViewChildren, args: ['dayList',] }],
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
    /** @type {?} */
    CalendarComponent.prototype.start;
    /** @type {?} */
    CalendarComponent.prototype.end;
    /** @type {?} */
    CalendarComponent.prototype.slotDuration;
    /** @type {?} */
    CalendarComponent.prototype.calendarStart;
    /** @type {?} */
    CalendarComponent.prototype.calendarEnd;
    /** @type {?} */
    CalendarComponent.prototype.viewModeChanged;
    /** @type {?} */
    CalendarComponent.prototype.sessionCreated;
    /** @type {?} */
    CalendarComponent.prototype.sessionRemoved;
    /** @type {?} */
    CalendarComponent.prototype.el;
    /** @type {?} */
    CalendarComponent.prototype.days;
    /** @type {?} */
    CalendarComponent.prototype.trueDuration;
    /** @type {?} */
    CalendarComponent.prototype.daysAvailability;
    /** @type {?} */
    CalendarComponent.prototype.daysBusySlotNumber;
    /** @type {?} */
    CalendarComponent.prototype.daysAvailabilitySlotNumber;
    /** @type {?} */
    CalendarComponent.prototype.events;
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
    CalendarComponent.prototype.eventService;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.sessionService;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.cd;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.rd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUdsQyxPQUFPLE1BQU0sQ0FBQztBQUVkLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUk3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0lBRTdELE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBb0RFLDJCQUFvQixZQUEwQixFQUMxQixjQUE4QixFQUM5QixFQUFxQixFQUNyQixFQUFhO1FBSGIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLE9BQUUsR0FBRixFQUFFLENBQVc7O1FBOUNqQyxjQUFTLEdBQVcsTUFBTSxDQUFDO1FBR2xCLFVBQUssR0FBVyxNQUFNLEVBQUUsQ0FBQztRQUN6QixRQUFHLEdBQVcsTUFBTSxFQUFFLENBQUM7UUFDdkIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFJakIsb0JBQWUsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNuRSxtQkFBYyxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO1FBRXBFLG1CQUFjLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFHOUUsU0FBSSxHQUFlLEVBQUUsQ0FBQztJQWdDdEIsQ0FB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QUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQzs7Z0JBL1lGLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLGNBQWM7O29CQUV4QiwybURBQXdDOztpQkFFekM7Ozs7Z0JBZFEsWUFBWTtnQkFJWixjQUFjO2dCQXBCckIsaUJBQWlCO2dCQVFqQixTQUFTOzs7Z0NBMkJSLEtBQUs7d0JBQ0wsS0FBSztzQkFDTCxLQUFLOytCQUNMLEtBQUs7a0NBSUwsTUFBTTtpQ0FDTixNQUFNO2lDQUVOLE1BQU07cUJBRU4sWUFBWSxTQUFDLFNBQVM7MkJBd0N0QixLQUFLOztJQWlWUix3QkFBQztDQUFBLEFBaFpELElBZ1pDO1NBellZLGlCQUFpQjs7O0lBRTVCLHNDQUEyQjs7SUFFM0IsMENBQXNDOztJQUN0QyxrQ0FBa0M7O0lBQ2xDLGdDQUFnQzs7SUFDaEMseUNBQTJCOztJQUUzQiwwQ0FBc0I7O0lBQ3RCLHdDQUFvQjs7SUFDcEIsNENBQTZFOztJQUM3RSwyQ0FBOEU7O0lBRTlFLDJDQUE4RTs7SUFFOUUsK0JBQXdDOztJQUN4QyxpQ0FBc0I7O0lBRXRCLHlDQUFxQjs7SUFDckIsNkNBQXdDOztJQUN4QywrQ0FBd0M7O0lBRXhDLHVEQUFnRDs7SUFDaEQsbUNBQWdCOztJQUNoQixzQ0FBdUI7O0lBQ3ZCLHVDQUF3Qjs7SUFDeEIsdUNBQXdCOztJQUN4QiwwQ0FBMkI7O0lBQzNCLDZDQUE4Qjs7SUFDOUIscUNBQStCOzs7OztJQWVuQix5Q0FBa0M7Ozs7O0lBQ2xDLDJDQUFzQzs7Ozs7SUFDdEMsK0JBQTZCOzs7OztJQUM3QiwrQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZHJlblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBUd2l4LCBUd2l4SXRlciB9IGZyb20gJ3R3aXgnO1xuaW1wb3J0ICd0d2l4JztcbmltcG9ydCB7IERheSB9IGZyb20gJy4uL3NoYXJlZC9kYXkvZGF5JztcbmltcG9ydCB7IEV2ZW50U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9ldmVudC9ldmVudC5zZXJ2aWNlJztcbmltcG9ydCB7IE9ubGluZVNlc3Npb24gfSBmcm9tICcuLi9zaGFyZWQvc2Vzc2lvbi9vbmxpbmUtc2Vzc2lvbic7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vc2hhcmVkL3Nlc3Npb24vc2Vzc2lvbic7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4uL3NoYXJlZC9ldmVudC9ldmVudCc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZVxuICBzZWxlY3RvcjogJ25neC1jYWxlbmRhcicsXG4gIC8vIHRzbGludDplbmFibGVcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLy8gRGVmYXVsdCBWaWV3IE1vZGUgb2YgV2VlayBDb21wb25lbnRcbiAgX3ZpZXdNb2RlOiBTdHJpbmcgPSAnd2Vlayc7XG5cbiAgQElucHV0KCkgb25saW5lU2Vzc2lvbjogT25saW5lU2Vzc2lvbjtcbiAgQElucHV0KCkgc3RhcnQ6IE1vbWVudCA9IG1vbWVudCgpO1xuICBASW5wdXQoKSBlbmQ6IE1vbWVudCA9IG1vbWVudCgpO1xuICBASW5wdXQoKSBzbG90RHVyYXRpb24gPSAxNTtcblxuICBjYWxlbmRhclN0YXJ0OiBNb21lbnQ7XG4gIGNhbGVuZGFyRW5kOiBNb21lbnQ7XG4gIEBPdXRwdXQoKSB2aWV3TW9kZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxTdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxTdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBzZXNzaW9uQ3JlYXRlZDogRXZlbnRFbWl0dGVyPFNlc3Npb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZXNzaW9uPigpO1xuXG4gIEBPdXRwdXQoKSBzZXNzaW9uUmVtb3ZlZDogRXZlbnRFbWl0dGVyPFNlc3Npb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZXNzaW9uPigpO1xuXG4gIEBWaWV3Q2hpbGRyZW4oJ2RheUxpc3QnKSBlbDogRWxlbWVudFJlZjtcbiAgZGF5czogQXJyYXk8RGF5PiA9IFtdO1xuXG4gIHRydWVEdXJhdGlvbjogbnVtYmVyO1xuICBkYXlzQXZhaWxhYmlsaXR5OiBNYXA8c3RyaW5nLCBzdHJpbmdbXT47XG4gIGRheXNCdXN5U2xvdE51bWJlcjogTWFwPHN0cmluZywgbnVtYmVyPjtcblxuICBkYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlcjogTWFwPHN0cmluZywgbnVtYmVyPjtcbiAgZXZlbnRzOiBFdmVudFtdO1xuICBidXN5U2xvdHM6IFNldDxzdHJpbmc+O1xuICBlYXJseVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgcGF1c2VTbG90czogU2V0PHN0cmluZz47XG4gIHNlc3Npb25zU2xvdHM6IFNldDxzdHJpbmc+O1xuICBzZXNzaW9uc0VuZFNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgc2Vzc2lvbnM6IE1hcDxzdHJpbmcsIFNlc3Npb24+O1xuXG4gIHN0YXRpYyBzcGxpdFJhbmdlVG9OZXh0VGltZShzbG90VGltZVJhbmdlOiBUd2l4SXRlciwgc2xvdER1cmF0aW9uOiBudW1iZXIpOiB7dGltZTogVHdpeCwgbW10VGltZTogTW9tZW50fSB7XG4gICAgY29uc3QgdGltZTogVHdpeCA9IHNsb3RUaW1lUmFuZ2UubmV4dCgpO1xuICAgIHJldHVybiB7dGltZTogdGltZSwgbW10VGltZTogQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzbG90RHVyYXRpb24pfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRNaW51dGVzRGlmZmVyZW5jZShtbXRUaW1lOiBNb21lbnQsIHNsb3REdXJhdGlvbjogbnVtYmVyKTogTW9tZW50IHtcbiAgICBpZiAobW10VGltZS5taW51dGVzKCkgJSBzbG90RHVyYXRpb24gIT09IDApIHtcbiAgICAgIG1tdFRpbWUubWludXRlcyhtbXRUaW1lLm1pbnV0ZXMoKSAtIChtbXRUaW1lLm1pbnV0ZXMoKSAlIHNsb3REdXJhdGlvbikpO1xuICAgIH1cblxuICAgIHJldHVybiBtbXRUaW1lO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIHJkOiBSZW5kZXJlcjIpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2V0Q2FsZW5kYXIoKTtcbiAgICB0aGlzLnNldERhdGVSYW5nZSgpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHZpZXdNb2RlKHZpZXdNb2RlKSB7XG4gICAgdGhpcy5fdmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLnNldFZpZXdNb2RlKCk7XG4gIH1cblxuICBnZXQgdmlld01vZGUoKTogU3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld01vZGU7XG4gIH1cblxuICAvKipcbiAgICogSW5zcGVjdCBhbGwgY2hhbmdlc1xuICAgKi9cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5zZXREYXRlUmFuZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgRGVmYXVsdCB2YXJpYWJsZXNcbiAgICovXG4gIHNldENhbGVuZGFyKCkge1xuICAgIHRoaXMub25saW5lU2Vzc2lvbiA9IHtcbiAgICAgIGtleTogJ3Rlc3QxJyxcbiAgICAgIHNlc3Npb25fdHlwZToge1xuICAgICAgICBuYW1lOiAndGVzdDEnLFxuICAgICAgICBtYXhfcGVyc29uczogMSxcbiAgICAgICAgYm9va2luZ19kZWxheTogMSxcbiAgICAgICAgZHVyYXRpb246IDYwLFxuICAgICAgICBwYXVzZTogMCxcbiAgICAgIH0sXG4gICAgICBwcmljZXM6IFsxMCwgMjBdLFxuICAgICAgZGF0ZV9yYW5nZToge1xuICAgICAgICBzdGFydDogJzIwMTgtMDEtMDEnLFxuICAgICAgICBlbmQ6ICcyMDE5LTEyLTMxJyxcbiAgICAgIH0sXG4gICAgICB0aW1lX3JhbmdlOiB7XG4gICAgICAgIHN0YXJ0OiAnMDg6MDAnLFxuICAgICAgICBlbmQ6ICcxOTowMCcsXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnNlc3Npb25zU2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuZWFybHlTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLnBhdXNlU2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5zZXNzaW9ucyA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgVmlldyBNb2RlIHdpdGggd2VlaywgZGF5LCAzIGRheXNcbiAgICogSW5pdCBzdGFydCwgZW5kLFxuICAgKlxuICAgKi9cbiAgc2V0Vmlld01vZGUoKSB7XG4gICAgaWYgKHRoaXMudmlld01vZGUgPT09ICdkYXknKSB7XG4gICAgICB0aGlzLmVuZCA9IHRoaXMuc3RhcnQ7XG4gICAgICB0aGlzLmNhbGVuZGFyU3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuc3RhcnRPZignZGF5Jyk7XG4gICAgICB0aGlzLmNhbGVuZGFyRW5kID0gbW9tZW50KHRoaXMuZW5kKS5lbmRPZignZGF5Jyk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh0aGlzLnZpZXdNb2RlID09PSAnM2RheXMnKSB7XG4gICAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoMiwgJ2RheXMnKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdGFydE9mKCdkYXknKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJFbmQgPSBtb21lbnQodGhpcy5lbmQpLmVuZE9mKCdkYXknKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gSW5pdCBmaXJzdCBkYXkgd2VlayBudW1iZXJcbiAgICBjb25zdCBmaXJzdERheSA9IDA7XG4gICAgLy8gSWYgZW1wdHkgc3RhcnQgZGF0ZSB0aGVuIHN0YXJ0IHRvIHRvZGF5XG4gICAgaWYgKCF0aGlzLnN0YXJ0KSB7XG4gICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KCk7XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuZGF5KGZpcnN0RGF5KTtcbiAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoNiwgJ2RheXMnKTtcblxuICAgIHRoaXMuY2FsZW5kYXJTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdGFydE9mKCdkYXknKTtcbiAgICB0aGlzLmNhbGVuZGFyRW5kID0gbW9tZW50KHRoaXMuZW5kKS5lbmRPZignZGF5Jyk7XG4gIH1cblxuICAvKipcbiAgICogT24gc3RhcnQvdmlld01vZGUgY2hhbmdlZCwgZG8gYSByZWNhbGN1bGF0ZSBvZiBpbml0IHN0YXJ0LCBlbmRcbiAgICogZGF5cywgZGF5c0F2YWlsYWJpbGl0eSBhbmQgdmlld01vZGVcbiAgICovXG4gIHNldERhdGVSYW5nZSgpIHtcbiAgICB0aGlzLnNldENhbGVuZGFyKCk7XG4gICAgdGhpcy5zZXRWaWV3TW9kZSgpO1xuICAgIC8vIHRoaXMuYnVpbGRUcnVlRHVyYXRpb24oKTtcbiAgICB0aGlzLmxvYWRFdmVudHModGhpcy5zdGFydCwgdGhpcy5lbmQpO1xuICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eSA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBkYXRlUmFuZ2U6IFR3aXhJdGVyID0gdGhpcy5zdGFydFxuICAgICAgLnR3aXgodGhpcy5lbmQpXG4gICAgICAuaXRlcmF0ZSgxLCAnZGF5cycpO1xuICAgIHRoaXMuZGF5cyA9IFtdO1xuICAgIC8vIExvYWRpbmcgYWxsIGRheXNcbiAgICB3aGlsZSAoZGF0ZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgZGF0ZTogVHdpeCA9IGRhdGVSYW5nZS5uZXh0KCk7XG4gICAgICB0aGlzLmRheXMucHVzaCh7XG4gICAgICAgIHRpdGxlOiBkYXRlLmZvcm1hdCgnREQvTU0vWVlZWScpLFxuICAgICAgICBrZXk6IGRhdGUuZm9ybWF0KCdZWVlZLU1NLUREJyksXG4gICAgICAgIHZhbHVlOiBtb21lbnQoZGF0ZS50b0RhdGUoKSlcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LnNldChkYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpLCBbXSk7XG4gICAgfVxuICAgIHRoaXMubG9hZEF2YWlsYWJpbGl0aWVzKCk7XG4gIH1cblxuICAvKipcbiAgICogT24gc3dpdGNoIGRhdGUgcmFuZ2VcbiAgICovXG4gIG9uU3dpdGhlZFZpZXcodmlld01vZGU6IFN0cmluZykge1xuICAgIHRoaXMudmlld01vZGVDaGFuZ2VkLmVtaXQodmlld01vZGUpO1xuICAgIHRoaXMuc2V0RGF0ZVJhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgICogT24gc3RhcnQgY2hhbmdlIGV2ZW50XG4gICAqL1xuICBvblN0YXJ0Q2hhbmdlZChzdGFydDogTW9tZW50KSB7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuc2V0RGF0ZVJhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgICogT24gc2Vzc2lvbiBhZGRlZCBvbiBjbGljayBldmVudFxuICAgKi9cbiAgb25TZXNzaW9uQWRkZWQoc2Vzc2lvbjogU2Vzc2lvbikge1xuICAgIHRoaXMuc2Vzc2lvbnMuc2V0KG1vbWVudChzZXNzaW9uLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpLCBzZXNzaW9uKTtcbiAgICB0aGlzLmFkZFNlc3Npb24oc2Vzc2lvbik7XG4gICAgdGhpcy5zZXNzaW9uQ3JlYXRlZC5lbWl0KHNlc3Npb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHJlbW92ZWQgZXZlbnRcbiAgICovXG4gIG9uU2Vzc2lvblJlbW92ZWQoc291cmNlOiB7a2V5OiBzdHJpbmcsIHNlc3Npb246IFNlc3Npb259KSB7XG4gICAgdGhpcy5zZXNzaW9ucy5kZWxldGUoc291cmNlLmtleSk7XG4gICAgdGhpcy5yZW1vdmVTZXNzaW9uKHNvdXJjZS5zZXNzaW9uKTtcbiAgICB0aGlzLnNlc3Npb25SZW1vdmVkLmVtaXQoc291cmNlLnNlc3Npb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgYWxsIHRpbWUgZm9yIGVhY2ggZGF5c1xuICAgKi9cbiAgbG9hZEF2YWlsYWJpbGl0aWVzKCkge1xuICAgIC8vIG5vIG9ubGluZSBzZXNzaW9uIG5vIGNhbGVuZGFyXG4gICAgaWYgKCF0aGlzLmRheXNBdmFpbGFiaWxpdHkgfHwgIXRoaXMub25saW5lU2Vzc2lvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBzZXNzaW9uIGR1cmF0aW9uXG4gICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLm9ubGluZVNlc3Npb24uc2Vzc2lvbl90eXBlLmR1cmF0aW9uO1xuICAgIC8vIHNlc3Npb24gZGF5IHN0YXJ0IDAwOjAwIC0gZW5kIDIzOjU5XG4gICAgY29uc3Qgb25saW5lU2Vzc2lvblN0YXJ0OiBNb21lbnQgPSBtb21lbnQodGhpcy5vbmxpbmVTZXNzaW9uLmRhdGVfcmFuZ2Uuc3RhcnQsICdZWVlZLU1NLUREJykuc3RhcnRPZignZGF5Jyk7XG4gICAgY29uc3Qgb25saW5lU2Vzc2lvbkVuZDogTW9tZW50ID0gbW9tZW50KHRoaXMub25saW5lU2Vzc2lvbi5kYXRlX3JhbmdlLmVuZCwgJ1lZWVktTU0tREQnKS5lbmRPZignZGF5Jyk7XG4gICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlciA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZm9yRWFjaCgoYXZicywgZGF5KSA9PiB7XG4gICAgICBsZXQgc2xvdHNOdW1iZXIgPSAwO1xuICAgICAgLy8gZWFjaCBkYXkgb2YgZGF5cyBhdmFpbGFiaWxpdHkgd2l0aCBzdGFydCB0aW1lIDA4OjAwXG4gICAgICBjb25zdCBtbXREYXkgPSBtb21lbnQoZGF5LCAnWVlZWS1NTS1ERCcpLmhvdXIoOCk7XG4gICAgICBjb25zdCBtbXREYXlTdGFydFRpbWUgPSBtb21lbnQoZGF5ICsgdGhpcy5vbmxpbmVTZXNzaW9uLnRpbWVfcmFuZ2Uuc3RhcnQsICdZWVlZLU1NRERISDptbScpO1xuXG4gICAgICAvLyBJZiBzZXNzaW9uIHN0YXJ0IHRpbWUgbGlrZSAwODowMCBpcyBiZWZvcmUgc3RhcnQgdG9kYXkgMDA6MDBcbiAgICAgIGlmIChtbXREYXlTdGFydFRpbWUuaXNCZWZvcmUobW9tZW50KCkuc3RhcnRPZignZGF5JykpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGJvb2tpbmcgZGVsYXlcbiAgICAgIGNvbnN0IG1pbk1tdFN0YXJ0VGltZSA9IG1vbWVudCgpLmFkZCh0aGlzLm9ubGluZVNlc3Npb24uc2Vzc2lvbl90eXBlLmJvb2tpbmdfZGVsYXksICdob3VycycpO1xuICAgICAgLy8gc2Vzc2lvbiB0aW1lIGVuZFxuICAgICAgY29uc3QgbW10RGF5RW5kVGltZSA9IG1vbWVudChkYXkgKyB0aGlzLm9ubGluZVNlc3Npb24udGltZV9yYW5nZS5lbmQsICdZWVlZLU1NLURESEg6bW0nKTtcbiAgICAgIG1tdERheUVuZFRpbWUuc3VidHJhY3QoZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgICAvLyBzbG90cyBpdGVyYXRvclxuICAgICAgY29uc3QgdGltZVJhbmdlOiBUd2l4SXRlciA9IG1tdERheVN0YXJ0VGltZS50d2l4KG1tdERheUVuZFRpbWUpLml0ZXJhdGUodGhpcy5zbG90RHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgICBpZiAodGhpcy5jYWxlbmRhclN0YXJ0ICYmIHRoaXMuY2FsZW5kYXJFbmQgJiYgbW10RGF5LmlzQmV0d2VlbihvbmxpbmVTZXNzaW9uU3RhcnQsIG9ubGluZVNlc3Npb25FbmQpKSB7XG4gICAgICAgIHdoaWxlICh0aW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVSYW5nZS5uZXh0KCk7XG4gICAgICAgICAgY29uc3QgdGltZU1tdDogTW9tZW50ID0gbW9tZW50KHRpbWUudG9EYXRlKCkpO1xuICAgICAgICAgIGlmICghdGltZU1tdC5pc0JlZm9yZShtaW5NbXRTdGFydFRpbWUpKSB7XG4gICAgICAgICAgICBhdmJzLnB1c2godGltZS5mb3JtYXQoJ0hIOm1tJykpO1xuICAgICAgICAgICAgc2xvdHNOdW1iZXIrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXIuc2V0KGRheSwgc2xvdHNOdW1iZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBzZXNzaW9uIGV2ZW50IGluIGNhbGVuZGFyXG4gICAqL1xuICBhZGRTZXNzaW9uKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICBjb25zdCBtbXRTdGFydCA9IG1vbWVudChzZXNzaW9uLnN0YXJ0KTtcbiAgICBjb25zdCBtbXRFbmQgPSBtb21lbnQoc2Vzc2lvbi5lbmQpO1xuICAgIGNvbnN0IHRpbWVJbm5lclJhbmdlOiBUd2l4SXRlciA9IG1tdFN0YXJ0LnR3aXgobW10RW5kKS5pdGVyYXRlSW5uZXIodGhpcy5zbG90RHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVJbm5lclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVJbm5lclJhbmdlLm5leHQoKTtcbiAgICAgIHRoaXMuc2Vzc2lvbnNTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIGlmICghdGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyogYnVpbGRpbmcgZWFybGllc3Qgc2xvdCBiZWZvcmUgZXZlbnQgKi9cbiAgICBjb25zdCBtbXRFYXJseVN0YXJ0ID0gbW10U3RhcnQuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLnRydWVEdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICBtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMobW10RWFybHlTdGFydC5taW51dGVzKCkgLSAobW10RWFybHlTdGFydC5taW51dGVzKCkgJSB0aGlzLnNsb3REdXJhdGlvbikgKyB0aGlzLnNsb3REdXJhdGlvbik7XG4gICAgY29uc3QgdGltZUVhcmxpZXJSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseVN0YXJ0LnR3aXgobW10U3RhcnQpLml0ZXJhdGUodGhpcy5zbG90RHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVFYXJsaWVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUVhcmxpZXJSYW5nZS5uZXh0KCk7XG4gICAgICBjb25zdCBtbXRUaW1lOiBNb21lbnQgPSBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHRoaXMuc2xvdER1cmF0aW9uKTtcbiAgICAgIGlmIChtbXRUaW1lLmlzU2FtZU9yQWZ0ZXIobW10RWFybHlTdGFydCkgJiYgbW10VGltZS5pc0JlZm9yZShtbXRTdGFydCkpIHtcbiAgICAgICAgdGhpcy5lYXJseVNsb3RzLmFkZChtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBidWlsZGluZyBwYXVzZSBzbG90cyBhZnRlciBldmVudCAqL1xuICAgIGNvbnN0IG1tdEVhcmx5RW5kID0gbW10RW5kLmNsb25lKCk7XG4gICAgbW10RWFybHlFbmQuc3VidHJhY3QobW10RWFybHlFbmQubWludXRlcygpICUgdGhpcy5zbG90RHVyYXRpb24pO1xuICAgIGNvbnN0IG1tdFBhdXNlRW5kID0gbW10RWFybHlFbmQuY2xvbmUoKS5hZGQodGhpcy5vbmxpbmVTZXNzaW9uLnNlc3Npb25fdHlwZS5wYXVzZSwgJ21pbnV0ZXMnKTtcbiAgICBjb25zdCB0aW1lUGF1c2VSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseUVuZC50d2l4KG1tdFBhdXNlRW5kKS5pdGVyYXRlKHRoaXMuc2xvdER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHdoaWxlICh0aW1lUGF1c2VSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lUGF1c2VSYW5nZS5uZXh0KCk7XG4gICAgICBjb25zdCBtbXRUaW1lOiBNb21lbnQgPSBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHRoaXMuc2xvdER1cmF0aW9uKTtcbiAgICAgIGlmIChtbXRUaW1lLmlzU2FtZU9yQWZ0ZXIobW10RWFybHlFbmQpICYmIG1tdFRpbWUuaXNCZWZvcmUobW10UGF1c2VFbmQpKSB7XG4gICAgICAgIHRoaXMucGF1c2VTbG90cy5hZGQobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHNlc3Npb24gZXZlbnQgaW4gQ2FsZW5kYXJcbiAgICovXG4gIHJlbW92ZVNlc3Npb24oc2Vzc2lvbjogU2Vzc2lvbikge1xuICAgIGNvbnN0IG1tdFN0YXJ0ID0gbW9tZW50KHNlc3Npb24uc3RhcnQpO1xuICAgIGNvbnN0IG1tdEVuZCA9IG1vbWVudChzZXNzaW9uLmVuZCk7XG4gICAgY29uc3QgdGltZUlubmVyUmFuZ2U6IFR3aXhJdGVyID0gbW10U3RhcnQudHdpeChtbXRFbmQpLml0ZXJhdGUodGhpcy5zbG90RHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVJbm5lclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVJbm5lclJhbmdlLm5leHQoKTtcbiAgICAgIHRoaXMuc2Vzc2lvbnNTbG90cy5kZWxldGUodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIGlmICghdGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cy5kZWxldGUodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyogcmVtb3ZpbmcgZWFybHkgc2xvdHMgKi9cbiAgICBjb25zdCBtbXRFYXJseVN0YXJ0ID0gbW10U3RhcnQuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLnRydWVEdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICBtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMobW10RWFybHlTdGFydC5taW51dGVzKCkgLSAobW10RWFybHlTdGFydC5taW51dGVzKCkgJSB0aGlzLnNsb3REdXJhdGlvbikgKyB0aGlzLnNsb3REdXJhdGlvbik7XG4gICAgY29uc3QgdGltZUVhcmx5UmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlTdGFydC50d2l4KG1tdFN0YXJ0KS5pdGVyYXRlKHRoaXMuc2xvdER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHdoaWxlICh0aW1lRWFybHlSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lRWFybHlSYW5nZS5uZXh0KCk7XG4gICAgICBjb25zdCBtbXRUaW1lOiBNb21lbnQgPSBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHRoaXMuc2xvdER1cmF0aW9uKTtcbiAgICAgIGlmIChtbXRUaW1lLmlzU2FtZU9yQWZ0ZXIobW10RWFybHlTdGFydCkgJiYgbW10VGltZS5pc0JlZm9yZShtbXRTdGFydCkpIHtcbiAgICAgICAgdGhpcy5lYXJseVNsb3RzLmRlbGV0ZShtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiByZW1vdmluZyBwYXVzZSBzbG90cyAqL1xuICAgIGlmIChzZXNzaW9uLnBhdXNlKSB7XG4gICAgICBjb25zdCBtbXRFYXJseUVuZCA9IG1tdEVuZC5jbG9uZSgpO1xuICAgICAgbW10RWFybHlFbmQuc3VidHJhY3QobW10RWFybHlFbmQubWludXRlcygpICUgdGhpcy5zbG90RHVyYXRpb24pO1xuICAgICAgY29uc3QgbW10UGF1c2VFbmQgPSBtbXRFYXJseUVuZC5jbG9uZSgpLmFkZChzZXNzaW9uLnBhdXNlLCAnbWludXRlcycpO1xuICAgICAgY29uc3QgdGltZVBhdXNlUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlFbmQudHdpeChtbXRQYXVzZUVuZCkuaXRlcmF0ZSh0aGlzLnNsb3REdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICAgIHdoaWxlICh0aW1lUGF1c2VSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVQYXVzZVJhbmdlLm5leHQoKTtcbiAgICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCB0aGlzLnNsb3REdXJhdGlvbik7XG4gICAgICAgIGlmIChtbXRUaW1lLmlzU2FtZU9yQWZ0ZXIobW10RWFybHlFbmQpICYmIG1tdFRpbWUuaXNCZWZvcmUobW10UGF1c2VFbmQpKSB7XG4gICAgICAgICAgdGhpcy5wYXVzZVNsb3RzLmRlbGV0ZShtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKioqKioqKioqKioqKioqKioqKiBEYXRlIGZ1bmN0aW9ucyAqKioqKioqKioqKioqKlxuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICBsb2FkRXZlbnRzKHN0YXJ0OiBNb21lbnQsIGVuZDogTW9tZW50KSB7XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5maWx0ZXJzJC5uZXh0KFtcbiAgICAgIHtcbiAgICAgICAgY29sdW1uOiAnc3RhcnQnLFxuICAgICAgICBvcGVyYXRvcjogJz49JyxcbiAgICAgICAgdmFsdWU6IG1vbWVudChzdGFydCkudG9EYXRlKClcbiAgICAgIH1cbiAgICBdKTtcbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLmdldFNlc3Npb25zKClcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50czogU2Vzc2lvbltdKSA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gWy4uLmV2ZW50cy5maWx0ZXIoKGV2ZW50KSA9PiBldmVudCAmJiBldmVudC5lbmQgPD0gZW5kLnRvRGF0ZSgpKV07XG4gICAgICAgIHRoaXMuYnVzeVNsb3RzID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlciA9IG5ldyBNYXAoKTtcblxuICAgICAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICBsZXQgbW10RXZlbnRTdGFydCA9IG1vbWVudChldmVudC5zdGFydCwgJ1lZWVktTU0tRERISDptbScpO1xuICAgICAgICAgIG1tdEV2ZW50U3RhcnQgPSB0aGlzLmJ1aWxkaW5CdXN5U2xvdChtbXRFdmVudFN0YXJ0LCBldmVudCk7XG4gICAgICAgICAgdGhpcy5idWlsZGluZ0VhcmxpZXN0U2xvdChtbXRFdmVudFN0YXJ0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgYnVpbGRpbkJ1c3lTbG90KG1tdEV2ZW50U3RhcnQ6IE1vbWVudCwgZXZlbnQ6IEV2ZW50KTogTW9tZW50IHtcbiAgICBjb25zdCBtbXRFdmVudEVuZCA9IG1vbWVudChldmVudC5lbmQsICdZWVlZLU1NLURESEg6bW0nKTtcbiAgICBpZiAoIW1tdEV2ZW50U3RhcnQgfHwgIW1tdEV2ZW50U3RhcnQuaXNWYWxpZCgpXG4gICAgICB8fCAhbW10RXZlbnRFbmQgfHwgIW1tdEV2ZW50RW5kLmlzVmFsaWQoKVxuICAgICAgfHwgIW1tdEV2ZW50U3RhcnQuaXNCZWZvcmUobW10RXZlbnRFbmQpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdpbnZhbGlkIGRhdGVzJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyogYnVpbGRpbmcgYnVzeSBzbG90cyBieSBldmVudHMqL1xuICAgIGNvbnN0IGV2ZW50c1RpbWVSYW5nZTogVHdpeEl0ZXIgPSBtbXRFdmVudFN0YXJ0LnR3aXgobW10RXZlbnRFbmQpLml0ZXJhdGUodGhpcy5zbG90RHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKGV2ZW50c1RpbWVSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHt0aW1lLCBtbXRUaW1lfSA9IENhbGVuZGFyQ29tcG9uZW50LnNwbGl0UmFuZ2VUb05leHRUaW1lKGV2ZW50c1RpbWVSYW5nZSwgdGhpcy5zbG90RHVyYXRpb24pO1xuICAgICAgLyogSUYgdGhlIGJ1c3kgc2xvdCBpcyBpbiBhdmFpbGFiaWxpdHkgYW5kIG5vdCBhbHJlYWR5IGluIGJ1c3lTbG9pdHMgd2UgY291bnQgaXQgKi9cbiAgICAgIGlmICh0aGlzLmRheXNBdmFpbGFiaWxpdHkgJiYgdGhpcy5kYXlzQXZhaWxhYmlsaXR5Lmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKVxuICAgICAgICAmJiAhdGhpcy5idXN5U2xvdHMuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSlcbiAgICAgICAgJiYgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmdldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKS5pbmRleE9mKHRpbWUuZm9ybWF0KCdISDptbScpKSA+PSAwKSB7XG4gICAgICAgIGxldCBkYXlCdXN5TnVtYmVyID0gdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpID9cbiAgICAgICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgOiAwO1xuICAgICAgICBkYXlCdXN5TnVtYmVyKys7XG4gICAgICAgIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLnNldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpLCBkYXlCdXN5TnVtYmVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYnVzeVNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgIH1cblxuICAgIHJldHVybiBtbXRFdmVudFN0YXJ0O1xuICB9XG5cbiAgYnVpbGRpbmdFYXJsaWVzdFNsb3QobW10RXZlbnRTdGFydDogTW9tZW50KSB7XG4gICAgLyogYnVpbGRpbmcgZWFybGllc3Qgc2xvdCBiZWZvcmUgZXZlbnQgKi9cbiAgICBjb25zdCBtbXRFYXJseVN0YXJ0ID0gbW10RXZlbnRTdGFydC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMudHJ1ZUR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIG1tdEVhcmx5U3RhcnQubWludXRlcyhtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAtXG4gICAgICAobW10RWFybHlTdGFydC5taW51dGVzKCkgJSB0aGlzLnNsb3REdXJhdGlvbikgKyB0aGlzLnNsb3REdXJhdGlvbik7XG4gICAgY29uc3QgZWFybGllc3RUaW1lUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlTdGFydC50d2l4KG1tdEV2ZW50U3RhcnQpLml0ZXJhdGUodGhpcy5zbG90RHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKGVhcmxpZXN0VGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3Qge3RpbWUsIG1tdFRpbWV9ID0gQ2FsZW5kYXJDb21wb25lbnQuc3BsaXRSYW5nZVRvTmV4dFRpbWUoZWFybGllc3RUaW1lUmFuZ2UsIHRoaXMuc2xvdER1cmF0aW9uKTtcbiAgICAgIC8qIElGIHRoZSBidXN5IHNsb3QgaXMgaW4gYXZhaWxhYmlsaXR5IGFuZCBub3QgYWxyZWFkeSBpbiBidXN5U2xvaXRzIHdlIGNvdW50IGl0ICovXG4gICAgICBpZiAodGhpcy5kYXlzQXZhaWxhYmlsaXR5ICYmIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSlcbiAgICAgICAgJiYgIXRoaXMuYnVzeVNsb3RzLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpXG4gICAgICAgICYmIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkuaW5kZXhPZih0aW1lLmZvcm1hdCgnSEg6bW0nKSkgPj0gMCkge1xuICAgICAgICBsZXQgZGF5QnVzeU51bWJlciA9IHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSA/XG4gICAgICAgICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuZ2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpIDogMDtcbiAgICAgICAgZGF5QnVzeU51bWJlcisrO1xuICAgICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5zZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSwgZGF5QnVzeU51bWJlcik7XG4gICAgICB9XG4gICAgICB0aGlzLmJ1c3lTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==