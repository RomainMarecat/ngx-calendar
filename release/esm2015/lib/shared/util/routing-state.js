/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NavigationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class RoutingState {
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
/** @nocollapse */ RoutingState.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function RoutingState_Factory() { return new RoutingState(i0.ɵɵinject(i1.Router)); }, token: RoutingState, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvdXRpbC9yb3V0aW5nLXN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFLeEMsTUFBTSxPQUFPLFlBQVk7Ozs7SUFHdkIsWUFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFGMUIsWUFBTyxHQUFHLEVBQUUsQ0FBQztJQUdyQixDQUFDOzs7O0lBRU0sV0FBVztRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07YUFDZixJQUFJLENBQUMsTUFBTTs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxZQUFZLGFBQWEsRUFBQyxDQUFDO2FBQ3JELFNBQVM7Ozs7UUFBQyxDQUFDLEVBQUMsaUJBQWlCLEVBQWdCLEVBQUUsRUFBRTtZQUNoRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDdEQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRU0sVUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7O0lBRU0sY0FBYztRQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO0lBQ3RELENBQUM7OztZQXZCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFOdUIsTUFBTTs7Ozs7Ozs7SUFRNUIsK0JBQXFCOzs7OztJQUVULDhCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJvdXRpbmdTdGF0ZSB7XG4gIHByaXZhdGUgaGlzdG9yeSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkUm91dGluZygpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci5ldmVudHNcbiAgICAgIC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuICAgICAgLnN1YnNjcmliZSgoe3VybEFmdGVyUmVkaXJlY3RzfTogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgICB0aGlzLmhpc3RvcnkgPSBbLi4udGhpcy5oaXN0b3J5LCB1cmxBZnRlclJlZGlyZWN0c107XG4gICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRIaXN0b3J5KCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5O1xuICB9XG5cbiAgcHVibGljIGdldFByZXZpb3VzVXJsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVt0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMl0gfHwgJy8nO1xuICB9XG59XG4iXX0=