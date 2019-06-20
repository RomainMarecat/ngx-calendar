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
                this.loadCalendar();
            }
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
    CalendarComponent.prototype.loadCalendar = /**
     * On start/viewMode changed, do a recalculate of init start, end
     * days, daysAvailability and viewMode
     * @return {?}
     */
    function () {
        this.setCalendar();
        this.setViewMode();
        this.loadEvents(this.start, this.end);
        this.setDateRange(this.start, this.end);
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
        this.daysAvailability = new Map();
        // Days range from start to end
        /** @type {?} */
        var daysRange = start
            .twix(end)
            .iterate(1, 'days');
        this.days = [];
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
        this.realDuration = this.onlineSession.session_type.duration;
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
            mmtDayEndTime.subtract(_this.realDuration, 'minutes');
            // slots iterator
            /** @type {?} */
            var timeRange = mmtDayStartTime.twix(mmtDayEndTime)
                .iterate(_this.onlineSession.session_type.duration, 'minutes');
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
        var timeInnerRange = mmtStart.twix(mmtEnd).iterateInner(session.details.duration, 'minutes');
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
            (mmtEarlyStart.minutes() % session.details.duration) + session.details.duration);
        /** @type {?} */
        var timeEarlierRange = mmtEarlyStart.twix(mmtStart).iterate(session.details.duration, 'minutes');
        while (timeEarlierRange.hasNext()) {
            /** @type {?} */
            var time = timeEarlierRange.next();
            /** @type {?} */
            var mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.details.duration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                this.earlySlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* building pause slots after event */
        /** @type {?} */
        var mmtEarlyEnd = mmtEnd.clone();
        mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.details.duration);
        /** @type {?} */
        var mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
        /** @type {?} */
        var timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.details.duration, 'minutes');
        while (timePauseRange.hasNext()) {
            /** @type {?} */
            var time = timePauseRange.next();
            /** @type {?} */
            var mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.details.duration);
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
        var timeInnerRange = mmtStart.twix(mmtEnd).iterate(session.details.duration, 'minutes');
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
            (mmtEarlyStart.minutes() % session.details.duration) + session.details.duration);
        /** @type {?} */
        var timeEarlyRange = mmtEarlyStart.twix(mmtStart).iterate(session.details.duration, 'minutes');
        while (timeEarlyRange.hasNext()) {
            /** @type {?} */
            var time = timeEarlyRange.next();
            /** @type {?} */
            var mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.details.duration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                this.earlySlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* removing pause slots */
        if (session.pause) {
            /** @type {?} */
            var mmtEarlyEnd = mmtEnd.clone();
            mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.details.duration);
            /** @type {?} */
            var mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
            /** @type {?} */
            var timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.details.duration, 'minutes');
            while (timePauseRange.hasNext()) {
                /** @type {?} */
                var time = timePauseRange.next();
                /** @type {?} */
                var mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.details.duration);
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
        this.busySlots = new Set();
        this.daysBusySlotNumber = new Map();
        if (Array.isArray(this._sessionsEntries) && this._sessionsEntries.length) {
            this._sessionsEntries = __spread(this._sessionsEntries.filter((/**
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
                    return true;
                }
                return false;
            })));
        }
        this.cd.markForCheck();
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
            || !mmtEventStart.isBefore(mmtEventEnd)) {
            console.error('invalid dates');
            return null;
        }
        /* building busy slots by events */
        /** @type {?} */
        var eventsTimeRange = mmtEventStart.twix(mmtEventEnd).iterate(session.details.duration, 'minutes');
        /** @type {?} */
        var i = 0;
        while (eventsTimeRange.hasNext()) {
            var _a = CalendarComponent.splitRangeToNextTime(eventsTimeRange, session.details.duration), time = _a.time, mmtTime = _a.mmtTime;
            /* IF the busy slot is availabe and not already in busySlots we count it */
            if (this.daysAvailability && this.daysAvailability.has(time.format('YYYY-MM-DD')) &&
                !this.busySlots.has(time.format('YYYY-MM-DDHH:mm')) &&
                this.daysAvailability.get(time.format('YYYY-MM-DD')).indexOf(time.format('HH:mm')) >= 0) {
                if ((!session.user ||
                    (session.user &&
                        session.user.uid !== this.user.uid))) {
                    /** @type {?} */
                    var dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
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
        /* building earliest slot before event */
        /** @type {?} */
        var mmtEarlyStart = mmtEventStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % this.onlineSession.session_type.duration) + this.onlineSession.session_type.duration);
        /** @type {?} */
        var earliestTimeRange = mmtEarlyStart.twix(mmtEventStart).iterate(this.onlineSession.session_type.duration, 'minutes');
        while (earliestTimeRange.hasNext()) {
            var _a = CalendarComponent.splitRangeToNextTime(earliestTimeRange, this.onlineSession.session_type.duration), time = _a.time, mmtTime = _a.mmtTime;
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
                    template: "<div class=\"week-calendar-wrapper\">\n  <div class=\"week-calendar-header\">\n\n\n    <div class=\"week-calendar-title\">\n\n\n      <lib-calendar-header [start]=\"start\"\n                           [end]=\"end\"\n                           [headerConfiguration]=\"calendarConfiguration\"\n                           [viewMode]=\"viewMode\"\n                           (switchedView)=\"onSwithedView($event)\"\n                           (startChanged)=\"onStartChanged($event)\"></lib-calendar-header>\n\n    </div>\n\n  </div>\n\n  <div>\n\n\n    <lib-calendar-body [bodyConfiguration]=\"calendarConfiguration\"\n                       [onlineSession]=\"onlineSession\"\n                       [days]=\"days\"\n                       [viewMode]=\"viewMode\"\n                       [start]=\"start\"\n                       [end]=\"end\"\n                       [daysAvailability]=\"daysAvailability\"\n                       [daysBusySlotNumber]=\"daysBusySlotNumber\"\n                       [daysAvailabilitySlotNumber]=\"daysAvailabilitySlotNumber\"\n                       [busySlots]=\"busySlots\"\n                       [user]=\"user\"\n                       [earlySlots]=\"earlySlots\"\n                       [pauseSlots]=\"pauseSlots\"\n                       [sessionsSlots]=\"sessionsSlots\"\n                       [sessionsEndSlots]=\"sessionsEndSlots\"\n                       [sessions]=\"sessions\"\n                       (startChanged)=\"onStartChanged($event)\"\n                       (sessionAdded)=\"onSessionAdded($event)\"\n                       (sessionRemoved)=\"onSessionRemoved($event)\"\n                       *ngIf=\"start && end && days && viewMode\"></lib-calendar-body>\n\n  </div>\n</div>\n",
                    styles: [".week-calendar-wrapper .week-calendar-header{padding-bottom:20px}@media (min-width:768px){.week-calendar-wrapper .week-calendar-header .week-calendar-title{width:90vw}}"]
                }] }
    ];
    /** @nocollapse */
    CalendarComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
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
    return CalendarComponent;
}());
export { CalendarComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUdsQyxPQUFPLE1BQU0sQ0FBQzs7SUFPUixNQUFNLEdBQUcsT0FBTztBQUV0QjtJQXdJRSwyQkFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7Ozs7UUFySGhDLGtCQUFhLEdBQWtCO1lBQ3RDLEdBQUcsRUFBRSxJQUFJO1lBQ1QsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxFQUFFO2dCQUNSLFdBQVcsRUFBRSxDQUFDO2dCQUNkLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixRQUFRLEVBQUUsRUFBRTtnQkFDWixLQUFLLEVBQUUsQ0FBQzthQUNUO1lBQ0QsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNoQixVQUFVLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLEdBQUcsRUFBRSxZQUFZO2FBQ2xCO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLEtBQUssRUFBRSxPQUFPO2dCQUNkLEdBQUcsRUFBRSxPQUFPO2FBQ2I7U0FDRixDQUFDOzs7O1FBWU8sMEJBQXFCLEdBQTBCO1lBQ3RELFFBQVEsRUFBRTtnQkFDUixHQUFHLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCO2dCQUNELEtBQUssRUFBRSxjQUFjO2dCQUNyQixVQUFVLEVBQUUsbUNBQW1DO2dCQUMv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LDJDQUE4RTs7Ozs7SUFJOUUsaUNBQXNCOzs7OztJQUl0Qix5Q0FBcUI7Ozs7O0lBSXJCLDZDQUF3Qzs7Ozs7SUFJeEMsK0NBQXdDOzs7OztJQUl4Qyx1REFBZ0Q7Ozs7O0lBSWhELHNDQUF1Qjs7Ozs7SUFJdkIsdUNBQXdCOzs7OztJQUl4Qix1Q0FBd0I7Ozs7O0lBSXhCLDBDQUEyQjs7Ozs7SUFJM0IsNkNBQThCOzs7OztJQUk5QixxQ0FBK0I7Ozs7OztJQUkvQiwwQ0FBOEI7Ozs7OztJQUk5Qix3Q0FBNEI7Ozs7O0lBUTVCLDZDQUFpQzs7SUFjakMsc0NBQTJCOzs7OztJQXBCZiwrQkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgVHdpeCwgVHdpeEl0ZXIgfSBmcm9tICd0d2l4JztcbmltcG9ydCAndHdpeCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9zaGFyZWQvY29uZmlndXJhdGlvbi9jYWxlbmRhci1jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IERheSB9IGZyb20gJy4uL3NoYXJlZC9kYXkvZGF5JztcbmltcG9ydCB7IE9ubGluZVNlc3Npb24gfSBmcm9tICcuLi9zaGFyZWQvc2Vzc2lvbi9vbmxpbmUtc2Vzc2lvbic7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vc2hhcmVkL3Nlc3Npb24vc2Vzc2lvbic7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4uL3NoYXJlZC9ldmVudC9ldmVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZVxuICBzZWxlY3RvcjogJ25neC1jYWxlbmRhcicsXG4gIC8vIHRzbGludDplbmFibGVcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBVc2VyIGNvdWxkIGJlIHBhc3NlZCB0byBnZW5lcmF0ZSBhIHBlcnNvbmFsIGNhbGVuZGFyXG4gICAqL1xuICBASW5wdXQoKSB1c2VyOiB7XG4gICAgdWlkOiBzdHJpbmc7XG4gICAgZGlzcGxheU5hbWU6IHN0cmluZztcbiAgICBlbWFpbDogc3RyaW5nO1xuICB9O1xuICAvKipcbiAgICogT25saW5lIHNlc3Npb25zIGRlZmluaXRpb25cbiAgICovXG4gIEBJbnB1dCgpIG9ubGluZVNlc3Npb246IE9ubGluZVNlc3Npb24gPSB7XG4gICAga2V5OiBudWxsLFxuICAgIHNlc3Npb25fdHlwZToge1xuICAgICAgbmFtZTogJycsXG4gICAgICBtYXhfcGVyc29uczogMSxcbiAgICAgIGJvb2tpbmdfZGVsYXk6IDEsXG4gICAgICBkdXJhdGlvbjogMTUsXG4gICAgICBwYXVzZTogMCxcbiAgICB9LFxuICAgIHByaWNlczogWzEwLCAyMF0sXG4gICAgZGF0ZV9yYW5nZToge1xuICAgICAgc3RhcnQ6ICcyMDE5LTAxLTAxJyxcbiAgICAgIGVuZDogJzIwMzAtMTItMzEnLFxuICAgIH0sXG4gICAgdGltZV9yYW5nZToge1xuICAgICAgc3RhcnQ6ICcwODowMCcsXG4gICAgICBlbmQ6ICcxOTowMCcsXG4gICAgfVxuICB9O1xuICAvKipcbiAgICogU3RhcnQgZGF5IG9mIGNhbGVuZGFyIChjb3VsZCBiZSB1cGRhdGVkKVxuICAgKi9cbiAgQElucHV0KCkgc3RhcnQ6IE1vbWVudDtcbiAgLyoqXG4gICAqIEVuZCBkYXkgb2YgY2FsZW5kYXIgKGNvdWxkIGJlIHVwZGF0ZWQgYnV0IHJlZXdyaXRlbiBvbiBzd2l0Y2ggd2VlayBtb2RlXG4gICAqL1xuICBASW5wdXQoKSBlbmQ6IE1vbWVudDtcbiAgLyoqXG4gICAqIENvbmZpZ3VyYXRpb24gY2FsZW5kYXJcbiAgICovXG4gIEBJbnB1dCgpIGNhbGVuZGFyQ29uZmlndXJhdGlvbjogQ2FsZW5kYXJDb25maWd1cmF0aW9uID0ge1xuICAgIGNhbGVuZGFyOiB7XG4gICAgICBjdGE6IHtcbiAgICAgICAgbmV4dDogJ3N1aXZhbnQnLFxuICAgICAgICBwcmV2aW91czogJ3Byw6ljw6lkZW50JyxcbiAgICAgIH0sXG4gICAgICB0b2RheTogJ2F1am91cmRcXCdodWknLFxuICAgICAgYmFja190b2RheTogJ3JldmVuaXIgw6AgbGEgZGF0ZSBkXFwnYXVqb3VyZFxcJ2h1aScsXG4gICAgICBkYXk6ICdqb3VyJyxcbiAgICAgIHRocmVlX2RheXM6ICczIGpvdXJzJyxcbiAgICAgIHdlZWs6ICdzZW1haW5lJyxcbiAgICAgIHRpdGxlOiAncsOpc2VydmVyIHZvdHJlIGNyw6luZWF1JyxcbiAgICAgIHN1YnRpdGxlOiAndG91dGVzIGxlcyBkaXNwb25pYmlsaXTDqXMnLFxuICAgICAgYXZhaWxhYmlsaXR5OiB7XG4gICAgICAgIGVtcHR5OiAnQXVjdW5lIGRpc3BvbmliaWxpdMOpJyxcbiAgICAgICAgc2xvdDogJ1Byb2NoYWluZSBkaXNwb25pYmlsaXTDqScsXG4gICAgICB9LFxuICAgICAgc2Vzc2lvbjoge1xuICAgICAgICBpbmZvOiAnQ3LDqW5lYXUgdsOpcnJvdWlsbMOpJ1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFdoZW4gdXNlciBzd2hpdGNoIHZpZXcgbW9kZSBldmVudFxuICAgKi9cbiAgQE91dHB1dCgpIHZpZXdNb2RlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPFN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPFN0cmluZz4oKTtcbiAgLyoqXG4gICAqIFNlc3Npb24gY3JlYXRlZCBldmVudFxuICAgKi9cbiAgQE91dHB1dCgpIHNlc3Npb25DcmVhdGVkOiBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlc3Npb24+KCk7XG4gIC8qKlxuICAgKiBTZXNzaW9uIHJlbW92ZWQgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSBzZXNzaW9uUmVtb3ZlZDogRXZlbnRFbWl0dGVyPFNlc3Npb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZXNzaW9uPigpO1xuICAvKipcbiAgICogQXJyYXkgb2Ygc2VsZWN0YWJsZSBkYXlzIGZyb20gc3RhcnQgdG8gZW5kXG4gICAqL1xuICBkYXlzOiBBcnJheTxEYXk+ID0gW107XG4gIC8qKlxuICAgKiBTbG90IER1cmF0aW9uIGluIG1pbnV0ZXNcbiAgICovXG4gIHJlYWxEdXJhdGlvbjogbnVtYmVyO1xuICAvKipcbiAgICogRHVyaW5nIGRheXMgZnJvbSBzdGFydCB0byBlbmQsIGxpc3Qgb2YgZW50cmllcyB0aGF0IGF2YWlsYWJsZVxuICAgKi9cbiAgZGF5c0F2YWlsYWJpbGl0eTogTWFwPHN0cmluZywgc3RyaW5nW10+O1xuICAvKipcbiAgICogTnVtYmVyIG9mIGJ1c3kgc2xvdCBpbiBlYWNoIGRheVxuICAgKi9cbiAgZGF5c0J1c3lTbG90TnVtYmVyOiBNYXA8c3RyaW5nLCBudW1iZXI+O1xuICAvKipcbiAgICogTnVtYmVyIG9mIGF2YWlsYWJsZSBzbG90IGluIGVhY2ggZGF5XG4gICAqL1xuICBkYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlcjogTWFwPHN0cmluZywgbnVtYmVyPjtcbiAgLyoqXG4gICAqIFNldCBvZiBkYXRldGltZSB3aG8gcmVwcmVuc2VudHMgYXZhaWxhYmlsaXR5XG4gICAqL1xuICBidXN5U2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogc2V0IG9mIGRhdGV0aW1lIHdobyByZXByZXNlbnRzIG92ZXIgZXh0ZW5kcyBidXN5IHNsb3RcbiAgICovXG4gIGVhcmx5U2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogc2V0IG9mIGRhdGV0aW1lIHdobyByZXByZXNlbnRzIHBhdXNlIHNsb3RcbiAgICovXG4gIHBhdXNlU2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogc2V0IG9mIGRhdGV0aW1lIHdobyByZXByZXNlbnRzIHNlc3Npb24gc2xvdFxuICAgKi9cbiAgc2Vzc2lvbnNTbG90czogU2V0PHN0cmluZz47XG4gIC8qKlxuICAgKiBzZXQgb2YgZGF0ZXRpbWUgd2hvIHJlcHJlc2VudHMgZW5kIHNsb3QgKG5vdCB1c2VkIGluIGZyb250KVxuICAgKi9cbiAgc2Vzc2lvbnNFbmRTbG90czogU2V0PHN0cmluZz47XG4gIC8qKlxuICAgKiBNYXAgb2Ygc2Vzc2lvbnMgZnJvbSBjdXJyZW50IHVzZXJcbiAgICovXG4gIHNlc3Npb25zOiBNYXA8c3RyaW5nLCBTZXNzaW9uPjtcbiAgLyoqXG4gICAqIGNhbGVuZGFyIHN0YXJ0IGRheSBhZnRlciBzZXQgZnVsbCBjYWxlbmRhciBpbmZvcm1hdGlvbnNcbiAgICovXG4gIHByaXZhdGUgY2FsZW5kYXJTdGFydDogTW9tZW50O1xuICAvKipcbiAgICogY2FsZW5kYXIgZW5kIGRheSBhZnRlciBzZXQgZnVsbCBjYWxlbmRhciBpbmZvcm1hdGlvbnNcbiAgICovXG4gIHByaXZhdGUgY2FsZW5kYXJFbmQ6IE1vbWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICB9XG5cbiAgLyoqXG4gICAqIFNlc3Npb25zIGFycmF5IGxvYWRlZCBieSBwYXJlbnQgY29tcG9uZW50XG4gICAqL1xuICBfc2Vzc2lvbnNFbnRyaWVzOiBTZXNzaW9uW10gPSBbXTtcblxuICBnZXQgc2Vzc2lvbnNFbnRyaWVzKCk6IFNlc3Npb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb25zRW50cmllcztcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzZXNzaW9uc0VudHJpZXMoc2Vzc2lvbnNFbnRyaWVzOiBTZXNzaW9uW10pIHtcbiAgICBpZiAoc2Vzc2lvbnNFbnRyaWVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fc2Vzc2lvbnNFbnRyaWVzID0gc2Vzc2lvbnNFbnRyaWVzO1xuICAgICAgdGhpcy5sb2FkQ2FsZW5kYXIoKTtcbiAgICB9XG4gIH1cblxuICAvLyBEZWZhdWx0IFZpZXcgTW9kZSBvZiBXZWVrIENvbXBvbmVudFxuICBfdmlld01vZGU6IFN0cmluZyA9ICd3ZWVrJztcblxuICBnZXQgdmlld01vZGUoKTogU3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld01vZGU7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgdmlld01vZGUodmlld01vZGUpIHtcbiAgICB0aGlzLl92aWV3TW9kZSA9IHZpZXdNb2RlO1xuICAgIHRoaXMuc2V0Vmlld01vZGUoKTtcbiAgfVxuXG4gIHN0YXRpYyBzcGxpdFJhbmdlVG9OZXh0VGltZShzbG90VGltZVJhbmdlOiBUd2l4SXRlciwgc2xvdER1cmF0aW9uOiBudW1iZXIpOiB7dGltZTogVHdpeCwgbW10VGltZTogTW9tZW50fSB7XG4gICAgY29uc3QgdGltZTogVHdpeCA9IHNsb3RUaW1lUmFuZ2UubmV4dCgpO1xuICAgIHJldHVybiB7dGltZTogdGltZSwgbW10VGltZTogQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzbG90RHVyYXRpb24pfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRNaW51dGVzRGlmZmVyZW5jZShtbXRUaW1lOiBNb21lbnQsIHNsb3REdXJhdGlvbjogbnVtYmVyKTogTW9tZW50IHtcbiAgICBpZiAobW10VGltZS5taW51dGVzKCkgJSBzbG90RHVyYXRpb24gIT09IDApIHtcbiAgICAgIG1tdFRpbWUubWludXRlcyhtbXRUaW1lLm1pbnV0ZXMoKSAtIChtbXRUaW1lLm1pbnV0ZXMoKSAlIHNsb3REdXJhdGlvbikpO1xuICAgIH1cblxuICAgIHJldHVybiBtbXRUaW1lO1xuICB9XG5cbiAgc3RhdGljIGdlU3RhcnRFbmRGcm9tU3RhcnRBbmRTZXNzaW9uRHVyYXRpb24oc3RhcnQ6IE1vbWVudCwgZW5kOiBNb21lbnQsIGR1cmF0aW9uOiBudW1iZXIpOiB7c3RhcnQ6IE1vbWVudCwgZW5kOiBNb21lbnR9IHtcbiAgICBjb25zdCBldmVudHNUaW1lUmFuZ2U6IFR3aXhJdGVyID0gc3RhcnQudHdpeChlbmQpLml0ZXJhdGUoZHVyYXRpb24sICdtaW51dGVzJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgZW5kOiBlbmRcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3BlY3QgYWxsIGNoYW5nZXNcbiAgICovXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMubG9hZENhbGVuZGFyKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IERlZmF1bHQgdmFyaWFibGVzXG4gICAqL1xuICBzZXRDYWxlbmRhcigpIHtcbiAgICB0aGlzLnNlc3Npb25zU2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuZWFybHlTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLnBhdXNlU2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5zZXNzaW9ucyA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgVmlldyBNb2RlIHdpdGggd2VlaywgZGF5LCAzIGRheXNcbiAgICogSW5pdCBzdGFydCwgZW5kLFxuICAgKlxuICAgKi9cbiAgc2V0Vmlld01vZGUoKSB7XG4gICAgaWYgKHRoaXMudmlld01vZGUgPT09ICdkYXknKSB7XG4gICAgICB0aGlzLmVuZCA9IHRoaXMuc3RhcnQ7XG4gICAgICB0aGlzLmNhbGVuZGFyU3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuc3RhcnRPZignZGF5Jyk7XG4gICAgICB0aGlzLmNhbGVuZGFyRW5kID0gbW9tZW50KHRoaXMuZW5kKS5lbmRPZignZGF5Jyk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh0aGlzLnZpZXdNb2RlID09PSAndGhyZWVfZGF5cycpIHtcbiAgICAgIHRoaXMuZW5kID0gbW9tZW50KHRoaXMuc3RhcnQpLmFkZCgyLCAnZGF5cycpO1xuICAgICAgdGhpcy5jYWxlbmRhclN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLnN0YXJ0T2YoJ2RheScpO1xuICAgICAgdGhpcy5jYWxlbmRhckVuZCA9IG1vbWVudCh0aGlzLmVuZCkuZW5kT2YoJ2RheScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBJbml0IGZpcnN0IGRheSB3ZWVrIG51bWJlclxuICAgIGNvbnN0IGZpcnN0RGF5ID0gMDtcbiAgICAvLyBJZiBlbXB0eSBzdGFydCBkYXRlIHRoZW4gc3RhcnQgdG8gdG9kYXlcbiAgICBpZiAoIXRoaXMuc3RhcnQpIHtcbiAgICAgIHRoaXMuc3RhcnQgPSBtb21lbnQoKTtcbiAgICB9XG4gICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5kYXkoZmlyc3REYXkpO1xuICAgIHRoaXMuZW5kID0gbW9tZW50KHRoaXMuc3RhcnQpLmFkZCg2LCAnZGF5cycpO1xuXG4gICAgdGhpcy5jYWxlbmRhclN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLnN0YXJ0T2YoJ2RheScpO1xuICAgIHRoaXMuY2FsZW5kYXJFbmQgPSBtb21lbnQodGhpcy5lbmQpLmVuZE9mKCdkYXknKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBzdGFydC92aWV3TW9kZSBjaGFuZ2VkLCBkbyBhIHJlY2FsY3VsYXRlIG9mIGluaXQgc3RhcnQsIGVuZFxuICAgKiBkYXlzLCBkYXlzQXZhaWxhYmlsaXR5IGFuZCB2aWV3TW9kZVxuICAgKi9cbiAgbG9hZENhbGVuZGFyKCkge1xuICAgIHRoaXMuc2V0Q2FsZW5kYXIoKTtcbiAgICB0aGlzLnNldFZpZXdNb2RlKCk7XG4gICAgdGhpcy5sb2FkRXZlbnRzKHRoaXMuc3RhcnQsIHRoaXMuZW5kKTtcbiAgICB0aGlzLnNldERhdGVSYW5nZSh0aGlzLnN0YXJ0LCB0aGlzLmVuZCk7XG4gICAgdGhpcy5sb2FkQXZhaWxhYmlsaXRpZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYXZhaWxhYmxlIGRheXMgZnJvbSBzdGFydCB0byBlbmQgZGF0ZXNcbiAgICovXG4gIHNldERhdGVSYW5nZShzdGFydDogTW9tZW50LCBlbmQ6IE1vbWVudCkge1xuICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eSA9IG5ldyBNYXAoKTtcbiAgICAvLyBEYXlzIHJhbmdlIGZyb20gc3RhcnQgdG8gZW5kXG4gICAgY29uc3QgZGF5c1JhbmdlOiBUd2l4SXRlciA9IHN0YXJ0XG4gICAgICAudHdpeChlbmQpXG4gICAgICAuaXRlcmF0ZSgxLCAnZGF5cycpO1xuICAgIHRoaXMuZGF5cyA9IFtdO1xuICAgIC8vIExvYWRpbmcgYWxsIGRheXNcbiAgICB3aGlsZSAoZGF5c1JhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgYXZhaWxhYmxlRGF5OiBUd2l4ID0gZGF5c1JhbmdlLm5leHQoKTtcbiAgICAgIHRoaXMuZGF5cy5wdXNoKHtcbiAgICAgICAgdGl0bGU6IGF2YWlsYWJsZURheS5mb3JtYXQoJ0REL01NL1lZWVknKSxcbiAgICAgICAga2V5OiBhdmFpbGFibGVEYXkuZm9ybWF0KCdZWVlZLU1NLUREJyksXG4gICAgICAgIHZhbHVlOiBtb21lbnQoYXZhaWxhYmxlRGF5LnRvRGF0ZSgpKVxuICAgICAgfSk7XG4gICAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkuc2V0KGF2YWlsYWJsZURheS5mb3JtYXQoJ1lZWVktTU0tREQnKSwgW10pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBzd2l0Y2ggZGF0ZSByYW5nZVxuICAgKi9cbiAgb25Td2l0aGVkVmlldyh2aWV3TW9kZTogU3RyaW5nKSB7XG4gICAgdGhpcy52aWV3TW9kZSA9IHZpZXdNb2RlO1xuICAgIHRoaXMudmlld01vZGVDaGFuZ2VkLmVtaXQodmlld01vZGUpO1xuICAgIHRoaXMubG9hZENhbGVuZGFyKCk7XG4gIH1cblxuICAvKipcbiAgICogT24gc3RhcnQgY2hhbmdlIGV2ZW50XG4gICAqL1xuICBvblN0YXJ0Q2hhbmdlZChzdGFydDogTW9tZW50KSB7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMubG9hZENhbGVuZGFyKCk7XG4gIH1cblxuICAvKipcbiAgICogT24gc2Vzc2lvbiBhZGRlZCBvbiBjbGljayBldmVudFxuICAgKi9cbiAgb25TZXNzaW9uQWRkZWQoc2Vzc2lvbjogU2Vzc2lvbikge1xuICAgIHRoaXMuc2Vzc2lvbnMuc2V0KG1vbWVudChzZXNzaW9uLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpLCBzZXNzaW9uKTtcbiAgICB0aGlzLmFkZFNlc3Npb24oc2Vzc2lvbik7XG4gICAgdGhpcy5zZXNzaW9uQ3JlYXRlZC5lbWl0KHNlc3Npb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHJlbW92ZWQgZXZlbnRcbiAgICovXG4gIG9uU2Vzc2lvblJlbW92ZWQoc291cmNlOiB7a2V5OiBzdHJpbmcsIHNlc3Npb246IFNlc3Npb259KSB7XG4gICAgdGhpcy5zZXNzaW9ucy5kZWxldGUoc291cmNlLmtleSk7XG4gICAgdGhpcy5yZW1vdmVTZXNzaW9uKHNvdXJjZS5zZXNzaW9uKTtcbiAgICB0aGlzLnNlc3Npb25SZW1vdmVkLmVtaXQoc291cmNlLnNlc3Npb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgYWxsIHRpbWUgZm9yIGVhY2ggZGF5c1xuICAgKi9cbiAgbG9hZEF2YWlsYWJpbGl0aWVzKCkge1xuICAgIC8vIG5vIG9ubGluZSBzZXNzaW9uIG5vIGNhbGVuZGFyXG4gICAgaWYgKCF0aGlzLmRheXNBdmFpbGFiaWxpdHkgfHwgIXRoaXMub25saW5lU2Vzc2lvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBzZXNzaW9uIGR1cmF0aW9uXG4gICAgdGhpcy5yZWFsRHVyYXRpb24gPSB0aGlzLm9ubGluZVNlc3Npb24uc2Vzc2lvbl90eXBlLmR1cmF0aW9uO1xuICAgIC8vIHNlc3Npb24gZGF5IHN0YXJ0IDAwOjAwIC0gZW5kIDIzOjU5XG4gICAgY29uc3Qgb25saW5lU2Vzc2lvblN0YXJ0OiBNb21lbnQgPSBtb21lbnQodGhpcy5vbmxpbmVTZXNzaW9uLmRhdGVfcmFuZ2Uuc3RhcnQsICdZWVlZLU1NLUREJykuc3RhcnRPZignZGF5Jyk7XG4gICAgY29uc3Qgb25saW5lU2Vzc2lvbkVuZDogTW9tZW50ID0gbW9tZW50KHRoaXMub25saW5lU2Vzc2lvbi5kYXRlX3JhbmdlLmVuZCwgJ1lZWVktTU0tREQnKS5lbmRPZignZGF5Jyk7XG4gICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlciA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZm9yRWFjaCgoYXZicywgZGF5KSA9PiB7XG4gICAgICBsZXQgc2xvdHNOdW1iZXIgPSAwO1xuICAgICAgLy8gZWFjaCBkYXkgb2YgZGF5cyBhdmFpbGFiaWxpdHkgd2l0aCBzdGFydCB0aW1lIDA4OjAwXG4gICAgICBjb25zdCBtbXREYXkgPSBtb21lbnQoZGF5LCAnWVlZWS1NTS1ERCcpLmhvdXIoOCk7XG4gICAgICBjb25zdCBtbXREYXlTdGFydFRpbWUgPSBtb21lbnQoZGF5ICsgdGhpcy5vbmxpbmVTZXNzaW9uLnRpbWVfcmFuZ2Uuc3RhcnQsICdZWVlZLU1NRERISDptbScpO1xuXG4gICAgICAvLyBJZiBzZXNzaW9uIHN0YXJ0IHRpbWUgbGlrZSAwODowMCBpcyBiZWZvcmUgc3RhcnQgdG9kYXkgMDA6MDBcbiAgICAgIGlmIChtbXREYXlTdGFydFRpbWUuaXNCZWZvcmUobW9tZW50KCkuc3RhcnRPZignZGF5JykpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGJvb2tpbmcgZGVsYXlcbiAgICAgIGNvbnN0IG1pbk1tdFN0YXJ0VGltZSA9IG1vbWVudCgpLmFkZCh0aGlzLm9ubGluZVNlc3Npb24uc2Vzc2lvbl90eXBlLmJvb2tpbmdfZGVsYXksICdob3VycycpO1xuICAgICAgLy8gc2Vzc2lvbiB0aW1lIGVuZFxuICAgICAgY29uc3QgbW10RGF5RW5kVGltZSA9IG1vbWVudChkYXkgKyB0aGlzLm9ubGluZVNlc3Npb24udGltZV9yYW5nZS5lbmQsICdZWVlZLU1NLURESEg6bW0nKTtcbiAgICAgIG1tdERheUVuZFRpbWUuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgICAvLyBzbG90cyBpdGVyYXRvclxuICAgICAgY29uc3QgdGltZVJhbmdlOiBUd2l4SXRlciA9IG1tdERheVN0YXJ0VGltZS50d2l4KG1tdERheUVuZFRpbWUpXG4gICAgICAgIC5pdGVyYXRlKHRoaXMub25saW5lU2Vzc2lvbi5zZXNzaW9uX3R5cGUuZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgICBpZiAodGhpcy5jYWxlbmRhclN0YXJ0ICYmIHRoaXMuY2FsZW5kYXJFbmQgJiYgbW10RGF5LmlzQmV0d2VlbihvbmxpbmVTZXNzaW9uU3RhcnQsIG9ubGluZVNlc3Npb25FbmQpKSB7XG4gICAgICAgIHdoaWxlICh0aW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVSYW5nZS5uZXh0KCk7XG4gICAgICAgICAgY29uc3QgdGltZU1tdDogTW9tZW50ID0gbW9tZW50KHRpbWUudG9EYXRlKCkpO1xuICAgICAgICAgIGlmICghdGltZU1tdC5pc0JlZm9yZShtaW5NbXRTdGFydFRpbWUpKSB7XG4gICAgICAgICAgICBhdmJzLnB1c2godGltZS5mb3JtYXQoJ0hIOm1tJykpO1xuICAgICAgICAgICAgc2xvdHNOdW1iZXIrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXIuc2V0KGRheSwgc2xvdHNOdW1iZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBzZXNzaW9uIGV2ZW50IGluIGNhbGVuZGFyXG4gICAqL1xuICBhZGRTZXNzaW9uKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICBjb25zdCBtbXRTdGFydCA9IG1vbWVudChzZXNzaW9uLnN0YXJ0KTtcbiAgICBjb25zdCBtbXRFbmQgPSBtb21lbnQoc2Vzc2lvbi5lbmQpO1xuICAgIGNvbnN0IHRpbWVJbm5lclJhbmdlOiBUd2l4SXRlciA9IG1tdFN0YXJ0LnR3aXgobW10RW5kKS5pdGVyYXRlSW5uZXIoc2Vzc2lvbi5kZXRhaWxzLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHdoaWxlICh0aW1lSW5uZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lSW5uZXJSYW5nZS5uZXh0KCk7XG4gICAgICB0aGlzLnNlc3Npb25zU2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICBpZiAoIXRpbWVJbm5lclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgICB0aGlzLnNlc3Npb25zRW5kU2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIGJ1aWxkaW5nIGVhcmxpZXN0IHNsb3QgYmVmb3JlIGV2ZW50ICovXG4gICAgY29uc3QgbW10RWFybHlTdGFydCA9IG1tdFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKFxuICAgICAgbW10RWFybHlTdGFydC5taW51dGVzKCkgLVxuICAgICAgKG1tdEVhcmx5U3RhcnQubWludXRlcygpICUgc2Vzc2lvbi5kZXRhaWxzLmR1cmF0aW9uKSArIHNlc3Npb24uZGV0YWlscy5kdXJhdGlvbik7XG4gICAgY29uc3QgdGltZUVhcmxpZXJSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseVN0YXJ0LnR3aXgobW10U3RhcnQpLml0ZXJhdGUoc2Vzc2lvbi5kZXRhaWxzLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHdoaWxlICh0aW1lRWFybGllclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVFYXJsaWVyUmFuZ2UubmV4dCgpO1xuICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzZXNzaW9uLmRldGFpbHMuZHVyYXRpb24pO1xuICAgICAgaWYgKG1tdFRpbWUuaXNTYW1lT3JBZnRlcihtbXRFYXJseVN0YXJ0KSAmJiBtbXRUaW1lLmlzQmVmb3JlKG1tdFN0YXJ0KSkge1xuICAgICAgICB0aGlzLmVhcmx5U2xvdHMuYWRkKG1tdFRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIGJ1aWxkaW5nIHBhdXNlIHNsb3RzIGFmdGVyIGV2ZW50ICovXG4gICAgY29uc3QgbW10RWFybHlFbmQgPSBtbXRFbmQuY2xvbmUoKTtcbiAgICBtbXRFYXJseUVuZC5zdWJ0cmFjdChtbXRFYXJseUVuZC5taW51dGVzKCkgJSBzZXNzaW9uLmRldGFpbHMuZHVyYXRpb24pO1xuICAgIGNvbnN0IG1tdFBhdXNlRW5kID0gbW10RWFybHlFbmQuY2xvbmUoKS5hZGQoc2Vzc2lvbi5wYXVzZSwgJ21pbnV0ZXMnKTtcbiAgICBjb25zdCB0aW1lUGF1c2VSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseUVuZC50d2l4KG1tdFBhdXNlRW5kKS5pdGVyYXRlKHNlc3Npb24uZGV0YWlscy5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZVBhdXNlUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZVBhdXNlUmFuZ2UubmV4dCgpO1xuICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzZXNzaW9uLmRldGFpbHMuZHVyYXRpb24pO1xuICAgICAgaWYgKG1tdFRpbWUuaXNTYW1lT3JBZnRlcihtbXRFYXJseUVuZCkgJiYgbW10VGltZS5pc0JlZm9yZShtbXRQYXVzZUVuZCkpIHtcbiAgICAgICAgdGhpcy5wYXVzZVNsb3RzLmFkZChtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgc2Vzc2lvbiBldmVudCBpbiBDYWxlbmRhclxuICAgKi9cbiAgcmVtb3ZlU2Vzc2lvbihzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgY29uc3QgbW10U3RhcnQgPSBtb21lbnQoc2Vzc2lvbi5zdGFydCk7XG4gICAgY29uc3QgbW10RW5kID0gbW9tZW50KHNlc3Npb24uZW5kKTtcbiAgICBjb25zdCB0aW1lSW5uZXJSYW5nZTogVHdpeEl0ZXIgPSBtbXRTdGFydC50d2l4KG1tdEVuZCkuaXRlcmF0ZShzZXNzaW9uLmRldGFpbHMuZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVJbm5lclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVJbm5lclJhbmdlLm5leHQoKTtcbiAgICAgIHRoaXMuc2Vzc2lvbnNTbG90cy5kZWxldGUodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIGlmICghdGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cy5kZWxldGUodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyogcmVtb3ZpbmcgZWFybHkgc2xvdHMgKi9cbiAgICBjb25zdCBtbXRFYXJseVN0YXJ0ID0gbW10U3RhcnQuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLnJlYWxEdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICBtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoXG4gICAgICBtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAtXG4gICAgICAobW10RWFybHlTdGFydC5taW51dGVzKCkgJSBzZXNzaW9uLmRldGFpbHMuZHVyYXRpb24pICsgc2Vzc2lvbi5kZXRhaWxzLmR1cmF0aW9uKTtcbiAgICBjb25zdCB0aW1lRWFybHlSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseVN0YXJ0LnR3aXgobW10U3RhcnQpLml0ZXJhdGUoc2Vzc2lvbi5kZXRhaWxzLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHdoaWxlICh0aW1lRWFybHlSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lRWFybHlSYW5nZS5uZXh0KCk7XG4gICAgICBjb25zdCBtbXRUaW1lOiBNb21lbnQgPSBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHNlc3Npb24uZGV0YWlscy5kdXJhdGlvbik7XG4gICAgICBpZiAobW10VGltZS5pc1NhbWVPckFmdGVyKG1tdEVhcmx5U3RhcnQpICYmIG1tdFRpbWUuaXNCZWZvcmUobW10U3RhcnQpKSB7XG4gICAgICAgIHRoaXMuZWFybHlTbG90cy5kZWxldGUobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyogcmVtb3ZpbmcgcGF1c2Ugc2xvdHMgKi9cbiAgICBpZiAoc2Vzc2lvbi5wYXVzZSkge1xuICAgICAgY29uc3QgbW10RWFybHlFbmQgPSBtbXRFbmQuY2xvbmUoKTtcbiAgICAgIG1tdEVhcmx5RW5kLnN1YnRyYWN0KG1tdEVhcmx5RW5kLm1pbnV0ZXMoKSAlIHNlc3Npb24uZGV0YWlscy5kdXJhdGlvbik7XG4gICAgICBjb25zdCBtbXRQYXVzZUVuZCA9IG1tdEVhcmx5RW5kLmNsb25lKCkuYWRkKHNlc3Npb24ucGF1c2UsICdtaW51dGVzJyk7XG4gICAgICBjb25zdCB0aW1lUGF1c2VSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseUVuZC50d2l4KG1tdFBhdXNlRW5kKS5pdGVyYXRlKHNlc3Npb24uZGV0YWlscy5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICAgIHdoaWxlICh0aW1lUGF1c2VSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVQYXVzZVJhbmdlLm5leHQoKTtcbiAgICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzZXNzaW9uLmRldGFpbHMuZHVyYXRpb24pO1xuICAgICAgICBpZiAobW10VGltZS5pc1NhbWVPckFmdGVyKG1tdEVhcmx5RW5kKSAmJiBtbXRUaW1lLmlzQmVmb3JlKG1tdFBhdXNlRW5kKSkge1xuICAgICAgICAgIHRoaXMucGF1c2VTbG90cy5kZWxldGUobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICoqKioqKioqKioqKioqKioqKiogRGF0ZSBmdW5jdGlvbnMgKioqKioqKioqKioqKipcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKi9cbiAgbG9hZEV2ZW50cyhzdGFydDogTW9tZW50LCBlbmQ6IE1vbWVudCkge1xuICAgIHRoaXMuYnVzeVNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyID0gbmV3IE1hcCgpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fc2Vzc2lvbnNFbnRyaWVzKSAmJiB0aGlzLl9zZXNzaW9uc0VudHJpZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9zZXNzaW9uc0VudHJpZXMgPSBbXG4gICAgICAgIC4uLnRoaXMuX3Nlc3Npb25zRW50cmllcy5maWx0ZXIoKHNlc3Npb246IFNlc3Npb24pID0+IHtcbiAgICAgICAgICBpZiAobW9tZW50KHNlc3Npb24uc3RhcnQpLmlzU2FtZU9yQWZ0ZXIoc3RhcnQpICYmXG4gICAgICAgICAgICBtb21lbnQoc2Vzc2lvbi5lbmQpLmlzU2FtZU9yQmVmb3JlKGVuZCkpIHtcbiAgICAgICAgICAgIGxldCBtbXRFdmVudFN0YXJ0ID0gbW9tZW50KHNlc3Npb24uc3RhcnQsICdZWVlZLU1NLURESEg6bW0nKTtcbiAgICAgICAgICAgIG1tdEV2ZW50U3RhcnQgPSB0aGlzLmJ1aWxkaW5CdXN5U2xvdChtbXRFdmVudFN0YXJ0LCBzZXNzaW9uKTtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdFYXJsaWVzdFNsb3QobW10RXZlbnRTdGFydCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSlcbiAgICAgIF07XG4gICAgfVxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogU2xvdCBsb2NrZWRcbiAgICovXG4gIGJ1aWxkaW5CdXN5U2xvdChtbXRFdmVudFN0YXJ0OiBNb21lbnQsIHNlc3Npb246IFNlc3Npb24pOiBNb21lbnQge1xuICAgIGNvbnN0IG1tdEV2ZW50RW5kID0gbW9tZW50KHNlc3Npb24uZW5kLCAnWVlZWS1NTS1EREhIOm1tJyk7XG4gICAgaWYgKCFtbXRFdmVudFN0YXJ0IHx8ICFtbXRFdmVudFN0YXJ0LmlzVmFsaWQoKVxuICAgICAgfHwgIW1tdEV2ZW50RW5kIHx8ICFtbXRFdmVudEVuZC5pc1ZhbGlkKClcbiAgICAgIHx8ICFtbXRFdmVudFN0YXJ0LmlzQmVmb3JlKG1tdEV2ZW50RW5kKSkge1xuICAgICAgY29uc29sZS5lcnJvcignaW52YWxpZCBkYXRlcycpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qIGJ1aWxkaW5nIGJ1c3kgc2xvdHMgYnkgZXZlbnRzICovXG4gICAgY29uc3QgZXZlbnRzVGltZVJhbmdlOiBUd2l4SXRlciA9IG1tdEV2ZW50U3RhcnQudHdpeChtbXRFdmVudEVuZCkuaXRlcmF0ZShzZXNzaW9uLmRldGFpbHMuZHVyYXRpb24sICdtaW51dGVzJyk7XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGV2ZW50c1RpbWVSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHt0aW1lLCBtbXRUaW1lfSA9IENhbGVuZGFyQ29tcG9uZW50LnNwbGl0UmFuZ2VUb05leHRUaW1lKGV2ZW50c1RpbWVSYW5nZSwgc2Vzc2lvbi5kZXRhaWxzLmR1cmF0aW9uKTtcbiAgICAgIC8qIElGIHRoZSBidXN5IHNsb3QgaXMgYXZhaWxhYmUgYW5kIG5vdCBhbHJlYWR5IGluIGJ1c3lTbG90cyB3ZSBjb3VudCBpdCAqL1xuICAgICAgaWYgKHRoaXMuZGF5c0F2YWlsYWJpbGl0eSAmJiB0aGlzLmRheXNBdmFpbGFiaWxpdHkuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpICYmXG4gICAgICAgICF0aGlzLmJ1c3lTbG90cy5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKSAmJlxuICAgICAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZ2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpLmluZGV4T2YodGltZS5mb3JtYXQoJ0hIOm1tJykpID49IDApIHtcblxuICAgICAgICBpZiAoKCFzZXNzaW9uLnVzZXIgfHxcbiAgICAgICAgICAoc2Vzc2lvbi51c2VyICYmXG4gICAgICAgICAgICBzZXNzaW9uLnVzZXIudWlkICE9PSB0aGlzLnVzZXIudWlkKSkpIHtcbiAgICAgICAgICBsZXQgZGF5QnVzeU51bWJlciA9IHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSA/XG4gICAgICAgICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgOiAwO1xuICAgICAgICAgIGRheUJ1c3lOdW1iZXIrKztcbiAgICAgICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5zZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSwgZGF5QnVzeU51bWJlcik7XG4gICAgICAgICAgdGhpcy5idXN5U2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlc3Npb24udXNlciAmJiBzZXNzaW9uLnVzZXIudWlkID09PSB0aGlzLnVzZXIudWlkKSB7XG4gICAgICAgICAgdGhpcy5zZXNzaW9uc1Nsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgICAgIHRoaXMuc2Vzc2lvbnMuc2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSwgc2Vzc2lvbik7XG4gICAgICAgICAgaWYgKCFldmVudHNUaW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNlc3Npb25zRW5kU2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1tdEV2ZW50U3RhcnQ7XG4gIH1cblxuICAvKipcbiAgICogU2xvdCBiZWZvcmUgYXZhaWxhYmlsaXR5IHJhbmdlXG4gICAqL1xuICBidWlsZGluZ0VhcmxpZXN0U2xvdChtbXRFdmVudFN0YXJ0OiBNb21lbnQpIHtcbiAgICAvKiBidWlsZGluZyBlYXJsaWVzdCBzbG90IGJlZm9yZSBldmVudCAqL1xuICAgIGNvbnN0IG1tdEVhcmx5U3RhcnQgPSBtbXRFdmVudFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKG1tdEVhcmx5U3RhcnQubWludXRlcygpIC1cbiAgICAgIChtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAlIHRoaXMub25saW5lU2Vzc2lvbi5zZXNzaW9uX3R5cGUuZHVyYXRpb24pICsgdGhpcy5vbmxpbmVTZXNzaW9uLnNlc3Npb25fdHlwZS5kdXJhdGlvbik7XG4gICAgY29uc3QgZWFybGllc3RUaW1lUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlTdGFydC50d2l4KG1tdEV2ZW50U3RhcnQpLml0ZXJhdGUodGhpcy5vbmxpbmVTZXNzaW9uLnNlc3Npb25fdHlwZS5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAoZWFybGllc3RUaW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB7dGltZSwgbW10VGltZX0gPSBDYWxlbmRhckNvbXBvbmVudC5zcGxpdFJhbmdlVG9OZXh0VGltZShlYXJsaWVzdFRpbWVSYW5nZSwgdGhpcy5vbmxpbmVTZXNzaW9uLnNlc3Npb25fdHlwZS5kdXJhdGlvbik7XG4gICAgICAvKiBJRiB0aGUgYnVzeSBzbG90IGlzIGluIGF2YWlsYWJpbGl0eSBhbmQgbm90IGFscmVhZHkgaW4gYnVzeVNsb2l0cyB3ZSBjb3VudCBpdCAqL1xuICAgICAgaWYgKHRoaXMuZGF5c0F2YWlsYWJpbGl0eSAmJiB0aGlzLmRheXNBdmFpbGFiaWxpdHkuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpXG4gICAgICAgICYmICF0aGlzLmJ1c3lTbG90cy5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKVxuICAgICAgICAmJiB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZ2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpLmluZGV4T2YodGltZS5mb3JtYXQoJ0hIOm1tJykpID49IDApIHtcbiAgICAgICAgbGV0IGRheUJ1c3lOdW1iZXIgPSB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgP1xuICAgICAgICAgIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmdldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSA6IDA7XG4gICAgICAgIGRheUJ1c3lOdW1iZXIrKztcbiAgICAgICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuc2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJyksIGRheUJ1c3lOdW1iZXIpO1xuICAgICAgfVxuICAgICAgdGhpcy5idXN5U2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgfVxuICB9XG59XG4iXX0=