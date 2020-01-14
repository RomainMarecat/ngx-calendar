/**
 * @fileoverview added by tsickle
 * Generated from: lib/calendar/calendar-header/calendar-header.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    template: "<div fxLayout=\"row wrap\"\n     fxLayoutAlign=\"space-between stretch\"\n     fxLayout.xs=\"column\"\n     fxLayoutAlign.xs=\"start center\"\n     fxLayoutGap.xs=\"10px\"\n     *ngIf=\"headerConfiguration\">\n\n  <div class=\"left-actions\"\n       fxLayout=\"row\"\n       fxLayoutAlign=\"start stretch\"\n       fxLayoutGap=\"10px\"\n       fxLayout.xs=\"row\"\n       fxLayoutAlign.xs=\"center stretch\"\n       fxLayoutGap.xs=\"10px\">\n    <button class=\"button-actions\"\n            (click)=\"previousDay()\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.cta.previous\">\n      <mat-icon>keyboard_arrow_left</mat-icon>\n    </button>\n    <button class=\"button-actions\"\n            (click)=\"nextDay()\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.cta.next\">\n      <mat-icon>keyboard_arrow_right</mat-icon>\n    </button>\n    <button class=\"button-actions\"\n            [title]=\"headerConfiguration.calendar.back_today\"\n            [disabled]=\"isToday()\"\n            (click)=\"goToToday()\"\n            role=\"button\">\n      <mat-icon>today</mat-icon>\n    </button>\n  </div>\n  <div class=\"right-actions\"\n       fxLayout=\"row wrap\"\n       fxLayoutAlign=\"end stretch\"\n       fxLayoutGap=\"10px\"\n       fxLayout.xs=\"row wrap\"\n       fxLayoutAlign.xs=\"center stretch\"\n       fxLayoutGap.xs=\"10px\">\n    <button class=\"button-actions\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.today\"\n            [disabled]=\"true\"\n            [class.hide-on-small-only]=\"end?.format('YYYY-MM-DD') !== start?.format('YYYY-MM-DD')\">\n      <span>{{ start?.format('LL') }}</span>\n      <span *ngIf=\"end?.format('YYYY-MM-DD') !== start?.format('YYYY-MM-DD')\">\n        - {{ end?.format('LL') }}\n      </span>\n    </button>\n    <button class=\"button-actions\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.week\"\n            [class.active]=\"viewMode === 'week'\"\n            (click)=\"switchView('week')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_week</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ headerConfiguration.calendar.week }}</span>\n    </button>\n    <button class=\"button-actions\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.three_days\"\n            [class.active]=\"viewMode === 'three_days'\"\n            (click)=\"switchView('three_days')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_column</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ headerConfiguration.calendar.three_days }}</span>\n    </button>\n    <button class=\"button-actions\"\n            type=\"button\"\n            role=\"button\"\n            [title]=\"headerConfiguration.calendar.day\"\n            [class.active]=\"viewMode === 'day'\"\n            (click)=\"switchView('day')\"\n            fxHide.lt-md=\"true\">\n      <mat-icon>view_day</mat-icon>\n      <span fxHide.lt-md=\"true\">{{ headerConfiguration.calendar.day }}</span>\n    </button>\n  </div>\n</div>\n",
                    styles: [".button-actions span{margin-left:5px}button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:36px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);font-family:Lato,Roboto,sans-serif;font-size:14px;font-weight:500;display:inline-flex;align-items:center;justify-content:center}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9jYWxlbmRhci1oZWFkZXIvY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBRzVCLE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBQUE7Ozs7UUFpQlksaUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQzs7OztRQUloRSxpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO0lBcUY1RSxDQUFDO0lBdkVDLHNCQUFJLDZDQUFRO1FBSFo7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQztRQUVEOztXQUVHOzs7Ozs7UUFDSCxVQUFzQixRQUFRO1lBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUIsQ0FBQzs7O09BUEE7SUFTRDs7T0FFRzs7Ozs7O0lBQ0gsNENBQVU7Ozs7O0lBQVYsVUFBVyxRQUFnQjtRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsZ0RBQWM7Ozs7O0lBQWQsVUFBZSxRQUFnQjtRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNILGdEQUFjOzs7OztJQUFkLFVBQWUsS0FBYTtRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsMkNBQVM7Ozs7SUFBVDtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILHlDQUFPOzs7O0lBQVA7UUFDRSxPQUFPLE1BQU0sRUFBRSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILDZDQUFXOzs7O0lBQVg7O1lBQ00sTUFBTSxHQUFHLENBQUM7UUFDZCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1lBQzVCLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDWjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCx5Q0FBTzs7OztJQUFQOztZQUNNLE1BQU0sR0FBRyxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtZQUM1QixNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ1o7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDOztnQkF6R0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLDJzR0FBK0M7O2lCQUVoRDs7O3dCQUtFLEtBQUs7c0JBSUwsS0FBSzsrQkFJTCxNQUFNOytCQUlOLE1BQU07c0NBSU4sS0FBSzsyQkFpQkwsS0FBSzs7SUFnRVIsOEJBQUM7Q0FBQSxBQTFHRCxJQTBHQztTQXJHWSx1QkFBdUI7Ozs7OztJQUlsQyx3Q0FBdUI7Ozs7O0lBSXZCLHNDQUFxQjs7Ozs7SUFJckIsK0NBQTBFOzs7OztJQUkxRSwrQ0FBMEU7Ozs7O0lBSTFFLHNEQUFvRDs7Ozs7O0lBS3BELDRDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbmZpZ3VyYXRpb24vY2FsZW5kYXItY29uZmlndXJhdGlvbic7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1jYWxlbmRhci1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJIZWFkZXJDb21wb25lbnQge1xuICAvKipcbiAgICogU3RhcnQgZGF0ZVxuICAgKi9cbiAgQElucHV0KCkgc3RhcnQ6IE1vbWVudDtcbiAgLyoqXG4gICAqIEVuZCBkYXRlXG4gICAqL1xuICBASW5wdXQoKSBlbmQ6IE1vbWVudDtcbiAgLyoqXG4gICAqIFN3aXRjaCB2aWV3IGV2ZW50XG4gICAqL1xuICBAT3V0cHV0KCkgc3dpdGNoZWRWaWV3OiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAvKipcbiAgICogU3RhcnQgZGF5IGNoYW5nZWQgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSBzdGFydENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxNb21lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb21lbnQ+KCk7XG4gIC8qKlxuICAgKiBDb25maWd1cmF0aW9uIGhlYWRlclxuICAgKi9cbiAgQElucHV0KCkgaGVhZGVyQ29uZmlndXJhdGlvbjogQ2FsZW5kYXJDb25maWd1cmF0aW9uO1xuXG4gIC8qKlxuICAgKiBEaXNwbGF5IG1vZGVcbiAgICovXG4gIHByaXZhdGUgX3ZpZXdNb2RlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIGdldHRlciBvZiBwcml2YXRlIF92aWV3TW9kZVxuICAgKi9cbiAgZ2V0IHZpZXdNb2RlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHRlciBvZiBzd2l0Y2ggdmlld1xuICAgKi9cbiAgQElucHV0KCkgc2V0IHZpZXdNb2RlKHZpZXdNb2RlKSB7XG4gICAgdGhpcy5zd2l0Y2hWaWV3KHZpZXdNb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTd2l0Y2ggY3VycmVudCB2aWV3IHRvIGFub3RoZXJcbiAgICovXG4gIHN3aXRjaFZpZXcodmlld01vZGU6IHN0cmluZykge1xuICAgIHRoaXMuX3ZpZXdNb2RlID0gdmlld01vZGU7XG4gICAgdGhpcy5vblN3aXRjaGVkVmlldyh2aWV3TW9kZSk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHRlciBvZiB2aWV3XG4gICAqL1xuICBvblN3aXRjaGVkVmlldyh2aWV3TW9kZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zd2l0Y2hlZFZpZXcuZW1pdCh2aWV3TW9kZSk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHRlciBvZiBzdGFydCBkYXRlIG1vbWVudFxuICAgKi9cbiAgb25TdGFydENoYW5nZWQoc3RhcnQ6IE1vbWVudCkge1xuICAgIHRoaXMuc3RhcnRDaGFuZ2VkLmVtaXQoc3RhcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiB0byBub3cgb24gc3RhcnQgZGF0ZVxuICAgKi9cbiAgZ29Ub1RvZGF5KCkge1xuICAgIHRoaXMuc3RhcnQgPSBtb21lbnQoKTtcbiAgICB0aGlzLm9uU3RhcnRDaGFuZ2VkKHRoaXMuc3RhcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHN0YXJ0IGlzIGVxdWFsIHRvIHRvZGF5XG4gICAqL1xuICBpc1RvZGF5KCkge1xuICAgIHJldHVybiBtb21lbnQoKSA9PT0gbW9tZW50KHRoaXMuc3RhcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdvIHRvIHByZXZpb3VzIGRheVxuICAgKi9cbiAgcHJldmlvdXNEYXkoKSB7XG4gICAgbGV0IGRheXNOYiA9IDE7XG4gICAgaWYgKHRoaXMudmlld01vZGUgPT09ICd3ZWVrJykge1xuICAgICAgZGF5c05iID0gNztcbiAgICB9XG4gICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdWJ0cmFjdChkYXlzTmIsICdkYXknKTtcbiAgICB0aGlzLm9uU3RhcnRDaGFuZ2VkKHRoaXMuc3RhcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdvIHRvIG5ldyBkYXlcbiAgICovXG4gIG5leHREYXkoKSB7XG4gICAgbGV0IGRheXNOYiA9IDE7XG4gICAgaWYgKHRoaXMudmlld01vZGUgPT09ICd3ZWVrJykge1xuICAgICAgZGF5c05iID0gNztcbiAgICB9XG4gICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoZGF5c05iLCAnZGF5Jyk7XG4gICAgdGhpcy5vblN0YXJ0Q2hhbmdlZCh0aGlzLnN0YXJ0KTtcbiAgfVxufVxuIl19