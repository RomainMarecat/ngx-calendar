import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBar, MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatSnackBar as MatSnackBar$1 } from '@angular/material/snack-bar';
import * as moment_ from 'moment';
import 'twix';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { Injectable, Component, EventEmitter, Input, Output, Inject, ChangeDetectorRef, Renderer2, ViewChildren, ɵɵdefineInjectable, ɵɵinject, InjectionToken, NgModule } from '@angular/core';
import { map, switchMap, filter } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Event {
}
/** @enum {number} */
const EventType = {
    absence: 0,
    session: 1,
};
EventType[EventType.absence] = 'absence';
EventType[EventType.session] = 'session';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AlertService {
    /**
     * @param {?} snackBar
     * @param {?} translateService
     */
    constructor(snackBar, translateService) {
        this.snackBar = snackBar;
        this.translateService = translateService;
    }
    /**
     * @param {?} message
     * @param {?=} parameters
     * @return {?}
     */
    message(message, parameters = {}) {
        this.toast(message, parameters);
    }
    /**
     * @param {?} message
     * @param {?=} parameters
     * @return {?}
     */
    show(message, parameters = {}) {
        this.toast(message, parameters);
    }
    /**
     * @param {?} message
     * @param {?=} parameters
     * @return {?}
     */
    toast(message, parameters = {}) {
        if (typeof message === 'string') {
            // Subscribe on message translation
            this.translateService.get(message, parameters)
                .subscribe((/**
             * @param {?} translation
             * @return {?}
             */
            (translation) => {
                this.openAlertMessage(translation, parameters);
            }), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                this.openAlertMessage(message, parameters);
            }));
            return;
        }
        this.openAlertMessage(message, parameters);
    }
    /**
     * @param {?} message
     * @param {?} parameters
     * @return {?}
     */
    openAlertMessage(message, parameters) {
        // Open Alert Component with a message
        /** @type {?} */
        const toastRef = this.snackBar.open(message, 'message', {
            data: message,
            // Add extra class to define custom css or background color
            panelClass: ['snackbar'],
            // Timeout duration in ms
            duration: 8000
        });
    }
}
AlertService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AlertService.ctorParameters = () => [
    { type: MatSnackBar },
    { type: TranslateService }
];
/** @nocollapse */ AlertService.ngInjectableDef = ɵɵdefineInjectable({ factory: function AlertService_Factory() { return new AlertService(ɵɵinject(MatSnackBar$1), ɵɵinject(TranslateService)); }, token: AlertService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment = moment_;
class CalendarBodyComponent {
    /**
     * @param {?} translate
     * @param {?} alertService
     */
    constructor(translate, alertService) {
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
    ngOnInit() {
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
            if (session.details.info) {
                return this.translate.instant(session.details.info);
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
            this.alertService.show('error.slot.locked');
            return;
        }
        if (!this.isSlotSessionStart(day, time) && !this.isSlotInSession(day, time)) {
            /** @type {?} */
            const mmtStart = moment(datetime, 'YYYY-MM-DDHH:mm');
            /** @type {?} */
            const mmtEnd = mmtStart.clone().add(this.onlineSession.session_type.duration, 'minutes');
            this.addSession(mmtStart, mmtEnd);
        }
        else if (this.sessions.has(datetime)) {
            /** @type {?} */
            const session = this.sessions.get(datetime);
            /** @type {?} */
            const source = { key: datetime, session: session };
            this.removeSession(source);
        }
    }
    /**
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    addSession(start, end) {
        /** @type {?} */
        const session = {
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
    isSlotSessionStart(day, time) {
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
                template: "<div class=\"calendar-body-wrapper\">\n  <table class=\"calendar-body-table-wrapper table table-bordered\">\n    <thead class=\"calendar-body-table-head\">\n    <tr class=\"calendar-body-head-day-row\"\n        *ngIf=\"viewMode !== 'day'\">\n      <th class=\"calendar-body-day-header text-center\"\n          *ngFor=\"let day of days\">\n        <span class=\"truncate\">{{ day.title }}</span>\n      </th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr class=\"calendar-body-row\">\n      <td class=\"calendar-body-column-content text-center\"\n          #dayList\n          [attr.id]=\"day.key\"\n          *ngFor=\"let day of days; let keyDay = index\">\n        <div class=\"time-slot\"\n             [class.busy]=\"isSlotBusy(day, time)\"\n             [class.early]=\"isSlotEarly(day, time)\"\n             [class.session]=\"isSlotInSession(day, time)\"\n             [class.session-start]=\"isSlotSessionStart(day, time)\"\n             [class.session-end]=\"isSlotSessionEnd(day, time)\"\n             *ngFor=\"let time of getAvailabilities(day.key)\">\n          <div class=\"time-content\">\n            <button type=\"button\"\n                    class=\"slot-available\"\n                    color=\"primary\"\n                    mat-raised-button\n                    (click)=\"onTimeSlotClicked(day, time)\"\n                    *ngIf=\"!isSlotSessionStart(day, time); else sessionTitle\">\n              <span class=\"default-time\">{{ time }}</span>\n            </button>\n            <ng-template #sessionTitle>\n              <button type=\"button\"\n                      mat-raised-button\n                      class=\"slot-session\"\n                      [matTooltipPosition]=\"'above'\"\n                      [matTooltip]=\"getSessionTooltip(day, time)\">\n                {{ getSessionTitle(day, time)}}\n              </button>\n            </ng-template>\n            <a class=\"link-close\" (click)=\"onTimeSlotClicked(day, time)\">\n              <mat-icon class=\"icon-close\"\n                        *ngIf=\"isSlotSessionStart(day, time)\">close\n              </mat-icon>\n            </a>\n          </div>\n          <div class=\"slot-busy\"\n               *ngIf=\"getAvailabilities(day.key).length <= 0 || isDayBusy(day, time)\">\n            <span>{{ 'calendar.availability.empty'|translate }}</span>\n          </div>\n        </div>\n        <div class=\"next-slot\"\n             *ngIf=\"isAllSlotNotAvailable() && keyDay === days.length-1\">\n          <button type=\"button\"\n                  role=\"button\"\n                  mat-raised-button\n                  color=\"primary\"\n                  [title]=\"'cta.next-available-slot'|translate\"\n                  (click)=\"onNextDay()\">\n            <span>{{ 'cta.next-available-slot'|translate }}</span>\n            <mat-icon>keyboard_arrow_right</mat-icon>\n          </button>\n        </div>\n      </td>\n    </tr>\n    </tbody>\n  </table>\n</div>\n",
                styles: [".calendar-body-wrapper .calendar-body-column-content{max-width:240px}.calendar-body-wrapper .calendar-body-column-content .time-slot{padding:5px}.calendar-body-wrapper .calendar-body-column-content .time-slot button.slot-available{cursor:pointer;width:120px}.calendar-body-wrapper .calendar-body-column-content .time-slot:hover button.slot-available{background-color:#006400;color:#fff}.calendar-body-wrapper .calendar-body-column-content .time-slot.busy{display:none}.calendar-body-wrapper .calendar-body-column-content .time-slot.busy button.slot-available{color:#8b0000;cursor:not-allowed}.calendar-body-wrapper .calendar-body-column-content .time-slot.early button.slot-available{cursor:not-allowed;color:orange}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content{position:relative;padding:5px 5px 5px 0}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .slot-session{width:120px;background-color:#ff8c00}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close .icon-close{position:absolute;right:5px;top:5px;font-size:14px}.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close,.calendar-body-wrapper .calendar-body-column-content .time-slot.session .time-content .link-close:hover{cursor:pointer}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-start{border-top-left-radius:3px;border-top-right-radius:3px}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-start .slot-session{color:#000;cursor:text}.calendar-body-wrapper .calendar-body-column-content .time-slot.session-end{border-bottom-left-radius:3px;border-bottom-right-radius:3px}"]
            }] }
];
/** @nocollapse */
CalendarBodyComponent.ctorParameters = () => [
    { type: TranslateService },
    { type: AlertService }
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
    sessionAdded: [{ type: Output }],
    sessionRemoved: [{ type: Output }],
    startChanged: [{ type: Output }],
    endChanged: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$1 = moment_;
class CalendarHeaderComponent {
    constructor() {
        this.switchedView = new EventEmitter();
        this.startChanged = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} viewMode
     * @return {?}
     */
    set viewMode(viewMode) {
        this.switchView(viewMode);
    }
    /**
     * Switch current view to another
     * @param {?} viewMode
     * @return {?}
     */
    switchView(viewMode) {
        this._viewMode = viewMode;
        this.onSwitchedView(viewMode);
    }
    /**
     * getter of private _viewMode
     * @return {?}
     */
    get viewMode() {
        return this._viewMode;
    }
    /**
     * Emitter of view
     * @param {?} viewMode
     * @return {?}
     */
    onSwitchedView(viewMode) {
        this.switchedView.emit(viewMode);
    }
    /**
     * Emitter of start date moment
     * @param {?} start
     * @return {?}
     */
    onStartChanged(start) {
        this.startChanged.emit(start);
    }
    /**
     * return to now on start date
     * @return {?}
     */
    goToToday() {
        this.start = moment$1();
        this.onStartChanged(this.start);
    }
    /**
     * Check if start is equal to today
     * @return {?}
     */
    isToday() {
        return moment$1() === moment$1(this.start);
    }
    /**
     * Go to previous day
     * @return {?}
     */
    previousDay() {
        /** @type {?} */
        let daysNb = 1;
        if (this.viewMode === 'week') {
            daysNb = 7;
        }
        this.start = moment$1(this.start).subtract(daysNb, 'day');
        this.onStartChanged(this.start);
    }
    /**
     * Go to new day
     * @return {?}
     */
    nextDay() {
        /** @type {?} */
        let daysNb = 1;
        if (this.viewMode === 'week') {
            daysNb = 7;
        }
        this.start = moment$1(this.start).add(daysNb, 'day');
        this.onStartChanged(this.start);
    }
}
CalendarHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-calendar-header',
                template: "<div fxLayout=\"row wrap\"\n     fxLayoutAlign=\"space-between stretch\"\n     fxLayout.xs=\"column\"\n     fxLayoutAlign.xs=\"start center\"\n     fxLayoutGap.xs=\"10px\">\n\n  <div class=\"left-actions\"\n       fxLayout=\"row\"\n       fxLayoutAlign=\"start stretch\"\n       fxLayoutGap=\"10px\"\n       fxLayout.xs=\"row\"\n       fxLayoutAlign.xs=\"center stretch\"\n       fxLayoutGap.xs=\"10px\">\n    <button class=\"button-actions\"\n            mat-raised-button\n            color=\"primary\"\n            (click)=\"previousDay()\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"'cta.previous'|translate\">\n      <mat-icon>keyboard_arrow_left</mat-icon>\n    </button>\n    <button class=\"button-actions\"\n            mat-raised-button\n            (click)=\"nextDay()\"\n            color=\"primary\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"'cta.next'|translate\">\n      <mat-icon>keyboard_arrow_right</mat-icon>\n    </button>\n    <button class=\"button-actions\"\n            [title]=\"'calendar.back-today'|translate\"\n            mat-raised-button\n            color=\"primary\"\n            [disabled]=\"isToday()\"\n            (click)=\"goToToday()\"\n            role=\"button\">\n      <mat-icon>today</mat-icon>\n    </button>\n  </div>\n  <div class=\"right-actions\"\n       fxLayout=\"row wrap\"\n       fxLayoutAlign=\"end stretch\"\n       fxLayoutGap=\"10px\"\n       fxLayout.xs=\"row wrap\"\n       fxLayoutAlign.xs=\"center stretch\"\n       fxLayoutGap.xs=\"10px\">\n    <button class=\"button-actions\"\n            mat-raised-button\n            type=\"button\"\n            role=\"button\"\n            [title]=\"'calendar.today'|translate\"\n            color=\"primary\"\n            [disabled]=\"true\"\n            [class.hide-on-small-only]=\"end?.format('YYYY-MM-DD') !== start?.format('YYYY-MM-DD')\">\n      {{ start?.format('LL') }}\n      <span *ngIf=\"end?.format('YYYY-MM-DD') !== start?.format('YYYY-MM-DD')\">\n        - {{ end?.format('LL') }}\n      </span>\n    </button>\n    <button class=\"button-actions\"\n            mat-raised-button\n            color=\"primary\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"'calendar.week'|translate\"\n            [class.active]=\"viewMode === 'week'\"\n            (click)=\"switchView('week')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_week</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ 'calendar.week'|translate }}</span>\n    </button>\n    <button class=\"button-actions\"\n            mat-raised-button\n            color=\"primary\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"'calendar.3days'|translate\"\n            [class.active]=\"viewMode === '3days'\"\n            (click)=\"switchView('3days')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_column</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ 'calendar.3days'|translate }}</span>\n    </button>\n    <button class=\"button-actions\"\n            mat-raised-button\n            color=\"primary\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"'calendar.day'|translate\"\n            [class.active]=\"viewMode === 'day'\"\n            (click)=\"switchView('day')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_day</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ 'calendar.day'|translate }}</span>\n    </button>\n  </div>\n</div>\n",
                styles: [""]
            }] }
];
CalendarHeaderComponent.propDecorators = {
    start: [{ type: Input }],
    end: [{ type: Input }],
    switchedView: [{ type: Output }],
    startChanged: [{ type: Output }],
    viewMode: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VisitorService {
    /**
     * @param {?} afs
     * @param {?} table
     */
    constructor(afs, table) {
        this.afs = afs;
        this.initializeBehaviour(table);
        this.documents$ = combineLatest(this.filters$, this.limit$, this.orderBy$, this.query$).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([filters, limit, orderBy, query]) => {
            return this.afs.collection(this.table, (/**
             * @param {?} ref
             * @return {?}
             */
            (ref) => {
                this.query = (/** @type {?} */ (ref));
                this.createQuery(filters, limit, orderBy, query);
                return this.query;
            }))
                .snapshotChanges();
        })));
    }
    /**
     * @param {?} filters
     * @param {?} limit
     * @param {?} orderBy
     * @param {?} query
     * @return {?}
     */
    createQuery(filters, limit, orderBy, query) {
        if (query && this.query) {
            if (query.limit) {
                this.query = this.query.limit(query.limit);
            }
            if (query.filters) {
                query.filters.forEach((/**
                 * @param {?} filter
                 * @return {?}
                 */
                (filter$$1) => {
                    this.query = this.query.where(filter$$1.column, (/** @type {?} */ (filter$$1.operator)), filter$$1.value);
                }));
            }
            if (query.orderBy) {
                this.query = this.query.orderBy(query.orderBy.column, (/** @type {?} */ (query.orderBy.direction)));
            }
        }
        if (limit) {
            this.query = this.query.limit(limit);
        }
        if (filters && this.query) {
            filters.forEach((/**
             * @param {?} filter
             * @return {?}
             */
            (filter$$1) => {
                this.query = this.query.where(filter$$1.column, (/** @type {?} */ (filter$$1.operator)), filter$$1.value);
            }));
        }
        if (orderBy) {
            this.query = this.query.orderBy(orderBy.column, (/** @type {?} */ (orderBy.direction)));
        }
    }
    /**
     * @param {?} table
     * @return {?}
     */
    initializeBehaviour(table) {
        this.table = table;
        this.query$ = new BehaviorSubject(null);
        this.filters$ = new BehaviorSubject(null);
        this.limit$ = new BehaviorSubject(null);
        this.orderBy$ = new BehaviorSubject(null);
        this.collectionRef = this.afs.collection(this.table);
    }
    /**
     * get multiple documents
     * @return {?} Observable
     */
    getDocuments() {
        return this.documents$.pipe(map((/**
         * @param {?} documents
         * @return {?}
         */
        (documents) => {
            return documents.map((/**
             * @param {?} document
             * @return {?}
             */
            (document) => {
                if (document.payload.doc.exists) {
                    /** @type {?} */
                    const doc = (/** @type {?} */ (document.payload.doc.data()));
                    doc.key = document.payload.doc.id;
                    return doc;
                }
            }));
        })));
    }
    /**
     * get snapshot change with state, from action
     * @private
     * @param {?} path
     * @return {?}
     */
    getDocPayload(path) {
        return this.document$ = this.collectionRef
            .doc(path)
            .snapshotChanges()
            .pipe(map((/**
         * @param {?} action
         * @return {?}
         */
        (action) => {
            if (action.payload.exists) {
                /** @type {?} */
                const product = (/** @type {?} */ (action.payload.data()));
                product.key = action.payload.id;
                return product;
            }
            return null;
        })));
    }
    /**
     * get a single document
     * @param {?} key
     * @return {?}
     */
    getDocument(key) {
        if (key) {
            return this.getDocPayload(key);
        }
        return of(null);
    }
    /**
     * Update a document
     * @param {?} document
     * @return {?}
     */
    updateDocument(document) {
        return this.collectionRef.doc(document.key).update(Object.assign({}, document));
    }
    /**
     * create a Document
     * @param {?} document
     * @return {?}
     */
    createDocument(document) {
        return this.collectionRef.add(document);
    }
    /**
     * Delete a document
     * @param {?} document
     * @return {?}
     */
    deleteDocument(document) {
        return this.collectionRef.doc(document.key).delete();
    }
}
VisitorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
VisitorService.ctorParameters = () => [
    { type: AngularFirestore },
    { type: String, decorators: [{ type: Inject, args: ['TABLE_NAME',] }] }
];
/** @nocollapse */ VisitorService.ngInjectableDef = ɵɵdefineInjectable({ factory: function VisitorService_Factory() { return new VisitorService(ɵɵinject(AngularFirestore), ɵɵinject("TABLE_NAME")); }, token: VisitorService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EventService extends VisitorService {
    /**
     * @param {?} afs
     * @param {?} table
     */
    constructor(afs, table) {
        super(afs, table);
    }
    /**
     * @return {?}
     */
    getEvents() {
        return (/** @type {?} */ (super.getDocuments()));
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getEvent(key) {
        return (/** @type {?} */ (super.getDocument(key)));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    createEvent(event) {
        return super.createDocument(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateEvent(event) {
        return super.updateDocument(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    deleteEvent(event) {
        return super.deleteDocument(event);
    }
}
EventService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
EventService.ctorParameters = () => [
    { type: AngularFirestore },
    { type: String, decorators: [{ type: Inject, args: ['TABLE_EVENT',] }] }
];
/** @nocollapse */ EventService.ngInjectableDef = ɵɵdefineInjectable({ factory: function EventService_Factory() { return new EventService(ɵɵinject(AngularFirestore), ɵɵinject("TABLE_EVENT")); }, token: EventService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SessionService extends VisitorService {
    /**
     * @param {?} afs
     * @param {?} table
     */
    constructor(afs, table) {
        super(afs, table);
    }
    /**
     * @return {?}
     */
    getSessions() {
        return (/** @type {?} */ (super.getDocuments()));
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getSession(key) {
        return (/** @type {?} */ (super.getDocument(key)));
    }
    /**
     * @param {?} session
     * @return {?}
     */
    createSession(session) {
        return super.createDocument(session);
    }
    /**
     * @param {?} session
     * @return {?}
     */
    updateSession(session) {
        return super.updateDocument(session);
    }
    /**
     * @param {?} session
     * @return {?}
     */
    deleteSession(session) {
        return super.deleteDocument(session);
    }
}
SessionService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SessionService.ctorParameters = () => [
    { type: AngularFirestore },
    { type: String, decorators: [{ type: Inject, args: ['TABLE_SESSION',] }] }
];
/** @nocollapse */ SessionService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SessionService_Factory() { return new SessionService(ɵɵinject(AngularFirestore), ɵɵinject("TABLE_SESSION")); }, token: SessionService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$2 = moment_;
class CalendarComponent {
    /**
     * @param {?} eventService
     * @param {?} sessionService
     * @param {?} cd
     * @param {?} rd
     */
    constructor(eventService, sessionService, cd, rd) {
        this.eventService = eventService;
        this.sessionService = sessionService;
        this.cd = cd;
        this.rd = rd;
        // Default View Mode of Week Component
        this._viewMode = 'week';
        this.start = moment$2();
        this.end = moment$2();
        this.slotDuration = 15;
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
    static splitRangeToNextTime(slotTimeRange, slotDuration) {
        /** @type {?} */
        const time = slotTimeRange.next();
        return { time: time, mmtTime: CalendarComponent.getMinutesDifference(moment$2(time.toDate()), slotDuration) };
    }
    /**
     * @param {?} mmtTime
     * @param {?} slotDuration
     * @return {?}
     */
    static getMinutesDifference(mmtTime, slotDuration) {
        if (mmtTime.minutes() % slotDuration !== 0) {
            mmtTime.minutes(mmtTime.minutes() - (mmtTime.minutes() % slotDuration));
        }
        return mmtTime;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setCalendar();
        this.setDateRange();
    }
    /**
     * @param {?} viewMode
     * @return {?}
     */
    set viewMode(viewMode) {
        this._viewMode = viewMode;
        this.setViewMode();
    }
    /**
     * @return {?}
     */
    get viewMode() {
        return this._viewMode;
    }
    /**
     * Inspect all changes
     * @return {?}
     */
    ngOnChanges() {
        this.setDateRange();
    }
    /**
     * Set Default variables
     * @return {?}
     */
    setCalendar() {
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
    }
    /**
     * Set View Mode with week, day, 3 days
     * Init start, end,
     *
     * @return {?}
     */
    setViewMode() {
        if (this.viewMode === 'day') {
            this.end = this.start;
            this.calendarStart = moment$2(this.start).startOf('day');
            this.calendarEnd = moment$2(this.end).endOf('day');
            return;
        }
        else if (this.viewMode === '3days') {
            this.end = moment$2(this.start).add(2, 'days');
            this.calendarStart = moment$2(this.start).startOf('day');
            this.calendarEnd = moment$2(this.end).endOf('day');
            return;
        }
        // Init first day week number
        /** @type {?} */
        const firstDay = 0;
        // If empty start date then start to today
        if (!this.start) {
            this.start = moment$2();
        }
        this.start = moment$2(this.start).day(firstDay);
        this.end = moment$2(this.start).add(6, 'days');
        this.calendarStart = moment$2(this.start).startOf('day');
        this.calendarEnd = moment$2(this.end).endOf('day');
    }
    /**
     * On start/viewMode changed, do a recalculate of init start, end
     * days, daysAvailability and viewMode
     * @return {?}
     */
    setDateRange() {
        this.setCalendar();
        this.setViewMode();
        // this.buildTrueDuration();
        this.loadEvents(this.start, this.end);
        this.daysAvailability = new Map();
        /** @type {?} */
        const dateRange = this.start
            .twix(this.end)
            .iterate(1, 'days');
        this.days = [];
        // Loading all days
        while (dateRange.hasNext()) {
            /** @type {?} */
            const date = dateRange.next();
            this.days.push({
                title: date.format('DD/MM/YYYY'),
                key: date.format('YYYY-MM-DD'),
                value: moment$2(date.toDate())
            });
            this.daysAvailability.set(date.format('YYYY-MM-DD'), []);
        }
        this.loadAvailabilities();
    }
    /**
     * On switch date range
     * @param {?} viewMode
     * @return {?}
     */
    onSwithedView(viewMode) {
        this.viewModeChanged.emit(viewMode);
        this.setDateRange();
    }
    /**
     * On start change event
     * @param {?} start
     * @return {?}
     */
    onStartChanged(start) {
        this.start = start;
        this.setDateRange();
    }
    /**
     * On session added on click event
     * @param {?} session
     * @return {?}
     */
    onSessionAdded(session) {
        this.sessions.set(moment$2(session.start).format('YYYY-MM-DDHH:mm'), session);
        this.addSession(session);
        this.sessionCreated.emit(session);
    }
    /**
     * On removed event
     * @param {?} source
     * @return {?}
     */
    onSessionRemoved(source) {
        this.sessions.delete(source.key);
        this.removeSession(source.session);
        this.sessionRemoved.emit(source.session);
    }
    /**
     * Load all time for each days
     * @return {?}
     */
    loadAvailabilities() {
        // no online session no calendar
        if (!this.daysAvailability || !this.onlineSession) {
            return;
        }
        // session duration
        /** @type {?} */
        const duration = this.onlineSession.session_type.duration;
        // session day start 00:00 - end 23:59
        /** @type {?} */
        const onlineSessionStart = moment$2(this.onlineSession.date_range.start, 'YYYY-MM-DD').startOf('day');
        /** @type {?} */
        const onlineSessionEnd = moment$2(this.onlineSession.date_range.end, 'YYYY-MM-DD').endOf('day');
        this.daysAvailabilitySlotNumber = new Map();
        this.daysAvailability.forEach((/**
         * @param {?} avbs
         * @param {?} day
         * @return {?}
         */
        (avbs, day) => {
            /** @type {?} */
            let slotsNumber = 0;
            // each day of days availability with start time 08:00
            /** @type {?} */
            const mmtDay = moment$2(day, 'YYYY-MM-DD').hour(8);
            /** @type {?} */
            const mmtDayStartTime = moment$2(day + this.onlineSession.time_range.start, 'YYYY-MMDDHH:mm');
            // If session start time like 08:00 is before start today 00:00
            if (mmtDayStartTime.isBefore(moment$2().startOf('day'))) {
                return;
            }
            // booking delay
            /** @type {?} */
            const minMmtStartTime = moment$2().add(this.onlineSession.session_type.booking_delay, 'hours');
            // session time end
            /** @type {?} */
            const mmtDayEndTime = moment$2(day + this.onlineSession.time_range.end, 'YYYY-MM-DDHH:mm');
            mmtDayEndTime.subtract(duration, 'minutes');
            // slots iterator
            /** @type {?} */
            const timeRange = mmtDayStartTime.twix(mmtDayEndTime).iterate(this.slotDuration, 'minutes');
            if (this.calendarStart && this.calendarEnd && mmtDay.isBetween(onlineSessionStart, onlineSessionEnd)) {
                while (timeRange.hasNext()) {
                    /** @type {?} */
                    const time = timeRange.next();
                    /** @type {?} */
                    const timeMmt = moment$2(time.toDate());
                    if (!timeMmt.isBefore(minMmtStartTime)) {
                        avbs.push(time.format('HH:mm'));
                        slotsNumber++;
                    }
                }
            }
            this.daysAvailabilitySlotNumber.set(day, slotsNumber);
        }));
    }
    /**
     * Add session event in calendar
     * @param {?} session
     * @return {?}
     */
    addSession(session) {
        /** @type {?} */
        const mmtStart = moment$2(session.start);
        /** @type {?} */
        const mmtEnd = moment$2(session.end);
        /** @type {?} */
        const timeInnerRange = mmtStart.twix(mmtEnd).iterateInner(this.slotDuration, 'minutes');
        while (timeInnerRange.hasNext()) {
            /** @type {?} */
            const time = timeInnerRange.next();
            this.sessionsSlots.add(time.format('YYYY-MM-DDHH:mm'));
            if (!timeInnerRange.hasNext()) {
                this.sessionsEndSlots.add(time.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* building earliest slot before event */
        /** @type {?} */
        const mmtEarlyStart = mmtStart.clone().subtract(this.trueDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() - (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
        /** @type {?} */
        const timeEarlierRange = mmtEarlyStart.twix(mmtStart).iterate(this.slotDuration, 'minutes');
        while (timeEarlierRange.hasNext()) {
            /** @type {?} */
            const time = timeEarlierRange.next();
            /** @type {?} */
            const mmtTime = CalendarComponent.getMinutesDifference(moment$2(time.toDate()), this.slotDuration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                this.earlySlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* building pause slots after event */
        /** @type {?} */
        const mmtEarlyEnd = mmtEnd.clone();
        mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % this.slotDuration);
        /** @type {?} */
        const mmtPauseEnd = mmtEarlyEnd.clone().add(this.onlineSession.session_type.pause, 'minutes');
        /** @type {?} */
        const timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(this.slotDuration, 'minutes');
        while (timePauseRange.hasNext()) {
            /** @type {?} */
            const time = timePauseRange.next();
            /** @type {?} */
            const mmtTime = CalendarComponent.getMinutesDifference(moment$2(time.toDate()), this.slotDuration);
            if (mmtTime.isSameOrAfter(mmtEarlyEnd) && mmtTime.isBefore(mmtPauseEnd)) {
                this.pauseSlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
    }
    /**
     * Remove session event in Calendar
     * @param {?} session
     * @return {?}
     */
    removeSession(session) {
        /** @type {?} */
        const mmtStart = moment$2(session.start);
        /** @type {?} */
        const mmtEnd = moment$2(session.end);
        /** @type {?} */
        const timeInnerRange = mmtStart.twix(mmtEnd).iterate(this.slotDuration, 'minutes');
        while (timeInnerRange.hasNext()) {
            /** @type {?} */
            const time = timeInnerRange.next();
            this.sessionsSlots.delete(time.format('YYYY-MM-DDHH:mm'));
            if (!timeInnerRange.hasNext()) {
                this.sessionsEndSlots.delete(time.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* removing early slots */
        /** @type {?} */
        const mmtEarlyStart = mmtStart.clone().subtract(this.trueDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() - (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
        /** @type {?} */
        const timeEarlyRange = mmtEarlyStart.twix(mmtStart).iterate(this.slotDuration, 'minutes');
        while (timeEarlyRange.hasNext()) {
            /** @type {?} */
            const time = timeEarlyRange.next();
            /** @type {?} */
            const mmtTime = CalendarComponent.getMinutesDifference(moment$2(time.toDate()), this.slotDuration);
            if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
                this.earlySlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
            }
        }
        /* removing pause slots */
        if (session.pause) {
            /** @type {?} */
            const mmtEarlyEnd = mmtEnd.clone();
            mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % this.slotDuration);
            /** @type {?} */
            const mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
            /** @type {?} */
            const timePauseRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(this.slotDuration, 'minutes');
            while (timePauseRange.hasNext()) {
                /** @type {?} */
                const time = timePauseRange.next();
                /** @type {?} */
                const mmtTime = CalendarComponent.getMinutesDifference(moment$2(time.toDate()), this.slotDuration);
                if (mmtTime.isSameOrAfter(mmtEarlyEnd) && mmtTime.isBefore(mmtPauseEnd)) {
                    this.pauseSlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
                }
            }
        }
    }
    /**
     * *********************************************
     * ****************** Date functions **************
     * ***********************************************
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    loadEvents(start, end) {
        this.sessionService.filters$.next([
            {
                column: 'start',
                operator: '>=',
                value: moment$2(start).toDate()
            }
        ]);
        this.sessionService.getSessions()
            .subscribe((/**
         * @param {?} events
         * @return {?}
         */
        (events) => {
            this.events = [...events.filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => event && event.end <= end.toDate()))];
            this.busySlots = new Set();
            this.daysBusySlotNumber = new Map();
            this.events.forEach((/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                let mmtEventStart = moment$2(event.start, 'YYYY-MM-DDHH:mm');
                mmtEventStart = this.buildinBusySlot(mmtEventStart, event);
                this.buildingEarliestSlot(mmtEventStart);
            }));
            this.cd.markForCheck();
        }));
    }
    /**
     * @param {?} mmtEventStart
     * @param {?} event
     * @return {?}
     */
    buildinBusySlot(mmtEventStart, event) {
        /** @type {?} */
        const mmtEventEnd = moment$2(event.end, 'YYYY-MM-DDHH:mm');
        if (!mmtEventStart || !mmtEventStart.isValid()
            || !mmtEventEnd || !mmtEventEnd.isValid()
            || !mmtEventStart.isBefore(mmtEventEnd)) {
            console.error('invalid dates');
            return null;
        }
        /* building busy slots by events*/
        /** @type {?} */
        const eventsTimeRange = mmtEventStart.twix(mmtEventEnd).iterate(this.slotDuration, 'minutes');
        while (eventsTimeRange.hasNext()) {
            const { time, mmtTime } = CalendarComponent.splitRangeToNextTime(eventsTimeRange, this.slotDuration);
            /* IF the busy slot is in availability and not already in busySloits we count it */
            if (this.daysAvailability && this.daysAvailability.has(time.format('YYYY-MM-DD'))
                && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
                && this.daysAvailability.get(time.format('YYYY-MM-DD')).indexOf(time.format('HH:mm')) >= 0) {
                /** @type {?} */
                let dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
                    this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
                dayBusyNumber++;
                this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
            }
            this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
        }
        return mmtEventStart;
    }
    /**
     * @param {?} mmtEventStart
     * @return {?}
     */
    buildingEarliestSlot(mmtEventStart) {
        /* building earliest slot before event */
        /** @type {?} */
        const mmtEarlyStart = mmtEventStart.clone().subtract(this.trueDuration, 'minutes');
        mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
        /** @type {?} */
        const earliestTimeRange = mmtEarlyStart.twix(mmtEventStart).iterate(this.slotDuration, 'minutes');
        while (earliestTimeRange.hasNext()) {
            const { time, mmtTime } = CalendarComponent.splitRangeToNextTime(earliestTimeRange, this.slotDuration);
            /* IF the busy slot is in availability and not already in busySloits we count it */
            if (this.daysAvailability && this.daysAvailability.has(time.format('YYYY-MM-DD'))
                && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
                && this.daysAvailability.get(time.format('YYYY-MM-DD')).indexOf(time.format('HH:mm')) >= 0) {
                /** @type {?} */
                let dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
                    this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
                dayBusyNumber++;
                this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
            }
            this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
        }
    }
}
CalendarComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable
                selector: 'ngx-calendar',
                // tslint:enable
                template: "<mat-card class=\"week-calendar-wrapper\">\n  <mat-card-header class=\"week-calendar-header\">\n\n\n    <mat-card-title class=\"week-calendar-title\">\n\n\n      <lib-calendar-header [start]=\"start\"\n                           [end]=\"end\"\n                           [viewMode]=\"viewMode\"\n                           (switchedView)=\"onSwithedView($event)\"\n                           (startChanged)=\"onStartChanged($event)\"></lib-calendar-header>\n\n    </mat-card-title>\n\n\n  </mat-card-header>\n\n  <mat-card-content>\n\n\n    <lib-calendar-body [onlineSession]=\"onlineSession\"\n                       [days]=\"days\"\n                       [viewMode]=\"viewMode\"\n                       [start]=\"start\"\n                       [end]=\"end\"\n                       [daysAvailability]=\"daysAvailability\"\n                       [daysBusySlotNumber]=\"daysBusySlotNumber\"\n                       [daysAvailabilitySlotNumber]=\"daysAvailabilitySlotNumber\"\n                       [busySlots]=\"busySlots\"\n                       [earlySlots]=\"earlySlots\"\n                       [pauseSlots]=\"pauseSlots\"\n                       [sessionsSlots]=\"sessionsSlots\"\n                       [sessionsEndSlots]=\"sessionsEndSlots\"\n                       [sessions]=\"sessions\"\n                       (startChanged)=\"onStartChanged($event)\"\n                       (sessionAdded)=\"onSessionAdded($event)\"\n                       (sessionRemoved)=\"onSessionRemoved($event)\"\n                       *ngIf=\"start && end && days && viewMode\"></lib-calendar-body>\n\n  </mat-card-content>\n</mat-card>\n",
                styles: ["@media (min-width:768px){.week-calendar-wrapper .week-calendar-header .week-calendar-title{width:90vw}}"]
            }] }
];
/** @nocollapse */
CalendarComponent.ctorParameters = () => [
    { type: EventService },
    { type: SessionService },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
CalendarComponent.propDecorators = {
    onlineSession: [{ type: Input }],
    start: [{ type: Input }],
    end: [{ type: Input }],
    slotDuration: [{ type: Input }],
    viewModeChanged: [{ type: Output }],
    sessionCreated: [{ type: Output }],
    sessionRemoved: [{ type: Output }],
    el: [{ type: ViewChildren, args: ['dayList',] }],
    viewMode: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RoutingState {
    /**
     * @param {?} router
     */
    constructor(router) {
        this.router = router;
        this.history = [];
    }
    /**
     * @return {?}
     */
    loadRouting() {
        this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event instanceof NavigationEnd)))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ({ urlAfterRedirects }) => {
            this.history = [...this.history, urlAfterRedirects];
        }));
    }
    /**
     * @return {?}
     */
    getHistory() {
        return this.history;
    }
    /**
     * @return {?}
     */
    getPreviousUrl() {
        return this.history[this.history.length - 2] || '/';
    }
}
RoutingState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
RoutingState.ctorParameters = () => [
    { type: Router }
];
/** @nocollapse */ RoutingState.ngInjectableDef = ɵɵdefineInjectable({ factory: function RoutingState_Factory() { return new RoutingState(ɵɵinject(Router)); }, token: RoutingState, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TABLE_EVENT = new InjectionToken('event');
/** @type {?} */
const TABLE_SESSION = new InjectionToken('session');
class NgxCalendarModule {
}
NgxCalendarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FlexLayoutModule,
                    MatTooltipModule,
                    MatButtonModule,
                    MatCardModule,
                    MatTableModule,
                    MatIconModule,
                    TranslateModule.forChild()
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
                ],
                providers: [
                    AlertService,
                    RoutingState,
                    { provide: TABLE_SESSION, useValue: 'session' },
                    { provide: TABLE_EVENT, useValue: 'event' },
                    { provide: EventService, useClass: EventService, deps: [AngularFirestore, TABLE_EVENT] },
                    { provide: SessionService, useClass: SessionService, deps: [AngularFirestore, TABLE_SESSION] },
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Session extends Event {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { TABLE_EVENT, TABLE_SESSION, NgxCalendarModule, CalendarComponent, SessionService, EventService, Event, EventType, Session, CalendarBodyComponent as ɵc, CalendarHeaderComponent as ɵb, VisitorService as ɵa, AlertService as ɵd, RoutingState as ɵe };

//# sourceMappingURL=romainmarecat-ngx-calendar.js.map