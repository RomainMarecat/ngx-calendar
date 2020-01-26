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
        if (!this.isDateTimeInSessionsFromCurrentUser(day, time) && !this.isSlotInSession(day, time)) {
            /** @type {?} */
            var mmtStart = moment(datetime, 'YYYY-MM-DDHH:mm');
            /** @type {?} */
            var mmtEnd = mmtStart.clone().add(this.onlineSession.duration, 'minutes');
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
                    template: "<div class=\"calendar-body-wrapper\">\n  <table class=\"calendar-body-table-wrapper table table-bordered\">\n    <thead class=\"calendar-body-table-head\">\n    <tr class=\"calendar-body-head-day-row\"\n        *ngIf=\"viewMode !== 'day'\">\n      <th class=\"calendar-body-day-header text-center\"\n          *ngFor=\"let day of days\">\n        <span class=\"truncate\">{{ day.title }}</span>\n      </th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr class=\"calendar-body-row\">\n      <td class=\"calendar-body-column-content text-center\"\n          [attr.id]=\"day.key\"\n          *ngFor=\"let day of days; let keyDay = index\">\n        <div class=\"time-slot\"\n             [class.busy]=\"isSlotBusy(day, time)\"\n             [class.early]=\"isSlotEarly(day, time)\"\n             [class.session]=\"isSlotInSession(day, time)\"\n             [class.session-start]=\"isDateTimeInSessionsFromCurrentUser(day, time)\"\n             [class.session-end]=\"isSlotSessionEnd(day, time)\"\n             *ngFor=\"let time of getAvailabilities(day.key)\">\n          <div class=\"time-content\">\n            <button type=\"button\"\n                    class=\"slot-available\"\n                    (click)=\"onTimeSlotClicked(day, time)\"\n                    *ngIf=\"!isDateTimeInSessionsFromCurrentUser(day, time); else sessionTitle\">\n              <span class=\"default-time\">{{ time }}</span>\n            </button>\n            <ng-template #sessionTitle>\n              <button type=\"button\"\n                      class=\"slot-session\">\n                {{ getSessionTitle(day, time)}}\n              </button>\n            </ng-template>\n            <a class=\"link-close\" (click)=\"onTimeSlotClicked(day, time)\">\n              <mat-icon class=\"icon-close\"\n                        *ngIf=\"isDateTimeInSessionsFromCurrentUser(day, time)\">\n                close\n              </mat-icon>\n            </a>\n          </div>\n          <div class=\"slot-busy\"\n               *ngIf=\"getAvailabilities(day.key).length <= 0 || isDayBusy(day, time)\">\n            <span>{{bodyConfiguration.calendar.availability.empty}}</span>\n          </div>\n        </div>\n        <div class=\"next-slot\"\n             *ngIf=\"isAllSlotNotAvailable() && keyDay === days.length-1\">\n          <button type=\"button\"\n                  role=\"button\"\n                  [title]=\"bodyConfiguration.calendar.availability.slot\"\n                  (click)=\"onNextDay()\">\n            <span>{{ bodyConfiguration.calendar.availability.slot }}</span>\n            <mat-icon>keyboard_arrow_right</mat-icon>\n          </button>\n        </div>\n      </td>\n    </tr>\n    </tbody>\n  </table>\n</div>\n",
                    styles: [".calendar-body-wrapper .calendar-body-column-content{max-width:240px}.calendar-body-wrapper .calendar-body-column-content .time-slot{padding:5px}.calendar-body-wrapper .calendar-body-column-content .time-slot button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);font-family:Lato,Roboto,sans-serif;font-size:14px;font-weight:500}.calendar-body-wrapper .calendar-body-column-content .time-slot button.slot-available{cursor:pointer;width:120px}.calendar-body-wrapper .calendar-body-column-content .time-slot:hover button.slot-available{background-color:#006400;color:#fff}.calendar-body-wrapper .calendar-body-column-content .time-slot.busy{display:none}.calendar-body-wrapper .calendar-body-column-content .time-slot.busy button.slot-available{color:#8b0000;cursor:not-allowed}.calendar-body-wrapper .calendar-body-column-content .time-slot.early button.slot-available{cursor:not-allowed;color:orange}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content{position:relative;padding:5px 5px 5px 0}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .slot-session{width:120px;background-color:#ff8c00}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close .icon-close{position:absolute;right:5px;top:6px;font-size:14px}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close,.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close:hover{cursor:pointer}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-start{border-top-left-radius:3px;border-top-right-radius:3px}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-start .slot-session{color:#000;cursor:text}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-end{border-bottom-left-radius:3px;border-bottom-right-radius:3px}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm9tYWlubWFyZWNhdC9uZ3gtY2FsZW5kYXIvIiwic291cmNlcyI6WyJsaWIvY2FsZW5kYXIvY2FsZW5kYXItYm9keS9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFJbEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7SUFFaEUsTUFBTSxHQUFHLE9BQU87QUFFdEI7SUF3REUsK0JBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVB4QyxpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ2xFLG1CQUFjLEdBQ3BCLElBQUksWUFBWSxFQUFtQyxDQUFDO1FBQzlDLGlCQUFZLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDaEUsZUFBVSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzlELGVBQVUsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUcxRSxDQUFDOzs7O0lBRUQsd0NBQVE7OztJQUFSO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVE7YUFDekIsU0FBUzs7OztRQUFDLFVBQUMsUUFBUTtZQUNsQixLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMzQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCx5Q0FBUzs7OztJQUFUOztZQUNNLE1BQU0sR0FBRyxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxL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QUFFLG1CQUFtQjtvQkFDN0Isd3FGQUE2Qzs7aUJBRTlDOzs7O2dCQVJRLGNBQWM7Ozt1QkFhcEIsS0FBSzsyQkFJTCxLQUFLO2dDQUlMLEtBQUs7MkJBSUwsS0FBSzt3QkFJTCxLQUFLO3NCQUlMLEtBQUs7dUJBSUwsS0FBSzttQ0FFTCxLQUFLO3FDQUNMLEtBQUs7NkNBQ0wsS0FBSzs0QkFDTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSztnQ0FDTCxLQUFLO21DQUNMLEtBQUs7b0NBS0wsS0FBSzsrQkFFTCxNQUFNO2lDQUNOLE1BQU07K0JBRU4sTUFBTTs2QkFDTixNQUFNOzZCQUNOLE1BQU07O0lBOEpULDRCQUFDO0NBQUEsQUFwTkQsSUFvTkM7U0EvTVkscUJBQXFCOzs7Ozs7SUFJaEMscUNBQW1COzs7OztJQUluQix5Q0FBdUI7Ozs7O0lBSXZCLDhDQUFzQzs7Ozs7SUFJdEMseUNBQTBCOzs7OztJQUkxQixzQ0FBdUI7Ozs7O0lBSXZCLG9DQUFxQjs7Ozs7SUFJckIscUNBQTBCOztJQUUxQixpREFBaUQ7O0lBQ2pELG1EQUFpRDs7SUFDakQsMkRBQXlEOztJQUN6RCwwQ0FBZ0M7O0lBQ2hDLDJDQUFpQzs7SUFDakMsMkNBQWlDOztJQUNqQyw4Q0FBb0M7O0lBQ3BDLGlEQUF1Qzs7SUFDdkMseUNBQStCOzs7OztJQUkvQixrREFBa0Q7O0lBRWxELDZDQUE0RTs7SUFDNUUsK0NBQ3dEOztJQUN4RCw2Q0FBMEU7O0lBQzFFLDJDQUF3RTs7SUFDeEUsMkNBQTBFOzs7OztJQUU5RCwrQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbmZpZ3VyYXRpb24vY2FsZW5kYXItY29uZmlndXJhdGlvbic7XG5pbXBvcnQgeyBEYXkgfSBmcm9tICcuLi8uLi9zaGFyZWQvZGF5L2RheSc7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvZXZlbnQvZXZlbnQnO1xuaW1wb3J0IHsgT25saW5lU2Vzc2lvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXNzaW9uL29ubGluZS1zZXNzaW9uJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvc2Vzc2lvbi9zZXNzaW9uJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWNhbGVuZGFyLWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLWJvZHkuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckJvZHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKipcbiAgICogVXNlciBjb3VsZCBiZSBwYXNzZWQgdG8gc2hvdyBzZXNzaW9uIG93bmVyXG4gICAqL1xuICBASW5wdXQoKSB1c2VyOiBhbnk7XG4gIC8qKlxuICAgKiBDdXN0b21lciBjb3VsZCBiZSBwYXNzZWQgdG8gZ2VuZXJhdGUgYSBwZXJzb25hbCBjYWxlbmRhclxuICAgKi9cbiAgQElucHV0KCkgY3VzdG9tZXI6IGFueTtcbiAgLyoqXG4gICAqIGN1cnJlbnQgb25saW5lIHNlc3Npb25cbiAgICovXG4gIEBJbnB1dCgpIG9ubGluZVNlc3Npb246IE9ubGluZVNlc3Npb247XG4gIC8qKlxuICAgKiBWaWV3IG1vZGUgaW5wdXRcbiAgICovXG4gIEBJbnB1dCgpIHZpZXdNb2RlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTdGFydCBkYXkgd2Vla1xuICAgKi9cbiAgQElucHV0KCkgc3RhcnQ6IE1vbWVudDtcbiAgLyoqXG4gICAqIEVuZCBkYXkgd2Vla1xuICAgKi9cbiAgQElucHV0KCkgZW5kOiBNb21lbnQ7XG4gIC8qKlxuICAgKiBEYXkgb2YgY3VycmV0biB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSBkYXlzOiBBcnJheTxEYXk+O1xuXG4gIEBJbnB1dCgpIGRheXNBdmFpbGFiaWxpdHk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcbiAgQElucHV0KCkgZGF5c0J1c3lTbG90TnVtYmVyOiBNYXA8c3RyaW5nLCBudW1iZXI+O1xuICBASW5wdXQoKSBkYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlcjogTWFwPHN0cmluZywgbnVtYmVyPjtcbiAgQElucHV0KCkgYnVzeVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgQElucHV0KCkgZWFybHlTbG90czogU2V0PHN0cmluZz47XG4gIEBJbnB1dCgpIHBhdXNlU2xvdHM6IFNldDxzdHJpbmc+O1xuICBASW5wdXQoKSBzZXNzaW9uc1Nsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgQElucHV0KCkgc2Vzc2lvbnNFbmRTbG90czogU2V0PHN0cmluZz47XG4gIHNlc3Npb25zOiBNYXA8c3RyaW5nLCBTZXNzaW9uPjtcbiAgLyoqXG4gICAqIENvbmZpZ3VyYXRpb24gYm9keVxuICAgKi9cbiAgQElucHV0KCkgYm9keUNvbmZpZ3VyYXRpb246IENhbGVuZGFyQ29uZmlndXJhdGlvbjtcblxuICBAT3V0cHV0KCkgc2Vzc2lvbkFkZGVkOiBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlc3Npb24+KCk7XG4gIEBPdXRwdXQoKSBzZXNzaW9uUmVtb3ZlZDogRXZlbnRFbWl0dGVyPHtrZXk6IHN0cmluZywgc2Vzc2lvbjogU2Vzc2lvbn0+XG4gICAgPSBuZXcgRXZlbnRFbWl0dGVyPHtrZXk6IHN0cmluZywgc2Vzc2lvbjogU2Vzc2lvbn0+KCk7XG4gIEBPdXRwdXQoKSBzdGFydENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxNb21lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb21lbnQ+KCk7XG4gIEBPdXRwdXQoKSBlbmRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8TW9tZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW9tZW50PigpO1xuICBAT3V0cHV0KCkgc2xvdExvY2tlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2Vzc2lvblNlcnZpY2U6IFNlc3Npb25TZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLnNlc3Npb25zXG4gICAgICAuc3Vic2NyaWJlKChzZXNzaW9ucykgPT4ge1xuICAgICAgICB0aGlzLnNlc3Npb25zID0gc2Vzc2lvbnM7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBjbGljayBuZXh0IGRheSBidXR0b24sIHRyaWdnZXIgc3dpdGNoIHN0YXJ0XG4gICAqL1xuICBvbk5leHREYXkoKSB7XG4gICAgbGV0IGRheXNOYiA9IDE7XG4gICAgaWYgKHRoaXMudmlld01vZGUgPT09ICd3ZWVrJykge1xuICAgICAgZGF5c05iID0gNztcbiAgICB9XG4gICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoZGF5c05iLCAnZGF5Jyk7XG4gICAgdGhpcy5zdGFydENoYW5nZWQuZW1pdCh0aGlzLnN0YXJ0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBhbGwgc2xvdCBpcyBub3QgYXZhbGFpYmxlcyBhbGwgYWxsIGRheXNcbiAgICovXG4gIGlzQWxsU2xvdE5vdEF2YWlsYWJsZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5kYXlzICYmIHRoaXMuZGF5cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXlzLmZpbHRlcigoZGF5KSA9PiB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZ2V0KGRheS5rZXkpLmxlbmd0aCA+IDApLmxlbmd0aCA9PT0gMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxsIEF2YWlsYWJpbGl0aWVzIGJ5IGtleTogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCB2YWx1ZTogTW9tZW50XG4gICAqL1xuICBnZXRBdmFpbGFiaWxpdGllcyhkYXk6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmdldChkYXkpO1xuICB9XG5cbiAgZ2V0U2Vzc2lvblRpdGxlKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgaWYgKHRoaXMuc2Vzc2lvbnMgJiYgdGhpcy5zZXNzaW9ucy5oYXMoZGF0ZXRpbWUpKSB7XG4gICAgICBjb25zdCBzZXNzaW9uOiBTZXNzaW9uID0gdGhpcy5zZXNzaW9ucy5nZXQoZGF0ZXRpbWUpO1xuICAgICAgcmV0dXJuIG1vbWVudChzZXNzaW9uLnN0YXJ0KS5mb3JtYXQoJ0hIOm1tJykgKyAnIC0gJyArIG1vbWVudChzZXNzaW9uLmVuZCkuZm9ybWF0KCdISDptbScpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBnZXRTZXNzaW9uVG9vbHRpcChkYXk6IERheSwgdGltZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcbiAgICBpZiAodGhpcy5zZXNzaW9ucyAmJiB0aGlzLnNlc3Npb25zLmhhcyhkYXRldGltZSkpIHtcbiAgICAgIGNvbnN0IHNlc3Npb24gPSB0aGlzLnNlc3Npb25zLmdldChkYXRldGltZSk7XG4gICAgICBpZiAoc2Vzc2lvbi5jb21tZW50KSB7XG4gICAgICAgIHJldHVybiBzZXNzaW9uLmNvbW1lbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgb25UaW1lU2xvdENsaWNrZWQoZGF5OiBEYXksIHRpbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgaWYgKHRoaXMuaXNTbG90QnVzeShkYXksIHRpbWUpIHx8IHRoaXMuaXNTbG90RWFybHkoZGF5LCB0aW1lKSkge1xuICAgICAgdGhpcy5zbG90TG9ja2VkLmVtaXQodHJ1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmlzRGF0ZVRpbWVJblNlc3Npb25zRnJvbUN1cnJlbnRVc2VyKGRheSwgdGltZSkgJiYgIXRoaXMuaXNTbG90SW5TZXNzaW9uKGRheSwgdGltZSkpIHtcbiAgICAgIGNvbnN0IG1tdFN0YXJ0ID0gbW9tZW50KGRhdGV0aW1lLCAnWVlZWS1NTS1EREhIOm1tJyk7XG4gICAgICBjb25zdCBtbXRFbmQgPSBtbXRTdGFydC5jbG9uZSgpLmFkZCh0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgICB0aGlzLmFkZFNlc3Npb24obW10U3RhcnQsIG1tdEVuZCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNlc3Npb25zLmhhcyhkYXRldGltZSkpIHtcbiAgICAgIGNvbnN0IHNlc3Npb24gPSB0aGlzLnNlc3Npb25zLmdldChkYXRldGltZSk7XG4gICAgICBjb25zdCBzb3VyY2UgPSB7a2V5OiBkYXRldGltZSwgc2Vzc2lvbn07XG4gICAgICB0aGlzLnJlbW92ZVNlc3Npb24oc291cmNlKTtcbiAgICB9XG4gIH1cblxuICBhZGRTZXNzaW9uKHN0YXJ0OiBNb21lbnQsIGVuZDogTW9tZW50KSB7XG5cbiAgICAvLyBUbyBwcmV2ZW50IGEgc3RyaW5naWZ5IERhdGUgd2l0aG91dCBnb29kIHRpbWV6b25lXG4gICAgRGF0ZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbW9tZW50KHRoaXMpLmZvcm1hdCgpO1xuICAgIH07XG5cbiAgICAvLyBDcmVhdGUgc2Vzc2lvblxuICAgIGNvbnN0IHNlc3Npb246IFNlc3Npb24gPSB7XG4gICAgICBpZDogbnVsbCxcbiAgICAgIHN0YXJ0OiBzdGFydC50b0RhdGUoKSxcbiAgICAgIGVuZDogZW5kLnRvRGF0ZSgpLFxuICAgICAgcGF1c2U6IHRoaXMub25saW5lU2Vzc2lvbi5wYXVzZSB8fCAwLFxuICAgICAgZHVyYXRpb246IHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbixcbiAgICAgIG5iX3BlcnNvbnM6IDEsXG4gICAgICBldmVudF90eXBlOiBFdmVudFR5cGUuc2Vzc2lvbixcbiAgICAgIGNvbW1lbnQ6IHRoaXMuYm9keUNvbmZpZ3VyYXRpb24uY2FsZW5kYXIuc2Vzc2lvbi5pbmZvLFxuICAgICAgdXNlcjogdGhpcy51c2VyLFxuICAgICAgY3VzdG9tZXJzOiBbdGhpcy5jdXN0b21lcl1cbiAgICB9O1xuICAgIHRoaXMuc2Vzc2lvbkFkZGVkLmVtaXQoc2Vzc2lvbik7XG4gIH1cblxuICByZW1vdmVTZXNzaW9uKHNvdXJjZToge2tleTogc3RyaW5nLCBzZXNzaW9uOiBTZXNzaW9ufSkge1xuICAgIHRoaXMuc2Vzc2lvblJlbW92ZWQuZW1pdChzb3VyY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIGRheSBpcyBidXN5IChvY2N1cMOpKSBieSBjdXJyZW50IGtleSBzdHJpbmdcbiAgICovXG4gIGlzRGF5QnVzeShkYXk6IERheSwgdGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICByZXR1cm4gdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIgJiYgdGhpcy5kYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlclxuICAgICAgJiYgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuaGFzKGRhdGV0aW1lKSAmJiB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyLmhhcyhkYXRldGltZSlcbiAgICAgICYmIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmdldChkYXRldGltZSkgPj0gdGhpcy5kYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlci5nZXQoZGF0ZXRpbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIHNsb3QgaXMgYnVzeSBieSBkYXRlXG4gICAqL1xuICBpc1Nsb3RCdXN5KGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIHJldHVybiB0aGlzLmJ1c3lTbG90cyAmJiB0aGlzLmJ1c3lTbG90cy5oYXMoZGF0ZXRpbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGlmIHNsb3QgaXMgb24gcHJldmlvdXMgKGRhdGUgcGx1cyB0w7R0KVxuICAgKi9cbiAgaXNTbG90RWFybHkoZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuICh0aGlzLmVhcmx5U2xvdHMgJiYgdGhpcy5lYXJseVNsb3RzLmhhcyhkYXRldGltZSkpXG4gICAgICB8fCAodGhpcy5wYXVzZVNsb3RzICYmIHRoaXMucGF1c2VTbG90cy5oYXMoZGF0ZXRpbWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpcyBTbG90IGluIGN1cnJlbnQgYWN0aXZpdGllc1xuICAgKi9cbiAgaXNTbG90SW5TZXNzaW9uKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIHJldHVybiB0aGlzLnNlc3Npb25zU2xvdHMgJiYgdGhpcy5zZXNzaW9uc1Nsb3RzLmhhcyhkYXRldGltZSk7XG4gIH1cblxuICBpc0RhdGVUaW1lSW5TZXNzaW9uc0Zyb21DdXJyZW50VXNlcihkYXk6IERheSwgdGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICByZXR1cm4gdGhpcy5zZXNzaW9ucyAmJiB0aGlzLnNlc3Npb25zLmhhcyhkYXRldGltZSk7XG4gIH1cblxuICBpc1Nsb3RTZXNzaW9uRW5kKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIHJldHVybiB0aGlzLnNlc3Npb25zRW5kU2xvdHMgJiYgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmhhcyhkYXRldGltZSk7XG4gIH1cbn1cbiJdfQ==