/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
import * as i2 from "@ngx-translate/core";
export class AlertService {
    /**
     * @param {?} snackBar
     * @param {?} translateService
     */
    constructor(snackBar, translateService) {
        this.snackBar = snackBar;
        this.translateService = translateService;
    }
    /**
     * @param {?} message
     * @param {?=} parameters
     * @return {?}
     */
    message(message, parameters = {}) {
        this.toast(message, parameters);
    }
    /**
     * @param {?} message
     * @param {?=} parameters
     * @return {?}
     */
    show(message, parameters = {}) {
        this.toast(message, parameters);
    }
    /**
     * @param {?} message
     * @param {?=} parameters
     * @return {?}
     */
    toast(message, parameters = {}) {
        if (typeof message === 'string') {
            // Subscribe on message translation
            this.translateService.get(message, parameters)
                .subscribe((/**
             * @param {?} translation
             * @return {?}
             */
            (translation) => {
                this.openAlertMessage(translation, parameters);
            }), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                this.openAlertMessage(message, parameters);
            }));
            return;
        }
        this.openAlertMessage(message, parameters);
    }
    /**
     * @param {?} message
     * @param {?} parameters
     * @return {?}
     */
    openAlertMessage(message, parameters) {
        // Open Alert Component with a message
        /** @type {?} */
        const toastRef = this.snackBar.open(message, 'message', {
            data: message,
            // Add extra class to define custom css or background color
            panelClass: ['snackbar'],
            // Timeout duration in ms
            duration: 8000
        });
    }
}
AlertService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AlertService.ctorParameters = () => [
    { type: MatSnackBar },
    { type: TranslateService }
];
/** @nocollapse */ AlertService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AlertService_Factory() { return new AlertService(i0.ɵɵinject(i1.MatSnackBar), i0.ɵɵinject(i2.TranslateService)); }, token: AlertService, providedIn: "root" });
if (false) {
    /** @type {?} */
    AlertService.prototype.snackBar;
    /**
     * @type {?}
     * @private
     */
    AlertService.prototype.translateService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvdXRpbC9hbGVydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQUt2RCxNQUFNLE9BQU8sWUFBWTs7Ozs7SUFDdkIsWUFBbUIsUUFBcUIsRUFDcEIsZ0JBQWtDO1FBRG5DLGFBQVEsR0FBUixRQUFRLENBQWE7UUFDcEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUN0RCxDQUFDOzs7Ozs7SUFFRCxPQUFPLENBQUMsT0FBZSxFQUFFLGFBQXFCLEVBQUU7UUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7O0lBRUQsSUFBSSxDQUFDLE9BQWUsRUFBRSxhQUFxQixFQUFFO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7OztJQUVELEtBQUssQ0FBQyxPQUFlLEVBQUUsYUFBcUIsRUFBRTtRQUM1QyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUMvQixtQ0FBbUM7WUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDO2lCQUMzQyxTQUFTOzs7O1lBQUMsQ0FBQyxXQUFtQixFQUFFLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDakQsQ0FBQzs7OztZQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM3QyxDQUFDLEVBQUMsQ0FBQztZQUNMLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsT0FBZSxFQUFFLFVBQWtCOzs7Y0FFNUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7WUFDdEQsSUFBSSxFQUFFLE9BQU87O1lBRWIsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDOztZQUV4QixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUM7SUFDSixDQUFDOzs7WUF2Q0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBTFEsV0FBVztZQUNYLGdCQUFnQjs7Ozs7SUFNWCxnQ0FBNEI7Ozs7O0lBQzVCLHdDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBbGVydFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc25hY2tCYXI6IE1hdFNuYWNrQmFyLFxuICAgICAgICAgICAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgfVxuXG4gIG1lc3NhZ2UobWVzc2FnZTogc3RyaW5nLCBwYXJhbWV0ZXJzOiBPYmplY3QgPSB7fSkge1xuICAgIHRoaXMudG9hc3QobWVzc2FnZSwgcGFyYW1ldGVycyk7XG4gIH1cblxuICBzaG93KG1lc3NhZ2U6IHN0cmluZywgcGFyYW1ldGVyczogT2JqZWN0ID0ge30pIHtcbiAgICB0aGlzLnRvYXN0KG1lc3NhZ2UsIHBhcmFtZXRlcnMpO1xuICB9XG5cbiAgdG9hc3QobWVzc2FnZTogc3RyaW5nLCBwYXJhbWV0ZXJzOiBPYmplY3QgPSB7fSkge1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIFN1YnNjcmliZSBvbiBtZXNzYWdlIHRyYW5zbGF0aW9uXG4gICAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KG1lc3NhZ2UsIHBhcmFtZXRlcnMpXG4gICAgICAgIC5zdWJzY3JpYmUoKHRyYW5zbGF0aW9uOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5BbGVydE1lc3NhZ2UodHJhbnNsYXRpb24sIHBhcmFtZXRlcnMpO1xuICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgdGhpcy5vcGVuQWxlcnRNZXNzYWdlKG1lc3NhZ2UsIHBhcmFtZXRlcnMpO1xuICAgICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5vcGVuQWxlcnRNZXNzYWdlKG1lc3NhZ2UsIHBhcmFtZXRlcnMpO1xuICB9XG5cbiAgb3BlbkFsZXJ0TWVzc2FnZShtZXNzYWdlOiBzdHJpbmcsIHBhcmFtZXRlcnM6IE9iamVjdCkge1xuICAgIC8vIE9wZW4gQWxlcnQgQ29tcG9uZW50IHdpdGggYSBtZXNzYWdlXG4gICAgY29uc3QgdG9hc3RSZWYgPSB0aGlzLnNuYWNrQmFyLm9wZW4obWVzc2FnZSwgJ21lc3NhZ2UnLCB7XG4gICAgICBkYXRhOiBtZXNzYWdlLFxuICAgICAgLy8gQWRkIGV4dHJhIGNsYXNzIHRvIGRlZmluZSBjdXN0b20gY3NzIG9yIGJhY2tncm91bmQgY29sb3JcbiAgICAgIHBhbmVsQ2xhc3M6IFsnc25hY2tiYXInXSxcbiAgICAgIC8vIFRpbWVvdXQgZHVyYXRpb24gaW4gbXNcbiAgICAgIGR1cmF0aW9uOiA4MDAwXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==