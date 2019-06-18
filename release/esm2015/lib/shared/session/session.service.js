/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../firebase/visitor.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/firestore";
export class SessionService extends VisitorService {
    /**
     * @param {?} afs
     * @param {?} table
     */
    constructor(afs, table) {
        super(afs, table);
    }
    /**
     * @return {?}
     */
    getSessions() {
        return (/** @type {?} */ (super.getDocuments()));
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getSession(key) {
        return (/** @type {?} */ (super.getDocument(key)));
    }
    /**
     * @param {?} session
     * @return {?}
     */
    createSession(session) {
        return super.createDocument(session);
    }
    /**
     * @param {?} session
     * @return {?}
     */
    updateSession(session) {
        return super.updateDocument(session);
    }
    /**
     * @param {?} session
     * @return {?}
     */
    deleteSession(session) {
        return super.deleteDocument(session);
    }
}
SessionService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SessionService.ctorParameters = () => [
    { type: AngularFirestore },
    { type: String, decorators: [{ type: Inject, args: ['TABLE_SESSION',] }] }
];
/** @nocollapse */ SessionService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SessionService_Factory() { return new SessionService(i0.ɵɵinject(i1.AngularFirestore), i0.ɵɵinject("TABLE_SESSION")); }, token: SessionService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9zZXNzaW9uL3Nlc3Npb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFNN0QsTUFBTSxPQUFPLGNBQWUsU0FBUSxjQUFjOzs7OztJQUVoRCxZQUFZLEdBQXFCLEVBQTJCLEtBQWE7UUFDdkUsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsV0FBVztRQUNULE9BQU8sbUJBQUEsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUF5QixDQUFDO0lBQ3ZELENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEdBQVc7UUFDcEIsT0FBTyxtQkFBQSxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUF1QixDQUFDO0lBQ3ZELENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLE9BQWdCO1FBQzVCLE9BQU8sS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxPQUFnQjtRQUM1QixPQUFPLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsT0FBZ0I7UUFDNUIsT0FBTyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OztZQTNCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFOUSxnQkFBZ0I7eUNBU2EsTUFBTSxTQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlc3RvcmUgfSBmcm9tICdAYW5ndWxhci9maXJlL2ZpcmVzdG9yZSc7XG5pbXBvcnQgeyBWaXNpdG9yU2VydmljZSB9IGZyb20gJy4uL2ZpcmViYXNlL3Zpc2l0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi9zZXNzaW9uJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2Vzc2lvblNlcnZpY2UgZXh0ZW5kcyBWaXNpdG9yU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoYWZzOiBBbmd1bGFyRmlyZXN0b3JlLCBASW5qZWN0KCdUQUJMRV9TRVNTSU9OJykgdGFibGU6IHN0cmluZykge1xuICAgIHN1cGVyKGFmcywgdGFibGUpO1xuICB9XG5cbiAgZ2V0U2Vzc2lvbnMoKTogT2JzZXJ2YWJsZTxTZXNzaW9uW10+IHtcbiAgICByZXR1cm4gc3VwZXIuZ2V0RG9jdW1lbnRzKCkgYXMgT2JzZXJ2YWJsZTxTZXNzaW9uW10+O1xuICB9XG5cbiAgZ2V0U2Vzc2lvbihrZXk6IHN0cmluZyk6IE9ic2VydmFibGU8U2Vzc2lvbj4ge1xuICAgIHJldHVybiBzdXBlci5nZXREb2N1bWVudChrZXkpIGFzIE9ic2VydmFibGU8U2Vzc2lvbj47XG4gIH1cblxuICBjcmVhdGVTZXNzaW9uKHNlc3Npb246IFNlc3Npb24pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBzdXBlci5jcmVhdGVEb2N1bWVudChzZXNzaW9uKTtcbiAgfVxuXG4gIHVwZGF0ZVNlc3Npb24oc2Vzc2lvbjogU2Vzc2lvbikge1xuICAgIHJldHVybiBzdXBlci51cGRhdGVEb2N1bWVudChzZXNzaW9uKTtcbiAgfVxuXG4gIGRlbGV0ZVNlc3Npb24oc2Vzc2lvbjogU2Vzc2lvbikge1xuICAgIHJldHVybiBzdXBlci5kZWxldGVEb2N1bWVudChzZXNzaW9uKTtcbiAgfVxufVxuIl19