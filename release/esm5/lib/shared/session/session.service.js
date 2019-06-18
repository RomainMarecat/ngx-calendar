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
var SessionService = /** @class */ (function (_super) {
    __extends(SessionService, _super);
    function SessionService(afs, table) {
        return _super.call(this, afs, table) || this;
    }
    /**
     * @return {?}
     */
    SessionService.prototype.getSessions = /**
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (_super.prototype.getDocuments.call(this)));
    };
    /**
     * @param {?} key
     * @return {?}
     */
    SessionService.prototype.getSession = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return (/** @type {?} */ (_super.prototype.getDocument.call(this, key)));
    };
    /**
     * @param {?} session
     * @return {?}
     */
    SessionService.prototype.createSession = /**
     * @param {?} session
     * @return {?}
     */
    function (session) {
        return _super.prototype.createDocument.call(this, session);
    };
    /**
     * @param {?} session
     * @return {?}
     */
    SessionService.prototype.updateSession = /**
     * @param {?} session
     * @return {?}
     */
    function (session) {
        return _super.prototype.updateDocument.call(this, session);
    };
    /**
     * @param {?} session
     * @return {?}
     */
    SessionService.prototype.deleteSession = /**
     * @param {?} session
     * @return {?}
     */
    function (session) {
        return _super.prototype.deleteDocument.call(this, session);
    };
    SessionService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SessionService.ctorParameters = function () { return [
        { type: AngularFirestore },
        { type: String, decorators: [{ type: Inject, args: ['TABLE_SESSION',] }] }
    ]; };
    /** @nocollapse */ SessionService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SessionService_Factory() { return new SessionService(i0.ɵɵinject(i1.AngularFirestore), i0.ɵɵinject("TABLE_SESSION")); }, token: SessionService, providedIn: "root" });
    return SessionService;
}(VisitorService));
export { SessionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9zZXNzaW9uL3Nlc3Npb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRzdEO0lBR29DLGtDQUFjO0lBRWhELHdCQUFZLEdBQXFCLEVBQTJCLEtBQWE7ZUFDdkUsa0JBQU0sR0FBRyxFQUFFLEtBQUssQ0FBQztJQUNuQixDQUFDOzs7O0lBRUQsb0NBQVc7OztJQUFYO1FBQ0UsT0FBTyxtQkFBQSxpQkFBTSxZQUFZLFdBQUUsRUFBeUIsQ0FBQztJQUN2RCxDQUFDOzs7OztJQUVELG1DQUFVOzs7O0lBQVYsVUFBVyxHQUFXO1FBQ3BCLE9BQU8sbUJBQUEsaUJBQU0sV0FBVyxZQUFDLEdBQUcsQ0FBQyxFQUF1QixDQUFDO0lBQ3ZELENBQUM7Ozs7O0lBRUQsc0NBQWE7Ozs7SUFBYixVQUFjLE9BQWdCO1FBQzVCLE9BQU8saUJBQU0sY0FBYyxZQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRUQsc0NBQWE7Ozs7SUFBYixVQUFjLE9BQWdCO1FBQzVCLE9BQU8saUJBQU0sY0FBYyxZQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRUQsc0NBQWE7Ozs7SUFBYixVQUFjLE9BQWdCO1FBQzVCLE9BQU8saUJBQU0sY0FBYyxZQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7O2dCQTNCRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQU5RLGdCQUFnQjs2Q0FTYSxNQUFNLFNBQUMsZUFBZTs7O3lCQVg1RDtDQWtDQyxBQTVCRCxDQUdvQyxjQUFjLEdBeUJqRDtTQXpCWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9maXJlc3RvcmUnO1xuaW1wb3J0IHsgVmlzaXRvclNlcnZpY2UgfSBmcm9tICcuLi9maXJlYmFzZS92aXNpdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gJy4vc2Vzc2lvbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNlc3Npb25TZXJ2aWNlIGV4dGVuZHMgVmlzaXRvclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKGFmczogQW5ndWxhckZpcmVzdG9yZSwgQEluamVjdCgnVEFCTEVfU0VTU0lPTicpIHRhYmxlOiBzdHJpbmcpIHtcbiAgICBzdXBlcihhZnMsIHRhYmxlKTtcbiAgfVxuXG4gIGdldFNlc3Npb25zKCk6IE9ic2VydmFibGU8U2Vzc2lvbltdPiB7XG4gICAgcmV0dXJuIHN1cGVyLmdldERvY3VtZW50cygpIGFzIE9ic2VydmFibGU8U2Vzc2lvbltdPjtcbiAgfVxuXG4gIGdldFNlc3Npb24oa2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFNlc3Npb24+IHtcbiAgICByZXR1cm4gc3VwZXIuZ2V0RG9jdW1lbnQoa2V5KSBhcyBPYnNlcnZhYmxlPFNlc3Npb24+O1xuICB9XG5cbiAgY3JlYXRlU2Vzc2lvbihzZXNzaW9uOiBTZXNzaW9uKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gc3VwZXIuY3JlYXRlRG9jdW1lbnQoc2Vzc2lvbik7XG4gIH1cblxuICB1cGRhdGVTZXNzaW9uKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICByZXR1cm4gc3VwZXIudXBkYXRlRG9jdW1lbnQoc2Vzc2lvbik7XG4gIH1cblxuICBkZWxldGVTZXNzaW9uKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICByZXR1cm4gc3VwZXIuZGVsZXRlRG9jdW1lbnQoc2Vzc2lvbik7XG4gIH1cbn1cbiJdfQ==