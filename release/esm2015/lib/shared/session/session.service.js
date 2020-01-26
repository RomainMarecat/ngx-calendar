/**
 * @fileoverview added by tsickle
 * Generated from: lib/shared/session/session.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class SessionService {
    constructor() {
        this.sessionsEntries$ = new BehaviorSubject([]);
        this.sessions = new BehaviorSubject(new Map());
    }
}
SessionService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SessionService.ctorParameters = () => [];
/** @nocollapse */ SessionService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SessionService_Factory() { return new SessionService(); }, token: SessionService, providedIn: "root" });
if (false) {
    /** @type {?} */
    SessionService.prototype.sessionsEntries$;
    /** @type {?} */
    SessionService.prototype.sessions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9zZXNzaW9uL3Nlc3Npb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFNdkMsTUFBTSxPQUFPLGNBQWM7SUFNekI7UUFKQSxxQkFBZ0IsR0FBK0IsSUFBSSxlQUFlLENBQVksRUFBRSxDQUFDLENBQUM7UUFFbEYsYUFBUSxHQUEwQyxJQUFJLGVBQWUsQ0FBdUIsSUFBSSxHQUFHLEVBQW1CLENBQUMsQ0FBQztJQUd4SCxDQUFDOzs7WUFWRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7SUFHQywwQ0FBa0Y7O0lBRWxGLGtDQUF3SCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gJy4vc2Vzc2lvbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNlc3Npb25TZXJ2aWNlIHtcblxuICBzZXNzaW9uc0VudHJpZXMkOiBCZWhhdmlvclN1YmplY3Q8U2Vzc2lvbltdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2Vzc2lvbltdPihbXSk7XG5cbiAgc2Vzc2lvbnM6IEJlaGF2aW9yU3ViamVjdDxNYXA8c3RyaW5nLCBTZXNzaW9uPj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1hcDxzdHJpbmcsIFNlc3Npb24+PihuZXcgTWFwPHN0cmluZywgU2Vzc2lvbj4oKSk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbn1cbiJdfQ==