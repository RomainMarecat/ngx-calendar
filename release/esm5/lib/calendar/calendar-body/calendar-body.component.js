/**
 * @fileoverview added by tsickle
 * Generated from: lib/calendar/calendar-body/calendar-body.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment_ from 'moment';
import { EventType } from '../../shared/event/event';
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
            pause: this.onlineSession.pause,
            duration: this.onlineSession.duration,
            nb_persons: 1,
            event_type: EventType.session,
            comment: this.bodyConfiguration.calendar.session.info,
            user: {
                uid: this.user.uid,
                displayName: this.user.displayName,
                email: this.user.email,
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
    CalendarBodyComponent.propDecorators = {
        user: [{ type: Input }],
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
export { CalendarBodyComponent };
if (false) {
    /**
     * User could be passed to generate a personal calendar
     * @type {?}
     */
    CalendarBodyComponent.prototype.user;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm9tYWlubWFyZWNhdC9uZ3gtY2FsZW5kYXIvIiwic291cmNlcyI6WyJsaWIvY2FsZW5kYXIvY2FsZW5kYXItYm9keS9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFJbEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQUkvQyxNQUFNLEdBQUcsT0FBTztBQUV0QjtJQUFBO1FBaURZLGlCQUFZLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFDbEUsbUJBQWMsR0FDcEIsSUFBSSxZQUFZLEVBQW1DLENBQUM7UUFDOUMsaUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNoRSxlQUFVLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDOUQsZUFBVSxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO0lBdUo1RSxDQUFDO0lBckpDOztPQUVHOzs7OztJQUNILHlDQUFTOzs7O0lBQVQ7O1lBQ00sTUFBTSxHQUFHLENBQUM7UUFDZCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1lBQzVCLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDWjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gscURBQXFCOzs7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QUs7bUNBQ0wsS0FBSzsyQkFDTCxLQUFLO29DQUlMLEtBQUs7K0JBRUwsTUFBTTtpQ0FDTixNQUFNOytCQUVOLE1BQU07NkJBQ04sTUFBTTs2QkFDTixNQUFNOztJQXVKVCw0QkFBQztDQUFBLEFBN01ELElBNk1DO1NBeE1ZLHFCQUFxQjs7Ozs7O0lBSWhDLHFDQUlFOzs7OztJQUlGLDhDQUFzQzs7Ozs7SUFJdEMseUNBQTBCOzs7OztJQUkxQixzQ0FBdUI7Ozs7O0lBSXZCLG9DQUFxQjs7Ozs7SUFJckIscUNBQTBCOztJQUUxQixpREFBaUQ7O0lBQ2pELG1EQUFpRDs7SUFDakQsMkRBQXlEOztJQUN6RCwwQ0FBZ0M7O0lBQ2hDLDJDQUFpQzs7SUFDakMsMkNBQWlDOztJQUNqQyw4Q0FBb0M7O0lBQ3BDLGlEQUF1Qzs7SUFDdkMseUNBQXdDOzs7OztJQUl4QyxrREFBa0Q7O0lBRWxELDZDQUE0RTs7SUFDNUUsK0NBQ3dEOztJQUN4RCw2Q0FBMEU7O0lBQzFFLDJDQUF3RTs7SUFDeEUsMkNBQTBFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlndXJhdGlvbi9jYWxlbmRhci1jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IERheSB9IGZyb20gJy4uLy4uL3NoYXJlZC9kYXkvZGF5JztcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9ldmVudC9ldmVudCc7XG5pbXBvcnQgeyBPbmxpbmVTZXNzaW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3Nlc3Npb24vb25saW5lLXNlc3Npb24nO1xuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXNzaW9uL3Nlc3Npb24nO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItY2FsZW5kYXItYm9keScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQm9keUNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBVc2VyIGNvdWxkIGJlIHBhc3NlZCB0byBnZW5lcmF0ZSBhIHBlcnNvbmFsIGNhbGVuZGFyXG4gICAqL1xuICBASW5wdXQoKSB1c2VyOiB7XG4gICAgdWlkOiBzdHJpbmc7XG4gICAgZGlzcGxheU5hbWU6IHN0cmluZztcbiAgICBlbWFpbDogc3RyaW5nO1xuICB9O1xuICAvKipcbiAgICogY3VycmVudCBvbmxpbmUgc2Vzc2lvblxuICAgKi9cbiAgQElucHV0KCkgb25saW5lU2Vzc2lvbjogT25saW5lU2Vzc2lvbjtcbiAgLyoqXG4gICAqIFZpZXcgbW9kZSBpbnB1dFxuICAgKi9cbiAgQElucHV0KCkgdmlld01vZGU6IHN0cmluZztcbiAgLyoqXG4gICAqIFN0YXJ0IGRheSB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSBzdGFydDogTW9tZW50O1xuICAvKipcbiAgICogRW5kIGRheSB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSBlbmQ6IE1vbWVudDtcbiAgLyoqXG4gICAqIERheSBvZiBjdXJyZXRuIHdlZWtcbiAgICovXG4gIEBJbnB1dCgpIGRheXM6IEFycmF5PERheT47XG5cbiAgQElucHV0KCkgZGF5c0F2YWlsYWJpbGl0eTogTWFwPHN0cmluZywgc3RyaW5nW10+O1xuICBASW5wdXQoKSBkYXlzQnVzeVNsb3ROdW1iZXI6IE1hcDxzdHJpbmcsIG51bWJlcj47XG4gIEBJbnB1dCgpIGRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyOiBNYXA8c3RyaW5nLCBudW1iZXI+O1xuICBASW5wdXQoKSBidXN5U2xvdHM6IFNldDxzdHJpbmc+O1xuICBASW5wdXQoKSBlYXJseVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgQElucHV0KCkgcGF1c2VTbG90czogU2V0PHN0cmluZz47XG4gIEBJbnB1dCgpIHNlc3Npb25zU2xvdHM6IFNldDxzdHJpbmc+O1xuICBASW5wdXQoKSBzZXNzaW9uc0VuZFNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgQElucHV0KCkgc2Vzc2lvbnM6IE1hcDxzdHJpbmcsIFNlc3Npb24+O1xuICAvKipcbiAgICogQ29uZmlndXJhdGlvbiBib2R5XG4gICAqL1xuICBASW5wdXQoKSBib2R5Q29uZmlndXJhdGlvbjogQ2FsZW5kYXJDb25maWd1cmF0aW9uO1xuXG4gIEBPdXRwdXQoKSBzZXNzaW9uQWRkZWQ6IEV2ZW50RW1pdHRlcjxTZXNzaW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4oKTtcbiAgQE91dHB1dCgpIHNlc3Npb25SZW1vdmVkOiBFdmVudEVtaXR0ZXI8e2tleTogc3RyaW5nLCBzZXNzaW9uOiBTZXNzaW9ufT5cbiAgICA9IG5ldyBFdmVudEVtaXR0ZXI8e2tleTogc3RyaW5nLCBzZXNzaW9uOiBTZXNzaW9ufT4oKTtcbiAgQE91dHB1dCgpIHN0YXJ0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPE1vbWVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vbWVudD4oKTtcbiAgQE91dHB1dCgpIGVuZENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxNb21lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb21lbnQ+KCk7XG4gIEBPdXRwdXQoKSBzbG90TG9ja2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIE9uIGNsaWNrIG5leHQgZGF5IGJ1dHRvbiwgdHJpZ2dlciBzd2l0Y2ggc3RhcnRcbiAgICovXG4gIG9uTmV4dERheSgpIHtcbiAgICBsZXQgZGF5c05iID0gMTtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3dlZWsnKSB7XG4gICAgICBkYXlzTmIgPSA3O1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLmFkZChkYXlzTmIsICdkYXknKTtcbiAgICB0aGlzLnN0YXJ0Q2hhbmdlZC5lbWl0KHRoaXMuc3RhcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIGFsbCBzbG90IGlzIG5vdCBhdmFsYWlibGVzIGFsbCBhbGwgZGF5c1xuICAgKi9cbiAgaXNBbGxTbG90Tm90QXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmRheXMgJiYgdGhpcy5kYXlzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmRheXMuZmlsdGVyKChkYXkpID0+IHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5nZXQoZGF5LmtleSkubGVuZ3RoID4gMCkubGVuZ3RoID09PSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBbGwgQXZhaWxhYmlsaXRpZXMgYnkga2V5OiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcsIHZhbHVlOiBNb21lbnRcbiAgICovXG4gIGdldEF2YWlsYWJpbGl0aWVzKGRheTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZ2V0KGRheSk7XG4gIH1cblxuICBnZXRTZXNzaW9uVGl0bGUoZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICBpZiAodGhpcy5zZXNzaW9ucyAmJiB0aGlzLnNlc3Npb25zLmhhcyhkYXRldGltZSkpIHtcbiAgICAgIGNvbnN0IHNlc3Npb246IFNlc3Npb24gPSB0aGlzLnNlc3Npb25zLmdldChkYXRldGltZSk7XG4gICAgICByZXR1cm4gbW9tZW50KHNlc3Npb24uc3RhcnQpLmZvcm1hdCgnSEg6bW0nKSArICcgLSAnICsgbW9tZW50KHNlc3Npb24uZW5kKS5mb3JtYXQoJ0hIOm1tJyk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGdldFNlc3Npb25Ub29sdGlwKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuICAgIGlmICh0aGlzLnNlc3Npb25zICYmIHRoaXMuc2Vzc2lvbnMuaGFzKGRhdGV0aW1lKSkge1xuICAgICAgY29uc3Qgc2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbnMuZ2V0KGRhdGV0aW1lKTtcbiAgICAgIGlmIChzZXNzaW9uLmNvbW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHNlc3Npb24uY29tbWVudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBvblRpbWVTbG90Q2xpY2tlZChkYXk6IERheSwgdGltZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICBpZiAodGhpcy5pc1Nsb3RCdXN5KGRheSwgdGltZSkgfHwgdGhpcy5pc1Nsb3RFYXJseShkYXksIHRpbWUpKSB7XG4gICAgICB0aGlzLnNsb3RMb2NrZWQuZW1pdCh0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaXNEYXRlVGltZUluU2Vzc2lvbnNGcm9tQ3VycmVudFVzZXIoZGF5LCB0aW1lKSAmJiAhdGhpcy5pc1Nsb3RJblNlc3Npb24oZGF5LCB0aW1lKSkge1xuICAgICAgY29uc3QgbW10U3RhcnQgPSBtb21lbnQoZGF0ZXRpbWUsICdZWVlZLU1NLURESEg6bW0nKTtcbiAgICAgIGNvbnN0IG1tdEVuZCA9IG1tdFN0YXJ0LmNsb25lKCkuYWRkKHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICAgIHRoaXMuYWRkU2Vzc2lvbihtbXRTdGFydCwgbW10RW5kKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2Vzc2lvbnMuaGFzKGRhdGV0aW1lKSkge1xuICAgICAgY29uc3Qgc2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbnMuZ2V0KGRhdGV0aW1lKTtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHtrZXk6IGRhdGV0aW1lLCBzZXNzaW9ufTtcbiAgICAgIHRoaXMucmVtb3ZlU2Vzc2lvbihzb3VyY2UpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFNlc3Npb24oc3RhcnQ6IE1vbWVudCwgZW5kOiBNb21lbnQpIHtcblxuICAgIC8vIFRvIHByZXZlbnQgYSBzdHJpbmdpZnkgRGF0ZSB3aXRob3V0IGdvb2QgdGltZXpvbmVcbiAgICBEYXRlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBtb21lbnQodGhpcykuZm9ybWF0KCk7XG4gICAgfTtcblxuICAgIC8vIENyZWF0ZSBzZXNzaW9uXG4gICAgY29uc3Qgc2Vzc2lvbjogU2Vzc2lvbiA9IHtcbiAgICAgIGlkOiBudWxsLFxuICAgICAgc3RhcnQ6IHN0YXJ0LnRvRGF0ZSgpLFxuICAgICAgZW5kOiBlbmQudG9EYXRlKCksXG4gICAgICBwYXVzZTogdGhpcy5vbmxpbmVTZXNzaW9uLnBhdXNlLFxuICAgICAgZHVyYXRpb246IHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbixcbiAgICAgIG5iX3BlcnNvbnM6IDEsXG4gICAgICBldmVudF90eXBlOiBFdmVudFR5cGUuc2Vzc2lvbixcbiAgICAgIGNvbW1lbnQ6IHRoaXMuYm9keUNvbmZpZ3VyYXRpb24uY2FsZW5kYXIuc2Vzc2lvbi5pbmZvLFxuICAgICAgdXNlcjoge1xuICAgICAgICB1aWQ6IHRoaXMudXNlci51aWQsXG4gICAgICAgIGRpc3BsYXlOYW1lOiB0aGlzLnVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgIGVtYWlsOiB0aGlzLnVzZXIuZW1haWwsXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnNlc3Npb25BZGRlZC5lbWl0KHNlc3Npb24pO1xuICB9XG5cbiAgcmVtb3ZlU2Vzc2lvbihzb3VyY2U6IHtrZXk6IHN0cmluZywgc2Vzc2lvbjogU2Vzc2lvbn0pIHtcbiAgICB0aGlzLnNlc3Npb25SZW1vdmVkLmVtaXQoc291cmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBkYXkgaXMgYnVzeSAob2NjdXDDqSkgYnkgY3VycmVudCBrZXkgc3RyaW5nXG4gICAqL1xuICBpc0RheUJ1c3koZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyICYmIHRoaXMuZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXJcbiAgICAgICYmIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmhhcyhkYXRldGltZSkgJiYgdGhpcy5kYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlci5oYXMoZGF0ZXRpbWUpXG4gICAgICAmJiB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5nZXQoZGF0ZXRpbWUpID49IHRoaXMuZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXIuZ2V0KGRhdGV0aW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBzbG90IGlzIGJ1c3kgYnkgZGF0ZVxuICAgKi9cbiAgaXNTbG90QnVzeShkYXk6IERheSwgdGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICByZXR1cm4gdGhpcy5idXN5U2xvdHMgJiYgdGhpcy5idXN5U2xvdHMuaGFzKGRhdGV0aW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpZiBzbG90IGlzIG9uIHByZXZpb3VzIChkYXRlIHBsdXMgdMO0dClcbiAgICovXG4gIGlzU2xvdEVhcmx5KGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIHJldHVybiAodGhpcy5lYXJseVNsb3RzICYmIHRoaXMuZWFybHlTbG90cy5oYXMoZGF0ZXRpbWUpKVxuICAgICAgfHwgKHRoaXMucGF1c2VTbG90cyAmJiB0aGlzLnBhdXNlU2xvdHMuaGFzKGRhdGV0aW1lKSk7XG4gIH1cblxuICAvKipcbiAgICogaXMgU2xvdCBpbiBjdXJyZW50IGFjdGl2aXRpZXNcbiAgICovXG4gIGlzU2xvdEluU2Vzc2lvbihkYXk6IERheSwgdGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uc1Nsb3RzICYmIHRoaXMuc2Vzc2lvbnNTbG90cy5oYXMoZGF0ZXRpbWUpO1xuICB9XG5cbiAgaXNEYXRlVGltZUluU2Vzc2lvbnNGcm9tQ3VycmVudFVzZXIoZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbnMgJiYgdGhpcy5zZXNzaW9ucy5oYXMoZGF0ZXRpbWUpO1xuICB9XG5cbiAgaXNTbG90U2Vzc2lvbkVuZChkYXk6IERheSwgdGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uc0VuZFNsb3RzICYmIHRoaXMuc2Vzc2lvbnNFbmRTbG90cy5oYXMoZGF0ZXRpbWUpO1xuICB9XG59XG4iXX0=