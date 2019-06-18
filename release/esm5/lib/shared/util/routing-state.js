var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NavigationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
var RoutingState = /** @class */ (function () {
    function RoutingState(router) {
        this.router = router;
        this.history = [];
    }
    /**
     * @return {?}
     */
    RoutingState.prototype.loadRouting = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event instanceof NavigationEnd; })))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var urlAfterRedirects = _a.urlAfterRedirects;
            _this.history = __spread(_this.history, [urlAfterRedirects]);
        }));
    };
    /**
     * @return {?}
     */
    RoutingState.prototype.getHistory = /**
     * @return {?}
     */
    function () {
        return this.history;
    };
    /**
     * @return {?}
     */
    RoutingState.prototype.getPreviousUrl = /**
     * @return {?}
     */
    function () {
        return this.history[this.history.length - 2] || '/';
    };
    RoutingState.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    RoutingState.ctorParameters = function () { return [
        { type: Router }
    ]; };
    /** @nocollapse */ RoutingState.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function RoutingState_Factory() { return new RoutingState(i0.ɵɵinject(i1.Router)); }, token: RoutingState, providedIn: "root" });
    return RoutingState;
}());
export { RoutingState };
if (false) {
    /**
     * @type {?}
     * @private
     */
    RoutingState.prototype.history;
    /**
     * @type {?}
     * @private
     */
    RoutingState.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvdXRpbC9yb3V0aW5nLXN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUV4QztJQU1FLHNCQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUYxQixZQUFPLEdBQUcsRUFBRSxDQUFDO0lBR3JCLENBQUM7Ozs7SUFFTSxrQ0FBVzs7O0lBQWxCO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07YUFDZixJQUFJLENBQUMsTUFBTTs7OztRQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxZQUFZLGFBQWEsRUFBOUIsQ0FBOEIsRUFBQyxDQUFDO2FBQ3JELFNBQVM7Ozs7UUFBQyxVQUFDLEVBQWtDO2dCQUFqQyx3Q0FBaUI7WUFDNUIsS0FBSSxDQUFDLE9BQU8sWUFBTyxLQUFJLENBQUMsT0FBTyxHQUFFLGlCQUFpQixFQUFDLENBQUM7UUFDdEQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRU0saUNBQVU7OztJQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7O0lBRU0scUNBQWM7OztJQUFyQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7SUFDdEQsQ0FBQzs7Z0JBdkJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBTnVCLE1BQU07Ozt1QkFBOUI7Q0E0QkMsQUF4QkQsSUF3QkM7U0FyQlksWUFBWTs7Ozs7O0lBQ3ZCLCtCQUFxQjs7Ozs7SUFFVCw4QkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSb3V0aW5nU3RhdGUge1xuICBwcml2YXRlIGhpc3RvcnkgPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gIH1cblxuICBwdWJsaWMgbG9hZFJvdXRpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAgICAgIC5zdWJzY3JpYmUoKHt1cmxBZnRlclJlZGlyZWN0c306IE5hdmlnYXRpb25FbmQpID0+IHtcbiAgICAgICAgdGhpcy5oaXN0b3J5ID0gWy4uLnRoaXMuaGlzdG9yeSwgdXJsQWZ0ZXJSZWRpcmVjdHNdO1xuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0SGlzdG9yeSgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQcmV2aW91c1VybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnlbdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDJdIHx8ICcvJztcbiAgfVxufVxuIl19