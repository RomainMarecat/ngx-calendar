import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
export declare class AlertService {
    snackBar: MatSnackBar;
    private translateService;
    constructor(snackBar: MatSnackBar, translateService: TranslateService);
    message(message: string, parameters?: Object): void;
    show(message: string, parameters?: Object): void;
    toast(message: string, parameters?: Object): void;
    openAlertMessage(message: string, parameters: Object): void;
}
