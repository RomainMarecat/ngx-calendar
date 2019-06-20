import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatIconModule,
} from '@angular/material';
import { CalendarBodyComponent } from './calendar/calendar-body/calendar-body.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
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
})
export class NgxCalendarModule {
}
