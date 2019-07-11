import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import * as moment_ from 'moment';
import { Moment } from 'moment';
import { Twix, TwixIter } from 'twix';
import 'twix';
import { CalendarConfiguration } from '../shared/configuration/calendar-configuration';
import { Day } from '../shared/day/day';
import { OnlineSession } from '../shared/session/online-session';
import { Session } from '../shared/session/session';
import { Event } from '../shared/event/event';

const moment = moment_;

@Component({
  // tslint:disable
  selector: 'ngx-calendar',
  // tslint:enable
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnChanges {
  /**
   * User could be passed to generate a personal calendar
   */
  @Input() user: {
    uid: string;
    displayName: string;
    email: string;
  };
  /**
   * Online sessions definition
   */
  @Input() onlineSession: OnlineSession = {
    key: null,
    session_type: {
      name: '',
      max_persons: 1,
      booking_delay: 1,
      duration: 15,
      pause: 0,
    },
    prices: [10, 20],
    date_range: {
      start: '2019-01-01',
      end: '2030-12-31',
    },
    time_range: {
      start: '08:00',
      end: '19:00',
    }
  };
  /**
   * Start day of calendar (could be updated)
   */
  @Input() start: Moment;
  /**
   * End day of calendar (could be updated but reewriten on switch week mode
   */
  @Input() end: Moment;
  /**
   * Configuration calendar
   */
  @Input() calendarConfiguration: CalendarConfiguration = {
    calendar: {
      cta: {
        next: 'suivant',
        previous: 'précédent',
      },
      today: 'aujourd\'hui',
      back_today: 'revenir à la date d\'aujourd\'hui',
      day: 'jour',
      three_days: '3 jours',
      week: 'semaine',
      title: 'réserver votre créneau',
      subtitle: 'toutes les disponibilités',
      availability: {
        empty: 'Aucune disponibilité',
        slot: 'Prochaine disponibilité',
      },
      session: {
        info: 'Créneau vérrouillé'
      }
    }
  };
  /**
   * When user swhitch view mode event
   */
  @Output() viewModeChanged: EventEmitter<String> = new EventEmitter<String>();
  /**
   * Session created event
   */
  @Output() sessionCreated: EventEmitter<Session> = new EventEmitter<Session>();
  /**
   * Session removed event
   */
  @Output() sessionRemoved: EventEmitter<Session> = new EventEmitter<Session>();
  /**
   * Array of selectable days from start to end
   */
  days: Array<Day> = [];
  /**
   * Slot Duration in minutes
   */
  realDuration: number;
  /**
   * During days from start to end, list of entries that available
   */
  daysAvailability: Map<string, string[]>;
  /**
   * Number of busy slot in each day
   */
  daysBusySlotNumber: Map<string, number>;
  /**
   * Number of available slot in each day
   */
  daysAvailabilitySlotNumber: Map<string, number>;
  /**
   * Set of datetime who reprensents availability
   */
  busySlots: Set<string>;
  /**
   * set of datetime who represents over extends busy slot
   */
  earlySlots: Set<string>;
  /**
   * set of datetime who represents pause slot
   */
  pauseSlots: Set<string>;
  /**
   * set of datetime who represents session slot
   */
  sessionsSlots: Set<string>;
  /**
   * set of datetime who represents end slot (not used in front)
   */
  sessionsEndSlots: Set<string>;
  /**
   * Map of sessions from current user
   */
  sessions: Map<string, Session>;
  /**
   * calendar start day after set full calendar informations
   */
  private calendarStart: Moment;
  /**
   * calendar end day after set full calendar informations
   */
  private calendarEnd: Moment;

  constructor(private cd: ChangeDetectorRef) {
  }

  /**
   * Sessions array loaded by parent component
   */
  _sessionsEntries: Session[] = [];

  get sessionsEntries(): Session[] {
    return this._sessionsEntries;
  }

  @Input() set sessionsEntries(sessionsEntries: Session[]) {
    if (sessionsEntries.length) {
      this._sessionsEntries = sessionsEntries;
      this.loadCalendar();
    }
  }

  // Default View Mode of Week Component
  _viewMode: String = 'week';

  get viewMode(): String {
    return this._viewMode;
  }

  @Input() set viewMode(viewMode) {
    this._viewMode = viewMode;
    this.setViewMode();
  }

  static splitRangeToNextTime(slotTimeRange: TwixIter, slotDuration: number): {time: Twix, mmtTime: Moment} {
    const time: Twix = slotTimeRange.next();
    return {time: time, mmtTime: CalendarComponent.getMinutesDifference(moment(time.toDate()), slotDuration)};
  }

  static getMinutesDifference(mmtTime: Moment, slotDuration: number): Moment {
    if (mmtTime.minutes() % slotDuration !== 0) {
      mmtTime.minutes(mmtTime.minutes() - (mmtTime.minutes() % slotDuration));
    }

    return mmtTime;
  }

  static geStartEndFromStartAndSessionDuration(start: Moment, end: Moment, duration: number): {start: Moment, end: Moment} {
    const eventsTimeRange: TwixIter = start.twix(end).iterate(duration, 'minutes');

    return {
      start: start,
      end: end
    };
  }

  /**
   * Inspect all changes
   */
  ngOnChanges() {
    this.loadCalendar();
  }

  /**
   * Set Default variables
   */
  setCalendar() {
    this.sessionsSlots = new Set();
    this.sessionsEndSlots = new Set();
    this.earlySlots = new Set();
    this.pauseSlots = new Set();
    this.sessions = new Map();
  }

  /**
   * Set View Mode with week, day, 3 days
   * Init start, end,
   *
   */
  setViewMode() {
    if (this.viewMode === 'day') {
      this.end = this.start;
      this.calendarStart = moment(this.start).startOf('day');
      this.calendarEnd = moment(this.end).endOf('day');
      return;
    } else if (this.viewMode === 'three_days') {
      this.end = moment(this.start).add(2, 'days');
      this.calendarStart = moment(this.start).startOf('day');
      this.calendarEnd = moment(this.end).endOf('day');
      return;
    }
    // Init first day week number
    const firstDay = 0;
    // If empty start date then start to today
    if (!this.start) {
      this.start = moment();
    }
    this.start = moment(this.start).day(firstDay);
    this.end = moment(this.start).add(6, 'days');

    this.calendarStart = moment(this.start).startOf('day');
    this.calendarEnd = moment(this.end).endOf('day');
  }

  /**
   * On start/viewMode changed, do a recalculate of init start, end
   * days, daysAvailability and viewMode
   */
  loadCalendar() {
    this.setCalendar();
    this.setViewMode();
    this.loadEvents(this.start, this.end);
    this.setDateRange(this.start, this.end);
    this.loadAvailabilities();
  }

  /**
   * Add available days from start to end dates
   */
  setDateRange(start: Moment, end: Moment) {
    this.daysAvailability = new Map();
    // Days range from start to end
    const daysRange: TwixIter = start
      .twix(end)
      .iterate(1, 'days');
    this.days = [];
    // Loading all days
    while (daysRange.hasNext()) {
      const availableDay: Twix = daysRange.next();
      this.days.push({
        title: availableDay.format('DD/MM/YYYY'),
        key: availableDay.format('YYYY-MM-DD'),
        value: moment(availableDay.toDate())
      });
      this.daysAvailability.set(availableDay.format('YYYY-MM-DD'), []);
    }
  }

  /**
   * On switch date range
   */
  onSwithedView(viewMode: String) {
    this.viewMode = viewMode;
    this.viewModeChanged.emit(viewMode);
    this.loadCalendar();
  }

  /**
   * On start change event
   */
  onStartChanged(start: Moment) {
    this.start = start;
    this.loadCalendar();
  }

  /**
   * On session added on click event
   */
  onSessionAdded(session: Session) {
    this.sessions.set(moment(session.start).format('YYYY-MM-DDHH:mm'), session);
    this.addSession(session);
    this.sessionCreated.emit(session);
  }

  /**
   * On removed event
   */
  onSessionRemoved(source: {key: string, session: Session}) {
    this.sessions.delete(source.key);
    this.removeSession(source.session);
    this.sessionRemoved.emit(source.session);
  }

  /**
   * Load all time for each days
   */
  loadAvailabilities() {
    // no online session no calendar
    if (!this.daysAvailability || !this.onlineSession) {
      return;
    }
    // session duration
    this.realDuration = this.onlineSession.session_type.duration;
    // session day start 00:00 - end 23:59
    const onlineSessionStart: Moment = moment(this.onlineSession.date_range.start, 'YYYY-MM-DD').startOf('day');
    const onlineSessionEnd: Moment = moment(this.onlineSession.date_range.end, 'YYYY-MM-DD').endOf('day');
    this.daysAvailabilitySlotNumber = new Map();
    this.daysAvailability.forEach((avbs, day) => {
      let slotsNumber = 0;
      // each day of days availability with start time 08:00
      const mmtDay = moment(day, 'YYYY-MM-DD').hour(8);
      const mmtDayStartTime = moment(day + this.onlineSession.time_range.start, 'YYYY-MMDDHH:mm');

      // If session start time like 08:00 is before start today 00:00
      if (mmtDayStartTime.isBefore(moment().startOf('day'))) {
        return;
      }
      // booking delay
      const minMmtStartTime = moment().add(this.onlineSession.session_type.booking_delay, 'hours');
      // session time end
      const mmtDayEndTime = moment(day + this.onlineSession.time_range.end, 'YYYY-MM-DDHH:mm');
      mmtDayEndTime.subtract(this.realDuration, 'minutes');
      // slots iterator
      const timeRange: TwixIter = mmtDayStartTime.twix(mmtDayEndTime)
        .iterate(this.onlineSession.session_type.duration, 'minutes');
      if (this.calendarStart && this.calendarEnd && mmtDay.isBetween(onlineSessionStart, onlineSessionEnd)) {
        while (timeRange.hasNext()) {
          const time: Twix = timeRange.next();
          const timeMmt: Moment = moment(time.toDate());
          if (!timeMmt.isBefore(minMmtStartTime)) {
            avbs.push(time.format('HH:mm'));
            slotsNumber++;
          }
        }
      }
      this.daysAvailabilitySlotNumber.set(day, slotsNumber);
    });
  }

  /**
   * Add session event in calendar
   */
  addSession(session: Session) {
    const mmtStart = moment(session.start);
    const mmtEnd = moment(session.end);
    const timeInnerRange: TwixIter = mmtStart.twix(mmtEnd).iterateInner(session.details.duration, 'minutes');
    while (timeInnerRange.hasNext()) {
      const time: Twix = timeInnerRange.next();
      this.sessionsSlots.add(time.format('YYYY-MM-DDHH:mm'));
      if (!timeInnerRange.hasNext()) {
        this.sessionsEndSlots.add(time.format('YYYY-MM-DDHH:mm'));
      }
    }
    /* building earliest slot before event */
    const mmtEarlyStart = mmtStart.clone().subtract(this.realDuration, 'minutes');
    mmtEarlyStart.minutes(
      mmtEarlyStart.minutes() -
      (mmtEarlyStart.minutes() % session.details.duration) + session.details.duration);
    const timeEarlierRange: TwixIter = mmtEarlyStart.twix(mmtStart).iterate(session.details.duration, 'minutes');
    while (timeEarlierRange.hasNext()) {
      const time: Twix = timeEarlierRange.next();
      const mmtTime: Moment = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.details.duration);
      if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
        this.earlySlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
      }
    }
    /* building pause slots after event */
    const mmtEarlyEnd = mmtEnd.clone();
    mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.details.duration);
    const mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
    const timePauseRange: TwixIter = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.details.duration, 'minutes');
    while (timePauseRange.hasNext()) {
      const time: Twix = timePauseRange.next();
      const mmtTime: Moment = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.details.duration);
      if (mmtTime.isSameOrAfter(mmtEarlyEnd) && mmtTime.isBefore(mmtPauseEnd)) {
        this.pauseSlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
      }
    }
  }

  /**
   * Remove session event in Calendar
   */
  removeSession(session: Session) {
    const mmtStart = moment(session.start);
    const mmtEnd = moment(session.end);
    const timeInnerRange: TwixIter = mmtStart.twix(mmtEnd).iterate(session.details.duration, 'minutes');
    while (timeInnerRange.hasNext()) {
      const time: Twix = timeInnerRange.next();
      this.sessionsSlots.delete(time.format('YYYY-MM-DDHH:mm'));
      if (!timeInnerRange.hasNext()) {
        this.sessionsEndSlots.delete(time.format('YYYY-MM-DDHH:mm'));
      }
    }
    /* removing early slots */
    const mmtEarlyStart = mmtStart.clone().subtract(this.realDuration, 'minutes');
    mmtEarlyStart.minutes(
      mmtEarlyStart.minutes() -
      (mmtEarlyStart.minutes() % session.details.duration) + session.details.duration);
    const timeEarlyRange: TwixIter = mmtEarlyStart.twix(mmtStart).iterate(session.details.duration, 'minutes');
    while (timeEarlyRange.hasNext()) {
      const time: Twix = timeEarlyRange.next();
      const mmtTime: Moment = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.details.duration);
      if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
        this.earlySlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
      }
    }
    /* removing pause slots */
    if (session.pause) {
      const mmtEarlyEnd = mmtEnd.clone();
      mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % session.details.duration);
      const mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
      const timePauseRange: TwixIter = mmtEarlyEnd.twix(mmtPauseEnd).iterate(session.details.duration, 'minutes');
      while (timePauseRange.hasNext()) {
        const time: Twix = timePauseRange.next();
        const mmtTime: Moment = CalendarComponent.getMinutesDifference(moment(time.toDate()), session.details.duration);
        if (mmtTime.isSameOrAfter(mmtEarlyEnd) && mmtTime.isBefore(mmtPauseEnd)) {
          this.pauseSlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
        }
      }
    }
  }

  /************************************************
   ******************* Date functions **************
   ************************************************
   */
  loadEvents(start: Moment, end: Moment) {
    this.busySlots = new Set();
    this.daysBusySlotNumber = new Map();

    if (Array.isArray(this._sessionsEntries) && this._sessionsEntries.length) {
      this._sessionsEntries = [
        ...this._sessionsEntries.filter((session: Session) => {
          if (moment(session.start).isSameOrAfter(start) &&
            moment(session.end).isSameOrBefore(end)) {
            let mmtEventStart = moment(session.start, 'YYYY-MM-DDHH:mm');
            mmtEventStart = this.buildinBusySlot(mmtEventStart, session);
            this.buildingEarliestSlot(mmtEventStart);

            return true;
          }

          return false;
        })
      ];
    }
    this.cd.markForCheck();
  }

  /**
   * Slot locked
   */
  buildinBusySlot(mmtEventStart: Moment, session: Session): Moment {
    const mmtEventEnd = moment(session.end, 'YYYY-MM-DDHH:mm');
    if (!mmtEventStart || !mmtEventStart.isValid()
      || !mmtEventEnd || !mmtEventEnd.isValid()
      || !mmtEventStart.isBefore(mmtEventEnd)) {
      console.error('invalid dates');
      return null;
    }
    /* building busy slots by events */
    const eventsTimeRange: TwixIter = mmtEventStart.twix(mmtEventEnd).iterate(session.details.duration, 'minutes');

    let i = 0;
    while (eventsTimeRange.hasNext()) {
      const {time, mmtTime} = CalendarComponent.splitRangeToNextTime(eventsTimeRange, session.details.duration);
      /* IF the busy slot is availabe and not already in busySlots we count it */
      if (this.daysAvailability && this.daysAvailability.has(time.format('YYYY-MM-DD')) &&
        !this.busySlots.has(time.format('YYYY-MM-DDHH:mm')) &&
        this.daysAvailability.get(time.format('YYYY-MM-DD')).indexOf(time.format('HH:mm')) >= 0) {

        if ((!session.user ||
          (session.user &&
            session.user.uid !== this.user.uid))) {
          let dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
            this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
          dayBusyNumber++;
          this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
          this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
        }
        if (session.user && session.user.uid === this.user.uid) {
          this.sessionsSlots.add(time.format('YYYY-MM-DDHH:mm'));
          this.sessions.set(time.format('YYYY-MM-DDHH:mm'), session);
          if (!eventsTimeRange.hasNext()) {
            this.sessionsEndSlots.add(time.format('YYYY-MM-DDHH:mm'));
          }
        }
      }
    }

    return mmtEventStart;
  }

  /**
   * Slot before availability range
   */
  buildingEarliestSlot(mmtEventStart: Moment) {
    /* building earliest slot before event */
    const mmtEarlyStart = mmtEventStart.clone().subtract(this.realDuration, 'minutes');
    mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
      (mmtEarlyStart.minutes() % this.onlineSession.session_type.duration) + this.onlineSession.session_type.duration);
    const earliestTimeRange: TwixIter = mmtEarlyStart.twix(mmtEventStart).iterate(this.onlineSession.session_type.duration, 'minutes');
    while (earliestTimeRange.hasNext()) {
      const {time, mmtTime} = CalendarComponent.splitRangeToNextTime(earliestTimeRange, this.onlineSession.session_type.duration);
      /* IF the busy slot is in availability and not already in busySloits we count it */
      if (this.daysAvailability && this.daysAvailability.has(time.format('YYYY-MM-DD'))
        && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
        && this.daysAvailability.get(time.format('YYYY-MM-DD')).indexOf(time.format('HH:mm')) >= 0) {
        let dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
          this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
        dayBusyNumber++;
        this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
      }
      this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
    }
  }
}
