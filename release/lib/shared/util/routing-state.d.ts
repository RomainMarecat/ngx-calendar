import { Router } from '@angular/router';
export declare class RoutingState {
    private router;
    private history;
    constructor(router: Router);
    loadRouting(): void;
    getHistory(): string[];
    getPreviousUrl(): string;
}
