(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/flex-layout'), require('moment'), require('rxjs'), require('@angular/material/icon'), require('@angular/flex-layout/flex'), require('@angular/flex-layout/extended'), require('twix')) :
    typeof define === 'function' && define.amd ? define('@romainmarecat/ngx-calendar', ['exports', '@angular/common', '@angular/core', '@angular/flex-layout', 'moment', 'rxjs', '@angular/material/icon', '@angular/flex-layout/flex', '@angular/flex-layout/extended', 'twix'], factory) :
    (global = global || self, factory((global.romainmarecat = global.romainmarecat || {}, global.romainmarecat['ngx-calendar'] = {}), global.ng.common, global.ng.core, global.ng.flexLayout, global.moment, global.rxjs, global.ng.material.icon, global.ng.flexLayout.flex, global.ng.flexLayout.extended));
}(this, (function (exports, common, core, flexLayout, moment_, rxjs, icon, flex, extended) { 'use strict';

    (function (EventType) {
        EventType[EventType["absence"] = 0] = "absence";
        EventType[EventType["session"] = 1] = "session";
    })(exports.EventType || (exports.EventType = {}));

    var SessionService = /** @class */ (function () {
        function SessionService() {
            this.sessionsEntries$ = new rxjs.BehaviorSubject([]);
            this.sessions = new rxjs.BehaviorSubject(new Map());
        }
        SessionService.ɵfac = function SessionService_Factory(t) { return new (t || SessionService)(); };
        SessionService.ɵprov = core["ɵɵdefineInjectable"]({ token: SessionService, factory: SessionService.ɵfac, providedIn: 'root' });
        return SessionService;
    }());
    /*@__PURE__*/ (function () { core["ɵsetClassMetadata"](SessionService, [{
            type: core.Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], function () { return []; }, null); })();

    function CalendarBodyComponent_tr_3_th_1_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelementStart"](0, "th", 8);
        core["ɵɵelementStart"](1, "span", 9);
        core["ɵɵtext"](2);
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var day_r44 = ctx.$implicit;
        core["ɵɵadvance"](2);
        core["ɵɵtextInterpolate"](day_r44.title);
    } }
    function CalendarBodyComponent_tr_3_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelementStart"](0, "tr", 6);
        core["ɵɵtemplate"](1, CalendarBodyComponent_tr_3_th_1_Template, 3, 1, "th", 7);
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var ctx_r41 = core["ɵɵnextContext"]();
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ngForOf", ctx_r41.days);
    } }
    function CalendarBodyComponent_td_6_div_1_button_2_Template(rf, ctx) { if (rf & 1) {
        var _r57 = core["ɵɵgetCurrentView"]();
        core["ɵɵelementStart"](0, "button", 20);
        core["ɵɵlistener"]("click", function CalendarBodyComponent_td_6_div_1_button_2_Template_button_click_0_listener() { core["ɵɵrestoreView"](_r57); var time_r49 = core["ɵɵnextContext"]().$implicit; var day_r45 = core["ɵɵnextContext"]().$implicit; var ctx_r55 = core["ɵɵnextContext"](); return ctx_r55.onTimeSlotClicked(day_r45, time_r49); });
        core["ɵɵelementStart"](1, "span", 21);
        core["ɵɵtext"](2);
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var time_r49 = core["ɵɵnextContext"]().$implicit;
        core["ɵɵadvance"](2);
        core["ɵɵtextInterpolate"](time_r49);
    } }
    function CalendarBodyComponent_td_6_div_1_ng_template_3_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelementStart"](0, "button", 22);
        core["ɵɵtext"](1);
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var time_r49 = core["ɵɵnextContext"]().$implicit;
        var day_r45 = core["ɵɵnextContext"]().$implicit;
        var ctx_r52 = core["ɵɵnextContext"]();
        core["ɵɵadvance"](1);
        core["ɵɵtextInterpolate1"](" ", ctx_r52.getSessionTitle(day_r45, time_r49), " ");
    } }
    function CalendarBodyComponent_td_6_div_1_mat_icon_6_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelementStart"](0, "mat-icon", 23);
        core["ɵɵtext"](1, " close ");
        core["ɵɵelementEnd"]();
    } }
    function CalendarBodyComponent_td_6_div_1_div_7_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelementStart"](0, "div", 24);
        core["ɵɵelementStart"](1, "span");
        core["ɵɵtext"](2);
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var ctx_r54 = core["ɵɵnextContext"](3);
        core["ɵɵadvance"](2);
        core["ɵɵtextInterpolate"](ctx_r54.bodyConfiguration.calendar.availability.empty);
    } }
    function CalendarBodyComponent_td_6_div_1_Template(rf, ctx) { if (rf & 1) {
        var _r64 = core["ɵɵgetCurrentView"]();
        core["ɵɵelementStart"](0, "div", 13);
        core["ɵɵelementStart"](1, "div", 14);
        core["ɵɵtemplate"](2, CalendarBodyComponent_td_6_div_1_button_2_Template, 3, 1, "button", 15);
        core["ɵɵtemplate"](3, CalendarBodyComponent_td_6_div_1_ng_template_3_Template, 2, 1, "ng-template", null, 16, core["ɵɵtemplateRefExtractor"]);
        core["ɵɵelementStart"](5, "a", 17);
        core["ɵɵlistener"]("click", function CalendarBodyComponent_td_6_div_1_Template_a_click_5_listener() { core["ɵɵrestoreView"](_r64); var time_r49 = ctx.$implicit; var day_r45 = core["ɵɵnextContext"]().$implicit; var ctx_r62 = core["ɵɵnextContext"](); return ctx_r62.onTimeSlotClicked(day_r45, time_r49); });
        core["ɵɵtemplate"](6, CalendarBodyComponent_td_6_div_1_mat_icon_6_Template, 2, 0, "mat-icon", 18);
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
        core["ɵɵtemplate"](7, CalendarBodyComponent_td_6_div_1_div_7_Template, 3, 1, "div", 19);
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var time_r49 = ctx.$implicit;
        var _r51 = core["ɵɵreference"](4);
        var day_r45 = core["ɵɵnextContext"]().$implicit;
        var ctx_r47 = core["ɵɵnextContext"]();
        core["ɵɵclassProp"]("busy", ctx_r47.isSlotBusy(day_r45, time_r49))("early", ctx_r47.isSlotEarly(day_r45, time_r49))("session", ctx_r47.isSlotInSession(day_r45, time_r49))("session-start", ctx_r47.isSlotSessionStart(day_r45, time_r49))("session-end", ctx_r47.isSlotSessionEnd(day_r45, time_r49));
        core["ɵɵadvance"](2);
        core["ɵɵproperty"]("ngIf", !ctx_r47.isDateTimeInSessionsFromCurrentUser(day_r45, time_r49))("ngIfElse", _r51);
        core["ɵɵadvance"](4);
        core["ɵɵproperty"]("ngIf", ctx_r47.isDateTimeInSessionsFromCurrentUser(day_r45, time_r49));
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ngIf", ctx_r47.getAvailabilities(day_r45.key).length <= 0 || ctx_r47.isDayBusy(day_r45, time_r49));
    } }
    function CalendarBodyComponent_td_6_div_2_Template(rf, ctx) { if (rf & 1) {
        var _r67 = core["ɵɵgetCurrentView"]();
        core["ɵɵelementStart"](0, "div", 25);
        core["ɵɵelementStart"](1, "button", 26);
        core["ɵɵlistener"]("click", function CalendarBodyComponent_td_6_div_2_Template_button_click_1_listener() { core["ɵɵrestoreView"](_r67); var ctx_r66 = core["ɵɵnextContext"](2); return ctx_r66.onNextDay(); });
        core["ɵɵelementStart"](2, "span");
        core["ɵɵtext"](3);
        core["ɵɵelementEnd"]();
        core["ɵɵelementStart"](4, "mat-icon");
        core["ɵɵtext"](5, "keyboard_arrow_right");
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var ctx_r48 = core["ɵɵnextContext"](2);
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("title", ctx_r48.bodyConfiguration.calendar.availability.slot);
        core["ɵɵadvance"](2);
        core["ɵɵtextInterpolate"](ctx_r48.bodyConfiguration.calendar.availability.slot);
    } }
    function CalendarBodyComponent_td_6_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelementStart"](0, "td", 10);
        core["ɵɵtemplate"](1, CalendarBodyComponent_td_6_div_1_Template, 8, 14, "div", 11);
        core["ɵɵtemplate"](2, CalendarBodyComponent_td_6_div_2_Template, 6, 2, "div", 12);
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var day_r45 = ctx.$implicit;
        var keyDay_r46 = ctx.index;
        var ctx_r42 = core["ɵɵnextContext"]();
        core["ɵɵattribute"]("id", day_r45.key);
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ngForOf", ctx_r42.getAvailabilities(day_r45.key));
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ngIf", ctx_r42.isAllSlotNotAvailable() && keyDay_r46 === ctx_r42.days.length - 1);
    } }
    var moment = moment_;
    var CalendarBodyComponent = /** @class */ (function () {
        function CalendarBodyComponent(sessionService) {
            this.sessionService = sessionService;
            this.sessionAdded = new core.EventEmitter();
            this.sessionRemoved = new core.EventEmitter();
            this.startChanged = new core.EventEmitter();
            this.endChanged = new core.EventEmitter();
            this.slotLocked = new core.EventEmitter();
        }
        CalendarBodyComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.sessionService.sessions
                .subscribe(function (sessions) {
                _this.sessions = sessions;
            });
        };
        /**
         * On click next day button, trigger switch start
         */
        CalendarBodyComponent.prototype.onNextDay = function () {
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
        CalendarBodyComponent.prototype.isAllSlotNotAvailable = function () {
            var _this = this;
            if (this.days && this.days.length > 0) {
                return this.days.filter(function (day) { return _this.daysAvailability.get(day.key).length > 0; }).length === 0;
            }
        };
        /**
         * All Availabilities by key: string, title: string, value: Moment
         */
        CalendarBodyComponent.prototype.getAvailabilities = function (day) {
            return this.daysAvailability.get(day);
        };
        CalendarBodyComponent.prototype.getSessionTitle = function (day, time) {
            var datetime = day.value.format('YYYY-MM-DD') + time;
            if (this.sessions && this.sessions.has(datetime)) {
                var session = this.sessions.get(datetime);
                return moment(session.start).format('HH:mm') + ' - ' + moment(session.end).format('HH:mm');
            }
            return '';
        };
        CalendarBodyComponent.prototype.getSessionTooltip = function (day, time) {
            var datetime = day.value.format('YYYY-MM-DD') + time;
            if (this.sessions && this.sessions.has(datetime)) {
                var session = this.sessions.get(datetime);
                if (session.comment) {
                    return session.comment;
                }
            }
            return '';
        };
        CalendarBodyComponent.prototype.onTimeSlotClicked = function (day, time) {
            var datetime = day.value.format('YYYY-MM-DD') + time;
            if (this.isSlotBusy(day, time) || this.isSlotEarly(day, time)) {
                this.slotLocked.emit(true);
                return;
            }
            if (!this.isDateTimeInSessionsFromCurrentUser(day, time)) {
                var mmtStart = moment(datetime, 'YYYY-MM-DDHH:mm');
                var mmtEnd = mmtStart.clone().add(this.onlineSession.duration, 'minutes');
                this.addSession(mmtStart, mmtEnd);
                return;
            }
            if (this.sessions.has(datetime)) {
                var session = this.sessions.get(datetime);
                var source = { key: datetime, session: session };
                this.removeSession(source);
                return;
            }
        };
        CalendarBodyComponent.prototype.addSession = function (start, end) {
            // To prevent a stringify Date without good timezone
            Date.prototype.toJSON = function () {
                return moment(this).format();
            };
            // Create session
            var session = {
                id: null,
                start: start.toDate(),
                end: end.toDate(),
                pause: this.onlineSession.pause || 0,
                duration: this.onlineSession.duration,
                nb_persons: 1,
                event_type: exports.EventType.session,
                comment: this.bodyConfiguration.calendar.session.info,
                user: this.user,
                customers: [this.customer]
            };
            this.sessionAdded.emit(session);
        };
        CalendarBodyComponent.prototype.removeSession = function (source) {
            this.sessionRemoved.emit(source);
        };
        /**
         * If day is busy (occupé) by current key string
         */
        CalendarBodyComponent.prototype.isDayBusy = function (day, time) {
            var datetime = day.value.format('YYYY-MM-DD') + time;
            return this.daysBusySlotNumber && this.daysAvailabilitySlotNumber
                && this.daysBusySlotNumber.has(datetime) && this.daysAvailabilitySlotNumber.has(datetime)
                && this.daysBusySlotNumber.get(datetime) >= this.daysAvailabilitySlotNumber.get(datetime);
        };
        /**
         * If slot is busy by date
         */
        CalendarBodyComponent.prototype.isSlotBusy = function (day, time) {
            var datetime = day.value.format('YYYY-MM-DD') + time;
            return this.busySlots && this.busySlots.has(datetime);
        };
        /**
         * if slot is on previous (date plus tôt)
         */
        CalendarBodyComponent.prototype.isSlotEarly = function (day, time) {
            var datetime = day.value.format('YYYY-MM-DD') + time;
            return (this.earlySlots && this.earlySlots.has(datetime))
                || (this.pauseSlots && this.pauseSlots.has(datetime));
        };
        /**
         * is Slot in current activities
         */
        CalendarBodyComponent.prototype.isSlotInSession = function (day, time) {
            var datetime = day.value.format('YYYY-MM-DD') + time;
            return this.sessionsSlots && this.sessionsSlots.has(datetime);
        };
        CalendarBodyComponent.prototype.isDateTimeInSessionsFromCurrentUser = function (day, time) {
            var datetime = day.value.format('YYYY-MM-DD') + time;
            var session = this.sessions.get(datetime);
            return this.sessions &&
                this.sessions.has(datetime) &&
                this.sessionsSlots.has(datetime) &&
                this.sessionsSlots.has(moment(session.end).format('YYYY-MM-DDHH:mm')) &&
                this.sessionsStartSlots.has(datetime) &&
                this.sessionsEndSlots.has(moment(session.end).format('YYYY-MM-DDHH:mm'));
        };
        CalendarBodyComponent.prototype.isSlotSessionStart = function (day, time) {
            var datetime = day.value.format('YYYY-MM-DD') + time;
            return this.sessionsSlots &&
                this.sessionsSlots.has(datetime) &&
                this.sessionsStartSlots.has(datetime);
        };
        CalendarBodyComponent.prototype.isSlotSessionEnd = function (day, time) {
            var datetime = day.value.format('YYYY-MM-DD') + time;
            var session = this.sessions.get(datetime);
            return (this.sessionsSlots &&
                this.sessionsSlots.has(datetime) &&
                this.sessionsEndSlots.has(datetime)) ||
                (this.sessionsStartSlots.has(datetime) &&
                    session &&
                    this.sessionsEndSlots.has(moment(session.end).format('YYYY-MM-DDHH:mm')));
        };
        CalendarBodyComponent.ɵfac = function CalendarBodyComponent_Factory(t) { return new (t || CalendarBodyComponent)(core["ɵɵdirectiveInject"](SessionService)); };
        CalendarBodyComponent.ɵcmp = core["ɵɵdefineComponent"]({ type: CalendarBodyComponent, selectors: [["lib-calendar-body"]], inputs: { user: "user", customer: "customer", onlineSession: "onlineSession", viewMode: "viewMode", start: "start", end: "end", days: "days", daysAvailability: "daysAvailability", daysBusySlotNumber: "daysBusySlotNumber", daysAvailabilitySlotNumber: "daysAvailabilitySlotNumber", busySlots: "busySlots", earlySlots: "earlySlots", pauseSlots: "pauseSlots", sessionsSlots: "sessionsSlots", sessionsEndSlots: "sessionsEndSlots", sessionsStartSlots: "sessionsStartSlots", bodyConfiguration: "bodyConfiguration" }, outputs: { sessionAdded: "sessionAdded", sessionRemoved: "sessionRemoved", startChanged: "startChanged", endChanged: "endChanged", slotLocked: "slotLocked" }, decls: 7, vars: 2, consts: [[1, "calendar-body-wrapper"], [1, "calendar-body-table-wrapper", "table", "table-bordered"], [1, "calendar-body-table-head"], ["class", "calendar-body-head-day-row", 4, "ngIf"], [1, "calendar-body-row"], ["class", "calendar-body-column-content text-center", 4, "ngFor", "ngForOf"], [1, "calendar-body-head-day-row"], ["class", "calendar-body-day-header text-center", 4, "ngFor", "ngForOf"], [1, "calendar-body-day-header", "text-center"], [1, "truncate"], [1, "calendar-body-column-content", "text-center"], ["class", "time-slot", 3, "busy", "early", "session", "session-start", "session-end", 4, "ngFor", "ngForOf"], ["class", "next-slot", 4, "ngIf"], [1, "time-slot"], [1, "time-content"], ["type", "button", "class", "slot-available", 3, "click", 4, "ngIf", "ngIfElse"], ["sessionTitle", ""], [1, "link-close", 3, "click"], ["class", "icon-close", 4, "ngIf"], ["class", "slot-busy", 4, "ngIf"], ["type", "button", 1, "slot-available", 3, "click"], [1, "default-time"], ["type", "button", 1, "slot-session"], [1, "icon-close"], [1, "slot-busy"], [1, "next-slot"], ["type", "button", "role", "button", 3, "title", "click"]], template: function CalendarBodyComponent_Template(rf, ctx) { if (rf & 1) {
                core["ɵɵelementStart"](0, "div", 0);
                core["ɵɵelementStart"](1, "table", 1);
                core["ɵɵelementStart"](2, "thead", 2);
                core["ɵɵtemplate"](3, CalendarBodyComponent_tr_3_Template, 2, 1, "tr", 3);
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](4, "tbody");
                core["ɵɵelementStart"](5, "tr", 4);
                core["ɵɵtemplate"](6, CalendarBodyComponent_td_6_Template, 3, 3, "td", 5);
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
            } if (rf & 2) {
                core["ɵɵadvance"](3);
                core["ɵɵproperty"]("ngIf", ctx.viewMode !== "day");
                core["ɵɵadvance"](3);
                core["ɵɵproperty"]("ngForOf", ctx.days);
            } }, directives: [common.NgIf, common.NgForOf, icon.MatIcon], styles: [".calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]{max-width:240px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot[_ngcontent-%COMP%]{padding:5px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);font-family:Lato,Roboto,sans-serif;font-size:14px;font-weight:500}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot[_ngcontent-%COMP%]   button.slot-available[_ngcontent-%COMP%]{cursor:pointer;width:120px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot[_ngcontent-%COMP%]:hover   button.slot-available[_ngcontent-%COMP%]{background-color:#006400;color:#fff}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.busy[_ngcontent-%COMP%]{display:none}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.busy[_ngcontent-%COMP%]   button.slot-available[_ngcontent-%COMP%]{color:#8b0000;cursor:not-allowed}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.early[_ngcontent-%COMP%]   button.slot-available[_ngcontent-%COMP%]{cursor:not-allowed;color:orange}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]{position:relative;padding:0}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]   .slot-session[_ngcontent-%COMP%]{width:120px;background-color:#ff8c00}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]   .link-close[_ngcontent-%COMP%]   .icon-close[_ngcontent-%COMP%]{position:absolute;right:11px;top:4px;font-size:14px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]   .link-close[_ngcontent-%COMP%], .calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session[_ngcontent-%COMP%]   .time-content[_ngcontent-%COMP%]   .link-close[_ngcontent-%COMP%]:hover{cursor:pointer}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session-start[_ngcontent-%COMP%]{border-top-left-radius:3px;border-top-right-radius:3px}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session-start[_ngcontent-%COMP%]   .slot-session[_ngcontent-%COMP%]{color:#000;cursor:text}.calendar-body-wrapper[_ngcontent-%COMP%]   .calendar-body-column-content[_ngcontent-%COMP%]   .time-slot.session-end[_ngcontent-%COMP%]{border-bottom-left-radius:3px;border-bottom-right-radius:3px}"] });
        return CalendarBodyComponent;
    }());
    /*@__PURE__*/ (function () { core["ɵsetClassMetadata"](CalendarBodyComponent, [{
            type: core.Component,
            args: [{
                    selector: 'lib-calendar-body',
                    templateUrl: './calendar-body.component.html',
                    styleUrls: ['./calendar-body.component.scss']
                }]
        }], function () { return [{ type: SessionService }]; }, { user: [{
                type: core.Input
            }], customer: [{
                type: core.Input
            }], onlineSession: [{
                type: core.Input
            }], viewMode: [{
                type: core.Input
            }], start: [{
                type: core.Input
            }], end: [{
                type: core.Input
            }], days: [{
                type: core.Input
            }], daysAvailability: [{
                type: core.Input
            }], daysBusySlotNumber: [{
                type: core.Input
            }], daysAvailabilitySlotNumber: [{
                type: core.Input
            }], busySlots: [{
                type: core.Input
            }], earlySlots: [{
                type: core.Input
            }], pauseSlots: [{
                type: core.Input
            }], sessionsSlots: [{
                type: core.Input
            }], sessionsEndSlots: [{
                type: core.Input
            }], sessionsStartSlots: [{
                type: core.Input
            }], bodyConfiguration: [{
                type: core.Input
            }], sessionAdded: [{
                type: core.Output
            }], sessionRemoved: [{
                type: core.Output
            }], startChanged: [{
                type: core.Output
            }], endChanged: [{
                type: core.Output
            }], slotLocked: [{
                type: core.Output
            }] }); })();

    function CalendarHeaderComponent_div_0_span_15_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelementStart"](0, "span");
        core["ɵɵtext"](1);
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var ctx_r69 = core["ɵɵnextContext"](2);
        core["ɵɵadvance"](1);
        core["ɵɵtextInterpolate1"](" - ", ctx_r69.end == null ? null : ctx_r69.end.format("LL"), " ");
    } }
    function CalendarHeaderComponent_div_0_Template(rf, ctx) { if (rf & 1) {
        var _r71 = core["ɵɵgetCurrentView"]();
        core["ɵɵelementStart"](0, "div", 1);
        core["ɵɵelementStart"](1, "div", 2);
        core["ɵɵelementStart"](2, "button", 3);
        core["ɵɵlistener"]("click", function CalendarHeaderComponent_div_0_Template_button_click_2_listener() { core["ɵɵrestoreView"](_r71); var ctx_r70 = core["ɵɵnextContext"](); return ctx_r70.previousDay(); });
        core["ɵɵelementStart"](3, "mat-icon");
        core["ɵɵtext"](4, "keyboard_arrow_left");
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
        core["ɵɵelementStart"](5, "button", 3);
        core["ɵɵlistener"]("click", function CalendarHeaderComponent_div_0_Template_button_click_5_listener() { core["ɵɵrestoreView"](_r71); var ctx_r72 = core["ɵɵnextContext"](); return ctx_r72.nextDay(); });
        core["ɵɵelementStart"](6, "mat-icon");
        core["ɵɵtext"](7, "keyboard_arrow_right");
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
        core["ɵɵelementStart"](8, "button", 4);
        core["ɵɵlistener"]("click", function CalendarHeaderComponent_div_0_Template_button_click_8_listener() { core["ɵɵrestoreView"](_r71); var ctx_r73 = core["ɵɵnextContext"](); return ctx_r73.goToToday(); });
        core["ɵɵelementStart"](9, "mat-icon");
        core["ɵɵtext"](10, "today");
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
        core["ɵɵelementStart"](11, "div", 5);
        core["ɵɵelementStart"](12, "button", 6);
        core["ɵɵelementStart"](13, "span");
        core["ɵɵtext"](14);
        core["ɵɵelementEnd"]();
        core["ɵɵtemplate"](15, CalendarHeaderComponent_div_0_span_15_Template, 2, 1, "span", 7);
        core["ɵɵelementEnd"]();
        core["ɵɵelementStart"](16, "button", 8);
        core["ɵɵlistener"]("click", function CalendarHeaderComponent_div_0_Template_button_click_16_listener() { core["ɵɵrestoreView"](_r71); var ctx_r74 = core["ɵɵnextContext"](); return ctx_r74.switchView("week"); });
        core["ɵɵelementStart"](17, "mat-icon");
        core["ɵɵtext"](18, "view_week");
        core["ɵɵelementEnd"]();
        core["ɵɵelementStart"](19, "span", 9);
        core["ɵɵtext"](20);
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
        core["ɵɵelementStart"](21, "button", 8);
        core["ɵɵlistener"]("click", function CalendarHeaderComponent_div_0_Template_button_click_21_listener() { core["ɵɵrestoreView"](_r71); var ctx_r75 = core["ɵɵnextContext"](); return ctx_r75.switchView("three_days"); });
        core["ɵɵelementStart"](22, "mat-icon");
        core["ɵɵtext"](23, "view_column");
        core["ɵɵelementEnd"]();
        core["ɵɵelementStart"](24, "span", 9);
        core["ɵɵtext"](25);
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
        core["ɵɵelementStart"](26, "button", 8);
        core["ɵɵlistener"]("click", function CalendarHeaderComponent_div_0_Template_button_click_26_listener() { core["ɵɵrestoreView"](_r71); var ctx_r76 = core["ɵɵnextContext"](); return ctx_r76.switchView("day"); });
        core["ɵɵelementStart"](27, "mat-icon");
        core["ɵɵtext"](28, "view_day");
        core["ɵɵelementEnd"]();
        core["ɵɵelementStart"](29, "span", 9);
        core["ɵɵtext"](30);
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var ctx_r68 = core["ɵɵnextContext"]();
        core["ɵɵadvance"](2);
        core["ɵɵproperty"]("title", ctx_r68.headerConfiguration.calendar.cta.previous);
        core["ɵɵadvance"](3);
        core["ɵɵproperty"]("title", ctx_r68.headerConfiguration.calendar.cta.next);
        core["ɵɵadvance"](3);
        core["ɵɵproperty"]("title", ctx_r68.headerConfiguration.calendar.back_today)("disabled", ctx_r68.isToday());
        core["ɵɵadvance"](4);
        core["ɵɵclassProp"]("hide-on-small-only", (ctx_r68.end == null ? null : ctx_r68.end.format("YYYY-MM-DD")) !== (ctx_r68.start == null ? null : ctx_r68.start.format("YYYY-MM-DD")));
        core["ɵɵproperty"]("title", ctx_r68.headerConfiguration.calendar.today)("disabled", true);
        core["ɵɵadvance"](2);
        core["ɵɵtextInterpolate"](ctx_r68.start == null ? null : ctx_r68.start.format("LL"));
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ngIf", (ctx_r68.end == null ? null : ctx_r68.end.format("YYYY-MM-DD")) !== (ctx_r68.start == null ? null : ctx_r68.start.format("YYYY-MM-DD")));
        core["ɵɵadvance"](1);
        core["ɵɵclassProp"]("active", ctx_r68.viewMode === "week");
        core["ɵɵproperty"]("title", ctx_r68.headerConfiguration.calendar.week);
        core["ɵɵadvance"](4);
        core["ɵɵtextInterpolate"](ctx_r68.headerConfiguration.calendar.week);
        core["ɵɵadvance"](1);
        core["ɵɵclassProp"]("active", ctx_r68.viewMode === "three_days");
        core["ɵɵproperty"]("title", ctx_r68.headerConfiguration.calendar.three_days);
        core["ɵɵadvance"](4);
        core["ɵɵtextInterpolate"](ctx_r68.headerConfiguration.calendar.three_days);
        core["ɵɵadvance"](1);
        core["ɵɵclassProp"]("active", ctx_r68.viewMode === "day");
        core["ɵɵproperty"]("title", ctx_r68.headerConfiguration.calendar.day);
        core["ɵɵadvance"](4);
        core["ɵɵtextInterpolate"](ctx_r68.headerConfiguration.calendar.day);
    } }
    var moment$1 = moment_;
    var CalendarHeaderComponent = /** @class */ (function () {
        function CalendarHeaderComponent() {
            /**
             * Switch view event
             */
            this.switchedView = new core.EventEmitter();
            /**
             * Start day changed event
             */
            this.startChanged = new core.EventEmitter();
        }
        Object.defineProperty(CalendarHeaderComponent.prototype, "viewMode", {
            /**
             * getter of private _viewMode
             */
            get: function () {
                return this._viewMode;
            },
            /**
             * Setter of switch view
             */
            set: function (viewMode) {
                this.switchView(viewMode);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Switch current view to another
         */
        CalendarHeaderComponent.prototype.switchView = function (viewMode) {
            this._viewMode = viewMode;
            this.onSwitchedView(viewMode);
        };
        /**
         * Emitter of view
         */
        CalendarHeaderComponent.prototype.onSwitchedView = function (viewMode) {
            this.switchedView.emit(viewMode);
        };
        /**
         * Emitter of start date moment
         */
        CalendarHeaderComponent.prototype.onStartChanged = function (start) {
            this.startChanged.emit(start);
        };
        /**
         * return to now on start date
         */
        CalendarHeaderComponent.prototype.goToToday = function () {
            this.start = moment$1();
            this.onStartChanged(this.start);
        };
        /**
         * Check if start is equal to today
         */
        CalendarHeaderComponent.prototype.isToday = function () {
            return moment$1() === moment$1(this.start);
        };
        /**
         * Go to previous day
         */
        CalendarHeaderComponent.prototype.previousDay = function () {
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
        CalendarHeaderComponent.prototype.nextDay = function () {
            var daysNb = 1;
            if (this.viewMode === 'week') {
                daysNb = 7;
            }
            this.start = moment$1(this.start).add(daysNb, 'day');
            this.onStartChanged(this.start);
        };
        CalendarHeaderComponent.ɵfac = function CalendarHeaderComponent_Factory(t) { return new (t || CalendarHeaderComponent)(); };
        CalendarHeaderComponent.ɵcmp = core["ɵɵdefineComponent"]({ type: CalendarHeaderComponent, selectors: [["lib-calendar-header"]], inputs: { start: "start", end: "end", headerConfiguration: "headerConfiguration", viewMode: "viewMode" }, outputs: { switchedView: "switchedView", startChanged: "startChanged" }, decls: 1, vars: 1, consts: [["fxLayout", "row wrap", "fxLayoutAlign", "start stretch", "fxLayout.xs", "column", "fxLayoutAlign.xs", "start center", "fxLayoutGap.xs", "10px", 4, "ngIf"], ["fxLayout", "row wrap", "fxLayoutAlign", "start stretch", "fxLayout.xs", "column", "fxLayoutAlign.xs", "start center", "fxLayoutGap.xs", "10px"], ["fxLayout", "row", "fxLayoutAlign", "start stretch", "fxLayoutGap", "10px", "fxLayout.xs", "row", "fxLayoutAlign.xs", "center stretch", "fxLayoutGap.xs", "10px", 1, "left-actions"], ["type", "button", "role", "button", 1, "button-actions", 3, "title", "click"], ["role", "button", 1, "button-actions", 3, "title", "disabled", "click"], ["fxLayout", "row wrap", "fxLayoutAlign", "end stretch", "fxLayoutGap", "10px", "fxLayout.xs", "row wrap", "fxLayoutAlign.xs", "center stretch", "fxLayoutGap.xs", "10px", 1, "right-actions"], ["type", "button", "role", "button", 1, "button-actions", 3, "title", "disabled"], [4, "ngIf"], ["type", "button", "role", "button", "fxHide.lt-md", "true", 1, "button-actions", 3, "title", "click"], ["fxHide.lt-md", "true"]], template: function CalendarHeaderComponent_Template(rf, ctx) { if (rf & 1) {
                core["ɵɵtemplate"](0, CalendarHeaderComponent_div_0_Template, 31, 22, "div", 0);
            } if (rf & 2) {
                core["ɵɵproperty"]("ngIf", ctx.headerConfiguration);
            } }, directives: [common.NgIf, flex.DefaultLayoutDirective, flex.DefaultLayoutAlignDirective, flex.DefaultLayoutGapDirective, icon.MatIcon, extended.DefaultShowHideDirective], styles: [".button-actions[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-left:5px}button[_ngcontent-%COMP%]{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:36px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);font-family:Lato,Roboto,sans-serif;font-size:14px;font-weight:500;display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}"] });
        return CalendarHeaderComponent;
    }());
    /*@__PURE__*/ (function () { core["ɵsetClassMetadata"](CalendarHeaderComponent, [{
            type: core.Component,
            args: [{
                    selector: 'lib-calendar-header',
                    templateUrl: './calendar-header.component.html',
                    styleUrls: ['./calendar-header.component.scss']
                }]
        }], null, { start: [{
                type: core.Input
            }], end: [{
                type: core.Input
            }], switchedView: [{
                type: core.Output
            }], startChanged: [{
                type: core.Output
            }], headerConfiguration: [{
                type: core.Input
            }], viewMode: [{
                type: core.Input
            }] }); })();

    function CalendarComponent_lib_calendar_body_5_Template(rf, ctx) { if (rf & 1) {
        var _r79 = core["ɵɵgetCurrentView"]();
        core["ɵɵelementStart"](0, "lib-calendar-body", 5);
        core["ɵɵlistener"]("startChanged", function CalendarComponent_lib_calendar_body_5_Template_lib_calendar_body_startChanged_0_listener($event) { core["ɵɵrestoreView"](_r79); var ctx_r78 = core["ɵɵnextContext"](); return ctx_r78.onStartChanged($event); })("sessionAdded", function CalendarComponent_lib_calendar_body_5_Template_lib_calendar_body_sessionAdded_0_listener($event) { core["ɵɵrestoreView"](_r79); var ctx_r80 = core["ɵɵnextContext"](); return ctx_r80.onSessionAdded($event); })("sessionRemoved", function CalendarComponent_lib_calendar_body_5_Template_lib_calendar_body_sessionRemoved_0_listener($event) { core["ɵɵrestoreView"](_r79); var ctx_r81 = core["ɵɵnextContext"](); return ctx_r81.onSessionRemoved($event); });
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var ctx_r77 = core["ɵɵnextContext"]();
        core["ɵɵproperty"]("bodyConfiguration", ctx_r77.calendarConfiguration)("onlineSession", ctx_r77.onlineSession)("days", ctx_r77.days)("viewMode", ctx_r77.viewMode)("start", ctx_r77.start)("end", ctx_r77.end)("daysAvailability", ctx_r77.daysAvailability)("daysBusySlotNumber", ctx_r77.daysBusySlotNumber)("daysAvailabilitySlotNumber", ctx_r77.daysAvailabilitySlotNumber)("busySlots", ctx_r77.busySlots)("user", ctx_r77.user)("customer", ctx_r77.customer)("earlySlots", ctx_r77.earlySlots)("pauseSlots", ctx_r77.pauseSlots)("sessionsSlots", ctx_r77.sessionsSlots)("sessionsStartSlots", ctx_r77.sessionsStartSlots)("sessionsEndSlots", ctx_r77.sessionsEndSlots);
    } }
    var moment$2 = moment_;
    var CalendarComponent = /** @class */ (function () {
        function CalendarComponent(cd, sessionService) {
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
            this.viewModeChanged = new core.EventEmitter();
            /**
             * Session created event
             */
            this.sessionCreated = new core.EventEmitter();
            /**
             * Session removed event
             */
            this.sessionRemoved = new core.EventEmitter();
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
        Object.defineProperty(CalendarComponent.prototype, "sessionsEntries", {
            get: function () {
                return this._sessionsEntries;
            },
            set: function (sessionsEntries) {
                if (sessionsEntries.length) {
                    this._sessionsEntries = sessionsEntries;
                }
                this.loadCalendar();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalendarComponent.prototype, "viewMode", {
            get: function () {
                return this._viewMode;
            },
            set: function (viewMode) {
                this._viewMode = viewMode;
                this.setViewMode();
            },
            enumerable: true,
            configurable: true
        });
        CalendarComponent.splitRangeToNextTime = function (slotTimeRange, slotDuration) {
            var time = slotTimeRange.next();
            return { time: time, mmtTime: CalendarComponent.getMinutesDifference(moment$2(time.toDate()), slotDuration) };
        };
        CalendarComponent.getMinutesDifference = function (mmtTime, slotDuration) {
            if (mmtTime.minutes() % slotDuration !== 0) {
                mmtTime.minutes(mmtTime.minutes() - (mmtTime.minutes() % slotDuration));
            }
            return mmtTime;
        };
        /**
         * Inspect all changes
         */
        CalendarComponent.prototype.ngOnChanges = function () {
            this.loadCalendar();
        };
        /**
         * Set Default variables
         */
        CalendarComponent.prototype.setCalendar = function () {
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
        };
        /**
         * Set View Mode with week, day, 3 days
         * Init start, end,
         *
         */
        CalendarComponent.prototype.setViewMode = function () {
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
            var firstDay = 0;
            // If empty start date then start to today
            if (!this.start) {
                this.start = moment$2();
            }
            this.start = moment$2(this.start).day(firstDay).startOf('day');
            this.end = moment$2(this.start).add(6, 'days').endOf('day');
            this.calendarStart = moment$2(this.start).startOf('day');
            this.calendarEnd = moment$2(this.end).endOf('day');
        };
        /**
         * On start/viewMode changed, do a recalculate of init start, end
         * days, daysAvailability and viewMode
         */
        CalendarComponent.prototype.loadCalendar = function () {
            this.setCalendar();
            this.setViewMode();
            this.setDateRange(this.start, this.end);
            this.loadEvents(this.start, this.end);
            this.loadAvailabilities();
        };
        /**
         * Add available days from start to end dates
         */
        CalendarComponent.prototype.setDateRange = function (start, end) {
            // Days range from start to end
            var daysRange = start
                .twix(end)
                .iterate(1, 'days');
            // Loading all days
            while (daysRange.hasNext()) {
                var availableDay = daysRange.next();
                this.days.push({
                    title: availableDay.format('DD/MM/YYYY'),
                    key: availableDay.format('YYYY-MM-DD'),
                    value: moment$2(availableDay.toDate())
                });
                this.daysAvailability.set(availableDay.format('YYYY-MM-DD'), []);
            }
        };
        /**
         * On switch date range
         */
        CalendarComponent.prototype.onSwithedView = function (viewMode) {
            this.viewMode = viewMode;
            this.viewModeChanged.emit(viewMode);
            this.loadCalendar();
        };
        /**
         * On start change event
         */
        CalendarComponent.prototype.onStartChanged = function (start) {
            this.start = start;
            this.loadCalendar();
        };
        /**
         * On session added on click event
         */
        CalendarComponent.prototype.onSessionAdded = function (session) {
            this.sessions.set(moment$2(session.start).format('YYYY-MM-DDHH:mm'), session);
            this.sessionService.sessions.next(this.sessions);
            this.addSession(session);
            this.sessionCreated.emit(session);
        };
        /**
         * On removed event
         */
        CalendarComponent.prototype.onSessionRemoved = function (source) {
            this.sessions.delete(source.key);
            this.sessionService.sessions.next(this.sessions);
            this.removeSession(source.session);
            this.sessionRemoved.emit(source.session);
        };
        /**
         * Load all time for each days
         */
        CalendarComponent.prototype.loadAvailabilities = function () {
            var _this = this;
            // no online session no calendar
            if (!this.daysAvailability || !this.onlineSession) {
                return;
            }
            // session duration
            this.realDuration = this.onlineSession.duration;
            // session day start 00:00 - end 23:59
            var onlineSessionStart = moment$2(this.onlineSession.start_date, 'YYYY-MM-DD').startOf('day');
            var onlineSessionEnd = moment$2(this.onlineSession.end_date, 'YYYY-MM-DD').endOf('day');
            this.daysAvailabilitySlotNumber = new Map();
            this.daysAvailability.forEach(function (avbs, day) {
                var slotsNumber = 0;
                // each day of days availability with start time 08:00
                var mmtDay = moment$2(day, 'YYYY-MM-DD').hour(8);
                var mmtDayStartTime = moment$2(day + _this.onlineSession.start_time, 'YYYY-MMDDHH:mm');
                // If session start time like 08:00 is before start today 00:00
                if (mmtDayStartTime.isBefore(moment$2().startOf('day'))) {
                    return;
                }
                // booking delay
                var minMmtStartTime = moment$2().add(_this.onlineSession.booking_delay, 'hours');
                // session time end
                var mmtDayEndTime = moment$2(day + _this.onlineSession.end_time, 'YYYY-MM-DDHH:mm');
                mmtDayEndTime.subtract(_this.realDuration, 'minutes');
                // slots iterator
                var timeRange = mmtDayStartTime.twix(mmtDayEndTime)
                    .iterate(_this.onlineSession.duration, 'minutes');
                if (_this.calendarStart && _this.calendarEnd && mmtDay.isBetween(onlineSessionStart, onlineSessionEnd)) {
                    while (timeRange.hasNext()) {
                        var time = timeRange.next();
                        var timeMmt = moment$2(time.toDate());
                        if (!timeMmt.isBefore(minMmtStartTime)) {
                            avbs.push(time.format('HH:mm'));
                            slotsNumber++;
                        }
                    }
                }
                _this.daysAvailabilitySlotNumber.set(day, slotsNumber);
            });
        };
        /**
         * Add session event in calendar
         */
        CalendarComponent.prototype.addSession = function (session) {
            var mmtStart = moment$2(session.start);
            var mmtEnd = moment$2(session.end);
            var timeInnerRange = mmtStart.twix(mmtEnd).iterateInner(session.duration, 'minutes');
            while (timeInnerRange.hasNext()) {
                var time = timeInnerRange.next();
                this.sessionsSlots.add(time.format('YYYY-MM-DDHH:mm'));
                if (!timeInnerRange.hasNext()) {
                    this.sessionsEndSlots.add(time.format('YYYY-MM-DDHH:mm'));
                }
                else {
                    this.sessionsStartSlots.add(time.format('YYYY-MM-DDHH:mm'));
                }
            }
            /* building earliest slot before event */
            var mmtEarlyStart = mmtStart.clone().subtract(this.realDuration, 'minutes');
            mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
                (mmtEarlyStart.minutes() % session.duration) + session.duration);
            var timeEarlierRange = mmtEarlyStart.twix(mmtStart).iterate(session.duration, 'minutes');
            this.handleEarlySlot(timeEarlierRange, 'add', session, mmtEarlyStart, mmtStart);
            /* building pause slots after event */
            var mmtEarlyEnd = mmtEnd.clone();
            mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.duration);
            var mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
            var timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.duration, 'minutes');
            this.handlePauseSlot(timePauseRange, 'add', session, mmtEarlyStart, mmtEarlyEnd);
        };
        /**
         * Remove session event in Calendar
         */
        CalendarComponent.prototype.removeSession = function (session) {
            var mmtStart = moment$2(session.start);
            var mmtEnd = moment$2(session.end);
            var timeInnerRange = mmtStart.twix(mmtEnd).iterate(session.duration, 'minutes');
            while (timeInnerRange.hasNext()) {
                var time = timeInnerRange.next();
                if (!timeInnerRange.hasNext()) {
                    this.sessionsEndSlots.delete(time.format('YYYY-MM-DDHH:mm'));
                }
                else {
                    this.sessionsStartSlots.delete(time.format('YYYY-MM-DDHH:mm'));
                }
            }
            /* removing early slots */
            var mmtEarlyStart = mmtStart.clone().subtract(this.realDuration, 'minutes');
            mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
                (mmtEarlyStart.minutes() % session.duration) + session.duration);
            var timeEarlyRange = mmtEarlyStart.twix(mmtStart).iterate(session.duration, 'minutes');
            this.handleEarlySlot(timeEarlyRange, 'remove', session, mmtEarlyStart, mmtStart);
            /* removing pause slots */
            if (session.pause) {
                var mmtEarlyEnd = mmtEnd.clone();
                mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.duration);
                var mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
                var timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.duration, 'minutes');
                this.handlePauseSlot(timePauseRange, 'remove', session, mmtEarlyStart, mmtEarlyEnd);
            }
        };
        /************************************************
         ******************* Date functions **************
         ************************************************
         */
        CalendarComponent.prototype.loadEvents = function (start, end) {
            var _this = this;
            if (!this.onlineSession) {
                return;
            }
            if (Array.isArray(this._sessionsEntries) && this._sessionsEntries.length) {
                this._sessionsEntries.forEach(function (session) {
                    if (moment$2(session.start).isSameOrAfter(start) &&
                        moment$2(session.end).isSameOrBefore(end)) {
                        _this.buildinBusySlot(session);
                        _this.buildingEarliestSlot(session);
                    }
                });
            }
        };
        /**
         * Slot locked
         */
        CalendarComponent.prototype.buildinBusySlot = function (session) {
            var mmtEventStart = moment$2(session.start, 'YYYY-MM-DDHH:mm');
            var mmtEventEnd = moment$2(session.end, 'YYYY-MM-DDHH:mm');
            if (!mmtEventStart || !mmtEventStart.isValid()
                || !mmtEventEnd || !mmtEventEnd.isValid()
                || !mmtEventStart.isSameOrBefore(mmtEventEnd)) {
                console.error('invalid dates', mmtEventStart, mmtEventEnd);
                return null;
            }
            /* building busy slots by events */
            var eventsTimeRange = mmtEventStart.twix(mmtEventEnd).iterate(session.duration, 'minutes');
            while (eventsTimeRange.hasNext()) {
                var _a = CalendarComponent.splitRangeToNextTime(eventsTimeRange, session.duration), time = _a.time, mmtTime = _a.mmtTime;
                /* IF the busy slot is availabe and not already in busySlots we count it */
                if (this.daysAvailability &&
                    this.daysAvailability.has(time.format('YYYY-MM-DD')) &&
                    !this.busySlots.has(time.format('YYYY-MM-DDHH:mm')) &&
                    !this.daysAvailability.get(time.format('YYYY-MM-DD')).includes(time.format('HH:mm'))) {
                    if ((!session.customers ||
                        (session.customers &&
                            this.customer &&
                            !session.customers.map(function (c) { return c.id; }).includes(this.customer.id)))) {
                        this.addDayBusySlot(time);
                    }
                    if (session.customers && this.customer && session.customers.map(function (c) { return c.id; }).includes(this.customer.id)) {
                        this.setSessionSlot(eventsTimeRange, time, session);
                    }
                }
            }
            this.sessionService.sessions.next(this.sessions);
            return mmtEventStart;
        };
        /**
         * Build in sessions Map only start session with its session
         */
        CalendarComponent.prototype.setSessionSlot = function (eventsTimeRange, time, session) {
            this.sessionsSlots.add(time.format('YYYY-MM-DDHH:mm'));
            if (!eventsTimeRange.hasNext()) {
                this.sessionsEndSlots.add(time.format('YYYY-MM-DDHH:mm'));
                return;
            }
            this.sessions.set(time.format('YYYY-MM-DDHH:mm'), session);
            this.sessionsStartSlots.add(time.format('YYYY-MM-DDHH:mm'));
        };
        /**
         * Slot before availability range
         */
        CalendarComponent.prototype.buildingEarliestSlot = function (session) {
            var mmtEventStart = moment$2(session.start, 'YYYY-MM-DDHH:mm');
            if (!mmtEventStart || !this.realDuration) {
                return;
            }
            /* building earliest slot before event */
            var mmtEarlyStart = mmtEventStart.clone().subtract(this.realDuration, 'minutes');
            mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
                (mmtEarlyStart.minutes() % this.onlineSession.duration) + this.onlineSession.duration);
            var earliestTimeRange = mmtEarlyStart.twix(mmtEventStart).iterate(this.onlineSession.duration, 'minutes');
            while (earliestTimeRange.hasNext()) {
                var _a = CalendarComponent.splitRangeToNextTime(earliestTimeRange, this.onlineSession.duration), time = _a.time, mmtTime = _a.mmtTime;
                /* IF the busy slot is in availability and not already in busySlots we count it */
                if (this.daysAvailability &&
                    this.daysAvailability.has(time.format('YYYY-MM-DD'))
                    && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
                    && this.daysAvailability.get(time.format('YYYY-MM-DD')).includes(time.format('HH:mm'))) {
                    this.addDayBusySlot(time);
                }
            }
        };
        /**
         * Add in busy slot new unavailable time reference
         */
        CalendarComponent.prototype.addDayBusySlot = function (time) {
            var dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
                this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
            dayBusyNumber++;
            this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
            this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
        };
        /**
         * Remove/add from pauseSlot sessions start/end interval
         */
        CalendarComponent.prototype.handlePauseSlot = function (timePauseRange, action, session, start, end) {
            while (timePauseRange.hasNext()) {
                var time = timePauseRange.next();
                var mmtTime = CalendarComponent.getMinutesDifference(moment$2(time.toDate()), session.duration);
                if (mmtTime.isSameOrAfter(start) && mmtTime.isBefore(end)) {
                    if (action === 'remove') {
                        this.pauseSlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
                    }
                    if (action === 'add') {
                        this.pauseSlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
                    }
                }
            }
        };
        /**
         * Remove/add from earlySlot all sessions
         */
        CalendarComponent.prototype.handleEarlySlot = function (timeEarlierRange, action, session, mmtEarlyStart, mmtStart) {
            while (timeEarlierRange.hasNext()) {
                var time = timeEarlierRange.next();
                var mmtTime = CalendarComponent.getMinutesDifference(moment$2(time.toDate()), session.duration);
                if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                    if (action === 'add') {
                        this.earlySlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
                    }
                    if (action === 'remove') {
                        this.earlySlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
                    }
                }
            }
        };
        CalendarComponent.ɵfac = function CalendarComponent_Factory(t) { return new (t || CalendarComponent)(core["ɵɵdirectiveInject"](core.ChangeDetectorRef), core["ɵɵdirectiveInject"](SessionService)); };
        CalendarComponent.ɵcmp = core["ɵɵdefineComponent"]({ type: CalendarComponent, selectors: [["ngx-calendar"]], inputs: { user: "user", customer: "customer", onlineSession: "onlineSession", start: "start", end: "end", calendarConfiguration: "calendarConfiguration", sessionsEntries: "sessionsEntries", viewMode: "viewMode" }, outputs: { viewModeChanged: "viewModeChanged", sessionCreated: "sessionCreated", sessionRemoved: "sessionRemoved" }, features: [core["ɵɵNgOnChangesFeature"]], decls: 6, vars: 5, consts: [[1, "week-calendar-wrapper"], [1, "week-calendar-header"], [1, "week-calendar-title"], [3, "start", "end", "headerConfiguration", "viewMode", "switchedView", "startChanged"], [3, "bodyConfiguration", "onlineSession", "days", "viewMode", "start", "end", "daysAvailability", "daysBusySlotNumber", "daysAvailabilitySlotNumber", "busySlots", "user", "customer", "earlySlots", "pauseSlots", "sessionsSlots", "sessionsStartSlots", "sessionsEndSlots", "startChanged", "sessionAdded", "sessionRemoved", 4, "ngIf"], [3, "bodyConfiguration", "onlineSession", "days", "viewMode", "start", "end", "daysAvailability", "daysBusySlotNumber", "daysAvailabilitySlotNumber", "busySlots", "user", "customer", "earlySlots", "pauseSlots", "sessionsSlots", "sessionsStartSlots", "sessionsEndSlots", "startChanged", "sessionAdded", "sessionRemoved"]], template: function CalendarComponent_Template(rf, ctx) { if (rf & 1) {
                core["ɵɵelementStart"](0, "div", 0);
                core["ɵɵelementStart"](1, "div", 1);
                core["ɵɵelementStart"](2, "div", 2);
                core["ɵɵelementStart"](3, "lib-calendar-header", 3);
                core["ɵɵlistener"]("switchedView", function CalendarComponent_Template_lib_calendar_header_switchedView_3_listener($event) { return ctx.onSwithedView($event); })("startChanged", function CalendarComponent_Template_lib_calendar_header_startChanged_3_listener($event) { return ctx.onStartChanged($event); });
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
                core["ɵɵelementStart"](4, "div");
                core["ɵɵtemplate"](5, CalendarComponent_lib_calendar_body_5_Template, 1, 17, "lib-calendar-body", 4);
                core["ɵɵelementEnd"]();
                core["ɵɵelementEnd"]();
            } if (rf & 2) {
                core["ɵɵadvance"](3);
                core["ɵɵproperty"]("start", ctx.start)("end", ctx.end)("headerConfiguration", ctx.calendarConfiguration)("viewMode", ctx.viewMode);
                core["ɵɵadvance"](2);
                core["ɵɵproperty"]("ngIf", ctx.start && ctx.end && ctx.days && ctx.viewMode);
            } }, directives: [CalendarHeaderComponent, common.NgIf, CalendarBodyComponent], styles: [".week-calendar-wrapper[_ngcontent-%COMP%]   .week-calendar-header[_ngcontent-%COMP%]{padding-bottom:20px}"] });
        return CalendarComponent;
    }());
    /*@__PURE__*/ (function () { core["ɵsetClassMetadata"](CalendarComponent, [{
            type: core.Component,
            args: [{
                    // tslint:disable
                    selector: 'ngx-calendar',
                    // tslint:enable
                    templateUrl: './calendar.component.html',
                    styleUrls: ['./calendar.component.scss']
                }]
        }], function () { return [{ type: core.ChangeDetectorRef }, { type: SessionService }]; }, { user: [{
                type: core.Input
            }], customer: [{
                type: core.Input
            }], onlineSession: [{
                type: core.Input
            }], start: [{
                type: core.Input
            }], end: [{
                type: core.Input
            }], calendarConfiguration: [{
                type: core.Input
            }], viewModeChanged: [{
                type: core.Output
            }], sessionCreated: [{
                type: core.Output
            }], sessionRemoved: [{
                type: core.Output
            }], sessionsEntries: [{
                type: core.Input
            }], viewMode: [{
                type: core.Input
            }] }); })();

    var NgxCalendarModule = /** @class */ (function () {
        function NgxCalendarModule() {
        }
        NgxCalendarModule.ɵmod = core["ɵɵdefineNgModule"]({ type: NgxCalendarModule });
        NgxCalendarModule.ɵinj = core["ɵɵdefineInjector"]({ factory: function NgxCalendarModule_Factory(t) { return new (t || NgxCalendarModule)(); }, imports: [[
                    common.CommonModule,
                    flexLayout.FlexLayoutModule,
                    icon.MatIconModule,
                ]] });
        return NgxCalendarModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core["ɵɵsetNgModuleScope"](NgxCalendarModule, { declarations: [CalendarComponent,
            CalendarHeaderComponent,
            CalendarBodyComponent], imports: [common.CommonModule,
            flexLayout.FlexLayoutModule,
            icon.MatIconModule], exports: [CalendarComponent,
            CalendarHeaderComponent,
            CalendarBodyComponent] }); })();
    /*@__PURE__*/ (function () { core["ɵsetClassMetadata"](NgxCalendarModule, [{
            type: core.NgModule,
            args: [{
                    imports: [
                        common.CommonModule,
                        flexLayout.FlexLayoutModule,
                        icon.MatIconModule,
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

    exports.CalendarBodyComponent = CalendarBodyComponent;
    exports.CalendarComponent = CalendarComponent;
    exports.CalendarHeaderComponent = CalendarHeaderComponent;
    exports.NgxCalendarModule = NgxCalendarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=romainmarecat-ngx-calendar.umd.js.map
