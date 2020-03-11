import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarBodyComponent } from './calendar/calendar-body/calendar-body.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MatIconModule } from '@angular/material/icon';
import * as i0 from "@angular/core";
export class NgxCalendarModule {
}
NgxCalendarModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxCalendarModule });
NgxCalendarModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgxCalendarModule_Factory(t) { return new (t || NgxCalendarModule)(); }, imports: [[
            CommonModule,
            FlexLayoutModule,
            MatIconModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxCalendarModule, { declarations: [CalendarComponent,
        CalendarHeaderComponent,
        CalendarBodyComponent], imports: [CommonModule,
        FlexLayoutModule,
        MatIconModule], exports: [CalendarComponent,
        CalendarHeaderComponent,
        CalendarBodyComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgxCalendarModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FlexLayoutModule,
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
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNhbGVuZGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2FsZW5kYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFtQnZELE1BQU0sT0FBTyxpQkFBaUI7O3FEQUFqQixpQkFBaUI7aUhBQWpCLGlCQUFpQixrQkFoQm5CO1lBQ1AsWUFBWTtZQUNaLGdCQUFnQjtZQUNoQixhQUFhO1NBQ2Q7d0ZBWVUsaUJBQWlCLG1CQVYxQixpQkFBaUI7UUFDakIsdUJBQXVCO1FBQ3ZCLHFCQUFxQixhQVByQixZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLGFBQWEsYUFRYixpQkFBaUI7UUFDakIsdUJBQXVCO1FBQ3ZCLHFCQUFxQjtrREFHWixpQkFBaUI7Y0FqQjdCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixnQkFBZ0I7b0JBQ2hCLGFBQWE7aUJBQ2Q7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLGlCQUFpQjtvQkFDakIsdUJBQXVCO29CQUN2QixxQkFBcUI7aUJBQ3RCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxpQkFBaUI7b0JBQ2pCLHVCQUF1QjtvQkFDdkIscUJBQXFCO2lCQUN0QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci9jYWxlbmRhci1ib2R5L2NhbGVuZGFyLWJvZHkuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFySGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci9jYWxlbmRhci1oZWFkZXIvY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIvY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhbGVuZGFyQ29tcG9uZW50LFxuICAgIENhbGVuZGFySGVhZGVyQ29tcG9uZW50LFxuICAgIENhbGVuZGFyQm9keUNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENhbGVuZGFyQ29tcG9uZW50LFxuICAgIENhbGVuZGFySGVhZGVyQ29tcG9uZW50LFxuICAgIENhbGVuZGFyQm9keUNvbXBvbmVudCxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hDYWxlbmRhck1vZHVsZSB7XG59XG4iXX0=