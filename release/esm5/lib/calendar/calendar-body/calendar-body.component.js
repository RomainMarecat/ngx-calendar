/**
 * @fileoverview added by tsickle
 * Generated from: lib/calendar/calendar-body/calendar-body.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment_ from 'moment';
import { EventType } from '../../shared/event/event';
import { SessionService } from '../../shared/session/session.service';
/** @type {?} */
var moment = moment_;
var CalendarBodyComponent = /** @class */ (function () {
    function CalendarBodyComponent(sessionService) {
        this.sessionService = sessionService;
        this.sessionAdded = new EventEmitter();
        this.sessionRemoved = new EventEmitter();
        this.startChanged = new EventEmitter();
        this.endChanged = new EventEmitter();
        this.slotLocked = new EventEmitter();
    }
    /**
     * @return {?}
     */
    CalendarBodyComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.sessionService.sessions
            .subscribe((/**
         * @param {?} sessions
         * @return {?}
         */
        function (sessions) {
            _this.sessions = sessions;
        }));
    };
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
            if (session.comment) {
                return session.comment;
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
        if (!this.isDateTimeInSessionsFromCurrentUser(day, time)) {
            /** @type {?} */
            var mmtStart = moment(datetime, 'YYYY-MM-DDHH:mm');
            /** @type {?} */
            var mmtEnd = mmtStart.clone().add(this.onlineSession.duration, 'minutes');
            this.addSession(mmtStart, mmtEnd);
            return;
        }
        if (this.sessions.has(datetime)) {
            /** @type {?} */
            var session = this.sessions.get(datetime);
            /** @type {?} */
            var source = { key: datetime, session: session };
            this.removeSession(source);
            return;
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
        // To prevent a stringify Date without good timezone
        Date.prototype.toJSON = (/**
         * @return {?}
         */
        function () {
            return moment(this).format();
        });
        // Create session
        /** @type {?} */
        var session = {
            id: null,
            start: start.toDate(),
            end: end.toDate(),
            pause: this.onlineSession.pause || 0,
            duration: this.onlineSession.duration,
            nb_persons: 1,
            event_type: EventType.session,
            comment: this.bodyConfiguration.calendar.session.info,
            user: this.user,
            customers: [this.customer]
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
    CalendarBodyComponent.prototype.isDateTimeInSessionsFromCurrentUser = /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    function (day, time) {
        /** @type {?} */
        var datetime = day.value.format('YYYY-MM-DD') + time;
        /** @type {?} */
        var session = this.sessions.get(datetime);
        return this.sessions &&
            this.sessions.has(datetime) &&
            this.sessionsSlots.has(datetime) &&
            this.sessionsSlots.has(moment(session.end).format('YYYY-MM-DDHH:mm')) &&
            this.sessionsStartSlots.has(datetime) &&
            this.sessionsEndSlots.has(moment(session.end).format('YYYY-MM-DDHH:mm'));
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
        return this.sessionsSlots &&
            this.sessionsSlots.has(datetime) &&
            this.sessionsStartSlots.has(datetime);
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
        /** @type {?} */
        var session = this.sessions.get(datetime);
        return (this.sessionsSlots &&
            this.sessionsSlots.has(datetime) &&
            this.sessionsEndSlots.has(datetime)) ||
            (this.sessionsStartSlots.has(datetime) &&
                session &&
                this.sessionsEndSlots.has(moment(session.end).format('YYYY-MM-DDHH:mm')));
    };
    CalendarBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-calendar-body',
                    template: "<div class=\"calendar-body-wrapper\">\n  <table class=\"calendar-body-table-wrapper table table-bordered\">\n    <thead class=\"calendar-body-table-head\">\n    <tr class=\"calendar-body-head-day-row\"\n        *ngIf=\"viewMode !== 'day'\">\n      <th class=\"calendar-body-day-header text-center\"\n          *ngFor=\"let day of days\">\n        <span class=\"truncate\">{{ day.title }}</span>\n      </th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr class=\"calendar-body-row\">\n      <td class=\"calendar-body-column-content text-center\"\n          [attr.id]=\"day.key\"\n          *ngFor=\"let day of days; let keyDay = index\">\n        <div class=\"time-slot\"\n             [class.busy]=\"isSlotBusy(day, time)\"\n             [class.early]=\"isSlotEarly(day, time)\"\n             [class.session]=\"isSlotInSession(day, time)\"\n             [class.session-start]=\"isSlotSessionStart(day, time)\"\n             [class.session-end]=\"isSlotSessionEnd(day, time)\"\n             *ngFor=\"let time of getAvailabilities(day.key)\">\n          <div class=\"time-content\">\n            <button type=\"button\"\n                    class=\"slot-available\"\n                    (click)=\"onTimeSlotClicked(day, time)\"\n                    *ngIf=\"!isDateTimeInSessionsFromCurrentUser(day, time); else sessionTitle\">\n              <span class=\"default-time\">{{ time }}</span>\n            </button>\n            <ng-template #sessionTitle>\n              <button type=\"button\"\n                      class=\"slot-session\">\n                {{ getSessionTitle(day, time)}}\n              </button>\n            </ng-template>\n            <a class=\"link-close\" (click)=\"onTimeSlotClicked(day, time)\">\n              <mat-icon class=\"icon-close\"\n                        *ngIf=\"isDateTimeInSessionsFromCurrentUser(day, time)\">\n                close\n              </mat-icon>\n            </a>\n          </div>\n          <div class=\"slot-busy\"\n               *ngIf=\"getAvailabilities(day.key).length <= 0 || isDayBusy(day, time)\">\n            <span>{{bodyConfiguration.calendar.availability.empty}}</span>\n          </div>\n        </div>\n        <div class=\"next-slot\"\n             *ngIf=\"isAllSlotNotAvailable() && keyDay === days.length-1\">\n          <button type=\"button\"\n                  role=\"button\"\n                  [title]=\"bodyConfiguration.calendar.availability.slot\"\n                  (click)=\"onNextDay()\">\n            <span>{{ bodyConfiguration.calendar.availability.slot }}</span>\n            <mat-icon>keyboard_arrow_right</mat-icon>\n          </button>\n        </div>\n      </td>\n    </tr>\n    </tbody>\n  </table>\n</div>\n",
                    styles: [".calendar-body-wrapper .calendar-body-column-content{max-width:240px}.calendar-body-wrapper .calendar-body-column-content .time-slot{padding:5px}.calendar-body-wrapper .calendar-body-column-content .time-slot button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);font-family:Lato,Roboto,sans-serif;font-size:14px;font-weight:500}.calendar-body-wrapper .calendar-body-column-content .time-slot button.slot-available{cursor:pointer;width:120px}.calendar-body-wrapper .calendar-body-column-content .time-slot:hover button.slot-available{background-color:#006400;color:#fff}.calendar-body-wrapper .calendar-body-column-content .time-slot.busy{display:none}.calendar-body-wrapper .calendar-body-column-content .time-slot.busy button.slot-available{color:#8b0000;cursor:not-allowed}.calendar-body-wrapper .calendar-body-column-content .time-slot.early button.slot-available{cursor:not-allowed;color:orange}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content{position:relative;padding:0}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .slot-session{width:120px;background-color:#ff8c00}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close .icon-close{position:absolute;right:11px;top:4px;font-size:14px}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close,.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close:hover{cursor:pointer}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-start{border-top-left-radius:3px;border-top-right-radius:3px}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-start .slot-session{color:#000;cursor:text}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-end{border-bottom-left-radius:3px;border-bottom-right-radius:3px}"]
                }] }
    ];
    /** @nocollapse */
    CalendarBodyComponent.ctorParameters = function () { return [
        { type: SessionService }
    ]; };
    CalendarBodyComponent.propDecorators = {
        user: [{ type: Input }],
        customer: [{ type: Input }],
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
        sessionsStartSlots: [{ type: Input }],
        bodyConfiguration: [{ type: Input }],
        sessionAdded: [{ type: Output }],
        sessionRemoved: [{ type: Output }],
        startChanged: [{ type: Output }],
        endChanged: [{ type: Output }],
        slotLocked: [{ type: Output }]
    };
    return CalendarBodyComponent;
}());
export { CalendarBodyComponent };
if (false) {
    /**
     * User could be passed to show session owner
     * @type {?}
     */
    CalendarBodyComponent.prototype.user;
    /**
     * Customer could be passed to generate a personal calendar
     * @type {?}
     */
    CalendarBodyComponent.prototype.customer;
    /**
     * current online session
     * @type {?}
     */
    CalendarBodyComponent.prototype.onlineSession;
    /**
     * View mode input
     * @type {?}
     */
    CalendarBodyComponent.prototype.viewMode;
    /**
     * Start day week
     * @type {?}
     */
    CalendarBodyComponent.prototype.start;
    /**
     * End day week
     * @type {?}
     */
    CalendarBodyComponent.prototype.end;
    /**
     * Day of curretn week
     * @type {?}
     */
    CalendarBodyComponent.prototype.days;
    /** @type {?} */
    CalendarBodyComponent.prototype.daysAvailability;
    /** @type {?} */
    CalendarBodyComponent.prototype.daysBusySlotNumber;
    /** @type {?} */
    CalendarBodyComponent.prototype.daysAvailabilitySlotNumber;
    /** @type {?} */
    CalendarBodyComponent.prototype.busySlots;
    /** @type {?} */
    CalendarBodyComponent.prototype.earlySlots;
    /** @type {?} */
    CalendarBodyComponent.prototype.pauseSlots;
    /** @type {?} */
    CalendarBodyComponent.prototype.sessionsSlots;
    /** @type {?} */
    CalendarBodyComponent.prototype.sessionsEndSlots;
    /** @type {?} */
    CalendarBodyComponent.prototype.sessionsStartSlots;
    /** @type {?} */
    CalendarBodyComponent.prototype.sessions;
    /**
     * Configuration body
     * @type {?}
     */
    CalendarBodyComponent.prototype.bodyConfiguration;
    /** @type {?} */
    CalendarBodyComponent.prototype.sessionAdded;
    /** @type {?} */
    CalendarBodyComponent.prototype.sessionRemoved;
    /** @type {?} */
    CalendarBodyComponent.prototype.startChanged;
    /** @type {?} */
    CalendarBodyComponent.prototype.endChanged;
    /** @type {?} */
    CalendarBodyComponent.prototype.slotLocked;
    /**
     * @type {?}
     * @private
     */
    CalendarBodyComponent.prototype.sessionService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm9tYWlubWFyZWNhdC9uZ3gtY2FsZW5kYXIvIiwic291cmNlcyI6WyJsaWIvY2FsZW5kYXIvY2FsZW5kYXItYm9keS9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFJbEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7SUFFaEUsTUFBTSxHQUFHLE9BQU87QUFFdEI7SUF5REUsK0JBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVB4QyxpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ2xFLG1CQUFjLEdBQ3BCLElBQUksWUFBWSxFQUFtQyxDQUFDO1FBQzlDLGlCQUFZLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDaEUsZUFBVSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzlELGVBQVUsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUcxRSxDQUFDOzs7O0lBRUQsd0NBQVE7OztJQUFSO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVE7YUFDekIsU0FBUzs7OztRQUFDLFVBQUMsUUFBUTtZQUNsQixLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMzQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCx5Q0FBUzs7OztJQUFUOztZQUNNLE1BQU0sR0FBRyxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxL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Ozs7dUJBYXBCLEtBQUs7MkJBSUwsS0FBSztnQ0FJTCxLQUFLOzJCQUlMLEtBQUs7d0JBSUwsS0FBSztzQkFJTCxLQUFLO3VCQUlMLEtBQUs7bUNBRUwsS0FBSztxQ0FDTCxLQUFLOzZDQUNMLEtBQUs7NEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzZCQUNMLEtBQUs7Z0NBQ0wsS0FBSzttQ0FDTCxLQUFLO3FDQUNMLEtBQUs7b0NBS0wsS0FBSzsrQkFFTCxNQUFNO2lDQUNOLE1BQU07K0JBRU4sTUFBTTs2QkFDTixNQUFNOzZCQUNOLE1BQU07O0lBd0xULDRCQUFDO0NBQUEsQUEvT0QsSUErT0M7U0ExT1kscUJBQXFCOzs7Ozs7SUFJaEMscUNBQW1COzs7OztJQUluQix5Q0FBdUI7Ozs7O0lBSXZCLDhDQUFzQzs7Ozs7SUFJdEMseUNBQTBCOzs7OztJQUkxQixzQ0FBdUI7Ozs7O0lBSXZCLG9DQUFxQjs7Ozs7SUFJckIscUNBQTBCOztJQUUxQixpREFBaUQ7O0lBQ2pELG1EQUFpRDs7SUFDakQsMkRBQXlEOztJQUN6RCwwQ0FBZ0M7O0lBQ2hDLDJDQUFpQzs7SUFDakMsMkNBQWlDOztJQUNqQyw4Q0FBb0M7O0lBQ3BDLGlEQUF1Qzs7SUFDdkMsbURBQXlDOztJQUN6Qyx5Q0FBK0I7Ozs7O0lBSS9CLGtEQUFrRDs7SUFFbEQsNkNBQTRFOztJQUM1RSwrQ0FDd0Q7O0lBQ3hELDZDQUEwRTs7SUFDMUUsMkNBQXdFOztJQUN4RSwyQ0FBMEU7Ozs7O0lBRTlELCtDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlndXJhdGlvbi9jYWxlbmRhci1jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IERheSB9IGZyb20gJy4uLy4uL3NoYXJlZC9kYXkvZGF5JztcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9ldmVudC9ldmVudCc7XG5pbXBvcnQgeyBPbmxpbmVTZXNzaW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3Nlc3Npb24vb25saW5lLXNlc3Npb24nO1xuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXNzaW9uL3Nlc3Npb24nO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItY2FsZW5kYXItYm9keScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQm9keUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKlxuICAgKiBVc2VyIGNvdWxkIGJlIHBhc3NlZCB0byBzaG93IHNlc3Npb24gb3duZXJcbiAgICovXG4gIEBJbnB1dCgpIHVzZXI6IGFueTtcbiAgLyoqXG4gICAqIEN1c3RvbWVyIGNvdWxkIGJlIHBhc3NlZCB0byBnZW5lcmF0ZSBhIHBlcnNvbmFsIGNhbGVuZGFyXG4gICAqL1xuICBASW5wdXQoKSBjdXN0b21lcjogYW55O1xuICAvKipcbiAgICogY3VycmVudCBvbmxpbmUgc2Vzc2lvblxuICAgKi9cbiAgQElucHV0KCkgb25saW5lU2Vzc2lvbjogT25saW5lU2Vzc2lvbjtcbiAgLyoqXG4gICAqIFZpZXcgbW9kZSBpbnB1dFxuICAgKi9cbiAgQElucHV0KCkgdmlld01vZGU6IHN0cmluZztcbiAgLyoqXG4gICAqIFN0YXJ0IGRheSB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSBzdGFydDogTW9tZW50O1xuICAvKipcbiAgICogRW5kIGRheSB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSBlbmQ6IE1vbWVudDtcbiAgLyoqXG4gICAqIERheSBvZiBjdXJyZXRuIHdlZWtcbiAgICovXG4gIEBJbnB1dCgpIGRheXM6IEFycmF5PERheT47XG5cbiAgQElucHV0KCkgZGF5c0F2YWlsYWJpbGl0eTogTWFwPHN0cmluZywgc3RyaW5nW10+O1xuICBASW5wdXQoKSBkYXlzQnVzeVNsb3ROdW1iZXI6IE1hcDxzdHJpbmcsIG51bWJlcj47XG4gIEBJbnB1dCgpIGRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyOiBNYXA8c3RyaW5nLCBudW1iZXI+O1xuICBASW5wdXQoKSBidXN5U2xvdHM6IFNldDxzdHJpbmc+O1xuICBASW5wdXQoKSBlYXJseVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgQElucHV0KCkgcGF1c2VTbG90czogU2V0PHN0cmluZz47XG4gIEBJbnB1dCgpIHNlc3Npb25zU2xvdHM6IFNldDxzdHJpbmc+O1xuICBASW5wdXQoKSBzZXNzaW9uc0VuZFNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgQElucHV0KCkgc2Vzc2lvbnNTdGFydFNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgc2Vzc2lvbnM6IE1hcDxzdHJpbmcsIFNlc3Npb24+O1xuICAvKipcbiAgICogQ29uZmlndXJhdGlvbiBib2R5XG4gICAqL1xuICBASW5wdXQoKSBib2R5Q29uZmlndXJhdGlvbjogQ2FsZW5kYXJDb25maWd1cmF0aW9uO1xuXG4gIEBPdXRwdXQoKSBzZXNzaW9uQWRkZWQ6IEV2ZW50RW1pdHRlcjxTZXNzaW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4oKTtcbiAgQE91dHB1dCgpIHNlc3Npb25SZW1vdmVkOiBFdmVudEVtaXR0ZXI8e2tleTogc3RyaW5nLCBzZXNzaW9uOiBTZXNzaW9ufT5cbiAgICA9IG5ldyBFdmVudEVtaXR0ZXI8e2tleTogc3RyaW5nLCBzZXNzaW9uOiBTZXNzaW9ufT4oKTtcbiAgQE91dHB1dCgpIHN0YXJ0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPE1vbWVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vbWVudD4oKTtcbiAgQE91dHB1dCgpIGVuZENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxNb21lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb21lbnQ+KCk7XG4gIEBPdXRwdXQoKSBzbG90TG9ja2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2Vzc2lvblNlcnZpY2Uuc2Vzc2lvbnNcbiAgICAgIC5zdWJzY3JpYmUoKHNlc3Npb25zKSA9PiB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnMgPSBzZXNzaW9ucztcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIGNsaWNrIG5leHQgZGF5IGJ1dHRvbiwgdHJpZ2dlciBzd2l0Y2ggc3RhcnRcbiAgICovXG4gIG9uTmV4dERheSgpIHtcbiAgICBsZXQgZGF5c05iID0gMTtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3dlZWsnKSB7XG4gICAgICBkYXlzTmIgPSA3O1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLmFkZChkYXlzTmIsICdkYXknKTtcbiAgICB0aGlzLnN0YXJ0Q2hhbmdlZC5lbWl0KHRoaXMuc3RhcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIGFsbCBzbG90IGlzIG5vdCBhdmFsYWlibGVzIGFsbCBhbGwgZGF5c1xuICAgKi9cbiAgaXNBbGxTbG90Tm90QXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmRheXMgJiYgdGhpcy5kYXlzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmRheXMuZmlsdGVyKChkYXkpID0+IHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5nZXQoZGF5LmtleSkubGVuZ3RoID4gMCkubGVuZ3RoID09PSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBbGwgQXZhaWxhYmlsaXRpZXMgYnkga2V5OiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcsIHZhbHVlOiBNb21lbnRcbiAgICovXG4gIGdldEF2YWlsYWJpbGl0aWVzKGRheTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZ2V0KGRheSk7XG4gIH1cblxuICBnZXRTZXNzaW9uVGl0bGUoZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICBpZiAodGhpcy5zZXNzaW9ucyAmJiB0aGlzLnNlc3Npb25zLmhhcyhkYXRldGltZSkpIHtcbiAgICAgIGNvbnN0IHNlc3Npb246IFNlc3Npb24gPSB0aGlzLnNlc3Npb25zLmdldChkYXRldGltZSk7XG4gICAgICByZXR1cm4gbW9tZW50KHNlc3Npb24uc3RhcnQpLmZvcm1hdCgnSEg6bW0nKSArICcgLSAnICsgbW9tZW50KHNlc3Npb24uZW5kKS5mb3JtYXQoJ0hIOm1tJyk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGdldFNlc3Npb25Ub29sdGlwKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuICAgIGlmICh0aGlzLnNlc3Npb25zICYmIHRoaXMuc2Vzc2lvbnMuaGFzKGRhdGV0aW1lKSkge1xuICAgICAgY29uc3Qgc2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbnMuZ2V0KGRhdGV0aW1lKTtcbiAgICAgIGlmIChzZXNzaW9uLmNvbW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHNlc3Npb24uY29tbWVudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBvblRpbWVTbG90Q2xpY2tlZChkYXk6IERheSwgdGltZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICBpZiAodGhpcy5pc1Nsb3RCdXN5KGRheSwgdGltZSkgfHwgdGhpcy5pc1Nsb3RFYXJseShkYXksIHRpbWUpKSB7XG4gICAgICB0aGlzLnNsb3RMb2NrZWQuZW1pdCh0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaXNEYXRlVGltZUluU2Vzc2lvbnNGcm9tQ3VycmVudFVzZXIoZGF5LCB0aW1lKSkge1xuICAgICAgY29uc3QgbW10U3RhcnQgPSBtb21lbnQoZGF0ZXRpbWUsICdZWVlZLU1NLURESEg6bW0nKTtcbiAgICAgIGNvbnN0IG1tdEVuZCA9IG1tdFN0YXJ0LmNsb25lKCkuYWRkKHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICAgIHRoaXMuYWRkU2Vzc2lvbihtbXRTdGFydCwgbW10RW5kKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZXNzaW9ucy5oYXMoZGF0ZXRpbWUpKSB7XG4gICAgICBjb25zdCBzZXNzaW9uID0gdGhpcy5zZXNzaW9ucy5nZXQoZGF0ZXRpbWUpO1xuICAgICAgY29uc3Qgc291cmNlID0ge2tleTogZGF0ZXRpbWUsIHNlc3Npb259O1xuICAgICAgdGhpcy5yZW1vdmVTZXNzaW9uKHNvdXJjZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgYWRkU2Vzc2lvbihzdGFydDogTW9tZW50LCBlbmQ6IE1vbWVudCkge1xuXG4gICAgLy8gVG8gcHJldmVudCBhIHN0cmluZ2lmeSBEYXRlIHdpdGhvdXQgZ29vZCB0aW1lem9uZVxuICAgIERhdGUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBtb21lbnQodGhpcykuZm9ybWF0KCk7XG4gICAgfTtcblxuICAgIC8vIENyZWF0ZSBzZXNzaW9uXG4gICAgY29uc3Qgc2Vzc2lvbjogU2Vzc2lvbiA9IHtcbiAgICAgIGlkOiBudWxsLFxuICAgICAgc3RhcnQ6IHN0YXJ0LnRvRGF0ZSgpLFxuICAgICAgZW5kOiBlbmQudG9EYXRlKCksXG4gICAgICBwYXVzZTogdGhpcy5vbmxpbmVTZXNzaW9uLnBhdXNlIHx8IDAsXG4gICAgICBkdXJhdGlvbjogdGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uLFxuICAgICAgbmJfcGVyc29uczogMSxcbiAgICAgIGV2ZW50X3R5cGU6IEV2ZW50VHlwZS5zZXNzaW9uLFxuICAgICAgY29tbWVudDogdGhpcy5ib2R5Q29uZmlndXJhdGlvbi5jYWxlbmRhci5zZXNzaW9uLmluZm8sXG4gICAgICB1c2VyOiB0aGlzLnVzZXIsXG4gICAgICBjdXN0b21lcnM6IFt0aGlzLmN1c3RvbWVyXVxuICAgIH07XG4gICAgdGhpcy5zZXNzaW9uQWRkZWQuZW1pdChzZXNzaW9uKTtcbiAgfVxuXG4gIHJlbW92ZVNlc3Npb24oc291cmNlOiB7a2V5OiBzdHJpbmcsIHNlc3Npb246IFNlc3Npb259KSB7XG4gICAgdGhpcy5zZXNzaW9uUmVtb3ZlZC5lbWl0KHNvdXJjZSk7XG4gIH1cblxuICAvKipcbiAgICogSWYgZGF5IGlzIGJ1c3kgKG9jY3Vww6kpIGJ5IGN1cnJlbnQga2V5IHN0cmluZ1xuICAgKi9cbiAgaXNEYXlCdXN5KGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIHJldHVybiB0aGlzLmRheXNCdXN5U2xvdE51bWJlciAmJiB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyXG4gICAgICAmJiB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5oYXMoZGF0ZXRpbWUpICYmIHRoaXMuZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXIuaGFzKGRhdGV0aW1lKVxuICAgICAgJiYgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuZ2V0KGRhdGV0aW1lKSA+PSB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyLmdldChkYXRldGltZSk7XG4gIH1cblxuICAvKipcbiAgICogSWYgc2xvdCBpcyBidXN5IGJ5IGRhdGVcbiAgICovXG4gIGlzU2xvdEJ1c3koZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuYnVzeVNsb3RzICYmIHRoaXMuYnVzeVNsb3RzLmhhcyhkYXRldGltZSk7XG4gIH1cblxuICAvKipcbiAgICogaWYgc2xvdCBpcyBvbiBwcmV2aW91cyAoZGF0ZSBwbHVzIHTDtHQpXG4gICAqL1xuICBpc1Nsb3RFYXJseShkYXk6IERheSwgdGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICByZXR1cm4gKHRoaXMuZWFybHlTbG90cyAmJiB0aGlzLmVhcmx5U2xvdHMuaGFzKGRhdGV0aW1lKSlcbiAgICAgIHx8ICh0aGlzLnBhdXNlU2xvdHMgJiYgdGhpcy5wYXVzZVNsb3RzLmhhcyhkYXRldGltZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGlzIFNsb3QgaW4gY3VycmVudCBhY3Rpdml0aWVzXG4gICAqL1xuICBpc1Nsb3RJblNlc3Npb24oZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbnNTbG90cyAmJiB0aGlzLnNlc3Npb25zU2xvdHMuaGFzKGRhdGV0aW1lKTtcbiAgfVxuXG4gIGlzRGF0ZVRpbWVJblNlc3Npb25zRnJvbUN1cnJlbnRVc2VyKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIGNvbnN0IHNlc3Npb24gPSB0aGlzLnNlc3Npb25zLmdldChkYXRldGltZSk7XG5cbiAgICByZXR1cm4gdGhpcy5zZXNzaW9ucyAmJlxuICAgICAgdGhpcy5zZXNzaW9ucy5oYXMoZGF0ZXRpbWUpICYmXG4gICAgICB0aGlzLnNlc3Npb25zU2xvdHMuaGFzKGRhdGV0aW1lKSAmJlxuICAgICAgdGhpcy5zZXNzaW9uc1Nsb3RzLmhhcyhtb21lbnQoc2Vzc2lvbi5lbmQpLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpICYmXG4gICAgICB0aGlzLnNlc3Npb25zU3RhcnRTbG90cy5oYXMoZGF0ZXRpbWUpICYmXG4gICAgICB0aGlzLnNlc3Npb25zRW5kU2xvdHMuaGFzKG1vbWVudChzZXNzaW9uLmVuZCkuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSk7XG4gIH1cblxuICBpc1Nsb3RTZXNzaW9uU3RhcnQoZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbnNTbG90cyAmJlxuICAgICAgdGhpcy5zZXNzaW9uc1Nsb3RzLmhhcyhkYXRldGltZSkgJiZcbiAgICAgIHRoaXMuc2Vzc2lvbnNTdGFydFNsb3RzLmhhcyhkYXRldGltZSk7XG4gIH1cblxuICBpc1Nsb3RTZXNzaW9uRW5kKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIGNvbnN0IHNlc3Npb24gPSB0aGlzLnNlc3Npb25zLmdldChkYXRldGltZSk7XG5cbiAgICByZXR1cm4gKHRoaXMuc2Vzc2lvbnNTbG90cyAmJlxuICAgICAgdGhpcy5zZXNzaW9uc1Nsb3RzLmhhcyhkYXRldGltZSkgJiZcbiAgICAgIHRoaXMuc2Vzc2lvbnNFbmRTbG90cy5oYXMoZGF0ZXRpbWUpKSB8fFxuICAgICAgKHRoaXMuc2Vzc2lvbnNTdGFydFNsb3RzLmhhcyhkYXRldGltZSkgJiZcbiAgICAgICAgc2Vzc2lvbiAmJlxuICAgICAgICB0aGlzLnNlc3Npb25zRW5kU2xvdHMuaGFzKG1vbWVudChzZXNzaW9uLmVuZCkuZm9ybWF0KCdZWVlZLU1NLURESEg6bW0nKSkpO1xuICB9XG59XG4iXX0=