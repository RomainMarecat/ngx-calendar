/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarBodyComponent } from './calendar/calendar-body/calendar-body.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventService } from './shared/event/event.service';
import { SessionService } from './shared/session/session.service';
import { AlertService } from './shared/util/alert.service';
import { RoutingState } from './shared/util/routing-state';
/** @type {?} */
export var TABLE_EVENT = new InjectionToken('event');
/** @type {?} */
export var TABLE_SESSION = new InjectionToken('session');
var NgxCalendarModule = /** @class */ (function () {
    function NgxCalendarModule() {
    }
    NgxCalendarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FlexLayoutModule,
                        MatTooltipModule,
                        MatButtonModule,
                        MatCardModule,
                        MatTableModule,
                        MatIconModule,
                        TranslateModule.forChild()
                    ],
                    declarations: [
                        CalendarComponent,
                        CalendarHeaderComponent,
                        CalendarBodyComponent,
                    ],
                    exports: [
                        CalendarComponent,
                        CalendarHeaderComponent,
                        CalendarBodyComponent,
                    ],
                    providers: [
                        AlertService,
                        RoutingState,
                        { provide: TABLE_SESSION, useValue: 'session' },
                        { provide: TABLE_EVENT, useValue: 'event' },
                        { provide: EventService, useClass: EventService, deps: [AngularFirestore, TABLE_EVENT] },
                        { provide: SessionService, useClass: SessionService, deps: [AngularFirestore, TABLE_SESSION] },
                    ]
                },] }
    ];
    return NgxCalendarModule;
}());
export { NgxCalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNhbGVuZGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2FsZW5kYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUNMLGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNiLGNBQWMsRUFDZCxnQkFBZ0IsRUFDakIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDekYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDL0YsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQUUzRCxNQUFNLEtBQU8sV0FBVyxHQUFHLElBQUksY0FBYyxDQUFTLE9BQU8sQ0FBQzs7QUFDOUQsTUFBTSxLQUFPLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBUyxTQUFTLENBQUM7QUFFbEU7SUFBQTtJQStCQSxDQUFDOztnQkEvQkEsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLGVBQWUsQ0FBQyxRQUFRLEVBQUU7cUJBQzNCO29CQUNELFlBQVksRUFBRTt3QkFDWixpQkFBaUI7d0JBQ2pCLHVCQUF1Qjt3QkFDdkIscUJBQXFCO3FCQUN0QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsaUJBQWlCO3dCQUNqQix1QkFBdUI7d0JBQ3ZCLHFCQUFxQjtxQkFDdEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULFlBQVk7d0JBQ1osWUFBWTt3QkFDWixFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQzt3QkFDN0MsRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUM7d0JBQ3pDLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxFQUFDO3dCQUN0RixFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsRUFBQztxQkFDN0Y7aUJBQ0Y7O0lBRUQsd0JBQUM7Q0FBQSxBQS9CRCxJQStCQztTQURZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiwgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlc3RvcmUgfSBmcm9tICdAYW5ndWxhci9maXJlL2ZpcmVzdG9yZSc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHtcbiAgTWF0QnV0dG9uTW9kdWxlLFxuICBNYXRDYXJkTW9kdWxlLFxuICBNYXRJY29uTW9kdWxlLFxuICBNYXRUYWJsZU1vZHVsZSxcbiAgTWF0VG9vbHRpcE1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyQm9keUNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIvY2FsZW5kYXItYm9keS9jYWxlbmRhci1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIvY2FsZW5kYXItaGVhZGVyL2NhbGVuZGFyLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFdmVudFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9ldmVudC9ldmVudC5zZXJ2aWNlJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWxlcnRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvdXRpbC9hbGVydC5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRpbmdTdGF0ZSB9IGZyb20gJy4vc2hhcmVkL3V0aWwvcm91dGluZy1zdGF0ZSc7XG5cbmV4cG9ydCBjb25zdCBUQUJMRV9FVkVOVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdldmVudCcpO1xuZXhwb3J0IGNvbnN0IFRBQkxFX1NFU1NJT04gPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignc2Vzc2lvbicpO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JDaGlsZCgpXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhbGVuZGFyQ29tcG9uZW50LFxuICAgIENhbGVuZGFySGVhZGVyQ29tcG9uZW50LFxuICAgIENhbGVuZGFyQm9keUNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENhbGVuZGFyQ29tcG9uZW50LFxuICAgIENhbGVuZGFySGVhZGVyQ29tcG9uZW50LFxuICAgIENhbGVuZGFyQm9keUNvbXBvbmVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQWxlcnRTZXJ2aWNlLFxuICAgIFJvdXRpbmdTdGF0ZSxcbiAgICB7cHJvdmlkZTogVEFCTEVfU0VTU0lPTiwgdXNlVmFsdWU6ICdzZXNzaW9uJ30sXG4gICAge3Byb3ZpZGU6IFRBQkxFX0VWRU5ULCB1c2VWYWx1ZTogJ2V2ZW50J30sXG4gICAge3Byb3ZpZGU6IEV2ZW50U2VydmljZSwgdXNlQ2xhc3M6IEV2ZW50U2VydmljZSwgZGVwczogW0FuZ3VsYXJGaXJlc3RvcmUsIFRBQkxFX0VWRU5UXX0sXG4gICAge3Byb3ZpZGU6IFNlc3Npb25TZXJ2aWNlLCB1c2VDbGFzczogU2Vzc2lvblNlcnZpY2UsIGRlcHM6IFtBbmd1bGFyRmlyZXN0b3JlLCBUQUJMRV9TRVNTSU9OXX0sXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4Q2FsZW5kYXJNb2R1bGUge1xufVxuIl19