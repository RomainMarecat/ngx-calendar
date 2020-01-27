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
        this.sessionsStartSlots = new Set();
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
            else {
                this.sessionsStartSlots.add(time.format('YYYY-MM-DDHH:mm'));
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
            if (!timeInnerRange.hasNext()) {
                this.sessionsEndSlots.delete(time.format('YYYY-MM-DDHH:mm'));
            }
            else {
                this.sessionsStartSlots.delete(time.format('YYYY-MM-DDHH:mm'));
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
                    _this.buildinBusySlot(session);
                    _this.buildingEarliestSlot(session);
                }
            }));
        }
    };
    /**
     * Slot locked
     */
    /**
     * Slot locked
     * @param {?} session
     * @return {?}
     */
    CalendarComponent.prototype.buildinBusySlot = /**
     * Slot locked
     * @param {?} session
     * @return {?}
     */
    function (session) {
        /** @type {?} */
        var mmtEventStart = moment(session.start, 'YYYY-MM-DDHH:mm');
        /** @type {?} */
        var mmtEventEnd = moment(session.end, 'YYYY-MM-DDHH:mm');
        if (!mmtEventStart || !mmtEventStart.isValid()
            || !mmtEventEnd || !mmtEventEnd.isValid()
            || !mmtEventStart.isSameOrBefore(mmtEventEnd)) {
            console.error('invalid dates', mmtEventStart, mmtEventEnd);
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
                    this.setOtherBusySlots(time);
                }
                if (session.customers && this.customer && session.customers.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.id; })).includes(this.customer.id)) {
                    this.setSessionSlot(eventsTimeRange, time, session);
                }
            }
        }
        this.sessionService.sessions.next(this.sessions);
        return mmtEventStart;
    };
    /**
     * @param {?} time
     * @return {?}
     */
    CalendarComponent.prototype.setOtherBusySlots = /**
     * @param {?} time
     * @return {?}
     */
    function (time) {
        /** @type {?} */
        var dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
            this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
        dayBusyNumber++;
        this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
        this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
    };
    /**
     * Build in sessions Map only start session with its session
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
        this.sessionsSlots.add(time.format('YYYY-MM-DDHH:mm'));
        if (!eventsTimeRange.hasNext()) {
            this.sessionsEndSlots.add(time.format('YYYY-MM-DDHH:mm'));
            return;
        }
        this.sessions.set(time.format('YYYY-MM-DDHH:mm'), session);
        this.sessionsStartSlots.add(time.format('YYYY-MM-DDHH:mm'));
    };
    /**
     * Slot before availability range
     */
    /**
     * Slot before availability range
     * @param {?} session
     * @return {?}
     */
    CalendarComponent.prototype.buildingEarliestSlot = /**
     * Slot before availability range
     * @param {?} session
     * @return {?}
     */
    function (session) {
        /** @type {?} */
        var mmtEventStart = moment(session.start, 'YYYY-MM-DDHH:mm');
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
            /* IF the busy slot is in availability and not already in busySlots we count it */
            if (this.daysAvailability &&
                this.daysAvailability.has(time.format('YYYY-MM-DD'))
                && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
                && this.daysAvailability.get(time.format('YYYY-MM-DD')).includes(time.format('HH:mm'))) {
                /** @type {?} */
                var dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
                    this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
                dayBusyNumber++;
                this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
                this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
            }
        }
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEdBQUcsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFHbEMsT0FBTyxNQUFNLENBQUM7QUFLZCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0lBRTdELE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBdUlFLDJCQUFvQixFQUFxQixFQUNyQixjQUE4QjtRQUQ5QixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7Ozs7UUFySHpDLGtCQUFhLEdBQWtCO1lBQ3RDLEVBQUUsRUFBRSxJQUFJO1lBQ1IsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLEVBQUUsRUFBRTtZQUNSLFdBQVcsRUFBRSxDQUFDO1lBQ2QsYUFBYSxFQUFFLENBQUM7WUFDaEIsUUFBUSxFQUFFLEVBQUU7WUFDWixLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxFQUFFO1lBQ1QsVUFBVSxFQUFFLFlBQVk7WUFDeEIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsVUFBVSxFQUFFLE9BQU87WUFDbkIsUUFBUSxFQUFFLE9BQU87U0FDbEIsQ0FBQzs7OztRQUlPLFVBQUssR0FBVyxNQUFNLEVBQUUsQ0FBQzs7OztRQUl6QixRQUFHLEdBQVcsTUFBTSxFQUFFLENBQUM7Ozs7UUFJdkIsMEJBQXFCLEdBQTBCO1lBQ3RELFFBQVEsRUFBRTtnQkFDUixHQUFHLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsUUFBUSxFQUFF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QyxzQ0FBbUI7Ozs7O0lBckJQLCtCQUE2Qjs7Ozs7SUFDN0IsMkNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgVHdpeCwgVHdpeEl0ZXIgfSBmcm9tICd0d2l4JztcbmltcG9ydCAndHdpeCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9zaGFyZWQvY29uZmlndXJhdGlvbi9jYWxlbmRhci1jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IERheSB9IGZyb20gJy4uL3NoYXJlZC9kYXkvZGF5JztcbmltcG9ydCB7IE9ubGluZVNlc3Npb24gfSBmcm9tICcuLi9zaGFyZWQvc2Vzc2lvbi9vbmxpbmUtc2Vzc2lvbic7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vc2hhcmVkL3Nlc3Npb24vc2Vzc2lvbic7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZVxuICBzZWxlY3RvcjogJ25neC1jYWxlbmRhcicsXG4gIC8vIHRzbGludDplbmFibGVcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBVc2VyIGNvdWxkIGJlIHBhc3NlZCB0byBzaG93IHRoZSBvd25lclxuICAgKi9cbiAgQElucHV0KCkgdXNlcjogYW55O1xuICAvKipcbiAgICogQ3VzdG9tZXIgY291bGQgYmUgcGFzc2VkIHRvIGdlbmVyYXRlIGEgcGVyc29uYWwgY2FsZW5kYXJcbiAgICovXG4gIEBJbnB1dCgpIGN1c3RvbWVyOiBhbnk7XG4gIC8qKlxuICAgKiBPbmxpbmUgc2Vzc2lvbnMgZGVmaW5pdGlvblxuICAgKi9cbiAgQElucHV0KCkgb25saW5lU2Vzc2lvbjogT25saW5lU2Vzc2lvbiA9IHtcbiAgICBpZDogbnVsbCxcbiAgICBjb21tZW50OiAnJyxcbiAgICBuYW1lOiAnJyxcbiAgICBtYXhfcGVyc29uczogMSxcbiAgICBib29raW5nX2RlbGF5OiAxLFxuICAgIGR1cmF0aW9uOiAxNSxcbiAgICBwYXVzZTogMCxcbiAgICBwcmljZTogMTAsXG4gICAgc3RhcnRfZGF0ZTogJzIwMTktMDEtMDEnLFxuICAgIGVuZF9kYXRlOiAnMjAzMC0xMi0zMScsXG4gICAgc3RhcnRfdGltZTogJzA4OjAwJyxcbiAgICBlbmRfdGltZTogJzE5OjAwJ1xuICB9O1xuICAvKipcbiAgICogU3RhcnQgZGF5IG9mIGNhbGVuZGFyIChjb3VsZCBiZSB1cGRhdGVkKVxuICAgKi9cbiAgQElucHV0KCkgc3RhcnQ6IE1vbWVudCA9IG1vbWVudCgpO1xuICAvKipcbiAgICogRW5kIGRheSBvZiBjYWxlbmRhciAoY291bGQgYmUgdXBkYXRlZCBidXQgcmVld3JpdGVuIG9uIHN3aXRjaCB3ZWVrIG1vZGVcbiAgICovXG4gIEBJbnB1dCgpIGVuZDogTW9tZW50ID0gbW9tZW50KCk7XG4gIC8qKlxuICAgKiBDb25maWd1cmF0aW9uIGNhbGVuZGFyXG4gICAqL1xuICBASW5wdXQoKSBjYWxlbmRhckNvbmZpZ3VyYXRpb246IENhbGVuZGFyQ29uZmlndXJhdGlvbiA9IHtcbiAgICBjYWxlbmRhcjoge1xuICAgICAgY3RhOiB7XG4gICAgICAgIG5leHQ6ICdzdWl2YW50JyxcbiAgICAgICAgcHJldmlvdXM6ICdwcsOpY8OpZGVudCcsXG4gICAgICB9LFxuICAgICAgdG9kYXk6ICdhdWpvdXJkXFwnaHVpJyxcbiAgICAgIGJhY2tfdG9kYXk6ICdyZXZlbmlyIMOgIGxhIGRhdGUgZFxcJ2F1am91cmRcXCdodWknLFxuICAgICAgZGF5OiAnam91cicsXG4gICAgICB0aHJlZV9kYXlzOiAnMyBqb3VycycsXG4gICAgICB3ZWVrOiAnc2VtYWluZScsXG4gICAgICB0aXRsZTogJ3LDqXNlcnZlciB2b3RyZSBjcsOpbmVhdScsXG4gICAgICBzdWJ0aXRsZTogJ3RvdXRlcyBsZXMgZGlzcG9uaWJpbGl0w6lzJyxcbiAgICAgIGF2YWlsYWJpbGl0eToge1xuICAgICAgICBlbXB0eTogJ0F1Y3VuZSBkaXNwb25pYmlsaXTDqScsXG4gICAgICAgIHNsb3Q6ICdQcm9jaGFpbmUgZGlzcG9uaWJpbGl0w6knLFxuICAgICAgfSxcbiAgICAgIHNlc3Npb246IHtcbiAgICAgICAgaW5mbzogJ0Nyw6luZWF1IHbDqXJyb3VpbGzDqSdcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBXaGVuIHVzZXIgc3doaXRjaCB2aWV3IG1vZGUgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSB2aWV3TW9kZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIC8qKlxuICAgKiBTZXNzaW9uIGNyZWF0ZWQgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSBzZXNzaW9uQ3JlYXRlZDogRXZlbnRFbWl0dGVyPFNlc3Npb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZXNzaW9uPigpO1xuICAvKipcbiAgICogU2Vzc2lvbiByZW1vdmVkIGV2ZW50XG4gICAqL1xuICBAT3V0cHV0KCkgc2Vzc2lvblJlbW92ZWQ6IEV2ZW50RW1pdHRlcjxTZXNzaW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4oKTtcbiAgLyoqXG4gICAqIEFycmF5IG9mIHNlbGVjdGFibGUgZGF5cyBmcm9tIHN0YXJ0IHRvIGVuZFxuICAgKi9cbiAgZGF5czogQXJyYXk8RGF5PiA9IFtdO1xuICAvKipcbiAgICogU2xvdCBEdXJhdGlvbiBpbiBtaW51dGVzXG4gICAqL1xuICByZWFsRHVyYXRpb246IG51bWJlcjtcbiAgLyoqXG4gICAqIER1cmluZyBkYXlzIGZyb20gc3RhcnQgdG8gZW5kLCBsaXN0IG9mIGVudHJpZXMgdGhhdCBhdmFpbGFibGVcbiAgICovXG4gIGRheXNBdmFpbGFiaWxpdHk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcbiAgLyoqXG4gICAqIE51bWJlciBvZiBidXN5IHNsb3QgaW4gZWFjaCBkYXlcbiAgICovXG4gIGRheXNCdXN5U2xvdE51bWJlcjogTWFwPHN0cmluZywgbnVtYmVyPjtcbiAgLyoqXG4gICAqIE51bWJlciBvZiBhdmFpbGFibGUgc2xvdCBpbiBlYWNoIGRheVxuICAgKi9cbiAgZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXI6IE1hcDxzdHJpbmcsIG51bWJlcj47XG4gIC8qKlxuICAgKiBTZXQgb2YgZGF0ZXRpbWUgd2hvIHJlcHJlbnNlbnRzIGF2YWlsYWJpbGl0eVxuICAgKi9cbiAgYnVzeVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIHNldCBvZiBkYXRldGltZSB3aG8gcmVwcmVzZW50cyBvdmVyIGV4dGVuZHMgYnVzeSBzbG90XG4gICAqL1xuICBlYXJseVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIHNldCBvZiBkYXRldGltZSB3aG8gcmVwcmVzZW50cyBwYXVzZSBzbG90XG4gICAqL1xuICBwYXVzZVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIHNldCBvZiBkYXRldGltZSB3aG8gcmVwcmVzZW50cyBzZXNzaW9uIHNsb3RcbiAgICovXG4gIHNlc3Npb25zU2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogc2V0IG9mIGRhdGV0aW1lIHdobyByZXByZXNlbnRzIGVuZCBzbG90IChub3QgdXNlZCBpbiBmcm9udClcbiAgICovXG4gIHNlc3Npb25zRW5kU2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogc2V0IG9mIGRhdGV0aW1lIHdobyByZXByZXNlbnRzIGVuZCBzbG90IChub3QgdXNlZCBpbiBmcm9udClcbiAgICovXG4gIHNlc3Npb25zU3RhcnRTbG90czogU2V0PHN0cmluZz47XG4gIC8qKlxuICAgKiBNYXAgb2Ygc2Vzc2lvbnMgZnJvbSBjdXJyZW50IHVzZXJcbiAgICovXG4gIHNlc3Npb25zOiBNYXA8c3RyaW5nLCBTZXNzaW9uPjtcbiAgLyoqXG4gICAqIGNhbGVuZGFyIHN0YXJ0IGRheSBhZnRlciBzZXQgZnVsbCBjYWxlbmRhciBpbmZvcm1hdGlvbnNcbiAgICovXG4gIHByaXZhdGUgY2FsZW5kYXJTdGFydDogTW9tZW50O1xuICAvKipcbiAgICogY2FsZW5kYXIgZW5kIGRheSBhZnRlciBzZXQgZnVsbCBjYWxlbmRhciBpbmZvcm1hdGlvbnNcbiAgICovXG4gIHByaXZhdGUgY2FsZW5kYXJFbmQ6IE1vbWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXNzaW9ucyBhcnJheSBsb2FkZWQgYnkgcGFyZW50IGNvbXBvbmVudFxuICAgKi9cbiAgX3Nlc3Npb25zRW50cmllczogU2Vzc2lvbltdID0gW107XG5cbiAgZ2V0IHNlc3Npb25zRW50cmllcygpOiBTZXNzaW9uW10ge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uc0VudHJpZXM7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgc2Vzc2lvbnNFbnRyaWVzKHNlc3Npb25zRW50cmllczogU2Vzc2lvbltdKSB7XG4gICAgaWYgKHNlc3Npb25zRW50cmllcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3Nlc3Npb25zRW50cmllcyA9IHNlc3Npb25zRW50cmllcztcbiAgICB9XG4gICAgdGhpcy5sb2FkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIC8vIERlZmF1bHQgVmlldyBNb2RlIG9mIFdlZWsgQ29tcG9uZW50XG4gIF92aWV3TW9kZSA9ICd3ZWVrJztcblxuICBnZXQgdmlld01vZGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld01vZGU7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgdmlld01vZGUodmlld01vZGUpIHtcbiAgICB0aGlzLl92aWV3TW9kZSA9IHZpZXdNb2RlO1xuICAgIHRoaXMuc2V0Vmlld01vZGUoKTtcbiAgfVxuXG4gIHN0YXRpYyBzcGxpdFJhbmdlVG9OZXh0VGltZShzbG90VGltZVJhbmdlOiBUd2l4SXRlciwgc2xvdER1cmF0aW9uOiBudW1iZXIpOiB7dGltZTogVHdpeCwgbW10VGltZTogTW9tZW50fSB7XG4gICAgY29uc3QgdGltZTogVHdpeCA9IHNsb3RUaW1lUmFuZ2UubmV4dCgpO1xuICAgIHJldHVybiB7dGltZSwgbW10VGltZTogQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzbG90RHVyYXRpb24pfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRNaW51dGVzRGlmZmVyZW5jZShtbXRUaW1lOiBNb21lbnQsIHNsb3REdXJhdGlvbjogbnVtYmVyKTogTW9tZW50IHtcbiAgICBpZiAobW10VGltZS5taW51dGVzKCkgJSBzbG90RHVyYXRpb24gIT09IDApIHtcbiAgICAgIG1tdFRpbWUubWludXRlcyhtbXRUaW1lLm1pbnV0ZXMoKSAtIChtbXRUaW1lLm1pbnV0ZXMoKSAlIHNsb3REdXJhdGlvbikpO1xuICAgIH1cblxuICAgIHJldHVybiBtbXRUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3BlY3QgYWxsIGNoYW5nZXNcbiAgICovXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMubG9hZENhbGVuZGFyKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IERlZmF1bHQgdmFyaWFibGVzXG4gICAqL1xuICBzZXRDYWxlbmRhcigpIHtcbiAgICB0aGlzLmRheXMgPSBbXTtcbiAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5zZXNzaW9uc1Nsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLnNlc3Npb25zU3RhcnRTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLmVhcmx5U2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5wYXVzZVNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuYnVzeVNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuc2Vzc2lvbnMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5zZXNzaW9ucy5uZXh0KHRoaXMuc2Vzc2lvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBWaWV3IE1vZGUgd2l0aCB3ZWVrLCBkYXksIDMgZGF5c1xuICAgKiBJbml0IHN0YXJ0LCBlbmQsXG4gICAqXG4gICAqL1xuICBzZXRWaWV3TW9kZSgpIHtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ2RheScpIHtcbiAgICAgIHRoaXMuZW5kID0gdGhpcy5zdGFydDtcbiAgICAgIHRoaXMuY2FsZW5kYXJTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdGFydE9mKCdkYXknKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJFbmQgPSBtb21lbnQodGhpcy5lbmQpLmVuZE9mKCdkYXknKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudmlld01vZGUgPT09ICd0aHJlZV9kYXlzJykge1xuICAgICAgdGhpcy5lbmQgPSBtb21lbnQodGhpcy5zdGFydCkuYWRkKDIsICdkYXlzJyk7XG4gICAgICB0aGlzLmNhbGVuZGFyU3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuc3RhcnRPZignZGF5Jyk7XG4gICAgICB0aGlzLmNhbGVuZGFyRW5kID0gbW9tZW50KHRoaXMuZW5kKS5lbmRPZignZGF5Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIEluaXQgZmlyc3QgZGF5IHdlZWsgbnVtYmVyXG4gICAgY29uc3QgZmlyc3REYXkgPSAwO1xuICAgIC8vIElmIGVtcHR5IHN0YXJ0IGRhdGUgdGhlbiBzdGFydCB0byB0b2RheVxuICAgIGlmICghdGhpcy5zdGFydCkge1xuICAgICAgdGhpcy5zdGFydCA9IG1vbWVudCgpO1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLmRheShmaXJzdERheSkuc3RhcnRPZignZGF5Jyk7XG4gICAgdGhpcy5lbmQgPSBtb21lbnQodGhpcy5zdGFydCkuYWRkKDYsICdkYXlzJykuZW5kT2YoJ2RheScpO1xuXG4gICAgdGhpcy5jYWxlbmRhclN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLnN0YXJ0T2YoJ2RheScpO1xuICAgIHRoaXMuY2FsZW5kYXJFbmQgPSBtb21lbnQodGhpcy5lbmQpLmVuZE9mKCdkYXknKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBzdGFydC92aWV3TW9kZSBjaGFuZ2VkLCBkbyBhIHJlY2FsY3VsYXRlIG9mIGluaXQgc3RhcnQsIGVuZFxuICAgKiBkYXlzLCBkYXlzQXZhaWxhYmlsaXR5IGFuZCB2aWV3TW9kZVxuICAgKi9cbiAgbG9hZENhbGVuZGFyKCkge1xuICAgIHRoaXMuc2V0Q2FsZW5kYXIoKTtcbiAgICB0aGlzLnNldFZpZXdNb2RlKCk7XG4gICAgdGhpcy5zZXREYXRlUmFuZ2UodGhpcy5zdGFydCwgdGhpcy5lbmQpO1xuICAgIHRoaXMubG9hZEV2ZW50cyh0aGlzLnN0YXJ0LCB0aGlzLmVuZCk7XG4gICAgdGhpcy5sb2FkQXZhaWxhYmlsaXRpZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYXZhaWxhYmxlIGRheXMgZnJvbSBzdGFydCB0byBlbmQgZGF0ZXNcbiAgICovXG4gIHNldERhdGVSYW5nZShzdGFydDogTW9tZW50LCBlbmQ6IE1vbWVudCkge1xuICAgIC8vIERheXMgcmFuZ2UgZnJvbSBzdGFydCB0byBlbmRcbiAgICBjb25zdCBkYXlzUmFuZ2U6IFR3aXhJdGVyID0gc3RhcnRcbiAgICAgIC50d2l4KGVuZClcbiAgICAgIC5pdGVyYXRlKDEsICdkYXlzJyk7XG4gICAgLy8gTG9hZGluZyBhbGwgZGF5c1xuICAgIHdoaWxlIChkYXlzUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCBhdmFpbGFibGVEYXk6IFR3aXggPSBkYXlzUmFuZ2UubmV4dCgpO1xuICAgICAgdGhpcy5kYXlzLnB1c2goe1xuICAgICAgICB0aXRsZTogYXZhaWxhYmxlRGF5LmZvcm1hdCgnREQvTU0vWVlZWScpLFxuICAgICAgICBrZXk6IGF2YWlsYWJsZURheS5mb3JtYXQoJ1lZWVktTU0tREQnKSxcbiAgICAgICAgdmFsdWU6IG1vbWVudChhdmFpbGFibGVEYXkudG9EYXRlKCkpXG4gICAgICB9KTtcbiAgICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5zZXQoYXZhaWxhYmxlRGF5LmZvcm1hdCgnWVlZWS1NTS1ERCcpLCBbXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9uIHN3aXRjaCBkYXRlIHJhbmdlXG4gICAqL1xuICBvblN3aXRoZWRWaWV3KHZpZXdNb2RlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZpZXdNb2RlID0gdmlld01vZGU7XG4gICAgdGhpcy52aWV3TW9kZUNoYW5nZWQuZW1pdCh2aWV3TW9kZSk7XG4gICAgdGhpcy5sb2FkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBzdGFydCBjaGFuZ2UgZXZlbnRcbiAgICovXG4gIG9uU3RhcnRDaGFuZ2VkKHN0YXJ0OiBNb21lbnQpIHtcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5sb2FkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBzZXNzaW9uIGFkZGVkIG9uIGNsaWNrIGV2ZW50XG4gICAqL1xuICBvblNlc3Npb25BZGRlZChzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgdGhpcy5zZXNzaW9ucy5zZXQobW9tZW50KHNlc3Npb24uc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJyksIHNlc3Npb24pO1xuICAgIHRoaXMuc2Vzc2lvblNlcnZpY2Uuc2Vzc2lvbnMubmV4dCh0aGlzLnNlc3Npb25zKTtcbiAgICB0aGlzLmFkZFNlc3Npb24oc2Vzc2lvbik7XG4gICAgdGhpcy5zZXNzaW9uQ3JlYXRlZC5lbWl0KHNlc3Npb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHJlbW92ZWQgZXZlbnRcbiAgICovXG4gIG9uU2Vzc2lvblJlbW92ZWQoc291cmNlOiB7a2V5OiBzdHJpbmcsIHNlc3Npb246IFNlc3Npb259KSB7XG4gICAgdGhpcy5zZXNzaW9ucy5kZWxldGUoc291cmNlLmtleSk7XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5zZXNzaW9ucy5uZXh0KHRoaXMuc2Vzc2lvbnMpO1xuICAgIHRoaXMucmVtb3ZlU2Vzc2lvbihzb3VyY2Uuc2Vzc2lvbik7XG4gICAgdGhpcy5zZXNzaW9uUmVtb3ZlZC5lbWl0KHNvdXJjZS5zZXNzaW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGFsbCB0aW1lIGZvciBlYWNoIGRheXNcbiAgICovXG4gIGxvYWRBdmFpbGFiaWxpdGllcygpIHtcbiAgICAvLyBubyBvbmxpbmUgc2Vzc2lvbiBubyBjYWxlbmRhclxuICAgIGlmICghdGhpcy5kYXlzQXZhaWxhYmlsaXR5IHx8ICF0aGlzLm9ubGluZVNlc3Npb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gc2Vzc2lvbiBkdXJhdGlvblxuICAgIHRoaXMucmVhbER1cmF0aW9uID0gdGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uO1xuICAgIC8vIHNlc3Npb24gZGF5IHN0YXJ0IDAwOjAwIC0gZW5kIDIzOjU5XG4gICAgY29uc3Qgb25saW5lU2Vzc2lvblN0YXJ0OiBNb21lbnQgPSBtb21lbnQodGhpcy5vbmxpbmVTZXNzaW9uLnN0YXJ0X2RhdGUsICdZWVlZLU1NLUREJykuc3RhcnRPZignZGF5Jyk7XG4gICAgY29uc3Qgb25saW5lU2Vzc2lvbkVuZDogTW9tZW50ID0gbW9tZW50KHRoaXMub25saW5lU2Vzc2lvbi5lbmRfZGF0ZSwgJ1lZWVktTU0tREQnKS5lbmRPZignZGF5Jyk7XG4gICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlciA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZm9yRWFjaCgoYXZicywgZGF5KSA9PiB7XG4gICAgICBsZXQgc2xvdHNOdW1iZXIgPSAwO1xuICAgICAgLy8gZWFjaCBkYXkgb2YgZGF5cyBhdmFpbGFiaWxpdHkgd2l0aCBzdGFydCB0aW1lIDA4OjAwXG4gICAgICBjb25zdCBtbXREYXkgPSBtb21lbnQoZGF5LCAnWVlZWS1NTS1ERCcpLmhvdXIoOCk7XG4gICAgICBjb25zdCBtbXREYXlTdGFydFRpbWUgPSBtb21lbnQoZGF5ICsgdGhpcy5vbmxpbmVTZXNzaW9uLnN0YXJ0X3RpbWUsICdZWVlZLU1NRERISDptbScpO1xuXG4gICAgICAvLyBJZiBzZXNzaW9uIHN0YXJ0IHRpbWUgbGlrZSAwODowMCBpcyBiZWZvcmUgc3RhcnQgdG9kYXkgMDA6MDBcbiAgICAgIGlmIChtbXREYXlTdGFydFRpbWUuaXNCZWZvcmUobW9tZW50KCkuc3RhcnRPZignZGF5JykpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGJvb2tpbmcgZGVsYXlcbiAgICAgIGNvbnN0IG1pbk1tdFN0YXJ0VGltZSA9IG1vbWVudCgpLmFkZCh0aGlzLm9ubGluZVNlc3Npb24uYm9va2luZ19kZWxheSwgJ2hvdXJzJyk7XG4gICAgICAvLyBzZXNzaW9uIHRpbWUgZW5kXG4gICAgICBjb25zdCBtbXREYXlFbmRUaW1lID0gbW9tZW50KGRheSArIHRoaXMub25saW5lU2Vzc2lvbi5lbmRfdGltZSwgJ1lZWVktTU0tRERISDptbScpO1xuICAgICAgbW10RGF5RW5kVGltZS5zdWJ0cmFjdCh0aGlzLnJlYWxEdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICAgIC8vIHNsb3RzIGl0ZXJhdG9yXG4gICAgICBjb25zdCB0aW1lUmFuZ2U6IFR3aXhJdGVyID0gbW10RGF5U3RhcnRUaW1lLnR3aXgobW10RGF5RW5kVGltZSlcbiAgICAgICAgLml0ZXJhdGUodGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgaWYgKHRoaXMuY2FsZW5kYXJTdGFydCAmJiB0aGlzLmNhbGVuZGFyRW5kICYmIG1tdERheS5pc0JldHdlZW4ob25saW5lU2Vzc2lvblN0YXJ0LCBvbmxpbmVTZXNzaW9uRW5kKSkge1xuICAgICAgICB3aGlsZSAodGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lUmFuZ2UubmV4dCgpO1xuICAgICAgICAgIGNvbnN0IHRpbWVNbXQ6IE1vbWVudCA9IG1vbWVudCh0aW1lLnRvRGF0ZSgpKTtcbiAgICAgICAgICBpZiAoIXRpbWVNbXQuaXNCZWZvcmUobWluTW10U3RhcnRUaW1lKSkge1xuICAgICAgICAgICAgYXZicy5wdXNoKHRpbWUuZm9ybWF0KCdISDptbScpKTtcbiAgICAgICAgICAgIHNsb3RzTnVtYmVyKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyLnNldChkYXksIHNsb3RzTnVtYmVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc2Vzc2lvbiBldmVudCBpbiBjYWxlbmRhclxuICAgKi9cbiAgYWRkU2Vzc2lvbihzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgY29uc3QgbW10U3RhcnQgPSBtb21lbnQoc2Vzc2lvbi5zdGFydCk7XG4gICAgY29uc3QgbW10RW5kID0gbW9tZW50KHNlc3Npb24uZW5kKTtcbiAgICBjb25zdCB0aW1lSW5uZXJSYW5nZTogVHdpeEl0ZXIgPSBtbXRTdGFydC50d2l4KG1tdEVuZCkuaXRlcmF0ZUlubmVyKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVJbm5lclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVJbm5lclJhbmdlLm5leHQoKTtcbiAgICAgIHRoaXMuc2Vzc2lvbnNTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIGlmICghdGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnNTdGFydFNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBidWlsZGluZyBlYXJsaWVzdCBzbG90IGJlZm9yZSBldmVudCAqL1xuICAgIGNvbnN0IG1tdEVhcmx5U3RhcnQgPSBtbXRTdGFydC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIG1tdEVhcmx5U3RhcnQubWludXRlcyhcbiAgICAgIG1tdEVhcmx5U3RhcnQubWludXRlcygpIC1cbiAgICAgIChtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAlIHNlc3Npb24uZHVyYXRpb24pICsgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgY29uc3QgdGltZUVhcmxpZXJSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseVN0YXJ0LnR3aXgobW10U3RhcnQpLml0ZXJhdGUoc2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUVhcmxpZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lRWFybGllclJhbmdlLm5leHQoKTtcbiAgICAgIGNvbnN0IG1tdFRpbWU6IE1vbWVudCA9IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgICBpZiAobW10VGltZS5pc1NhbWVPckFmdGVyKG1tdEVhcmx5U3RhcnQpICYmIG1tdFRpbWUuaXNCZWZvcmUobW10U3RhcnQpKSB7XG4gICAgICAgIHRoaXMuZWFybHlTbG90cy5hZGQobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyogYnVpbGRpbmcgcGF1c2Ugc2xvdHMgYWZ0ZXIgZXZlbnQgKi9cbiAgICBjb25zdCBtbXRFYXJseUVuZCA9IG1tdEVuZC5jbG9uZSgpO1xuICAgIG1tdEVhcmx5RW5kLnN1YnRyYWN0KG1tdEVhcmx5RW5kLm1pbnV0ZXMoKSAlIHNlc3Npb24uZHVyYXRpb24pO1xuICAgIGNvbnN0IG1tdFBhdXNlRW5kID0gbW10RWFybHlFbmQuY2xvbmUoKS5hZGQoc2Vzc2lvbi5wYXVzZSwgJ21pbnV0ZXMnKTtcbiAgICBjb25zdCB0aW1lUGF1c2VSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseUVuZC50d2l4KG1tdFBhdXNlRW5kKS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVQYXVzZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVQYXVzZVJhbmdlLm5leHQoKTtcbiAgICAgIGNvbnN0IG1tdFRpbWU6IE1vbWVudCA9IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgICBpZiAobW10VGltZS5pc1NhbWVPckFmdGVyKG1tdEVhcmx5RW5kKSAmJiBtbXRUaW1lLmlzQmVmb3JlKG1tdFBhdXNlRW5kKSkge1xuICAgICAgICB0aGlzLnBhdXNlU2xvdHMuYWRkKG1tdFRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzZXNzaW9uIGV2ZW50IGluIENhbGVuZGFyXG4gICAqL1xuICByZW1vdmVTZXNzaW9uKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICBjb25zdCBtbXRTdGFydCA9IG1vbWVudChzZXNzaW9uLnN0YXJ0KTtcbiAgICBjb25zdCBtbXRFbmQgPSBtb21lbnQoc2Vzc2lvbi5lbmQpO1xuICAgIGNvbnN0IHRpbWVJbm5lclJhbmdlOiBUd2l4SXRlciA9IG1tdFN0YXJ0LnR3aXgobW10RW5kKS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVJbm5lclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVJbm5lclJhbmdlLm5leHQoKTtcbiAgICAgIGlmICghdGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cy5kZWxldGUodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnNTdGFydFNsb3RzLmRlbGV0ZSh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiByZW1vdmluZyBlYXJseSBzbG90cyAqL1xuICAgIGNvbnN0IG1tdEVhcmx5U3RhcnQgPSBtbXRTdGFydC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIG1tdEVhcmx5U3RhcnQubWludXRlcyhcbiAgICAgIG1tdEVhcmx5U3RhcnQubWludXRlcygpIC1cbiAgICAgIChtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAlIHNlc3Npb24uZHVyYXRpb24pICsgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgY29uc3QgdGltZUVhcmx5UmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlTdGFydC50d2l4KG1tdFN0YXJ0KS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVFYXJseVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVFYXJseVJhbmdlLm5leHQoKTtcbiAgICAgIGNvbnN0IG1tdFRpbWU6IE1vbWVudCA9IENhbGVuZGFyQ29tcG9uZW50LmdldE1pbnV0ZXNEaWZmZXJlbmNlKG1vbWVudCh0aW1lLnRvRGF0ZSgpKSwgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgICBpZiAobW10VGltZS5pc1NhbWVPckFmdGVyKG1tdEVhcmx5U3RhcnQpICYmIG1tdFRpbWUuaXNCZWZvcmUobW10U3RhcnQpKSB7XG4gICAgICAgIHRoaXMuZWFybHlTbG90cy5kZWxldGUobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyogcmVtb3ZpbmcgcGF1c2Ugc2xvdHMgKi9cbiAgICBpZiAoc2Vzc2lvbi5wYXVzZSkge1xuICAgICAgY29uc3QgbW10RWFybHlFbmQgPSBtbXRFbmQuY2xvbmUoKTtcbiAgICAgIG1tdEVhcmx5RW5kLnN1YnRyYWN0KG1tdEVhcmx5RW5kLm1pbnV0ZXMoKSAlIHNlc3Npb24uZHVyYXRpb24pO1xuICAgICAgY29uc3QgbW10UGF1c2VFbmQgPSBtbXRFYXJseUVuZC5jbG9uZSgpLmFkZChzZXNzaW9uLnBhdXNlLCAnbWludXRlcycpO1xuICAgICAgY29uc3QgdGltZVBhdXNlUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlFbmQudHdpeChtbXRQYXVzZUVuZCkuaXRlcmF0ZShzZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgd2hpbGUgKHRpbWVQYXVzZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZVBhdXNlUmFuZ2UubmV4dCgpO1xuICAgICAgICBjb25zdCBtbXRUaW1lOiBNb21lbnQgPSBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHNlc3Npb24uZHVyYXRpb24pO1xuICAgICAgICBpZiAobW10VGltZS5pc1NhbWVPckFmdGVyKG1tdEVhcmx5RW5kKSAmJiBtbXRUaW1lLmlzQmVmb3JlKG1tdFBhdXNlRW5kKSkge1xuICAgICAgICAgIHRoaXMucGF1c2VTbG90cy5kZWxldGUobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICoqKioqKioqKioqKioqKioqKiogRGF0ZSBmdW5jdGlvbnMgKioqKioqKioqKioqKipcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKi9cbiAgbG9hZEV2ZW50cyhzdGFydDogTW9tZW50LCBlbmQ6IE1vbWVudCkge1xuICAgIGlmICghdGhpcy5vbmxpbmVTZXNzaW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuX3Nlc3Npb25zRW50cmllcykgJiYgdGhpcy5fc2Vzc2lvbnNFbnRyaWVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fc2Vzc2lvbnNFbnRyaWVzLmZvckVhY2goKHNlc3Npb246IFNlc3Npb24pID0+IHtcbiAgICAgICAgaWYgKG1vbWVudChzZXNzaW9uLnN0YXJ0KS5pc1NhbWVPckFmdGVyKHN0YXJ0KSAmJlxuICAgICAgICAgIG1vbWVudChzZXNzaW9uLmVuZCkuaXNTYW1lT3JCZWZvcmUoZW5kKSkge1xuICAgICAgICAgIHRoaXMuYnVpbGRpbkJ1c3lTbG90KHNlc3Npb24pO1xuICAgICAgICAgIHRoaXMuYnVpbGRpbmdFYXJsaWVzdFNsb3Qoc2Vzc2lvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTbG90IGxvY2tlZFxuICAgKi9cbiAgYnVpbGRpbkJ1c3lTbG90KHNlc3Npb246IFNlc3Npb24pOiBNb21lbnQge1xuICAgIGNvbnN0IG1tdEV2ZW50U3RhcnQgPSBtb21lbnQoc2Vzc2lvbi5zdGFydCwgJ1lZWVktTU0tRERISDptbScpO1xuICAgIGNvbnN0IG1tdEV2ZW50RW5kID0gbW9tZW50KHNlc3Npb24uZW5kLCAnWVlZWS1NTS1EREhIOm1tJyk7XG5cbiAgICBpZiAoIW1tdEV2ZW50U3RhcnQgfHwgIW1tdEV2ZW50U3RhcnQuaXNWYWxpZCgpXG4gICAgICB8fCAhbW10RXZlbnRFbmQgfHwgIW1tdEV2ZW50RW5kLmlzVmFsaWQoKVxuICAgICAgfHwgIW1tdEV2ZW50U3RhcnQuaXNTYW1lT3JCZWZvcmUobW10RXZlbnRFbmQpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdpbnZhbGlkIGRhdGVzJywgbW10RXZlbnRTdGFydCwgbW10RXZlbnRFbmQpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qIGJ1aWxkaW5nIGJ1c3kgc2xvdHMgYnkgZXZlbnRzICovXG4gICAgY29uc3QgZXZlbnRzVGltZVJhbmdlOiBUd2l4SXRlciA9IG1tdEV2ZW50U3RhcnQudHdpeChtbXRFdmVudEVuZCkuaXRlcmF0ZShzZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuXG4gICAgd2hpbGUgKGV2ZW50c1RpbWVSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHt0aW1lLCBtbXRUaW1lfSA9IENhbGVuZGFyQ29tcG9uZW50LnNwbGl0UmFuZ2VUb05leHRUaW1lKGV2ZW50c1RpbWVSYW5nZSwgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgICAvKiBJRiB0aGUgYnVzeSBzbG90IGlzIGF2YWlsYWJlIGFuZCBub3QgYWxyZWFkeSBpbiBidXN5U2xvdHMgd2UgY291bnQgaXQgKi9cbiAgICAgIGlmICh0aGlzLmRheXNBdmFpbGFiaWxpdHkgJiZcbiAgICAgICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5Lmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSAmJlxuICAgICAgICAhdGhpcy5idXN5U2xvdHMuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSkgJiZcbiAgICAgICAgIXRoaXMuZGF5c0F2YWlsYWJpbGl0eS5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkuaW5jbHVkZXModGltZS5mb3JtYXQoJ0hIOm1tJykpKSB7XG4gICAgICAgIGlmICgoIXNlc3Npb24uY3VzdG9tZXJzIHx8XG4gICAgICAgICAgKHNlc3Npb24uY3VzdG9tZXJzICYmXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyICYmXG4gICAgICAgICAgICAhc2Vzc2lvbi5jdXN0b21lcnMubWFwKGMgPT4gYy5pZCkuaW5jbHVkZXModGhpcy5jdXN0b21lci5pZCkpKSkge1xuICAgICAgICAgIHRoaXMuc2V0T3RoZXJCdXN5U2xvdHModGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlc3Npb24uY3VzdG9tZXJzICYmIHRoaXMuY3VzdG9tZXIgJiYgc2Vzc2lvbi5jdXN0b21lcnMubWFwKGMgPT4gYy5pZCkuaW5jbHVkZXModGhpcy5jdXN0b21lci5pZCkpIHtcbiAgICAgICAgICB0aGlzLnNldFNlc3Npb25TbG90KGV2ZW50c1RpbWVSYW5nZSwgdGltZSwgc2Vzc2lvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5zZXNzaW9ucy5uZXh0KHRoaXMuc2Vzc2lvbnMpO1xuXG4gICAgcmV0dXJuIG1tdEV2ZW50U3RhcnQ7XG4gIH1cblxuICBzZXRPdGhlckJ1c3lTbG90cyh0aW1lOiBUd2l4KSB7XG4gICAgbGV0IGRheUJ1c3lOdW1iZXIgPSB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgP1xuICAgICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuZ2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpIDogMDtcbiAgICBkYXlCdXN5TnVtYmVyKys7XG4gICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuc2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJyksIGRheUJ1c3lOdW1iZXIpO1xuICAgIHRoaXMuYnVzeVNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIGluIHNlc3Npb25zIE1hcCBvbmx5IHN0YXJ0IHNlc3Npb24gd2l0aCBpdHMgc2Vzc2lvblxuICAgKi9cbiAgc2V0U2Vzc2lvblNsb3QoZXZlbnRzVGltZVJhbmdlOiBUd2l4SXRlciwgdGltZTogVHdpeCwgc2Vzc2lvbjogU2Vzc2lvbikge1xuICAgIHRoaXMuc2Vzc2lvbnNTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICBpZiAoIWV2ZW50c1RpbWVSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXNzaW9ucy5zZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpLCBzZXNzaW9uKTtcbiAgICB0aGlzLnNlc3Npb25zU3RhcnRTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTbG90IGJlZm9yZSBhdmFpbGFiaWxpdHkgcmFuZ2VcbiAgICovXG4gIGJ1aWxkaW5nRWFybGllc3RTbG90KHNlc3Npb246IFNlc3Npb24pIHtcbiAgICBjb25zdCBtbXRFdmVudFN0YXJ0OiBNb21lbnQgPSBtb21lbnQoc2Vzc2lvbi5zdGFydCwgJ1lZWVktTU0tRERISDptbScpO1xuICAgIGlmICghbW10RXZlbnRTdGFydCB8fCAhdGhpcy5yZWFsRHVyYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKiBidWlsZGluZyBlYXJsaWVzdCBzbG90IGJlZm9yZSBldmVudCAqL1xuICAgIGNvbnN0IG1tdEVhcmx5U3RhcnQgPSBtbXRFdmVudFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKG1tdEVhcmx5U3RhcnQubWludXRlcygpIC1cbiAgICAgIChtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAlIHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbikgKyB0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb24pO1xuICAgIGNvbnN0IGVhcmxpZXN0VGltZVJhbmdlOiBUd2l4SXRlciA9IG1tdEVhcmx5U3RhcnQudHdpeChtbXRFdmVudFN0YXJ0KS5pdGVyYXRlKHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAoZWFybGllc3RUaW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB7dGltZSwgbW10VGltZX0gPSBDYWxlbmRhckNvbXBvbmVudC5zcGxpdFJhbmdlVG9OZXh0VGltZShlYXJsaWVzdFRpbWVSYW5nZSwgdGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgIC8qIElGIHRoZSBidXN5IHNsb3QgaXMgaW4gYXZhaWxhYmlsaXR5IGFuZCBub3QgYWxyZWFkeSBpbiBidXN5U2xvdHMgd2UgY291bnQgaXQgKi9cbiAgICAgIGlmICh0aGlzLmRheXNBdmFpbGFiaWxpdHkgJiZcbiAgICAgICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5Lmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKVxuICAgICAgICAmJiAhdGhpcy5idXN5U2xvdHMuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSlcbiAgICAgICAgJiYgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmdldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKS5pbmNsdWRlcyh0aW1lLmZvcm1hdCgnSEg6bW0nKSkpIHtcbiAgICAgICAgbGV0IGRheUJ1c3lOdW1iZXIgPSB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgP1xuICAgICAgICAgIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmdldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSA6IDA7XG4gICAgICAgIGRheUJ1c3lOdW1iZXIrKztcbiAgICAgICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuc2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJyksIGRheUJ1c3lOdW1iZXIpO1xuICAgICAgICB0aGlzLmJ1c3lTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==