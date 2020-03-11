import { ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import * as moment_ from 'moment';
import 'twix';
import { SessionService } from '../shared/session/session.service';
import * as i0 from "@angular/core";
import * as i1 from "../shared/session/session.service";
import * as i2 from "./calendar-header/calendar-header.component";
import * as i3 from "@angular/common";
import * as i4 from "./calendar-body/calendar-body.component";
function CalendarComponent_lib_calendar_body_5_Template(rf, ctx) { if (rf & 1) {
    var _r79 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "lib-calendar-body", 5);
    i0.ɵɵlistener("startChanged", function CalendarComponent_lib_calendar_body_5_Template_lib_calendar_body_startChanged_0_listener($event) { i0.ɵɵrestoreView(_r79); var ctx_r78 = i0.ɵɵnextContext(); return ctx_r78.onStartChanged($event); })("sessionAdded", function CalendarComponent_lib_calendar_body_5_Template_lib_calendar_body_sessionAdded_0_listener($event) { i0.ɵɵrestoreView(_r79); var ctx_r80 = i0.ɵɵnextContext(); return ctx_r80.onSessionAdded($event); })("sessionRemoved", function CalendarComponent_lib_calendar_body_5_Template_lib_calendar_body_sessionRemoved_0_listener($event) { i0.ɵɵrestoreView(_r79); var ctx_r81 = i0.ɵɵnextContext(); return ctx_r81.onSessionRemoved($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r77 = i0.ɵɵnextContext();
    i0.ɵɵproperty("bodyConfiguration", ctx_r77.calendarConfiguration)("onlineSession", ctx_r77.onlineSession)("days", ctx_r77.days)("viewMode", ctx_r77.viewMode)("start", ctx_r77.start)("end", ctx_r77.end)("daysAvailability", ctx_r77.daysAvailability)("daysBusySlotNumber", ctx_r77.daysBusySlotNumber)("daysAvailabilitySlotNumber", ctx_r77.daysAvailabilitySlotNumber)("busySlots", ctx_r77.busySlots)("user", ctx_r77.user)("customer", ctx_r77.customer)("earlySlots", ctx_r77.earlySlots)("pauseSlots", ctx_r77.pauseSlots)("sessionsSlots", ctx_r77.sessionsSlots)("sessionsStartSlots", ctx_r77.sessionsStartSlots)("sessionsEndSlots", ctx_r77.sessionsEndSlots);
} }
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
        get: function () {
            return this._sessionsEntries;
        },
        set: function (sessionsEntries) {
            if (sessionsEntries.length) {
                this._sessionsEntries = sessionsEntries;
            }
            this.loadCalendar();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "viewMode", {
        get: function () {
            return this._viewMode;
        },
        set: function (viewMode) {
            this._viewMode = viewMode;
            this.setViewMode();
        },
        enumerable: true,
        configurable: true
    });
    CalendarComponent.splitRangeToNextTime = function (slotTimeRange, slotDuration) {
        var time = slotTimeRange.next();
        return { time: time, mmtTime: CalendarComponent.getMinutesDifference(moment(time.toDate()), slotDuration) };
    };
    CalendarComponent.getMinutesDifference = function (mmtTime, slotDuration) {
        if (mmtTime.minutes() % slotDuration !== 0) {
            mmtTime.minutes(mmtTime.minutes() - (mmtTime.minutes() % slotDuration));
        }
        return mmtTime;
    };
    /**
     * Inspect all changes
     */
    CalendarComponent.prototype.ngOnChanges = function () {
        this.loadCalendar();
    };
    /**
     * Set Default variables
     */
    CalendarComponent.prototype.setCalendar = function () {
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
    CalendarComponent.prototype.setViewMode = function () {
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
    CalendarComponent.prototype.loadCalendar = function () {
        this.setCalendar();
        this.setViewMode();
        this.setDateRange(this.start, this.end);
        this.loadEvents(this.start, this.end);
        this.loadAvailabilities();
    };
    /**
     * Add available days from start to end dates
     */
    CalendarComponent.prototype.setDateRange = function (start, end) {
        // Days range from start to end
        var daysRange = start
            .twix(end)
            .iterate(1, 'days');
        // Loading all days
        while (daysRange.hasNext()) {
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
    CalendarComponent.prototype.onSwithedView = function (viewMode) {
        this.viewMode = viewMode;
        this.viewModeChanged.emit(viewMode);
        this.loadCalendar();
    };
    /**
     * On start change event
     */
    CalendarComponent.prototype.onStartChanged = function (start) {
        this.start = start;
        this.loadCalendar();
    };
    /**
     * On session added on click event
     */
    CalendarComponent.prototype.onSessionAdded = function (session) {
        this.sessions.set(moment(session.start).format('YYYY-MM-DDHH:mm'), session);
        this.sessionService.sessions.next(this.sessions);
        this.addSession(session);
        this.sessionCreated.emit(session);
    };
    /**
     * On removed event
     */
    CalendarComponent.prototype.onSessionRemoved = function (source) {
        this.sessions.delete(source.key);
        this.sessionService.sessions.next(this.sessions);
        this.removeSession(source.session);
        this.sessionRemoved.emit(source.session);
    };
    /**
     * Load all time for each days
     */
    CalendarComponent.prototype.loadAvailabilities = function () {
        var _this = this;
        // no online session no calendar
        if (!this.daysAvailability || !this.onlineSession) {
            return;
        }
        // session duration
        this.realDuration = this.onlineSession.duration;
        // session day start 00:00 - end 23:59
        var onlineSessionStart = moment(this.onlineSession.start_date, 'YYYY-MM-DD').startOf('day');
        var onlineSessionEnd = moment(this.onlineSession.end_date, 'YYYY-MM-DD').endOf('day');
        this.daysAvailabilitySlotNumber = new Map();
        this.daysAvailability.forEach(function (avbs, day) {
            var slotsNumber = 0;
            // each day of days availability with start time 08:00
            var mmtDay = moment(day, 'YYYY-MM-DD').hour(8);
            var mmtDayStartTime = moment(day + _this.onlineSession.start_time, 'YYYY-MMDDHH:mm');
            // If session start time like 08:00 is before start today 00:00
            if (mmtDayStartTime.isBefore(moment().startOf('day'))) {
                return;
            }
            // booking delay
            var minMmtStartTime = moment().add(_this.onlineSession.booking_delay, 'hours');
            // session time end
            var mmtDayEndTime = moment(day + _this.onlineSession.end_time, 'YYYY-MM-DDHH:mm');
            mmtDayEndTime.subtract(_this.realDuration, 'minutes');
            // slots iterator
            var timeRange = mmtDayStartTime.twix(mmtDayEndTime)
                .iterate(_this.onlineSession.duration, 'minutes');
            if (_this.calendarStart && _this.calendarEnd && mmtDay.isBetween(onlineSessionStart, onlineSessionEnd)) {
                while (timeRange.hasNext()) {
                    var time = timeRange.next();
                    var timeMmt = moment(time.toDate());
                    if (!timeMmt.isBefore(minMmtStartTime)) {
                        avbs.push(time.format('HH:mm'));
                        slotsNumber++;
                    }
                }
            }
            _this.daysAvailabilitySlotNumber.set(day, slotsNumber);
        });
    };
    /**
     * Add session event in calendar
     */
    CalendarComponent.prototype.addSession = function (session) {
        var mmtStart = moment(session.start);
        var mmtEnd = moment(session.end);
        var timeInnerRange = mmtStart.twix(mmtEnd).iterateInner(session.duration, 'minutes');
        while (timeInnerRange.hasNext()) {
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
        var mmtEarlyStart = mmtStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % session.duration) + session.duration);
        var timeEarlierRange = mmtEarlyStart.twix(mmtStart).iterate(session.duration, 'minutes');
        this.handleEarlySlot(timeEarlierRange, 'add', session, mmtEarlyStart, mmtStart);
        /* building pause slots after event */
        var mmtEarlyEnd = mmtEnd.clone();
        mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.duration);
        var mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
        var timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.duration, 'minutes');
        this.handlePauseSlot(timePauseRange, 'add', session, mmtEarlyStart, mmtEarlyEnd);
    };
    /**
     * Remove session event in Calendar
     */
    CalendarComponent.prototype.removeSession = function (session) {
        var mmtStart = moment(session.start);
        var mmtEnd = moment(session.end);
        var timeInnerRange = mmtStart.twix(mmtEnd).iterate(session.duration, 'minutes');
        while (timeInnerRange.hasNext()) {
            var time = timeInnerRange.next();
            if (!timeInnerRange.hasNext()) {
                this.sessionsEndSlots.delete(time.format('YYYY-MM-DDHH:mm'));
            }
            else {
                this.sessionsStartSlots.delete(time.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* removing early slots */
        var mmtEarlyStart = mmtStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % session.duration) + session.duration);
        var timeEarlyRange = mmtEarlyStart.twix(mmtStart).iterate(session.duration, 'minutes');
        this.handleEarlySlot(timeEarlyRange, 'remove', session, mmtEarlyStart, mmtStart);
        /* removing pause slots */
        if (session.pause) {
            var mmtEarlyEnd = mmtEnd.clone();
            mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.duration);
            var mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
            var timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.duration, 'minutes');
            this.handlePauseSlot(timePauseRange, 'remove', session, mmtEarlyStart, mmtEarlyEnd);
        }
    };
    /************************************************
     ******************* Date functions **************
     ************************************************
     */
    CalendarComponent.prototype.loadEvents = function (start, end) {
        var _this = this;
        if (!this.onlineSession) {
            return;
        }
        if (Array.isArray(this._sessionsEntries) && this._sessionsEntries.length) {
            this._sessionsEntries.forEach(function (session) {
                if (moment(session.start).isSameOrAfter(start) &&
                    moment(session.end).isSameOrBefore(end)) {
                    _this.buildinBusySlot(session);
                    _this.buildingEarliestSlot(session);
                }
            });
        }
    };
    /**
     * Slot locked
     */
    CalendarComponent.prototype.buildinBusySlot = function (session) {
        var mmtEventStart = moment(session.start, 'YYYY-MM-DDHH:mm');
        var mmtEventEnd = moment(session.end, 'YYYY-MM-DDHH:mm');
        if (!mmtEventStart || !mmtEventStart.isValid()
            || !mmtEventEnd || !mmtEventEnd.isValid()
            || !mmtEventStart.isSameOrBefore(mmtEventEnd)) {
            console.error('invalid dates', mmtEventStart, mmtEventEnd);
            return null;
        }
        /* building busy slots by events */
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
                        !session.customers.map(function (c) { return c.id; }).includes(this.customer.id)))) {
                    this.addDayBusySlot(time);
                }
                if (session.customers && this.customer && session.customers.map(function (c) { return c.id; }).includes(this.customer.id)) {
                    this.setSessionSlot(eventsTimeRange, time, session);
                }
            }
        }
        this.sessionService.sessions.next(this.sessions);
        return mmtEventStart;
    };
    /**
     * Build in sessions Map only start session with its session
     */
    CalendarComponent.prototype.setSessionSlot = function (eventsTimeRange, time, session) {
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
    CalendarComponent.prototype.buildingEarliestSlot = function (session) {
        var mmtEventStart = moment(session.start, 'YYYY-MM-DDHH:mm');
        if (!mmtEventStart || !this.realDuration) {
            return;
        }
        /* building earliest slot before event */
        var mmtEarlyStart = mmtEventStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % this.onlineSession.duration) + this.onlineSession.duration);
        var earliestTimeRange = mmtEarlyStart.twix(mmtEventStart).iterate(this.onlineSession.duration, 'minutes');
        while (earliestTimeRange.hasNext()) {
            var _a = CalendarComponent.splitRangeToNextTime(earliestTimeRange, this.onlineSession.duration), time = _a.time, mmtTime = _a.mmtTime;
            /* IF the busy slot is in availability and not already in busySlots we count it */
            if (this.daysAvailability &&
                this.daysAvailability.has(time.format('YYYY-MM-DD'))
                && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
                && this.daysAvailability.get(time.format('YYYY-MM-DD')).includes(time.format('HH:mm'))) {
                this.addDayBusySlot(time);
            }
        }
    };
    /**
     * Add in busy slot new unavailable time reference
     */
    CalendarComponent.prototype.addDayBusySlot = function (time) {
        var dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
            this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
        dayBusyNumber++;
        this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
        this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
    };
    /**
     * Remove/add from pauseSlot sessions start/end interval
     */
    CalendarComponent.prototype.handlePauseSlot = function (timePauseRange, action, session, start, end) {
        while (timePauseRange.hasNext()) {
            var time = timePauseRange.next();
            var mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.duration);
            if (mmtTime.isSameOrAfter(start) && mmtTime.isBefore(end)) {
                if (action === 'remove') {
                    this.pauseSlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
                }
                if (action === 'add') {
                    this.pauseSlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
                }
            }
        }
    };
    /**
     * Remove/add from earlySlot all sessions
     */
    CalendarComponent.prototype.handleEarlySlot = function (timeEarlierRange, action, session, mmtEarlyStart, mmtStart) {
        while (timeEarlierRange.hasNext()) {
            var time = timeEarlierRange.next();
            var mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.duration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                if (action === 'add') {
                    this.earlySlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
                }
                if (action === 'remove') {
                    this.earlySlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
                }
            }
        }
    };
    CalendarComponent.ɵfac = function CalendarComponent_Factory(t) { return new (t || CalendarComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.SessionService)); };
    CalendarComponent.ɵcmp = i0.ɵɵdefineComponent({ type: CalendarComponent, selectors: [["ngx-calendar"]], inputs: { user: "user", customer: "customer", onlineSession: "onlineSession", start: "start", end: "end", calendarConfiguration: "calendarConfiguration", sessionsEntries: "sessionsEntries", viewMode: "viewMode" }, outputs: { viewModeChanged: "viewModeChanged", sessionCreated: "sessionCreated", sessionRemoved: "sessionRemoved" }, features: [i0.ɵɵNgOnChangesFeature], decls: 6, vars: 5, consts: [[1, "week-calendar-wrapper"], [1, "week-calendar-header"], [1, "week-calendar-title"], [3, "start", "end", "headerConfiguration", "viewMode", "switchedView", "startChanged"], [3, "bodyConfiguration", "onlineSession", "days", "viewMode", "start", "end", "daysAvailability", "daysBusySlotNumber", "daysAvailabilitySlotNumber", "busySlots", "user", "customer", "earlySlots", "pauseSlots", "sessionsSlots", "sessionsStartSlots", "sessionsEndSlots", "startChanged", "sessionAdded", "sessionRemoved", 4, "ngIf"], [3, "bodyConfiguration", "onlineSession", "days", "viewMode", "start", "end", "daysAvailability", "daysBusySlotNumber", "daysAvailabilitySlotNumber", "busySlots", "user", "customer", "earlySlots", "pauseSlots", "sessionsSlots", "sessionsStartSlots", "sessionsEndSlots", "startChanged", "sessionAdded", "sessionRemoved"]], template: function CalendarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelementStart(1, "div", 1);
            i0.ɵɵelementStart(2, "div", 2);
            i0.ɵɵelementStart(3, "lib-calendar-header", 3);
            i0.ɵɵlistener("switchedView", function CalendarComponent_Template_lib_calendar_header_switchedView_3_listener($event) { return ctx.onSwithedView($event); })("startChanged", function CalendarComponent_Template_lib_calendar_header_startChanged_3_listener($event) { return ctx.onStartChanged($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div");
            i0.ɵɵtemplate(5, CalendarComponent_lib_calendar_body_5_Template, 1, 17, "lib-calendar-body", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("start", ctx.start)("end", ctx.end)("headerConfiguration", ctx.calendarConfiguration)("viewMode", ctx.viewMode);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.start && ctx.end && ctx.days && ctx.viewMode);
        } }, directives: [i2.CalendarHeaderComponent, i3.NgIf, i4.CalendarBodyComponent], styles: [".week-calendar-wrapper[_ngcontent-%COMP%]   .week-calendar-header[_ngcontent-%COMP%]{padding-bottom:20px}"] });
    return CalendarComponent;
}());
export { CalendarComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CalendarComponent, [{
        type: Component,
        args: [{
                // tslint:disable
                selector: 'ngx-calendar',
                // tslint:enable
                templateUrl: './calendar.component.html',
                styleUrls: ['./calendar.component.scss']
            }]
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.SessionService }]; }, { user: [{
            type: Input
        }], customer: [{
            type: Input
        }], onlineSession: [{
            type: Input
        }], start: [{
            type: Input
        }], end: [{
            type: Input
        }], calendarConfiguration: [{
            type: Input
        }], viewModeChanged: [{
            type: Output
        }], sessionCreated: [{
            type: Output
        }], sessionRemoved: [{
            type: Output
        }], sessionsEntries: [{
            type: Input
        }], viewMode: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyIsImxpYi9jYWxlbmRhci9jYWxlbmRhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxHQUFHLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBR2xDLE9BQU8sTUFBTSxDQUFDO0FBS2QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7OztJQ1cvRCw0Q0FvQmdGO0lBSDdELDZPQUF1QyxnT0FBQSxzT0FBQTtJQUdFLGlCQUFvQjs7O0lBcEI3RCxpRUFBMkMsd0NBQUEsc0JBQUEsOEJBQUEsd0JBQUEsb0JBQUEsOENBQUEsa0RBQUEsa0VBQUEsZ0NBQUEsc0JBQUEsOEJBQUEsa0NBQUEsa0NBQUEsd0NBQUEsa0RBQUEsOENBQUE7O0FEVGxFLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUV2QjtJQXVJRSwyQkFBb0IsRUFBcUIsRUFDckIsY0FBOEI7UUFEOUIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBeEhsRDs7V0FFRztRQUNNLGtCQUFhLEdBQWtCO1lBQ3RDLEVBQUUsRUFBRSxJQUFJO1lBQ1IsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLEVBQUUsRUFBRTtZQUNSLFdBQVcsRUFBRSxDQUFDO1lBQ2QsYUFBYSxFQUFFLENBQUM7WUFDaEIsUUFBUSxFQUFFLEVBQUU7WUFDWixLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxFQUFFO1lBQ1QsVUFBVSxFQUFFLFlBQVk7WUFDeEIsUUFB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LHVFQUF3Qzs7NEJEeEMvRDtDQTZqQkMsQUFoakJELElBZ2pCQztTQXppQlksaUJBQWlCO2tEQUFqQixpQkFBaUI7Y0FQN0IsU0FBUztlQUFDO2dCQUNULGlCQUFpQjtnQkFDakIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLGdCQUFnQjtnQkFDaEIsV0FBVyxFQUFFLDJCQUEyQjtnQkFDeEMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7YUFDekM7O2tCQUtFLEtBQUs7O2tCQUlMLEtBQUs7O2tCQUlMLEtBQUs7O2tCQWlCTCxLQUFLOztrQkFJTCxLQUFLOztrQkFJTCxLQUFLOztrQkF5QkwsTUFBTTs7a0JBSU4sTUFBTTs7a0JBSU4sTUFBTTs7a0JBdUVOLEtBQUs7O2tCQWNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBUd2l4LCBUd2l4SXRlciB9IGZyb20gJ3R3aXgnO1xuaW1wb3J0ICd0d2l4JztcbmltcG9ydCB7IENhbGVuZGFyQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL3NoYXJlZC9jb25maWd1cmF0aW9uL2NhbGVuZGFyLWNvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgRGF5IH0gZnJvbSAnLi4vc2hhcmVkL2RheS9kYXknO1xuaW1wb3J0IHsgT25saW5lU2Vzc2lvbiB9IGZyb20gJy4uL3NoYXJlZC9zZXNzaW9uL29ubGluZS1zZXNzaW9uJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi9zaGFyZWQvc2Vzc2lvbi9zZXNzaW9uJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlXG4gIHNlbGVjdG9yOiAnbmd4LWNhbGVuZGFyJyxcbiAgLy8gdHNsaW50OmVuYWJsZVxuICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIFVzZXIgY291bGQgYmUgcGFzc2VkIHRvIHNob3cgdGhlIG93bmVyXG4gICAqL1xuICBASW5wdXQoKSB1c2VyOiBhbnk7XG4gIC8qKlxuICAgKiBDdXN0b21lciBjb3VsZCBiZSBwYXNzZWQgdG8gZ2VuZXJhdGUgYSBwZXJzb25hbCBjYWxlbmRhclxuICAgKi9cbiAgQElucHV0KCkgY3VzdG9tZXI6IGFueTtcbiAgLyoqXG4gICAqIE9ubGluZSBzZXNzaW9ucyBkZWZpbml0aW9uXG4gICAqL1xuICBASW5wdXQoKSBvbmxpbmVTZXNzaW9uOiBPbmxpbmVTZXNzaW9uID0ge1xuICAgIGlkOiBudWxsLFxuICAgIGNvbW1lbnQ6ICcnLFxuICAgIG5hbWU6ICcnLFxuICAgIG1heF9wZXJzb25zOiAxLFxuICAgIGJvb2tpbmdfZGVsYXk6IDEsXG4gICAgZHVyYXRpb246IDE1LFxuICAgIHBhdXNlOiAwLFxuICAgIHByaWNlOiAxMCxcbiAgICBzdGFydF9kYXRlOiAnMjAxOS0wMS0wMScsXG4gICAgZW5kX2RhdGU6ICcyMDMwLTEyLTMxJyxcbiAgICBzdGFydF90aW1lOiAnMDg6MDAnLFxuICAgIGVuZF90aW1lOiAnMTk6MDAnXG4gIH07XG4gIC8qKlxuICAgKiBTdGFydCBkYXkgb2YgY2FsZW5kYXIgKGNvdWxkIGJlIHVwZGF0ZWQpXG4gICAqL1xuICBASW5wdXQoKSBzdGFydDogTW9tZW50ID0gbW9tZW50KCk7XG4gIC8qKlxuICAgKiBFbmQgZGF5IG9mIGNhbGVuZGFyIChjb3VsZCBiZSB1cGRhdGVkIGJ1dCByZWV3cml0ZW4gb24gc3dpdGNoIHdlZWsgbW9kZVxuICAgKi9cbiAgQElucHV0KCkgZW5kOiBNb21lbnQgPSBtb21lbnQoKTtcbiAgLyoqXG4gICAqIENvbmZpZ3VyYXRpb24gY2FsZW5kYXJcbiAgICovXG4gIEBJbnB1dCgpIGNhbGVuZGFyQ29uZmlndXJhdGlvbjogQ2FsZW5kYXJDb25maWd1cmF0aW9uID0ge1xuICAgIGNhbGVuZGFyOiB7XG4gICAgICBjdGE6IHtcbiAgICAgICAgbmV4dDogJ3N1aXZhbnQnLFxuICAgICAgICBwcmV2aW91czogJ3Byw6ljw6lkZW50JyxcbiAgICAgIH0sXG4gICAgICB0b2RheTogJ2F1am91cmRcXCdodWknLFxuICAgICAgYmFja190b2RheTogJ3JldmVuaXIgw6AgbGEgZGF0ZSBkXFwnYXVqb3VyZFxcJ2h1aScsXG4gICAgICBkYXk6ICdqb3VyJyxcbiAgICAgIHRocmVlX2RheXM6ICczIGpvdXJzJyxcbiAgICAgIHdlZWs6ICdzZW1haW5lJyxcbiAgICAgIHRpdGxlOiAncsOpc2VydmVyIHZvdHJlIGNyw6luZWF1JyxcbiAgICAgIHN1YnRpdGxlOiAndG91dGVzIGxlcyBkaXNwb25pYmlsaXTDqXMnLFxuICAgICAgYXZhaWxhYmlsaXR5OiB7XG4gICAgICAgIGVtcHR5OiAnQXVjdW5lIGRpc3BvbmliaWxpdMOpJyxcbiAgICAgICAgc2xvdDogJ1Byb2NoYWluZSBkaXNwb25pYmlsaXTDqScsXG4gICAgICB9LFxuICAgICAgc2Vzc2lvbjoge1xuICAgICAgICBpbmZvOiAnQ3LDqW5lYXUgdsOpcnJvdWlsbMOpJ1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFdoZW4gdXNlciBzd2hpdGNoIHZpZXcgbW9kZSBldmVudFxuICAgKi9cbiAgQE91dHB1dCgpIHZpZXdNb2RlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgLyoqXG4gICAqIFNlc3Npb24gY3JlYXRlZCBldmVudFxuICAgKi9cbiAgQE91dHB1dCgpIHNlc3Npb25DcmVhdGVkOiBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlc3Npb24+KCk7XG4gIC8qKlxuICAgKiBTZXNzaW9uIHJlbW92ZWQgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSBzZXNzaW9uUmVtb3ZlZDogRXZlbnRFbWl0dGVyPFNlc3Npb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZXNzaW9uPigpO1xuICAvKipcbiAgICogQXJyYXkgb2Ygc2VsZWN0YWJsZSBkYXlzIGZyb20gc3RhcnQgdG8gZW5kXG4gICAqL1xuICBkYXlzOiBBcnJheTxEYXk+ID0gW107XG4gIC8qKlxuICAgKiBTbG90IER1cmF0aW9uIGluIG1pbnV0ZXNcbiAgICovXG4gIHJlYWxEdXJhdGlvbjogbnVtYmVyO1xuICAvKipcbiAgICogRHVyaW5nIGRheXMgZnJvbSBzdGFydCB0byBlbmQsIGxpc3Qgb2YgZW50cmllcyB0aGF0IGF2YWlsYWJsZVxuICAgKi9cbiAgZGF5c0F2YWlsYWJpbGl0eTogTWFwPHN0cmluZywgc3RyaW5nW10+O1xuICAvKipcbiAgICogTnVtYmVyIG9mIGJ1c3kgc2xvdCBpbiBlYWNoIGRheVxuICAgKi9cbiAgZGF5c0J1c3lTbG90TnVtYmVyOiBNYXA8c3RyaW5nLCBudW1iZXI+O1xuICAvKipcbiAgICogTnVtYmVyIG9mIGF2YWlsYWJsZSBzbG90IGluIGVhY2ggZGF5XG4gICAqL1xuICBkYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlcjogTWFwPHN0cmluZywgbnVtYmVyPjtcbiAgLyoqXG4gICAqIFNldCBvZiBkYXRldGltZSB3aG8gcmVwcmVuc2VudHMgYXZhaWxhYmlsaXR5XG4gICAqL1xuICBidXN5U2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogc2V0IG9mIGRhdGV0aW1lIHdobyByZXByZXNlbnRzIG92ZXIgZXh0ZW5kcyBidXN5IHNsb3RcbiAgICovXG4gIGVhcmx5U2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogc2V0IG9mIGRhdGV0aW1lIHdobyByZXByZXNlbnRzIHBhdXNlIHNsb3RcbiAgICovXG4gIHBhdXNlU2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogc2V0IG9mIGRhdGV0aW1lIHdobyByZXByZXNlbnRzIHNlc3Npb24gc2xvdFxuICAgKi9cbiAgc2Vzc2lvbnNTbG90czogU2V0PHN0cmluZz47XG4gIC8qKlxuICAgKiBzZXQgb2YgZGF0ZXRpbWUgd2hvIHJlcHJlc2VudHMgZW5kIHNsb3QgKG5vdCB1c2VkIGluIGZyb250KVxuICAgKi9cbiAgc2Vzc2lvbnNFbmRTbG90czogU2V0PHN0cmluZz47XG4gIC8qKlxuICAgKiBzZXQgb2YgZGF0ZXRpbWUgd2hvIHJlcHJlc2VudHMgZW5kIHNsb3QgKG5vdCB1c2VkIGluIGZyb250KVxuICAgKi9cbiAgc2Vzc2lvbnNTdGFydFNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIE1hcCBvZiBzZXNzaW9ucyBmcm9tIGN1cnJlbnQgdXNlclxuICAgKi9cbiAgc2Vzc2lvbnM6IE1hcDxzdHJpbmcsIFNlc3Npb24+O1xuICAvKipcbiAgICogY2FsZW5kYXIgc3RhcnQgZGF5IGFmdGVyIHNldCBmdWxsIGNhbGVuZGFyIGluZm9ybWF0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBjYWxlbmRhclN0YXJ0OiBNb21lbnQ7XG4gIC8qKlxuICAgKiBjYWxlbmRhciBlbmQgZGF5IGFmdGVyIHNldCBmdWxsIGNhbGVuZGFyIGluZm9ybWF0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBjYWxlbmRhckVuZDogTW9tZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSkge1xuICB9XG5cbiAgLyoqXG4gICAqIFNlc3Npb25zIGFycmF5IGxvYWRlZCBieSBwYXJlbnQgY29tcG9uZW50XG4gICAqL1xuICBfc2Vzc2lvbnNFbnRyaWVzOiBTZXNzaW9uW10gPSBbXTtcblxuICBnZXQgc2Vzc2lvbnNFbnRyaWVzKCk6IFNlc3Npb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb25zRW50cmllcztcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzZXNzaW9uc0VudHJpZXMoc2Vzc2lvbnNFbnRyaWVzOiBTZXNzaW9uW10pIHtcbiAgICBpZiAoc2Vzc2lvbnNFbnRyaWVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fc2Vzc2lvbnNFbnRyaWVzID0gc2Vzc2lvbnNFbnRyaWVzO1xuICAgIH1cbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBWaWV3IE1vZGUgb2YgV2VlayBDb21wb25lbnRcbiAgX3ZpZXdNb2RlID0gJ3dlZWsnO1xuXG4gIGdldCB2aWV3TW9kZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl92aWV3TW9kZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB2aWV3TW9kZSh2aWV3TW9kZSkge1xuICAgIHRoaXMuX3ZpZXdNb2RlID0gdmlld01vZGU7XG4gICAgdGhpcy5zZXRWaWV3TW9kZSgpO1xuICB9XG5cbiAgc3RhdGljIHNwbGl0UmFuZ2VUb05leHRUaW1lKHNsb3RUaW1lUmFuZ2U6IFR3aXhJdGVyLCBzbG90RHVyYXRpb246IG51bWJlcik6IHt0aW1lOiBUd2l4LCBtbXRUaW1lOiBNb21lbnR9IHtcbiAgICBjb25zdCB0aW1lOiBUd2l4ID0gc2xvdFRpbWVSYW5nZS5uZXh0KCk7XG4gICAgcmV0dXJuIHt0aW1lLCBtbXRUaW1lOiBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHNsb3REdXJhdGlvbil9O1xuICB9XG5cbiAgc3RhdGljIGdldE1pbnV0ZXNEaWZmZXJlbmNlKG1tdFRpbWU6IE1vbWVudCwgc2xvdER1cmF0aW9uOiBudW1iZXIpOiBNb21lbnQge1xuICAgIGlmIChtbXRUaW1lLm1pbnV0ZXMoKSAlIHNsb3REdXJhdGlvbiAhPT0gMCkge1xuICAgICAgbW10VGltZS5taW51dGVzKG1tdFRpbWUubWludXRlcygpIC0gKG1tdFRpbWUubWludXRlcygpICUgc2xvdER1cmF0aW9uKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1tdFRpbWU7XG4gIH1cblxuICAvKipcbiAgICogSW5zcGVjdCBhbGwgY2hhbmdlc1xuICAgKi9cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5sb2FkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgRGVmYXVsdCB2YXJpYWJsZXNcbiAgICovXG4gIHNldENhbGVuZGFyKCkge1xuICAgIHRoaXMuZGF5cyA9IFtdO1xuICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eSA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLnNlc3Npb25zU2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuc2Vzc2lvbnNTdGFydFNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuZWFybHlTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLnBhdXNlU2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5idXN5U2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5zZXNzaW9ucyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLnNlc3Npb25zLm5leHQodGhpcy5zZXNzaW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFZpZXcgTW9kZSB3aXRoIHdlZWssIGRheSwgMyBkYXlzXG4gICAqIEluaXQgc3RhcnQsIGVuZCxcbiAgICpcbiAgICovXG4gIHNldFZpZXdNb2RlKCkge1xuICAgIGlmICh0aGlzLnZpZXdNb2RlID09PSAnZGF5Jykge1xuICAgICAgdGhpcy5lbmQgPSB0aGlzLnN0YXJ0O1xuICAgICAgdGhpcy5jYWxlbmRhclN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLnN0YXJ0T2YoJ2RheScpO1xuICAgICAgdGhpcy5jYWxlbmRhckVuZCA9IG1vbWVudCh0aGlzLmVuZCkuZW5kT2YoJ2RheScpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3RocmVlX2RheXMnKSB7XG4gICAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoMiwgJ2RheXMnKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdGFydE9mKCdkYXknKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJFbmQgPSBtb21lbnQodGhpcy5lbmQpLmVuZE9mKCdkYXknKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gSW5pdCBmaXJzdCBkYXkgd2VlayBudW1iZXJcbiAgICBjb25zdCBmaXJzdERheSA9IDA7XG4gICAgLy8gSWYgZW1wdHkgc3RhcnQgZGF0ZSB0aGVuIHN0YXJ0IHRvIHRvZGF5XG4gICAgaWYgKCF0aGlzLnN0YXJ0KSB7XG4gICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KCk7XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuZGF5KGZpcnN0RGF5KS5zdGFydE9mKCdkYXknKTtcbiAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoNiwgJ2RheXMnKS5lbmRPZignZGF5Jyk7XG5cbiAgICB0aGlzLmNhbGVuZGFyU3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuc3RhcnRPZignZGF5Jyk7XG4gICAgdGhpcy5jYWxlbmRhckVuZCA9IG1vbWVudCh0aGlzLmVuZCkuZW5kT2YoJ2RheScpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHN0YXJ0L3ZpZXdNb2RlIGNoYW5nZWQsIGRvIGEgcmVjYWxjdWxhdGUgb2YgaW5pdCBzdGFydCwgZW5kXG4gICAqIGRheXMsIGRheXNBdmFpbGFiaWxpdHkgYW5kIHZpZXdNb2RlXG4gICAqL1xuICBsb2FkQ2FsZW5kYXIoKSB7XG4gICAgdGhpcy5zZXRDYWxlbmRhcigpO1xuICAgIHRoaXMuc2V0Vmlld01vZGUoKTtcbiAgICB0aGlzLnNldERhdGVSYW5nZSh0aGlzLnN0YXJ0LCB0aGlzLmVuZCk7XG4gICAgdGhpcy5sb2FkRXZlbnRzKHRoaXMuc3RhcnQsIHRoaXMuZW5kKTtcbiAgICB0aGlzLmxvYWRBdmFpbGFiaWxpdGllcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhdmFpbGFibGUgZGF5cyBmcm9tIHN0YXJ0IHRvIGVuZCBkYXRlc1xuICAgKi9cbiAgc2V0RGF0ZVJhbmdlKHN0YXJ0OiBNb21lbnQsIGVuZDogTW9tZW50KSB7XG4gICAgLy8gRGF5cyByYW5nZSBmcm9tIHN0YXJ0IHRvIGVuZFxuICAgIGNvbnN0IGRheXNSYW5nZTogVHdpeEl0ZXIgPSBzdGFydFxuICAgICAgLnR3aXgoZW5kKVxuICAgICAgLml0ZXJhdGUoMSwgJ2RheXMnKTtcbiAgICAvLyBMb2FkaW5nIGFsbCBkYXlzXG4gICAgd2hpbGUgKGRheXNSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZURheTogVHdpeCA9IGRheXNSYW5nZS5uZXh0KCk7XG4gICAgICB0aGlzLmRheXMucHVzaCh7XG4gICAgICAgIHRpdGxlOiBhdmFpbGFibGVEYXkuZm9ybWF0KCdERC9NTS9ZWVlZJyksXG4gICAgICAgIGtleTogYXZhaWxhYmxlRGF5LmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgICB2YWx1ZTogbW9tZW50KGF2YWlsYWJsZURheS50b0RhdGUoKSlcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LnNldChhdmFpbGFibGVEYXkuZm9ybWF0KCdZWVlZLU1NLUREJyksIFtdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT24gc3dpdGNoIGRhdGUgcmFuZ2VcbiAgICovXG4gIG9uU3dpdGhlZFZpZXcodmlld01vZGU6IHN0cmluZykge1xuICAgIHRoaXMudmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLnZpZXdNb2RlQ2hhbmdlZC5lbWl0KHZpZXdNb2RlKTtcbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHN0YXJ0IGNoYW5nZSBldmVudFxuICAgKi9cbiAgb25TdGFydENoYW5nZWQoc3RhcnQ6IE1vbWVudCkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmxvYWRDYWxlbmRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHNlc3Npb24gYWRkZWQgb24gY2xpY2sgZXZlbnRcbiAgICovXG4gIG9uU2Vzc2lvbkFkZGVkKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICB0aGlzLnNlc3Npb25zLnNldChtb21lbnQoc2Vzc2lvbi5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSwgc2Vzc2lvbik7XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5zZXNzaW9ucy5uZXh0KHRoaXMuc2Vzc2lvbnMpO1xuICAgIHRoaXMuYWRkU2Vzc2lvbihzZXNzaW9uKTtcbiAgICB0aGlzLnNlc3Npb25DcmVhdGVkLmVtaXQoc2Vzc2lvbik7XG4gIH1cblxuICAvKipcbiAgICogT24gcmVtb3ZlZCBldmVudFxuICAgKi9cbiAgb25TZXNzaW9uUmVtb3ZlZChzb3VyY2U6IHtrZXk6IHN0cmluZywgc2Vzc2lvbjogU2Vzc2lvbn0pIHtcbiAgICB0aGlzLnNlc3Npb25zLmRlbGV0ZShzb3VyY2Uua2V5KTtcbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLnNlc3Npb25zLm5leHQodGhpcy5zZXNzaW9ucyk7XG4gICAgdGhpcy5yZW1vdmVTZXNzaW9uKHNvdXJjZS5zZXNzaW9uKTtcbiAgICB0aGlzLnNlc3Npb25SZW1vdmVkLmVtaXQoc291cmNlLnNlc3Npb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgYWxsIHRpbWUgZm9yIGVhY2ggZGF5c1xuICAgKi9cbiAgbG9hZEF2YWlsYWJpbGl0aWVzKCkge1xuICAgIC8vIG5vIG9ubGluZSBzZXNzaW9uIG5vIGNhbGVuZGFyXG4gICAgaWYgKCF0aGlzLmRheXNBdmFpbGFiaWxpdHkgfHwgIXRoaXMub25saW5lU2Vzc2lvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBzZXNzaW9uIGR1cmF0aW9uXG4gICAgdGhpcy5yZWFsRHVyYXRpb24gPSB0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb247XG4gICAgLy8gc2Vzc2lvbiBkYXkgc3RhcnQgMDA6MDAgLSBlbmQgMjM6NTlcbiAgICBjb25zdCBvbmxpbmVTZXNzaW9uU3RhcnQ6IE1vbWVudCA9IG1vbWVudCh0aGlzLm9ubGluZVNlc3Npb24uc3RhcnRfZGF0ZSwgJ1lZWVktTU0tREQnKS5zdGFydE9mKCdkYXknKTtcbiAgICBjb25zdCBvbmxpbmVTZXNzaW9uRW5kOiBNb21lbnQgPSBtb21lbnQodGhpcy5vbmxpbmVTZXNzaW9uLmVuZF9kYXRlLCAnWVlZWS1NTS1ERCcpLmVuZE9mKCdkYXknKTtcbiAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5mb3JFYWNoKChhdmJzLCBkYXkpID0+IHtcbiAgICAgIGxldCBzbG90c051bWJlciA9IDA7XG4gICAgICAvLyBlYWNoIGRheSBvZiBkYXlzIGF2YWlsYWJpbGl0eSB3aXRoIHN0YXJ0IHRpbWUgMDg6MDBcbiAgICAgIGNvbnN0IG1tdERheSA9IG1vbWVudChkYXksICdZWVlZLU1NLUREJykuaG91cig4KTtcbiAgICAgIGNvbnN0IG1tdERheVN0YXJ0VGltZSA9IG1vbWVudChkYXkgKyB0aGlzLm9ubGluZVNlc3Npb24uc3RhcnRfdGltZSwgJ1lZWVktTU1EREhIOm1tJyk7XG5cbiAgICAgIC8vIElmIHNlc3Npb24gc3RhcnQgdGltZSBsaWtlIDA4OjAwIGlzIGJlZm9yZSBzdGFydCB0b2RheSAwMDowMFxuICAgICAgaWYgKG1tdERheVN0YXJ0VGltZS5pc0JlZm9yZShtb21lbnQoKS5zdGFydE9mKCdkYXknKSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gYm9va2luZyBkZWxheVxuICAgICAgY29uc3QgbWluTW10U3RhcnRUaW1lID0gbW9tZW50KCkuYWRkKHRoaXMub25saW5lU2Vzc2lvbi5ib29raW5nX2RlbGF5LCAnaG91cnMnKTtcbiAgICAgIC8vIHNlc3Npb24gdGltZSBlbmRcbiAgICAgIGNvbnN0IG1tdERheUVuZFRpbWUgPSBtb21lbnQoZGF5ICsgdGhpcy5vbmxpbmVTZXNzaW9uLmVuZF90aW1lLCAnWVlZWS1NTS1EREhIOm1tJyk7XG4gICAgICBtbXREYXlFbmRUaW1lLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgLy8gc2xvdHMgaXRlcmF0b3JcbiAgICAgIGNvbnN0IHRpbWVSYW5nZTogVHdpeEl0ZXIgPSBtbXREYXlTdGFydFRpbWUudHdpeChtbXREYXlFbmRUaW1lKVxuICAgICAgICAuaXRlcmF0ZSh0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgICBpZiAodGhpcy5jYWxlbmRhclN0YXJ0ICYmIHRoaXMuY2FsZW5kYXJFbmQgJiYgbW10RGF5LmlzQmV0d2VlbihvbmxpbmVTZXNzaW9uU3RhcnQsIG9ubGluZVNlc3Npb25FbmQpKSB7XG4gICAgICAgIHdoaWxlICh0aW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVSYW5nZS5uZXh0KCk7XG4gICAgICAgICAgY29uc3QgdGltZU1tdDogTW9tZW50ID0gbW9tZW50KHRpbWUudG9EYXRlKCkpO1xuICAgICAgICAgIGlmICghdGltZU1tdC5pc0JlZm9yZShtaW5NbXRTdGFydFRpbWUpKSB7XG4gICAgICAgICAgICBhdmJzLnB1c2godGltZS5mb3JtYXQoJ0hIOm1tJykpO1xuICAgICAgICAgICAgc2xvdHNOdW1iZXIrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXIuc2V0KGRheSwgc2xvdHNOdW1iZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBzZXNzaW9uIGV2ZW50IGluIGNhbGVuZGFyXG4gICAqL1xuICBhZGRTZXNzaW9uKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICBjb25zdCBtbXRTdGFydCA9IG1vbWVudChzZXNzaW9uLnN0YXJ0KTtcbiAgICBjb25zdCBtbXRFbmQgPSBtb21lbnQoc2Vzc2lvbi5lbmQpO1xuICAgIGNvbnN0IHRpbWVJbm5lclJhbmdlOiBUd2l4SXRlciA9IG1tdFN0YXJ0LnR3aXgobW10RW5kKS5pdGVyYXRlSW5uZXIoc2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUlubmVyUmFuZ2UubmV4dCgpO1xuICAgICAgdGhpcy5zZXNzaW9uc1Nsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgaWYgKCF0aW1lSW5uZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uc1N0YXJ0U2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIGJ1aWxkaW5nIGVhcmxpZXN0IHNsb3QgYmVmb3JlIGV2ZW50ICovXG4gICAgY29uc3QgbW10RWFybHlTdGFydCA9IG1tdFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKFxuICAgICAgbW10RWFybHlTdGFydC5taW51dGVzKCkgLVxuICAgICAgKG1tdEVhcmx5U3RhcnQubWludXRlcygpICUgc2Vzc2lvbi5kdXJhdGlvbikgKyBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICBjb25zdCB0aW1lRWFybGllclJhbmdlOiBUd2l4SXRlciA9IG1tdEVhcmx5U3RhcnQudHdpeChtbXRTdGFydCkuaXRlcmF0ZShzZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHRoaXMuaGFuZGxlRWFybHlTbG90KHRpbWVFYXJsaWVyUmFuZ2UsICdhZGQnLCBzZXNzaW9uLCBtbXRFYXJseVN0YXJ0LCBtbXRTdGFydCk7XG4gICAgLyogYnVpbGRpbmcgcGF1c2Ugc2xvdHMgYWZ0ZXIgZXZlbnQgKi9cbiAgICBjb25zdCBtbXRFYXJseUVuZCA9IG1tdEVuZC5jbG9uZSgpO1xuICAgIG1tdEVhcmx5RW5kLnN1YnRyYWN0KG1tdEVhcmx5RW5kLm1pbnV0ZXMoKSAlIHNlc3Npb24uZHVyYXRpb24pO1xuICAgIGNvbnN0IG1tdFBhdXNlRW5kID0gbW10RWFybHlFbmQuY2xvbmUoKS5hZGQoc2Vzc2lvbi5wYXVzZSwgJ21pbnV0ZXMnKTtcbiAgICBjb25zdCB0aW1lUGF1c2VSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseUVuZC50d2l4KG1tdFBhdXNlRW5kKS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgdGhpcy5oYW5kbGVQYXVzZVNsb3QodGltZVBhdXNlUmFuZ2UsICdhZGQnLCBzZXNzaW9uLCBtbXRFYXJseVN0YXJ0LCBtbXRFYXJseUVuZCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHNlc3Npb24gZXZlbnQgaW4gQ2FsZW5kYXJcbiAgICovXG4gIHJlbW92ZVNlc3Npb24oc2Vzc2lvbjogU2Vzc2lvbikge1xuICAgIGNvbnN0IG1tdFN0YXJ0ID0gbW9tZW50KHNlc3Npb24uc3RhcnQpO1xuICAgIGNvbnN0IG1tdEVuZCA9IG1vbWVudChzZXNzaW9uLmVuZCk7XG4gICAgY29uc3QgdGltZUlubmVyUmFuZ2U6IFR3aXhJdGVyID0gbW10U3RhcnQudHdpeChtbXRFbmQpLml0ZXJhdGUoc2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAodGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUlubmVyUmFuZ2UubmV4dCgpO1xuICAgICAgaWYgKCF0aW1lSW5uZXJSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmRlbGV0ZSh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uc1N0YXJ0U2xvdHMuZGVsZXRlKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIHJlbW92aW5nIGVhcmx5IHNsb3RzICovXG4gICAgY29uc3QgbW10RWFybHlTdGFydCA9IG1tdFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKFxuICAgICAgbW10RWFybHlTdGFydC5taW51dGVzKCkgLVxuICAgICAgKG1tdEVhcmx5U3RhcnQubWludXRlcygpICUgc2Vzc2lvbi5kdXJhdGlvbikgKyBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICBjb25zdCB0aW1lRWFybHlSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseVN0YXJ0LnR3aXgobW10U3RhcnQpLml0ZXJhdGUoc2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB0aGlzLmhhbmRsZUVhcmx5U2xvdCh0aW1lRWFybHlSYW5nZSwgJ3JlbW92ZScsIHNlc3Npb24sIG1tdEVhcmx5U3RhcnQsIG1tdFN0YXJ0KTtcbiAgICAvKiByZW1vdmluZyBwYXVzZSBzbG90cyAqL1xuICAgIGlmIChzZXNzaW9uLnBhdXNlKSB7XG4gICAgICBjb25zdCBtbXRFYXJseUVuZCA9IG1tdEVuZC5jbG9uZSgpO1xuICAgICAgbW10RWFybHlFbmQuc3VidHJhY3QobW10RWFybHlFbmQubWludXRlcygpICUgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgICBjb25zdCBtbXRQYXVzZUVuZCA9IG1tdEVhcmx5RW5kLmNsb25lKCkuYWRkKHNlc3Npb24ucGF1c2UsICdtaW51dGVzJyk7XG4gICAgICBjb25zdCB0aW1lUGF1c2VSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseUVuZC50d2l4KG1tdFBhdXNlRW5kKS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgICB0aGlzLmhhbmRsZVBhdXNlU2xvdCh0aW1lUGF1c2VSYW5nZSwgJ3JlbW92ZScsIHNlc3Npb24sIG1tdEVhcmx5U3RhcnQsIG1tdEVhcmx5RW5kKTtcbiAgICB9XG4gIH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqKioqKioqKioqKioqKioqKioqIERhdGUgZnVuY3Rpb25zICoqKioqKioqKioqKioqXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICovXG4gIGxvYWRFdmVudHMoc3RhcnQ6IE1vbWVudCwgZW5kOiBNb21lbnQpIHtcbiAgICBpZiAoIXRoaXMub25saW5lU2Vzc2lvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9zZXNzaW9uc0VudHJpZXMpICYmIHRoaXMuX3Nlc3Npb25zRW50cmllcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3Nlc3Npb25zRW50cmllcy5mb3JFYWNoKChzZXNzaW9uOiBTZXNzaW9uKSA9PiB7XG4gICAgICAgIGlmIChtb21lbnQoc2Vzc2lvbi5zdGFydCkuaXNTYW1lT3JBZnRlcihzdGFydCkgJiZcbiAgICAgICAgICBtb21lbnQoc2Vzc2lvbi5lbmQpLmlzU2FtZU9yQmVmb3JlKGVuZCkpIHtcbiAgICAgICAgICB0aGlzLmJ1aWxkaW5CdXN5U2xvdChzZXNzaW9uKTtcbiAgICAgICAgICB0aGlzLmJ1aWxkaW5nRWFybGllc3RTbG90KHNlc3Npb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2xvdCBsb2NrZWRcbiAgICovXG4gIGJ1aWxkaW5CdXN5U2xvdChzZXNzaW9uOiBTZXNzaW9uKTogTW9tZW50IHtcbiAgICBjb25zdCBtbXRFdmVudFN0YXJ0ID0gbW9tZW50KHNlc3Npb24uc3RhcnQsICdZWVlZLU1NLURESEg6bW0nKTtcbiAgICBjb25zdCBtbXRFdmVudEVuZCA9IG1vbWVudChzZXNzaW9uLmVuZCwgJ1lZWVktTU0tRERISDptbScpO1xuXG4gICAgaWYgKCFtbXRFdmVudFN0YXJ0IHx8ICFtbXRFdmVudFN0YXJ0LmlzVmFsaWQoKVxuICAgICAgfHwgIW1tdEV2ZW50RW5kIHx8ICFtbXRFdmVudEVuZC5pc1ZhbGlkKClcbiAgICAgIHx8ICFtbXRFdmVudFN0YXJ0LmlzU2FtZU9yQmVmb3JlKG1tdEV2ZW50RW5kKSkge1xuICAgICAgY29uc29sZS5lcnJvcignaW52YWxpZCBkYXRlcycsIG1tdEV2ZW50U3RhcnQsIG1tdEV2ZW50RW5kKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKiBidWlsZGluZyBidXN5IHNsb3RzIGJ5IGV2ZW50cyAqL1xuICAgIGNvbnN0IGV2ZW50c1RpbWVSYW5nZTogVHdpeEl0ZXIgPSBtbXRFdmVudFN0YXJ0LnR3aXgobW10RXZlbnRFbmQpLml0ZXJhdGUoc2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcblxuICAgIHdoaWxlIChldmVudHNUaW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB7dGltZSwgbW10VGltZX0gPSBDYWxlbmRhckNvbXBvbmVudC5zcGxpdFJhbmdlVG9OZXh0VGltZShldmVudHNUaW1lUmFuZ2UsIHNlc3Npb24uZHVyYXRpb24pO1xuICAgICAgLyogSUYgdGhlIGJ1c3kgc2xvdCBpcyBhdmFpbGFiZSBhbmQgbm90IGFscmVhZHkgaW4gYnVzeVNsb3RzIHdlIGNvdW50IGl0ICovXG4gICAgICBpZiAodGhpcy5kYXlzQXZhaWxhYmlsaXR5ICYmXG4gICAgICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgJiZcbiAgICAgICAgIXRoaXMuYnVzeVNsb3RzLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpICYmXG4gICAgICAgICF0aGlzLmRheXNBdmFpbGFiaWxpdHkuZ2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpLmluY2x1ZGVzKHRpbWUuZm9ybWF0KCdISDptbScpKSkge1xuICAgICAgICBpZiAoKCFzZXNzaW9uLmN1c3RvbWVycyB8fFxuICAgICAgICAgIChzZXNzaW9uLmN1c3RvbWVycyAmJlxuICAgICAgICAgICAgdGhpcy5jdXN0b21lciAmJlxuICAgICAgICAgICAgIXNlc3Npb24uY3VzdG9tZXJzLm1hcChjID0+IGMuaWQpLmluY2x1ZGVzKHRoaXMuY3VzdG9tZXIuaWQpKSkpIHtcbiAgICAgICAgICB0aGlzLmFkZERheUJ1c3lTbG90KHRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXNzaW9uLmN1c3RvbWVycyAmJiB0aGlzLmN1c3RvbWVyICYmIHNlc3Npb24uY3VzdG9tZXJzLm1hcChjID0+IGMuaWQpLmluY2x1ZGVzKHRoaXMuY3VzdG9tZXIuaWQpKSB7XG4gICAgICAgICAgdGhpcy5zZXRTZXNzaW9uU2xvdChldmVudHNUaW1lUmFuZ2UsIHRpbWUsIHNlc3Npb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2Vzc2lvblNlcnZpY2Uuc2Vzc2lvbnMubmV4dCh0aGlzLnNlc3Npb25zKTtcblxuICAgIHJldHVybiBtbXRFdmVudFN0YXJ0O1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIGluIHNlc3Npb25zIE1hcCBvbmx5IHN0YXJ0IHNlc3Npb24gd2l0aCBpdHMgc2Vzc2lvblxuICAgKi9cbiAgc2V0U2Vzc2lvblNsb3QoZXZlbnRzVGltZVJhbmdlOiBUd2l4SXRlciwgdGltZTogVHdpeCwgc2Vzc2lvbjogU2Vzc2lvbikge1xuICAgIHRoaXMuc2Vzc2lvbnNTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICBpZiAoIWV2ZW50c1RpbWVSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXNzaW9ucy5zZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpLCBzZXNzaW9uKTtcbiAgICB0aGlzLnNlc3Npb25zU3RhcnRTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTbG90IGJlZm9yZSBhdmFpbGFiaWxpdHkgcmFuZ2VcbiAgICovXG4gIGJ1aWxkaW5nRWFybGllc3RTbG90KHNlc3Npb246IFNlc3Npb24pIHtcbiAgICBjb25zdCBtbXRFdmVudFN0YXJ0OiBNb21lbnQgPSBtb21lbnQoc2Vzc2lvbi5zdGFydCwgJ1lZWVktTU0tRERISDptbScpO1xuICAgIGlmICghbW10RXZlbnRTdGFydCB8fCAhdGhpcy5yZWFsRHVyYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKiBidWlsZGluZyBlYXJsaWVzdCBzbG90IGJlZm9yZSBldmVudCAqL1xuICAgIGNvbnN0IG1tdEVhcmx5U3RhcnQgPSBtbXRFdmVudFN0YXJ0LmNsb25lKCkuc3VidHJhY3QodGhpcy5yZWFsRHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgbW10RWFybHlTdGFydC5taW51dGVzKG1tdEVhcmx5U3RhcnQubWludXRlcygpIC1cbiAgICAgIChtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAlIHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbikgKyB0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb24pO1xuICAgIGNvbnN0IGVhcmxpZXN0VGltZVJhbmdlOiBUd2l4SXRlciA9IG1tdEVhcmx5U3RhcnQudHdpeChtbXRFdmVudFN0YXJ0KS5pdGVyYXRlKHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB3aGlsZSAoZWFybGllc3RUaW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB7dGltZSwgbW10VGltZX0gPSBDYWxlbmRhckNvbXBvbmVudC5zcGxpdFJhbmdlVG9OZXh0VGltZShlYXJsaWVzdFRpbWVSYW5nZSwgdGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgIC8qIElGIHRoZSBidXN5IHNsb3QgaXMgaW4gYXZhaWxhYmlsaXR5IGFuZCBub3QgYWxyZWFkeSBpbiBidXN5U2xvdHMgd2UgY291bnQgaXQgKi9cbiAgICAgIGlmICh0aGlzLmRheXNBdmFpbGFiaWxpdHkgJiZcbiAgICAgICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5Lmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKVxuICAgICAgICAmJiAhdGhpcy5idXN5U2xvdHMuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSlcbiAgICAgICAgJiYgdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmdldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKS5pbmNsdWRlcyh0aW1lLmZvcm1hdCgnSEg6bW0nKSkpIHtcbiAgICAgICAgdGhpcy5hZGREYXlCdXN5U2xvdCh0aW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIGluIGJ1c3kgc2xvdCBuZXcgdW5hdmFpbGFibGUgdGltZSByZWZlcmVuY2VcbiAgICovXG4gIGFkZERheUJ1c3lTbG90KHRpbWU6IFR3aXgpIHtcbiAgICBsZXQgZGF5QnVzeU51bWJlciA9IHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSA/XG4gICAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgOiAwO1xuICAgIGRheUJ1c3lOdW1iZXIrKztcbiAgICB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5zZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSwgZGF5QnVzeU51bWJlcik7XG4gICAgdGhpcy5idXN5U2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlL2FkZCBmcm9tIHBhdXNlU2xvdCBzZXNzaW9ucyBzdGFydC9lbmQgaW50ZXJ2YWxcbiAgICovXG4gIGhhbmRsZVBhdXNlU2xvdCh0aW1lUGF1c2VSYW5nZTogVHdpeEl0ZXIsIGFjdGlvbjogc3RyaW5nLCBzZXNzaW9uOiBTZXNzaW9uLCBzdGFydDogTW9tZW50LCBlbmQ6IE1vbWVudCkge1xuICAgIHdoaWxlICh0aW1lUGF1c2VSYW5nZS5oYXNOZXh0KCkpIHtcbiAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lUGF1c2VSYW5nZS5uZXh0KCk7XG4gICAgICBjb25zdCBtbXRUaW1lOiBNb21lbnQgPSBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHNlc3Npb24uZHVyYXRpb24pO1xuICAgICAgaWYgKG1tdFRpbWUuaXNTYW1lT3JBZnRlcihzdGFydCkgJiYgbW10VGltZS5pc0JlZm9yZShlbmQpKSB7XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgdGhpcy5wYXVzZVNsb3RzLmRlbGV0ZShtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdhZGQnKSB7XG4gICAgICAgICAgdGhpcy5wYXVzZVNsb3RzLmFkZChtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZS9hZGQgZnJvbSBlYXJseVNsb3QgYWxsIHNlc3Npb25zXG4gICAqL1xuICBoYW5kbGVFYXJseVNsb3QodGltZUVhcmxpZXJSYW5nZTogVHdpeEl0ZXIsXG4gICAgICAgICAgICAgICAgICBhY3Rpb246IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgIHNlc3Npb246IFNlc3Npb24sXG4gICAgICAgICAgICAgICAgICBtbXRFYXJseVN0YXJ0OiBNb21lbnQsXG4gICAgICAgICAgICAgICAgICBtbXRTdGFydDogTW9tZW50KSB7XG4gICAgd2hpbGUgKHRpbWVFYXJsaWVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZUVhcmxpZXJSYW5nZS5uZXh0KCk7XG4gICAgICBjb25zdCBtbXRUaW1lOiBNb21lbnQgPSBDYWxlbmRhckNvbXBvbmVudC5nZXRNaW51dGVzRGlmZmVyZW5jZShtb21lbnQodGltZS50b0RhdGUoKSksIHNlc3Npb24uZHVyYXRpb24pO1xuICAgICAgaWYgKG1tdFRpbWUuaXNTYW1lT3JBZnRlcihtbXRFYXJseVN0YXJ0KSAmJiBtbXRUaW1lLmlzQmVmb3JlKG1tdFN0YXJ0KSkge1xuICAgICAgICBpZiAoYWN0aW9uID09PSAnYWRkJykge1xuICAgICAgICAgIHRoaXMuZWFybHlTbG90cy5hZGQobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgdGhpcy5lYXJseVNsb3RzLmRlbGV0ZShtbXRUaW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwid2Vlay1jYWxlbmRhci13cmFwcGVyXCI+XG4gIDxkaXYgY2xhc3M9XCJ3ZWVrLWNhbGVuZGFyLWhlYWRlclwiPlxuXG5cbiAgICA8ZGl2IGNsYXNzPVwid2Vlay1jYWxlbmRhci10aXRsZVwiPlxuXG4gICAgICA8bGliLWNhbGVuZGFyLWhlYWRlciBbc3RhcnRdPVwic3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VuZF09XCJlbmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2hlYWRlckNvbmZpZ3VyYXRpb25dPVwiY2FsZW5kYXJDb25maWd1cmF0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2aWV3TW9kZV09XCJ2aWV3TW9kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoc3dpdGNoZWRWaWV3KT1cIm9uU3dpdGhlZFZpZXcoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoc3RhcnRDaGFuZ2VkKT1cIm9uU3RhcnRDaGFuZ2VkKCRldmVudClcIj48L2xpYi1jYWxlbmRhci1oZWFkZXI+XG5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cblxuICA8ZGl2PlxuXG5cbiAgICA8bGliLWNhbGVuZGFyLWJvZHkgW2JvZHlDb25maWd1cmF0aW9uXT1cImNhbGVuZGFyQ29uZmlndXJhdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtvbmxpbmVTZXNzaW9uXT1cIm9ubGluZVNlc3Npb25cIlxuICAgICAgICAgICAgICAgICAgICAgICBbZGF5c109XCJkYXlzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3ZpZXdNb2RlXT1cInZpZXdNb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3N0YXJ0XT1cInN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2VuZF09XCJlbmRcIlxuICAgICAgICAgICAgICAgICAgICAgICBbZGF5c0F2YWlsYWJpbGl0eV09XCJkYXlzQXZhaWxhYmlsaXR5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2RheXNCdXN5U2xvdE51bWJlcl09XCJkYXlzQnVzeVNsb3ROdW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICBbZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXJdPVwiZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICBbYnVzeVNsb3RzXT1cImJ1c3lTbG90c1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFt1c2VyXT1cInVzZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICBbY3VzdG9tZXJdPVwiY3VzdG9tZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICBbZWFybHlTbG90c109XCJlYXJseVNsb3RzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3BhdXNlU2xvdHNdPVwicGF1c2VTbG90c1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzZXNzaW9uc1Nsb3RzXT1cInNlc3Npb25zU2xvdHNcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc2Vzc2lvbnNTdGFydFNsb3RzXT1cInNlc3Npb25zU3RhcnRTbG90c1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzZXNzaW9uc0VuZFNsb3RzXT1cInNlc3Npb25zRW5kU2xvdHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAoc3RhcnRDaGFuZ2VkKT1cIm9uU3RhcnRDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAoc2Vzc2lvbkFkZGVkKT1cIm9uU2Vzc2lvbkFkZGVkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAoc2Vzc2lvblJlbW92ZWQpPVwib25TZXNzaW9uUmVtb3ZlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzdGFydCAmJiBlbmQgJiYgZGF5cyAmJiB2aWV3TW9kZVwiPjwvbGliLWNhbGVuZGFyLWJvZHk+XG5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==