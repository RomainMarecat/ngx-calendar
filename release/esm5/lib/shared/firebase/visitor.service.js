var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var VisitorService = /** @class */ (function () {
    function VisitorService(afs, table) {
        var _this = this;
        this.afs = afs;
        this.initializeBehaviour(table);
        this.documents$ = combineLatest(this.filters$, this.limit$, this.orderBy$, this.query$).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 4), filters = _b[0], limit = _b[1], orderBy = _b[2], query = _b[3];
            return _this.afs.collection(_this.table, (/**
             * @param {?} ref
             * @return {?}
             */
            function (ref) {
                _this.query = (/** @type {?} */ (ref));
                _this.createQuery(filters, limit, orderBy, query);
                return _this.query;
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
    VisitorService.prototype.createQuery = /**
     * @param {?} filters
     * @param {?} limit
     * @param {?} orderBy
     * @param {?} query
     * @return {?}
     */
    function (filters, limit, orderBy, query) {
        var _this = this;
        if (query && this.query) {
            if (query.limit) {
                this.query = this.query.limit(query.limit);
            }
            if (query.filters) {
                query.filters.forEach((/**
                 * @param {?} filter
                 * @return {?}
                 */
                function (filter) {
                    _this.query = _this.query.where(filter.column, (/** @type {?} */ (filter.operator)), filter.value);
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
            function (filter) {
                _this.query = _this.query.where(filter.column, (/** @type {?} */ (filter.operator)), filter.value);
            }));
        }
        if (orderBy) {
            this.query = this.query.orderBy(orderBy.column, (/** @type {?} */ (orderBy.direction)));
        }
    };
    /**
     * @param {?} table
     * @return {?}
     */
    VisitorService.prototype.initializeBehaviour = /**
     * @param {?} table
     * @return {?}
     */
    function (table) {
        this.table = table;
        this.query$ = new BehaviorSubject(null);
        this.filters$ = new BehaviorSubject(null);
        this.limit$ = new BehaviorSubject(null);
        this.orderBy$ = new BehaviorSubject(null);
        this.collectionRef = this.afs.collection(this.table);
    };
    /**
     * get multiple documents
     * @return Observable
     */
    /**
     * get multiple documents
     * @return {?} Observable
     */
    VisitorService.prototype.getDocuments = /**
     * get multiple documents
     * @return {?} Observable
     */
    function () {
        return this.documents$.pipe(map((/**
         * @param {?} documents
         * @return {?}
         */
        function (documents) {
            return documents.map((/**
             * @param {?} document
             * @return {?}
             */
            function (document) {
                if (document.payload.doc.exists) {
                    /** @type {?} */
                    var doc = (/** @type {?} */ (document.payload.doc.data()));
                    doc.key = document.payload.doc.id;
                    return doc;
                }
            }));
        })));
    };
    /**
     * get snapshot change with state, from action
     */
    /**
     * get snapshot change with state, from action
     * @private
     * @param {?} path
     * @return {?}
     */
    VisitorService.prototype.getDocPayload = /**
     * get snapshot change with state, from action
     * @private
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return this.document$ = this.collectionRef
            .doc(path)
            .snapshotChanges()
            .pipe(map((/**
         * @param {?} action
         * @return {?}
         */
        function (action) {
            if (action.payload.exists) {
                /** @type {?} */
                var product = (/** @type {?} */ (action.payload.data()));
                product.key = action.payload.id;
                return product;
            }
            return null;
        })));
    };
    /**
     * get a single document
     */
    /**
     * get a single document
     * @param {?} key
     * @return {?}
     */
    VisitorService.prototype.getDocument = /**
     * get a single document
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (key) {
            return this.getDocPayload(key);
        }
        return of(null);
    };
    /**
     * Update a document
     */
    /**
     * Update a document
     * @param {?} document
     * @return {?}
     */
    VisitorService.prototype.updateDocument = /**
     * Update a document
     * @param {?} document
     * @return {?}
     */
    function (document) {
        return this.collectionRef.doc(document.key).update(__assign({}, document));
    };
    /**
     * create a Document
     */
    /**
     * create a Document
     * @param {?} document
     * @return {?}
     */
    VisitorService.prototype.createDocument = /**
     * create a Document
     * @param {?} document
     * @return {?}
     */
    function (document) {
        return this.collectionRef.add(document);
    };
    /**
     * Delete a document
     */
    /**
     * Delete a document
     * @param {?} document
     * @return {?}
     */
    VisitorService.prototype.deleteDocument = /**
     * Delete a document
     * @param {?} document
     * @return {?}
     */
    function (document) {
        return this.collectionRef.doc(document.key).delete();
    };
    VisitorService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    VisitorService.ctorParameters = function () { return [
        { type: AngularFirestore },
        { type: String, decorators: [{ type: Inject, args: ['TABLE_NAME',] }] }
    ]; };
    /** @nocollapse */ VisitorService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function VisitorService_Factory() { return new VisitorService(i0.ɵɵinject(i1.AngularFirestore), i0.ɵɵinject("TABLE_NAME")); }, token: VisitorService, providedIn: "root" });
    return VisitorService;
}());
export { VisitorService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9maXJlYmFzZS92aXNpdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQU90RSxPQUFPLEVBRUwsZ0JBQWdCLEVBS2pCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBRWhELDhCQUdDOzs7SUFGQyx1QkFBYTs7SUFDYixzQkFBWTs7QUFHZDtJQWtCRSx3QkFBbUIsR0FBcUIsRUFBd0IsS0FBYTtRQUE3RSxpQkFpQkM7UUFqQmtCLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ3RDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FDWixDQUFDLElBQUksQ0FDSixTQUFTOzs7O1FBQUMsVUFBQyxFQUFnQztnQkFBaEMsa0JBQWdDLEVBQS9CLGVBQU8sRUFBRSxhQUFLLEVBQUUsZUFBTyxFQUFFLGFBQUs7WUFDeEMsT0FBTyxLQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsS0FBSzs7OztZQUFFLFVBQUMsR0FBRztnQkFDekMsS0FBSSxDQUFDLEtBQUssR0FBRyxtQkFBQSxHQUFHLEVBQXVCLENB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Q0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSCx1Q0FBYzs7Ozs7SUFBZCxVQUFlLFFBQWtCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sY0FBSyxRQUFRLEVBQUUsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNILHVDQUFjOzs7OztJQUFkLFVBQWUsUUFBYTtRQUMxQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsdUNBQWM7Ozs7O0lBQWQsVUFBZSxRQUFrQjtRQUMvQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2RCxDQUFDOztnQkExSUYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFmQyxnQkFBZ0I7NkNBK0IyQixNQUFNLFNBQUMsWUFBWTs7O3lCQXpDaEU7Q0FrS0MsQUEzSUQsSUEySUM7U0F4SVksY0FBYzs7O0lBQ3pCLHVDQUE2RDs7SUFDN0Qsb0NBQW9EOztJQUNwRCxtQ0FBZ0M7O0lBQ2hDLGdDQUFvQzs7SUFDcEMsa0NBQXdDOztJQUN4QyxnQ0FBdUM7O0lBQ3ZDLGtDQUF5Qzs7SUFDekMscUNBQTRDOztJQUM1QyxrQ0FBc0M7O0lBQ3RDLGdDQUF1Qzs7SUFDdkMsb0NBQTJDOztJQUMzQywrQkFBbUM7O0lBQ25DLCtCQUFjOztJQUVGLDZCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQ29sbGVjdGlvblJlZmVyZW5jZSxcbiAgT3JkZXJCeURpcmVjdGlvbixcbiAgUXVlcnksXG4gIFdoZXJlRmlsdGVyT3Bcbn0gZnJvbSAnQGZpcmViYXNlL2ZpcmVzdG9yZS10eXBlcyc7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIEFuZ3VsYXJGaXJlc3RvcmUsXG4gIEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uLFxuICBEb2N1bWVudENoYW5nZUFjdGlvbixcbiAgRG9jdW1lbnRSZWZlcmVuY2UsXG4gIERvY3VtZW50U25hcHNob3Rcbn0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9maXJlc3RvcmUnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9jdW1lbnQge1xuICBrZXk/OiBzdHJpbmc7XG4gIGlkPzogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBWaXNpdG9yU2VydmljZSB7XG4gIGNvbGxlY3Rpb25SZWY6IEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uPERvY3VtZW50UmVmZXJlbmNlPjtcbiAgZG9jdW1lbnRzJDogT2JzZXJ2YWJsZTxEb2N1bWVudENoYW5nZUFjdGlvbjxhbnk+W10+O1xuICBkb2N1bWVudCQ6IE9ic2VydmFibGU8RG9jdW1lbnQ+O1xuICBxdWVyeSQ6IEJlaGF2aW9yU3ViamVjdDxhbnkgfCBudWxsPjtcbiAgZmlsdGVycyQ6IEJlaGF2aW9yU3ViamVjdDxhbnlbXSB8IG51bGw+O1xuICBsaW1pdCQ6IEJlaGF2aW9yU3ViamVjdDxudW1iZXIgfCBudWxsPjtcbiAgc3RhcnRBdCQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPjtcbiAgc3RhcnRBZnRlciQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPjtcbiAgb3JkZXJCeSQ6IEJlaGF2aW9yU3ViamVjdDxhbnkgfCBudWxsPjtcbiAgZW5kQXQkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD47XG4gIGVuZEJlZm9yZSQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPjtcbiAgcXVlcnk6IENvbGxlY3Rpb25SZWZlcmVuY2UgfCBRdWVyeTtcbiAgdGFibGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWZzOiBBbmd1bGFyRmlyZXN0b3JlLCBASW5qZWN0KCdUQUJMRV9OQU1FJykgdGFibGU6IHN0cmluZykge1xuICAgIHRoaXMuaW5pdGlhbGl6ZUJlaGF2aW91cih0YWJsZSk7XG4gICAgdGhpcy5kb2N1bWVudHMkID0gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMuZmlsdGVycyQsXG4gICAgICB0aGlzLmxpbWl0JCxcbiAgICAgIHRoaXMub3JkZXJCeSQsXG4gICAgICB0aGlzLnF1ZXJ5JFxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW2ZpbHRlcnMsIGxpbWl0LCBvcmRlckJ5LCBxdWVyeV0pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWZzLmNvbGxlY3Rpb24odGhpcy50YWJsZSwgKHJlZikgPT4ge1xuICAgICAgICAgIHRoaXMucXVlcnkgPSByZWYgYXMgQ29sbGVjdGlvblJlZmVyZW5jZTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZVF1ZXJ5KGZpbHRlcnMsIGxpbWl0LCBvcmRlckJ5LCBxdWVyeSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnk7XG4gICAgICAgIH0pXG4gICAgICAgICAgLnNuYXBzaG90Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgY3JlYXRlUXVlcnkoZmlsdGVycywgbGltaXQsIG9yZGVyQnksIHF1ZXJ5KSB7XG4gICAgaWYgKHF1ZXJ5ICYmIHRoaXMucXVlcnkpIHtcbiAgICAgIGlmIChxdWVyeS5saW1pdCkge1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeS5saW1pdChxdWVyeS5saW1pdCk7XG4gICAgICB9XG4gICAgICBpZiAocXVlcnkuZmlsdGVycykge1xuICAgICAgICBxdWVyeS5maWx0ZXJzLmZvckVhY2goKGZpbHRlcikgPT4ge1xuICAgICAgICAgIHRoaXMucXVlcnkgPSB0aGlzLnF1ZXJ5LndoZXJlKGZpbHRlci5jb2x1bW4sIGZpbHRlci5vcGVyYXRvciBhcyBXaGVyZUZpbHRlck9wLCBmaWx0ZXIudmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChxdWVyeS5vcmRlckJ5KSB7XG4gICAgICAgIHRoaXMucXVlcnkgPSB0aGlzLnF1ZXJ5Lm9yZGVyQnkocXVlcnkub3JkZXJCeS5jb2x1bW4sIHF1ZXJ5Lm9yZGVyQnkuZGlyZWN0aW9uIGFzIE9yZGVyQnlEaXJlY3Rpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChsaW1pdCkge1xuICAgICAgdGhpcy5xdWVyeSA9IHRoaXMucXVlcnkubGltaXQobGltaXQpO1xuICAgIH1cbiAgICBpZiAoZmlsdGVycyAmJiB0aGlzLnF1ZXJ5KSB7XG4gICAgICBmaWx0ZXJzLmZvckVhY2goKGZpbHRlcikgPT4ge1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeS53aGVyZShmaWx0ZXIuY29sdW1uLCBmaWx0ZXIub3BlcmF0b3IgYXMgV2hlcmVGaWx0ZXJPcCwgZmlsdGVyLnZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAob3JkZXJCeSkge1xuICAgICAgdGhpcy5xdWVyeSA9IHRoaXMucXVlcnkub3JkZXJCeShvcmRlckJ5LmNvbHVtbiwgb3JkZXJCeS5kaXJlY3Rpb24gYXMgT3JkZXJCeURpcmVjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZUJlaGF2aW91cih0YWJsZTogc3RyaW5nKSB7XG4gICAgdGhpcy50YWJsZSA9IHRhYmxlO1xuICAgIHRoaXMucXVlcnkkID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgICB0aGlzLmZpbHRlcnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgICB0aGlzLmxpbWl0JCA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gICAgdGhpcy5vcmRlckJ5JCA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gICAgdGhpcy5jb2xsZWN0aW9uUmVmID0gdGhpcy5hZnMuY29sbGVjdGlvbih0aGlzLnRhYmxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgbXVsdGlwbGUgZG9jdW1lbnRzXG4gICAqIEByZXR1cm4gT2JzZXJ2YWJsZVxuICAgKi9cbiAgZ2V0RG9jdW1lbnRzKCk6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudHMkLnBpcGUoXG4gICAgICBtYXAoKGRvY3VtZW50cykgPT4ge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnRzLm1hcCgoZG9jdW1lbnQ6IERvY3VtZW50Q2hhbmdlQWN0aW9uPGFueT4pID0+IHtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQucGF5bG9hZC5kb2MuZXhpc3RzKSB7XG4gICAgICAgICAgICBjb25zdCBkb2MgPSBkb2N1bWVudC5wYXlsb2FkLmRvYy5kYXRhKCkgYXMgRG9jdW1lbnQ7XG4gICAgICAgICAgICBkb2Mua2V5ID0gZG9jdW1lbnQucGF5bG9hZC5kb2MuaWQ7XG4gICAgICAgICAgICByZXR1cm4gZG9jO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHNuYXBzaG90IGNoYW5nZSB3aXRoIHN0YXRlLCBmcm9tIGFjdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBnZXREb2NQYXlsb2FkKHBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnQkID0gdGhpcy5jb2xsZWN0aW9uUmVmXG4gICAgICAuZG9jKHBhdGgpXG4gICAgICAuc25hcHNob3RDaGFuZ2VzKClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKGFjdGlvbjogQWN0aW9uPERvY3VtZW50U25hcHNob3Q8RG9jdW1lbnRSZWZlcmVuY2U+PikgPT4ge1xuICAgICAgICAgIGlmIChhY3Rpb24ucGF5bG9hZC5leGlzdHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3QgPSBhY3Rpb24ucGF5bG9hZC5kYXRhKCkgYXMgRG9jdW1lbnQ7XG4gICAgICAgICAgICBwcm9kdWN0LmtleSA9IGFjdGlvbi5wYXlsb2FkLmlkO1xuICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IGEgc2luZ2xlIGRvY3VtZW50XG4gICAqL1xuICBnZXREb2N1bWVudChrZXk6IG51bGwgfCBzdHJpbmcpOiBPYnNlcnZhYmxlPERvY3VtZW50PiB7XG4gICAgaWYgKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RG9jUGF5bG9hZChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gb2YobnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGEgZG9jdW1lbnRcbiAgICovXG4gIHVwZGF0ZURvY3VtZW50KGRvY3VtZW50OiBEb2N1bWVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb25SZWYuZG9jKGRvY3VtZW50LmtleSkudXBkYXRlKHsuLi5kb2N1bWVudH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIERvY3VtZW50XG4gICAqL1xuICBjcmVhdGVEb2N1bWVudChkb2N1bWVudDogYW55KTogUHJvbWlzZTxEb2N1bWVudFJlZmVyZW5jZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb25SZWYuYWRkKGRvY3VtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBkb2N1bWVudFxuICAgKi9cbiAgZGVsZXRlRG9jdW1lbnQoZG9jdW1lbnQ6IERvY3VtZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvblJlZi5kb2MoZG9jdW1lbnQua2V5KS5kZWxldGUoKTtcbiAgfVxufVxuIl19