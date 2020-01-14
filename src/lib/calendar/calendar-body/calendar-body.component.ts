import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment_ from 'moment';
import { Moment } from 'moment';
import { CalendarConfiguration } from '../../shared/configuration/calendar-configuration';
import { Day } from '../../shared/day/day';
import { EventType } from '../../shared/event/event';
import { OnlineSession } from '../../shared/session/online-session';
import { Session } from '../../shared/session/session';

const moment = moment_;

@Component({
  selector: 'lib-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss']
})
export class CalendarBodyComponent {
  /**
   * User could be passed to generate a personal calendar
   */
  @Input() user: {
    uid: string;
    displayName: string;
    email: string;
  };
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
  @Input() sessions: Map<string, Session>;
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
      if (session.details.info) {
        return session.details.info;
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

    if (!this.isDateTimeInSessionsFromCurrentUser(day, time) && !this.isSlotInSession(day, time)) {
      const mmtStart = moment(datetime, 'YYYY-MM-DDHH:mm');
      const mmtEnd = mmtStart.clone().add(this.onlineSession.detail.duration, 'minutes');
      this.addSession(mmtStart, mmtEnd);
    } else if (this.sessions.has(datetime)) {
      const session = this.sessions.get(datetime);
      const source = {key: datetime, session};
      this.removeSession(source);
    }
  }

  addSession(start: Moment, end: Moment) {

    // To prevent a stringify Date without good timezone
    Date.prototype.toJSON = function() {
      return moment(this).format();
    };

    // Create session
    const session: Session = {
      start: start.toDate(),
      end: end.toDate(),
      pause: this.onlineSession.detail.pause,
      details: {
        duration: this.onlineSession.detail.duration,
        nb_persons: 1,
        event_type: EventType.session,
        info: this.bodyConfiguration.calendar.session.info,
      },
      user: {
        uid: this.user.uid,
        displayName: this.user.displayName,
        email: this.user.email,
      }
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

    return this.sessions && this.sessions.has(datetime);
  }

  isSlotSessionEnd(day: Day, time: string): boolean {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    return this.sessionsEndSlots && this.sessionsEndSlots.has(datetime);
  }
}
