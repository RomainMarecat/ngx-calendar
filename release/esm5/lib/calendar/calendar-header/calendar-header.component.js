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
        /**
         * Switch view event
         */
        this.switchedView = new EventEmitter();
        /**
         * Start day changed event
         */
        this.startChanged = new EventEmitter();
    }
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
        /**
         * Setter of switch view
         */
        set: /**
         * Setter of switch view
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
                    template: "<div fxLayout=\"row wrap\"\n     fxLayoutAlign=\"space-between stretch\"\n     fxLayout.xs=\"column\"\n     fxLayoutAlign.xs=\"start center\"\n     fxLayoutGap.xs=\"10px\">\n\n  <div class=\"left-actions\"\n       fxLayout=\"row\"\n       fxLayoutAlign=\"start stretch\"\n       fxLayoutGap=\"10px\"\n       fxLayout.xs=\"row\"\n       fxLayoutAlign.xs=\"center stretch\"\n       fxLayoutGap.xs=\"10px\">\n    <button class=\"button-actions\"\n            mat-raised-button\n            color=\"primary\"\n            (click)=\"previousDay()\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.cta.previous\">\n      <mat-icon>keyboard_arrow_left</mat-icon>\n    </button>\n    <button class=\"button-actions\"\n            mat-raised-button\n            (click)=\"nextDay()\"\n            color=\"primary\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.cta.next\">\n      <mat-icon>keyboard_arrow_right</mat-icon>\n    </button>\n    <button class=\"button-actions\"\n            [title]=\"headerConfiguration.calendar.back_today\"\n            mat-raised-button\n            color=\"primary\"\n            [disabled]=\"isToday()\"\n            (click)=\"goToToday()\"\n            role=\"button\">\n      <mat-icon>today</mat-icon>\n    </button>\n  </div>\n  <div class=\"right-actions\"\n       fxLayout=\"row wrap\"\n       fxLayoutAlign=\"end stretch\"\n       fxLayoutGap=\"10px\"\n       fxLayout.xs=\"row wrap\"\n       fxLayoutAlign.xs=\"center stretch\"\n       fxLayoutGap.xs=\"10px\">\n    <button class=\"button-actions\"\n            mat-raised-button\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.today\"\n            color=\"primary\"\n            [disabled]=\"true\"\n            [class.hide-on-small-only]=\"end?.format('YYYY-MM-DD') !== start?.format('YYYY-MM-DD')\">\n      <span>{{ start?.format('LL') }}</span>\n      <span *ngIf=\"end?.format('YYYY-MM-DD') !== start?.format('YYYY-MM-DD')\">\n        - {{ end?.format('LL') }}\n      </span>\n    </button>\n    <button class=\"button-actions\"\n            mat-raised-button\n            color=\"primary\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.week\"\n            [class.active]=\"viewMode === 'week'\"\n            (click)=\"switchView('week')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_week</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ headerConfiguration.calendar.week }}</span>\n    </button>\n    <button class=\"button-actions\"\n            mat-raised-button\n            color=\"primary\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.three_days\"\n            [class.active]=\"viewMode === 'three_days'\"\n            (click)=\"switchView('three_days')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_column</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ headerConfiguration.calendar.three_days }}</span>\n    </button>\n    <button class=\"button-actions\"\n            mat-raised-button\n            color=\"primary\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.day\"\n            [class.active]=\"viewMode === 'day'\"\n            (click)=\"switchView('day')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_day</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ headerConfiguration.calendar.day }}</span>\n    </button>\n  </div>\n</div>\n",
                    styles: [".button-actions span{margin-left:5px}"]
                }] }
    ];
    CalendarHeaderComponent.propDecorators = {
        start: [{ type: Input }],
        end: [{ type: Input }],
        switchedView: [{ type: Output }],
        startChanged: [{ type: Output }],
        headerConfiguration: [{ type: Input }],
        viewMode: [{ type: Input }]
    };
    return CalendarHeaderComponent;
}());
export { CalendarHeaderComponent };
if (false) {
    /**
     * Start date
     * @type {?}
     */
    CalendarHeaderComponent.prototype.start;
    /**
     * End date
     * @type {?}
     */
    CalendarHeaderComponent.prototype.end;
    /**
     * Switch view event
     * @type {?}
     */
    CalendarHeaderComponent.prototype.switchedView;
    /**
     * Start day changed event
     * @type {?}
     */
    CalendarHeaderComponent.prototype.startChanged;
    /**
     * Configuration header
     * @type {?}
     */
    CalendarHeaderComponent.prototype.headerConfiguration;
    /**
     * Display mode
     * @type {?}
     * @private
     */
    CalendarHeaderComponent.prototype._viewMode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9jYWxlbmRhci1oZWFkZXIvY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7SUFHNUIsTUFBTSxHQUFHLE9BQU87QUFFdEI7SUFBQTs7OztRQWlCWSxpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDOzs7O1FBSWhFLGlCQUFZLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7SUFxRjVFLENBQUM7SUF2RUMsc0JBQUksNkNBQVE7UUFIWjs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDO1FBRUQ7O1dBRUc7Ozs7OztRQUNILFVBQXNCLFFBQVE7WUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixDQUFDOzs7T0FQQTtJQVNEOztPQUVHOzs7Ozs7SUFDSCw0Q0FBVTs7Ozs7SUFBVixVQUFXLFFBQWdCO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSCxnREFBYzs7Ozs7SUFBZCxVQUFlLFFBQWdCO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsZ0RBQWM7Ozs7O0lBQWQsVUFBZSxLQUFhO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCwyQ0FBUzs7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gseUNBQU87Ozs7SUFBUDtRQUNFLE9BQU8sTUFBTSxFQUFFLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsNkNBQVc7Ozs7SUFBWDs7WUFDTSxNQUFNLEdBQUcsQ0FBQztRQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7WUFDNUIsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNaO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILHlDQUFPOzs7O0lBQVA7O1lBQ00sTUFBTSxHQUFHLENBQUM7UUFDZCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1lBQzVCLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDWjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7O2dCQXpHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IseWxIQUErQzs7aUJBRWhEOzs7d0JBS0UsS0FBSztzQkFJTCxLQUFLOytCQUlMLE1BQU07K0JBSU4sTUFBTTtzQ0FJTixLQUFLOzJCQWlCTCxLQUFLOztJQWdFUiw4QkFBQztDQUFBLEFBMUdELElBMEdDO1NBckdZLHVCQUF1Qjs7Ozs7O0lBSWxDLHdDQUF1Qjs7Ozs7SUFJdkIsc0NBQXFCOzs7OztJQUlyQiwrQ0FBMEU7Ozs7O0lBSTFFLCtDQUEwRTs7Ozs7SUFJMUUsc0RBQW9EOzs7Ozs7SUFLcEQsNENBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlndXJhdGlvbi9jYWxlbmRhci1jb25maWd1cmF0aW9uJztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWNhbGVuZGFyLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci1oZWFkZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckhlYWRlckNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBTdGFydCBkYXRlXG4gICAqL1xuICBASW5wdXQoKSBzdGFydDogTW9tZW50O1xuICAvKipcbiAgICogRW5kIGRhdGVcbiAgICovXG4gIEBJbnB1dCgpIGVuZDogTW9tZW50O1xuICAvKipcbiAgICogU3dpdGNoIHZpZXcgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSBzd2l0Y2hlZFZpZXc6IEV2ZW50RW1pdHRlcjxTdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxTdHJpbmc+KCk7XG4gIC8qKlxuICAgKiBTdGFydCBkYXkgY2hhbmdlZCBldmVudFxuICAgKi9cbiAgQE91dHB1dCgpIHN0YXJ0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPE1vbWVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vbWVudD4oKTtcbiAgLyoqXG4gICAqIENvbmZpZ3VyYXRpb24gaGVhZGVyXG4gICAqL1xuICBASW5wdXQoKSBoZWFkZXJDb25maWd1cmF0aW9uOiBDYWxlbmRhckNvbmZpZ3VyYXRpb247XG5cbiAgLyoqXG4gICAqIERpc3BsYXkgbW9kZVxuICAgKi9cbiAgcHJpdmF0ZSBfdmlld01vZGU6IFN0cmluZztcblxuICAvKipcbiAgICogZ2V0dGVyIG9mIHByaXZhdGUgX3ZpZXdNb2RlXG4gICAqL1xuICBnZXQgdmlld01vZGUoKTogU3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld01vZGU7XG4gIH1cblxuICAvKipcbiAgICogU2V0dGVyIG9mIHN3aXRjaCB2aWV3XG4gICAqL1xuICBASW5wdXQoKSBzZXQgdmlld01vZGUodmlld01vZGUpIHtcbiAgICB0aGlzLnN3aXRjaFZpZXcodmlld01vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRjaCBjdXJyZW50IHZpZXcgdG8gYW5vdGhlclxuICAgKi9cbiAgc3dpdGNoVmlldyh2aWV3TW9kZTogU3RyaW5nKSB7XG4gICAgdGhpcy5fdmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLm9uU3dpdGNoZWRWaWV3KHZpZXdNb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0dGVyIG9mIHZpZXdcbiAgICovXG4gIG9uU3dpdGNoZWRWaWV3KHZpZXdNb2RlOiBTdHJpbmcpIHtcbiAgICB0aGlzLnN3aXRjaGVkVmlldy5lbWl0KHZpZXdNb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0dGVyIG9mIHN0YXJ0IGRhdGUgbW9tZW50XG4gICAqL1xuICBvblN0YXJ0Q2hhbmdlZChzdGFydDogTW9tZW50KSB7XG4gICAgdGhpcy5zdGFydENoYW5nZWQuZW1pdChzdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIHRvIG5vdyBvbiBzdGFydCBkYXRlXG4gICAqL1xuICBnb1RvVG9kYXkoKSB7XG4gICAgdGhpcy5zdGFydCA9IG1vbWVudCgpO1xuICAgIHRoaXMub25TdGFydENoYW5nZWQodGhpcy5zdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgc3RhcnQgaXMgZXF1YWwgdG8gdG9kYXlcbiAgICovXG4gIGlzVG9kYXkoKSB7XG4gICAgcmV0dXJuIG1vbWVudCgpID09PSBtb21lbnQodGhpcy5zdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogR28gdG8gcHJldmlvdXMgZGF5XG4gICAqL1xuICBwcmV2aW91c0RheSgpIHtcbiAgICBsZXQgZGF5c05iID0gMTtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3dlZWsnKSB7XG4gICAgICBkYXlzTmIgPSA3O1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLnN1YnRyYWN0KGRheXNOYiwgJ2RheScpO1xuICAgIHRoaXMub25TdGFydENoYW5nZWQodGhpcy5zdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogR28gdG8gbmV3IGRheVxuICAgKi9cbiAgbmV4dERheSgpIHtcbiAgICBsZXQgZGF5c05iID0gMTtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3dlZWsnKSB7XG4gICAgICBkYXlzTmIgPSA3O1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLmFkZChkYXlzTmIsICdkYXknKTtcbiAgICB0aGlzLm9uU3RhcnRDaGFuZ2VkKHRoaXMuc3RhcnQpO1xuICB9XG59XG4iXX0=