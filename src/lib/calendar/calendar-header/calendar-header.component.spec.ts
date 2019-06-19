import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventService } from '../../shared/event/event.service';
import { MockEventService } from '../../shared/event/mock-event.service';

import { CalendarHeaderComponent } from './calendar-header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatTooltipModule } from '@angular/material';

describe('CalendarHeaderComponent', () => {
  let component: CalendarHeaderComponent;
  let fixture: ComponentFixture<CalendarHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTooltipModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        FlexLayoutModule,
      ],
      declarations: [
        CalendarHeaderComponent
      ],
      providers: [
        {provide: EventService, useClass: MockEventService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
