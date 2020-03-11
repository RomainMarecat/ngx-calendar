import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment_ from 'moment';
import { EventType } from '../../shared/event/event';
import { SessionService } from '../../shared/session/session.service';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/session/session.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/icon";
function CalendarBodyComponent_tr_3_th_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 8);
    i0.ɵɵelementStart(1, "span", 9);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r3 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(day_r3.title);
} }
function CalendarBodyComponent_tr_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 6);
    i0.ɵɵtemplate(1, CalendarBodyComponent_tr_3_th_1_Template, 3, 1, "th", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.days);
} }
function CalendarBodyComponent_td_6_div_1_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵlistener("click", function CalendarBodyComponent_td_6_div_1_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r16); const time_r8 = i0.ɵɵnextContext().$implicit; const day_r4 = i0.ɵɵnextContext().$implicit; const ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.onTimeSlotClicked(day_r4, time_r8); });
    i0.ɵɵelementStart(1, "span", 21);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const time_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(time_r8);
} }
function CalendarBodyComponent_td_6_div_1_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const time_r8 = i0.ɵɵnextContext().$implicit;
    const day_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r11 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r11.getSessionTitle(day_r4, time_r8), " ");
} }
function CalendarBodyComponent_td_6_div_1_mat_icon_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 23);
    i0.ɵɵtext(1, " close ");
    i0.ɵɵelementEnd();
} }
function CalendarBodyComponent_td_6_div_1_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r13.bodyConfiguration.calendar.availability.empty);
} }
function CalendarBodyComponent_td_6_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelementStart(1, "div", 14);
    i0.ɵɵtemplate(2, CalendarBodyComponent_td_6_div_1_button_2_Template, 3, 1, "button", 15);
    i0.ɵɵtemplate(3, CalendarBodyComponent_td_6_div_1_ng_template_3_Template, 2, 1, "ng-template", null, 16, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementStart(5, "a", 17);
    i0.ɵɵlistener("click", function CalendarBodyComponent_td_6_div_1_Template_a_click_5_listener() { i0.ɵɵrestoreView(_r23); const time_r8 = ctx.$implicit; const day_r4 = i0.ɵɵnextContext().$implicit; const ctx_r21 = i0.ɵɵnextContext(); return ctx_r21.onTimeSlotClicked(day_r4, time_r8); });
    i0.ɵɵtemplate(6, CalendarBodyComponent_td_6_div_1_mat_icon_6_Template, 2, 0, "mat-icon", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, CalendarBodyComponent_td_6_div_1_div_7_Template, 3, 1, "div", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const time_r8 = ctx.$implicit;
    const _r10 = i0.ɵɵreference(4);
    const day_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("busy", ctx_r6.isSlotBusy(day_r4, time_r8))("early", ctx_r6.isSlotEarly(day_r4, time_r8))("session", ctx_r6.isSlotInSession(day_r4, time_r8))("session-start", ctx_r6.isSlotSessionStart(day_r4, time_r8))("session-end", ctx_r6.isSlotSessionEnd(day_r4, time_r8));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r6.isDateTimeInSessionsFromCurrentUser(day_r4, time_r8))("ngIfElse", _r10);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r6.isDateTimeInSessionsFromCurrentUser(day_r4, time_r8));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.getAvailabilities(day_r4.key).length <= 0 || ctx_r6.isDayBusy(day_r4, time_r8));
} }
function CalendarBodyComponent_td_6_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵelementStart(1, "button", 26);
    i0.ɵɵlistener("click", function CalendarBodyComponent_td_6_div_2_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r26); const ctx_r25 = i0.ɵɵnextContext(2); return ctx_r25.onNextDay(); });
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "mat-icon");
    i0.ɵɵtext(5, "keyboard_arrow_right");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("title", ctx_r7.bodyConfiguration.calendar.availability.slot);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r7.bodyConfiguration.calendar.availability.slot);
} }
function CalendarBodyComponent_td_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 10);
    i0.ɵɵtemplate(1, CalendarBodyComponent_td_6_div_1_Template, 8, 14, "div", 11);
    i0.ɵɵtemplate(2, CalendarBodyComponent_td_6_div_2_Template, 6, 2, "div", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r4 = ctx.$implicit;
    const keyDay_r5 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("id", day_r4.key);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.getAvailabilities(day_r4.key));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.isAllSlotNotAvailable() && keyDay_r5 === ctx_r1.days.length - 1);
} }
const moment = moment_;
export class CalendarBodyComponent {
    constructor(sessionService) {
        this.sessionService = sessionService;
        this.sessionAdded = new EventEmitter();
        this.sessionRemoved = new EventEmitter();
        this.startChanged = new EventEmitter();
        this.endChanged = new EventEmitter();
        this.slotLocked = new EventEmitter();
    }
    ngOnInit() {
        this.sessionService.sessions
            .subscribe((sessions) => {
            this.sessions = sessions;
        });
    }
    /**
     * On click next day button, trigger switch start
     */
    onNextDay() {
        let daysNb = 1;
        if (this.viewMode === 'week') {
            daysNb = 7;
        }
        this.start = moment(this.start).add(daysNb, 'day');
        this.startChanged.emit(this.start);
    }
    /**
     * If all slot is not avalaibles all all days
     */
    isAllSlotNotAvailable() {
        if (this.days && this.days.length > 0) {
            return this.days.filter((day) => this.daysAvailability.get(day.key).length > 0).length === 0;
        }
    }
    /**
     * All Availabilities by key: string, title: string, value: Moment
     */
    getAvailabilities(day) {
        return this.daysAvailability.get(day);
    }
    getSessionTitle(day, time) {
        const datetime = day.value.format('YYYY-MM-DD') + time;
        if (this.sessions && this.sessions.has(datetime)) {
            const session = this.sessions.get(datetime);
            return moment(session.start).format('HH:mm') + ' - ' + moment(session.end).format('HH:mm');
        }
        return '';
    }
    getSessionTooltip(day, time) {
        const datetime = day.value.format('YYYY-MM-DD') + time;
        if (this.sessions && this.sessions.has(datetime)) {
            const session = this.sessions.get(datetime);
            if (session.comment) {
                return session.comment;
            }
        }
        return '';
    }
    onTimeSlotClicked(day, time) {
        const datetime = day.value.format('YYYY-MM-DD') + time;
        if (this.isSlotBusy(day, time) || this.isSlotEarly(day, time)) {
            this.slotLocked.emit(true);
            return;
        }
        if (!this.isDateTimeInSessionsFromCurrentUser(day, time)) {
            const mmtStart = moment(datetime, 'YYYY-MM-DDHH:mm');
            const mmtEnd = mmtStart.clone().add(this.onlineSession.duration, 'minutes');
            this.addSession(mmtStart, mmtEnd);
            return;
        }
        if (this.sessions.has(datetime)) {
            const session = this.sessions.get(datetime);
            const source = { key: datetime, session };
            this.removeSession(source);
            return;
        }
    }
    addSession(start, end) {
        // To prevent a stringify Date without good timezone
        Date.prototype.toJSON = function () {
            return moment(this).format();
        };
        // Create session
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
    removeSession(source) {
        this.sessionRemoved.emit(source);
    }
    /**
     * If day is busy (occupé) by current key string
     */
    isDayBusy(day, time) {
        const datetime = day.value.format('YYYY-MM-DD') + time;
        return this.daysBusySlotNumber && this.daysAvailabilitySlotNumber
            && this.daysBusySlotNumber.has(datetime) && this.daysAvailabilitySlotNumber.has(datetime)
            && this.daysBusySlotNumber.get(datetime) >= this.daysAvailabilitySlotNumber.get(datetime);
    }
    /**
     * If slot is busy by date
     */
    isSlotBusy(day, time) {
        const datetime = day.value.format('YYYY-MM-DD') + time;
        return this.busySlots && this.busySlots.has(datetime);
    }
    /**
     * if slot is on previous (date plus tôt)
     */
    isSlotEarly(day, time) {
        const datetime = day.value.format('YYYY-MM-DD') + time;
        return (this.earlySlots && this.earlySlots.has(datetime))
            || (this.pauseSlots && this.pauseSlots.has(datetime));
    }
    /**
     * is Slot in current activities
     */
    isSlotInSession(day, time) {
        const datetime = day.value.format('YYYY-MM-DD') + time;
        return this.sessionsSlots && this.sessionsSlots.has(datetime);
    }
    isDateTimeInSessionsFromCurrentUser(day, time) {
        const datetime = day.value.format('YYYY-MM-DD') + time;
        const session = this.sessions.get(datetime);
        return this.sessions &&
            this.sessions.has(datetime) &&
            this.sessionsSlots.has(datetime) &&
            this.sessionsSlots.has(moment(session.end).format('YYYY-MM-DDHH:mm')) &&
            this.sessionsStartSlots.has(datetime) &&
            this.sessionsEndSlots.has(moment(session.end).format('YYYY-MM-DDHH:mm'));
    }
    isSlotSessionStart(day, time) {
        const datetime = day.value.format('YYYY-MM-DD') + time;
        return this.sessionsSlots &&
            this.sessionsSlots.has(datetime) &&
            this.sessionsStartSlots.has(datetime);
    }
    isSlotSessionEnd(day, time) {
        const datetime = day.value.format('YYYY-MM-DD') + time;
        const session = this.sessions.get(datetime);
        return (this.sessionsSlots &&
            this.sessionsSlots.has(datetime) &&
            this.sessionsEndSlots.has(datetime)) ||
            (this.sessionsStartSlots.has(datetime) &&
                session &&
                this.sessionsEndSlots.has(moment(session.end).format('YYYY-MM-DDHH:mm')));
    }
}
CalendarBodyComponent.ɵfac = function CalendarBodyComponent_Factory(t) { return new (t || CalendarBodyComponent)(i0.ɵɵdirectiveInject(i1.SessionService)); };
CalendarBodyComponent.ɵcmp = i0.ɵɵdefineComponent({ type: CalendarBodyComponent, selectors: [["lib-calendar-body"]], inputs: { user: "user", customer: "customer", onlineSession: "onlineSession", viewMode: "viewMode", start: "start", end: "end", days: "days", daysAvailability: "daysAvailability", daysBusySlotNumber: "daysBusySlotNumber", daysAvailabilitySlotNumber: "daysAvailabilitySlotNumber", busySlots: "busySlots", earlySlots: "earlySlots", pauseSlots: "pauseSlots", sessionsSlots: "sessionsSlots", sessionsEndSlots: "sessionsEndSlots", sessionsStartSlots: "sessionsStartSlots", bodyConfiguration: "bodyConfiguration" }, outputs: { sessionAdded: "sessionAdded", sessionRemoved: "sessionRemoved", startChanged: "startChanged", endChanged: "endChanged", slotLocked: "slotLocked" }, decls: 7, vars: 2, consts: [[1, "calendar-body-wrapper"], [1, "calendar-body-table-wrapper", "table", "table-bordered"], [1, "calendar-body-table-head"], ["class", "calendar-body-head-day-row", 4, "ngIf"], [1, "calendar-body-row"], ["class", "calendar-body-column-content text-center", 4, "ngFor", "ngForOf"], [1, "calendar-body-head-day-row"], ["class", "calendar-body-day-header text-center", 4, "ngFor", "ngForOf"], [1, "calendar-body-day-header", "text-center"], [1, "truncate"], [1, "calendar-body-column-content", "text-center"], ["class", "time-slot", 3, "busy", "early", "session", "session-start", "session-end", 4, "ngFor", "ngForOf"], ["class", "next-slot", 4, "ngIf"], [1, "time-slot"], [1, "time-content"], ["type", "button", "class", "slot-available", 3, "click", 4, "ngIf", "ngIfElse"], ["sessionTitle", ""], [1, "link-close", 3, "click"], ["class", "icon-close", 4, "ngIf"], ["class", "slot-busy", 4, "ngIf"], ["type", "button", 1, "slot-available", 3, "click"], [1, "default-time"], ["type", "button", 1, "slot-session"], [1, "icon-close"], [1, "slot-busy"], [1, "next-slot"], ["type", "button", "role", "button", 3, "title", "click"]], template: function CalendarBodyComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "table", 1);
        i0.ɵɵelementStart(2, "thead", 2);
        i0.ɵɵtemplate(3, CalendarBodyComponent_tr_3_Template, 2, 1, "tr", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "tbody");
        i0.ɵɵelementStart(5, "tr", 4);
        i0.ɵɵtemplate(6, CalendarBodyComponent_td_6_Template, 3, 3, "td", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.viewMode !== "day");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.days);
    } }, directives: [i2.NgIf, i2.NgForOf, i3.MatIcon], styles: [".calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]{max-width:240px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot[_ngcontent-%COMP%]{padding:5px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);font-family:Lato,Roboto,sans-serif;font-size:14px;font-weight:500}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot[_ngcontent-%COMP%]   button.slot-available[_ngcontent-%COMP%]{cursor:pointer;width:120px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot[_ngcontent-%COMP%]:hover   button.slot-available[_ngcontent-%COMP%]{background-color:#006400;color:#fff}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.busy[_ngcontent-%COMP%]{display:none}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.busy[_ngcontent-%COMP%]   button.slot-available[_ngcontent-%COMP%]{color:#8b0000;cursor:not-allowed}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.early[_ngcontent-%COMP%]   button.slot-available[_ngcontent-%COMP%]{cursor:not-allowed;color:orange}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]{position:relative;padding:0}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]   .slot-session[_ngcontent-%COMP%]{width:120px;background-color:#ff8c00}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]   .link-close[_ngcontent-%COMP%]   .icon-close[_ngcontent-%COMP%]{position:absolute;right:11px;top:4px;font-size:14px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]   .link-close[_ngcontent-%COMP%], .calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]   .link-close[_ngcontent-%COMP%]:hover{cursor:pointer}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session-start[_ngcontent-%COMP%]{border-top-left-radius:3px;border-top-right-radius:3px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session-start[_ngcontent-%COMP%]   .slot-session[_ngcontent-%COMP%]{color:#000;cursor:text}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session-end[_ngcontent-%COMP%]{border-bottom-left-radius:3px;border-bottom-right-radius:3px}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CalendarBodyComponent, [{
        type: Component,
        args: [{
                selector: 'lib-calendar-body',
                templateUrl: './calendar-body.component.html',
                styleUrls: ['./calendar-body.component.scss']
            }]
    }], function () { return [{ type: i1.SessionService }]; }, { user: [{
            type: Input
        }], customer: [{
            type: Input
        }], onlineSession: [{
            type: Input
        }], viewMode: [{
            type: Input
        }], start: [{
            type: Input
        }], end: [{
            type: Input
        }], days: [{
            type: Input
        }], daysAvailability: [{
            type: Input
        }], daysBusySlotNumber: [{
            type: Input
        }], daysAvailabilitySlotNumber: [{
            type: Input
        }], busySlots: [{
            type: Input
        }], earlySlots: [{
            type: Input
        }], pauseSlots: [{
            type: Input
        }], sessionsSlots: [{
            type: Input
        }], sessionsEndSlots: [{
            type: Input
        }], sessionsStartSlots: [{
            type: Input
        }], bodyConfiguration: [{
            type: Input
        }], sessionAdded: [{
            type: Output
        }], sessionRemoved: [{
            type: Output
        }], startChanged: [{
            type: Output
        }], endChanged: [{
            type: Output
        }], slotLocked: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm9tYWlubWFyZWNhdC9uZ3gtY2FsZW5kYXIvIiwic291cmNlcyI6WyJsaWIvY2FsZW5kYXIvY2FsZW5kYXItYm9keS9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC50cyIsImxpYi9jYWxlbmRhci9jYWxlbmRhci1ib2R5L2NhbGVuZGFyLWJvZHkuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUlsQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7Ozs7SUNIaEUsNkJBRUU7SUFBQSwrQkFBdUI7SUFBQSxZQUFlO0lBQUEsaUJBQU87SUFDL0MsaUJBQUs7OztJQURvQixlQUFlO0lBQWYsa0NBQWU7OztJQUoxQyw2QkFFRTtJQUFBLHlFQUVFO0lBRUosaUJBQUs7OztJQUhDLGVBQXdCO0lBQXhCLHFDQUF3Qjs7OztJQWtCdEIsa0NBSUU7SUFGTSwyVEFBc0M7SUFFNUMsZ0NBQTJCO0lBQUEsWUFBVTtJQUFBLGlCQUFPO0lBQzlDLGlCQUFTOzs7SUFEb0IsZUFBVTtJQUFWLDZCQUFVOzs7SUFHckMsa0NBRUU7SUFBQSxZQUNGO0lBQUEsaUJBQVM7Ozs7O0lBRFAsZUFDRjtJQURFLHlFQUNGOzs7SUFHQSxvQ0FFRTtJQUFBLHVCQUNGO0lBQUEsaUJBQVc7OztJQUdmLCtCQUVFO0lBQUEsNEJBQU07SUFBQSxZQUFpRDtJQUFBLGlCQUFPO0lBQ2hFLGlCQUFNOzs7SUFERSxlQUFpRDtJQUFqRCwyRUFBaUQ7Ozs7SUE3QjNELCtCQU9FO0lBQUEsK0JBQ0U7SUFBQSx3RkFJ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QUFyQixxQkFBcUI7UUNqQmxDLDhCQUNFO1FBQUEsZ0NBQ0U7UUFBQSxnQ0FDQTtRQUFBLG9FQUVFO1FBS0YsaUJBQVE7UUFDUiw2QkFDQTtRQUFBLDZCQUNFO1FBQUEsb0VBR0U7UUEyQ0osaUJBQUs7UUFDTCxpQkFBUTtRQUNWLGlCQUFRO1FBQ1YsaUJBQU07O1FBMURFLGVBQTBCO1FBQTFCLDZDQUEwQjtRQVd4QixlQUE0QztRQUE1QyxrQ0FBNEM7O2tEREV6QyxxQkFBcUI7Y0FMakMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFdBQVcsRUFBRSxnQ0FBZ0M7Z0JBQzdDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO2FBQzlDOztrQkFLRSxLQUFLOztrQkFJTCxLQUFLOztrQkFJTCxLQUFLOztrQkFJTCxLQUFLOztrQkFJTCxLQUFLOztrQkFJTCxLQUFLOztrQkFJTCxLQUFLOztrQkFFTCxLQUFLOztrQkFDTCxLQUFLOztrQkFDTCxLQUFLOztrQkFDTCxLQUFLOztrQkFDTCxLQUFLOztrQkFDTCxLQUFLOztrQkFDTCxLQUFLOztrQkFDTCxLQUFLOztrQkFDTCxLQUFLOztrQkFLTCxLQUFLOztrQkFFTCxNQUFNOztrQkFDTixNQUFNOztrQkFFTixNQUFNOztrQkFDTixNQUFNOztrQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IENhbGVuZGFyQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9jb25maWd1cmF0aW9uL2NhbGVuZGFyLWNvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgRGF5IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2RheS9kYXknO1xuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2V2ZW50L2V2ZW50JztcbmltcG9ydCB7IE9ubGluZVNlc3Npb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvc2Vzc2lvbi9vbmxpbmUtc2Vzc2lvbic7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3Nlc3Npb24vc2Vzc2lvbic7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1jYWxlbmRhci1ib2R5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLWJvZHkuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJCb2R5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqXG4gICAqIFVzZXIgY291bGQgYmUgcGFzc2VkIHRvIHNob3cgc2Vzc2lvbiBvd25lclxuICAgKi9cbiAgQElucHV0KCkgdXNlcjogYW55O1xuICAvKipcbiAgICogQ3VzdG9tZXIgY291bGQgYmUgcGFzc2VkIHRvIGdlbmVyYXRlIGEgcGVyc29uYWwgY2FsZW5kYXJcbiAgICovXG4gIEBJbnB1dCgpIGN1c3RvbWVyOiBhbnk7XG4gIC8qKlxuICAgKiBjdXJyZW50IG9ubGluZSBzZXNzaW9uXG4gICAqL1xuICBASW5wdXQoKSBvbmxpbmVTZXNzaW9uOiBPbmxpbmVTZXNzaW9uO1xuICAvKipcbiAgICogVmlldyBtb2RlIGlucHV0XG4gICAqL1xuICBASW5wdXQoKSB2aWV3TW9kZTogc3RyaW5nO1xuICAvKipcbiAgICogU3RhcnQgZGF5IHdlZWtcbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0OiBNb21lbnQ7XG4gIC8qKlxuICAgKiBFbmQgZGF5IHdlZWtcbiAgICovXG4gIEBJbnB1dCgpIGVuZDogTW9tZW50O1xuICAvKipcbiAgICogRGF5IG9mIGN1cnJldG4gd2Vla1xuICAgKi9cbiAgQElucHV0KCkgZGF5czogQXJyYXk8RGF5PjtcblxuICBASW5wdXQoKSBkYXlzQXZhaWxhYmlsaXR5OiBNYXA8c3RyaW5nLCBzdHJpbmdbXT47XG4gIEBJbnB1dCgpIGRheXNCdXN5U2xvdE51bWJlcjogTWFwPHN0cmluZywgbnVtYmVyPjtcbiAgQElucHV0KCkgZGF5c0F2YWlsYWJpbGl0eVNsb3ROdW1iZXI6IE1hcDxzdHJpbmcsIG51bWJlcj47XG4gIEBJbnB1dCgpIGJ1c3lTbG90czogU2V0PHN0cmluZz47XG4gIEBJbnB1dCgpIGVhcmx5U2xvdHM6IFNldDxzdHJpbmc+O1xuICBASW5wdXQoKSBwYXVzZVNsb3RzOiBTZXQ8c3RyaW5nPjtcbiAgQElucHV0KCkgc2Vzc2lvbnNTbG90czogU2V0PHN0cmluZz47XG4gIEBJbnB1dCgpIHNlc3Npb25zRW5kU2xvdHM6IFNldDxzdHJpbmc+O1xuICBASW5wdXQoKSBzZXNzaW9uc1N0YXJ0U2xvdHM6IFNldDxzdHJpbmc+O1xuICBzZXNzaW9uczogTWFwPHN0cmluZywgU2Vzc2lvbj47XG4gIC8qKlxuICAgKiBDb25maWd1cmF0aW9uIGJvZHlcbiAgICovXG4gIEBJbnB1dCgpIGJvZHlDb25maWd1cmF0aW9uOiBDYWxlbmRhckNvbmZpZ3VyYXRpb247XG5cbiAgQE91dHB1dCgpIHNlc3Npb25BZGRlZDogRXZlbnRFbWl0dGVyPFNlc3Npb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZXNzaW9uPigpO1xuICBAT3V0cHV0KCkgc2Vzc2lvblJlbW92ZWQ6IEV2ZW50RW1pdHRlcjx7a2V5OiBzdHJpbmcsIHNlc3Npb246IFNlc3Npb259PlxuICAgID0gbmV3IEV2ZW50RW1pdHRlcjx7a2V5OiBzdHJpbmcsIHNlc3Npb246IFNlc3Npb259PigpO1xuICBAT3V0cHV0KCkgc3RhcnRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8TW9tZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW9tZW50PigpO1xuICBAT3V0cHV0KCkgZW5kQ2hhbmdlZDogRXZlbnRFbWl0dGVyPE1vbWVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vbWVudD4oKTtcbiAgQE91dHB1dCgpIHNsb3RMb2NrZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5zZXNzaW9uc1xuICAgICAgLnN1YnNjcmliZSgoc2Vzc2lvbnMpID0+IHtcbiAgICAgICAgdGhpcy5zZXNzaW9ucyA9IHNlc3Npb25zO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogT24gY2xpY2sgbmV4dCBkYXkgYnV0dG9uLCB0cmlnZ2VyIHN3aXRjaCBzdGFydFxuICAgKi9cbiAgb25OZXh0RGF5KCkge1xuICAgIGxldCBkYXlzTmIgPSAxO1xuICAgIGlmICh0aGlzLnZpZXdNb2RlID09PSAnd2VlaycpIHtcbiAgICAgIGRheXNOYiA9IDc7XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCkuYWRkKGRheXNOYiwgJ2RheScpO1xuICAgIHRoaXMuc3RhcnRDaGFuZ2VkLmVtaXQodGhpcy5zdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogSWYgYWxsIHNsb3QgaXMgbm90IGF2YWxhaWJsZXMgYWxsIGFsbCBkYXlzXG4gICAqL1xuICBpc0FsbFNsb3ROb3RBdmFpbGFibGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZGF5cyAmJiB0aGlzLmRheXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF5cy5maWx0ZXIoKGRheSkgPT4gdGhpcy5kYXlzQXZhaWxhYmlsaXR5LmdldChkYXkua2V5KS5sZW5ndGggPiAwKS5sZW5ndGggPT09IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFsbCBBdmFpbGFiaWxpdGllcyBieSBrZXk6IHN0cmluZywgdGl0bGU6IHN0cmluZywgdmFsdWU6IE1vbWVudFxuICAgKi9cbiAgZ2V0QXZhaWxhYmlsaXRpZXMoZGF5OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuZGF5c0F2YWlsYWJpbGl0eS5nZXQoZGF5KTtcbiAgfVxuXG4gIGdldFNlc3Npb25UaXRsZShkYXk6IERheSwgdGltZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIGlmICh0aGlzLnNlc3Npb25zICYmIHRoaXMuc2Vzc2lvbnMuaGFzKGRhdGV0aW1lKSkge1xuICAgICAgY29uc3Qgc2Vzc2lvbjogU2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbnMuZ2V0KGRhdGV0aW1lKTtcbiAgICAgIHJldHVybiBtb21lbnQoc2Vzc2lvbi5zdGFydCkuZm9ybWF0KCdISDptbScpICsgJyAtICcgKyBtb21lbnQoc2Vzc2lvbi5lbmQpLmZvcm1hdCgnSEg6bW0nKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgZ2V0U2Vzc2lvblRvb2x0aXAoZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG4gICAgaWYgKHRoaXMuc2Vzc2lvbnMgJiYgdGhpcy5zZXNzaW9ucy5oYXMoZGF0ZXRpbWUpKSB7XG4gICAgICBjb25zdCBzZXNzaW9uID0gdGhpcy5zZXNzaW9ucy5nZXQoZGF0ZXRpbWUpO1xuICAgICAgaWYgKHNlc3Npb24uY29tbWVudCkge1xuICAgICAgICByZXR1cm4gc2Vzc2lvbi5jb21tZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIG9uVGltZVNsb3RDbGlja2VkKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIGlmICh0aGlzLmlzU2xvdEJ1c3koZGF5LCB0aW1lKSB8fCB0aGlzLmlzU2xvdEVhcmx5KGRheSwgdGltZSkpIHtcbiAgICAgIHRoaXMuc2xvdExvY2tlZC5lbWl0KHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc0RhdGVUaW1lSW5TZXNzaW9uc0Zyb21DdXJyZW50VXNlcihkYXksIHRpbWUpKSB7XG4gICAgICBjb25zdCBtbXRTdGFydCA9IG1vbWVudChkYXRldGltZSwgJ1lZWVktTU0tRERISDptbScpO1xuICAgICAgY29uc3QgbW10RW5kID0gbW10U3RhcnQuY2xvbmUoKS5hZGQodGhpcy5vbmxpbmVTZXNzaW9uLmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgdGhpcy5hZGRTZXNzaW9uKG1tdFN0YXJ0LCBtbXRFbmQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNlc3Npb25zLmhhcyhkYXRldGltZSkpIHtcbiAgICAgIGNvbnN0IHNlc3Npb24gPSB0aGlzLnNlc3Npb25zLmdldChkYXRldGltZSk7XG4gICAgICBjb25zdCBzb3VyY2UgPSB7a2V5OiBkYXRldGltZSwgc2Vzc2lvbn07XG4gICAgICB0aGlzLnJlbW92ZVNlc3Npb24oc291cmNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBhZGRTZXNzaW9uKHN0YXJ0OiBNb21lbnQsIGVuZDogTW9tZW50KSB7XG5cbiAgICAvLyBUbyBwcmV2ZW50IGEgc3RyaW5naWZ5IERhdGUgd2l0aG91dCBnb29kIHRpbWV6b25lXG4gICAgRGF0ZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbW9tZW50KHRoaXMpLmZvcm1hdCgpO1xuICAgIH07XG5cbiAgICAvLyBDcmVhdGUgc2Vzc2lvblxuICAgIGNvbnN0IHNlc3Npb246IFNlc3Npb24gPSB7XG4gICAgICBpZDogbnVsbCxcbiAgICAgIHN0YXJ0OiBzdGFydC50b0RhdGUoKSxcbiAgICAgIGVuZDogZW5kLnRvRGF0ZSgpLFxuICAgICAgcGF1c2U6IHRoaXMub25saW5lU2Vzc2lvbi5wYXVzZSB8fCAwLFxuICAgICAgZHVyYXRpb246IHRoaXMub25saW5lU2Vzc2lvbi5kdXJhdGlvbixcbiAgICAgIG5iX3BlcnNvbnM6IDEsXG4gICAgICBldmVudF90eXBlOiBFdmVudFR5cGUuc2Vzc2lvbixcbiAgICAgIGNvbW1lbnQ6IHRoaXMuYm9keUNvbmZpZ3VyYXRpb24uY2FsZW5kYXIuc2Vzc2lvbi5pbmZvLFxuICAgICAgdXNlcjogdGhpcy51c2VyLFxuICAgICAgY3VzdG9tZXJzOiBbdGhpcy5jdXN0b21lcl1cbiAgICB9O1xuICAgIHRoaXMuc2Vzc2lvbkFkZGVkLmVtaXQoc2Vzc2lvbik7XG4gIH1cblxuICByZW1vdmVTZXNzaW9uKHNvdXJjZToge2tleTogc3RyaW5nLCBzZXNzaW9uOiBTZXNzaW9ufSkge1xuICAgIHRoaXMuc2Vzc2lvblJlbW92ZWQuZW1pdChzb3VyY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIGRheSBpcyBidXN5IChvY2N1cMOpKSBieSBjdXJyZW50IGtleSBzdHJpbmdcbiAgICovXG4gIGlzRGF5QnVzeShkYXk6IERheSwgdGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICByZXR1cm4gdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIgJiYgdGhpcy5kYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlclxuICAgICAgJiYgdGhpcy5kYXlzQnVzeVNsb3ROdW1iZXIuaGFzKGRhdGV0aW1lKSAmJiB0aGlzLmRheXNBdmFpbGFiaWxpdHlTbG90TnVtYmVyLmhhcyhkYXRldGltZSlcbiAgICAgICYmIHRoaXMuZGF5c0J1c3lTbG90TnVtYmVyLmdldChkYXRldGltZSkgPj0gdGhpcy5kYXlzQXZhaWxhYmlsaXR5U2xvdE51bWJlci5nZXQoZGF0ZXRpbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIHNsb3QgaXMgYnVzeSBieSBkYXRlXG4gICAqL1xuICBpc1Nsb3RCdXN5KGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIHJldHVybiB0aGlzLmJ1c3lTbG90cyAmJiB0aGlzLmJ1c3lTbG90cy5oYXMoZGF0ZXRpbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGlmIHNsb3QgaXMgb24gcHJldmlvdXMgKGRhdGUgcGx1cyB0w7R0KVxuICAgKi9cbiAgaXNTbG90RWFybHkoZGF5OiBEYXksIHRpbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBzdHJpbmcgPSBkYXkudmFsdWUuZm9ybWF0KCdZWVlZLU1NLUREJykgKyB0aW1lO1xuXG4gICAgcmV0dXJuICh0aGlzLmVhcmx5U2xvdHMgJiYgdGhpcy5lYXJseVNsb3RzLmhhcyhkYXRldGltZSkpXG4gICAgICB8fCAodGhpcy5wYXVzZVNsb3RzICYmIHRoaXMucGF1c2VTbG90cy5oYXMoZGF0ZXRpbWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpcyBTbG90IGluIGN1cnJlbnQgYWN0aXZpdGllc1xuICAgKi9cbiAgaXNTbG90SW5TZXNzaW9uKGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIHJldHVybiB0aGlzLnNlc3Npb25zU2xvdHMgJiYgdGhpcy5zZXNzaW9uc1Nsb3RzLmhhcyhkYXRldGltZSk7XG4gIH1cblxuICBpc0RhdGVUaW1lSW5TZXNzaW9uc0Zyb21DdXJyZW50VXNlcihkYXk6IERheSwgdGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICBjb25zdCBzZXNzaW9uID0gdGhpcy5zZXNzaW9ucy5nZXQoZGF0ZXRpbWUpO1xuXG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbnMgJiZcbiAgICAgIHRoaXMuc2Vzc2lvbnMuaGFzKGRhdGV0aW1lKSAmJlxuICAgICAgdGhpcy5zZXNzaW9uc1Nsb3RzLmhhcyhkYXRldGltZSkgJiZcbiAgICAgIHRoaXMuc2Vzc2lvbnNTbG90cy5oYXMobW9tZW50KHNlc3Npb24uZW5kKS5mb3JtYXQoJ1lZWVktTU0tRERISDptbScpKSAmJlxuICAgICAgdGhpcy5zZXNzaW9uc1N0YXJ0U2xvdHMuaGFzKGRhdGV0aW1lKSAmJlxuICAgICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmhhcyhtb21lbnQoc2Vzc2lvbi5lbmQpLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpO1xuICB9XG5cbiAgaXNTbG90U2Vzc2lvblN0YXJ0KGRheTogRGF5LCB0aW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRldGltZTogc3RyaW5nID0gZGF5LnZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgdGltZTtcblxuICAgIHJldHVybiB0aGlzLnNlc3Npb25zU2xvdHMgJiZcbiAgICAgIHRoaXMuc2Vzc2lvbnNTbG90cy5oYXMoZGF0ZXRpbWUpICYmXG4gICAgICB0aGlzLnNlc3Npb25zU3RhcnRTbG90cy5oYXMoZGF0ZXRpbWUpO1xuICB9XG5cbiAgaXNTbG90U2Vzc2lvbkVuZChkYXk6IERheSwgdGltZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZXRpbWU6IHN0cmluZyA9IGRheS52YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSArIHRpbWU7XG5cbiAgICBjb25zdCBzZXNzaW9uID0gdGhpcy5zZXNzaW9ucy5nZXQoZGF0ZXRpbWUpO1xuXG4gICAgcmV0dXJuICh0aGlzLnNlc3Npb25zU2xvdHMgJiZcbiAgICAgIHRoaXMuc2Vzc2lvbnNTbG90cy5oYXMoZGF0ZXRpbWUpICYmXG4gICAgICB0aGlzLnNlc3Npb25zRW5kU2xvdHMuaGFzKGRhdGV0aW1lKSkgfHxcbiAgICAgICh0aGlzLnNlc3Npb25zU3RhcnRTbG90cy5oYXMoZGF0ZXRpbWUpICYmXG4gICAgICAgIHNlc3Npb24gJiZcbiAgICAgICAgdGhpcy5zZXNzaW9uc0VuZFNsb3RzLmhhcyhtb21lbnQoc2Vzc2lvbi5lbmQpLmZvcm1hdCgnWVlZWS1NTS1EREhIOm1tJykpKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImNhbGVuZGFyLWJvZHktd3JhcHBlclwiPlxuICA8dGFibGUgY2xhc3M9XCJjYWxlbmRhci1ib2R5LXRhYmxlLXdyYXBwZXIgdGFibGUgdGFibGUtYm9yZGVyZWRcIj5cbiAgICA8dGhlYWQgY2xhc3M9XCJjYWxlbmRhci1ib2R5LXRhYmxlLWhlYWRcIj5cbiAgICA8dHIgY2xhc3M9XCJjYWxlbmRhci1ib2R5LWhlYWQtZGF5LXJvd1wiXG4gICAgICAgICpuZ0lmPVwidmlld01vZGUgIT09ICdkYXknXCI+XG4gICAgICA8dGggY2xhc3M9XCJjYWxlbmRhci1ib2R5LWRheS1oZWFkZXIgdGV4dC1jZW50ZXJcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5c1wiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInRydW5jYXRlXCI+e3sgZGF5LnRpdGxlIH19PC9zcGFuPlxuICAgICAgPC90aD5cbiAgICA8L3RyPlxuICAgIDwvdGhlYWQ+XG4gICAgPHRib2R5PlxuICAgIDx0ciBjbGFzcz1cImNhbGVuZGFyLWJvZHktcm93XCI+XG4gICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1ib2R5LWNvbHVtbi1jb250ZW50IHRleHQtY2VudGVyXCJcbiAgICAgICAgICBbYXR0ci5pZF09XCJkYXkua2V5XCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheXM7IGxldCBrZXlEYXkgPSBpbmRleFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1zbG90XCJcbiAgICAgICAgICAgICBbY2xhc3MuYnVzeV09XCJpc1Nsb3RCdXN5KGRheSwgdGltZSlcIlxuICAgICAgICAgICAgIFtjbGFzcy5lYXJseV09XCJpc1Nsb3RFYXJseShkYXksIHRpbWUpXCJcbiAgICAgICAgICAgICBbY2xhc3Muc2Vzc2lvbl09XCJpc1Nsb3RJblNlc3Npb24oZGF5LCB0aW1lKVwiXG4gICAgICAgICAgICAgW2NsYXNzLnNlc3Npb24tc3RhcnRdPVwiaXNTbG90U2Vzc2lvblN0YXJ0KGRheSwgdGltZSlcIlxuICAgICAgICAgICAgIFtjbGFzcy5zZXNzaW9uLWVuZF09XCJpc1Nsb3RTZXNzaW9uRW5kKGRheSwgdGltZSlcIlxuICAgICAgICAgICAgICpuZ0Zvcj1cImxldCB0aW1lIG9mIGdldEF2YWlsYWJpbGl0aWVzKGRheS5rZXkpXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtY29udGVudFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzbG90LWF2YWlsYWJsZVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvblRpbWVTbG90Q2xpY2tlZChkYXksIHRpbWUpXCJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhaXNEYXRlVGltZUluU2Vzc2lvbnNGcm9tQ3VycmVudFVzZXIoZGF5LCB0aW1lKTsgZWxzZSBzZXNzaW9uVGl0bGVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZWZhdWx0LXRpbWVcIj57eyB0aW1lIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3Nlc3Npb25UaXRsZT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNsb3Qtc2Vzc2lvblwiPlxuICAgICAgICAgICAgICAgIHt7IGdldFNlc3Npb25UaXRsZShkYXksIHRpbWUpfX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJsaW5rLWNsb3NlXCIgKGNsaWNrKT1cIm9uVGltZVNsb3RDbGlja2VkKGRheSwgdGltZSlcIj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiaWNvbi1jbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImlzRGF0ZVRpbWVJblNlc3Npb25zRnJvbUN1cnJlbnRVc2VyKGRheSwgdGltZSlcIj5cbiAgICAgICAgICAgICAgICBjbG9zZVxuICAgICAgICAgICAgICA8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzbG90LWJ1c3lcIlxuICAgICAgICAgICAgICAgKm5nSWY9XCJnZXRBdmFpbGFiaWxpdGllcyhkYXkua2V5KS5sZW5ndGggPD0gMCB8fCBpc0RheUJ1c3koZGF5LCB0aW1lKVwiPlxuICAgICAgICAgICAgPHNwYW4+e3tib2R5Q29uZmlndXJhdGlvbi5jYWxlbmRhci5hdmFpbGFiaWxpdHkuZW1wdHl9fTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZXh0LXNsb3RcIlxuICAgICAgICAgICAgICpuZ0lmPVwiaXNBbGxTbG90Tm90QXZhaWxhYmxlKCkgJiYga2V5RGF5ID09PSBkYXlzLmxlbmd0aC0xXCI+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgW3RpdGxlXT1cImJvZHlDb25maWd1cmF0aW9uLmNhbGVuZGFyLmF2YWlsYWJpbGl0eS5zbG90XCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbk5leHREYXkoKVwiPlxuICAgICAgICAgICAgPHNwYW4+e3sgYm9keUNvbmZpZ3VyYXRpb24uY2FsZW5kYXIuYXZhaWxhYmlsaXR5LnNsb3QgfX08L3NwYW4+XG4gICAgICAgICAgICA8bWF0LWljb24+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgICA8L3Rib2R5PlxuICA8L3RhYmxlPlxuPC9kaXY+XG4iXX0=