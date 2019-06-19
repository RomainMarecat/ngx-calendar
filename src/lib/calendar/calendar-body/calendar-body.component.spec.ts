import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mockAvailabilities, mockDays, mockEnd, mockStart } from '../../shared/day/mock-day';
import { EventService } from '../../shared/event/event.service';
import { MockEventService } from '../../shared/event/mock-event.service';
import { mockOnlineSession } from '../../shared/session/mock-online-session';

import { CalendarBodyComponent } from './calendar-body.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('CalendarBodyComponent', () => {
  let component: CalendarBodyComponent;
  let fixture: ComponentFixture<CalendarBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatTooltipModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        FlexLayoutModule,
      ],
      declarations: [
        CalendarBodyComponent
      ],
      providers: [
        {provide: EventService, useClass: MockEventService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    component.viewMode = 'week';
    component.days = mockDays;
    component.daysAvailability = mockAvailabilities;
    component.end = mockEnd;
    component.start = mockStart;
    component.onlineSession = mockOnlineSession;
    expect(component).toBeTruthy();
  });

});
