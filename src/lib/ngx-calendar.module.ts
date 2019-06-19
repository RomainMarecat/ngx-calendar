import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule,
} from '@angular/material';
import { CalendarBodyComponent } from './calendar/calendar-body/calendar-body.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
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
})
export class NgxCalendarModule {
}
