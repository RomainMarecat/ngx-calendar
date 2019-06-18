/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment_ from 'moment';
/** @type {?} */
const moment = moment_;
export class CalendarHeaderComponent {
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
        this.start = moment();
        this.onStartChanged(this.start);
    }
    /**
     * Check if start is equal to today
     * @return {?}
     */
    isToday() {
        return moment() === moment(this.start);
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
        this.start = moment(this.start).subtract(daysNb, 'day');
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
        this.start = moment(this.start).add(daysNb, 'day');
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    CalendarHeaderComponent.prototype._viewMode;
    /** @type {?} */
    CalendarHeaderComponent.prototype.start;
    /** @type {?} */
    CalendarHeaderComponent.prototype.end;
    /** @type {?} */
    CalendarHeaderComponent.prototype.switchedView;
    /** @type {?} */
    CalendarHeaderComponent.prototype.startChanged;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9jYWxlbmRhci1oZWFkZXIvY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7TUFFNUIsTUFBTSxHQUFHLE9BQU87QUFPdEIsTUFBTSxPQUFPLHVCQUF1QjtJQUxwQztRQVNZLGlCQUFZLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDaEUsaUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQTRFNUUsQ0FBQzs7OztJQTFFQyxRQUFRO0lBQ1IsQ0FBQzs7Ozs7SUFFRCxJQUFhLFFBQVEsQ0FBQyxRQUFRO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7Ozs7O0lBS0QsVUFBVSxDQUFDLFFBQWdCO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFLRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBS0QsY0FBYyxDQUFDLFFBQWdCO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7OztJQUtELGNBQWMsQ0FBQyxLQUFhO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBS0QsU0FBUztRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFLRCxPQUFPO1FBQ0wsT0FBTyxNQUFNLEVBQUUsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7O0lBS0QsV0FBVzs7WUFDTCxNQUFNLEdBQUcsQ0FBQztRQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7WUFDNUIsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNaO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFLRCxPQUFPOztZQUNELE1BQU0sR0FBRyxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtZQUM1QixNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ1o7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7WUFyRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLHM5R0FBK0M7O2FBRWhEOzs7b0JBR0UsS0FBSztrQkFDTCxLQUFLOzJCQUNMLE1BQU07MkJBQ04sTUFBTTt1QkFLTixLQUFLOzs7Ozs7O0lBVE4sNENBQTBCOztJQUMxQix3Q0FBdUI7O0lBQ3ZCLHNDQUFxQjs7SUFDckIsK0NBQTBFOztJQUMxRSwrQ0FBMEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItY2FsZW5kYXItaGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLWhlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLWhlYWRlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFySGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSBfdmlld01vZGU6IFN0cmluZztcbiAgQElucHV0KCkgc3RhcnQ6IE1vbWVudDtcbiAgQElucHV0KCkgZW5kOiBNb21lbnQ7XG4gIEBPdXRwdXQoKSBzd2l0Y2hlZFZpZXc6IEV2ZW50RW1pdHRlcjxTdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxTdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBzdGFydENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxNb21lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb21lbnQ+KCk7XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgdmlld01vZGUodmlld01vZGUpIHtcbiAgICB0aGlzLnN3aXRjaFZpZXcodmlld01vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRjaCBjdXJyZW50IHZpZXcgdG8gYW5vdGhlclxuICAgKi9cbiAgc3dpdGNoVmlldyh2aWV3TW9kZTogU3RyaW5nKSB7XG4gICAgdGhpcy5fdmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLm9uU3dpdGNoZWRWaWV3KHZpZXdNb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXR0ZXIgb2YgcHJpdmF0ZSBfdmlld01vZGVcbiAgICovXG4gIGdldCB2aWV3TW9kZSgpOiBTdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl92aWV3TW9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0dGVyIG9mIHZpZXdcbiAgICovXG4gIG9uU3dpdGNoZWRWaWV3KHZpZXdNb2RlOiBTdHJpbmcpIHtcbiAgICB0aGlzLnN3aXRjaGVkVmlldy5lbWl0KHZpZXdNb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0dGVyIG9mIHN0YXJ0IGRhdGUgbW9tZW50XG4gICAqL1xuICBvblN0YXJ0Q2hhbmdlZChzdGFydDogTW9tZW50KSB7XG4gICAgdGhpcy5zdGFydENoYW5nZWQuZW1pdChzdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIHRvIG5vdyBvbiBzdGFydCBkYXRlXG4gICAqL1xuICBnb1RvVG9kYXkoKSB7XG4gICAgdGhpcy5zdGFydCA9IG1vbWVudCgpO1xuICAgIHRoaXMub25TdGFydENoYW5nZWQodGhpcy5zdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgc3RhcnQgaXMgZXF1YWwgdG8gdG9kYXlcbiAgICovXG4gIGlzVG9kYXkoKSB7XG4gICAgcmV0dXJuIG1vbWVudCgpID09PSBtb21lbnQodGhpcy5zdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogR28gdG8gcHJldmlvdXMgZGF5XG4gICAqL1xuICBwcmV2aW91c0RheSgpIHtcbiAgICBsZXQgZGF5c05iID0gMTtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3dlZWsnKSB7XG4gICAgICBkYXlzTmIgPSA3O1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLnN1YnRyYWN0KGRheXNOYiwgJ2RheScpO1xuICAgIHRoaXMub25TdGFydENoYW5nZWQodGhpcy5zdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogR28gdG8gbmV3IGRheVxuICAgKi9cbiAgbmV4dERheSgpIHtcbiAgICBsZXQgZGF5c05iID0gMTtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3dlZWsnKSB7XG4gICAgICBkYXlzTmIgPSA3O1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLmFkZChkYXlzTmIsICdkYXknKTtcbiAgICB0aGlzLm9uU3RhcnRDaGFuZ2VkKHRoaXMuc3RhcnQpO1xuICB9XG59XG4iXX0=