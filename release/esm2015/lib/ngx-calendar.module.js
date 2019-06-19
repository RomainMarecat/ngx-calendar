/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, } from '@angular/material';
import { CalendarBodyComponent } from './calendar/calendar-body/calendar-body.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarComponent } from './calendar/calendar.component';
export class NgxCalendarModule {
}
NgxCalendarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FlexLayoutModule,
                    MatButtonModule,
                    MatIconModule,
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
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNhbGVuZGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2FsZW5kYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFrQixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUNMLGVBQWUsRUFDZixhQUFhLEdBQ2QsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN6RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUMvRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQW9CbEUsTUFBTSxPQUFPLGlCQUFpQjs7O1lBbEI3QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGFBQWE7aUJBQ2Q7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLGlCQUFpQjtvQkFDakIsdUJBQXVCO29CQUN2QixxQkFBcUI7aUJBQ3RCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxpQkFBaUI7b0JBQ2pCLHVCQUF1QjtvQkFDdkIscUJBQXFCO2lCQUN0QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGlvblRva2VuLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7XG4gIE1hdEJ1dHRvbk1vZHVsZSxcbiAgTWF0SWNvbk1vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgQ2FsZW5kYXJCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci9jYWxlbmRhci1ib2R5L2NhbGVuZGFyLWJvZHkuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFySGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci9jYWxlbmRhci1oZWFkZXIvY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIvY2FsZW5kYXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDYWxlbmRhckNvbXBvbmVudCxcbiAgICBDYWxlbmRhckhlYWRlckNvbXBvbmVudCxcbiAgICBDYWxlbmRhckJvZHlDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDYWxlbmRhckNvbXBvbmVudCxcbiAgICBDYWxlbmRhckhlYWRlckNvbXBvbmVudCxcbiAgICBDYWxlbmRhckJvZHlDb21wb25lbnQsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4Q2FsZW5kYXJNb2R1bGUge1xufVxuIl19