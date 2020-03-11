import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment_ from 'moment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/flex-layout/flex";
import * as i3 from "@angular/material/icon";
import * as i4 from "@angular/flex-layout/extended";
function CalendarHeaderComponent_div_0_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r69 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" - ", ctx_r69.end == null ? null : ctx_r69.end.format("LL"), " ");
} }
function CalendarHeaderComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    var _r71 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵelementStart(2, "button", 3);
    i0.ɵɵlistener("click", function CalendarHeaderComponent_div_0_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r71); var ctx_r70 = i0.ɵɵnextContext(); return ctx_r70.previousDay(); });
    i0.ɵɵelementStart(3, "mat-icon");
    i0.ɵɵtext(4, "keyboard_arrow_left");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 3);
    i0.ɵɵlistener("click", function CalendarHeaderComponent_div_0_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r71); var ctx_r72 = i0.ɵɵnextContext(); return ctx_r72.nextDay(); });
    i0.ɵɵelementStart(6, "mat-icon");
    i0.ɵɵtext(7, "keyboard_arrow_right");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 4);
    i0.ɵɵlistener("click", function CalendarHeaderComponent_div_0_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r71); var ctx_r73 = i0.ɵɵnextContext(); return ctx_r73.goToToday(); });
    i0.ɵɵelementStart(9, "mat-icon");
    i0.ɵɵtext(10, "today");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 5);
    i0.ɵɵelementStart(12, "button", 6);
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, CalendarHeaderComponent_div_0_span_15_Template, 2, 1, "span", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 8);
    i0.ɵɵlistener("click", function CalendarHeaderComponent_div_0_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r71); var ctx_r74 = i0.ɵɵnextContext(); return ctx_r74.switchView("week"); });
    i0.ɵɵelementStart(17, "mat-icon");
    i0.ɵɵtext(18, "view_week");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 9);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 8);
    i0.ɵɵlistener("click", function CalendarHeaderComponent_div_0_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r71); var ctx_r75 = i0.ɵɵnextContext(); return ctx_r75.switchView("three_days"); });
    i0.ɵɵelementStart(22, "mat-icon");
    i0.ɵɵtext(23, "view_column");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 9);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 8);
    i0.ɵɵlistener("click", function CalendarHeaderComponent_div_0_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r71); var ctx_r76 = i0.ɵɵnextContext(); return ctx_r76.switchView("day"); });
    i0.ɵɵelementStart(27, "mat-icon");
    i0.ɵɵtext(28, "view_day");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span", 9);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r68 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", ctx_r68.headerConfiguration.calendar.cta.previous);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("title", ctx_r68.headerConfiguration.calendar.cta.next);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("title", ctx_r68.headerConfiguration.calendar.back_today)("disabled", ctx_r68.isToday());
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("hide-on-small-only", (ctx_r68.end == null ? null : ctx_r68.end.format("YYYY-MM-DD")) !== (ctx_r68.start == null ? null : ctx_r68.start.format("YYYY-MM-DD")));
    i0.ɵɵproperty("title", ctx_r68.headerConfiguration.calendar.today)("disabled", true);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r68.start == null ? null : ctx_r68.start.format("LL"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r68.end == null ? null : ctx_r68.end.format("YYYY-MM-DD")) !== (ctx_r68.start == null ? null : ctx_r68.start.format("YYYY-MM-DD")));
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("active", ctx_r68.viewMode === "week");
    i0.ɵɵproperty("title", ctx_r68.headerConfiguration.calendar.week);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r68.headerConfiguration.calendar.week);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("active", ctx_r68.viewMode === "three_days");
    i0.ɵɵproperty("title", ctx_r68.headerConfiguration.calendar.three_days);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r68.headerConfiguration.calendar.three_days);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("active", ctx_r68.viewMode === "day");
    i0.ɵɵproperty("title", ctx_r68.headerConfiguration.calendar.day);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r68.headerConfiguration.calendar.day);
} }
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
        this.start = moment();
        this.onStartChanged(this.start);
    };
    /**
     * Check if start is equal to today
     */
    CalendarHeaderComponent.prototype.isToday = function () {
        return moment() === moment(this.start);
    };
    /**
     * Go to previous day
     */
    CalendarHeaderComponent.prototype.previousDay = function () {
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
    CalendarHeaderComponent.prototype.nextDay = function () {
        var daysNb = 1;
        if (this.viewMode === 'week') {
            daysNb = 7;
        }
        this.start = moment(this.start).add(daysNb, 'day');
        this.onStartChanged(this.start);
    };
    CalendarHeaderComponent.ɵfac = function CalendarHeaderComponent_Factory(t) { return new (t || CalendarHeaderComponent)(); };
    CalendarHeaderComponent.ɵcmp = i0.ɵɵdefineComponent({ type: CalendarHeaderComponent, selectors: [["lib-calendar-header"]], inputs: { start: "start", end: "end", headerConfiguration: "headerConfiguration", viewMode: "viewMode" }, outputs: { switchedView: "switchedView", startChanged: "startChanged" }, decls: 1, vars: 1, consts: [["fxLayout", "row wrap", "fxLayoutAlign", "start stretch", "fxLayout.xs", "column", "fxLayoutAlign.xs", "start center", "fxLayoutGap.xs", "10px", 4, "ngIf"], ["fxLayout", "row wrap", "fxLayoutAlign", "start stretch", "fxLayout.xs", "column", "fxLayoutAlign.xs", "start center", "fxLayoutGap.xs", "10px"], ["fxLayout", "row", "fxLayoutAlign", "start stretch", "fxLayoutGap", "10px", "fxLayout.xs", "row", "fxLayoutAlign.xs", "center stretch", "fxLayoutGap.xs", "10px", 1, "left-actions"], ["type", "button", "role", "button", 1, "button-actions", 3, "title", "click"], ["role", "button", 1, "button-actions", 3, "title", "disabled", "click"], ["fxLayout", "row wrap", "fxLayoutAlign", "end stretch", "fxLayoutGap", "10px", "fxLayout.xs", "row wrap", "fxLayoutAlign.xs", "center stretch", "fxLayoutGap.xs", "10px", 1, "right-actions"], ["type", "button", "role", "button", 1, "button-actions", 3, "title", "disabled"], [4, "ngIf"], ["type", "button", "role", "button", "fxHide.lt-md", "true", 1, "button-actions", 3, "title", "click"], ["fxHide.lt-md", "true"]], template: function CalendarHeaderComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, CalendarHeaderComponent_div_0_Template, 31, 22, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.headerConfiguration);
        } }, directives: [i1.NgIf, i2.DefaultLayoutDirective, i2.DefaultLayoutAlignDirective, i2.DefaultLayoutGapDirective, i3.MatIcon, i4.DefaultShowHideDirective], styles: [".button-actions[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-left:5px}button[_ngcontent-%COMP%]{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:36px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);font-family:Lato,Roboto,sans-serif;font-size:14px;font-weight:500;display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}"] });
    return CalendarHeaderComponent;
}());
export { CalendarHeaderComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CalendarHeaderComponent, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9jYWxlbmRhci1oZWFkZXIvY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC50cyIsImxpYi9jYWxlbmRhci9jYWxlbmRhci1oZWFkZXIvY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7Ozs7Ozs7SUNnRDVCLDRCQUNFO0lBQUEsWUFDRjtJQUFBLGlCQUFPOzs7SUFETCxlQUNGO0lBREUsd0ZBQ0Y7Ozs7SUFwRE4sOEJBT0U7SUFBQSw4QkFPRTtJQUFBLGlDQUtFO0lBSk0sNkxBQXVCO0lBSTdCLGdDQUFVO0lBQUEsbUNBQW1CO0lBQUEsaUJBQVc7SUFDMUMsaUJBQVM7SUFDVCxpQ0FLRTtJQUpNLHlMQUFtQjtJQUl6QixnQ0FBVTtJQUFBLG9DQUFvQjtJQUFBLGlCQUFXO0lBQzNDLGlCQUFTO0lBQ1QsaUNBS0U7SUFGTSwyTEFBcUI7SUFFM0IsZ0NBQVU7SUFBQSxzQkFBSztJQUFBLGlCQUFXO0lBQzVCLGlCQUFTO0lBQ1gsaUJBQU07SUFDTiwrQkFPRTtJQUFBLGtDQU1FO0lBQUEsNkJBQU07SUFBQSxhQUF5QjtJQUFBLGlCQUFPO0lBQ3RDLGtGQUNFO0lBRUosaUJBQVM7SUFDVCxrQ0FPRTtJQUZNLHdMQUFvQixNQUFNLEtBQUU7SUFFbEMsaUNBQVU7SUFBQSwwQkFBUztJQUFBLGlCQUFXO0lBQzlCLGdDQUEwQjtJQUFBLGFBQXVDO0lBQUEsaUJBQU87SUFDMUUsaUJBQVM7SUFDVCxrQ0FPRTtJQUZNLHdMQUFvQixZQUFZLEtBQUU7SUFFeEMsaUNBQVU7SUFBQSw0QkFBVztJQUFBLGlCQUFXO0lBQ2hDLGdDQUEwQjtJQUFBLGFBQTZDO0lBQUEsaUJBQU87SUFDaEYsaUJBQVM7SUFDVCxrQ0FPRTtJQUZNLHdMQUFvQixLQUFLLEtBQUU7SUFFakMsaUNBQVU7SUFBQSx5QkFBUTtJQUFBLGlCQUFXO0lBQzdCLGdDQUEwQjtJQUFBLGFBQXNDO0lBQUEsaUJBQU87SUFDekUsaUJBQVM7SUFDWCxpQkFBTTtJQUNSLGlCQUFNOzs7SUFuRU0sZUFBbUQ7SUFBbkQseUVBQW1EO0lBT25ELGVBQStDO0lBQS9DLHFFQUErQztJQUkvQyxlQUFpRDtJQUFqRCx1RUFBaUQsK0JBQUE7SUFtQmpELGVBQXNGO0lBQXRGLDZLQUFzRjtJQUZ0RixrRUFBNEMsa0JBQUE7SUFHNUMsZUFBeUI7SUFBekIsK0VBQXlCO0lBQ3pCLGVBQWlFO0lBQWpFLDhKQUFpRTtJQVFqRSxlQUFvQztJQUFwQyxxREFBb0M7SUFEcEMsaUVBQTJDO0lBS3ZCLGVBQXVDO0lBQXZDLCtEQUF1QztJQU0zRCxlQUEwQztJQUExQywyREFBMEM7SUFEMUMsdUVBQWlEO0lBSzdCLGVBQTZDO0lBQTdDLHFFQUE2QztJQU1qRSxlQUFtQztJQUFuQyxvREFBbUM7SUFEbkMsZ0VBQTBDO0lBS3RCLGVBQXNDO0lBQXRDLDhEQUFzQzs7QUQ3RXRFLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUV2QjtJQUFBO1FBY0U7O1dBRUc7UUFDTyxpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzFFOztXQUVHO1FBQ08saUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztLQXFGM0U7SUF2RUMsc0JBQUksNkNBQVE7UUFIWjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7UUFFRDs7V0FFRzthQUNILFVBQXNCLFFBQVE7WUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixDQUFDOzs7T0FQQTtJQVNEOztPQUVHO0lBQ0gsNENBQVUsR0FBVixVQUFXLFFBQWdCO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0RBQWMsR0FBZCxVQUFlLFFBQWdCO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNILGdEQUFjLEdBQWQsVUFBZSxLQUFhO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7T0FFRztJQUNILDJDQUFTLEdBQVQ7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNILHlDQUFPLEdBQVA7UUFDRSxPQUFPLE1BQU0sRUFBRSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsNkNBQVcsR0FBWDtRQUNFLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7WUFDNUIsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNaO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gseUNBQU8sR0FBUDtRQUNFLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7WUFDNUIsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNaO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztrR0FwR1UsdUJBQXVCO2dFQUF2Qix1QkFBdUI7WUNacEMsMEVBT0U7O1lBRkcsOENBQTJCOztrQ0RMaEM7Q0FpSEMsQUExR0QsSUEwR0M7U0FyR1ksdUJBQXVCO2tEQUF2Qix1QkFBdUI7Y0FMbkMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFdBQVcsRUFBRSxrQ0FBa0M7Z0JBQy9DLFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO2FBQ2hEOztrQkFLRSxLQUFLOztrQkFJTCxLQUFLOztrQkFJTCxNQUFNOztrQkFJTixNQUFNOztrQkFJTixLQUFLOztrQkFpQkwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbmZpZ3VyYXRpb24vY2FsZW5kYXItY29uZmlndXJhdGlvbic7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1jYWxlbmRhci1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJIZWFkZXJDb21wb25lbnQge1xuICAvKipcbiAgICogU3RhcnQgZGF0ZVxuICAgKi9cbiAgQElucHV0KCkgc3RhcnQ6IE1vbWVudDtcbiAgLyoqXG4gICAqIEVuZCBkYXRlXG4gICAqL1xuICBASW5wdXQoKSBlbmQ6IE1vbWVudDtcbiAgLyoqXG4gICAqIFN3aXRjaCB2aWV3IGV2ZW50XG4gICAqL1xuICBAT3V0cHV0KCkgc3dpdGNoZWRWaWV3OiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAvKipcbiAgICogU3RhcnQgZGF5IGNoYW5nZWQgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSBzdGFydENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxNb21lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb21lbnQ+KCk7XG4gIC8qKlxuICAgKiBDb25maWd1cmF0aW9uIGhlYWRlclxuICAgKi9cbiAgQElucHV0KCkgaGVhZGVyQ29uZmlndXJhdGlvbjogQ2FsZW5kYXJDb25maWd1cmF0aW9uO1xuXG4gIC8qKlxuICAgKiBEaXNwbGF5IG1vZGVcbiAgICovXG4gIHByaXZhdGUgX3ZpZXdNb2RlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIGdldHRlciBvZiBwcml2YXRlIF92aWV3TW9kZVxuICAgKi9cbiAgZ2V0IHZpZXdNb2RlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHRlciBvZiBzd2l0Y2ggdmlld1xuICAgKi9cbiAgQElucHV0KCkgc2V0IHZpZXdNb2RlKHZpZXdNb2RlKSB7XG4gICAgdGhpcy5zd2l0Y2hWaWV3KHZpZXdNb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTd2l0Y2ggY3VycmVudCB2aWV3IHRvIGFub3RoZXJcbiAgICovXG4gIHN3aXRjaFZpZXcodmlld01vZGU6IHN0cmluZykge1xuICAgIHRoaXMuX3ZpZXdNb2RlID0gdmlld01vZGU7XG4gICAgdGhpcy5vblN3aXRjaGVkVmlldyh2aWV3TW9kZSk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHRlciBvZiB2aWV3XG4gICAqL1xuICBvblN3aXRjaGVkVmlldyh2aWV3TW9kZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zd2l0Y2hlZFZpZXcuZW1pdCh2aWV3TW9kZSk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHRlciBvZiBzdGFydCBkYXRlIG1vbWVudFxuICAgKi9cbiAgb25TdGFydENoYW5nZWQoc3RhcnQ6IE1vbWVudCkge1xuICAgIHRoaXMuc3RhcnRDaGFuZ2VkLmVtaXQoc3RhcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiB0byBub3cgb24gc3RhcnQgZGF0ZVxuICAgKi9cbiAgZ29Ub1RvZGF5KCkge1xuICAgIHRoaXMuc3RhcnQgPSBtb21lbnQoKTtcbiAgICB0aGlzLm9uU3RhcnRDaGFuZ2VkKHRoaXMuc3RhcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHN0YXJ0IGlzIGVxdWFsIHRvIHRvZGF5XG4gICAqL1xuICBpc1RvZGF5KCkge1xuICAgIHJldHVybiBtb21lbnQoKSA9PT0gbW9tZW50KHRoaXMuc3RhcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdvIHRvIHByZXZpb3VzIGRheVxuICAgKi9cbiAgcHJldmlvdXNEYXkoKSB7XG4gICAgbGV0IGRheXNOYiA9IDE7XG4gICAgaWYgKHRoaXMudmlld01vZGUgPT09ICd3ZWVrJykge1xuICAgICAgZGF5c05iID0gNztcbiAgICB9XG4gICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zdWJ0cmFjdChkYXlzTmIsICdkYXknKTtcbiAgICB0aGlzLm9uU3RhcnRDaGFuZ2VkKHRoaXMuc3RhcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdvIHRvIG5ldyBkYXlcbiAgICovXG4gIG5leHREYXkoKSB7XG4gICAgbGV0IGRheXNOYiA9IDE7XG4gICAgaWYgKHRoaXMudmlld01vZGUgPT09ICd3ZWVrJykge1xuICAgICAgZGF5c05iID0gNztcbiAgICB9XG4gICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KS5hZGQoZGF5c05iLCAnZGF5Jyk7XG4gICAgdGhpcy5vblN0YXJ0Q2hhbmdlZCh0aGlzLnN0YXJ0KTtcbiAgfVxufVxuIiwiPGRpdiBmeExheW91dD1cInJvdyB3cmFwXCJcbiAgICAgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IHN0cmV0Y2hcIlxuICAgICBmeExheW91dC54cz1cImNvbHVtblwiXG4gICAgIGZ4TGF5b3V0QWxpZ24ueHM9XCJzdGFydCBjZW50ZXJcIlxuICAgICBmeExheW91dEdhcC54cz1cIjEwcHhcIlxuICAgICAqbmdJZj1cImhlYWRlckNvbmZpZ3VyYXRpb25cIj5cblxuICA8ZGl2IGNsYXNzPVwibGVmdC1hY3Rpb25zXCJcbiAgICAgICBmeExheW91dD1cInJvd1wiXG4gICAgICAgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IHN0cmV0Y2hcIlxuICAgICAgIGZ4TGF5b3V0R2FwPVwiMTBweFwiXG4gICAgICAgZnhMYXlvdXQueHM9XCJyb3dcIlxuICAgICAgIGZ4TGF5b3V0QWxpZ24ueHM9XCJjZW50ZXIgc3RyZXRjaFwiXG4gICAgICAgZnhMYXlvdXRHYXAueHM9XCIxMHB4XCI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbi1hY3Rpb25zXCJcbiAgICAgICAgICAgIChjbGljayk9XCJwcmV2aW91c0RheSgpXCJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBbdGl0bGVdPVwiaGVhZGVyQ29uZmlndXJhdGlvbi5jYWxlbmRhci5jdGEucHJldmlvdXNcIj5cbiAgICAgIDxtYXQtaWNvbj5rZXlib2FyZF9hcnJvd19sZWZ0PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uLWFjdGlvbnNcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm5leHREYXkoKVwiXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgW3RpdGxlXT1cImhlYWRlckNvbmZpZ3VyYXRpb24uY2FsZW5kYXIuY3RhLm5leHRcIj5cbiAgICAgIDxtYXQtaWNvbj5rZXlib2FyZF9hcnJvd19yaWdodDwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbi1hY3Rpb25zXCJcbiAgICAgICAgICAgIFt0aXRsZV09XCJoZWFkZXJDb25maWd1cmF0aW9uLmNhbGVuZGFyLmJhY2tfdG9kYXlcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImlzVG9kYXkoKVwiXG4gICAgICAgICAgICAoY2xpY2spPVwiZ29Ub1RvZGF5KClcIlxuICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiPlxuICAgICAgPG1hdC1pY29uPnRvZGF5PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJyaWdodC1hY3Rpb25zXCJcbiAgICAgICBmeExheW91dD1cInJvdyB3cmFwXCJcbiAgICAgICBmeExheW91dEFsaWduPVwiZW5kIHN0cmV0Y2hcIlxuICAgICAgIGZ4TGF5b3V0R2FwPVwiMTBweFwiXG4gICAgICAgZnhMYXlvdXQueHM9XCJyb3cgd3JhcFwiXG4gICAgICAgZnhMYXlvdXRBbGlnbi54cz1cImNlbnRlciBzdHJldGNoXCJcbiAgICAgICBmeExheW91dEdhcC54cz1cIjEwcHhcIj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uLWFjdGlvbnNcIlxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIFt0aXRsZV09XCJoZWFkZXJDb25maWd1cmF0aW9uLmNhbGVuZGFyLnRvZGF5XCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJ0cnVlXCJcbiAgICAgICAgICAgIFtjbGFzcy5oaWRlLW9uLXNtYWxsLW9ubHldPVwiZW5kPy5mb3JtYXQoJ1lZWVktTU0tREQnKSAhPT0gc3RhcnQ/LmZvcm1hdCgnWVlZWS1NTS1ERCcpXCI+XG4gICAgICA8c3Bhbj57eyBzdGFydD8uZm9ybWF0KCdMTCcpIH19PC9zcGFuPlxuICAgICAgPHNwYW4gKm5nSWY9XCJlbmQ/LmZvcm1hdCgnWVlZWS1NTS1ERCcpICE9PSBzdGFydD8uZm9ybWF0KCdZWVlZLU1NLUREJylcIj5cbiAgICAgICAgLSB7eyBlbmQ/LmZvcm1hdCgnTEwnKSB9fVxuICAgICAgPC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24tYWN0aW9uc1wiXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgW3RpdGxlXT1cImhlYWRlckNvbmZpZ3VyYXRpb24uY2FsZW5kYXIud2Vla1wiXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInZpZXdNb2RlID09PSAnd2VlaydcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInN3aXRjaFZpZXcoJ3dlZWsnKVwiXG4gICAgICAgICAgICBmeEhpZGUubHQtbWQ9XCJ0cnVlXCI+XG4gICAgICA8bWF0LWljb24+dmlld193ZWVrPC9tYXQtaWNvbj5cbiAgICAgIDxzcGFuIGZ4SGlkZS5sdC1tZD1cInRydWVcIj57eyBoZWFkZXJDb25maWd1cmF0aW9uLmNhbGVuZGFyLndlZWsgfX08L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbi1hY3Rpb25zXCJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBbdGl0bGVdPVwiaGVhZGVyQ29uZmlndXJhdGlvbi5jYWxlbmRhci50aHJlZV9kYXlzXCJcbiAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwidmlld01vZGUgPT09ICd0aHJlZV9kYXlzJ1wiXG4gICAgICAgICAgICAoY2xpY2spPVwic3dpdGNoVmlldygndGhyZWVfZGF5cycpXCJcbiAgICAgICAgICAgIGZ4SGlkZS5sdC1tZD1cInRydWVcIj5cbiAgICAgIDxtYXQtaWNvbj52aWV3X2NvbHVtbjwvbWF0LWljb24+XG4gICAgICA8c3BhbiBmeEhpZGUubHQtbWQ9XCJ0cnVlXCI+e3sgaGVhZGVyQ29uZmlndXJhdGlvbi5jYWxlbmRhci50aHJlZV9kYXlzIH19PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24tYWN0aW9uc1wiXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgW3RpdGxlXT1cImhlYWRlckNvbmZpZ3VyYXRpb24uY2FsZW5kYXIuZGF5XCJcbiAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwidmlld01vZGUgPT09ICdkYXknXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzd2l0Y2hWaWV3KCdkYXknKVwiXG4gICAgICAgICAgICBmeEhpZGUubHQtbWQ9XCJ0cnVlXCI+XG4gICAgICA8bWF0LWljb24+dmlld19kYXk8L21hdC1pY29uPlxuICAgICAgPHNwYW4gZnhIaWRlLmx0LW1kPVwidHJ1ZVwiPnt7IGhlYWRlckNvbmZpZ3VyYXRpb24uY2FsZW5kYXIuZGF5IH19PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19