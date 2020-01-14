import { EventEmitter } from '@angular/core';
import { Moment } from 'moment';
import { CalendarConfiguration } from '../../shared/configuration/calendar-configuration';
export declare class CalendarHeaderComponent {
    /**
     * Start date
     */
    start: Moment;
    /**
     * End date
     */
    end: Moment;
    /**
     * Switch view event
     */
    switchedView: EventEmitter<string>;
    /**
     * Start day changed event
     */
    startChanged: EventEmitter<Moment>;
    /**
     * Configuration header
     */
    headerConfiguration: CalendarConfiguration;
    /**
     * Display mode
     */
    private _viewMode;
    /**
     * getter of private _viewMode
     */
    /**
    * Setter of switch view
    */
    viewMode: string;
    /**
     * Switch current view to another
     */
    switchView(viewMode: string): void;
    /**
     * Emitter of view
     */
    onSwitchedView(viewMode: string): void;
    /**
     * Emitter of start date moment
     */
    onStartChanged(start: Moment): void;
    /**
     * return to now on start date
     */
    goToToday(): void;
    /**
     * Check if start is equal to today
     */
    isToday(): boolean;
    /**
     * Go to previous day
     */
    previousDay(): void;
    /**
     * Go to new day
     */
    nextDay(): void;
}
