import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class SessionService {
    constructor() {
        this.sessionsEntries$ = new BehaviorSubject([]);
        this.sessions = new BehaviorSubject(new Map());
    }
}
SessionService.ɵfac = function SessionService_Factory(t) { return new (t || SessionService)(); };
SessionService.ɵprov = i0.ɵɵdefineInjectable({ token: SessionService, factory: SessionService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SessionService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJvbWFpbm1hcmVjYXQvbmd4LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9zZXNzaW9uL3Nlc3Npb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBTXZDLE1BQU0sT0FBTyxjQUFjO0lBTXpCO1FBSkEscUJBQWdCLEdBQStCLElBQUksZUFBZSxDQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRWxGLGFBQVEsR0FBMEMsSUFBSSxlQUFlLENBQXVCLElBQUksR0FBRyxFQUFtQixDQUFDLENBQUM7SUFHeEgsQ0FBQzs7NEVBUFUsY0FBYztzREFBZCxjQUFjLFdBQWQsY0FBYyxtQkFGYixNQUFNO2tEQUVQLGNBQWM7Y0FIMUIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi9zZXNzaW9uJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2Vzc2lvblNlcnZpY2Uge1xuXG4gIHNlc3Npb25zRW50cmllcyQ6IEJlaGF2aW9yU3ViamVjdDxTZXNzaW9uW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTZXNzaW9uW10+KFtdKTtcblxuICBzZXNzaW9uczogQmVoYXZpb3JTdWJqZWN0PE1hcDxzdHJpbmcsIFNlc3Npb24+PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWFwPHN0cmluZywgU2Vzc2lvbj4+KG5ldyBNYXA8c3RyaW5nLCBTZXNzaW9uPigpKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxufVxuIl19