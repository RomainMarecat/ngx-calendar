import { NgIf, NgForOf, CommonModule } from '@angular/common';
import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵelementStart, ɵɵtext, ɵɵelementEnd, ɵɵadvance, ɵɵtextInterpolate, ɵɵtemplate, ɵɵnextContext, ɵɵproperty, ɵɵgetCurrentView, ɵɵlistener, ɵɵrestoreView, ɵɵtextInterpolate1, ɵɵtemplateRefExtractor, ɵɵreference, ɵɵclassProp, ɵɵattribute, EventEmitter, ɵɵdirectiveInject, ɵɵdefineComponent, Component, Input, Output, ChangeDetectorRef, ɵɵNgOnChangesFeature, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import * as moment_ from 'moment';
import { BehaviorSubject } from 'rxjs';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { DefaultLayoutDirective, DefaultLayoutAlignDirective, DefaultLayoutGapDirective } from '@angular/flex-layout/flex';
import { DefaultShowHideDirective } from '@angular/flex-layout/extended';
import 'twix';

var EventType;
(function (EventType) {
    EventType[EventType["absence"] = 0] = "absence";
    EventType[EventType["session"] = 1] = "session";
})(EventType || (EventType = {}));

class SessionService {
    constructor() {
        this.sessionsEntries$ = new BehaviorSubject([]);
        this.sessions = new BehaviorSubject(new Map());
    }
}
SessionService.ɵfac = function SessionService_Factory(t) { return new (t || SessionService)(); };
SessionService.ɵprov = ɵɵdefineInjectable({ token: SessionService, factory: SessionService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SessionService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

function CalendarBodyComponent_tr_3_th_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "th", 8);
    ɵɵelementStart(1, "span", 9);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const day_r3 = ctx.$implicit;
    ɵɵadvance(2);
    ɵɵtextInterpolate(day_r3.title);
} }
function CalendarBodyComponent_tr_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "tr", 6);
    ɵɵtemplate(1, CalendarBodyComponent_tr_3_th_1_Template, 3, 1, "th", 7);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r0.days);
} }
function CalendarBodyComponent_td_6_div_1_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r16 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 20);
    ɵɵlistener("click", function CalendarBodyComponent_td_6_div_1_button_2_Template_button_click_0_listener() { ɵɵrestoreView(_r16); const time_r8 = ɵɵnextContext().$implicit; const day_r4 = ɵɵnextContext().$implicit; const ctx_r14 = ɵɵnextContext(); return ctx_r14.onTimeSlotClicked(day_r4, time_r8); });
    ɵɵelementStart(1, "span", 21);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const time_r8 = ɵɵnextContext().$implicit;
    ɵɵadvance(2);
    ɵɵtextInterpolate(time_r8);
} }
function CalendarBodyComponent_td_6_div_1_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "button", 22);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const time_r8 = ɵɵnextContext().$implicit;
    const day_r4 = ɵɵnextContext().$implicit;
    const ctx_r11 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ctx_r11.getSessionTitle(day_r4, time_r8), " ");
} }
function CalendarBodyComponent_td_6_div_1_mat_icon_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "mat-icon", 23);
    ɵɵtext(1, " close ");
    ɵɵelementEnd();
} }
function CalendarBodyComponent_td_6_div_1_div_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 24);
    ɵɵelementStart(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = ɵɵnextContext(3);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r13.bodyConfiguration.calendar.availability.empty);
} }
function CalendarBodyComponent_td_6_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r23 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 13);
    ɵɵelementStart(1, "div", 14);
    ɵɵtemplate(2, CalendarBodyComponent_td_6_div_1_button_2_Template, 3, 1, "button", 15);
    ɵɵtemplate(3, CalendarBodyComponent_td_6_div_1_ng_template_3_Template, 2, 1, "ng-template", null, 16, ɵɵtemplateRefExtractor);
    ɵɵelementStart(5, "a", 17);
    ɵɵlistener("click", function CalendarBodyComponent_td_6_div_1_Template_a_click_5_listener() { ɵɵrestoreView(_r23); const time_r8 = ctx.$implicit; const day_r4 = ɵɵnextContext().$implicit; const ctx_r21 = ɵɵnextContext(); return ctx_r21.onTimeSlotClicked(day_r4, time_r8); });
    ɵɵtemplate(6, CalendarBodyComponent_td_6_div_1_mat_icon_6_Template, 2, 0, "mat-icon", 18);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵtemplate(7, CalendarBodyComponent_td_6_div_1_div_7_Template, 3, 1, "div", 19);
    ɵɵelementEnd();
} if (rf & 2) {
    const time_r8 = ctx.$implicit;
    const _r10 = ɵɵreference(4);
    const day_r4 = ɵɵnextContext().$implicit;
    const ctx_r6 = ɵɵnextContext();
    ɵɵclassProp("busy", ctx_r6.isSlotBusy(day_r4, time_r8))("early", ctx_r6.isSlotEarly(day_r4, time_r8))("session", ctx_r6.isSlotInSession(day_r4, time_r8))("session-start", ctx_r6.isSlotSessionStart(day_r4, time_r8))("session-end", ctx_r6.isSlotSessionEnd(day_r4, time_r8));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r6.isDateTimeInSessionsFromCurrentUser(day_r4, time_r8))("ngIfElse", _r10);
    ɵɵadvance(4);
    ɵɵproperty("ngIf", ctx_r6.isDateTimeInSessionsFromCurrentUser(day_r4, time_r8));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r6.getAvailabilities(day_r4.key).length <= 0 || ctx_r6.isDayBusy(day_r4, time_r8));
} }
function CalendarBodyComponent_td_6_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r26 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 25);
    ɵɵelementStart(1, "button", 26);
    ɵɵlistener("click", function CalendarBodyComponent_td_6_div_2_Template_button_click_1_listener() { ɵɵrestoreView(_r26); const ctx_r25 = ɵɵnextContext(2); return ctx_r25.onNextDay(); });
    ɵɵelementStart(2, "span");
    ɵɵtext(3);
    ɵɵelementEnd();
    ɵɵelementStart(4, "mat-icon");
    ɵɵtext(5, "keyboard_arrow_right");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("title", ctx_r7.bodyConfiguration.calendar.availability.slot);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r7.bodyConfiguration.calendar.availability.slot);
} }
function CalendarBodyComponent_td_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "td", 10);
    ɵɵtemplate(1, CalendarBodyComponent_td_6_div_1_Template, 8, 14, "div", 11);
    ɵɵtemplate(2, CalendarBodyComponent_td_6_div_2_Template, 6, 2, "div", 12);
    ɵɵelementEnd();
} if (rf & 2) {
    const day_r4 = ctx.$implicit;
    const keyDay_r5 = ctx.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵattribute("id", day_r4.key);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r1.getAvailabilities(day_r4.key));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r1.isAllSlotNotAvailable() && keyDay_r5 === ctx_r1.days.length - 1);
} }
const moment = moment_;
class CalendarBodyComponent {
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
CalendarBodyComponent.ɵfac = function CalendarBodyComponent_Factory(t) { return new (t || CalendarBodyComponent)(ɵɵdirectiveInject(SessionService)); };
CalendarBodyComponent.ɵcmp = ɵɵdefineComponent({ type: CalendarBodyComponent, selectors: [["lib-calendar-body"]], inputs: { user: "user", customer: "customer", onlineSession: "onlineSession", viewMode: "viewMode", start: "start", end: "end", days: "days", daysAvailability: "daysAvailability", daysBusySlotNumber: "daysBusySlotNumber", daysAvailabilitySlotNumber: "daysAvailabilitySlotNumber", busySlots: "busySlots", earlySlots: "earlySlots", pauseSlots: "pauseSlots", sessionsSlots: "sessionsSlots", sessionsEndSlots: "sessionsEndSlots", sessionsStartSlots: "sessionsStartSlots", bodyConfiguration: "bodyConfiguration" }, outputs: { sessionAdded: "sessionAdded", sessionRemoved: "sessionRemoved", startChanged: "startChanged", endChanged: "endChanged", slotLocked: "slotLocked" }, decls: 7, vars: 2, consts: [[1, "calendar-body-wrapper"], [1, "calendar-body-table-wrapper", "table", "table-bordered"], [1, "calendar-body-table-head"], ["class", "calendar-body-head-day-row", 4, "ngIf"], [1, "calendar-body-row"], ["class", "calendar-body-column-content text-center", 4, "ngFor", "ngForOf"], [1, "calendar-body-head-day-row"], ["class", "calendar-body-day-header text-center", 4, "ngFor", "ngForOf"], [1, "calendar-body-day-header", "text-center"], [1, "truncate"], [1, "calendar-body-column-content", "text-center"], ["class", "time-slot", 3, "busy", "early", "session", "session-start", "session-end", 4, "ngFor", "ngForOf"], ["class", "next-slot", 4, "ngIf"], [1, "time-slot"], [1, "time-content"], ["type", "button", "class", "slot-available", 3, "click", 4, "ngIf", "ngIfElse"], ["sessionTitle", ""], [1, "link-close", 3, "click"], ["class", "icon-close", 4, "ngIf"], ["class", "slot-busy", 4, "ngIf"], ["type", "button", 1, "slot-available", 3, "click"], [1, "default-time"], ["type", "button", 1, "slot-session"], [1, "icon-close"], [1, "slot-busy"], [1, "next-slot"], ["type", "button", "role", "button", 3, "title", "click"]], template: function CalendarBodyComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "table", 1);
        ɵɵelementStart(2, "thead", 2);
        ɵɵtemplate(3, CalendarBodyComponent_tr_3_Template, 2, 1, "tr", 3);
        ɵɵelementEnd();
        ɵɵelementStart(4, "tbody");
        ɵɵelementStart(5, "tr", 4);
        ɵɵtemplate(6, CalendarBodyComponent_td_6_Template, 3, 3, "td", 5);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(3);
        ɵɵproperty("ngIf", ctx.viewMode !== "day");
        ɵɵadvance(3);
        ɵɵproperty("ngForOf", ctx.days);
    } }, directives: [NgIf, NgForOf, MatIcon], styles: [".calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]{max-width:240px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot[_ngcontent-%COMP%]{padding:5px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);font-family:Lato,Roboto,sans-serif;font-size:14px;font-weight:500}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot[_ngcontent-%COMP%]   button.slot-available[_ngcontent-%COMP%]{cursor:pointer;width:120px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot[_ngcontent-%COMP%]:hover   button.slot-available[_ngcontent-%COMP%]{background-color:#006400;color:#fff}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.busy[_ngcontent-%COMP%]{display:none}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.busy[_ngcontent-%COMP%]   button.slot-available[_ngcontent-%COMP%]{color:#8b0000;cursor:not-allowed}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.early[_ngcontent-%COMP%]   button.slot-available[_ngcontent-%COMP%]{cursor:not-allowed;color:orange}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]{position:relative;padding:0}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]   .slot-session[_ngcontent-%COMP%]{width:120px;background-color:#ff8c00}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]   .link-close[_ngcontent-%COMP%]   .icon-close[_ngcontent-%COMP%]{position:absolute;right:11px;top:4px;font-size:14px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]   .link-close[_ngcontent-%COMP%], .calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]   .link-close[_ngcontent-%COMP%]:hover{cursor:pointer}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session-start[_ngcontent-%COMP%]{border-top-left-radius:3px;border-top-right-radius:3px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session-start[_ngcontent-%COMP%]   .slot-session[_ngcontent-%COMP%]{color:#000;cursor:text}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session-end[_ngcontent-%COMP%]{border-bottom-left-radius:3px;border-bottom-right-radius:3px}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CalendarBodyComponent, [{
        type: Component,
        args: [{
                selector: 'lib-calendar-body',
                templateUrl: './calendar-body.component.html',
                styleUrls: ['./calendar-body.component.scss']
            }]
    }], function () { return [{ type: SessionService }]; }, { user: [{
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

function CalendarHeaderComponent_div_0_span_15_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r28 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" - ", ctx_r28.end == null ? null : ctx_r28.end.format("LL"), " ");
} }
function CalendarHeaderComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r30 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 1);
    ɵɵelementStart(1, "div", 2);
    ɵɵelementStart(2, "button", 3);
    ɵɵlistener("click", function CalendarHeaderComponent_div_0_Template_button_click_2_listener() { ɵɵrestoreView(_r30); const ctx_r29 = ɵɵnextContext(); return ctx_r29.previousDay(); });
    ɵɵelementStart(3, "mat-icon");
    ɵɵtext(4, "keyboard_arrow_left");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(5, "button", 3);
    ɵɵlistener("click", function CalendarHeaderComponent_div_0_Template_button_click_5_listener() { ɵɵrestoreView(_r30); const ctx_r31 = ɵɵnextContext(); return ctx_r31.nextDay(); });
    ɵɵelementStart(6, "mat-icon");
    ɵɵtext(7, "keyboard_arrow_right");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(8, "button", 4);
    ɵɵlistener("click", function CalendarHeaderComponent_div_0_Template_button_click_8_listener() { ɵɵrestoreView(_r30); const ctx_r32 = ɵɵnextContext(); return ctx_r32.goToToday(); });
    ɵɵelementStart(9, "mat-icon");
    ɵɵtext(10, "today");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(11, "div", 5);
    ɵɵelementStart(12, "button", 6);
    ɵɵelementStart(13, "span");
    ɵɵtext(14);
    ɵɵelementEnd();
    ɵɵtemplate(15, CalendarHeaderComponent_div_0_span_15_Template, 2, 1, "span", 7);
    ɵɵelementEnd();
    ɵɵelementStart(16, "button", 8);
    ɵɵlistener("click", function CalendarHeaderComponent_div_0_Template_button_click_16_listener() { ɵɵrestoreView(_r30); const ctx_r33 = ɵɵnextContext(); return ctx_r33.switchView("week"); });
    ɵɵelementStart(17, "mat-icon");
    ɵɵtext(18, "view_week");
    ɵɵelementEnd();
    ɵɵelementStart(19, "span", 9);
    ɵɵtext(20);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(21, "button", 8);
    ɵɵlistener("click", function CalendarHeaderComponent_div_0_Template_button_click_21_listener() { ɵɵrestoreView(_r30); const ctx_r34 = ɵɵnextContext(); return ctx_r34.switchView("three_days"); });
    ɵɵelementStart(22, "mat-icon");
    ɵɵtext(23, "view_column");
    ɵɵelementEnd();
    ɵɵelementStart(24, "span", 9);
    ɵɵtext(25);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(26, "button", 8);
    ɵɵlistener("click", function CalendarHeaderComponent_div_0_Template_button_click_26_listener() { ɵɵrestoreView(_r30); const ctx_r35 = ɵɵnextContext(); return ctx_r35.switchView("day"); });
    ɵɵelementStart(27, "mat-icon");
    ɵɵtext(28, "view_day");
    ɵɵelementEnd();
    ɵɵelementStart(29, "span", 9);
    ɵɵtext(30);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r27 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("title", ctx_r27.headerConfiguration.calendar.cta.previous);
    ɵɵadvance(3);
    ɵɵproperty("title", ctx_r27.headerConfiguration.calendar.cta.next);
    ɵɵadvance(3);
    ɵɵproperty("title", ctx_r27.headerConfiguration.calendar.back_today)("disabled", ctx_r27.isToday());
    ɵɵadvance(4);
    ɵɵclassProp("hide-on-small-only", (ctx_r27.end == null ? null : ctx_r27.end.format("YYYY-MM-DD")) !== (ctx_r27.start == null ? null : ctx_r27.start.format("YYYY-MM-DD")));
    ɵɵproperty("title", ctx_r27.headerConfiguration.calendar.today)("disabled", true);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r27.start == null ? null : ctx_r27.start.format("LL"));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", (ctx_r27.end == null ? null : ctx_r27.end.format("YYYY-MM-DD")) !== (ctx_r27.start == null ? null : ctx_r27.start.format("YYYY-MM-DD")));
    ɵɵadvance(1);
    ɵɵclassProp("active", ctx_r27.viewMode === "week");
    ɵɵproperty("title", ctx_r27.headerConfiguration.calendar.week);
    ɵɵadvance(4);
    ɵɵtextInterpolate(ctx_r27.headerConfiguration.calendar.week);
    ɵɵadvance(1);
    ɵɵclassProp("active", ctx_r27.viewMode === "three_days");
    ɵɵproperty("title", ctx_r27.headerConfiguration.calendar.three_days);
    ɵɵadvance(4);
    ɵɵtextInterpolate(ctx_r27.headerConfiguration.calendar.three_days);
    ɵɵadvance(1);
    ɵɵclassProp("active", ctx_r27.viewMode === "day");
    ɵɵproperty("title", ctx_r27.headerConfiguration.calendar.day);
    ɵɵadvance(4);
    ɵɵtextInterpolate(ctx_r27.headerConfiguration.calendar.day);
} }
const moment$1 = moment_;
class CalendarHeaderComponent {
    constructor() {
        /**
         * Switch view event
         */
        this.switchedView = new EventEmitter();
        /**
         * Start day changed event
         */
        this.startChanged = new EventEmitter();
    }
    /**
     * getter of private _viewMode
     */
    get viewMode() {
        return this._viewMode;
    }
    /**
     * Setter of switch view
     */
    set viewMode(viewMode) {
        this.switchView(viewMode);
    }
    /**
     * Switch current view to another
     */
    switchView(viewMode) {
        this._viewMode = viewMode;
        this.onSwitchedView(viewMode);
    }
    /**
     * Emitter of view
     */
    onSwitchedView(viewMode) {
        this.switchedView.emit(viewMode);
    }
    /**
     * Emitter of start date moment
     */
    onStartChanged(start) {
        this.startChanged.emit(start);
    }
    /**
     * return to now on start date
     */
    goToToday() {
        this.start = moment$1();
        this.onStartChanged(this.start);
    }
    /**
     * Check if start is equal to today
     */
    isToday() {
        return moment$1() === moment$1(this.start);
    }
    /**
     * Go to previous day
     */
    previousDay() {
        let daysNb = 1;
        if (this.viewMode === 'week') {
            daysNb = 7;
        }
        this.start = moment$1(this.start).subtract(daysNb, 'day');
        this.onStartChanged(this.start);
    }
    /**
     * Go to new day
     */
    nextDay() {
        let daysNb = 1;
        if (this.viewMode === 'week') {
            daysNb = 7;
        }
        this.start = moment$1(this.start).add(daysNb, 'day');
        this.onStartChanged(this.start);
    }
}
CalendarHeaderComponent.ɵfac = function CalendarHeaderComponent_Factory(t) { return new (t || CalendarHeaderComponent)(); };
CalendarHeaderComponent.ɵcmp = ɵɵdefineComponent({ type: CalendarHeaderComponent, selectors: [["lib-calendar-header"]], inputs: { start: "start", end: "end", headerConfiguration: "headerConfiguration", viewMode: "viewMode" }, outputs: { switchedView: "switchedView", startChanged: "startChanged" }, decls: 1, vars: 1, consts: [["fxLayout", "row wrap", "fxLayoutAlign", "start stretch", "fxLayout.xs", "column", "fxLayoutAlign.xs", "start center", "fxLayoutGap.xs", "10px", 4, "ngIf"], ["fxLayout", "row wrap", "fxLayoutAlign", "start stretch", "fxLayout.xs", "column", "fxLayoutAlign.xs", "start center", "fxLayoutGap.xs", "10px"], ["fxLayout", "row", "fxLayoutAlign", "start stretch", "fxLayoutGap", "10px", "fxLayout.xs", "row", "fxLayoutAlign.xs", "center stretch", "fxLayoutGap.xs", "10px", 1, "left-actions"], ["type", "button", "role", "button", 1, "button-actions", 3, "title", "click"], ["role", "button", 1, "button-actions", 3, "title", "disabled", "click"], ["fxLayout", "row wrap", "fxLayoutAlign", "end stretch", "fxLayoutGap", "10px", "fxLayout.xs", "row wrap", "fxLayoutAlign.xs", "center stretch", "fxLayoutGap.xs", "10px", 1, "right-actions"], ["type", "button", "role", "button", 1, "button-actions", 3, "title", "disabled"], [4, "ngIf"], ["type", "button", "role", "button", "fxHide.lt-md", "true", 1, "button-actions", 3, "title", "click"], ["fxHide.lt-md", "true"]], template: function CalendarHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, CalendarHeaderComponent_div_0_Template, 31, 22, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.headerConfiguration);
    } }, directives: [NgIf, DefaultLayoutDirective, DefaultLayoutAlignDirective, DefaultLayoutGapDirective, MatIcon, DefaultShowHideDirective], styles: [".button-actions[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-left:5px}button[_ngcontent-%COMP%]{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:36px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);font-family:Lato,Roboto,sans-serif;font-size:14px;font-weight:500;display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CalendarHeaderComponent, [{
        type: Component,
        args: [{
                selector: 'lib-calendar-header',
                templateUrl: './calendar-header.component.html',
                styleUrls: ['./calendar-header.component.scss']
            }]
    }], null, { start: [{
            type: Input
        }], end: [{
            type: Input
        }], switchedView: [{
            type: Output
        }], startChanged: [{
            type: Output
        }], headerConfiguration: [{
            type: Input
        }], viewMode: [{
            type: Input
        }] }); })();

function CalendarComponent_lib_calendar_body_5_Template(rf, ctx) { if (rf & 1) {
    const _r38 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "lib-calendar-body", 5);
    ɵɵlistener("startChanged", function CalendarComponent_lib_calendar_body_5_Template_lib_calendar_body_startChanged_0_listener($event) { ɵɵrestoreView(_r38); const ctx_r37 = ɵɵnextContext(); return ctx_r37.onStartChanged($event); })("sessionAdded", function CalendarComponent_lib_calendar_body_5_Template_lib_calendar_body_sessionAdded_0_listener($event) { ɵɵrestoreView(_r38); const ctx_r39 = ɵɵnextContext(); return ctx_r39.onSessionAdded($event); })("sessionRemoved", function CalendarComponent_lib_calendar_body_5_Template_lib_calendar_body_sessionRemoved_0_listener($event) { ɵɵrestoreView(_r38); const ctx_r40 = ɵɵnextContext(); return ctx_r40.onSessionRemoved($event); });
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r36 = ɵɵnextContext();
    ɵɵproperty("bodyConfiguration", ctx_r36.calendarConfiguration)("onlineSession", ctx_r36.onlineSession)("days", ctx_r36.days)("viewMode", ctx_r36.viewMode)("start", ctx_r36.start)("end", ctx_r36.end)("daysAvailability", ctx_r36.daysAvailability)("daysBusySlotNumber", ctx_r36.daysBusySlotNumber)("daysAvailabilitySlotNumber", ctx_r36.daysAvailabilitySlotNumber)("busySlots", ctx_r36.busySlots)("user", ctx_r36.user)("customer", ctx_r36.customer)("earlySlots", ctx_r36.earlySlots)("pauseSlots", ctx_r36.pauseSlots)("sessionsSlots", ctx_r36.sessionsSlots)("sessionsStartSlots", ctx_r36.sessionsStartSlots)("sessionsEndSlots", ctx_r36.sessionsEndSlots);
} }
const moment$2 = moment_;
class CalendarComponent {
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
        this.start = moment$2();
        /**
         * End day of calendar (could be updated but reewriten on switch week mode
         */
        this.end = moment$2();
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
        return { time, mmtTime: CalendarComponent.getMinutesDifference(moment$2(time.toDate()), slotDuration) };
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
        const firstDay = 0;
        // If empty start date then start to today
        if (!this.start) {
            this.start = moment$2();
        }
        this.start = moment$2(this.start).day(firstDay).startOf('day');
        this.end = moment$2(this.start).add(6, 'days').endOf('day');
        this.calendarStart = moment$2(this.start).startOf('day');
        this.calendarEnd = moment$2(this.end).endOf('day');
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
                value: moment$2(availableDay.toDate())
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
        this.sessions.set(moment$2(session.start).format('YYYY-MM-DDHH:mm'), session);
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
        const onlineSessionStart = moment$2(this.onlineSession.start_date, 'YYYY-MM-DD').startOf('day');
        const onlineSessionEnd = moment$2(this.onlineSession.end_date, 'YYYY-MM-DD').endOf('day');
        this.daysAvailabilitySlotNumber = new Map();
        this.daysAvailability.forEach((avbs, day) => {
            let slotsNumber = 0;
            // each day of days availability with start time 08:00
            const mmtDay = moment$2(day, 'YYYY-MM-DD').hour(8);
            const mmtDayStartTime = moment$2(day + this.onlineSession.start_time, 'YYYY-MMDDHH:mm');
            // If session start time like 08:00 is before start today 00:00
            if (mmtDayStartTime.isBefore(moment$2().startOf('day'))) {
                return;
            }
            // booking delay
            const minMmtStartTime = moment$2().add(this.onlineSession.booking_delay, 'hours');
            // session time end
            const mmtDayEndTime = moment$2(day + this.onlineSession.end_time, 'YYYY-MM-DDHH:mm');
            mmtDayEndTime.subtract(this.realDuration, 'minutes');
            // slots iterator
            const timeRange = mmtDayStartTime.twix(mmtDayEndTime)
                .iterate(this.onlineSession.duration, 'minutes');
            if (this.calendarStart && this.calendarEnd && mmtDay.isBetween(onlineSessionStart, onlineSessionEnd)) {
                while (timeRange.hasNext()) {
                    const time = timeRange.next();
                    const timeMmt = moment$2(time.toDate());
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
        const mmtStart = moment$2(session.start);
        const mmtEnd = moment$2(session.end);
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
        const mmtStart = moment$2(session.start);
        const mmtEnd = moment$2(session.end);
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
                if (moment$2(session.start).isSameOrAfter(start) &&
                    moment$2(session.end).isSameOrBefore(end)) {
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
        const mmtEventStart = moment$2(session.start, 'YYYY-MM-DDHH:mm');
        const mmtEventEnd = moment$2(session.end, 'YYYY-MM-DDHH:mm');
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
        const mmtEventStart = moment$2(session.start, 'YYYY-MM-DDHH:mm');
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
            const mmtTime = CalendarComponent.getMinutesDifference(moment$2(time.toDate()), session.duration);
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
            const mmtTime = CalendarComponent.getMinutesDifference(moment$2(time.toDate()), session.duration);
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
CalendarComponent.ɵfac = function CalendarComponent_Factory(t) { return new (t || CalendarComponent)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(SessionService)); };
CalendarComponent.ɵcmp = ɵɵdefineComponent({ type: CalendarComponent, selectors: [["ngx-calendar"]], inputs: { user: "user", customer: "customer", onlineSession: "onlineSession", start: "start", end: "end", calendarConfiguration: "calendarConfiguration", sessionsEntries: "sessionsEntries", viewMode: "viewMode" }, outputs: { viewModeChanged: "viewModeChanged", sessionCreated: "sessionCreated", sessionRemoved: "sessionRemoved" }, features: [ɵɵNgOnChangesFeature], decls: 6, vars: 5, consts: [[1, "week-calendar-wrapper"], [1, "week-calendar-header"], [1, "week-calendar-title"], [3, "start", "end", "headerConfiguration", "viewMode", "switchedView", "startChanged"], [3, "bodyConfiguration", "onlineSession", "days", "viewMode", "start", "end", "daysAvailability", "daysBusySlotNumber", "daysAvailabilitySlotNumber", "busySlots", "user", "customer", "earlySlots", "pauseSlots", "sessionsSlots", "sessionsStartSlots", "sessionsEndSlots", "startChanged", "sessionAdded", "sessionRemoved", 4, "ngIf"], [3, "bodyConfiguration", "onlineSession", "days", "viewMode", "start", "end", "daysAvailability", "daysBusySlotNumber", "daysAvailabilitySlotNumber", "busySlots", "user", "customer", "earlySlots", "pauseSlots", "sessionsSlots", "sessionsStartSlots", "sessionsEndSlots", "startChanged", "sessionAdded", "sessionRemoved"]], template: function CalendarComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "lib-calendar-header", 3);
        ɵɵlistener("switchedView", function CalendarComponent_Template_lib_calendar_header_switchedView_3_listener($event) { return ctx.onSwithedView($event); })("startChanged", function CalendarComponent_Template_lib_calendar_header_startChanged_3_listener($event) { return ctx.onStartChanged($event); });
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(4, "div");
        ɵɵtemplate(5, CalendarComponent_lib_calendar_body_5_Template, 1, 17, "lib-calendar-body", 4);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(3);
        ɵɵproperty("start", ctx.start)("end", ctx.end)("headerConfiguration", ctx.calendarConfiguration)("viewMode", ctx.viewMode);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.start && ctx.end && ctx.days && ctx.viewMode);
    } }, directives: [CalendarHeaderComponent, NgIf, CalendarBodyComponent], styles: [".week-calendar-wrapper[_ngcontent-%COMP%]   .week-calendar-header[_ngcontent-%COMP%]{padding-bottom:20px}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CalendarComponent, [{
        type: Component,
        args: [{
                // tslint:disable
                selector: 'ngx-calendar',
                // tslint:enable
                templateUrl: './calendar.component.html',
                styleUrls: ['./calendar.component.scss']
            }]
    }], function () { return [{ type: ChangeDetectorRef }, { type: SessionService }]; }, { user: [{
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

class NgxCalendarModule {
}
NgxCalendarModule.ɵmod = ɵɵdefineNgModule({ type: NgxCalendarModule });
NgxCalendarModule.ɵinj = ɵɵdefineInjector({ factory: function NgxCalendarModule_Factory(t) { return new (t || NgxCalendarModule)(); }, imports: [[
            CommonModule,
            FlexLayoutModule,
            MatIconModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NgxCalendarModule, { declarations: [CalendarComponent,
        CalendarHeaderComponent,
        CalendarBodyComponent], imports: [CommonModule,
        FlexLayoutModule,
        MatIconModule], exports: [CalendarComponent,
        CalendarHeaderComponent,
        CalendarBodyComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgxCalendarModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FlexLayoutModule,
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
            }]
    }], null, null); })();

/*
 * Public API Surface of ngx-calendar
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CalendarBodyComponent, CalendarComponent, CalendarHeaderComponent, EventType, NgxCalendarModule };
//# sourceMappingURL=romainmarecat-ngx-calendar.js.map
