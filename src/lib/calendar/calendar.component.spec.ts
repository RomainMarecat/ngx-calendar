import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { mockEnd, mockStart } from '../shared/day/mock-day';

import { CalendarComponent } from './calendar.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarBodyComponent } from './calendar-body/calendar-body.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
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

    expect(component).toBeTruthy();
  });
});
