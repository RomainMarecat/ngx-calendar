import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { Component, EventEmitter, Input, Output, ChangeDetectorRef, NgModule } from '@angular/core';
import * as moment_ from 'moment';
import 'twix';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Event = /** @class */ (function () {
    function Event() {
    }
    return Event;
}());
/** @enum {number} */
var EventType = {
    absence: 0,
    session: 1,
};
EventType[EventType.absence] = 'absence';
EventType[EventType.session] = 'session';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var moment = moment_;
var CalendarBodyComponent = /** @class */ (function () {
    function CalendarBodyComponent() {
        this.sessionAdded = new EventEmitter();
        this.sessionRemoved = new EventEmitter();
        this.startChanged = new EventEmitter();
        this.endChanged = new EventEmitter();
        this.slotLocked = new EventEmitter();
    }
    /**
     * On click next day button, trigger switch start
     */
    /**
     * On click next day button, trigger switch start
     * @return {?}
     */
    CalendarBodyComponent.prototype.onNextDay = /**
     * On click next day button, trigger switch start
     * @return {?}
     */
    function () {
        /** @type {?} */
        var daysNb = 1;
        if (this.viewMode === 'week') {
            daysNb = 7;
        }
        this.start = moment(this.start).add(daysNb, 'day');
        this.startChanged.emit(this.start);
    };
    /**
     * If all slot is not avalaibles all all days
     */
    /**
     * If all slot is not avalaibles all all days
     * @return {?}
     */
    CalendarBodyComponent.prototype.isAllSlotNotAvailable = /**
     * If all slot is not avalaibles all all days
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.days && this.days.length > 0) {
            return this.days.filter((/**
             * @param {?} day
             * @return {?}
             */
            function (day) { return _this.daysAvailability.get(day.key).length > 0; })).length === 0;
        }
    };
    /**
     * All Availabilities by key: string, title: string, value: Moment
     */
    /**
     * All Availabilities by key: string, title: string, value: Moment
     * @param {?} day
     * @return {?}
     */
    CalendarBodyComponent.prototype.getAvailabilities = /**
     * All Availabilities by key: string, title: string, value: Moment
     * @param {?} day
     * @return {?}
     */
    function (day) {
        return this.daysAvailability.get(day);
    };
    /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    CalendarBodyComponent.prototype.getSessionTitle = /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    function (day, time) {
        /** @type {?} */
        var datetime = day.value.format('YYYY-MM-DD') + time;
        if (this.sessions && this.sessions.has(datetime)) {
            /** @type {?} */
            var session = this.sessions.get(datetime);
            return moment(session.start).format('HH:mm') + ' - ' + moment(session.end).format('HH:mm');
        }
        return '';
    };
    /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    CalendarBodyComponent.prototype.getSessionTooltip = /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    function (day, time) {
        /** @type {?} */
        var datetime = day.value.format('YYYY-MM-DD') + time;
        if (this.sessions && this.sessions.has(datetime)) {
            /** @type {?} */
            var session = this.sessions.get(datetime);
            if (session.details.info) {
                return session.details.info;
            }
        }
        return '';
    };
    /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    CalendarBodyComponent.prototype.onTimeSlotClicked = /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    function (day, time) {
        /** @type {?} */
        var datetime = day.value.format('YYYY-MM-DD') + time;
        if (this.isSlotBusy(day, time) || this.isSlotEarly(day, time)) {
            this.slotLocked.emit(true);
            return;
        }
        if (!this.isSlotSessionStart(day, time) && !this.isSlotInSession(day, time)) {
            /** @type {?} */
            var mmtStart = moment(datetime, 'YYYY-MM-DDHH:mm');
            /** @type {?} */
            var mmtEnd = mmtStart.clone().add(this.onlineSession.session_type.duration, 'minutes');
            this.addSession(mmtStart, mmtEnd);
        }
        else if (this.sessions.has(datetime)) {
            /** @type {?} */
            var session = this.sessions.get(datetime);
            /** @type {?} */
            var source = { key: datetime, session: session };
            this.removeSession(source);
        }
    };
    /**
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    CalendarBodyComponent.prototype.addSession = /**
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    function (start, end) {
        /** @type {?} */
        var session = {
            start: start.toDate(),
            end: end.toDate(),
            pause: this.onlineSession.session_type.pause,
            details: {
                nb_persons: 1,
                event_type: EventType.session,
                info: this.bodyConfiguration.calendar.session.info,
            }
        };
        this.sessionAdded.emit(session);
    };
    /**
     * @param {?} source
     * @return {?}
     */
    CalendarBodyComponent.prototype.removeSession = /**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        this.sessionRemoved.emit(source);
    };
    /**
     * If day is busy (occupé) by current key string
     */
    /**
     * If day is busy (occupé) by current key string
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    CalendarBodyComponent.prototype.isDayBusy = /**
     * If day is busy (occupé) by current key string
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    function (day, time) {
        /** @type {?} */
        var datetime = day.value.format('YYYY-MM-DD') + time;
        return this.daysBusySlotNumber && this.daysAvailabilitySlotNumber
            && this.daysBusySlotNumber.has(datetime) && this.daysAvailabilitySlotNumber.has(datetime)
            && this.daysBusySlotNumber.get(datetime) >= this.daysAvailabilitySlotNumber.get(datetime);
    };
    /**
     * If slot is busy by date
     */
    /**
     * If slot is busy by date
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    CalendarBodyComponent.prototype.isSlotBusy = /**
     * If slot is busy by date
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    function (day, time) {
        /** @type {?} */
        var datetime = day.value.format('YYYY-MM-DD') + time;
        return this.busySlots && this.busySlots.has(datetime);
    };
    /**
     * if slot is on previous (date plus tôt)
     */
    /**
     * if slot is on previous (date plus tôt)
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    CalendarBodyComponent.prototype.isSlotEarly = /**
     * if slot is on previous (date plus tôt)
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    function (day, time) {
        /** @type {?} */
        var datetime = day.value.format('YYYY-MM-DD') + time;
        return (this.earlySlots && this.earlySlots.has(datetime))
            || (this.pauseSlots && this.pauseSlots.has(datetime));
    };
    /**
     * is Slot in current activities
     */
    /**
     * is Slot in current activities
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    CalendarBodyComponent.prototype.isSlotInSession = /**
     * is Slot in current activities
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    function (day, time) {
        /** @type {?} */
        var datetime = day.value.format('YYYY-MM-DD') + time;
        return this.sessionsSlots && this.sessionsSlots.has(datetime);
    };
    /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    CalendarBodyComponent.prototype.isSlotSessionStart = /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    function (day, time) {
        /** @type {?} */
        var datetime = day.value.format('YYYY-MM-DD') + time;
        return this.sessions && this.sessions.has(datetime);
    };
    /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    CalendarBodyComponent.prototype.isSlotSessionEnd = /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    function (day, time) {
        /** @type {?} */
        var datetime = day.value.format('YYYY-MM-DD') + time;
        return this.sessionsEndSlots && this.sessionsEndSlots.has(datetime);
    };
    CalendarBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-calendar-body',
                    template: "<div class=\"calendar-body-wrapper\">\n  <table class=\"calendar-body-table-wrapper table table-bordered\">\n    <thead class=\"calendar-body-table-head\">\n    <tr class=\"calendar-body-head-day-row\"\n        *ngIf=\"viewMode !== 'day'\">\n      <th class=\"calendar-body-day-header text-center\"\n          *ngFor=\"let day of days\">\n        <span class=\"truncate\">{{ day.title }}</span>\n      </th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr class=\"calendar-body-row\">\n      <td class=\"calendar-body-column-content text-center\"\n          [attr.id]=\"day.key\"\n          *ngFor=\"let day of days; let keyDay = index\">\n        <div class=\"time-slot\"\n             [class.busy]=\"isSlotBusy(day, time)\"\n             [class.early]=\"isSlotEarly(day, time)\"\n             [class.session]=\"isSlotInSession(day, time)\"\n             [class.session-start]=\"isSlotSessionStart(day, time)\"\n             [class.session-end]=\"isSlotSessionEnd(day, time)\"\n             *ngFor=\"let time of getAvailabilities(day.key)\">\n          <div class=\"time-content\">\n            <button type=\"button\"\n                    class=\"slot-available\"\n                    color=\"primary\"\n                    mat-raised-button\n                    (click)=\"onTimeSlotClicked(day, time)\"\n                    *ngIf=\"!isSlotSessionStart(day, time); else sessionTitle\">\n              <span class=\"default-time\">{{ time }}</span>\n            </button>\n            <ng-template #sessionTitle>\n              <button type=\"button\"\n                      mat-raised-button\n                      class=\"slot-session\">\n                {{ getSessionTitle(day, time)}}\n              </button>\n            </ng-template>\n            <a class=\"link-close\" (click)=\"onTimeSlotClicked(day, time)\">\n              <mat-icon class=\"icon-close\"\n                        *ngIf=\"isSlotSessionStart(day, time)\">\n                close\n              </mat-icon>\n            </a>\n          </div>\n          <div class=\"slot-busy\"\n               *ngIf=\"getAvailabilities(day.key).length <= 0 || isDayBusy(day, time)\">\n            <span>{{bodyConfiguration.calendar.availability.empty}}</span>\n          </div>\n        </div>\n        <div class=\"next-slot\"\n             *ngIf=\"isAllSlotNotAvailable() && keyDay === days.length-1\">\n          <button type=\"button\"\n                  role=\"button\"\n                  mat-raised-button\n                  color=\"primary\"\n                  [title]=\"bodyConfiguration.calendar.availability.slot\"\n                  (click)=\"onNextDay()\">\n            <span>{{ bodyConfiguration.calendar.availability.slot }}</span>\n            <mat-icon>keyboard_arrow_right</mat-icon>\n          </button>\n        </div>\n      </td>\n    </tr>\n    </tbody>\n  </table>\n</div>\n",
                    styles: [".calendar-body-wrapper .calendar-body-column-content{max-width:240px}.calendar-body-wrapper .calendar-body-column-content .time-slot{padding:5px}.calendar-body-wrapper .calendar-body-column-content .time-slot button.slot-available{cursor:pointer;width:120px}.calendar-body-wrapper .calendar-body-column-content .time-slot:hover button.slot-available{background-color:#006400;color:#fff}.calendar-body-wrapper .calendar-body-column-content .time-slot.busy{display:none}.calendar-body-wrapper .calendar-body-column-content .time-slot.busy button.slot-available{color:#8b0000;cursor:not-allowed}.calendar-body-wrapper .calendar-body-column-content .time-slot.early button.slot-available{cursor:not-allowed;color:orange}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content{position:relative;padding:5px 5px 5px 0}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .slot-session{width:120px;background-color:#ff8c00}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close .icon-close{position:absolute;right:5px;top:6px;font-size:14px}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close,.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close:hover{cursor:pointer}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-start{border-top-left-radius:3px;border-top-right-radius:3px}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-start .slot-session{color:#000;cursor:text}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-end{border-bottom-left-radius:3px;border-bottom-right-radius:3px}"]
                }] }
    ];
    CalendarBodyComponent.propDecorators = {
        onlineSession: [{ type: Input }],
        viewMode: [{ type: Input }],
        start: [{ type: Input }],
        end: [{ type: Input }],
        days: [{ type: Input }],
        daysAvailability: [{ type: Input }],
        daysBusySlotNumber: [{ type: Input }],
        daysAvailabilitySlotNumber: [{ type: Input }],
        busySlots: [{ type: Input }],
        earlySlots: [{ type: Input }],
        pauseSlots: [{ type: Input }],
        sessionsSlots: [{ type: Input }],
        sessionsEndSlots: [{ type: Input }],
        sessions: [{ type: Input }],
        bodyConfiguration: [{ type: Input }],
        sessionAdded: [{ type: Output }],
        sessionRemoved: [{ type: Output }],
        startChanged: [{ type: Output }],
        endChanged: [{ type: Output }],
        slotLocked: [{ type: Output }]
    };
    return CalendarBodyComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var moment$1 = moment_;
