import { EventEmitter, OnInit } from '@angular/core';
import { Moment } from 'moment';
export declare class CalendarHeaderComponent implements OnInit {
    private _viewMode;
    start: Moment;
    end: Moment;
    switchedView: EventEmitter<String>;
    startChanged: EventEmitter<Moment>;
    ngOnInit(): void;
    /**
    * getter of private _viewMode
    */
    viewMode: String;
    /**
     * Switch current view to another
     */
    switchView(viewMode: String): void;
    /**
     * Emitter of view
     */
    onSwitchedView(viewMode: String): void;
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
