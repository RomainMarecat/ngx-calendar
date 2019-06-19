import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Moment } from 'moment';
import * as moment_ from 'moment';
import { CalendarConfiguration } from '../../shared/configuration/calendar-configuration';

const moment = moment_;

@Component({
  selector: 'lib-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {
  /**
   * Start date
   */
  @Input() start: Moment;
  /**
   * End date
   */
  @Input() end: Moment;
  /**
   * Switch view event
   */
  @Output() switchedView: EventEmitter<String> = new EventEmitter<String>();
  /**
   * Start day changed event
   */
  @Output() startChanged: EventEmitter<Moment> = new EventEmitter<Moment>();
  /**
   * Configuration header
   */
  @Input() headerConfiguration: CalendarConfiguration;

  /**
   * Display mode
   */
  private _viewMode: String;

  /**
   * getter of private _viewMode
   */
  get viewMode(): String {
    return this._viewMode;
  }

  /**
   * Setter of switch view
   */
  @Input() set viewMode(viewMode) {
    this.switchView(viewMode);
  }

  /**
   * Switch current view to another
   */
  switchView(viewMode: String) {
    this._viewMode = viewMode;
    this.onSwitchedView(viewMode);
  }

  /**
   * Emitter of view
   */
  onSwitchedView(viewMode: String) {
    this.switchedView.emit(viewMode);
  }

  /**
   * Emitter of start date moment
   */
  onStartChanged(start: Moment) {
    this.startChanged.emit(start);
  }

  /**
   * return to now on start date
   */
  goToToday() {
    this.start = moment();
    this.onStartChanged(this.start);
  }

  /**
   * Check if start is equal to today
   */
  isToday() {
    return moment() === moment(this.start);
  }

  /**
   * Go to previous day
   */
  previousDay() {
    let daysNb = 1;
    if (this.viewMode === 'week') {
      daysNb = 7;
    }
    this.start = moment(this.start).subtract(daysNb, 'day');
    this.onStartChanged(this.start);
  }

  /**
   * Go to new day
   */
  nextDay() {
    let daysNb = 1;
    if (this.viewMode === 'week') {
      daysNb = 7;
    }
    this.start = moment(this.start).add(daysNb, 'day');
    this.onStartChanged(this.start);
  }
}
