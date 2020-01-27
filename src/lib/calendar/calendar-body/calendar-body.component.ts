import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment_ from 'moment';
import { Moment } from 'moment';
import { CalendarConfiguration } from '../../shared/configuration/calendar-configuration';
import { Day } from '../../shared/day/day';
import { EventType } from '../../shared/event/event';
import { OnlineSession } from '../../shared/session/online-session';
import { Session } from '../../shared/session/session';
import { SessionService } from '../../shared/session/session.service';

const moment = moment_;

@Component({
  selector: 'lib-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss']
})
export class CalendarBodyComponent implements OnInit {
  /**
   * User could be passed to show session owner
   */
  @Input() user: any;
  /**
   * Customer could be passed to generate a personal calendar
   */
  @Input() customer: any;
  /**
   * current online session
   */
  @Input() onlineSession: OnlineSession;
  /**
   * View mode input
   */
  @Input() viewMode: string;
  /**
   * Start day week
   */
  @Input() start: Moment;
  /**
   * End day week
   */
  @Input() end: Moment;
  /**
   * Day of curretn week
   */
  @Input() days: Array<Day>;

  @Input() daysAvailability: Map<string, string[]>;
  @Input() daysBusySlotNumber: Map<string, number>;
  @Input() daysAvailabilitySlotNumber: Map<string, number>;
  @Input() busySlots: Set<string>;
  @Input() earlySlots: Set<string>;
  @Input() pauseSlots: Set<string>;
  @Input() sessionsSlots: Set<string>;
  @Input() sessionsEndSlots: Set<string>;
  @Input() sessionsStartSlots: Set<string>;
  sessions: Map<string, Session>;
  /**
   * Configuration body
   */
  @Input() bodyConfiguration: CalendarConfiguration;

  @Output() sessionAdded: EventEmitter<Session> = new EventEmitter<Session>();
  @Output() sessionRemoved: EventEmitter<{key: string, session: Session}>
    = new EventEmitter<{key: string, session: Session}>();
  @Output() startChanged: EventEmitter<Moment> = new EventEmitter<Moment>();
  @Output() endChanged: EventEmitter<Moment> = new EventEmitter<Moment>();
  @Output() slotLocked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
    this.sessionService.sessions
      .subscribe((sessions) => {
        this.sessions = sessions;
      });
  }

  /**
   * On click next day button, trigger switch start
   */
  onNextDay() {
    let daysNb = 1;
    if (this.viewMode === 'week') {
      daysNb = 7;
    }
    this.start = moment(this.start).add(daysNb, 'day');
    this.startChanged.emit(this.start);
  }

  /**
   * If all slot is not avalaibles all all days
   */
  isAllSlotNotAvailable(): boolean {
    if (this.days && this.days.length > 0) {
      return this.days.filter((day) => this.daysAvailability.get(day.key).length > 0).length === 0;
    }
  }

  /**
   * All Availabilities by key: string, title: string, value: Moment
   */
  getAvailabilities(day: string): string[] {
    return this.daysAvailability.get(day);
  }

  getSessionTitle(day: Day, time: string): string {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    if (this.sessions && this.sessions.has(datetime)) {
      const session: Session = this.sessions.get(datetime);
      return moment(session.start).format('HH:mm') + ' - ' + moment(session.end).format('HH:mm');
    }
    return '';
  }

  getSessionTooltip(day: Day, time: string): string {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;
    if (this.sessions && this.sessions.has(datetime)) {
      const session = this.sessions.get(datetime);
      if (session.comment) {
        return session.comment;
      }
    }

    return '';
  }

  onTimeSlotClicked(day: Day, time: string) {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    if (this.isSlotBusy(day, time) || this.isSlotEarly(day, time)) {
      this.slotLocked.emit(true);
      return;
    }

    if (!this.isDateTimeInSessionsFromCurrentUser(day, time)) {
      const mmtStart = moment(datetime, 'YYYY-MM-DDHH:mm');
      const mmtEnd = mmtStart.clone().add(this.onlineSession.duration, 'minutes');
      this.addSession(mmtStart, mmtEnd);
      return;
    }

    if (this.sessions.has(datetime)) {
      const session = this.sessions.get(datetime);
      const source = {key: datetime, session};
      this.removeSession(source);
      return;
    }
  }

  addSession(start: Moment, end: Moment) {

    // To prevent a stringify Date without good timezone
    Date.prototype.toJSON = function () {
      return moment(this).format();
    };

    // Create session
    const session: Session = {
      id: null,
      start: start.toDate(),
      end: end.toDate(),
      pause: this.onlineSession.pause || 0,
      duration: this.onlineSession.duration,
      nb_persons: 1,
      event_type: EventType.session,
      comment: this.bodyConfiguration.calendar.session.info,
      user: this.user,
      customers: [this.customer]
    };
    this.sessionAdded.emit(session);
  }

  removeSession(source: {key: string, session: Session}) {
    this.sessionRemoved.emit(source);
  }

  /**
   * If day is busy (occupé) by current key string
   */
  isDayBusy(day: Day, time: string): boolean {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    return this.daysBusySlotNumber && this.daysAvailabilitySlotNumber
      && this.daysBusySlotNumber.has(datetime) && this.daysAvailabilitySlotNumber.has(datetime)
      && this.daysBusySlotNumber.get(datetime) >= this.daysAvailabilitySlotNumber.get(datetime);
  }

  /**
   * If slot is busy by date
   */
  isSlotBusy(day: Day, time: string): boolean {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    return this.busySlots && this.busySlots.has(datetime);
  }

  /**
   * if slot is on previous (date plus tôt)
   */
  isSlotEarly(day: Day, time: string): boolean {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    return (this.earlySlots && this.earlySlots.has(datetime))
      || (this.pauseSlots && this.pauseSlots.has(datetime));
  }

  /**
   * is Slot in current activities
   */
  isSlotInSession(day: Day, time: string): boolean {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    return this.sessionsSlots && this.sessionsSlots.has(datetime);
  }

  isDateTimeInSessionsFromCurrentUser(day: Day, time: string): boolean {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    const session = this.sessions.get(datetime);

    return this.sessions &&
      this.sessions.has(datetime) &&
      this.sessionsSlots.has(datetime) &&
      this.sessionsSlots.has(moment(session.end).format('YYYY-MM-DDHH:mm')) &&
      this.sessionsStartSlots.has(datetime) &&
      this.sessionsEndSlots.has(moment(session.end).format('YYYY-MM-DDHH:mm'));
  }

  isSlotSessionStart(day: Day, time: string): boolean {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    return this.sessionsSlots &&
      this.sessionsSlots.has(datetime) &&
      this.sessionsStartSlots.has(datetime);
  }

  isSlotSessionEnd(day: Day, time: string): boolean {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    const session = this.sessions.get(datetime);

    return (this.sessionsSlots &&
      this.sessionsSlots.has(datetime) &&
      this.sessionsEndSlots.has(datetime)) ||
      (this.sessionsStartSlots.has(datetime) &&
        session &&
        this.sessionsEndSlots.has(moment(session.end).format('YYYY-MM-DDHH:mm')));
  }
}
