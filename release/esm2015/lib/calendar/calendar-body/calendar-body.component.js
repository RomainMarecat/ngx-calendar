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
const moment = moment_;
export class CalendarBodyComponent {
    /**
     * @param {?} sessionService
     */
    constructor(sessionService) {
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
    ngOnInit() {
        this.sessionService.sessions
            .subscribe((/**
         * @param {?} sessions
         * @return {?}
         */
        (sessions) => {
            this.sessions = sessions;
        }));
    }
    /**
     * On click next day button, trigger switch start
     * @return {?}
     */
    onNextDay() {
        /** @type {?} */
        let daysNb = 1;
        if (this.viewMode === 'week') {
            daysNb = 7;
        }
        this.start = moment(this.start).add(daysNb, 'day');
        this.startChanged.emit(this.start);
    }
    /**
     * If all slot is not avalaibles all all days
     * @return {?}
     */
    isAllSlotNotAvailable() {
        if (this.days && this.days.length > 0) {
            return this.days.filter((/**
             * @param {?} day
             * @return {?}
             */
            (day) => this.daysAvailability.get(day.key).length > 0)).length === 0;
        }
    }
    /**
     * All Availabilities by key: string, title: string, value: Moment
     * @param {?} day
     * @return {?}
     */
    getAvailabilities(day) {
        return this.daysAvailability.get(day);
    }
    /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    getSessionTitle(day, time) {
        /** @type {?} */
        const datetime = day.value.format('YYYY-MM-DD') + time;
        if (this.sessions && this.sessions.has(datetime)) {
            /** @type {?} */
            const session = this.sessions.get(datetime);
            return moment(session.start).format('HH:mm') + ' - ' + moment(session.end).format('HH:mm');
        }
        return '';
    }
    /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    getSessionTooltip(day, time) {
        /** @type {?} */
        const datetime = day.value.format('YYYY-MM-DD') + time;
        if (this.sessions && this.sessions.has(datetime)) {
            /** @type {?} */
            const session = this.sessions.get(datetime);
            if (session.comment) {
                return session.comment;
            }
        }
        return '';
    }
    /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    onTimeSlotClicked(day, time) {
        /** @type {?} */
        const datetime = day.value.format('YYYY-MM-DD') + time;
        if (this.isSlotBusy(day, time) || this.isSlotEarly(day, time)) {
            this.slotLocked.emit(true);
            return;
        }
        if (!this.isDateTimeInSessionsFromCurrentUser(day, time) && !this.isSlotInSession(day, time)) {
            /** @type {?} */
            const mmtStart = moment(datetime, 'YYYY-MM-DDHH:mm');
            /** @type {?} */
            const mmtEnd = mmtStart.clone().add(this.onlineSession.duration, 'minutes');
            this.addSession(mmtStart, mmtEnd);
        }
        else if (this.sessions.has(datetime)) {
            /** @type {?} */
            const session = this.sessions.get(datetime);
            /** @type {?} */
            const source = { key: datetime, session };
            this.removeSession(source);
        }
    }
    /**
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    addSession(start, end) {
        // To prevent a stringify Date without good timezone
        Date.prototype.toJSON = (/**
         * @return {?}
         */
        function () {
            return moment(this).format();
        });
        // Create session
        /** @type {?} */
        const session = {
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
    }
    /**
     * @param {?} source
     * @return {?}
     */
    removeSession(source) {
        this.sessionRemoved.emit(source);
    }
    /**
     * If day is busy (occupé) by current key string
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    isDayBusy(day, time) {
        /** @type {?} */
        const datetime = day.value.format('YYYY-MM-DD') + time;
        return this.daysBusySlotNumber && this.daysAvailabilitySlotNumber
            && this.daysBusySlotNumber.has(datetime) && this.daysAvailabilitySlotNumber.has(datetime)
            && this.daysBusySlotNumber.get(datetime) >= this.daysAvailabilitySlotNumber.get(datetime);
    }
    /**
     * If slot is busy by date
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    isSlotBusy(day, time) {
        /** @type {?} */
        const datetime = day.value.format('YYYY-MM-DD') + time;
        return this.busySlots && this.busySlots.has(datetime);
    }
    /**
     * if slot is on previous (date plus tôt)
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    isSlotEarly(day, time) {
        /** @type {?} */
        const datetime = day.value.format('YYYY-MM-DD') + time;
        return (this.earlySlots && this.earlySlots.has(datetime))
            || (this.pauseSlots && this.pauseSlots.has(datetime));
    }
    /**
     * is Slot in current activities
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    isSlotInSession(day, time) {
        /** @type {?} */
        const datetime = day.value.format('YYYY-MM-DD') + time;
        return this.sessionsSlots && this.sessionsSlots.has(datetime);
    }
    /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    isDateTimeInSessionsFromCurrentUser(day, time) {
        /** @type {?} */
        const datetime = day.value.format('YYYY-MM-DD') + time;
        return this.sessions && this.sessions.has(datetime);
    }
    /**
     * @param {?} day
     * @param {?} time
     * @return {?}
     */
    isSlotSessionEnd(day, time) {
        /** @type {?} */
        const datetime = day.value.format('YYYY-MM-DD') + time;
        return this.sessionsEndSlots && this.sessionsEndSlots.has(datetime);
    }
}
CalendarBodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-calendar-body',
                template: "<div class=\"calendar-body-wrapper\">\n  <table class=\"calendar-body-table-wrapper table table-bordered\">\n    <thead class=\"calendar-body-table-head\">\n    <tr class=\"calendar-body-head-day-row\"\n        *ngIf=\"viewMode !== 'day'\">\n      <th class=\"calendar-body-day-header text-center\"\n          *ngFor=\"let day of days\">\n        <span class=\"truncate\">{{ day.title }}</span>\n      </th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr class=\"calendar-body-row\">\n      <td class=\"calendar-body-column-content text-center\"\n          [attr.id]=\"day.key\"\n          *ngFor=\"let day of days; let keyDay = index\">\n        <div class=\"time-slot\"\n             [class.busy]=\"isSlotBusy(day, time)\"\n             [class.early]=\"isSlotEarly(day, time)\"\n             [class.session]=\"isSlotInSession(day, time)\"\n             [class.session-start]=\"isDateTimeInSessionsFromCurrentUser(day, time)\"\n             [class.session-end]=\"isSlotSessionEnd(day, time)\"\n             *ngFor=\"let time of getAvailabilities(day.key)\">\n          <div class=\"time-content\">\n            <button type=\"button\"\n                    class=\"slot-available\"\n                    (click)=\"onTimeSlotClicked(day, time)\"\n                    *ngIf=\"!isDateTimeInSessionsFromCurrentUser(day, time); else sessionTitle\">\n              <span class=\"default-time\">{{ time }}</span>\n            </button>\n            <ng-template #sessionTitle>\n              <button type=\"button\"\n                      class=\"slot-session\">\n                {{ getSessionTitle(day, time)}}\n              </button>\n            </ng-template>\n            <a class=\"link-close\" (click)=\"onTimeSlotClicked(day, time)\">\n              <mat-icon class=\"icon-close\"\n                        *ngIf=\"isDateTimeInSessionsFromCurrentUser(day, time)\">\n                close\n              </mat-icon>\n            </a>\n          </div>\n          <div class=\"slot-busy\"\n               *ngIf=\"getAvailabilities(day.key).length <= 0 || isDayBusy(day, time)\">\n            <span>{{bodyConfiguration.calendar.availability.empty}}</span>\n          </div>\n        </div>\n        <div class=\"next-slot\"\n             *ngIf=\"isAllSlotNotAvailable() && keyDay === days.length-1\">\n          <button type=\"button\"\n                  role=\"button\"\n                  [title]=\"bodyConfiguration.calendar.availability.slot\"\n                  (click)=\"onNextDay()\">\n            <span>{{ bodyConfiguration.calendar.availability.slot }}</span>\n            <mat-icon>keyboard_arrow_right</mat-icon>\n          </button>\n        </div>\n      </td>\n    </tr>\n    </tbody>\n  </table>\n</div>\n",
                styles: [".calendar-body-wrapper .calendar-body-column-content{max-width:240px}.calendar-body-wrapper .calendar-body-column-content .time-slot{padding:5px}.calendar-body-wrapper .calendar-body-column-content .time-slot button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);font-family:Lato,Roboto,sans-serif;font-size:14px;font-weight:500}.calendar-body-wrapper .calendar-body-column-content .time-slot button.slot-available{cursor:pointer;width:120px}.calendar-body-wrapper .calendar-body-column-content .time-slot:hover button.slot-available{background-color:#006400;color:#fff}.calendar-body-wrapper .calendar-body-column-content .time-slot.busy{display:none}.calendar-body-wrapper .calendar-body-column-content .time-slot.busy button.slot-available{color:#8b0000;cursor:not-allowed}.calendar-body-wrapper .calendar-body-column-content .time-slot.early button.slot-available{cursor:not-allowed;color:orange}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content{position:relative;padding:5px 5px 5px 0}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .slot-session{width:120px;background-color:#ff8c00}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close .icon-close{position:absolute;right:5px;top:6px;font-size:14px}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close,.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close:hover{cursor:pointer}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-start{border-top-left-radius:3px;border-top-right-radius:3px}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-start .slot-session{color:#000;cursor:text}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-end{border-bottom-left-radius:3px;border-bottom-right-radius:3px}"]
            }] }
];
/** @nocollapse */
CalendarBodyComponent.ctorParameters = () => [
    { type: SessionService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm9tYWlubWFyZWNhdC9uZ3gtY2FsZW5kYXIvIiwic291cmNlcyI6WyJsaWIvY2FsZW5kYXIvY2FsZW5kYXItYm9keS9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFJbEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7TUFFaEUsTUFBTSxHQUFHLE9BQU87QUFPdEIsTUFBTSxPQUFPLHFCQUFxQjs7OztJQW1EaEMsWUFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBUHhDLGlCQUFZLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFDbEUsbUJBQWMsR0FDcEIsSUFBSSxZQUFZLEVBQW1DLENBQUM7UUFDOUMsaUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNoRSxlQUFVLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDOUQsZUFBVSxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO0lBRzFFLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRO2FBQ3pCLFNBQVM7Ozs7UUFBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzNCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFLRCxTQUFTOztZQUNILE1BQU0sR0FBRyxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0s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NkJBQ04sTUFBTTsyQkFFTixNQUFNO3lCQUNOLE1BQU07eUJBQ04sTUFBTTs7Ozs7OztJQTdDUCxxQ0FBbUI7Ozs7O0lBSW5CLHlDQUF1Qjs7Ozs7SUFJdkIsOENBQXNDOzs7OztJQUl0Qyx5Q0FBMEI7Ozs7O0lBSTFCLHNDQUF1Qjs7Ozs7SUFJdkIsb0NBQXFCOzs7OztJQUlyQixxQ0FBMEI7O0lBRTFCLGlEQUFpRDs7SUFDakQsbURBQWlEOztJQUNqRCwyREFBeUQ7O0lBQ3pELDBDQUFnQzs7SUFDaEMsMkNBQWlDOztJQUNqQywyQ0FBaUM7O0lBQ2pDLDhDQUFvQzs7SUFDcEMsaURBQXVDOztJQUN2Qyx5Q0FBK0I7Ozs7O0lBSS9CLGtEQUFrRDs7SUFFbEQsNkNBQTRFOztJQUM1RSwrQ0FDd0Q7O0lBQ3hELDZDQUEwRTs7SUFDMUUsMkNBQXdFOztJQUN4RSwyQ0FBMEU7Ozs7O0lBRTlELCtDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlndXJhdGlvbi9jYWxlbmRhci1jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IERheSB9IGZyb20gJy4uLy4uL3NoYXJlZC9kYXkvZGF5JztcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9ldmVudC9ldmVudCc7XG5pbXBvcnQgeyBPbmxpbmVTZXNzaW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3Nlc3Npb24vb25saW5lLXNlc3Npb24nO1xuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXNzaW9uL3Nlc3Npb24nO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItY2FsZW5kYXItYm9keScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQm9keUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKlxuICAgKiBVc2VyIGNvdWxkIGJlIHBhc3NlZCB0byBzaG93IHNlc3Npb24gb3duZXJcbiAgICovXG4gIEBJbnB1dCgpIHVzZXI6IGFueTtcbiAgLyoqXG4gICAqIEN1c3RvbWVyIGNvdWxkIGJlIHBhc3NlZCB0byBnZW5lcmF0ZSBhIHBlcnNvbmFsIGNhbGVuZGFyXG4gICAqL1xuICBASW5wdXQoKSBjdXN0b21lcjogYW55O1xuICAvKipcbiAgICogY3VycmVudCBvbmxpbmUgc2Vzc2lvblxuICAgKi9cbiAgQElucHV0KCkgb25saW5lU2Vzc2lvbjogT25saW5lU2Vzc2lvbjtcbiAgLyoqXG4gICAqIFZpZXcgbW9kZSBpbnB1dFxuICAgKi9cbiAgQElucHV0KCkgdmlld01vZGU6IHN0cmluZztcbiAgLyoqXG4gICAqIFN0YXJ0IGRheSB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSBzdGFydDogTW9tZW50O1xuICAvKipcbiAgICogRW5kIGRheSB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSBlbmQ6IE1vbWVudDtcbiAgLyoqXG4gICAqIERheSBvZiBjdXJyZXRuIHdlZWtcbiAgICovXG4gIEBJbnB1dCgpIGRheXM6IEFycmF5PERheT47XG5cbiAgQElucHV0KCkgZGF5c0F2YWlsYWJpbGl0eTogTWFwPHN0cmluZywgc3RyaW5nW10+O1xuICBASW5wdXQoKSBkYXlzQnVzeVNsb3ROdW1iZXI6IE1hcDxzdHJpbmcsIG51bWJlcj47XG4gIEBJbnB1dCgpIGRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyOiBNYXA8c3RyaW5nLCBudW1iZXI+O1xuICBASW5wdXQoKSBidXN5U2xvdHM6IFNldDxzdHJpbmc+O1xuICBASW5wdXQoKSBlYXJseVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgQElucHV0KCkgcGF1c2VTbG90czogU2V0PHN0cmluZz47XG4gIEBJbnB1dCgpIHNlc3Npb25zU2xvdHM6IFNldDxzdHJpbmc+O1xuICBASW5wdXQoKSBzZXNzaW9uc0VuZFNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgc2Vzc2lvbnM6IE1hcDxzdHJpbmcsIFNlc3Npb24+O1xuICAvKipcbiAgICogQ29uZmlndXJhdGlvbiBib2R5XG4gICAqL1xuICBASW5wdXQoKSBib2R5Q29uZmlndXJhdGlvbjogQ2FsZW5kYXJDb25maWd1cmF0aW9uO1xuXG4gIEBPdXRwdXQoKSBzZXNzaW9uQWRkZWQ6IEV2ZW50RW1pdHRlcjxTZXNzaW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4oKTtcbiAgQE91dHB1dCgpIHNlc3Npb25SZW1vdmVkOiBFdmVudEVtaXR0ZXI8e2tleTogc3RyaW5nLCBzZXNzaW9uOiBTZXNzaW9ufT5cbiAgICA9IG5ldyBFdmVudEVtaXR0ZXI8e2tleTogc3RyaW5nLCBzZXNzaW9uOiBTZXNzaW9ufT4oKTtcbiAgQE91dHB1dCgpIHN0YXJ0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPE1vbWVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vbWVudD4oKTtcbiAgQE91dHB1dCgpIGVuZENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxNb21lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb21lbnQ+KCk7XG4gIEBPdXRwdXQoKSBzbG90TG9ja2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2Vzc2lvblNlcnZpY2Uuc2Vzc2lvbnNcbiAgICAgIC5zdWJzY3JpYmUoKHNlc3Npb25zKSA9PiB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnMgPSBzZXNzaW9ucztcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIGNsaWNrIG5leHQgZGF5IGJ1dHRvbiwgdHJpZ2dlciBzd2l0Y2ggc3RhcnRcbiAgICovXG4gIG9uTmV4dERheSgpIHtcbiAgICBsZXQgZGF5c05iID0gMTtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3dlZWsnKSB7XG4gICAgICBkYXlzTmIgPSA3O1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLmFkZChkYXlzTmIsICdkYXknKTtcbiAgICB0aGlzLnN0YXJ0Q2hhbmdlZC5lbWl0KHRoaXMuc3RhcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIGFsbCBzbG90IGlzIG5vdCBhdmFsYWlibGVzIGFsbCBhbGwgZGF5c1xuICAgKi9cbiAgaXNBbGxTbG90Tm90QXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmRheXMgJiYgdGhpcy5kYXlzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmRheXMuZmlsdGVyKChkYXkpID0+IHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5nZXQoZGF5LmtleSkubGVuZ3RoID4gMCkubGVuZ3RoID09PSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBbGwgQXZhaWxhYmlsaXRpZXMgYnkga2V5OiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcsIHZhbHVlOiBNb21lbnRcbiAgICovXG4gIGdldEF2YWlsYWJpbGl0aWVzKGRheTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZ2V0KGRheSk7XG4gIH1cblxuICBnZXRTZXNzaW9uVGl0bGUoZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICBpZiAodGhpcy5zZXNzaW9ucyAmJiB0aGlzLnNlc3Npb25zLmhhcyhkYXRldGltZSkpIHtcbiAgICAgIGNvbnN0IHNlc3Npb246IFNlc3Npb24gPSB0aGlzLnNlc3Npb25zLmdldChkYXRldGltZSk7XG4gICAgICByZXR1cm4gbW9tZW50KHNlc3Npb24uc3RhcnQpLmZvcm1hdCgnSEg6bW0nKSArICcgLSAnICsgbW9tZW50KHNlc3Npb24uZW5kKS5mb3JtYXQoJ0hIOm1tJyk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGdldFNlc3Npb25Ub29sdGlwKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuICAgIGlmICh0aGlzLnNlc3Npb25zICYmIHRoaXMuc2Vzc2lvbnMuaGFzKGRhdGV0aW1lKSkge1xuICAgICAgY29uc3Qgc2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbnMuZ2V0KGRhdGV0aW1lKTtcbiAgICAgIGlmIChzZXNzaW9uLmNvbW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHNlc3Npb24uY29tbWVudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBvblRpbWVTbG90Q2xpY2tlZChkYXk6IERheSwgdGltZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICBpZiAodGhpcy5pc1Nsb3RCdXN5KGRheSwgdGltZSkgfHwgdGhpcy5pc1Nsb3RFYXJseShkYXksIHRpbWUpKSB7XG4gICAgICB0aGlzLnNsb3RMb2NrZWQuZW1pdCh0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaXNEYXRlVGltZUluU2Vzc2lvbnNGcm9tQ3VycmVudFVzZXIoZGF5LCB0aW1lKSAmJiAhdGhpcy5pc1Nsb3RJblNlc3Npb24oZGF5LCB0aW1lKSkge1xuICAgICAgY29uc3QgbW10U3RhcnQgPSBtb21lbnQoZGF0ZXRpbWUsICdZWVlZLU1NLURESEg6bW0nKTtcbiAgICAgIGNvbnN0IG1tdEVuZCA9IG1tdFN0YXJ0LmNsb25lKCkuYWRkKHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICAgIHRoaXMuYWRkU2Vzc2lvbihtbXRTdGFydCwgbW10RW5kKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2Vzc2lvbnMuaGFzKGRhdGV0aW1lKSkge1xuICAgICAgY29uc3Qgc2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbnMuZ2V0KGRhdGV0aW1lKTtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHtrZXk6IGRhdGV0aW1lLCBzZXNzaW9ufTtcbiAgICAgIHRoaXMucmVtb3ZlU2Vzc2lvbihzb3VyY2UpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFNlc3Npb24oc3RhcnQ6IE1vbWVudCwgZW5kOiBNb21lbnQpIHtcblxuICAgIC8vIFRvIHByZXZlbnQgYSBzdHJpbmdpZnkgRGF0ZSB3aXRob3V0IGdvb2QgdGltZXpvbmVcbiAgICBEYXRlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBtb21lbnQodGhpcykuZm9ybWF0KCk7XG4gICAgfTtcblxuICAgIC8vIENyZWF0ZSBzZXNzaW9uXG4gICAgY29uc3Qgc2Vzc2lvbjogU2Vzc2lvbiA9IHtcbiAgICAgIGlkOiBudWxsLFxuICAgICAgc3RhcnQ6IHN0YXJ0LnRvRGF0ZSgpLFxuICAgICAgZW5kOiBlbmQudG9EYXRlKCksXG4gICAgICBwYXVzZTogdGhpcy5vbmxpbmVTZXNzaW9uLnBhdXNlIHx8IDAsXG4gICAgICBkdXJhdGlvbjogdGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uLFxuICAgICAgbmJfcGVyc29uczogMSxcbiAgICAgIGV2ZW50X3R5cGU6IEV2ZW50VHlwZS5zZXNzaW9uLFxuICAgICAgY29tbWVudDogdGhpcy5ib2R5Q29uZmlndXJhdGlvbi5jYWxlbmRhci5zZXNzaW9uLmluZm8sXG4gICAgICB1c2VyOiB0aGlzLnVzZXIsXG4gICAgICBjdXN0b21lcnM6IFt0aGlzLmN1c3RvbWVyXVxuICAgIH07XG4gICAgdGhpcy5zZXNzaW9uQWRkZWQuZW1pdChzZXNzaW9uKTtcbiAgfVxuXG4gIHJlbW92ZVNlc3Npb24oc291cmNlOiB7a2V5OiBzdHJpbmcsIHNlc3Npb246IFNlc3Npb259KSB7XG4gICAgdGhpcy5zZXNzaW9uUmVtb3ZlZC5lbWl0KHNvdXJjZSk7XG4gIH1cblxuICAvKipcbiAgICogSWYgZGF5IGlzIGJ1c3kgKG9jY3Vww6kpIGJ5IGN1cnJlbnQga2V5IHN0cmluZ1xuICAgKi9cbiAgaXNEYXlCdXN5KGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIHJldHVybiB0aGlzLmRheXNCdXN5U2xvdE51bWJlciAmJiB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyXG4gICAgICAmJiB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5oYXMoZGF0ZXRpbWUpICYmIHRoaXMuZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXIuaGFzKGRhdGV0aW1lKVxuICAgICAgJiYgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuZ2V0KGRhdGV0aW1lKSA+PSB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyLmdldChkYXRldGltZSk7XG4gIH1cblxuICAvKipcbiAgICogSWYgc2xvdCBpcyBidXN5IGJ5IGRhdGVcbiAgICovXG4gIGlzU2xvdEJ1c3koZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuYnVzeVNsb3RzICYmIHRoaXMuYnVzeVNsb3RzLmhhcyhkYXRldGltZSk7XG4gIH1cblxuICAvKipcbiAgICogaWYgc2xvdCBpcyBvbiBwcmV2aW91cyAoZGF0ZSBwbHVzIHTDtHQpXG4gICAqL1xuICBpc1Nsb3RFYXJseShkYXk6IERheSwgdGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICByZXR1cm4gKHRoaXMuZWFybHlTbG90cyAmJiB0aGlzLmVhcmx5U2xvdHMuaGFzKGRhdGV0aW1lKSlcbiAgICAgIHx8ICh0aGlzLnBhdXNlU2xvdHMgJiYgdGhpcy5wYXVzZVNsb3RzLmhhcyhkYXRldGltZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGlzIFNsb3QgaW4gY3VycmVudCBhY3Rpdml0aWVzXG4gICAqL1xuICBpc1Nsb3RJblNlc3Npb24oZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbnNTbG90cyAmJiB0aGlzLnNlc3Npb25zU2xvdHMuaGFzKGRhdGV0aW1lKTtcbiAgfVxuXG4gIGlzRGF0ZVRpbWVJblNlc3Npb25zRnJvbUN1cnJlbnRVc2VyKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIHJldHVybiB0aGlzLnNlc3Npb25zICYmIHRoaXMuc2Vzc2lvbnMuaGFzKGRhdGV0aW1lKTtcbiAgfVxuXG4gIGlzU2xvdFNlc3Npb25FbmQoZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbnNFbmRTbG90cyAmJiB0aGlzLnNlc3Npb25zRW5kU2xvdHMuaGFzKGRhdGV0aW1lKTtcbiAgfVxufVxuIl19