/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../firebase/visitor.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/firestore";
export class EventService extends VisitorService {
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
    getEvents() {
        return (/** @type {?} */ (super.getDocuments()));
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getEvent(key) {
        return (/** @type {?} */ (super.getDocument(key)));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    createEvent(event) {
        return super.createDocument(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateEvent(event) {
        return super.updateDocument(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    deleteEvent(event) {
        return super.deleteDocument(event);
    }
}
EventService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
EventService.ctorParameters = () => [
    { type: AngularFirestore },
    { type: String, decorators: [{ type: Inject, args: ['TABLE_EVENT',] }] }
];
/** @nocollapse */ EventService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function EventService_Factory() { return new EventService(i0.ɵɵinject(i1.AngularFirestore), i0.ɵɵinject("TABLE_EVENT")); }, token: EventService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvZXZlbnQvZXZlbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFNN0QsTUFBTSxPQUFPLFlBQWEsU0FBUSxjQUFjOzs7OztJQUU5QyxZQUFZLEdBQXFCLEVBQXlCLEtBQWE7UUFDckUsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsU0FBUztRQUNQLE9BQU8sbUJBQUEsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUF1QixDQUFDO0lBQ3JELENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDbEIsT0FBTyxtQkFBQSxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFxQixDQUFDO0lBQ3JELENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQVk7UUFDdEIsT0FBTyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQVk7UUFDdEIsT0FBTyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQVk7UUFDdEIsT0FBTyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7OztZQTNCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFOUSxnQkFBZ0I7eUNBU2EsTUFBTSxTQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlc3RvcmUgfSBmcm9tICdAYW5ndWxhci9maXJlL2ZpcmVzdG9yZSc7XG5pbXBvcnQgeyBWaXNpdG9yU2VydmljZSB9IGZyb20gJy4uL2ZpcmViYXNlL3Zpc2l0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vZXZlbnQnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBFdmVudFNlcnZpY2UgZXh0ZW5kcyBWaXNpdG9yU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoYWZzOiBBbmd1bGFyRmlyZXN0b3JlLCBASW5qZWN0KCdUQUJMRV9FVkVOVCcpIHRhYmxlOiBzdHJpbmcpIHtcbiAgICBzdXBlcihhZnMsIHRhYmxlKTtcbiAgfVxuXG4gIGdldEV2ZW50cygpOiBPYnNlcnZhYmxlPEV2ZW50W10+IHtcbiAgICByZXR1cm4gc3VwZXIuZ2V0RG9jdW1lbnRzKCkgYXMgT2JzZXJ2YWJsZTxFdmVudFtdPjtcbiAgfVxuXG4gIGdldEV2ZW50KGtleTogc3RyaW5nKTogT2JzZXJ2YWJsZTxFdmVudD4ge1xuICAgIHJldHVybiBzdXBlci5nZXREb2N1bWVudChrZXkpIGFzIE9ic2VydmFibGU8RXZlbnQ+O1xuICB9XG5cbiAgY3JlYXRlRXZlbnQoZXZlbnQ6IEV2ZW50KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gc3VwZXIuY3JlYXRlRG9jdW1lbnQoZXZlbnQpO1xuICB9XG5cbiAgdXBkYXRlRXZlbnQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgcmV0dXJuIHN1cGVyLnVwZGF0ZURvY3VtZW50KGV2ZW50KTtcbiAgfVxuXG4gIGRlbGV0ZUV2ZW50KGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiBzdXBlci5kZWxldGVEb2N1bWVudChldmVudCk7XG4gIH1cbn1cbiJdfQ==