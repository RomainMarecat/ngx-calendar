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
    const _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "lib-calendar-body", 5);
    i0.ɵɵlistener("startChanged", function CalendarComponent_lib_calendar_body_5_Template_lib_calendar_body_startChanged_0_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r37 = i0.ɵɵnextContext(); return ctx_r37.onStartChanged($event); })("sessionAdded", function CalendarComponent_lib_calendar_body_5_Template_lib_calendar_body_sessionAdded_0_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r39 = i0.ɵɵnextContext(); return ctx_r39.onSessionAdded($event); })("sessionRemoved", function CalendarComponent_lib_calendar_body_5_Template_lib_calendar_body_sessionRemoved_0_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r40 = i0.ɵɵnextContext(); return ctx_r40.onSessionRemoved($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r36 = i0.ɵɵnextContext();
    i0.ɵɵproperty("bodyConfiguration", ctx_r36.calendarConfiguration)("onlineSession", ctx_r36.onlineSession)("days", ctx_r36.days)("viewMode", ctx_r36.viewMode)("start", ctx_r36.start)("end", ctx_r36.end)("daysAvailability", ctx_r36.daysAvailability)("daysBusySlotNumber", ctx_r36.daysBusySlotNumber)("daysAvailabilitySlotNumber", ctx_r36.daysAvailabilitySlotNumber)("busySlots", ctx_r36.busySlots)("user", ctx_r36.user)("customer", ctx_r36.customer)("earlySlots", ctx_r36.earlySlots)("pauseSlots", ctx_r36.pauseSlots)("sessionsSlots", ctx_r36.sessionsSlots)("sessionsStartSlots", ctx_r36.sessionsStartSlots)("sessionsEndSlots", ctx_r36.sessionsEndSlots);
} }
const moment = moment_;
export class CalendarComponent {
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
    get sessionsEntries() {
        return this._sessionsEntries;
    }
    set sessionsEntries(sessionsEntries) {
        if (sessionsEntries.length) {
            this._sessionsEntries = sessionsEntries;
        }
        this.loadCalendar();
    }
    get viewMode() {
        return this._viewMode;
    }
    set viewMode(viewMode) {
        this._viewMode = viewMode;
        this.setViewMode();
    }
    static splitRangeToNextTime(slotTimeRange, slotDuration) {
        const time = slotTimeRange.next();
        return { time, mmtTime: CalendarComponent.getMinutesDifference(moment(time.toDate()), slotDuration) };
    }
    static getMinutesDifference(mmtTime, slotDuration) {
        if (mmtTime.minutes() % slotDuration !== 0) {
            mmtTime.minutes(mmtTime.minutes() - (mmtTime.minutes() % slotDuration));
        }
        return mmtTime;
    }
    /**
     * Inspect all changes
     */
    ngOnChanges() {
        this.loadCalendar();
    }
    /**
     * Set Default variables
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
     */
    setDateRange(start, end) {
        // Days range from start to end
        const daysRange = start
            .twix(end)
            .iterate(1, 'days');
        // Loading all days
        while (daysRange.hasNext()) {
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
     */
    onSwithedView(viewMode) {
        this.viewMode = viewMode;
        this.viewModeChanged.emit(viewMode);
        this.loadCalendar();
    }
    /**
     * On start change event
     */
    onStartChanged(start) {
        this.start = start;
        this.loadCalendar();
    }
    /**
     * On session added on click event
     */
    onSessionAdded(session) {
        this.sessions.set(moment(session.start).format('YYYY-MM-DDHH:mm'), session);
        this.sessionService.sessions.next(this.sessions);
        this.addSession(session);
        this.sessionCreated.emit(session);
    }
    /**
     * On removed event
     */
    onSessionRemoved(source) {
        this.sessions.delete(source.key);
        this.sessionService.sessions.next(this.sessions);
        this.removeSession(source.session);
        this.sessionRemoved.emit(source.session);
    }
    /**
     * Load all time for each days
     */
    loadAvailabilities() {
        // no online session no calendar
        if (!this.daysAvailability || !this.onlineSession) {
            return;
        }
        // session duration
        this.realDuration = this.onlineSession.duration;
        // session day start 00:00 - end 23:59
        const onlineSessionStart = moment(this.onlineSession.start_date, 'YYYY-MM-DD').startOf('day');
        const onlineSessionEnd = moment(this.onlineSession.end_date, 'YYYY-MM-DD').endOf('day');
        this.daysAvailabilitySlotNumber = new Map();
        this.daysAvailability.forEach((avbs, day) => {
            let slotsNumber = 0;
            // each day of days availability with start time 08:00
            const mmtDay = moment(day, 'YYYY-MM-DD').hour(8);
            const mmtDayStartTime = moment(day + this.onlineSession.start_time, 'YYYY-MMDDHH:mm');
            // If session start time like 08:00 is before start today 00:00
            if (mmtDayStartTime.isBefore(moment().startOf('day'))) {
                return;
            }
            // booking delay
            const minMmtStartTime = moment().add(this.onlineSession.booking_delay, 'hours');
            // session time end
            const mmtDayEndTime = moment(day + this.onlineSession.end_time, 'YYYY-MM-DDHH:mm');
            mmtDayEndTime.subtract(this.realDuration, 'minutes');
            // slots iterator
            const timeRange = mmtDayStartTime.twix(mmtDayEndTime)
                .iterate(this.onlineSession.duration, 'minutes');
            if (this.calendarStart && this.calendarEnd && mmtDay.isBetween(onlineSessionStart, onlineSessionEnd)) {
                while (timeRange.hasNext()) {
                    const time = timeRange.next();
                    const timeMmt = moment(time.toDate());
                    if (!timeMmt.isBefore(minMmtStartTime)) {
                        avbs.push(time.format('HH:mm'));
                        slotsNumber++;
                    }
                }
            }
            this.daysAvailabilitySlotNumber.set(day, slotsNumber);
        });
    }
    /**
     * Add session event in calendar
     */
    addSession(session) {
        const mmtStart = moment(session.start);
        const mmtEnd = moment(session.end);
        const timeInnerRange = mmtStart.twix(mmtEnd).iterateInner(session.duration, 'minutes');
        while (timeInnerRange.hasNext()) {
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
        const mmtEarlyStart = mmtStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % session.duration) + session.duration);
        const timeEarlierRange = mmtEarlyStart.twix(mmtStart).iterate(session.duration, 'minutes');
        this.handleEarlySlot(timeEarlierRange, 'add', session, mmtEarlyStart, mmtStart);
        /* building pause slots after event */
        const mmtEarlyEnd = mmtEnd.clone();
        mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.duration);
        const mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
        const timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.duration, 'minutes');
        this.handlePauseSlot(timePauseRange, 'add', session, mmtEarlyStart, mmtEarlyEnd);
    }
    /**
     * Remove session event in Calendar
     */
    removeSession(session) {
        const mmtStart = moment(session.start);
        const mmtEnd = moment(session.end);
        const timeInnerRange = mmtStart.twix(mmtEnd).iterate(session.duration, 'minutes');
        while (timeInnerRange.hasNext()) {
            const time = timeInnerRange.next();
            if (!timeInnerRange.hasNext()) {
                this.sessionsEndSlots.delete(time.format('YYYY-MM-DDHH:mm'));
            }
            else {
                this.sessionsStartSlots.delete(time.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* removing early slots */
        const mmtEarlyStart = mmtStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % session.duration) + session.duration);
        const timeEarlyRange = mmtEarlyStart.twix(mmtStart).iterate(session.duration, 'minutes');
        this.handleEarlySlot(timeEarlyRange, 'remove', session, mmtEarlyStart, mmtStart);
        /* removing pause slots */
        if (session.pause) {
            const mmtEarlyEnd = mmtEnd.clone();
            mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.duration);
            const mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
            const timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.duration, 'minutes');
            this.handlePauseSlot(timePauseRange, 'remove', session, mmtEarlyStart, mmtEarlyEnd);
        }
    }
    /************************************************
     ******************* Date functions **************
     ************************************************
     */
    loadEvents(start, end) {
        if (!this.onlineSession) {
            return;
        }
        if (Array.isArray(this._sessionsEntries) && this._sessionsEntries.length) {
            this._sessionsEntries.forEach((session) => {
                if (moment(session.start).isSameOrAfter(start) &&
                    moment(session.end).isSameOrBefore(end)) {
                    this.buildinBusySlot(session);
                    this.buildingEarliestSlot(session);
                }
            });
        }
    }
    /**
     * Slot locked
     */
    buildinBusySlot(session) {
        const mmtEventStart = moment(session.start, 'YYYY-MM-DDHH:mm');
        const mmtEventEnd = moment(session.end, 'YYYY-MM-DDHH:mm');
        if (!mmtEventStart || !mmtEventStart.isValid()
            || !mmtEventEnd || !mmtEventEnd.isValid()
            || !mmtEventStart.isSameOrBefore(mmtEventEnd)) {
            console.error('invalid dates', mmtEventStart, mmtEventEnd);
            return null;
        }
        /* building busy slots by events */
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
                        !session.customers.map(c => c.id).includes(this.customer.id)))) {
                    this.addDayBusySlot(time);
                }
                if (session.customers && this.customer && session.customers.map(c => c.id).includes(this.customer.id)) {
                    this.setSessionSlot(eventsTimeRange, time, session);
                }
            }
        }
        this.sessionService.sessions.next(this.sessions);
        return mmtEventStart;
    }
    /**
     * Build in sessions Map only start session with its session
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
     */
    buildingEarliestSlot(session) {
        const mmtEventStart = moment(session.start, 'YYYY-MM-DDHH:mm');
        if (!mmtEventStart || !this.realDuration) {
            return;
        }
        /* building earliest slot before event */
        const mmtEarlyStart = mmtEventStart.clone().subtract(this.realDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % this.onlineSession.duration) + this.onlineSession.duration);
        const earliestTimeRange = mmtEarlyStart.twix(mmtEventStart).iterate(this.onlineSession.duration, 'minutes');
        while (earliestTimeRange.hasNext()) {
            const { time, mmtTime } = CalendarComponent.splitRangeToNextTime(earliestTimeRange, this.onlineSession.duration);
            /* IF the busy slot is in availability and not already in busySlots we count it */
            if (this.daysAvailability &&
                this.daysAvailability.has(time.format('YYYY-MM-DD'))
                && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
                && this.daysAvailability.get(time.format('YYYY-MM-DD')).includes(time.format('HH:mm'))) {
                this.addDayBusySlot(time);
            }
        }
    }
    /**
     * Add in busy slot new unavailable time reference
     */
    addDayBusySlot(time) {
        let dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
            this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
        dayBusyNumber++;
        this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
        this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
    }
    /**
     * Remove/add from pauseSlot sessions start/end interval
     */
    handlePauseSlot(timePauseRange, action, session, start, end) {
        while (timePauseRange.hasNext()) {
            const time = timePauseRange.next();
            const mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.duration);
            if (mmtTime.isSameOrAfter(start) && mmtTime.isBefore(end)) {
                if (action === 'remove') {
                    this.pauseSlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
                }
                if (action === 'add') {
                    this.pauseSlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
                }
            }
        }
    }
    /**
     * Remove/add from earlySlot all sessions
     */
    handleEarlySlot(timeEarlierRange, action, session, mmtEarlyStart, mmtStart) {
        while (timeEarlierRange.hasNext()) {
            const time = timeEarlierRange.next();
            const mmtTime = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.duration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                if (action === 'add') {
                    this.earlySlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
                }
                if (action === 'remove') {
                    this.earlySlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
                }
            }
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyIsImxpYi9jYWxlbmRhci9jYWxlbmRhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxHQUFHLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBR2xDLE9BQU8sTUFBTSxDQUFDO0FBS2QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7OztJQ1cvRCw0Q0FvQmdGO0lBSDdELCtPQUF1QyxrT0FBQSx3T0FBQTtJQUdFLGlCQUFvQjs7O0lBcEI3RCxpRUFBMkMsd0NBQUEsc0JBQUEsOEJBQUEsd0JBQUEsb0JBQUEsOENBQUEsa0RBQUEsa0VBQUEsZ0NBQUEsc0JBQUEsOEJBQUEsa0NBQUEsa0NBQUEsd0NBQUEsa0RBQUEsOENBQUE7O0FEVGxFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQVN2QixNQUFNLE9BQU8saUJBQWlCO0lBZ0k1QixZQUFvQixFQUFxQixFQUNyQixjQUE4QjtRQUQ5QixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF4SGxEOztXQUVHO1FBQ00sa0JBQWEsR0FBa0I7WUFDdEMsRUFBRSxFQUFFLElBQUk7WUFDUixPQUFPLEVBQUUsRUFBRTtZQUNYLElBQUksRUFBRSxFQUFFO1lBQ1IsV0FBVyxFQUFFLENBQUM7WUFDZCxhQUFhLEVBQUUsQ0FBQztZQUNoQixRQUFRLEVBQUUsRUFBRTtZQUNaLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLEVBQUU7WUFDVCxVQUFVLEVB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bEQsaUJBQWlCO2NBUDdCLFNBQVM7ZUFBQztnQkFDVCxpQkFBaUI7Z0JBQ2pCLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixnQkFBZ0I7Z0JBQ2hCLFdBQVcsRUFBRSwyQkFBMkI7Z0JBQ3hDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO2FBQ3pDOztrQkFLRSxLQUFLOztrQkFJTCxLQUFLOztrQkFJTCxLQUFLOztrQkFpQkwsS0FBSzs7a0JBSUwsS0FBSzs7a0JBSUwsS0FBSzs7a0JBeUJMLE1BQU07O2tCQUlOLE1BQU07O2tCQUlOLE1BQU07O2tCQXVFTixLQUFLOztrQkFjTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgVHdpeCwgVHdpeEl0ZXIgfSBmcm9tICd0d2l4JztcbmltcG9ydCAndHdpeCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9zaGFyZWQvY29uZmlndXJhdGlvbi9jYWxlbmRhci1jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IERheSB9IGZyb20gJy4uL3NoYXJlZC9kYXkvZGF5JztcbmltcG9ydCB7IE9ubGluZVNlc3Npb24gfSBmcm9tICcuLi9zaGFyZWQvc2Vzc2lvbi9vbmxpbmUtc2Vzc2lvbic7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vc2hhcmVkL3Nlc3Npb24vc2Vzc2lvbic7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZVxuICBzZWxlY3RvcjogJ25neC1jYWxlbmRhcicsXG4gIC8vIHRzbGludDplbmFibGVcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBVc2VyIGNvdWxkIGJlIHBhc3NlZCB0byBzaG93IHRoZSBvd25lclxuICAgKi9cbiAgQElucHV0KCkgdXNlcjogYW55O1xuICAvKipcbiAgICogQ3VzdG9tZXIgY291bGQgYmUgcGFzc2VkIHRvIGdlbmVyYXRlIGEgcGVyc29uYWwgY2FsZW5kYXJcbiAgICovXG4gIEBJbnB1dCgpIGN1c3RvbWVyOiBhbnk7XG4gIC8qKlxuICAgKiBPbmxpbmUgc2Vzc2lvbnMgZGVmaW5pdGlvblxuICAgKi9cbiAgQElucHV0KCkgb25saW5lU2Vzc2lvbjogT25saW5lU2Vzc2lvbiA9IHtcbiAgICBpZDogbnVsbCxcbiAgICBjb21tZW50OiAnJyxcbiAgICBuYW1lOiAnJyxcbiAgICBtYXhfcGVyc29uczogMSxcbiAgICBib29raW5nX2RlbGF5OiAxLFxuICAgIGR1cmF0aW9uOiAxNSxcbiAgICBwYXVzZTogMCxcbiAgICBwcmljZTogMTAsXG4gICAgc3RhcnRfZGF0ZTogJzIwMTktMDEtMDEnLFxuICAgIGVuZF9kYXRlOiAnMjAzMC0xMi0zMScsXG4gICAgc3RhcnRfdGltZTogJzA4OjAwJyxcbiAgICBlbmRfdGltZTogJzE5OjAwJ1xuICB9O1xuICAvKipcbiAgICogU3RhcnQgZGF5IG9mIGNhbGVuZGFyIChjb3VsZCBiZSB1cGRhdGVkKVxuICAgKi9cbiAgQElucHV0KCkgc3RhcnQ6IE1vbWVudCA9IG1vbWVudCgpO1xuICAvKipcbiAgICogRW5kIGRheSBvZiBjYWxlbmRhciAoY291bGQgYmUgdXBkYXRlZCBidXQgcmVld3JpdGVuIG9uIHN3aXRjaCB3ZWVrIG1vZGVcbiAgICovXG4gIEBJbnB1dCgpIGVuZDogTW9tZW50ID0gbW9tZW50KCk7XG4gIC8qKlxuICAgKiBDb25maWd1cmF0aW9uIGNhbGVuZGFyXG4gICAqL1xuICBASW5wdXQoKSBjYWxlbmRhckNvbmZpZ3VyYXRpb246IENhbGVuZGFyQ29uZmlndXJhdGlvbiA9IHtcbiAgICBjYWxlbmRhcjoge1xuICAgICAgY3RhOiB7XG4gICAgICAgIG5leHQ6ICdzdWl2YW50JyxcbiAgICAgICAgcHJldmlvdXM6ICdwcsOpY8OpZGVudCcsXG4gICAgICB9LFxuICAgICAgdG9kYXk6ICdhdWpvdXJkXFwnaHVpJyxcbiAgICAgIGJhY2tfdG9kYXk6ICdyZXZlbmlyIMOgIGxhIGRhdGUgZFxcJ2F1am91cmRcXCdodWknLFxuICAgICAgZGF5OiAnam91cicsXG4gICAgICB0aHJlZV9kYXlzOiAnMyBqb3VycycsXG4gICAgICB3ZWVrOiAnc2VtYWluZScsXG4gICAgICB0aXRsZTogJ3LDqXNlcnZlciB2b3RyZSBjcsOpbmVhdScsXG4gICAgICBzdWJ0aXRsZTogJ3RvdXRlcyBsZXMgZGlzcG9uaWJpbGl0w6lzJyxcbiAgICAgIGF2YWlsYWJpbGl0eToge1xuICAgICAgICBlbXB0eTogJ0F1Y3VuZSBkaXNwb25pYmlsaXTDqScsXG4gICAgICAgIHNsb3Q6ICdQcm9jaGFpbmUgZGlzcG9uaWJpbGl0w6knLFxuICAgICAgfSxcbiAgICAgIHNlc3Npb246IHtcbiAgICAgICAgaW5mbzogJ0Nyw6luZWF1IHbDqXJyb3VpbGzDqSdcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBXaGVuIHVzZXIgc3doaXRjaCB2aWV3IG1vZGUgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSB2aWV3TW9kZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIC8qKlxuICAgKiBTZXNzaW9uIGNyZWF0ZWQgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSBzZXNzaW9uQ3JlYXRlZDogRXZlbnRFbWl0dGVyPFNlc3Npb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZXNzaW9uPigpO1xuICAvKipcbiAgICogU2Vzc2lvbiByZW1vdmVkIGV2ZW50XG4gICAqL1xuICBAT3V0cHV0KCkgc2Vzc2lvblJlbW92ZWQ6IEV2ZW50RW1pdHRlcjxTZXNzaW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4oKTtcbiAgLyoqXG4gICAqIEFycmF5IG9mIHNlbGVjdGFibGUgZGF5cyBmcm9tIHN0YXJ0IHRvIGVuZFxuICAgKi9cbiAgZGF5czogQXJyYXk8RGF5PiA9IFtdO1xuICAvKipcbiAgICogU2xvdCBEdXJhdGlvbiBpbiBtaW51dGVzXG4gICAqL1xuICByZWFsRHVyYXRpb246IG51bWJlcjtcbiAgLyoqXG4gICAqIER1cmluZyBkYXlzIGZyb20gc3RhcnQgdG8gZW5kLCBsaXN0IG9mIGVudHJpZXMgdGhhdCBhdmFpbGFibGVcbiAgICovXG4gIGRheXNBdmFpbGFiaWxpdHk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcbiAgLyoqXG4gICAqIE51bWJlciBvZiBidXN5IHNsb3QgaW4gZWFjaCBkYXlcbiAgICovXG4gIGRheXNCdXN5U2xvdE51bWJlcjogTWFwPHN0cmluZywgbnVtYmVyPjtcbiAgLyoqXG4gICAqIE51bWJlciBvZiBhdmFpbGFibGUgc2xvdCBpbiBlYWNoIGRheVxuICAgKi9cbiAgZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXI6IE1hcDxzdHJpbmcsIG51bWJlcj47XG4gIC8qKlxuICAgKiBTZXQgb2YgZGF0ZXRpbWUgd2hvIHJlcHJlbnNlbnRzIGF2YWlsYWJpbGl0eVxuICAgKi9cbiAgYnVzeVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIHNldCBvZiBkYXRldGltZSB3aG8gcmVwcmVzZW50cyBvdmVyIGV4dGVuZHMgYnVzeSBzbG90XG4gICAqL1xuICBlYXJseVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIHNldCBvZiBkYXRldGltZSB3aG8gcmVwcmVzZW50cyBwYXVzZSBzbG90XG4gICAqL1xuICBwYXVzZVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgLyoqXG4gICAqIHNldCBvZiBkYXRldGltZSB3aG8gcmVwcmVzZW50cyBzZXNzaW9uIHNsb3RcbiAgICovXG4gIHNlc3Npb25zU2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogc2V0IG9mIGRhdGV0aW1lIHdobyByZXByZXNlbnRzIGVuZCBzbG90IChub3QgdXNlZCBpbiBmcm9udClcbiAgICovXG4gIHNlc3Npb25zRW5kU2xvdHM6IFNldDxzdHJpbmc+O1xuICAvKipcbiAgICogc2V0IG9mIGRhdGV0aW1lIHdobyByZXByZXNlbnRzIGVuZCBzbG90IChub3QgdXNlZCBpbiBmcm9udClcbiAgICovXG4gIHNlc3Npb25zU3RhcnRTbG90czogU2V0PHN0cmluZz47XG4gIC8qKlxuICAgKiBNYXAgb2Ygc2Vzc2lvbnMgZnJvbSBjdXJyZW50IHVzZXJcbiAgICovXG4gIHNlc3Npb25zOiBNYXA8c3RyaW5nLCBTZXNzaW9uPjtcbiAgLyoqXG4gICAqIGNhbGVuZGFyIHN0YXJ0IGRheSBhZnRlciBzZXQgZnVsbCBjYWxlbmRhciBpbmZvcm1hdGlvbnNcbiAgICovXG4gIHByaXZhdGUgY2FsZW5kYXJTdGFydDogTW9tZW50O1xuICAvKipcbiAgICogY2FsZW5kYXIgZW5kIGRheSBhZnRlciBzZXQgZnVsbCBjYWxlbmRhciBpbmZvcm1hdGlvbnNcbiAgICovXG4gIHByaXZhdGUgY2FsZW5kYXJFbmQ6IE1vbWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXNzaW9ucyBhcnJheSBsb2FkZWQgYnkgcGFyZW50IGNvbXBvbmVudFxuICAgKi9cbiAgX3Nlc3Npb25zRW50cmllczogU2Vzc2lvbltdID0gW107XG5cbiAgZ2V0IHNlc3Npb25zRW50cmllcygpOiBTZXNzaW9uW10ge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uc0VudHJpZXM7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgc2Vzc2lvbnNFbnRyaWVzKHNlc3Npb25zRW50cmllczogU2Vzc2lvbltdKSB7XG4gICAgaWYgKHNlc3Npb25zRW50cmllcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3Nlc3Npb25zRW50cmllcyA9IHNlc3Npb25zRW50cmllcztcbiAgICB9XG4gICAgdGhpcy5sb2FkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIC8vIERlZmF1bHQgVmlldyBNb2RlIG9mIFdlZWsgQ29tcG9uZW50XG4gIF92aWV3TW9kZSA9ICd3ZWVrJztcblxuICBnZXQgdmlld01vZGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld01vZGU7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgdmlld01vZGUodmlld01vZGUpIHtcbiAgICB0aGlzLl92aWV3TW9kZSA9IHZpZXdNb2RlO1xuICAgIHRoaXMuc2V0Vmlld01vZGUoKTtcbiAgfVxuXG4gIHN0YXRpYyBzcGxpdFJhbmdlVG9OZXh0VGltZShzbG90VGltZVJhbmdlOiBUd2l4SXRlciwgc2xvdER1cmF0aW9uOiBudW1iZXIpOiB7dGltZTogVHdpeCwgbW10VGltZTogTW9tZW50fSB7XG4gICAgY29uc3QgdGltZTogVHdpeCA9IHNsb3RUaW1lUmFuZ2UubmV4dCgpO1xuICAgIHJldHVybiB7dGltZSwgbW10VGltZTogQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzbG90RHVyYXRpb24pfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRNaW51dGVzRGlmZmVyZW5jZShtbXRUaW1lOiBNb21lbnQsIHNsb3REdXJhdGlvbjogbnVtYmVyKTogTW9tZW50IHtcbiAgICBpZiAobW10VGltZS5taW51dGVzKCkgJSBzbG90RHVyYXRpb24gIT09IDApIHtcbiAgICAgIG1tdFRpbWUubWludXRlcyhtbXRUaW1lLm1pbnV0ZXMoKSAtIChtbXRUaW1lLm1pbnV0ZXMoKSAlIHNsb3REdXJhdGlvbikpO1xuICAgIH1cblxuICAgIHJldHVybiBtbXRUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3BlY3QgYWxsIGNoYW5nZXNcbiAgICovXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMubG9hZENhbGVuZGFyKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IERlZmF1bHQgdmFyaWFibGVzXG4gICAqL1xuICBzZXRDYWxlbmRhcigpIHtcbiAgICB0aGlzLmRheXMgPSBbXTtcbiAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5zZXNzaW9uc1Nsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLnNlc3Npb25zU3RhcnRTbG90cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLmVhcmx5U2xvdHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5wYXVzZVNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuYnVzeVNsb3RzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuc2Vzc2lvbnMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5zZXNzaW9ucy5uZXh0KHRoaXMuc2Vzc2lvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBWaWV3IE1vZGUgd2l0aCB3ZWVrLCBkYXksIDMgZGF5c1xuICAgKiBJbml0IHN0YXJ0LCBlbmQsXG4gICAqXG4gICAqL1xuICBzZXRWaWV3TW9kZSgpIHtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ2RheScpIHtcbiAgICAgIHRoaXMuZW5kID0gdGhpcy5zdGFydDtcbiAgICAgIHRoaXMuY2FsZW5kYXJTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdGFydE9mKCdkYXknKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJFbmQgPSBtb21lbnQodGhpcy5lbmQpLmVuZE9mKCdkYXknKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudmlld01vZGUgPT09ICd0aHJlZV9kYXlzJykge1xuICAgICAgdGhpcy5lbmQgPSBtb21lbnQodGhpcy5zdGFydCkuYWRkKDIsICdkYXlzJyk7XG4gICAgICB0aGlzLmNhbGVuZGFyU3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuc3RhcnRPZignZGF5Jyk7XG4gICAgICB0aGlzLmNhbGVuZGFyRW5kID0gbW9tZW50KHRoaXMuZW5kKS5lbmRPZignZGF5Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIEluaXQgZmlyc3QgZGF5IHdlZWsgbnVtYmVyXG4gICAgY29uc3QgZmlyc3REYXkgPSAwO1xuICAgIC8vIElmIGVtcHR5IHN0YXJ0IGRhdGUgdGhlbiBzdGFydCB0byB0b2RheVxuICAgIGlmICghdGhpcy5zdGFydCkge1xuICAgICAgdGhpcy5zdGFydCA9IG1vbWVudCgpO1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLmRheShmaXJzdERheSkuc3RhcnRPZignZGF5Jyk7XG4gICAgdGhpcy5lbmQgPSBtb21lbnQodGhpcy5zdGFydCkuYWRkKDYsICdkYXlzJykuZW5kT2YoJ2RheScpO1xuXG4gICAgdGhpcy5jYWxlbmRhclN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLnN0YXJ0T2YoJ2RheScpO1xuICAgIHRoaXMuY2FsZW5kYXJFbmQgPSBtb21lbnQodGhpcy5lbmQpLmVuZE9mKCdkYXknKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBzdGFydC92aWV3TW9kZSBjaGFuZ2VkLCBkbyBhIHJlY2FsY3VsYXRlIG9mIGluaXQgc3RhcnQsIGVuZFxuICAgKiBkYXlzLCBkYXlzQXZhaWxhYmlsaXR5IGFuZCB2aWV3TW9kZVxuICAgKi9cbiAgbG9hZENhbGVuZGFyKCkge1xuICAgIHRoaXMuc2V0Q2FsZW5kYXIoKTtcbiAgICB0aGlzLnNldFZpZXdNb2RlKCk7XG4gICAgdGhpcy5zZXREYXRlUmFuZ2UodGhpcy5zdGFydCwgdGhpcy5lbmQpO1xuICAgIHRoaXMubG9hZEV2ZW50cyh0aGlzLnN0YXJ0LCB0aGlzLmVuZCk7XG4gICAgdGhpcy5sb2FkQXZhaWxhYmlsaXRpZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYXZhaWxhYmxlIGRheXMgZnJvbSBzdGFydCB0byBlbmQgZGF0ZXNcbiAgICovXG4gIHNldERhdGVSYW5nZShzdGFydDogTW9tZW50LCBlbmQ6IE1vbWVudCkge1xuICAgIC8vIERheXMgcmFuZ2UgZnJvbSBzdGFydCB0byBlbmRcbiAgICBjb25zdCBkYXlzUmFuZ2U6IFR3aXhJdGVyID0gc3RhcnRcbiAgICAgIC50d2l4KGVuZClcbiAgICAgIC5pdGVyYXRlKDEsICdkYXlzJyk7XG4gICAgLy8gTG9hZGluZyBhbGwgZGF5c1xuICAgIHdoaWxlIChkYXlzUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCBhdmFpbGFibGVEYXk6IFR3aXggPSBkYXlzUmFuZ2UubmV4dCgpO1xuICAgICAgdGhpcy5kYXlzLnB1c2goe1xuICAgICAgICB0aXRsZTogYXZhaWxhYmxlRGF5LmZvcm1hdCgnREQvTU0vWVlZWScpLFxuICAgICAgICBrZXk6IGF2YWlsYWJsZURheS5mb3JtYXQoJ1lZWVktTU0tREQnKSxcbiAgICAgICAgdmFsdWU6IG1vbWVudChhdmFpbGFibGVEYXkudG9EYXRlKCkpXG4gICAgICB9KTtcbiAgICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5zZXQoYXZhaWxhYmxlRGF5LmZvcm1hdCgnWVlZWS1NTS1ERCcpLCBbXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9uIHN3aXRjaCBkYXRlIHJhbmdlXG4gICAqL1xuICBvblN3aXRoZWRWaWV3KHZpZXdNb2RlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZpZXdNb2RlID0gdmlld01vZGU7XG4gICAgdGhpcy52aWV3TW9kZUNoYW5nZWQuZW1pdCh2aWV3TW9kZSk7XG4gICAgdGhpcy5sb2FkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBzdGFydCBjaGFuZ2UgZXZlbnRcbiAgICovXG4gIG9uU3RhcnRDaGFuZ2VkKHN0YXJ0OiBNb21lbnQpIHtcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5sb2FkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBzZXNzaW9uIGFkZGVkIG9uIGNsaWNrIGV2ZW50XG4gICAqL1xuICBvblNlc3Npb25BZGRlZChzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgdGhpcy5zZXNzaW9ucy5zZXQobW9tZW50KHNlc3Npb24uc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJyksIHNlc3Npb24pO1xuICAgIHRoaXMuc2Vzc2lvblNlcnZpY2Uuc2Vzc2lvbnMubmV4dCh0aGlzLnNlc3Npb25zKTtcbiAgICB0aGlzLmFkZFNlc3Npb24oc2Vzc2lvbik7XG4gICAgdGhpcy5zZXNzaW9uQ3JlYXRlZC5lbWl0KHNlc3Npb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHJlbW92ZWQgZXZlbnRcbiAgICovXG4gIG9uU2Vzc2lvblJlbW92ZWQoc291cmNlOiB7a2V5OiBzdHJpbmcsIHNlc3Npb246IFNlc3Npb259KSB7XG4gICAgdGhpcy5zZXNzaW9ucy5kZWxldGUoc291cmNlLmtleSk7XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5zZXNzaW9ucy5uZXh0KHRoaXMuc2Vzc2lvbnMpO1xuICAgIHRoaXMucmVtb3ZlU2Vzc2lvbihzb3VyY2Uuc2Vzc2lvbik7XG4gICAgdGhpcy5zZXNzaW9uUmVtb3ZlZC5lbWl0KHNvdXJjZS5zZXNzaW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGFsbCB0aW1lIGZvciBlYWNoIGRheXNcbiAgICovXG4gIGxvYWRBdmFpbGFiaWxpdGllcygpIHtcbiAgICAvLyBubyBvbmxpbmUgc2Vzc2lvbiBubyBjYWxlbmRhclxuICAgIGlmICghdGhpcy5kYXlzQXZhaWxhYmlsaXR5IHx8ICF0aGlzLm9ubGluZVNlc3Npb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gc2Vzc2lvbiBkdXJhdGlvblxuICAgIHRoaXMucmVhbER1cmF0aW9uID0gdGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uO1xuICAgIC8vIHNlc3Npb24gZGF5IHN0YXJ0IDAwOjAwIC0gZW5kIDIzOjU5XG4gICAgY29uc3Qgb25saW5lU2Vzc2lvblN0YXJ0OiBNb21lbnQgPSBtb21lbnQodGhpcy5vbmxpbmVTZXNzaW9uLnN0YXJ0X2RhdGUsICdZWVlZLU1NLUREJykuc3RhcnRPZignZGF5Jyk7XG4gICAgY29uc3Qgb25saW5lU2Vzc2lvbkVuZDogTW9tZW50ID0gbW9tZW50KHRoaXMub25saW5lU2Vzc2lvbi5lbmRfZGF0ZSwgJ1lZWVktTU0tREQnKS5lbmRPZignZGF5Jyk7XG4gICAgdGhpcy5kYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlciA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZm9yRWFjaCgoYXZicywgZGF5KSA9PiB7XG4gICAgICBsZXQgc2xvdHNOdW1iZXIgPSAwO1xuICAgICAgLy8gZWFjaCBkYXkgb2YgZGF5cyBhdmFpbGFiaWxpdHkgd2l0aCBzdGFydCB0aW1lIDA4OjAwXG4gICAgICBjb25zdCBtbXREYXkgPSBtb21lbnQoZGF5LCAnWVlZWS1NTS1ERCcpLmhvdXIoOCk7XG4gICAgICBjb25zdCBtbXREYXlTdGFydFRpbWUgPSBtb21lbnQoZGF5ICsgdGhpcy5vbmxpbmVTZXNzaW9uLnN0YXJ0X3RpbWUsICdZWVlZLU1NRERISDptbScpO1xuXG4gICAgICAvLyBJZiBzZXNzaW9uIHN0YXJ0IHRpbWUgbGlrZSAwODowMCBpcyBiZWZvcmUgc3RhcnQgdG9kYXkgMDA6MDBcbiAgICAgIGlmIChtbXREYXlTdGFydFRpbWUuaXNCZWZvcmUobW9tZW50KCkuc3RhcnRPZignZGF5JykpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGJvb2tpbmcgZGVsYXlcbiAgICAgIGNvbnN0IG1pbk1tdFN0YXJ0VGltZSA9IG1vbWVudCgpLmFkZCh0aGlzLm9ubGluZVNlc3Npb24uYm9va2luZ19kZWxheSwgJ2hvdXJzJyk7XG4gICAgICAvLyBzZXNzaW9uIHRpbWUgZW5kXG4gICAgICBjb25zdCBtbXREYXlFbmRUaW1lID0gbW9tZW50KGRheSArIHRoaXMub25saW5lU2Vzc2lvbi5lbmRfdGltZSwgJ1lZWVktTU0tRERISDptbScpO1xuICAgICAgbW10RGF5RW5kVGltZS5zdWJ0cmFjdCh0aGlzLnJlYWxEdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICAgIC8vIHNsb3RzIGl0ZXJhdG9yXG4gICAgICBjb25zdCB0aW1lUmFuZ2U6IFR3aXhJdGVyID0gbW10RGF5U3RhcnRUaW1lLnR3aXgobW10RGF5RW5kVGltZSlcbiAgICAgICAgLml0ZXJhdGUodGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgaWYgKHRoaXMuY2FsZW5kYXJTdGFydCAmJiB0aGlzLmNhbGVuZGFyRW5kICYmIG1tdERheS5pc0JldHdlZW4ob25saW5lU2Vzc2lvblN0YXJ0LCBvbmxpbmVTZXNzaW9uRW5kKSkge1xuICAgICAgICB3aGlsZSAodGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgICAgIGNvbnN0IHRpbWU6IFR3aXggPSB0aW1lUmFuZ2UubmV4dCgpO1xuICAgICAgICAgIGNvbnN0IHRpbWVNbXQ6IE1vbWVudCA9IG1vbWVudCh0aW1lLnRvRGF0ZSgpKTtcbiAgICAgICAgICBpZiAoIXRpbWVNbXQuaXNCZWZvcmUobWluTW10U3RhcnRUaW1lKSkge1xuICAgICAgICAgICAgYXZicy5wdXNoKHRpbWUuZm9ybWF0KCdISDptbScpKTtcbiAgICAgICAgICAgIHNsb3RzTnVtYmVyKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyLnNldChkYXksIHNsb3RzTnVtYmVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc2Vzc2lvbiBldmVudCBpbiBjYWxlbmRhclxuICAgKi9cbiAgYWRkU2Vzc2lvbihzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgY29uc3QgbW10U3RhcnQgPSBtb21lbnQoc2Vzc2lvbi5zdGFydCk7XG4gICAgY29uc3QgbW10RW5kID0gbW9tZW50KHNlc3Npb24uZW5kKTtcbiAgICBjb25zdCB0aW1lSW5uZXJSYW5nZTogVHdpeEl0ZXIgPSBtbXRTdGFydC50d2l4KG1tdEVuZCkuaXRlcmF0ZUlubmVyKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVJbm5lclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVJbm5lclJhbmdlLm5leHQoKTtcbiAgICAgIHRoaXMuc2Vzc2lvbnNTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIGlmICghdGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cy5hZGQodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnNTdGFydFNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBidWlsZGluZyBlYXJsaWVzdCBzbG90IGJlZm9yZSBldmVudCAqL1xuICAgIGNvbnN0IG1tdEVhcmx5U3RhcnQgPSBtbXRTdGFydC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIG1tdEVhcmx5U3RhcnQubWludXRlcyhcbiAgICAgIG1tdEVhcmx5U3RhcnQubWludXRlcygpIC1cbiAgICAgIChtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAlIHNlc3Npb24uZHVyYXRpb24pICsgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgY29uc3QgdGltZUVhcmxpZXJSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseVN0YXJ0LnR3aXgobW10U3RhcnQpLml0ZXJhdGUoc2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICB0aGlzLmhhbmRsZUVhcmx5U2xvdCh0aW1lRWFybGllclJhbmdlLCAnYWRkJywgc2Vzc2lvbiwgbW10RWFybHlTdGFydCwgbW10U3RhcnQpO1xuICAgIC8qIGJ1aWxkaW5nIHBhdXNlIHNsb3RzIGFmdGVyIGV2ZW50ICovXG4gICAgY29uc3QgbW10RWFybHlFbmQgPSBtbXRFbmQuY2xvbmUoKTtcbiAgICBtbXRFYXJseUVuZC5zdWJ0cmFjdChtbXRFYXJseUVuZC5taW51dGVzKCkgJSBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICBjb25zdCBtbXRQYXVzZUVuZCA9IG1tdEVhcmx5RW5kLmNsb25lKCkuYWRkKHNlc3Npb24ucGF1c2UsICdtaW51dGVzJyk7XG4gICAgY29uc3QgdGltZVBhdXNlUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlFbmQudHdpeChtbXRQYXVzZUVuZCkuaXRlcmF0ZShzZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIHRoaXMuaGFuZGxlUGF1c2VTbG90KHRpbWVQYXVzZVJhbmdlLCAnYWRkJywgc2Vzc2lvbiwgbW10RWFybHlTdGFydCwgbW10RWFybHlFbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzZXNzaW9uIGV2ZW50IGluIENhbGVuZGFyXG4gICAqL1xuICByZW1vdmVTZXNzaW9uKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICBjb25zdCBtbXRTdGFydCA9IG1vbWVudChzZXNzaW9uLnN0YXJ0KTtcbiAgICBjb25zdCBtbXRFbmQgPSBtb21lbnQoc2Vzc2lvbi5lbmQpO1xuICAgIGNvbnN0IHRpbWVJbm5lclJhbmdlOiBUd2l4SXRlciA9IG1tdFN0YXJ0LnR3aXgobW10RW5kKS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKHRpbWVJbm5lclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVJbm5lclJhbmdlLm5leHQoKTtcbiAgICAgIGlmICghdGltZUlubmVyUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cy5kZWxldGUodGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnNTdGFydFNsb3RzLmRlbGV0ZSh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiByZW1vdmluZyBlYXJseSBzbG90cyAqL1xuICAgIGNvbnN0IG1tdEVhcmx5U3RhcnQgPSBtbXRTdGFydC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIG1tdEVhcmx5U3RhcnQubWludXRlcyhcbiAgICAgIG1tdEVhcmx5U3RhcnQubWludXRlcygpIC1cbiAgICAgIChtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAlIHNlc3Npb24uZHVyYXRpb24pICsgc2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgY29uc3QgdGltZUVhcmx5UmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlTdGFydC50d2l4KG1tdFN0YXJ0KS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgdGhpcy5oYW5kbGVFYXJseVNsb3QodGltZUVhcmx5UmFuZ2UsICdyZW1vdmUnLCBzZXNzaW9uLCBtbXRFYXJseVN0YXJ0LCBtbXRTdGFydCk7XG4gICAgLyogcmVtb3ZpbmcgcGF1c2Ugc2xvdHMgKi9cbiAgICBpZiAoc2Vzc2lvbi5wYXVzZSkge1xuICAgICAgY29uc3QgbW10RWFybHlFbmQgPSBtbXRFbmQuY2xvbmUoKTtcbiAgICAgIG1tdEVhcmx5RW5kLnN1YnRyYWN0KG1tdEVhcmx5RW5kLm1pbnV0ZXMoKSAlIHNlc3Npb24uZHVyYXRpb24pO1xuICAgICAgY29uc3QgbW10UGF1c2VFbmQgPSBtbXRFYXJseUVuZC5jbG9uZSgpLmFkZChzZXNzaW9uLnBhdXNlLCAnbWludXRlcycpO1xuICAgICAgY29uc3QgdGltZVBhdXNlUmFuZ2U6IFR3aXhJdGVyID0gbW10RWFybHlFbmQudHdpeChtbXRQYXVzZUVuZCkuaXRlcmF0ZShzZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgdGhpcy5oYW5kbGVQYXVzZVNsb3QodGltZVBhdXNlUmFuZ2UsICdyZW1vdmUnLCBzZXNzaW9uLCBtbXRFYXJseVN0YXJ0LCBtbXRFYXJseUVuZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKioqKioqKioqKioqKioqKioqKiBEYXRlIGZ1bmN0aW9ucyAqKioqKioqKioqKioqKlxuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqL1xuICBsb2FkRXZlbnRzKHN0YXJ0OiBNb21lbnQsIGVuZDogTW9tZW50KSB7XG4gICAgaWYgKCF0aGlzLm9ubGluZVNlc3Npb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fc2Vzc2lvbnNFbnRyaWVzKSAmJiB0aGlzLl9zZXNzaW9uc0VudHJpZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9zZXNzaW9uc0VudHJpZXMuZm9yRWFjaCgoc2Vzc2lvbjogU2Vzc2lvbikgPT4ge1xuICAgICAgICBpZiAobW9tZW50KHNlc3Npb24uc3RhcnQpLmlzU2FtZU9yQWZ0ZXIoc3RhcnQpICYmXG4gICAgICAgICAgbW9tZW50KHNlc3Npb24uZW5kKS5pc1NhbWVPckJlZm9yZShlbmQpKSB7XG4gICAgICAgICAgdGhpcy5idWlsZGluQnVzeVNsb3Qoc2Vzc2lvbik7XG4gICAgICAgICAgdGhpcy5idWlsZGluZ0VhcmxpZXN0U2xvdChzZXNzaW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNsb3QgbG9ja2VkXG4gICAqL1xuICBidWlsZGluQnVzeVNsb3Qoc2Vzc2lvbjogU2Vzc2lvbik6IE1vbWVudCB7XG4gICAgY29uc3QgbW10RXZlbnRTdGFydCA9IG1vbWVudChzZXNzaW9uLnN0YXJ0LCAnWVlZWS1NTS1EREhIOm1tJyk7XG4gICAgY29uc3QgbW10RXZlbnRFbmQgPSBtb21lbnQoc2Vzc2lvbi5lbmQsICdZWVlZLU1NLURESEg6bW0nKTtcblxuICAgIGlmICghbW10RXZlbnRTdGFydCB8fCAhbW10RXZlbnRTdGFydC5pc1ZhbGlkKClcbiAgICAgIHx8ICFtbXRFdmVudEVuZCB8fCAhbW10RXZlbnRFbmQuaXNWYWxpZCgpXG4gICAgICB8fCAhbW10RXZlbnRTdGFydC5pc1NhbWVPckJlZm9yZShtbXRFdmVudEVuZCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2ludmFsaWQgZGF0ZXMnLCBtbXRFdmVudFN0YXJ0LCBtbXRFdmVudEVuZCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyogYnVpbGRpbmcgYnVzeSBzbG90cyBieSBldmVudHMgKi9cbiAgICBjb25zdCBldmVudHNUaW1lUmFuZ2U6IFR3aXhJdGVyID0gbW10RXZlbnRTdGFydC50d2l4KG1tdEV2ZW50RW5kKS5pdGVyYXRlKHNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG5cbiAgICB3aGlsZSAoZXZlbnRzVGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3Qge3RpbWUsIG1tdFRpbWV9ID0gQ2FsZW5kYXJDb21wb25lbnQuc3BsaXRSYW5nZVRvTmV4dFRpbWUoZXZlbnRzVGltZVJhbmdlLCBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgIC8qIElGIHRoZSBidXN5IHNsb3QgaXMgYXZhaWxhYmUgYW5kIG5vdCBhbHJlYWR5IGluIGJ1c3lTbG90cyB3ZSBjb3VudCBpdCAqL1xuICAgICAgaWYgKHRoaXMuZGF5c0F2YWlsYWJpbGl0eSAmJlxuICAgICAgICB0aGlzLmRheXNBdmFpbGFiaWxpdHkuaGFzKHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpICYmXG4gICAgICAgICF0aGlzLmJ1c3lTbG90cy5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKSAmJlxuICAgICAgICAhdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmdldCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1ERCcpKS5pbmNsdWRlcyh0aW1lLmZvcm1hdCgnSEg6bW0nKSkpIHtcbiAgICAgICAgaWYgKCghc2Vzc2lvbi5jdXN0b21lcnMgfHxcbiAgICAgICAgICAoc2Vzc2lvbi5jdXN0b21lcnMgJiZcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXIgJiZcbiAgICAgICAgICAgICFzZXNzaW9uLmN1c3RvbWVycy5tYXAoYyA9PiBjLmlkKS5pbmNsdWRlcyh0aGlzLmN1c3RvbWVyLmlkKSkpKSB7XG4gICAgICAgICAgdGhpcy5hZGREYXlCdXN5U2xvdCh0aW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2Vzc2lvbi5jdXN0b21lcnMgJiYgdGhpcy5jdXN0b21lciAmJiBzZXNzaW9uLmN1c3RvbWVycy5tYXAoYyA9PiBjLmlkKS5pbmNsdWRlcyh0aGlzLmN1c3RvbWVyLmlkKSkge1xuICAgICAgICAgIHRoaXMuc2V0U2Vzc2lvblNsb3QoZXZlbnRzVGltZVJhbmdlLCB0aW1lLCBzZXNzaW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLnNlc3Npb25zLm5leHQodGhpcy5zZXNzaW9ucyk7XG5cbiAgICByZXR1cm4gbW10RXZlbnRTdGFydDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBpbiBzZXNzaW9ucyBNYXAgb25seSBzdGFydCBzZXNzaW9uIHdpdGggaXRzIHNlc3Npb25cbiAgICovXG4gIHNldFNlc3Npb25TbG90KGV2ZW50c1RpbWVSYW5nZTogVHdpeEl0ZXIsIHRpbWU6IFR3aXgsIHNlc3Npb246IFNlc3Npb24pIHtcbiAgICB0aGlzLnNlc3Npb25zU2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgaWYgKCFldmVudHNUaW1lUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICB0aGlzLnNlc3Npb25zRW5kU2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2Vzc2lvbnMuc2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSwgc2Vzc2lvbik7XG4gICAgdGhpcy5zZXNzaW9uc1N0YXJ0U2xvdHMuYWRkKHRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gIH1cblxuICAvKipcbiAgICogU2xvdCBiZWZvcmUgYXZhaWxhYmlsaXR5IHJhbmdlXG4gICAqL1xuICBidWlsZGluZ0VhcmxpZXN0U2xvdChzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgY29uc3QgbW10RXZlbnRTdGFydDogTW9tZW50ID0gbW9tZW50KHNlc3Npb24uc3RhcnQsICdZWVlZLU1NLURESEg6bW0nKTtcbiAgICBpZiAoIW1tdEV2ZW50U3RhcnQgfHwgIXRoaXMucmVhbER1cmF0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyogYnVpbGRpbmcgZWFybGllc3Qgc2xvdCBiZWZvcmUgZXZlbnQgKi9cbiAgICBjb25zdCBtbXRFYXJseVN0YXJ0ID0gbW10RXZlbnRTdGFydC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMucmVhbER1cmF0aW9uLCAnbWludXRlcycpO1xuICAgIG1tdEVhcmx5U3RhcnQubWludXRlcyhtbXRFYXJseVN0YXJ0Lm1pbnV0ZXMoKSAtXG4gICAgICAobW10RWFybHlTdGFydC5taW51dGVzKCkgJSB0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb24pICsgdGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uKTtcbiAgICBjb25zdCBlYXJsaWVzdFRpbWVSYW5nZTogVHdpeEl0ZXIgPSBtbXRFYXJseVN0YXJ0LnR3aXgobW10RXZlbnRTdGFydCkuaXRlcmF0ZSh0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgd2hpbGUgKGVhcmxpZXN0VGltZVJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3Qge3RpbWUsIG1tdFRpbWV9ID0gQ2FsZW5kYXJDb21wb25lbnQuc3BsaXRSYW5nZVRvTmV4dFRpbWUoZWFybGllc3RUaW1lUmFuZ2UsIHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbik7XG4gICAgICAvKiBJRiB0aGUgYnVzeSBzbG90IGlzIGluIGF2YWlsYWJpbGl0eSBhbmQgbm90IGFscmVhZHkgaW4gYnVzeVNsb3RzIHdlIGNvdW50IGl0ICovXG4gICAgICBpZiAodGhpcy5kYXlzQXZhaWxhYmlsaXR5ICYmXG4gICAgICAgIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSlcbiAgICAgICAgJiYgIXRoaXMuYnVzeVNsb3RzLmhhcyh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpXG4gICAgICAgICYmIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5nZXQodGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkuaW5jbHVkZXModGltZS5mb3JtYXQoJ0hIOm1tJykpKSB7XG4gICAgICAgIHRoaXMuYWRkRGF5QnVzeVNsb3QodGltZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpbiBidXN5IHNsb3QgbmV3IHVuYXZhaWxhYmxlIHRpbWUgcmVmZXJlbmNlXG4gICAqL1xuICBhZGREYXlCdXN5U2xvdCh0aW1lOiBUd2l4KSB7XG4gICAgbGV0IGRheUJ1c3lOdW1iZXIgPSB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5oYXModGltZS5mb3JtYXQoJ1lZWVktTU0tREQnKSkgP1xuICAgICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuZ2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykpIDogMDtcbiAgICBkYXlCdXN5TnVtYmVyKys7XG4gICAgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuc2V0KHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJyksIGRheUJ1c3lOdW1iZXIpO1xuICAgIHRoaXMuYnVzeVNsb3RzLmFkZCh0aW1lLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZS9hZGQgZnJvbSBwYXVzZVNsb3Qgc2Vzc2lvbnMgc3RhcnQvZW5kIGludGVydmFsXG4gICAqL1xuICBoYW5kbGVQYXVzZVNsb3QodGltZVBhdXNlUmFuZ2U6IFR3aXhJdGVyLCBhY3Rpb246IHN0cmluZywgc2Vzc2lvbjogU2Vzc2lvbiwgc3RhcnQ6IE1vbWVudCwgZW5kOiBNb21lbnQpIHtcbiAgICB3aGlsZSAodGltZVBhdXNlUmFuZ2UuaGFzTmV4dCgpKSB7XG4gICAgICBjb25zdCB0aW1lOiBUd2l4ID0gdGltZVBhdXNlUmFuZ2UubmV4dCgpO1xuICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgIGlmIChtbXRUaW1lLmlzU2FtZU9yQWZ0ZXIoc3RhcnQpICYmIG1tdFRpbWUuaXNCZWZvcmUoZW5kKSkge1xuICAgICAgICBpZiAoYWN0aW9uID09PSAncmVtb3ZlJykge1xuICAgICAgICAgIHRoaXMucGF1c2VTbG90cy5kZWxldGUobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uID09PSAnYWRkJykge1xuICAgICAgICAgIHRoaXMucGF1c2VTbG90cy5hZGQobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUvYWRkIGZyb20gZWFybHlTbG90IGFsbCBzZXNzaW9uc1xuICAgKi9cbiAgaGFuZGxlRWFybHlTbG90KHRpbWVFYXJsaWVyUmFuZ2U6IFR3aXhJdGVyLFxuICAgICAgICAgICAgICAgICAgYWN0aW9uOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICBzZXNzaW9uOiBTZXNzaW9uLFxuICAgICAgICAgICAgICAgICAgbW10RWFybHlTdGFydDogTW9tZW50LFxuICAgICAgICAgICAgICAgICAgbW10U3RhcnQ6IE1vbWVudCkge1xuICAgIHdoaWxlICh0aW1lRWFybGllclJhbmdlLmhhc05leHQoKSkge1xuICAgICAgY29uc3QgdGltZTogVHdpeCA9IHRpbWVFYXJsaWVyUmFuZ2UubmV4dCgpO1xuICAgICAgY29uc3QgbW10VGltZTogTW9tZW50ID0gQ2FsZW5kYXJDb21wb25lbnQuZ2V0TWludXRlc0RpZmZlcmVuY2UobW9tZW50KHRpbWUudG9EYXRlKCkpLCBzZXNzaW9uLmR1cmF0aW9uKTtcbiAgICAgIGlmIChtbXRUaW1lLmlzU2FtZU9yQWZ0ZXIobW10RWFybHlTdGFydCkgJiYgbW10VGltZS5pc0JlZm9yZShtbXRTdGFydCkpIHtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2FkZCcpIHtcbiAgICAgICAgICB0aGlzLmVhcmx5U2xvdHMuYWRkKG1tdFRpbWUuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWN0aW9uID09PSAncmVtb3ZlJykge1xuICAgICAgICAgIHRoaXMuZWFybHlTbG90cy5kZWxldGUobW10VGltZS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIndlZWstY2FsZW5kYXItd3JhcHBlclwiPlxuICA8ZGl2IGNsYXNzPVwid2Vlay1jYWxlbmRhci1oZWFkZXJcIj5cblxuXG4gICAgPGRpdiBjbGFzcz1cIndlZWstY2FsZW5kYXItdGl0bGVcIj5cblxuICAgICAgPGxpYi1jYWxlbmRhci1oZWFkZXIgW3N0YXJ0XT1cInN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlbmRdPVwiZW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFtoZWFkZXJDb25maWd1cmF0aW9uXT1cImNhbGVuZGFyQ29uZmlndXJhdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdmlld01vZGVdPVwidmlld01vZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN3aXRjaGVkVmlldyk9XCJvblN3aXRoZWRWaWV3KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN0YXJ0Q2hhbmdlZCk9XCJvblN0YXJ0Q2hhbmdlZCgkZXZlbnQpXCI+PC9saWItY2FsZW5kYXItaGVhZGVyPlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbiAgPGRpdj5cblxuXG4gICAgPGxpYi1jYWxlbmRhci1ib2R5IFtib2R5Q29uZmlndXJhdGlvbl09XCJjYWxlbmRhckNvbmZpZ3VyYXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICBbb25saW5lU2Vzc2lvbl09XCJvbmxpbmVTZXNzaW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2RheXNdPVwiZGF5c1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFt2aWV3TW9kZV09XCJ2aWV3TW9kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdGFydF09XCJzdGFydFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtlbmRdPVwiZW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2RheXNBdmFpbGFiaWxpdHldPVwiZGF5c0F2YWlsYWJpbGl0eVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtkYXlzQnVzeVNsb3ROdW1iZXJdPVwiZGF5c0J1c3lTbG90TnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2RheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyXT1cImRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2J1c3lTbG90c109XCJidXN5U2xvdHNcIlxuICAgICAgICAgICAgICAgICAgICAgICBbdXNlcl09XCJ1c2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2N1c3RvbWVyXT1cImN1c3RvbWVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2Vhcmx5U2xvdHNdPVwiZWFybHlTbG90c1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFtwYXVzZVNsb3RzXT1cInBhdXNlU2xvdHNcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc2Vzc2lvbnNTbG90c109XCJzZXNzaW9uc1Nsb3RzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3Nlc3Npb25zU3RhcnRTbG90c109XCJzZXNzaW9uc1N0YXJ0U2xvdHNcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc2Vzc2lvbnNFbmRTbG90c109XCJzZXNzaW9uc0VuZFNsb3RzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgKHN0YXJ0Q2hhbmdlZCk9XCJvblN0YXJ0Q2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgKHNlc3Npb25BZGRlZCk9XCJvblNlc3Npb25BZGRlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgKHNlc3Npb25SZW1vdmVkKT1cIm9uU2Vzc2lvblJlbW92ZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic3RhcnQgJiYgZW5kICYmIGRheXMgJiYgdmlld01vZGVcIj48L2xpYi1jYWxlbmRhci1ib2R5PlxuXG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=