/**
 * @fileoverview added by tsickle
 * Generated from: lib/calendar/calendar-body/calendar-body.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment_ from 'moment';
import { EventType } from '../../shared/event/event';
/** @type {?} */
const moment = moment_;
export class CalendarBodyComponent {
    constructor() {
        this.sessionAdded = new EventEmitter();
        this.sessionRemoved = new EventEmitter();
        this.startChanged = new EventEmitter();
        this.endChanged = new EventEmitter();
        this.slotLocked = new EventEmitter();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm9tYWlubWFyZWNhdC9uZ3gtY2FsZW5kYXIvIiwic291cmNlcyI6WyJsaWIvY2FsZW5kYXIvY2FsZW5kYXItYm9keS9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFJbEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztNQUkvQyxNQUFNLEdBQUcsT0FBTztBQU90QixNQUFNLE9BQU8scUJBQXFCO0lBTGxDO1FBaURZLGlCQUFZLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFDbEUsbUJBQWMsR0FDcEIsSUFBSSxZQUFZLEVBQW1DLENBQUM7UUFDOUMsaUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNoRSxlQUFVLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDOUQsZUFBVSxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO0lBdUo1RSxDQUFDOzs7OztJQWxKQyxTQUFTOztZQUNILE1BQU0sR0FBRyxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtZQUM1QixNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ1o7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFLRCxxQkFBcUI7UUFDbkIsSUFBSSxJQUFJ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QUF5RDs7SUFDekQsMENBQWdDOztJQUNoQywyQ0FBaUM7O0lBQ2pDLDJDQUFpQzs7SUFDakMsOENBQW9DOztJQUNwQyxpREFBdUM7O0lBQ3ZDLHlDQUF3Qzs7Ozs7SUFJeEMsa0RBQWtEOztJQUVsRCw2Q0FBNEU7O0lBQzVFLCtDQUN3RDs7SUFDeEQsNkNBQTBFOztJQUMxRSwyQ0FBd0U7O0lBQ3hFLDJDQUEwRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbmZpZ3VyYXRpb24vY2FsZW5kYXItY29uZmlndXJhdGlvbic7XG5pbXBvcnQgeyBEYXkgfSBmcm9tICcuLi8uLi9zaGFyZWQvZGF5L2RheSc7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvZXZlbnQvZXZlbnQnO1xuaW1wb3J0IHsgT25saW5lU2Vzc2lvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXNzaW9uL29ubGluZS1zZXNzaW9uJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvc2Vzc2lvbi9zZXNzaW9uJztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWNhbGVuZGFyLWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLWJvZHkuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckJvZHlDb21wb25lbnQge1xuICAvKipcbiAgICogVXNlciBjb3VsZCBiZSBwYXNzZWQgdG8gZ2VuZXJhdGUgYSBwZXJzb25hbCBjYWxlbmRhclxuICAgKi9cbiAgQElucHV0KCkgdXNlcjoge1xuICAgIHVpZDogc3RyaW5nO1xuICAgIGRpc3BsYXlOYW1lOiBzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbiAgfTtcbiAgLyoqXG4gICAqIGN1cnJlbnQgb25saW5lIHNlc3Npb25cbiAgICovXG4gIEBJbnB1dCgpIG9ubGluZVNlc3Npb246IE9ubGluZVNlc3Npb247XG4gIC8qKlxuICAgKiBWaWV3IG1vZGUgaW5wdXRcbiAgICovXG4gIEBJbnB1dCgpIHZpZXdNb2RlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTdGFydCBkYXkgd2Vla1xuICAgKi9cbiAgQElucHV0KCkgc3RhcnQ6IE1vbWVudDtcbiAgLyoqXG4gICAqIEVuZCBkYXkgd2Vla1xuICAgKi9cbiAgQElucHV0KCkgZW5kOiBNb21lbnQ7XG4gIC8qKlxuICAgKiBEYXkgb2YgY3VycmV0biB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSBkYXlzOiBBcnJheTxEYXk+O1xuXG4gIEBJbnB1dCgpIGRheXNBdmFpbGFiaWxpdHk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcbiAgQElucHV0KCkgZGF5c0J1c3lTbG90TnVtYmVyOiBNYXA8c3RyaW5nLCBudW1iZXI+O1xuICBASW5wdXQoKSBkYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlcjogTWFwPHN0cmluZywgbnVtYmVyPjtcbiAgQElucHV0KCkgYnVzeVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgQElucHV0KCkgZWFybHlTbG90czogU2V0PHN0cmluZz47XG4gIEBJbnB1dCgpIHBhdXNlU2xvdHM6IFNldDxzdHJpbmc+O1xuICBASW5wdXQoKSBzZXNzaW9uc1Nsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgQElucHV0KCkgc2Vzc2lvbnNFbmRTbG90czogU2V0PHN0cmluZz47XG4gIEBJbnB1dCgpIHNlc3Npb25zOiBNYXA8c3RyaW5nLCBTZXNzaW9uPjtcbiAgLyoqXG4gICAqIENvbmZpZ3VyYXRpb24gYm9keVxuICAgKi9cbiAgQElucHV0KCkgYm9keUNvbmZpZ3VyYXRpb246IENhbGVuZGFyQ29uZmlndXJhdGlvbjtcblxuICBAT3V0cHV0KCkgc2Vzc2lvbkFkZGVkOiBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlc3Npb24+KCk7XG4gIEBPdXRwdXQoKSBzZXNzaW9uUmVtb3ZlZDogRXZlbnRFbWl0dGVyPHtrZXk6IHN0cmluZywgc2Vzc2lvbjogU2Vzc2lvbn0+XG4gICAgPSBuZXcgRXZlbnRFbWl0dGVyPHtrZXk6IHN0cmluZywgc2Vzc2lvbjogU2Vzc2lvbn0+KCk7XG4gIEBPdXRwdXQoKSBzdGFydENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxNb21lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb21lbnQ+KCk7XG4gIEBPdXRwdXQoKSBlbmRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8TW9tZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW9tZW50PigpO1xuICBAT3V0cHV0KCkgc2xvdExvY2tlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBPbiBjbGljayBuZXh0IGRheSBidXR0b24sIHRyaWdnZXIgc3dpdGNoIHN0YXJ0XG4gICAqL1xuICBvbk5leHREYXkoKSB7XG4gICAgbGV0IGRheXNOYiA9IDE7XG4gICAgaWYgKHRoaXMudmlld01vZGUgPT09ICd3ZWVrJykge1xuICAgICAgZGF5c05iID0gNztcbiAgICB9XG4gICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoZGF5c05iLCAnZGF5Jyk7XG4gICAgdGhpcy5zdGFydENoYW5nZWQuZW1pdCh0aGlzLnN0YXJ0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBhbGwgc2xvdCBpcyBub3QgYXZhbGFpYmxlcyBhbGwgYWxsIGRheXNcbiAgICovXG4gIGlzQWxsU2xvdE5vdEF2YWlsYWJsZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5kYXlzICYmIHRoaXMuZGF5cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXlzLmZpbHRlcigoZGF5KSA9PiB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZ2V0KGRheS5rZXkpLmxlbmd0aCA+IDApLmxlbmd0aCA9PT0gMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxsIEF2YWlsYWJpbGl0aWVzIGJ5IGtleTogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCB2YWx1ZTogTW9tZW50XG4gICAqL1xuICBnZXRBdmFpbGFiaWxpdGllcyhkYXk6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmdldChkYXkpO1xuICB9XG5cbiAgZ2V0U2Vzc2lvblRpdGxlKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgaWYgKHRoaXMuc2Vzc2lvbnMgJiYgdGhpcy5zZXNzaW9ucy5oYXMoZGF0ZXRpbWUpKSB7XG4gICAgICBjb25zdCBzZXNzaW9uOiBTZXNzaW9uID0gdGhpcy5zZXNzaW9ucy5nZXQoZGF0ZXRpbWUpO1xuICAgICAgcmV0dXJuIG1vbWVudChzZXNzaW9uLnN0YXJ0KS5mb3JtYXQoJ0hIOm1tJykgKyAnIC0gJyArIG1vbWVudChzZXNzaW9uLmVuZCkuZm9ybWF0KCdISDptbScpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBnZXRTZXNzaW9uVG9vbHRpcChkYXk6IERheSwgdGltZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcbiAgICBpZiAodGhpcy5zZXNzaW9ucyAmJiB0aGlzLnNlc3Npb25zLmhhcyhkYXRldGltZSkpIHtcbiAgICAgIGNvbnN0IHNlc3Npb24gPSB0aGlzLnNlc3Npb25zLmdldChkYXRldGltZSk7XG4gICAgICBpZiAoc2Vzc2lvbi5jb21tZW50KSB7XG4gICAgICAgIHJldHVybiBzZXNzaW9uLmNvbW1lbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgb25UaW1lU2xvdENsaWNrZWQoZGF5OiBEYXksIHRpbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgaWYgKHRoaXMuaXNTbG90QnVzeShkYXksIHRpbWUpIHx8IHRoaXMuaXNTbG90RWFybHkoZGF5LCB0aW1lKSkge1xuICAgICAgdGhpcy5zbG90TG9ja2VkLmVtaXQodHJ1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmlzRGF0ZVRpbWVJblNlc3Npb25zRnJvbUN1cnJlbnRVc2VyKGRheSwgdGltZSkgJiYgIXRoaXMuaXNTbG90SW5TZXNzaW9uKGRheSwgdGltZSkpIHtcbiAgICAgIGNvbnN0IG1tdFN0YXJ0ID0gbW9tZW50KGRhdGV0aW1lLCAnWVlZWS1NTS1EREhIOm1tJyk7XG4gICAgICBjb25zdCBtbXRFbmQgPSBtbXRTdGFydC5jbG9uZSgpLmFkZCh0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb24sICdtaW51dGVzJyk7XG4gICAgICB0aGlzLmFkZFNlc3Npb24obW10U3RhcnQsIG1tdEVuZCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNlc3Npb25zLmhhcyhkYXRldGltZSkpIHtcbiAgICAgIGNvbnN0IHNlc3Npb24gPSB0aGlzLnNlc3Npb25zLmdldChkYXRldGltZSk7XG4gICAgICBjb25zdCBzb3VyY2UgPSB7a2V5OiBkYXRldGltZSwgc2Vzc2lvbn07XG4gICAgICB0aGlzLnJlbW92ZVNlc3Npb24oc291cmNlKTtcbiAgICB9XG4gIH1cblxuICBhZGRTZXNzaW9uKHN0YXJ0OiBNb21lbnQsIGVuZDogTW9tZW50KSB7XG5cbiAgICAvLyBUbyBwcmV2ZW50IGEgc3RyaW5naWZ5IERhdGUgd2l0aG91dCBnb29kIHRpbWV6b25lXG4gICAgRGF0ZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbW9tZW50KHRoaXMpLmZvcm1hdCgpO1xuICAgIH07XG5cbiAgICAvLyBDcmVhdGUgc2Vzc2lvblxuICAgIGNvbnN0IHNlc3Npb246IFNlc3Npb24gPSB7XG4gICAgICBpZDogbnVsbCxcbiAgICAgIHN0YXJ0OiBzdGFydC50b0RhdGUoKSxcbiAgICAgIGVuZDogZW5kLnRvRGF0ZSgpLFxuICAgICAgcGF1c2U6IHRoaXMub25saW5lU2Vzc2lvbi5wYXVzZSxcbiAgICAgIGR1cmF0aW9uOiB0aGlzLm9ubGluZVNlc3Npb24uZHVyYXRpb24sXG4gICAgICBuYl9wZXJzb25zOiAxLFxuICAgICAgZXZlbnRfdHlwZTogRXZlbnRUeXBlLnNlc3Npb24sXG4gICAgICBjb21tZW50OiB0aGlzLmJvZHlDb25maWd1cmF0aW9uLmNhbGVuZGFyLnNlc3Npb24uaW5mbyxcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgdWlkOiB0aGlzLnVzZXIudWlkLFxuICAgICAgICBkaXNwbGF5TmFtZTogdGhpcy51c2VyLmRpc3BsYXlOYW1lLFxuICAgICAgICBlbWFpbDogdGhpcy51c2VyLmVtYWlsLFxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5zZXNzaW9uQWRkZWQuZW1pdChzZXNzaW9uKTtcbiAgfVxuXG4gIHJlbW92ZVNlc3Npb24oc291cmNlOiB7a2V5OiBzdHJpbmcsIHNlc3Npb246IFNlc3Npb259KSB7XG4gICAgdGhpcy5zZXNzaW9uUmVtb3ZlZC5lbWl0KHNvdXJjZSk7XG4gIH1cblxuICAvKipcbiAgICogSWYgZGF5IGlzIGJ1c3kgKG9jY3Vww6kpIGJ5IGN1cnJlbnQga2V5IHN0cmluZ1xuICAgKi9cbiAgaXNEYXlCdXN5KGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIHJldHVybiB0aGlzLmRheXNCdXN5U2xvdE51bWJlciAmJiB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyXG4gICAgICAmJiB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5oYXMoZGF0ZXRpbWUpICYmIHRoaXMuZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXIuaGFzKGRhdGV0aW1lKVxuICAgICAgJiYgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuZ2V0KGRhdGV0aW1lKSA+PSB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyLmdldChkYXRldGltZSk7XG4gIH1cblxuICAvKipcbiAgICogSWYgc2xvdCBpcyBidXN5IGJ5IGRhdGVcbiAgICovXG4gIGlzU2xvdEJ1c3koZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuYnVzeVNsb3RzICYmIHRoaXMuYnVzeVNsb3RzLmhhcyhkYXRldGltZSk7XG4gIH1cblxuICAvKipcbiAgICogaWYgc2xvdCBpcyBvbiBwcmV2aW91cyAoZGF0ZSBwbHVzIHTDtHQpXG4gICAqL1xuICBpc1Nsb3RFYXJseShkYXk6IERheSwgdGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICByZXR1cm4gKHRoaXMuZWFybHlTbG90cyAmJiB0aGlzLmVhcmx5U2xvdHMuaGFzKGRhdGV0aW1lKSlcbiAgICAgIHx8ICh0aGlzLnBhdXNlU2xvdHMgJiYgdGhpcy5wYXVzZVNsb3RzLmhhcyhkYXRldGltZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGlzIFNsb3QgaW4gY3VycmVudCBhY3Rpdml0aWVzXG4gICAqL1xuICBpc1Nsb3RJblNlc3Npb24oZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbnNTbG90cyAmJiB0aGlzLnNlc3Npb25zU2xvdHMuaGFzKGRhdGV0aW1lKTtcbiAgfVxuXG4gIGlzRGF0ZVRpbWVJblNlc3Npb25zRnJvbUN1cnJlbnRVc2VyKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIHJldHVybiB0aGlzLnNlc3Npb25zICYmIHRoaXMuc2Vzc2lvbnMuaGFzKGRhdGV0aW1lKTtcbiAgfVxuXG4gIGlzU2xvdFNlc3Npb25FbmQoZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbnNFbmRTbG90cyAmJiB0aGlzLnNlc3Npb25zRW5kU2xvdHMuaGFzKGRhdGV0aW1lKTtcbiAgfVxufVxuIl19