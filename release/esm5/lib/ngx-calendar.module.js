import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarBodyComponent } from './calendar/calendar-body/calendar-body.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MatIconModule } from '@angular/material/icon';
import * as i0 from "@angular/core";
var NgxCalendarModule = /** @class */ (function () {
    function NgxCalendarModule() {
    }
    NgxCalendarModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxCalendarModule });
    NgxCalendarModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgxCalendarModule_Factory(t) { return new (t || NgxCalendarModule)(); }, imports: [[
                CommonModule,
                FlexLayoutModule,
                MatIconModule,
            ]] });
    return NgxCalendarModule;
}());
export { NgxCalendarModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNhbGVuZGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2FsZW5kYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFFdkQ7SUFBQTtLQWtCQzt5REFEWSxpQkFBaUI7cUhBQWpCLGlCQUFpQixrQkFoQm5CO2dCQUNQLFlBQVk7Z0JBQ1osZ0JBQWdCO2dCQUNoQixhQUFhO2FBQ2Q7NEJBYkg7Q0EwQkMsQUFsQkQsSUFrQkM7U0FEWSxpQkFBaUI7d0ZBQWpCLGlCQUFpQixtQkFWMUIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2QixxQkFBcUIsYUFQckIsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixhQUFhLGFBUWIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2QixxQkFBcUI7a0RBR1osaUJBQWlCO2NBakI3QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixhQUFhO2lCQUNkO2dCQUNELFlBQVksRUFBRTtvQkFDWixpQkFBaUI7b0JBQ2pCLHVCQUF1QjtvQkFDdkIscUJBQXFCO2lCQUN0QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsaUJBQWlCO29CQUNqQix1QkFBdUI7b0JBQ3ZCLHFCQUFxQjtpQkFDdEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IENhbGVuZGFyQm9keUNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIvY2FsZW5kYXItYm9keS9jYWxlbmRhci1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIvY2FsZW5kYXItaGVhZGVyL2NhbGVuZGFyLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDYWxlbmRhckNvbXBvbmVudCxcbiAgICBDYWxlbmRhckhlYWRlckNvbXBvbmVudCxcbiAgICBDYWxlbmRhckJvZHlDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDYWxlbmRhckNvbXBvbmVudCxcbiAgICBDYWxlbmRhckhlYWRlckNvbXBvbmVudCxcbiAgICBDYWxlbmRhckJvZHlDb21wb25lbnQsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4Q2FsZW5kYXJNb2R1bGUge1xufVxuIl19