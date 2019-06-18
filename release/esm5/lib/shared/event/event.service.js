var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../firebase/visitor.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/firestore";
var EventService = /** @class */ (function (_super) {
    __extends(EventService, _super);
    function EventService(afs, table) {
        return _super.call(this, afs, table) || this;
    }
    /**
     * @return {?}
     */
    EventService.prototype.getEvents = /**
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (_super.prototype.getDocuments.call(this)));
    };
    /**
     * @param {?} key
     * @return {?}
     */
    EventService.prototype.getEvent = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return (/** @type {?} */ (_super.prototype.getDocument.call(this, key)));
    };
    /**
     * @param {?} event
     * @return {?}
     */
    EventService.prototype.createEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return _super.prototype.createDocument.call(this, event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    EventService.prototype.updateEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return _super.prototype.updateDocument.call(this, event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    EventService.prototype.deleteEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return _super.prototype.deleteDocument.call(this, event);
    };
    EventService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    EventService.ctorParameters = function () { return [
        { type: AngularFirestore },
        { type: String, decorators: [{ type: Inject, args: ['TABLE_EVENT',] }] }
    ]; };
    /** @nocollapse */ EventService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function EventService_Factory() { return new EventService(i0.ɵɵinject(i1.AngularFirestore), i0.ɵɵinject("TABLE_EVENT")); }, token: EventService, providedIn: "root" });
    return EventService;
}(VisitorService));
export { EventService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvZXZlbnQvZXZlbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRzdEO0lBR2tDLGdDQUFjO0lBRTlDLHNCQUFZLEdBQXFCLEVBQXlCLEtBQWE7ZUFDckUsa0JBQU0sR0FBRyxFQUFFLEtBQUssQ0FBQztJQUNuQixDQUFDOzs7O0lBRUQsZ0NBQVM7OztJQUFUO1FBQ0UsT0FBTyxtQkFBQSxpQkFBTSxZQUFZLFdBQUUsRUFBdUIsQ0FBQztJQUNyRCxDQUFDOzs7OztJQUVELCtCQUFROzs7O0lBQVIsVUFBUyxHQUFXO1FBQ2xCLE9BQU8sbUJBQUEsaUJBQU0sV0FBVyxZQUFDLEdBQUcsQ0FBQyxFQUFxQixDQUFDO0lBQ3JELENBQUM7Ozs7O0lBRUQsa0NBQVc7Ozs7SUFBWCxVQUFZLEtBQVk7UUFDdEIsT0FBTyxpQkFBTSxjQUFjLFlBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFRCxrQ0FBVzs7OztJQUFYLFVBQVksS0FBWTtRQUN0QixPQUFPLGlCQUFNLGNBQWMsWUFBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVELGtDQUFXOzs7O0lBQVgsVUFBWSxLQUFZO1FBQ3RCLE9BQU8saUJBQU0sY0FBYyxZQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7O2dCQTNCRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQU5RLGdCQUFnQjs2Q0FTYSxNQUFNLFNBQUMsYUFBYTs7O3VCQVgxRDtDQWtDQyxBQTVCRCxDQUdrQyxjQUFjLEdBeUIvQztTQXpCWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9maXJlc3RvcmUnO1xuaW1wb3J0IHsgVmlzaXRvclNlcnZpY2UgfSBmcm9tICcuLi9maXJlYmFzZS92aXNpdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL2V2ZW50JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRXZlbnRTZXJ2aWNlIGV4dGVuZHMgVmlzaXRvclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKGFmczogQW5ndWxhckZpcmVzdG9yZSwgQEluamVjdCgnVEFCTEVfRVZFTlQnKSB0YWJsZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoYWZzLCB0YWJsZSk7XG4gIH1cblxuICBnZXRFdmVudHMoKTogT2JzZXJ2YWJsZTxFdmVudFtdPiB7XG4gICAgcmV0dXJuIHN1cGVyLmdldERvY3VtZW50cygpIGFzIE9ic2VydmFibGU8RXZlbnRbXT47XG4gIH1cblxuICBnZXRFdmVudChrZXk6IHN0cmluZyk6IE9ic2VydmFibGU8RXZlbnQ+IHtcbiAgICByZXR1cm4gc3VwZXIuZ2V0RG9jdW1lbnQoa2V5KSBhcyBPYnNlcnZhYmxlPEV2ZW50PjtcbiAgfVxuXG4gIGNyZWF0ZUV2ZW50KGV2ZW50OiBFdmVudCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHN1cGVyLmNyZWF0ZURvY3VtZW50KGV2ZW50KTtcbiAgfVxuXG4gIHVwZGF0ZUV2ZW50KGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiBzdXBlci51cGRhdGVEb2N1bWVudChldmVudCk7XG4gIH1cblxuICBkZWxldGVFdmVudChldmVudDogRXZlbnQpIHtcbiAgICByZXR1cm4gc3VwZXIuZGVsZXRlRG9jdW1lbnQoZXZlbnQpO1xuICB9XG59XG4iXX0=