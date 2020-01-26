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
var moment = moment_;
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(cd, sessionService) {
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
    Object.defineProperty(CalendarComponent.prototype, "sessionsEntries", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sessionsEntries;
        },
        set: /**
         * @param {?} sessionsEntries
         * @return {?}
         */
        function (sessionsEntries) {
            if (sessionsEntries.length) {
                this._sessionsEntries = sessionsEntries;
            }
            this.loadCalendar();
        },
        enumerable: true,
        configurable: true
    });
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
     * @param {?} start
     * @param {?} end
     * @param {?} duration
     * @return {?}
     */
    CalendarComponent.geStartEndFromStartAndSessionDuration = /**
     * @param {?} start
     * @param {?} end
     * @param {?} duration
     * @return {?}
     */
    function (start, end, duration) {
        /** @type {?} */
        var eventsTimeRange = start.twix(end).iterate(duration, 'minutes');
        return {
            start: start,
            end: end
        };
    };
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
        this.loadCalendar();
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
        this.days = [];
        this.daysAvailability = new Map();
        this.sessionsSlots = new Set();
        this.sessionsEndSlots = new Set();
        this.earlySlots = new Set();
        this.pauseSlots = new Set();
        this.busySlots = new Set();
        this.daysBusySlotNumber = new Map();
        this.sessions = new Map();
        this.sessionService.sessions.next(this.sessions);
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
        this.start = moment(this.start).day(firstDay).startOf('day');
        this.end = moment(this.start).add(6, 'days').endOf('day');
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
    CalendarComponent.prototype.loadCalendar = /**
     * On start/viewMode changed, do a recalculate of init start, end
     * days, daysAvailability and viewMode
     * @return {?}
     */
    function () {
        this.setCalendar();
        this.setViewMode();
        this.setDateRange(this.start, this.end);
        this.loadEvents(this.start, this.end);
        this.loadAvailabilities();
    };
    /**
     * Add available days from start to end dates
     */
    /**
     * Add available days from start to end dates
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    CalendarComponent.prototype.setDateRange = /**
     * Add available days from start to end dates
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    function (start, end) {
        // Days range from start to end
        /** @type {?} */
        var daysRange = start
            .twix(end)
            .iterate(1, 'days');
        // Loading all days
        while (daysRange.hasNext()) {
            /** @type {?} */
            var availableDay = daysRange.next();
            this.days.push({
                title: availableDay.format('DD/MM/YYYY'),
                key: availableDay.format('YYYY-MM-DD'),
                value: moment(availableDay.toDate())
            });
            this.daysAvailability.set(availableDay.format('YYYY-MM-DD'), []);
        }
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
        this.loadCalendar();
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
        this.loadCalendar();
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
        this.sessionService.sessions.next(this.sessions);
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
        this.sessionService.sessions.next(this.sessions);
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
        this.realDuration = this.onlineSession.duration;
        // session day start 00:00 - end 23:59
        /** @type {?} */
        var onlineSessionStart = moment(this.onlineSession.start_date, 'YYYY-MM-DD').startOf('day');
        /** @type {?} */
        var onlineSessionEnd = moment(this.onlineSession.end_date, 'YYYY-MM-DD').endOf('day');
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
            var mmtDayStartTime = moment(day + _this.onlineSession.start_time, 'YYYY-MMDDHH:mm');
            // If session start time like 08:00 is before start today 00:00
            if (mmtDayStartTime.isBefore(moment().startOf('day'))) {
                return;
            }
            // booking delay
            /** @type {?} */
            var minMmtStartTime = moment().add(_this.onlineSession.booking_delay, 'hours');
            // session time end
            /** @type {?} */
            var mmtDayEndTime = moment(day + _this.onlineSession.end_time, 'YYYY-MM-DDHH:mm');
            mmtDayEndTime.subtract(_this.realDuration, 'minutes');
            // slots iterator
            /** @type {?} */
            var timeRange = mmtDayStartTime.twix(mmtDayEndTime)
                .iterate(_this.onlineSession.duration, 'minutes');
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
        var timeInnerRange = mmtStart.twix(mmtEnd).iterateInner(session.duration, 'minutes');
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
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % session.duration) + session.duration);
        /** @type {?} */
        var timeEarlierRange = mmtEarlyStart.twix(mmtStart).iterate(session.duration, 'minutes');
        while (timeEarlierRange.hasNext()) {
            /** @type {?} */
            var time = timeEarlierRange.next();
            /** @type {?} */
            var mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.duration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                this.earlySlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* building pause slots after event */
        /** @type {?} */
        var mmtEarlyEnd = mmtEnd.clone();
        mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.duration);
        /** @type {?} */
        var mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
        /** @type {?} */
        var timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.duration, 'minutes');
        while (timePauseRange.hasNext()) {
            /** @type {?} */
            var time = timePauseRange.next();
            /** @type {?} */
            var mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.duration);
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
        var timeInnerRange = mmtStart.twix(mmtEnd).iterate(session.duration, 'minutes');
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
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % session.duration) + session.duration);
        /** @type {?} */
        var timeEarlyRange = mmtEarlyStart.twix(mmtStart).iterate(session.duration, 'minutes');
        while (timeEarlyRange.hasNext()) {
            /** @type {?} */
            var time = timeEarlyRange.next();
            /** @type {?} */
            var mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.duration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                this.earlySlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* removing pause slots */
        if (session.pause) {
            /** @type {?} */
            var mmtEarlyEnd = mmtEnd.clone();
            mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.duration);
            /** @type {?} */
            var mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
            /** @type {?} */
            var timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.duration, 'minutes');
            while (timePauseRange.hasNext()) {
                /** @type {?} */
                var time = timePauseRange.next();
                /** @type {?} */
                var mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.duration);
                if (mmtTime.isSameOrAfter(mmtEarlyEnd) && mmtTime.isBefore(mmtPauseEnd)) {
                    this.pauseSlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
                }
            }
        }
    };
    /************************************************
     ******************* Date functions **************
     ************************************************
     */
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
        if (!this.onlineSession) {
            return;
        }
        if (Array.isArray(this._sessionsEntries) && this._sessionsEntries.length) {
            this._sessionsEntries.forEach((/**
             * @param {?} session
             * @return {?}
             */
            function (session) {
                if (moment(session.start).isSameOrAfter(start) &&
                    moment(session.end).isSameOrBefore(end)) {
                    /** @type {?} */
                    var mmtEventStart = moment(session.start, 'YYYY-MM-DDHH:mm');
                    mmtEventStart = _this.buildinBusySlot(mmtEventStart, session);
                    _this.buildingEarliestSlot(mmtEventStart);
                }
            }));
        }
    };
    /**
     * Slot locked
     */
    /**
     * Slot locked
     * @param {?} mmtEventStart
     * @param {?} session
     * @return {?}
     */
    CalendarComponent.prototype.buildinBusySlot = /**
     * Slot locked
     * @param {?} mmtEventStart
     * @param {?} session
     * @return {?}
     */
    function (mmtEventStart, session) {
        /** @type {?} */
        var mmtEventEnd = moment(session.end, 'YYYY-MM-DDHH:mm');
        if (!mmtEventStart || !mmtEventStart.isValid()
            || !mmtEventEnd || !mmtEventEnd.isValid()
            || !mmtEventStart.isSameOrBefore(mmtEventEnd)) {
            console.error('invalid dates', session.end, mmtEventStart, mmtEventEnd);
            return null;
        }
        /* building busy slots by events */
        /** @type {?} */
        var eventsTimeRange = mmtEventStart.twix(mmtEventEnd).iterate(session.duration, 'minutes');
        while (eventsTimeRange.hasNext()) {
            var _a = CalendarComponent.splitRangeToNextTime(eventsTimeRange, session.duration), time = _a.time, mmtTime = _a.mmtTime;
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
                        function (c) { return c.id; })).includes(this.customer.id)))) {
                    /** @type {?} */
                    var dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
                        this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
                    dayBusyNumber++;
                    this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
                    this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
                }
                if (session.customers && this.customer && session.customers.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.id; })).includes(this.customer.id)) {
                    this.sessionsSlots.add(time.format('YYYY-MM-DDHH:mm'));
                    this.setSessionSlot(eventsTimeRange, time, session);
                }
            }
        }
        this.sessionService.sessions.next(this.sessions);
        return mmtEventStart;
    };
    /**
     * Build in sessions Map only start session with its session
     * @param eventsTimeRange
     * @param time
     * @param session
     */
    /**
     * Build in sessions Map only start session with its session
     * @param {?} eventsTimeRange
     * @param {?} time
     * @param {?} session
     * @return {?}
     */
    CalendarComponent.prototype.setSessionSlot = /**
     * Build in sessions Map only start session with its session
     * @param {?} eventsTimeRange
     * @param {?} time
     * @param {?} session
     * @return {?}
     */
    function (eventsTimeRange, time, session) {
        this.sessions.set(time.format('YYYY-MM-DDHH:mm'), session);
        if (!eventsTimeRange.hasNext()) {
            this.sessionsEndSlots.add(time.format('YYYY-MM-DDHH:mm'));
        }
    };
    /**
     * Slot before availability range
     */
    /**
     * Slot before availability range
     * @param {?} mmtEventStart
     * @return {?}
     */
    CalendarComponent.prototype.buildingEarliestSlot = /**
     * Slot before availability range
     * @param {?} mmtEventStart
     * @return {?}
     */
    function (mmtEventStart) {
        if (!mmtEventStart || !this.realDuration) {
            return;
        }
        /* building earliest slot before event */
        /** @type {?} */
        var mmtEarlyStart = mmtEventStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % this.onlineSession.duration) + this.onlineSession.duration);
        /** @type {?} */
        var earliestTimeRange = mmtEarlyStart.twix(mmtEventStart).iterate(this.onlineSession.duration, 'minutes');
        while (earliestTimeRange.hasNext()) {
            var _a = CalendarComponent.splitRangeToNextTime(earliestTimeRange, this.onlineSession.duration), time = _a.time, mmtTime = _a.mmtTime;
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
                    template: "<div class=\"week-calendar-wrapper\">\n  <div class=\"week-calendar-header\">\n\n\n    <div class=\"week-calendar-title\">\n\n\n      <lib-calendar-header [start]=\"start\"\n                           [end]=\"end\"\n                           [headerConfiguration]=\"calendarConfiguration\"\n                           [viewMode]=\"viewMode\"\n                           (switchedView)=\"onSwithedView($event)\"\n                           (startChanged)=\"onStartChanged($event)\"></lib-calendar-header>\n\n    </div>\n\n  </div>\n\n  <div>\n\n\n    <lib-calendar-body [bodyConfiguration]=\"calendarConfiguration\"\n                       [onlineSession]=\"onlineSession\"\n                       [days]=\"days\"\n                       [viewMode]=\"viewMode\"\n                       [start]=\"start\"\n                       [end]=\"end\"\n                       [daysAvailability]=\"daysAvailability\"\n                       [daysBusySlotNumber]=\"daysBusySlotNumber\"\n                       [daysAvailabilitySlotNumber]=\"daysAvailabilitySlotNumber\"\n                       [busySlots]=\"busySlots\"\n                       [user]=\"user\"\n                       [customer]=\"customer\"\n                       [earlySlots]=\"earlySlots\"\n                       [pauseSlots]=\"pauseSlots\"\n                       [sessionsSlots]=\"sessionsSlots\"\n                       [sessionsEndSlots]=\"sessionsEndSlots\"\n                       (startChanged)=\"onStartChanged($event)\"\n                       (sessionAdded)=\"onSessionAdded($event)\"\n                       (sessionRemoved)=\"onSessionRemoved($event)\"\n                       *ngIf=\"start && end && days && viewMode\"></lib-calendar-body>\n\n  </div>\n</div>\n",
                    styles: [".week-calendar-wrapper .week-calendar-header{padding-bottom:20px}@media (min-width:768px){.week-calendar-wrapper .week-calendar-header .week-calendar-title{width:90vw}}"]
                }] }
    ];
    /** @nocollapse */
    CalendarComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: SessionService }
    ]; };
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
    return CalendarComponent;
}());
export { CalendarComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEdBQUcsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFHbEMsT0FBTyxNQUFNLENBQUM7QUFLZCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0lBRTdELE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBbUlFLDJCQUFvQixFQUFxQixFQUNyQixjQUE4QjtRQUQ5QixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7Ozs7UUFqSHpDLGtCQUFhLEdBQWtCO1lBQ3RDLEVBQUUsRUFBRSxJQUFJO1lBQ1IsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLEVBQUUsRUFBRTtZQUNSLFdBQVcsRUFBRSxDQUFDO1lBQ2QsYUFBYSxFQUFFLENBQUM7WUFDaEIsUUFBUSxFQUFFLEVBQUU7WUFDWixLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxFQUFFO1lBQ1QsVUFBVSxFQUFFLFlBQVk7WUFDeEIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsVUFBVSxFQUFFLE9BQU87WUFDbkIsUUFBUSxFQUFFLE9BQU87U0FDbEIsQ0FBQzs7OztRQUlPLFVBQUssR0FBVyxNQUFNLEVBQUUsQ0FBQzs7OztRQUl6QixRQUFHLEdBQVcsTUFBTSxFQUFFLENBQUM7Ozs7UUFJdkIsMEJBQXFCLEdBQTBCO1lBQ3RELFFBQVEsRUFBRTtnQkFDUixHQUFHLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsUUFBUSxFQUFF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O2FBQ3ZFO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7U0FDcEQ7SUFDSCxDQUFDOztnQkEzaEJGLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLGNBQWM7O29CQUV4QixpdERBQXdDOztpQkFFekM7Ozs7Z0JBbkJRLGlCQUFpQjtnQkFTakIsY0FBYzs7O3VCQWVwQixLQUFLOzJCQUlMLEtBQUs7Z0NBSUwsS0FBSzt3QkFpQkwsS0FBSztzQkFJTCxLQUFLO3dDQUlMLEtBQUs7a0NBeUJMLE1BQU07aUNBSU4sTUFBTTtpQ0FJTixNQUFNO2tDQW1FTixLQUFLOzJCQWNMLEtBQUs7O0lBOFhSLHdCQUFDO0NBQUEsQUE1aEJELElBNGhCQztTQXJoQlksaUJBQWlCOzs7Ozs7SUFJNUIsaUNBQW1COzs7OztJQUluQixxQ0FBdUI7Ozs7O0lBSXZCLDBDQWFFOzs7OztJQUlGLGtDQUFrQzs7Ozs7SUFJbEMsZ0NBQWdDOzs7OztJQUloQyxrREFxQkU7Ozs7O0lBSUYsNENBQTZFOzs7OztJQUk3RSwyQ0FBOEU7Ozs7O0lBSTlFLDJDQUE4RTs7Ozs7SUFJOUUsaUNBQXNCOzs7OztJQUl0Qix5Q0FBcUI7Ozs7O0lBSXJCLDZDQUF3Qzs7Ozs7SUFJeEMsK0NBQXdDOzs7OztJQUl4Qyx1REFBZ0Q7Ozs7O0lBSWhELHNDQUF1Qjs7Ozs7SUFJdkIsdUNBQXdCOzs7OztJQUl4Qix1Q0FBd0I7Ozs7O0lBSXhCLDBDQUEyQjs7Ozs7SUFJM0IsNkNBQThCOzs7OztJQUk5QixxQ0FBK0I7Ozs7OztJQUkvQiwwQ0FBOEI7Ozs7OztJQUk5Qix3Q0FBNEI7Ozs7O0lBUzVCLDZDQUFpQzs7SUFjakMsc0NBQW1COzs7OztJQXJCUCwrQkFBNkI7Ozs7O0lBQzdCLDJDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IFR3aXgsIFR3aXhJdGVyIH0gZnJvbSAndHdpeCc7XG5pbXBvcnQgJ3R3aXgnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL2NvbmZpZ3VyYXRpb24vY2FsZW5kYXItY29uZmlndXJhdGlvbic7XG5pbXBvcnQgeyBEYXkgfSBmcm9tICcuLi9zaGFyZWQvZGF5L2RheSc7XG5pbXBvcnQgeyBPbmxpbmVTZXNzaW9uIH0gZnJvbSAnLi4vc2hhcmVkL3Nlc3Npb24vb25saW5lLXNlc3Npb24nO1xuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gJy4uL3NoYXJlZC9zZXNzaW9uL3Nlc3Npb24nO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGVcbiAgc2VsZWN0b3I6ICduZ3gtY2FsZW5kYXInLFxuICAvLyB0c2xpbnQ6ZW5hYmxlXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAvKipcbiAgICogVXNlciBjb3VsZCBiZSBwYXNzZWQgdG8gc2hvdyB0aGUgb3duZXJcbiAgICovXG4gIEBJbnB1dCgpIHVzZXI6IGFueTtcbiAgLyoqXG4gICAqIEN1c3RvbWVyIGNvdWxkIGJlIHBhc3NlZCB0byBnZW5lcmF0ZSBhIHBlcnNvbmFsIGNhbGVuZGFyXG4gICAqL1xuICBASW5wdXQoKSBjdXN0b21lcjogYW55O1xuICAvKipcbiAgICogT25saW5lIHNlc3Npb25zIGRlZmluaXRpb25cbiAgICovXG4gIEBJbnB1dCgpIG9ubGluZVNlc3Npb246IE9ubGluZVNlc3Npb24gPSB7XG4gICAgaWQ6IG51bGwsXG4gICAgY29tbWVudDogJycsXG4gICAgbmFtZTogJycsXG4gICAgbWF4X3BlcnNvbnM6IDEsXG4gICAgYm9va2luZ19kZWxheTogMSxcbiAgICBkdXJhdGlvbjogMTUsXG4gICAgcGF1c2U6IDAsXG4gICAgcHJpY2U6IDEwLFxuICAgIHN0YXJ0X2RhdGU6ICcyMDE5LTAxLTAxJyxcbiAgICBlbmRfZGF0ZTogJzIwMzAtMTItMzEnLFxuICAgIHN0YXJ0X3RpbWU6ICcwODowMCcsXG4gICAgZW5kX3RpbWU6ICcxOTowMCdcbiAgfTtcbiAgLyoqXG4gICAqIFN0YXJ0IGRheSBvZiBjYWxlbmRhciAoY291bGQgYmUgdXBkYXRlZClcbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0OiBNb21lbnQgPSBtb21lbnQoKTtcbiAgLyoqXG4gICAqIEVuZCBkYXkgb2YgY2FsZW5kYXIgKGNvdWxkIGJlIHVwZGF0ZWQgYnV0IHJlZXdyaXRlbiBvbiBzd2l0Y2ggd2VlayBtb2RlXG4gICAqL1xuICBASW5wdXQoKSBlbmQ6IE1vbWVudCA9IG1vbWVudCgpO1xuICAvKipcbiAgICogQ29uZmlndXJhdGlvbiBjYWxlbmRhclxuICAgKi9cbiAgQElucHV0KCkgY2FsZW5kYXJDb25maWd1cmF0aW9uOiBDYWxlbmRhckNvbmZpZ3VyYXRpb24gPSB7XG4gICAgY2FsZW5kYXI6IHtcbiAgICAgIGN0YToge1xuICAgICAgICBuZXh0OiAnc3VpdmFudCcsXG4gICAgICAgIHByZXZpb3VzOiAncHLDqWPDqWRlbnQnLFxuICAgICAgfSxcbiAgICAgIHRvZGF5OiAnYXVqb3VyZFxcJ2h1aScsXG4gICAgICBiYWNrX3RvZGF5OiAncmV2ZW5pciDDoCBsYSBkYXRlIGRcXCdhdWpvdXJkXFwnaHVpJyxcbiAgICAgIGRheTogJ2pvdXInLFxuICAgICAgdGhyZWVfZGF5czogJzMgam91cnMnLFxuICAgICAgd2VlazogJ3NlbWFpbmUnLFxuICAgICAgdGl0bGU6ICdyw6lzZXJ2ZXIgdm90cmUgY3LDqW5lYXUnLFxuICAgICAgc3VidGl0bGU6ICd0b3V0ZXMgbGVzIGRpc3BvbmliaWxpdMOpcycsXG4gICAgICBhdmFpbGFiaWxpdHk6IHtcbiAgICAgICAgZW1wdHk6ICdBdWN1bmUgZGlzcG9uaWJpbGl0w6knLFxuICAgICAgICBzbG90OiAnUHJvY2hhaW5lIGRpc3BvbmliaWxpdMOpJyxcbiAgICAgIH0sXG4gICAgICBzZXNzaW9uOiB7XG4gICAgICAgIGluZm86ICdDcsOpbmVhdSB2w6lycm91aWxsw6knXG4gICAgICB9XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogV2hlbiB1c2VyIHN3aGl0Y2ggdmlldyBtb2RlIGV2ZW50XG4gICAqL1xuICBAT3V0cHV0KCkgdmlld01vZGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAvKipcbiAgICogU2Vzc2lvbiBjcmVhdGVkIGV2ZW50XG4gICAqL1xuICBAT3V0cHV0KCkgc2Vzc2lvbkNyZWF0ZWQ6IEV2ZW50RW1pdHRlcjxTZXNzaW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4oKTtcbiAgLyoqXG4gICAqIFNlc3Npb24gcmVtb3ZlZCBldmVudFxuICAgKi9cbiAgQE91dHB1dCgpIHNlc3Npb25SZW1vdmVkOiBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlc3Npb24+KCk7XG4gIC8qKlxuICAgKiBBcnJheSBvZiBzZWxlY3RhYmxlIGRheXMgZnJvbSBzdGFydCB0byBlbmRcbiAgICovXG4gIGRheXM6IEFycmF5PERheT4gPSBbXTtcbiAgLyoqXG4gICAqIFNsb3QgRHVyYXRpb24gaW4gbWludXRlc1xuICAgKi9cbiAgcmVhbER1cmF0aW9uOiBudW1iZXI7XG4gIC8qKlxuICAgKiBEdXJpbmcgZGF5cyBmcm9tIHN0YXJ0IHRvIGVuZCwgbGlzdCBvZiBlbnRyaWVzIHRoYXQgYXZhaWxhYmxlXG4gICAqL1xuICBkYXlzQXZhaWxhYmlsaXR5OiBNYXA8c3RyaW5nLCBzdHJpbmdbXT47XG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgYnVzeSBzbG90IGluIGVhY2ggZGF5XG4gICAqL1xuICBkYXlzQnVzeVNsb3ROdW1iZXI6IE1hcDxzdHJpbmcsIG51bWJlcj47XG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgYXZhaWxhYmxlIHNsb3QgaW4gZWFjaCBkYXlcbiAgICovXG4gIGRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyOiBNYXA8c3RyaW5nLCBudW1iZXI+O1xuICAvKipcbiAgICogU2V0IG9mIGRhdGV0aW1lIHdobyByZXByZW5zZW50cyBhdmFpbGFiaWxpdHlcbiAgICovXG4gIGJ1c3lTbG90czogU2V0PHN0cmluZz47XG4gIC8qKlxuICAgKiBzZXQgb2YgZGF0ZXRpbWUgd2hvIHJlcHJlc2VudHMgb3ZlciBleHRlbmRzIGJ1c3kgc2xvdFxuICAgKi9cbiAgZWFybHlTbG90czogU2V0PHN0cmluZz47XG4gIC8qKlxuICAgKiBzZXQgb2YgZGF0ZXRpbWUgd2hvIHJlcHJlc2VudHMgcGF1c2Ugc2xvdFxuICAgKi9cbiAgcGF1c2VTbG90czogU2V0PHN0cmluZz47XG4gIC8qKlxuICAgKiBzZXQgb2YgZGF0ZXRpbWUgd2hvIHJlcHJlc2VudHMgc2Vzc2lvbiBzbG90XG4gICAqL1xuICBzZXNzaW9uc1Nsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIHNldCBvZiBkYXRldGltZSB3aG8gcmVwcmVzZW50cyBlbmQgc2xvdCAobm90IHVzZWQgaW4gZnJvbnQpXG4gICAqL1xuICBzZXNzaW9uc0VuZFNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIE1hcCBvZiBzZXNzaW9ucyBmcm9tIGN1cnJlbnQgdXNlclxuICAgKi9cbiAgc2Vzc2lvbnM6IE1hcDxzdHJpbmcsIFNlc3Npb24+O1xuICAvKipcbiAgICogY2FsZW5kYXIgc3RhcnQgZGF5IGFmdGVyIHNldCBmdWxsIGNhbGVuZGFyIGluZm9ybWF0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBjYWxlbmRhclN0YXJ0OiBNb21lbnQ7XG4gIC8qKlxuICAgKiBjYWxlbmRhciBlbmQgZGF5IGFmdGVyIHNldCBmdWxsIGNhbGVuZGFyIGluZm9ybWF0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBjYWxlbmRhckVuZDogTW9tZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSkge1xuICB9XG5cbiAgLyoqXG4gICAqIFNlc3Npb25zIGFycmF5IGxvYWRlZCBieSBwYXJlbnQgY29tcG9uZW50XG4gICAqL1xuICBfc2Vzc2lvbnNFbnRyaWVzOiBTZXNzaW9uW10gPSBbXTtcblxuICBnZXQgc2Vzc2lvbnNFbnRyaWVzKCk6IFNlc3Npb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb25zRW50cmllcztcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzZXNzaW9uc0VudHJpZXMoc2Vzc2lvbnNFbnRyaWVzOiBTZXNzaW9uW10pIHtcbiAgICBpZiAoc2Vzc2lvbnNFbnRyaWVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fc2Vzc2lvbnNFbnRyaWVzID0gc2Vzc2lvbnNFbnRyaWVzO1xuICAgIH1cbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBWaWV3IE1vZGUgb2YgV2VlayBDb21wb25lbnRcbiAgX3ZpZXdNb2RlID0gJ3dlZWsnO1xuXG4gIGdldCB2aWV3TW9kZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl92aWV3TW9kZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB2aWV3TW9kZSh2aWV3TW9kZSkge1xuICAgIHRoaXMuX3ZpZXdNb2RlID0gdmlld01vZGU7XG4gICAgdGhpcy5zZXRWaWV3TW9kZSgpO1xuICB9XG5cbiAgc3RhdGljIHNwbGl0UmFuZ2VUb05leHRUaW1lKHNsb3RUaW1lUmFuZ2U6IFR3aXhJdGVyLCBzbG90RHVyYXRpb246IG51bWJlcik6IHt0aW1lOiBUd2l4LCBtbXRUaW1lOiBNb21lbnR9IHtcbiAgICBjb25zdCB0aW1lOiBUd2l4ID0gc2xvdFRpbWVSYW5nZS5uZXh0KCk7XG4gICAgcmV0dXJuIHt0aW1lLCBtbXRUaW1lOiBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHNsb3REdXJhdGlvbil9O1xuICB9XG5cbiAgc3RhdGljIGdldE1pbnV0ZXNEaWZmZXJlbmNlKG1tdFRpbWU6IE1vbWVudCwgc2xvdER1cmF0aW9uOiBudW1iZXIpOiBNb21lbnQge1xuICAgIGlmIChtbXRUaW1lLm1pbnV0ZXMoKSAlIHNsb3REdXJhdGlvbiAhPT0gMCkge1xuICAgICAgbW10VGltZS5taW51dGVzKG1tdFRpbWUubWludXRlcygpIC0gKG1tdFRpbWUubWludXRlcygpICUgc2xvdER1cmF0aW9uKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1tdFRpbWU7XG4gIH1cblxuICBzdGF0aWMgZ2VTdGFydEVuZEZyb21TdGFydEFuZFNlc3Npb25EdXJhdGlvbihzdGFydDogTW9tZW50LCBlbmQ6IE1vbWVudCwgZHVyYXRpb246IG51bWJlcik6IHtzdGFydDogTW9tZW50LCBlbmQ6IE1vbWVudH0ge1xuICAgIGNvbnN0IGV2ZW50c1RpbWVSYW5nZTogVHdpeEl0ZXIgPSBzdGFydC50d2l4KGVuZCkuaXRlcmF0ZShkdXJhdGlvbiwgJ21pbnV0ZXMnKTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdGFydCxcbiAgICAgIGVuZFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogSW5zcGVjdCBhbGwgY2hhbmdlc1xuICAgKi9cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5sb2FkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgRGVmYXVsdCB2YXJpYWJsZXNcbiAgICovXG4gIHNldENhbGVuZGFyKCkge1xuICAgIHRoaXMuZGF5cyA9IFtdO1xuICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eSA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLnNlc3Npb25zU2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuZWFybHlTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLnBhdXNlU2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5idXN5U2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5zZXNzaW9ucyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLnNlc3Npb25zLm5leHQodGhpcy5zZXNzaW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFZpZXcgTW9kZSB3aXRoIHdlZWssIGRheSwgMyBkYXlzXG4gICAqIEluaXQgc3RhcnQsIGVuZCxcbiAgICpcbiAgICovXG4gIHNldFZpZXdNb2RlKCkge1xuICAgIGlmICh0aGlzLnZpZXdNb2RlID09PSAnZGF5Jykge1xuICAgICAgdGhpcy5lbmQgPSB0aGlzLnN0YXJ0O1xuICAgICAgdGhpcy5jYWxlbmRhclN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLnN0YXJ0T2YoJ2RheScpO1xuICAgICAgdGhpcy5jYWxlbmRhckVuZCA9IG1vbWVudCh0aGlzLmVuZCkuZW5kT2YoJ2RheScpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3RocmVlX2RheXMnKSB7XG4gICAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoMiwgJ2RheXMnKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdGFydE9mKCdkYXknKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJFbmQgPSBtb21lbnQodGhpcy5lbmQpLmVuZE9mKCdkYXknKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gSW5pdCBmaXJzdCBkYXkgd2VlayBudW1iZXJcbiAgICBjb25zdCBmaXJzdERheSA9IDA7XG4gICAgLy8gSWYgZW1wdHkgc3RhcnQgZGF0ZSB0aGVuIHN0YXJ0IHRvIHRvZGF5XG4gICAgaWYgKCF0aGlzLnN0YXJ0KSB7XG4gICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KCk7XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuZGF5KGZpcnN0RGF5KS5zdGFydE9mKCdkYXknKTtcbiAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoNiwgJ2RheXMnKS5lbmRPZignZGF5Jyk7XG5cbiAgICB0aGlzLmNhbGVuZGFyU3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuc3RhcnRPZignZGF5Jyk7XG4gICAgdGhpcy5jYWxlbmRhckVuZCA9IG1vbWVudCh0aGlzLmVuZCkuZW5kT2YoJ2RheScpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHN0YXJ0L3ZpZXdNb2RlIGNoYW5nZWQsIGRvIGEgcmVjYWxjdWxhdGUgb2YgaW5pdCBzdGFydCwgZW5kXG4gICAqIGRheXMsIGRheXNBdmFpbGFiaWxpdHkgYW5kIHZpZXdNb2RlXG4gICAqL1xuICBsb2FkQ2FsZW5kYXIoKSB7XG4gICAgdGhpcy5zZXRDYWxlbmRhcigpO1xuICAgIHRoaXMuc2V0Vmlld01vZGUoKTtcbiAgICB0aGlzLnNldERhdGVSYW5nZSh0aGlzLnN0YXJ0LCB0aGlzLmVuZCk7XG4gICAgdGhpcy5sb2FkRXZlbnRzKHRoaXMuc3RhcnQsIHRoaXMuZW5kKTtcbiAgICB0aGlzLmxvYWRBdmFpbGFiaWxpdGllcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhdmFpbGFibGUgZGF5cyBmcm9tIHN0YXJ0IHRvIGVuZCBkYXRlc1xuICAgKi9cbiAgc2V0RGF0ZVJhbmdlKHN0YXJ0OiBNb21lbnQsIGVuZDogTW9tZW50KSB7XG4gICAgLy8gRGF5cyByYW5nZSBmcm9tIHN0YXJ0IHRvIGVuZFxuICAgIGNvbnN0IGRheXNSYW5nZTogVHdpeEl0ZXIgPSBzdGFydFxuICAgICAgLnR3aXgoZW5kKVxuICAgICAgLml0ZXJhdGUoMSwgJ2RheXMnKTtcbiAgICAvLyBMb2FkaW5nIGFsbCBkYXlzXG4gICAgd2hpbGUgKGRheXNSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZURheTogVHdpeCA9IGRheXNSYW5nZS5uZXh0KCk7XG4gICAgICB0aGlzLmRheXMucHVzaCh7XG4gICAgICAgIHRpdGxlOiBhdmFpbGFibGVEYXkuZm9ybWF0KCdERC9NTS9ZWVlZJyksXG4gICAgICAgIGtleTogYXZhaWxhYmxlRGF5LmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgICB2YWx1ZTogbW9tZW50KGF2YWlsYWJsZURheS50b0RhdGUoKSlcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LnNldChhdmFpbGFibGVEYXkuZm9ybWF0KCdZWVlZLU1NLUREJyksIFtdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT24gc3dpdGNoIGRhdGUgcmFuZ2VcbiAgICovXG4gIG9uU3dpdGhlZFZpZXcodmlld01vZGU6IHN0cmluZykge1xuICAgIHRoaXMudmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLnZpZXdNb2RlQ2hhbmdlZC5lbWl0KHZpZXdNb2RlKTtcbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHN0YXJ0IGNoYW5nZSBldmVudFxuICAgKi9cbiAgb25TdGFydENoYW5nZWQoc3RhcnQ6IE1vbWVudCkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHNlc3Npb24gYWRkZWQgb24gY2xpY2sgZXZlbnRcbiAgICovXG4gIG9uU2Vzc2lvbkFkZGVkKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICB0aGlzLnNlc3Npb25zLnNldChtb21lbnQoc2Vzc2lvbi5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSwgc2Vzc2lvbik7XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5zZXNzaW9ucy5uZXh0KHRoaXMuc2Vzc2lvbnMpO1xuICAgIHRoaXMuYWRkU2Vzc2lvbihzZXNzaW9uKTtcbiAgICB0aGlzLnNlc3Npb25DcmVhdGVkLmVtaXQoc2Vzc2lvbik7XG4gIH1cblxuICAvKipcbiAgICogT24gcmVtb3ZlZCBldmVudFxuICAgKi9cbiAgb25TZXNzaW9uUmVtb3ZlZChzb3VyY2U6IHtrZXk6IHN0cmluZywgc2Vzc2lvbjogU2Vzc2lvbn0pIHtcbiAgICB0aGlzLnNlc3Npb25zLmRlbGV0ZShzb3VyY2Uua2V5KTtcbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLnNlc3Npb25zLm5leHQodGhpcy5zZXNzaW9ucyk7XG4gICAgdGhpcy5yZW1vdmVTZXNzaW9uKHNvdXJjZS5zZXNzaW9uKTtcbiAgICB0aGlzLnNlc3Npb25SZW1vdmVkLmVtaXQoc291cmNlLnNlc3Npb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgYWxsIHRpbWUgZm9yIGVhY2ggZGF5c1xuICAgKi9cbiAgbG9hZEF2YWlsYWJpbGl0aWVzKCkge1xuICAgIC8vIG5vIG9ubGluZSBzZXNzaW9uIG5vIGNhbGVuZGFyXG4gICAgaWYgKCF0aGlzLmRheXNBdmFpbGFiaWxpdHkgfHwgIXRoaXMub25saW5lU2Vzc2lvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBzZXNzaW9uIGR1cmF0aW9uXG4gICAgdGhpcy5yZWFsRHVyYXRpb24gPSB0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb247XG4gICAgLy8gc2Vzc2lvbiBkYXkgc3RhcnQgMDA6MDAgLSBlbmQgMjM6NTlcbiAgICBjb25zdCBvbmxpbmVTZXNzaW9uU3RhcnQ6IE1vbWVudCA9IG1vbWVudCh0aGlzLm9ubGluZVNlc3Npb24uc3RhcnRfZGF0ZSwgJ1lZWVktTU0tREQnKS5zdGFydE9mKCdkYXknKTtcbiAgICBjb25zdCBvbmxpbmVTZXNzaW9uRW5kOiBNb21lbnQgPSBtb21lbnQodGhpcy5vbmxpbmVTZXNzaW9uLmVuZF9kYXRlLCAnWVlZWS1NTS1ERCcpLmVuZE9mKCdkYXknKTtcbiAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5mb3JFYWNoKChhdmJzLCBkYXkpID0+IHtcbiAgICAgIGxldCBzbG90c051bWJlciA9IDA7XG4gICAgICAvLyBlYWNoIGRheSBvZiBkYXlzIGF2YWlsYWJpbGl0eSB3aXRoIHN0YXJ0IHRpbWUgMDg6MDBcbiAgICAgIGNvbnN0IG1tdERheSA9IG1vbWVudChkYXksICdZWVlZLU1NLUREJykuaG91cig4KTtcbiAgICAgIGNvbnN0IG1tdERheVN0YXJ0VGltZSA9IG1vbWVudChkYXkgKyB0aGlzLm9ubGluZVNlc3Npb24uc3RhcnRfdGltZSwgJ1lZWVktTU1EREhIOm1tJyk7XG5cbiAgICAgIC8vIElmIHNlc3Npb24gc3RhcnQgdGltZSBsaWtlIDA4OjAwIGlzIGJlZm9yZSBzdGFydCB0b2RheSAwMDowMFxuICAgICAgaWYgKG1tdERheVN0YXJ0VGltZS5pc0JlZm9yZShtb21lbnQoKS5zdGFydE9mKCdkYXknKSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gYm9va2luZyBkZWxheVxuICAgICAgY29uc3QgbWluTW10U3RhcnRUaW1lID0gbW9tZW50KCkuYWRkKHRoaXMub25saW5lU2Vzc2lvbi5ib29raW5nX2RlbGF5LCAnaG91cnMnKTtcbiAgICAgIC8vIHNlc3Npb24gdGltZSBlbmRcbiAgICAgIGNvbnN0IG1tdERheUVuZFRpbWUgPSBtb21lbnQoZGF5ICsgdGhpcy5vbmxpbmVTZXNzaW9uLmVuZF90aW1lLCAnWVlZWS1NTS1EREhIOm1tJyk7XG4gICAgICBtbXREYXlFbmRUaW1lLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgLy8gc2xvdHMgaXRlcmF0b3JcbiAgICAgIGNvbnN0IHRpbWVSYW5nZTogVHdpeEl0ZXIgPSBtbXREYXlTdGFydFRpbWUudHdpeChtbXREYXlFbmRUaW1lKVxuICAgICAgICAuaXRlcmF0ZSh0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgICBpZiAodGhpcy5jYWxlbmRhclN0YXJ0ICYmIHRoaXMuY2FsZW5kYXJFbmQgJiYgbW10RGF5LmlzQmV0d2VlbihvbmxpbmVTZXNzaW9uU3RhcnQsIG9ubGluZVNlc3Npb25FbmQpKSB7XG4gICAgICAgIHdoaWxlICh0aW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVSYW5nZS5uZXh0KCk7XG4gICAgICAgICAgY29uc3QgdGltZU1tdDogTW9tZW50ID0gbW9tZW50KHRpbWUudG9EYXRlKCkpO1xuICAgICAgICAgIGlmICghdGltZU1tdC5pc0JlZm9yZShtaW5NbXRTdGFydFRpbWUpKSB7XG4gICAgICAgICAgICBhdmJzLnB1c2godGltZS5mb3JtYXQoJ0hIOm1tJykpO1xuICAgICAgICAgICAgc2xvdHNOdW1iZXIrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXIuc2V0KGRheSwgc2xvdHNOdW1iZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBzZXNzaW9uIGV2ZW50IGluIGNhbGVuZGFyXG4gICAqL1xuICBhZGRTZXNzaW9uKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICBjb25zdCBtbXRTdGFydCA9IG1vbWVudChzZXNzaW9uLnN0YXJ0KTtcbiAgICBjb25zdCBtbXRFbmQgPSBtb21lbnQoc2Vzc2lvbi5lbmQpO1xuICAgIGNvbnN0IHRpbWVJbm5lclJhbmdlOiBUd2l4SXRlciA9IG1tdFN0YXJ0LnR3aXgobW10RW5kKS5pdGVyYXRlSW5uZXIoc2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUlubmVyUmFuZ2UubmV4dCgpO1xuICAgICAgdGhpcy5zZXNzaW9uc1Nsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgaWYgKCF0aW1lSW5uZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBidWlsZGluZyBlYXJsaWVzdCBzbG90IGJlZm9yZSBldmVudCAqL1xuICAgIGNvbnN0IG1tdEVhcmx5U3RhcnQgPSBtbXRTdGFydC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIG1tdEVhcmx5U3RhcnQubWludXRlcyhcbiAgICAgIG1tdEVhcmx5U3RhcnQubWludXRlcygpIC1cbiAgICAgIChtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAlIHNlc3Npb24uZHVyYXRpb24pICsgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgY29uc3QgdGltZUVhcmxpZXJSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseVN0YXJ0LnR3aXgobW10U3RhcnQpLml0ZXJhdGUoc2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUVhcmxpZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lRWFybGllclJhbmdlLm5leHQoKTtcbiAgICAgIGNvbnN0IG1tdFRpbWU6IE1vbWVudCA9IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgICBpZiAobW10VGltZS5pc1NhbWVPckFmdGVyKG1tdEVhcmx5U3RhcnQpICYmIG1tdFRpbWUuaXNCZWZvcmUobW10U3RhcnQpKSB7XG4gICAgICAgIHRoaXMuZWFybHlTbG90cy5hZGQobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyogYnVpbGRpbmcgcGF1c2Ugc2xvdHMgYWZ0ZXIgZXZlbnQgKi9cbiAgICBjb25zdCBtbXRFYXJseUVuZCA9IG1tdEVuZC5jbG9uZSgpO1xuICAgIG1tdEVhcmx5RW5kLnN1YnRyYWN0KG1tdEVhcmx5RW5kLm1pbnV0ZXMoKSAlIHNlc3Npb24uZHVyYXRpb24pO1xuICAgIGNvbnN0IG1tdFBhdXNlRW5kID0gbW10RWFybHlFbmQuY2xvbmUoKS5hZGQoc2Vzc2lvbi5wYXVzZSwgJ21pbnV0ZXMnKTtcbiAgICBjb25zdCB0aW1lUGF1c2VSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseUVuZC50d2l4KG1tdFBhdXNlRW5kKS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVQYXVzZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVQYXVzZVJhbmdlLm5leHQoKTtcbiAgICAgIGNvbnN0IG1tdFRpbWU6IE1vbWVudCA9IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgICBpZiAobW10VGltZS5pc1NhbWVPckFmdGVyKG1tdEVhcmx5RW5kKSAmJiBtbXRUaW1lLmlzQmVmb3JlKG1tdFBhdXNlRW5kKSkge1xuICAgICAgICB0aGlzLnBhdXNlU2xvdHMuYWRkKG1tdFRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzZXNzaW9uIGV2ZW50IGluIENhbGVuZGFyXG4gICAqL1xuICByZW1vdmVTZXNzaW9uKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICBjb25zdCBtbXRTdGFydCA9IG1vbWVudChzZXNzaW9uLnN0YXJ0KTtcbiAgICBjb25zdCBtbXRFbmQgPSBtb21lbnQoc2Vzc2lvbi5lbmQpO1xuICAgIGNvbnN0IHRpbWVJbm5lclJhbmdlOiBUd2l4SXRlciA9IG1tdFN0YXJ0LnR3aXgobW10RW5kKS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVJbm5lclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVJbm5lclJhbmdlLm5leHQoKTtcbiAgICAgIHRoaXMuc2Vzc2lvbnNTbG90cy5kZWxldGUodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIGlmICghdGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cy5kZWxldGUodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyogcmVtb3ZpbmcgZWFybHkgc2xvdHMgKi9cbiAgICBjb25zdCBtbXRFYXJseVN0YXJ0ID0gbW10U3RhcnQuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLnJlYWxEdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICBtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoXG4gICAgICBtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAtXG4gICAgICAobW10RWFybHlTdGFydC5taW51dGVzKCkgJSBzZXNzaW9uLmR1cmF0aW9uKSArIHNlc3Npb24uZHVyYXRpb24pO1xuICAgIGNvbnN0IHRpbWVFYXJseVJhbmdlOiBUd2l4SXRlciA9IG1tdEVhcmx5U3RhcnQudHdpeChtbXRTdGFydCkuaXRlcmF0ZShzZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHdoaWxlICh0aW1lRWFybHlSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lRWFybHlSYW5nZS5uZXh0KCk7XG4gICAgICBjb25zdCBtbXRUaW1lOiBNb21lbnQgPSBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHNlc3Npb24uZHVyYXRpb24pO1xuICAgICAgaWYgKG1tdFRpbWUuaXNTYW1lT3JBZnRlcihtbXRFYXJseVN0YXJ0KSAmJiBtbXRUaW1lLmlzQmVmb3JlKG1tdFN0YXJ0KSkge1xuICAgICAgICB0aGlzLmVhcmx5U2xvdHMuZGVsZXRlKG1tdFRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIHJlbW92aW5nIHBhdXNlIHNsb3RzICovXG4gICAgaWYgKHNlc3Npb24ucGF1c2UpIHtcbiAgICAgIGNvbnN0IG1tdEVhcmx5RW5kID0gbW10RW5kLmNsb25lKCk7XG4gICAgICBtbXRFYXJseUVuZC5zdWJ0cmFjdChtbXRFYXJseUVuZC5taW51dGVzKCkgJSBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgIGNvbnN0IG1tdFBhdXNlRW5kID0gbW10RWFybHlFbmQuY2xvbmUoKS5hZGQoc2Vzc2lvbi5wYXVzZSwgJ21pbnV0ZXMnKTtcbiAgICAgIGNvbnN0IHRpbWVQYXVzZVJhbmdlOiBUd2l4SXRlciA9IG1tdEVhcmx5RW5kLnR3aXgobW10UGF1c2VFbmQpLml0ZXJhdGUoc2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICAgIHdoaWxlICh0aW1lUGF1c2VSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVQYXVzZVJhbmdlLm5leHQoKTtcbiAgICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgICAgaWYgKG1tdFRpbWUuaXNTYW1lT3JBZnRlcihtbXRFYXJseUVuZCkgJiYgbW10VGltZS5pc0JlZm9yZShtbXRQYXVzZUVuZCkpIHtcbiAgICAgICAgICB0aGlzLnBhdXNlU2xvdHMuZGVsZXRlKG1tdFRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqKioqKioqKioqKioqKioqKioqIERhdGUgZnVuY3Rpb25zICoqKioqKioqKioqKioqXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICovXG4gIGxvYWRFdmVudHMoc3RhcnQ6IE1vbWVudCwgZW5kOiBNb21lbnQpIHtcbiAgICBpZiAoIXRoaXMub25saW5lU2Vzc2lvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9zZXNzaW9uc0VudHJpZXMpICYmIHRoaXMuX3Nlc3Npb25zRW50cmllcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3Nlc3Npb25zRW50cmllcy5mb3JFYWNoKChzZXNzaW9uOiBTZXNzaW9uKSA9PiB7XG4gICAgICAgIGlmIChtb21lbnQoc2Vzc2lvbi5zdGFydCkuaXNTYW1lT3JBZnRlcihzdGFydCkgJiZcbiAgICAgICAgICBtb21lbnQoc2Vzc2lvbi5lbmQpLmlzU2FtZU9yQmVmb3JlKGVuZCkpIHtcbiAgICAgICAgICBsZXQgbW10RXZlbnRTdGFydCA9IG1vbWVudChzZXNzaW9uLnN0YXJ0LCAnWVlZWS1NTS1EREhIOm1tJyk7XG4gICAgICAgICAgbW10RXZlbnRTdGFydCA9IHRoaXMuYnVpbGRpbkJ1c3lTbG90KG1tdEV2ZW50U3RhcnQsIHNlc3Npb24pO1xuICAgICAgICAgIHRoaXMuYnVpbGRpbmdFYXJsaWVzdFNsb3QobW10RXZlbnRTdGFydCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTbG90IGxvY2tlZFxuICAgKi9cbiAgYnVpbGRpbkJ1c3lTbG90KG1tdEV2ZW50U3RhcnQ6IE1vbWVudCwgc2Vzc2lvbjogU2Vzc2lvbik6IE1vbWVudCB7XG4gICAgY29uc3QgbW10RXZlbnRFbmQgPSBtb21lbnQoc2Vzc2lvbi5lbmQsICdZWVlZLU1NLURESEg6bW0nKTtcblxuICAgIGlmICghbW10RXZlbnRTdGFydCB8fCAhbW10RXZlbnRTdGFydC5pc1ZhbGlkKClcbiAgICAgIHx8ICFtbXRFdmVudEVuZCB8fCAhbW10RXZlbnRFbmQuaXNWYWxpZCgpXG4gICAgICB8fCAhbW10RXZlbnRTdGFydC5pc1NhbWVPckJlZm9yZShtbXRFdmVudEVuZCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2ludmFsaWQgZGF0ZXMnLCBzZXNzaW9uLmVuZCwgbW10RXZlbnRTdGFydCwgbW10RXZlbnRFbmQpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qIGJ1aWxkaW5nIGJ1c3kgc2xvdHMgYnkgZXZlbnRzICovXG4gICAgY29uc3QgZXZlbnRzVGltZVJhbmdlOiBUd2l4SXRlciA9IG1tdEV2ZW50U3RhcnQudHdpeChtbXRFdmVudEVuZCkuaXRlcmF0ZShzZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuXG4gICAgd2hpbGUgKGV2ZW50c1RpbWVSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHt0aW1lLCBtbXRUaW1lfSA9IENhbGVuZGFyQ29tcG9uZW50LnNwbGl0UmFuZ2VUb05leHRUaW1lKGV2ZW50c1RpbWVSYW5nZSwgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgICAvKiBJRiB0aGUgYnVzeSBzbG90IGlzIGF2YWlsYWJlIGFuZCBub3QgYWxyZWFkeSBpbiBidXN5U2xvdHMgd2UgY291bnQgaXQgKi9cbiAgICAgIGlmICh0aGlzLmRheXNBdmFpbGFiaWxpdHkgJiZcbiAgICAgICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5Lmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSAmJlxuICAgICAgICAhdGhpcy5idXN5U2xvdHMuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSkgJiZcbiAgICAgICAgIXRoaXMuZGF5c0F2YWlsYWJpbGl0eS5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkuaW5jbHVkZXModGltZS5mb3JtYXQoJ0hIOm1tJykpKSB7XG4gICAgICAgIGlmICgoIXNlc3Npb24uY3VzdG9tZXJzIHx8XG4gICAgICAgICAgKHNlc3Npb24uY3VzdG9tZXJzICYmXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyICYmXG4gICAgICAgICAgICAhc2Vzc2lvbi5jdXN0b21lcnMubWFwKGMgPT4gYy5pZCkuaW5jbHVkZXModGhpcy5jdXN0b21lci5pZCkpKSkge1xuICAgICAgICAgIGxldCBkYXlCdXN5TnVtYmVyID0gdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpID9cbiAgICAgICAgICAgIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmdldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSA6IDA7XG4gICAgICAgICAgZGF5QnVzeU51bWJlcisrO1xuICAgICAgICAgIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLnNldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpLCBkYXlCdXN5TnVtYmVyKTtcbiAgICAgICAgICB0aGlzLmJ1c3lTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2Vzc2lvbi5jdXN0b21lcnMgJiYgdGhpcy5jdXN0b21lciAmJiBzZXNzaW9uLmN1c3RvbWVycy5tYXAoYyA9PiBjLmlkKS5pbmNsdWRlcyh0aGlzLmN1c3RvbWVyLmlkKSkge1xuICAgICAgICAgIHRoaXMuc2Vzc2lvbnNTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgICAgICB0aGlzLnNldFNlc3Npb25TbG90KGV2ZW50c1RpbWVSYW5nZSwgdGltZSwgc2Vzc2lvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5zZXNzaW9ucy5uZXh0KHRoaXMuc2Vzc2lvbnMpO1xuXG4gICAgcmV0dXJuIG1tdEV2ZW50U3RhcnQ7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgaW4gc2Vzc2lvbnMgTWFwIG9ubHkgc3RhcnQgc2Vzc2lvbiB3aXRoIGl0cyBzZXNzaW9uXG4gICAqIEBwYXJhbSBldmVudHNUaW1lUmFuZ2VcbiAgICogQHBhcmFtIHRpbWVcbiAgICogQHBhcmFtIHNlc3Npb25cbiAgICovXG4gIHNldFNlc3Npb25TbG90KGV2ZW50c1RpbWVSYW5nZTogVHdpeEl0ZXIsIHRpbWU6IFR3aXgsIHNlc3Npb246IFNlc3Npb24pIHtcbiAgICB0aGlzLnNlc3Npb25zLnNldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJyksIHNlc3Npb24pO1xuICAgIGlmICghZXZlbnRzVGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTbG90IGJlZm9yZSBhdmFpbGFiaWxpdHkgcmFuZ2VcbiAgICovXG4gIGJ1aWxkaW5nRWFybGllc3RTbG90KG1tdEV2ZW50U3RhcnQ6IE1vbWVudCkge1xuICAgIGlmICghbW10RXZlbnRTdGFydCB8fCAhdGhpcy5yZWFsRHVyYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKiBidWlsZGluZyBlYXJsaWVzdCBzbG90IGJlZm9yZSBldmVudCAqL1xuICAgIGNvbnN0IG1tdEVhcmx5U3RhcnQgPSBtbXRFdmVudFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKG1tdEVhcmx5U3RhcnQubWludXRlcygpIC1cbiAgICAgIChtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAlIHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbikgKyB0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb24pO1xuICAgIGNvbnN0IGVhcmxpZXN0VGltZVJhbmdlOiBUd2l4SXRlciA9IG1tdEVhcmx5U3RhcnQudHdpeChtbXRFdmVudFN0YXJ0KS5pdGVyYXRlKHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAoZWFybGllc3RUaW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB7dGltZSwgbW10VGltZX0gPSBDYWxlbmRhckNvbXBvbmVudC5zcGxpdFJhbmdlVG9OZXh0VGltZShlYXJsaWVzdFRpbWVSYW5nZSwgdGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgIC8qIElGIHRoZSBidXN5IHNsb3QgaXMgaW4gYXZhaWxhYmlsaXR5IGFuZCBub3QgYWxyZWFkeSBpbiBidXN5U2xvaXRzIHdlIGNvdW50IGl0ICovXG4gICAgICBpZiAodGhpcy5kYXlzQXZhaWxhYmlsaXR5ICYmIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSlcbiAgICAgICAgJiYgIXRoaXMuYnVzeVNsb3RzLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpXG4gICAgICAgICYmIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkuaW5kZXhPZih0aW1lLmZvcm1hdCgnSEg6bW0nKSkgPj0gMCkge1xuICAgICAgICBsZXQgZGF5QnVzeU51bWJlciA9IHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSA/XG4gICAgICAgICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuZ2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpIDogMDtcbiAgICAgICAgZGF5QnVzeU51bWJlcisrO1xuICAgICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5zZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSwgZGF5QnVzeU51bWJlcik7XG4gICAgICB9XG4gICAgICB0aGlzLmJ1c3lTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==