var CalendarHeaderComponent = /** @class */ (function () {
    function CalendarHeaderComponent() {
        /**
         * Switch view event
         */
        this.switchedView = new EventEmitter();
        /**
         * Start day changed event
         */
        this.startChanged = new EventEmitter();
    }
    Object.defineProperty(CalendarHeaderComponent.prototype, "viewMode", {
        /**
         * getter of private _viewMode
         */
        get: /**
         * getter of private _viewMode
         * @return {?}
         */
        function () {
            return this._viewMode;
        },
        /**
         * Setter of switch view
         */
        set: /**
         * Setter of switch view
         * @param {?} viewMode
         * @return {?}
         */
        function (viewMode) {
            this.switchView(viewMode);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Switch current view to another
     */
    /**
     * Switch current view to another
     * @param {?} viewMode
     * @return {?}
     */
    CalendarHeaderComponent.prototype.switchView = /**
     * Switch current view to another
     * @param {?} viewMode
     * @return {?}
     */
    function (viewMode) {
        this._viewMode = viewMode;
        this.onSwitchedView(viewMode);
    };
    /**
     * Emitter of view
     */
    /**
     * Emitter of view
     * @param {?} viewMode
     * @return {?}
     */
    CalendarHeaderComponent.prototype.onSwitchedView = /**
     * Emitter of view
     * @param {?} viewMode
     * @return {?}
     */
    function (viewMode) {
        this.switchedView.emit(viewMode);
    };
    /**
     * Emitter of start date moment
     */
    /**
     * Emitter of start date moment
     * @param {?} start
     * @return {?}
     */
    CalendarHeaderComponent.prototype.onStartChanged = /**
     * Emitter of start date moment
     * @param {?} start
     * @return {?}
     */
    function (start) {
        this.startChanged.emit(start);
    };
    /**
     * return to now on start date
     */
    /**
     * return to now on start date
     * @return {?}
     */
    CalendarHeaderComponent.prototype.goToToday = /**
     * return to now on start date
     * @return {?}
     */
    function () {
        this.start = moment$1();
        this.onStartChanged(this.start);
    };
    /**
     * Check if start is equal to today
     */
    /**
     * Check if start is equal to today
     * @return {?}
     */
    CalendarHeaderComponent.prototype.isToday = /**
     * Check if start is equal to today
     * @return {?}
     */
    function () {
        return moment$1() === moment$1(this.start);
    };
    /**
     * Go to previous day
     */
    /**
     * Go to previous day
     * @return {?}
     */
    CalendarHeaderComponent.prototype.previousDay = /**
     * Go to previous day
     * @return {?}
     */
    function () {
        /** @type {?} */
        var daysNb = 1;
        if (this.viewMode === 'week') {
            daysNb = 7;
        }
        this.start = moment$1(this.start).subtract(daysNb, 'day');
        this.onStartChanged(this.start);
    };
    /**
     * Go to new day
     */
    /**
     * Go to new day
     * @return {?}
     */
    CalendarHeaderComponent.prototype.nextDay = /**
     * Go to new day
     * @return {?}
     */
    function () {
        /** @type {?} */
        var daysNb = 1;
        if (this.viewMode === 'week') {
            daysNb = 7;
        }
        this.start = moment$1(this.start).add(daysNb, 'day');
        this.onStartChanged(this.start);
    };
    CalendarHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-calendar-header',
                    template: "<div fxLayout=\"row wrap\"\n     fxLayoutAlign=\"space-between stretch\"\n     fxLayout.xs=\"column\"\n     fxLayoutAlign.xs=\"start center\"\n     fxLayoutGap.xs=\"10px\">\n\n  <div class=\"left-actions\"\n       fxLayout=\"row\"\n       fxLayoutAlign=\"start stretch\"\n       fxLayoutGap=\"10px\"\n       fxLayout.xs=\"row\"\n       fxLayoutAlign.xs=\"center stretch\"\n       fxLayoutGap.xs=\"10px\">\n    <button class=\"button-actions\"\n            mat-raised-button\n            color=\"primary\"\n            (click)=\"previousDay()\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.cta.previous\">\n      <mat-icon>keyboard_arrow_left</mat-icon>\n    </button>\n    <button class=\"button-actions\"\n            mat-raised-button\n            (click)=\"nextDay()\"\n            color=\"primary\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.cta.next\">\n      <mat-icon>keyboard_arrow_right</mat-icon>\n    </button>\n    <button class=\"button-actions\"\n            [title]=\"headerConfiguration.calendar.back_today\"\n            mat-raised-button\n            color=\"primary\"\n            [disabled]=\"isToday()\"\n            (click)=\"goToToday()\"\n            role=\"button\">\n      <mat-icon>today</mat-icon>\n    </button>\n  </div>\n  <div class=\"right-actions\"\n       fxLayout=\"row wrap\"\n       fxLayoutAlign=\"end stretch\"\n       fxLayoutGap=\"10px\"\n       fxLayout.xs=\"row wrap\"\n       fxLayoutAlign.xs=\"center stretch\"\n       fxLayoutGap.xs=\"10px\">\n    <button class=\"button-actions\"\n            mat-raised-button\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.today\"\n            color=\"primary\"\n            [disabled]=\"true\"\n            [class.hide-on-small-only]=\"end?.format('YYYY-MM-DD') !== start?.format('YYYY-MM-DD')\">\n      <span>{{ start?.format('LL') }}</span>\n      <span *ngIf=\"end?.format('YYYY-MM-DD') !== start?.format('YYYY-MM-DD')\">\n        - {{ end?.format('LL') }}\n      </span>\n    </button>\n    <button class=\"button-actions\"\n            mat-raised-button\n            color=\"primary\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.week\"\n            [class.active]=\"viewMode === 'week'\"\n            (click)=\"switchView('week')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_week</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ headerConfiguration.calendar.week }}</span>\n    </button>\n    <button class=\"button-actions\"\n            mat-raised-button\n            color=\"primary\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.three_days\"\n            [class.active]=\"viewMode === 'three_days'\"\n            (click)=\"switchView('three_days')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_column</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ headerConfiguration.calendar.three_days }}</span>\n    </button>\n    <button class=\"button-actions\"\n            mat-raised-button\n            color=\"primary\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.day\"\n            [class.active]=\"viewMode === 'day'\"\n            (click)=\"switchView('day')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_day</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ headerConfiguration.calendar.day }}</span>\n    </button>\n  </div>\n</div>\n",
                    styles: [".button-actions span{margin-left:5px}"]
                }] }
    ];
    CalendarHeaderComponent.propDecorators = {
        start: [{ type: Input }],
        end: [{ type: Input }],
        switchedView: [{ type: Output }],
        startChanged: [{ type: Output }],
        headerConfiguration: [{ type: Input }],
        viewMode: [{ type: Input }]
    };
    return CalendarHeaderComponent;
}());

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
/** @type {?} */
var moment$2 = moment_;
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(cd) {
        this.cd = cd;
        // Default View Mode of Week Component
        this._viewMode = 'week';
        /**
         * Start day of calendar (could be updated)
         */
        this.start = moment$2();
        /**
         * End day of calendar (could be updated but reewriten on switch week mode
         */
        this.end = moment$2();
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
        return { time: time, mmtTime: CalendarComponent.getMinutesDifference(moment$2(time.toDate()), slotDuration) };
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
            this.calendarStart = moment$2(this.start).startOf('day');
            this.calendarEnd = moment$2(this.end).endOf('day');
            return;
        }
        else if (this.viewMode === 'three_days') {
            this.end = moment$2(this.start).add(2, 'days');
            this.calendarStart = moment$2(this.start).startOf('day');
            this.calendarEnd = moment$2(this.end).endOf('day');
            return;
        }
        // Init first day week number
        /** @type {?} */
        var firstDay = 0;
        // If empty start date then start to today
        if (!this.start) {
            this.start = moment$2();
        }
        this.start = moment$2(this.start).day(firstDay);
        this.end = moment$2(this.start).add(6, 'days');
        this.calendarStart = moment$2(this.start).startOf('day');
        this.calendarEnd = moment$2(this.end).endOf('day');
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
                value: moment$2(date.toDate())
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
        this.sessions.set(moment$2(session.start).format('YYYY-MM-DDHH:mm'), session);
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
        var onlineSessionStart = moment$2(this.onlineSession.date_range.start, 'YYYY-MM-DD').startOf('day');
        /** @type {?} */
        var onlineSessionEnd = moment$2(this.onlineSession.date_range.end, 'YYYY-MM-DD').endOf('day');
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
            var mmtDay = moment$2(day, 'YYYY-MM-DD').hour(8);
            /** @type {?} */
            var mmtDayStartTime = moment$2(day + _this.onlineSession.time_range.start, 'YYYY-MMDDHH:mm');
            // If session start time like 08:00 is before start today 00:00
            if (mmtDayStartTime.isBefore(moment$2().startOf('day'))) {
                return;
            }
            // booking delay
            /** @type {?} */
            var minMmtStartTime = moment$2().add(_this.onlineSession.session_type.booking_delay, 'hours');
            // session time end
            /** @type {?} */
            var mmtDayEndTime = moment$2(day + _this.onlineSession.time_range.end, 'YYYY-MM-DDHH:mm');
            mmtDayEndTime.subtract(duration, 'minutes');
            // slots iterator
            /** @type {?} */
            var timeRange = mmtDayStartTime.twix(mmtDayEndTime).iterate(_this.slotDuration, 'minutes');
            if (_this.calendarStart && _this.calendarEnd && mmtDay.isBetween(onlineSessionStart, onlineSessionEnd)) {
                while (timeRange.hasNext()) {
                    /** @type {?} */
                    var time = timeRange.next();
                    /** @type {?} */
                    var timeMmt = moment$2(time.toDate());
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
        var mmtStart = moment$2(session.start);
        /** @type {?} */
        var mmtEnd = moment$2(session.end);
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
            var mmtTime = CalendarComponent.getMinutesDifference(moment$2(time.toDate()), this.slotDuration);
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
            var mmtTime = CalendarComponent.getMinutesDifference(moment$2(time.toDate()), this.slotDuration);
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
        var mmtStart = moment$2(session.start);
        /** @type {?} */
        var mmtEnd = moment$2(session.end);
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
            var mmtTime = CalendarComponent.getMinutesDifference(moment$2(time.toDate()), this.slotDuration);
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
                var mmtTime = CalendarComponent.getMinutesDifference(moment$2(time.toDate()), this.slotDuration);
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
            var mmtEventStart = moment$2(event.start, 'YYYY-MM-DDHH:mm');
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
        var mmtEventEnd = moment$2(event.end, 'YYYY-MM-DDHH:mm');
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxCalendarModule = /** @class */ (function () {
    function NgxCalendarModule() {
    }
    NgxCalendarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FlexLayoutModule,
                        MatButtonModule,
                        MatIconModule,
                    ],
                    declarations: [
                        CalendarComponent,
                        CalendarHeaderComponent,
                        CalendarBodyComponent,
                    ],
                    exports: [
                        CalendarComponent,
                        CalendarHeaderComponent,
                        CalendarBodyComponent,
                    ]
                },] }
    ];
    return NgxCalendarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Session = /** @class */ (function (_super) {
    __extends(Session, _super);
    function Session() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Session;
}(Event));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxCalendarModule, CalendarComponent, Event, EventType, Session, CalendarBodyComponent as ɵb, CalendarHeaderComponent as ɵa };

//# sourceMappingURL=romainmarecat-ngx-calendar.js.map