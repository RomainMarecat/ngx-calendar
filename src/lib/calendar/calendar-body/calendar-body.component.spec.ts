import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarBodyComponent } from './calendar-body.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('CalendarBodyComponent', () => {
  let component: CalendarBodyComponent;
  let fixture: ComponentFixture<CalendarBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
      ],
      declarations: [
        CalendarBodyComponent
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
});
