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
     * @return {?}
     */
    get viewMode() {
        return this._viewMode;
    }
    /**
     * Setter of switch view
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
                template: "<div fxLayout=\"row wrap\"\n     fxLayoutAlign=\"space-between stretch\"\n     fxLayout.xs=\"column\"\n     fxLayoutAlign.xs=\"start center\"\n     fxLayoutGap.xs=\"10px\"\n     *ngIf=\"headerConfiguration\">\n\n  <div class=\"left-actions\"\n       fxLayout=\"row\"\n       fxLayoutAlign=\"start stretch\"\n       fxLayoutGap=\"10px\"\n       fxLayout.xs=\"row\"\n       fxLayoutAlign.xs=\"center stretch\"\n       fxLayoutGap.xs=\"10px\">\n    <button class=\"button-actions\"\n            (click)=\"previousDay()\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.cta.previous\">\n      <mat-icon>keyboard_arrow_left</mat-icon>\n    </button>\n    <button class=\"button-actions\"\n            (click)=\"nextDay()\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.cta.next\">\n      <mat-icon>keyboard_arrow_right</mat-icon>\n    </button>\n    <button class=\"button-actions\"\n            [title]=\"headerConfiguration.calendar.back_today\"\n            [disabled]=\"isToday()\"\n            (click)=\"goToToday()\"\n            role=\"button\">\n      <mat-icon>today</mat-icon>\n    </button>\n  </div>\n  <div class=\"right-actions\"\n       fxLayout=\"row wrap\"\n       fxLayoutAlign=\"end stretch\"\n       fxLayoutGap=\"10px\"\n       fxLayout.xs=\"row wrap\"\n       fxLayoutAlign.xs=\"center stretch\"\n       fxLayoutGap.xs=\"10px\">\n    <button class=\"button-actions\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.today\"\n            [disabled]=\"true\"\n            [class.hide-on-small-only]=\"end?.format('YYYY-MM-DD') !== start?.format('YYYY-MM-DD')\">\n      <span>{{ start?.format('LL') }}</span>\n      <span *ngIf=\"end?.format('YYYY-MM-DD') !== start?.format('YYYY-MM-DD')\">\n        - {{ end?.format('LL') }}\n      </span>\n    </button>\n    <button class=\"button-actions\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.week\"\n            [class.active]=\"viewMode === 'week'\"\n            (click)=\"switchView('week')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_week</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ headerConfiguration.calendar.week }}</span>\n    </button>\n    <button class=\"button-actions\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.three_days\"\n            [class.active]=\"viewMode === 'three_days'\"\n            (click)=\"switchView('three_days')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_column</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ headerConfiguration.calendar.three_days }}</span>\n    </button>\n    <button class=\"button-actions\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.day\"\n            [class.active]=\"viewMode === 'day'\"\n            (click)=\"switchView('day')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_day</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ headerConfiguration.calendar.day }}</span>\n    </button>\n  </div>\n</div>\n",
                styles: [".button-actions span{margin-left:5px}button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:36px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);font-family:Lato,Roboto,sans-serif;font-size:14px;font-weight:500;display:inline-flex;align-items:center;justify-content:center}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9jYWxlbmRhci1oZWFkZXIvY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7TUFHNUIsTUFBTSxHQUFHLE9BQU87QUFPdEIsTUFBTSxPQUFPLHVCQUF1QjtJQUxwQzs7OztRQWlCWSxpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDOzs7O1FBSWhFLGlCQUFZLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7SUFxRjVFLENBQUM7Ozs7O0lBdkVDLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFLRCxJQUFhLFFBQVEsQ0FBQyxRQUFRO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7Ozs7O0lBS0QsVUFBVSxDQUFDLFFBQWdCO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7O0lBS0QsY0FBYyxDQUFDLFFBQWdCO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7OztJQUtELGNBQWMsQ0FBQyxLQUFhO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBS0QsU0FBUztRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFLRCxPQUFPO1FBQ0wsT0FBTyxNQUFNLEVBQUUsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7O0lBS0QsV0FBVzs7WUFDTCxNQUFNLEdBQUcsQ0FBQztRQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7WUFDNUIsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNaO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFLRCxPQUFPOztZQUNELE1BQU0sR0FBRyxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtZQUM1QixNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ1o7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7WUF6R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLDJzR0FBK0M7O2FBRWhEOzs7b0JBS0UsS0FBSztrQkFJTCxLQUFLOzJCQUlMLE1BQU07MkJBSU4sTUFBTTtrQ0FJTixLQUFLO3VCQWlCTCxLQUFLOzs7Ozs7O0lBakNOLHdDQUF1Qjs7Ozs7SUFJdkIsc0NBQXFCOzs7OztJQUlyQiwrQ0FBMEU7Ozs7O0lBSTFFLCtDQUEwRTs7Ozs7SUFJMUUsc0RBQW9EOzs7Ozs7SUFLcEQsNENBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlndXJhdGlvbi9jYWxlbmRhci1jb25maWd1cmF0aW9uJztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWNhbGVuZGFyLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci1oZWFkZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckhlYWRlckNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBTdGFydCBkYXRlXG4gICAqL1xuICBASW5wdXQoKSBzdGFydDogTW9tZW50O1xuICAvKipcbiAgICogRW5kIGRhdGVcbiAgICovXG4gIEBJbnB1dCgpIGVuZDogTW9tZW50O1xuICAvKipcbiAgICogU3dpdGNoIHZpZXcgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSBzd2l0Y2hlZFZpZXc6IEV2ZW50RW1pdHRlcjxTdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxTdHJpbmc+KCk7XG4gIC8qKlxuICAgKiBTdGFydCBkYXkgY2hhbmdlZCBldmVudFxuICAgKi9cbiAgQE91dHB1dCgpIHN0YXJ0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPE1vbWVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vbWVudD4oKTtcbiAgLyoqXG4gICAqIENvbmZpZ3VyYXRpb24gaGVhZGVyXG4gICAqL1xuICBASW5wdXQoKSBoZWFkZXJDb25maWd1cmF0aW9uOiBDYWxlbmRhckNvbmZpZ3VyYXRpb247XG5cbiAgLyoqXG4gICAqIERpc3BsYXkgbW9kZVxuICAgKi9cbiAgcHJpdmF0ZSBfdmlld01vZGU6IFN0cmluZztcblxuICAvKipcbiAgICogZ2V0dGVyIG9mIHByaXZhdGUgX3ZpZXdNb2RlXG4gICAqL1xuICBnZXQgdmlld01vZGUoKTogU3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld01vZGU7XG4gIH1cblxuICAvKipcbiAgICogU2V0dGVyIG9mIHN3aXRjaCB2aWV3XG4gICAqL1xuICBASW5wdXQoKSBzZXQgdmlld01vZGUodmlld01vZGUpIHtcbiAgICB0aGlzLnN3aXRjaFZpZXcodmlld01vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRjaCBjdXJyZW50IHZpZXcgdG8gYW5vdGhlclxuICAgKi9cbiAgc3dpdGNoVmlldyh2aWV3TW9kZTogU3RyaW5nKSB7XG4gICAgdGhpcy5fdmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLm9uU3dpdGNoZWRWaWV3KHZpZXdNb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0dGVyIG9mIHZpZXdcbiAgICovXG4gIG9uU3dpdGNoZWRWaWV3KHZpZXdNb2RlOiBTdHJpbmcpIHtcbiAgICB0aGlzLnN3aXRjaGVkVmlldy5lbWl0KHZpZXdNb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0dGVyIG9mIHN0YXJ0IGRhdGUgbW9tZW50XG4gICAqL1xuICBvblN0YXJ0Q2hhbmdlZChzdGFydDogTW9tZW50KSB7XG4gICAgdGhpcy5zdGFydENoYW5nZWQuZW1pdChzdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIHRvIG5vdyBvbiBzdGFydCBkYXRlXG4gICAqL1xuICBnb1RvVG9kYXkoKSB7XG4gICAgdGhpcy5zdGFydCA9IG1vbWVudCgpO1xuICAgIHRoaXMub25TdGFydENoYW5nZWQodGhpcy5zdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgc3RhcnQgaXMgZXF1YWwgdG8gdG9kYXlcbiAgICovXG4gIGlzVG9kYXkoKSB7XG4gICAgcmV0dXJuIG1vbWVudCgpID09PSBtb21lbnQodGhpcy5zdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogR28gdG8gcHJldmlvdXMgZGF5XG4gICAqL1xuICBwcmV2aW91c0RheSgpIHtcbiAgICBsZXQgZGF5c05iID0gMTtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3dlZWsnKSB7XG4gICAgICBkYXlzTmIgPSA3O1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLnN1YnRyYWN0KGRheXNOYiwgJ2RheScpO1xuICAgIHRoaXMub25TdGFydENoYW5nZWQodGhpcy5zdGFydCk7XG4gIH1cblxuICAvKipcbiAgICogR28gdG8gbmV3IGRheVxuICAgKi9cbiAgbmV4dERheSgpIHtcbiAgICBsZXQgZGF5c05iID0gMTtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gJ3dlZWsnKSB7XG4gICAgICBkYXlzTmIgPSA3O1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpLmFkZChkYXlzTmIsICdkYXknKTtcbiAgICB0aGlzLm9uU3RhcnRDaGFuZ2VkKHRoaXMuc3RhcnQpO1xuICB9XG59XG4iXX0=