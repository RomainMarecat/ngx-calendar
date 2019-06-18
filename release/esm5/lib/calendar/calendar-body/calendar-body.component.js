/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment_ from 'moment';
/** @type {?} */
var moment = moment_;
import { TranslateService } from '@ngx-translate/core';
import { EventType } from '../../shared/event/event';
import { AlertService } from '../../shared/util/alert.service';
var CalendarBodyComponent = /** @class */ (function () {
    function CalendarBodyComponent(translate, alertService) {
        this.translate = translate;
        this.alertService = alertService;
        this.sessionAdded = new EventEmitter();
        this.sessionRemoved = new EventEmitter();
        this.startChanged = new EventEmitter();
        this.endChanged = new EventEmitter();
    }
    /**
     * @return {?}
     */
    CalendarBodyComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
            if (session.details.info) {
                return this.translate.instant(session.details.info);
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
            this.alertService.show('error.slot.locked');
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
                info: 'calendar.session.info',
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
                    template: "<div class=\"calendar-body-wrapper\">\n  <table class=\"calendar-body-table-wrapper table table-bordered\">\n    <thead class=\"calendar-body-table-head\">\n    <tr class=\"calendar-body-head-day-row\"\n        *ngIf=\"viewMode !== 'day'\">\n      <th class=\"calendar-body-day-header text-center\"\n          *ngFor=\"let day of days\">\n        <span class=\"truncate\">{{ day.title }}</span>\n      </th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr class=\"calendar-body-row\">\n      <td class=\"calendar-body-column-content text-center\"\n          #dayList\n          [attr.id]=\"day.key\"\n          *ngFor=\"let day of days; let keyDay = index\">\n        <div class=\"time-slot\"\n             [class.busy]=\"isSlotBusy(day, time)\"\n             [class.early]=\"isSlotEarly(day, time)\"\n             [class.session]=\"isSlotInSession(day, time)\"\n             [class.session-start]=\"isSlotSessionStart(day, time)\"\n             [class.session-end]=\"isSlotSessionEnd(day, time)\"\n             *ngFor=\"let time of getAvailabilities(day.key)\">\n          <div class=\"time-content\">\n            <button type=\"button\"\n                    class=\"slot-available\"\n                    color=\"primary\"\n                    mat-raised-button\n                    (click)=\"onTimeSlotClicked(day, time)\"\n                    *ngIf=\"!isSlotSessionStart(day, time); else sessionTitle\">\n              <span class=\"default-time\">{{ time }}</span>\n            </button>\n            <ng-template #sessionTitle>\n              <button type=\"button\"\n                      mat-raised-button\n                      class=\"slot-session\"\n                      [matTooltipPosition]=\"'above'\"\n                      [matTooltip]=\"getSessionTooltip(day, time)\">\n                {{ getSessionTitle(day, time)}}\n              </button>\n            </ng-template>\n            <a class=\"link-close\" (click)=\"onTimeSlotClicked(day, time)\">\n              <mat-icon class=\"icon-close\"\n                        *ngIf=\"isSlotSessionStart(day, time)\">close\n              </mat-icon>\n            </a>\n          </div>\n          <div class=\"slot-busy\"\n               *ngIf=\"getAvailabilities(day.key).length <= 0 || isDayBusy(day, time)\">\n            <span>{{ 'calendar.availability.empty'|translate }}</span>\n          </div>\n        </div>\n        <div class=\"next-slot\"\n             *ngIf=\"isAllSlotNotAvailable() && keyDay === days.length-1\">\n          <button type=\"button\"\n                  role=\"button\"\n                  mat-raised-button\n                  color=\"primary\"\n                  [title]=\"'cta.next-available-slot'|translate\"\n                  (click)=\"onNextDay()\">\n            <span>{{ 'cta.next-available-slot'|translate }}</span>\n            <mat-icon>keyboard_arrow_right</mat-icon>\n          </button>\n        </div>\n      </td>\n    </tr>\n    </tbody>\n  </table>\n</div>\n",
                    styles: [".calendar-body-wrapper .calendar-body-column-content{max-width:240px}.calendar-body-wrapper .calendar-body-column-content .time-slot{padding:5px}.calendar-body-wrapper .calendar-body-column-content .time-slot button.slot-available{cursor:pointer;width:120px}.calendar-body-wrapper .calendar-body-column-content .time-slot:hover button.slot-available{background-color:#006400;color:#fff}.calendar-body-wrapper .calendar-body-column-content .time-slot.busy{display:none}.calendar-body-wrapper .calendar-body-column-content .time-slot.busy button.slot-available{color:#8b0000;cursor:not-allowed}.calendar-body-wrapper .calendar-body-column-content .time-slot.early button.slot-available{cursor:not-allowed;color:orange}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content{position:relative;padding:5px 5px 5px 0}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .slot-session{width:120px;background-color:#ff8c00}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close .icon-close{position:absolute;right:5px;top:5px;font-size:14px}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close,.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close:hover{cursor:pointer}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-start{border-top-left-radius:3px;border-top-right-radius:3px}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-start .slot-session{color:#000;cursor:text}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-end{border-bottom-left-radius:3px;border-bottom-right-radius:3px}"]
                }] }
    ];
    /** @nocollapse */
    CalendarBodyComponent.ctorParameters = function () { return [
        { type: TranslateService },
        { type: AlertService }
    ]; };
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
        sessionAdded: [{ type: Output }],
        sessionRemoved: [{ type: Output }],
        startChanged: [{ type: Output }],
        endChanged: [{ type: Output }]
    };
    return CalendarBodyComponent;
}());
export { CalendarBodyComponent };
if (false) {
    /** @type {?} */
    CalendarBodyComponent.prototype.onlineSession;
    /** @type {?} */
    CalendarBodyComponent.prototype.viewMode;
    /** @type {?} */
    CalendarBodyComponent.prototype.start;
    /** @type {?} */
    CalendarBodyComponent.prototype.end;
    /** @type {?} */
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
    /** @type {?} */
    CalendarBodyComponent.prototype.sessionAdded;
    /** @type {?} */
    CalendarBodyComponent.prototype.sessionRemoved;
    /** @type {?} */
    CalendarBodyComponent.prototype.startChanged;
    /** @type {?} */
    CalendarBodyComponent.prototype.endChanged;
    /**
     * @type {?}
     * @private
     */
    CalendarBodyComponent.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    CalendarBodyComponent.prototype.alertService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm9tYWlubWFyZWNhdC9uZ3gtY2FsZW5kYXIvIiwic291cmNlcyI6WyJsaWIvY2FsZW5kYXIvY2FsZW5kYXItYm9keS9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7SUFFNUIsTUFBTSxHQUFHLE9BQU87QUFFdEIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUUvRDtJQTRCRSwrQkFBb0IsU0FBMkIsRUFDM0IsWUFBMEI7UUFEMUIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0IsaUJBQVksR0FBWixZQUFZLENBQWM7UUFQcEMsaUJBQVksR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUNsRSxtQkFBYyxHQUNwQixJQUFJLFlBQVksRUFBbUMsQ0FBQztRQUM5QyxpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ2hFLGVBQVUsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUl4RSxDQUFDOzs7O0lBRUQsd0NBQVE7OztJQUFSO0lBQ0EsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILHlDQUFTOzs7O0lBQVQ7O1lBQ00sTUFBTSxHQUFHLENBQUM7UUFDZCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1lBQzVCLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDWjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElB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QTVLRCxJQTRLQztTQXZLWSxxQkFBcUI7OztJQUNoQyw4Q0FBc0M7O0lBQ3RDLHlDQUEwQjs7SUFDMUIsc0NBQXVCOztJQUN2QixvQ0FBcUI7O0lBQ3JCLHFDQUEwQjs7SUFFMUIsaURBQWlEOztJQUNqRCxtREFBaUQ7O0lBQ2pELDJEQUF5RDs7SUFDekQsMENBQWdDOztJQUNoQywyQ0FBaUM7O0lBQ2pDLDJDQUFpQzs7SUFDakMsOENBQW9DOztJQUNwQyxpREFBdUM7O0lBQ3ZDLHlDQUF3Qzs7SUFFeEMsNkNBQTRFOztJQUM1RSwrQ0FDd0Q7O0lBQ3hELDZDQUEwRTs7SUFDMUUsMkNBQXdFOzs7OztJQUU1RCwwQ0FBbUM7Ozs7O0lBQ25DLDZDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEYXkgfSBmcm9tICcuLi8uLi9zaGFyZWQvZGF5L2RheSc7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvZXZlbnQvZXZlbnQnO1xuaW1wb3J0IHsgT25saW5lU2Vzc2lvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXNzaW9uL29ubGluZS1zZXNzaW9uJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvc2Vzc2lvbi9zZXNzaW9uJztcbmltcG9ydCB7IEFsZXJ0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlsL2FsZXJ0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItY2FsZW5kYXItYm9keScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQm9keUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG9ubGluZVNlc3Npb246IE9ubGluZVNlc3Npb247XG4gIEBJbnB1dCgpIHZpZXdNb2RlOiBTdHJpbmc7XG4gIEBJbnB1dCgpIHN0YXJ0OiBNb21lbnQ7XG4gIEBJbnB1dCgpIGVuZDogTW9tZW50O1xuICBASW5wdXQoKSBkYXlzOiBBcnJheTxEYXk+O1xuXG4gIEBJbnB1dCgpIGRheXNBdmFpbGFiaWxpdHk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcbiAgQElucHV0KCkgZGF5c0J1c3lTbG90TnVtYmVyOiBNYXA8c3RyaW5nLCBudW1iZXI+O1xuICBASW5wdXQoKSBkYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlcjogTWFwPHN0cmluZywgbnVtYmVyPjtcbiAgQElucHV0KCkgYnVzeVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgQElucHV0KCkgZWFybHlTbG90czogU2V0PHN0cmluZz47XG4gIEBJbnB1dCgpIHBhdXNlU2xvdHM6IFNldDxzdHJpbmc+O1xuICBASW5wdXQoKSBzZXNzaW9uc1Nsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgQElucHV0KCkgc2Vzc2lvbnNFbmRTbG90czogU2V0PHN0cmluZz47XG4gIEBJbnB1dCgpIHNlc3Npb25zOiBNYXA8c3RyaW5nLCBTZXNzaW9uPjtcblxuICBAT3V0cHV0KCkgc2Vzc2lvbkFkZGVkOiBFdmVudEVtaXR0ZXI8U2Vzc2lvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlc3Npb24+KCk7XG4gIEBPdXRwdXQoKSBzZXNzaW9uUmVtb3ZlZDogRXZlbnRFbWl0dGVyPHtrZXk6IHN0cmluZywgc2Vzc2lvbjogU2Vzc2lvbn0+XG4gICAgPSBuZXcgRXZlbnRFbWl0dGVyPHtrZXk6IHN0cmluZywgc2Vzc2lvbjogU2Vzc2lvbn0+KCk7XG4gIEBPdXRwdXQoKSBzdGFydENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxNb21lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb21lbnQ+KCk7XG4gIEBPdXRwdXQoKSBlbmRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8TW9tZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW9tZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGFsZXJ0U2VydmljZTogQWxlcnRTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBjbGljayBuZXh0IGRheSBidXR0b24sIHRyaWdnZXIgc3dpdGNoIHN0YXJ0XG4gICAqL1xuICBvbk5leHREYXkoKSB7XG4gICAgbGV0IGRheXNOYiA9IDE7XG4gICAgaWYgKHRoaXMudmlld01vZGUgPT09ICd3ZWVrJykge1xuICAgICAgZGF5c05iID0gNztcbiAgICB9XG4gICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoZGF5c05iLCAnZGF5Jyk7XG4gICAgdGhpcy5zdGFydENoYW5nZWQuZW1pdCh0aGlzLnN0YXJ0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBhbGwgc2xvdCBpcyBub3QgYXZhbGFpYmxlcyBhbGwgYWxsIGRheXNcbiAgICovXG4gIGlzQWxsU2xvdE5vdEF2YWlsYWJsZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5kYXlzICYmIHRoaXMuZGF5cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXlzLmZpbHRlcigoZGF5KSA9PiB0aGlzLmRheXNBdmFpbGFiaWxpdHkuZ2V0KGRheS5rZXkpLmxlbmd0aCA+IDApLmxlbmd0aCA9PT0gMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxsIEF2YWlsYWJpbGl0aWVzIGJ5IGtleTogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCB2YWx1ZTogTW9tZW50XG4gICAqL1xuICBnZXRBdmFpbGFiaWxpdGllcyhkYXk6IHN0cmluZyk6IFN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmdldChkYXkpO1xuICB9XG5cbiAgZ2V0U2Vzc2lvblRpdGxlKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgaWYgKHRoaXMuc2Vzc2lvbnMgJiYgdGhpcy5zZXNzaW9ucy5oYXMoZGF0ZXRpbWUpKSB7XG4gICAgICBjb25zdCBzZXNzaW9uOiBTZXNzaW9uID0gdGhpcy5zZXNzaW9ucy5nZXQoZGF0ZXRpbWUpO1xuICAgICAgcmV0dXJuIG1vbWVudChzZXNzaW9uLnN0YXJ0KS5mb3JtYXQoJ0hIOm1tJykgKyAnIC0gJyArIG1vbWVudChzZXNzaW9uLmVuZCkuZm9ybWF0KCdISDptbScpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBnZXRTZXNzaW9uVG9vbHRpcChkYXk6IERheSwgdGltZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcbiAgICBpZiAodGhpcy5zZXNzaW9ucyAmJiB0aGlzLnNlc3Npb25zLmhhcyhkYXRldGltZSkpIHtcbiAgICAgIGNvbnN0IHNlc3Npb24gPSB0aGlzLnNlc3Npb25zLmdldChkYXRldGltZSk7XG4gICAgICBpZiAoc2Vzc2lvbi5kZXRhaWxzLmluZm8pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLmluc3RhbnQoc2Vzc2lvbi5kZXRhaWxzLmluZm8pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIG9uVGltZVNsb3RDbGlja2VkKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIGlmICh0aGlzLmlzU2xvdEJ1c3koZGF5LCB0aW1lKSB8fCB0aGlzLmlzU2xvdEVhcmx5KGRheSwgdGltZSkpIHtcbiAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLnNob3coJ2Vycm9yLnNsb3QubG9ja2VkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmlzU2xvdFNlc3Npb25TdGFydChkYXksIHRpbWUpICYmICF0aGlzLmlzU2xvdEluU2Vzc2lvbihkYXksIHRpbWUpKSB7XG4gICAgICBjb25zdCBtbXRTdGFydCA9IG1vbWVudChkYXRldGltZSwgJ1lZWVktTU0tRERISDptbScpO1xuICAgICAgY29uc3QgbW10RW5kID0gbW10U3RhcnQuY2xvbmUoKS5hZGQodGhpcy5vbmxpbmVTZXNzaW9uLnNlc3Npb25fdHlwZS5kdXJhdGlvbiwgJ21pbnV0ZXMnKTtcbiAgICAgIHRoaXMuYWRkU2Vzc2lvbihtbXRTdGFydCwgbW10RW5kKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2Vzc2lvbnMuaGFzKGRhdGV0aW1lKSkge1xuICAgICAgY29uc3Qgc2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbnMuZ2V0KGRhdGV0aW1lKTtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHtrZXk6IGRhdGV0aW1lLCBzZXNzaW9uOiBzZXNzaW9ufTtcbiAgICAgIHRoaXMucmVtb3ZlU2Vzc2lvbihzb3VyY2UpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFNlc3Npb24oc3RhcnQ6IE1vbWVudCwgZW5kOiBNb21lbnQpIHtcbiAgICBjb25zdCBzZXNzaW9uOiBTZXNzaW9uID0ge1xuICAgICAgc3RhcnQ6IHN0YXJ0LnRvRGF0ZSgpLFxuICAgICAgZW5kOiBlbmQudG9EYXRlKCksXG4gICAgICBwYXVzZTogdGhpcy5vbmxpbmVTZXNzaW9uLnNlc3Npb25fdHlwZS5wYXVzZSxcbiAgICAgIGRldGFpbHM6IHtcbiAgICAgICAgbmJfcGVyc29uczogMSxcbiAgICAgICAgZXZlbnRfdHlwZTogRXZlbnRUeXBlLnNlc3Npb24sXG4gICAgICAgIGluZm86ICdjYWxlbmRhci5zZXNzaW9uLmluZm8nLFxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5zZXNzaW9uQWRkZWQuZW1pdChzZXNzaW9uKTtcbiAgfVxuXG4gIHJlbW92ZVNlc3Npb24oc291cmNlOiB7a2V5OiBzdHJpbmcsIHNlc3Npb246IFNlc3Npb259KSB7XG4gICAgdGhpcy5zZXNzaW9uUmVtb3ZlZC5lbWl0KHNvdXJjZSk7XG4gIH1cblxuICAvKipcbiAgICogSWYgZGF5IGlzIGJ1c3kgKG9jY3Vww6kpIGJ5IGN1cnJlbnQga2V5IHN0cmluZ1xuICAgKi9cbiAgaXNEYXlCdXN5KGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIHJldHVybiB0aGlzLmRheXNCdXN5U2xvdE51bWJlciAmJiB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyXG4gICAgICAmJiB0aGlzLmRheXNCdXN5U2xvdE51bWJlci5oYXMoZGF0ZXRpbWUpICYmIHRoaXMuZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXIuaGFzKGRhdGV0aW1lKVxuICAgICAgJiYgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuZ2V0KGRhdGV0aW1lKSA+PSB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyLmdldChkYXRldGltZSk7XG4gIH1cblxuICAvKipcbiAgICogSWYgc2xvdCBpcyBidXN5IGJ5IGRhdGVcbiAgICovXG4gIGlzU2xvdEJ1c3koZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuYnVzeVNsb3RzICYmIHRoaXMuYnVzeVNsb3RzLmhhcyhkYXRldGltZSk7XG4gIH1cblxuICAvKipcbiAgICogaWYgc2xvdCBpcyBvbiBwcmV2aW91cyAoZGF0ZSBwbHVzIHTDtHQpXG4gICAqL1xuICBpc1Nsb3RFYXJseShkYXk6IERheSwgdGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICByZXR1cm4gKHRoaXMuZWFybHlTbG90cyAmJiB0aGlzLmVhcmx5U2xvdHMuaGFzKGRhdGV0aW1lKSlcbiAgICAgIHx8ICh0aGlzLnBhdXNlU2xvdHMgJiYgdGhpcy5wYXVzZVNsb3RzLmhhcyhkYXRldGltZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGlzIFNsb3QgaW4gY3VycmVudCBhY3Rpdml0aWVzXG4gICAqL1xuICBpc1Nsb3RJblNlc3Npb24oZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbnNTbG90cyAmJiB0aGlzLnNlc3Npb25zU2xvdHMuaGFzKGRhdGV0aW1lKTtcbiAgfVxuXG4gIGlzU2xvdFNlc3Npb25TdGFydChkYXk6IERheSwgdGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICByZXR1cm4gdGhpcy5zZXNzaW9ucyAmJiB0aGlzLnNlc3Npb25zLmhhcyhkYXRldGltZSk7XG4gIH1cblxuICBpc1Nsb3RTZXNzaW9uRW5kKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIHJldHVybiB0aGlzLnNlc3Npb25zRW5kU2xvdHMgJiYgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmhhcyhkYXRldGltZSk7XG4gIH1cbn1cbiJdfQ==