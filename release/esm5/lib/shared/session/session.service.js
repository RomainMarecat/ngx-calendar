/**
 * @fileoverview added by tsickle
 * Generated from: lib/shared/session/session.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
var SessionService = /** @class */ (function () {
    function SessionService() {
        this.sessionsEntries$ = new BehaviorSubject([]);
        this.sessions = new BehaviorSubject(new Map());
    }
    SessionService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SessionService.ctorParameters = function () { return []; };
    /** @nocollapse */ SessionService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SessionService_Factory() { return new SessionService(); }, token: SessionService, providedIn: "root" });
    return SessionService;
}());
export { SessionService };
if (false) {
    /** @type {?} */
    SessionService.prototype.sessionsEntries$;
    /** @type {?} */
    SessionService.prototype.sessions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9zZXNzaW9uL3Nlc3Npb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFHdkM7SUFTRTtRQUpBLHFCQUFnQixHQUErQixJQUFJLGVBQWUsQ0FBWSxFQUFFLENBQUMsQ0FBQztRQUVsRixhQUFRLEdBQTBDLElBQUksZUFBZSxDQUF1QixJQUFJLEdBQUcsRUFBbUIsQ0FBQyxDQUFDO0lBR3hILENBQUM7O2dCQVZGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7O3lCQU5EO0NBZUMsQUFYRCxJQVdDO1NBUlksY0FBYzs7O0lBRXpCLDBDQUFrRjs7SUFFbEYsa0NBQXdIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi9zZXNzaW9uJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2Vzc2lvblNlcnZpY2Uge1xuXG4gIHNlc3Npb25zRW50cmllcyQ6IEJlaGF2aW9yU3ViamVjdDxTZXNzaW9uW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTZXNzaW9uW10+KFtdKTtcblxuICBzZXNzaW9uczogQmVoYXZpb3JTdWJqZWN0PE1hcDxzdHJpbmcsIFNlc3Npb24+PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWFwPHN0cmluZywgU2Vzc2lvbj4+KG5ldyBNYXA8c3RyaW5nLCBTZXNzaW9uPigpKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxufVxuIl19