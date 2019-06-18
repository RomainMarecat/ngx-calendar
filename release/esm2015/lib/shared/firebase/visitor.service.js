/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/firestore";
/**
 * @record
 */
export function Document() { }
if (false) {
    /** @type {?|undefined} */
    Document.prototype.key;
    /** @type {?|undefined} */
    Document.prototype.id;
}
export class VisitorService {
    /**
     * @param {?} afs
     * @param {?} table
     */
    constructor(afs, table) {
        this.afs = afs;
        this.initializeBehaviour(table);
        this.documents$ = combineLatest(this.filters$, this.limit$, this.orderBy$, this.query$).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([filters, limit, orderBy, query]) => {
            return this.afs.collection(this.table, (/**
             * @param {?} ref
             * @return {?}
             */
            (ref) => {
                this.query = (/** @type {?} */ (ref));
                this.createQuery(filters, limit, orderBy, query);
                return this.query;
            }))
                .snapshotChanges();
        })));
    }
    /**
     * @param {?} filters
     * @param {?} limit
     * @param {?} orderBy
     * @param {?} query
     * @return {?}
     */
    createQuery(filters, limit, orderBy, query) {
        if (query && this.query) {
            if (query.limit) {
                this.query = this.query.limit(query.limit);
            }
            if (query.filters) {
                query.filters.forEach((/**
                 * @param {?} filter
                 * @return {?}
                 */
                (filter) => {
                    this.query = this.query.where(filter.column, (/** @type {?} */ (filter.operator)), filter.value);
                }));
            }
            if (query.orderBy) {
                this.query = this.query.orderBy(query.orderBy.column, (/** @type {?} */ (query.orderBy.direction)));
            }
        }
        if (limit) {
            this.query = this.query.limit(limit);
        }
        if (filters && this.query) {
            filters.forEach((/**
             * @param {?} filter
             * @return {?}
             */
            (filter) => {
                this.query = this.query.where(filter.column, (/** @type {?} */ (filter.operator)), filter.value);
            }));
        }
        if (orderBy) {
            this.query = this.query.orderBy(orderBy.column, (/** @type {?} */ (orderBy.direction)));
        }
    }
    /**
     * @param {?} table
     * @return {?}
     */
    initializeBehaviour(table) {
        this.table = table;
        this.query$ = new BehaviorSubject(null);
        this.filters$ = new BehaviorSubject(null);
        this.limit$ = new BehaviorSubject(null);
        this.orderBy$ = new BehaviorSubject(null);
        this.collectionRef = this.afs.collection(this.table);
    }
    /**
     * get multiple documents
     * @return {?} Observable
     */
    getDocuments() {
        return this.documents$.pipe(map((/**
         * @param {?} documents
         * @return {?}
         */
        (documents) => {
            return documents.map((/**
             * @param {?} document
             * @return {?}
             */
            (document) => {
                if (document.payload.doc.exists) {
                    /** @type {?} */
                    const doc = (/** @type {?} */ (document.payload.doc.data()));
                    doc.key = document.payload.doc.id;
                    return doc;
                }
            }));
        })));
    }
    /**
     * get snapshot change with state, from action
     * @private
     * @param {?} path
     * @return {?}
     */
    getDocPayload(path) {
        return this.document$ = this.collectionRef
            .doc(path)
            .snapshotChanges()
            .pipe(map((/**
         * @param {?} action
         * @return {?}
         */
        (action) => {
            if (action.payload.exists) {
                /** @type {?} */
                const product = (/** @type {?} */ (action.payload.data()));
                product.key = action.payload.id;
                return product;
            }
            return null;
        })));
    }
    /**
     * get a single document
     * @param {?} key
     * @return {?}
     */
    getDocument(key) {
        if (key) {
            return this.getDocPayload(key);
        }
        return of(null);
    }
    /**
     * Update a document
     * @param {?} document
     * @return {?}
     */
    updateDocument(document) {
        return this.collectionRef.doc(document.key).update(Object.assign({}, document));
    }
    /**
     * create a Document
     * @param {?} document
     * @return {?}
     */
    createDocument(document) {
        return this.collectionRef.add(document);
    }
    /**
     * Delete a document
     * @param {?} document
     * @return {?}
     */
    deleteDocument(document) {
        return this.collectionRef.doc(document.key).delete();
    }
}
VisitorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
VisitorService.ctorParameters = () => [
    { type: AngularFirestore },
    { type: String, decorators: [{ type: Inject, args: ['TABLE_NAME',] }] }
];
/** @nocollapse */ VisitorService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function VisitorService_Factory() { return new VisitorService(i0.ɵɵinject(i1.AngularFirestore), i0.ɵɵinject("TABLE_NAME")); }, token: VisitorService, providedIn: "root" });
if (false) {
    /** @type {?} */
    VisitorService.prototype.collectionRef;
    /** @type {?} */
    VisitorService.prototype.documents$;
    /** @type {?} */
    VisitorService.prototype.document$;
    /** @type {?} */
    VisitorService.prototype.query$;
    /** @type {?} */
    VisitorService.prototype.filters$;
    /** @type {?} */
    VisitorService.prototype.limit$;
    /** @type {?} */
    VisitorService.prototype.startAt$;
    /** @type {?} */
    VisitorService.prototype.startAfter$;
    /** @type {?} */
    VisitorService.prototype.orderBy$;
    /** @type {?} */
    VisitorService.prototype.endAt$;
    /** @type {?} */
    VisitorService.prototype.endBefore$;
    /** @type {?} */
    VisitorService.prototype.query;
    /** @type {?} */
    VisitorService.prototype.table;
    /** @type {?} */
    VisitorService.prototype.afs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9maXJlYmFzZS92aXNpdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQU90RSxPQUFPLEVBRUwsZ0JBQWdCLEVBS2pCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBRWhELDhCQUdDOzs7SUFGQyx1QkFBYTs7SUFDYixzQkFBWTs7QUFNZCxNQUFNLE9BQU8sY0FBYzs7Ozs7SUFlekIsWUFBbUIsR0FBcUIsRUFBd0IsS0FBYTtRQUExRCxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUN0QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQzdCLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxNQUFNLENBQ1osQ0FBQyxJQUFJLENBQ0osU0FBUzs7OztRQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQzdDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUs7Ozs7WUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFBLEdBQUcsRUFBdUIsQ0FBQztnQkFDeEMsSUFBSSxDQUFD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QUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sbUJBQUssUUFBUSxFQUFFLENBQUM7SUFDcEUsQ0FBQzs7Ozs7O0lBS0QsY0FBYyxDQUFDLFFBQWE7UUFDMUIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7Ozs7SUFLRCxjQUFjLENBQUMsUUFBa0I7UUFDL0IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkQsQ0FBQzs7O1lBMUlGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWZDLGdCQUFnQjt5Q0ErQjJCLE1BQU0sU0FBQyxZQUFZOzs7OztJQWQ5RCx1Q0FBNkQ7O0lBQzdELG9DQUFvRDs7SUFDcEQsbUNBQWdDOztJQUNoQyxnQ0FBb0M7O0lBQ3BDLGtDQUF3Qzs7SUFDeEMsZ0NBQXVDOztJQUN2QyxrQ0FBeUM7O0lBQ3pDLHFDQUE0Qzs7SUFDNUMsa0NBQXNDOztJQUN0QyxnQ0FBdUM7O0lBQ3ZDLG9DQUEyQzs7SUFDM0MsK0JBQW1DOztJQUNuQywrQkFBYzs7SUFFRiw2QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIENvbGxlY3Rpb25SZWZlcmVuY2UsXG4gIE9yZGVyQnlEaXJlY3Rpb24sXG4gIFF1ZXJ5LFxuICBXaGVyZUZpbHRlck9wXG59IGZyb20gJ0BmaXJlYmFzZS9maXJlc3RvcmUtdHlwZXMnO1xuaW1wb3J0IHtcbiAgQWN0aW9uLFxuICBBbmd1bGFyRmlyZXN0b3JlLFxuICBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbixcbiAgRG9jdW1lbnRDaGFuZ2VBY3Rpb24sXG4gIERvY3VtZW50UmVmZXJlbmNlLFxuICBEb2N1bWVudFNuYXBzaG90XG59IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERvY3VtZW50IHtcbiAga2V5Pzogc3RyaW5nO1xuICBpZD86IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVmlzaXRvclNlcnZpY2Uge1xuICBjb2xsZWN0aW9uUmVmOiBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbjxEb2N1bWVudFJlZmVyZW5jZT47XG4gIGRvY3VtZW50cyQ6IE9ic2VydmFibGU8RG9jdW1lbnRDaGFuZ2VBY3Rpb248YW55PltdPjtcbiAgZG9jdW1lbnQkOiBPYnNlcnZhYmxlPERvY3VtZW50PjtcbiAgcXVlcnkkOiBCZWhhdmlvclN1YmplY3Q8YW55IHwgbnVsbD47XG4gIGZpbHRlcnMkOiBCZWhhdmlvclN1YmplY3Q8YW55W10gfCBudWxsPjtcbiAgbGltaXQkOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyIHwgbnVsbD47XG4gIHN0YXJ0QXQkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD47XG4gIHN0YXJ0QWZ0ZXIkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD47XG4gIG9yZGVyQnkkOiBCZWhhdmlvclN1YmplY3Q8YW55IHwgbnVsbD47XG4gIGVuZEF0JDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+O1xuICBlbmRCZWZvcmUkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD47XG4gIHF1ZXJ5OiBDb2xsZWN0aW9uUmVmZXJlbmNlIHwgUXVlcnk7XG4gIHRhYmxlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGFmczogQW5ndWxhckZpcmVzdG9yZSwgQEluamVjdCgnVEFCTEVfTkFNRScpIHRhYmxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmluaXRpYWxpemVCZWhhdmlvdXIodGFibGUpO1xuICAgIHRoaXMuZG9jdW1lbnRzJCA9IGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLmZpbHRlcnMkLFxuICAgICAgdGhpcy5saW1pdCQsXG4gICAgICB0aGlzLm9yZGVyQnkkLFxuICAgICAgdGhpcy5xdWVyeSRcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtmaWx0ZXJzLCBsaW1pdCwgb3JkZXJCeSwgcXVlcnldKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFmcy5jb2xsZWN0aW9uKHRoaXMudGFibGUsIChyZWYpID0+IHtcbiAgICAgICAgICB0aGlzLnF1ZXJ5ID0gcmVmIGFzIENvbGxlY3Rpb25SZWZlcmVuY2U7XG4gICAgICAgICAgdGhpcy5jcmVhdGVRdWVyeShmaWx0ZXJzLCBsaW1pdCwgb3JkZXJCeSwgcXVlcnkpO1xuICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5O1xuICAgICAgICB9KVxuICAgICAgICAgIC5zbmFwc2hvdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGNyZWF0ZVF1ZXJ5KGZpbHRlcnMsIGxpbWl0LCBvcmRlckJ5LCBxdWVyeSkge1xuICAgIGlmIChxdWVyeSAmJiB0aGlzLnF1ZXJ5KSB7XG4gICAgICBpZiAocXVlcnkubGltaXQpIHtcbiAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMucXVlcnkubGltaXQocXVlcnkubGltaXQpO1xuICAgICAgfVxuICAgICAgaWYgKHF1ZXJ5LmZpbHRlcnMpIHtcbiAgICAgICAgcXVlcnkuZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeS53aGVyZShmaWx0ZXIuY29sdW1uLCBmaWx0ZXIub3BlcmF0b3IgYXMgV2hlcmVGaWx0ZXJPcCwgZmlsdGVyLnZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAocXVlcnkub3JkZXJCeSkge1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeS5vcmRlckJ5KHF1ZXJ5Lm9yZGVyQnkuY29sdW1uLCBxdWVyeS5vcmRlckJ5LmRpcmVjdGlvbiBhcyBPcmRlckJ5RGlyZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobGltaXQpIHtcbiAgICAgIHRoaXMucXVlcnkgPSB0aGlzLnF1ZXJ5LmxpbWl0KGxpbWl0KTtcbiAgICB9XG4gICAgaWYgKGZpbHRlcnMgJiYgdGhpcy5xdWVyeSkge1xuICAgICAgZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMucXVlcnkud2hlcmUoZmlsdGVyLmNvbHVtbiwgZmlsdGVyLm9wZXJhdG9yIGFzIFdoZXJlRmlsdGVyT3AsIGZpbHRlci52YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG9yZGVyQnkpIHtcbiAgICAgIHRoaXMucXVlcnkgPSB0aGlzLnF1ZXJ5Lm9yZGVyQnkob3JkZXJCeS5jb2x1bW4sIG9yZGVyQnkuZGlyZWN0aW9uIGFzIE9yZGVyQnlEaXJlY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIGluaXRpYWxpemVCZWhhdmlvdXIodGFibGU6IHN0cmluZykge1xuICAgIHRoaXMudGFibGUgPSB0YWJsZTtcbiAgICB0aGlzLnF1ZXJ5JCA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gICAgdGhpcy5maWx0ZXJzJCA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gICAgdGhpcy5saW1pdCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgIHRoaXMub3JkZXJCeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgIHRoaXMuY29sbGVjdGlvblJlZiA9IHRoaXMuYWZzLmNvbGxlY3Rpb24odGhpcy50YWJsZSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IG11bHRpcGxlIGRvY3VtZW50c1xuICAgKiBAcmV0dXJuIE9ic2VydmFibGVcbiAgICovXG4gIGdldERvY3VtZW50cygpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRzJC5waXBlKFxuICAgICAgbWFwKChkb2N1bWVudHMpID0+IHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50cy5tYXAoKGRvY3VtZW50OiBEb2N1bWVudENoYW5nZUFjdGlvbjxhbnk+KSA9PiB7XG4gICAgICAgICAgaWYgKGRvY3VtZW50LnBheWxvYWQuZG9jLmV4aXN0cykge1xuICAgICAgICAgICAgY29uc3QgZG9jID0gZG9jdW1lbnQucGF5bG9hZC5kb2MuZGF0YSgpIGFzIERvY3VtZW50O1xuICAgICAgICAgICAgZG9jLmtleSA9IGRvY3VtZW50LnBheWxvYWQuZG9jLmlkO1xuICAgICAgICAgICAgcmV0dXJuIGRvYztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBzbmFwc2hvdCBjaGFuZ2Ugd2l0aCBzdGF0ZSwgZnJvbSBhY3Rpb25cbiAgICovXG4gIHByaXZhdGUgZ2V0RG9jUGF5bG9hZChwYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmRvY3VtZW50JCA9IHRoaXMuY29sbGVjdGlvblJlZlxuICAgICAgLmRvYyhwYXRoKVxuICAgICAgLnNuYXBzaG90Q2hhbmdlcygpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChhY3Rpb246IEFjdGlvbjxEb2N1bWVudFNuYXBzaG90PERvY3VtZW50UmVmZXJlbmNlPj4pID0+IHtcbiAgICAgICAgICBpZiAoYWN0aW9uLnBheWxvYWQuZXhpc3RzKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0ID0gYWN0aW9uLnBheWxvYWQuZGF0YSgpIGFzIERvY3VtZW50O1xuICAgICAgICAgICAgcHJvZHVjdC5rZXkgPSBhY3Rpb24ucGF5bG9hZC5pZDtcbiAgICAgICAgICAgIHJldHVybiBwcm9kdWN0O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBhIHNpbmdsZSBkb2N1bWVudFxuICAgKi9cbiAgZ2V0RG9jdW1lbnQoa2V5OiBudWxsIHwgc3RyaW5nKTogT2JzZXJ2YWJsZTxEb2N1bWVudD4ge1xuICAgIGlmIChrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERvY1BheWxvYWQoa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIG9mKG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIGRvY3VtZW50XG4gICAqL1xuICB1cGRhdGVEb2N1bWVudChkb2N1bWVudDogRG9jdW1lbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uUmVmLmRvYyhkb2N1bWVudC5rZXkpLnVwZGF0ZSh7Li4uZG9jdW1lbnR9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSBEb2N1bWVudFxuICAgKi9cbiAgY3JlYXRlRG9jdW1lbnQoZG9jdW1lbnQ6IGFueSk6IFByb21pc2U8RG9jdW1lbnRSZWZlcmVuY2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uUmVmLmFkZChkb2N1bWVudCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgZG9jdW1lbnRcbiAgICovXG4gIGRlbGV0ZURvY3VtZW50KGRvY3VtZW50OiBEb2N1bWVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb25SZWYuZG9jKGRvY3VtZW50LmtleSkuZGVsZXRlKCk7XG4gIH1cbn1cbiJdfQ==