import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mockEnd, mockStart } from '../shared/day/mock-day';
import { mockOnlineSession } from '../shared/session/mock-online-session';

import { CalendarComponent } from './calendar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarBodyComponent } from './calendar-body/calendar-body.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [
        CalendarComponent,
        CalendarHeaderComponent,
        CalendarBodyComponent
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.viewMode = 'week';
    expect(component).toBeTruthy();
  });

  it('should create with param', () => {

    component.viewMode = 'week';
    component.start = mockStart;
    component.end = mockEnd;
    component.onlineSession = mockOnlineSession;

    expect(component).toBeTruthy();
  });
});
