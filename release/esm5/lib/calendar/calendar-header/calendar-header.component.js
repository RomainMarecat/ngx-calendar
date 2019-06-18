/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment_ from 'moment';
/** @type {?} */
var moment = moment_;
var CalendarHeaderComponent = /** @class */ (function () {
    function CalendarHeaderComponent() {
        this.switchedView = new EventEmitter();
        this.startChanged = new EventEmitter();
    }
    /**
     * @return {?}
     */
    CalendarHeaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    Object.defineProperty(CalendarHeaderComponent.prototype, "viewMode", {
        /**
         * getter of private _viewMode
         */
        get: /**
         * getter of private _viewMode
         * @return {?}
         */
        function () {
            return this._viewMode;
        },
        set: /**
         * @param {?} viewMode
         * @return {?}
         */
        function (viewMode) {
            this.switchView(viewMode);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Switch current view to another
     */
    /**
     * Switch current view to another
     * @param {?} viewMode
     * @return {?}
     */
    CalendarHeaderComponent.prototype.switchView = /**
     * Switch current view to another
     * @param {?} viewMode
     * @return {?}
     */
    function (viewMode) {
        this._viewMode = viewMode;
        this.onSwitchedView(viewMode);
    };
    /**
     * Emitter of view
     */
    /**
     * Emitter of view
     * @param {?} viewMode
     * @return {?}
     */
    CalendarHeaderComponent.prototype.onSwitchedView = /**
     * Emitter of view
     * @param {?} viewMode
     * @return {?}
     */
    function (viewMode) {
        this.switchedView.emit(viewMode);
    };
    /**
     * Emitter of start date moment
     */
    /**
     * Emitter of start date moment
     * @param {?} start
     * @return {?}
     */
    CalendarHeaderComponent.prototype.onStartChanged = /**
     * Emitter of start date moment
     * @param {?} start
     * @return {?}
     */
    function (start) {
        this.startChanged.emit(start);
    };
    /**
     * return to now on start date
     */
    /**
     * return to now on start date
     * @return {?}
     */
    CalendarHeaderComponent.prototype.goToToday = /**
     * return to now on start date
     * @return {?}
     */
    function () {
        this.start = moment();
        this.onStartChanged(this.start);
    };
    /**
     * Check if start is equal to today
     */
    /**
     * Check if start is equal to today
     * @return {?}
     */
    CalendarHeaderComponent.prototype.isToday = /**
     * Check if start is equal to today
     * @return {?}
     */
    function () {
        return moment() === moment(this.start);
    };
    /**
     * Go to previous day
     */
    /**
     * Go to previous day
     * @return {?}
     */
    CalendarHeaderComponent.prototype.previousDay = /**
     * Go to previous day
     * @return {?}
     */
    function () {
        /** @type {?} */
        var daysNb = 1;
        if (this.viewMode === 'week') {
            daysNb = 7;
        }
        this.start = moment(this.start).subtract(daysNb, 'day');
        this.onStartChanged(this.start);
    };
    /**
     * Go to new day
     */
    /**
     * Go to new day
     * @return {?}
     */
    CalendarHeaderComponent.prototype.nextDay = /**
     * Go to new day
     * @return {?}
     */
    function () {
        /** @type {?} */
        var daysNb = 1;
        if (this.viewMode === 'week') {
            daysNb = 7;
        }
        this.start = moment(this.start).add(daysNb, 'day');
        this.onStartChanged(this.start);
    };
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
    return CalendarHeaderComponent;
}());
export { CalendarHeaderComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9jYWxlbmRhci1oZWFkZXIvY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7SUFFNUIsTUFBTSxHQUFHLE9BQU87QUFFdEI7SUFBQTtRQVNZLGlCQUFZLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDaEUsaUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQTRFNUUsQ0FBQzs7OztJQTFFQywwQ0FBUTs7O0lBQVI7SUFDQSxDQUFDO0lBRUQsc0JBQWEsNkNBQVE7UUFZckI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7Ozs7UUFqQkQsVUFBc0IsUUFBUTtZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBRUQ7O09BRUc7Ozs7OztJQUNILDRDQUFVOzs7OztJQUFWLFVBQVcsUUFBZ0I7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBU0Q7O09BRUc7Ozs7OztJQUNILGdEQUFjOzs7OztJQUFkLFVBQWUsUUFBZ0I7UUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSCxnREFBYzs7Ozs7SUFBZCxVQUFlLEtBQWE7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILDJDQUFTOzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCx5Q0FBTzs7OztJQUFQO1FBQ0UsT0FBTyxNQUFNLEVBQUUsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCw2Q0FBVzs7OztJQUFYOztZQUNNLE1BQU0sR0FBRyxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtZQUM1QixNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ1o7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gseUNBQU87Ozs7SUFBUDs7WUFDTSxNQUFNLEdBQUcsQ0FBQztRQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7WUFDNUIsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNaO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Z0JBckZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixzOUdBQStDOztpQkFFaEQ7Ozt3QkFHRSxLQUFLO3NCQUNMLEtBQUs7K0JBQ0wsTUFBTTsrQkFDTixNQUFNOzJCQUtOLEtBQUs7O0lBdUVSLDhCQUFDO0NBQUEsQUF0RkQsSUFzRkM7U0FqRlksdUJBQXVCOzs7Ozs7SUFDbEMsNENBQTBCOztJQUMxQix3Q0FBdUI7O0lBQ3ZCLHNDQUFxQjs7SUFDckIsK0NBQTBFOztJQUMxRSwrQ0FBMEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItY2FsZW5kYXItaGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLWhlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLWhlYWRlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFySGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSBfdmlld01vZGU6IFN0cmluZztcbiAgQElucHV0KCkgc3RhcnQ6IE1vbWVudDtcbiAgQElucHV0KCkgZW5kOiBNb21lbnQ7XG4gIEBPdXRwdXQoKSBzd2l0Y2hlZFZpZXc6IEV2ZW50RW1pdHRlcjxTdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxTdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBzdGFydENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxNb21lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb21lbnQ+KCk7XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgdmlld01vZGUodmlld01vZGUpIHtcbiAgICB0aGlzLnN3aXRjaFZpZXcodmlld01vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRjaCBjdXJyZW50IHZpZXcgdG8gYW5vdGhlclxuICAgKi9cbiAgc3dpdGNoVmlldyh2aWV3TW9kZTogU3RyaW5nKSB7XG4gICAgdGhpcy5fdmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLm9uU3dpdGNoZWRWaWV3KHZpZXdNb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXR0ZXIgb2YgcHJpdmF0ZSBfdmlld01vZGVcbiAgICovXG4gIGdldCB2aWV3TW9kZSgpOiBTdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl92aWV3TW9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0dGVyIG9mIHZpZXdcbiAgICovXG4gIG9uU3dpdGNoZWRWaWV3KHZpZXdNb2RlOiBTdHJpbmcpIHtcbiAgICB0aGlzLnN3aXRjaGVkVmlldy5lbWl0KHZpZXdNb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0dGVyIG9mIHN0YXJ0IGRhdGUgbW9tZW50XG4gICAqL1xuICBvblN0YXJ0Q2hhbmdlZChzdGFydDogTW9tZW50KSB7XG4gICAgdGhpcy5zdGFydENoYW5nZWQuZW1pdChzdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIHRvIG5vdyBvbiBzdGFydCBkYXRlXG4gICAqL1xuICBnb1RvVG9kYXkoKSB7XG4gICAgdGhpcy5zdGFydCA9IG1vbWVudCgpO1xuICAgIHRoaXMub25TdGFydENoYW5nZWQodGhpcy5zdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgc3RhcnQgaXMgZXF1YWwgdG8gdG9kYXlcbiAgICovXG4gIGlzVG9kYXkoKSB7XG4gICAgcmV0dXJuIG1vbWVudCgpID09PSBtb21lbnQodGhpcy5zdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogR28gdG8gcHJldmlvdXMgZGF5XG4gICAqL1xuICBwcmV2aW91c0RheSgpIHtcbiAgICBsZXQgZGF5c05iID0gMTtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3dlZWsnKSB7XG4gICAgICBkYXlzTmIgPSA3O1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLnN1YnRyYWN0KGRheXNOYiwgJ2RheScpO1xuICAgIHRoaXMub25TdGFydENoYW5nZWQodGhpcy5zdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogR28gdG8gbmV3IGRheVxuICAgKi9cbiAgbmV4dERheSgpIHtcbiAgICBsZXQgZGF5c05iID0gMTtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3dlZWsnKSB7XG4gICAgICBkYXlzTmIgPSA3O1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLmFkZChkYXlzTmIsICdkYXknKTtcbiAgICB0aGlzLm9uU3RhcnRDaGFuZ2VkKHRoaXMuc3RhcnQpO1xuICB9XG59XG4iXX0=