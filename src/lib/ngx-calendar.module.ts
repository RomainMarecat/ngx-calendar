import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarBodyComponent } from './calendar/calendar-body/calendar-body.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventService } from './shared/event/event.service';
import { SessionService } from './shared/session/session.service';
import { AlertService } from './shared/util/alert.service';
import { RoutingState } from './shared/util/routing-state';

export const TABLE_EVENT = new InjectionToken<string>('event');
export const TABLE_SESSION = new InjectionToken<string>('session');

@NgModule({
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
    {provide: TABLE_SESSION, useValue: 'session'},
    {provide: TABLE_EVENT, useValue: 'event'},
    {provide: EventService, useClass: EventService, deps: [AngularFirestore, TABLE_EVENT]},
    {provide: SessionService, useClass: SessionService, deps: [AngularFirestore, TABLE_SESSION]},
  ]
})
export class NgxCalendarModule {
}
