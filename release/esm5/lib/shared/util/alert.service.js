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
var AlertService = /** @class */ (function () {
    function AlertService(snackBar, translateService) {
        this.snackBar = snackBar;
        this.translateService = translateService;
    }
    /**
     * @param {?} message
     * @param {?=} parameters
     * @return {?}
     */
    AlertService.prototype.message = /**
     * @param {?} message
     * @param {?=} parameters
     * @return {?}
     */
    function (message, parameters) {
        if (parameters === void 0) { parameters = {}; }
        this.toast(message, parameters);
    };
    /**
     * @param {?} message
     * @param {?=} parameters
     * @return {?}
     */
    AlertService.prototype.show = /**
     * @param {?} message
     * @param {?=} parameters
     * @return {?}
     */
    function (message, parameters) {
        if (parameters === void 0) { parameters = {}; }
        this.toast(message, parameters);
    };
    /**
     * @param {?} message
     * @param {?=} parameters
     * @return {?}
     */
    AlertService.prototype.toast = /**
     * @param {?} message
     * @param {?=} parameters
     * @return {?}
     */
    function (message, parameters) {
        var _this = this;
        if (parameters === void 0) { parameters = {}; }
        if (typeof message === 'string') {
            // Subscribe on message translation
            this.translateService.get(message, parameters)
                .subscribe((/**
             * @param {?} translation
             * @return {?}
             */
            function (translation) {
                _this.openAlertMessage(translation, parameters);
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                _this.openAlertMessage(message, parameters);
            }));
            return;
        }
        this.openAlertMessage(message, parameters);
    };
    /**
     * @param {?} message
     * @param {?} parameters
     * @return {?}
     */
    AlertService.prototype.openAlertMessage = /**
     * @param {?} message
     * @param {?} parameters
     * @return {?}
     */
    function (message, parameters) {
        // Open Alert Component with a message
        /** @type {?} */
        var toastRef = this.snackBar.open(message, 'message', {
            data: message,
            // Add extra class to define custom css or background color
            panelClass: ['snackbar'],
            // Timeout duration in ms
            duration: 8000
        });
    };
    AlertService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AlertService.ctorParameters = function () { return [
        { type: MatSnackBar },
        { type: TranslateService }
    ]; };
    /** @nocollapse */ AlertService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AlertService_Factory() { return new AlertService(i0.ɵɵinject(i1.MatSnackBar), i0.ɵɵinject(i2.TranslateService)); }, token: AlertService, providedIn: "root" });
    return AlertService;
}());
export { AlertService };
if (false) {
    /** @type {?} */
    AlertService.prototype.snackBar;
    /**
     * @type {?}
     * @private
     */
    AlertService.prototype.translateService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Byb21haW5tYXJlY2F0L25neC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvdXRpbC9hbGVydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQUV2RDtJQUlFLHNCQUFtQixRQUFxQixFQUNwQixnQkFBa0M7UUFEbkMsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQUNwQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQ3RELENBQUM7Ozs7OztJQUVELDhCQUFPOzs7OztJQUFQLFVBQVEsT0FBZSxFQUFFLFVBQXVCO1FBQXZCLDJCQUFBLEVBQUEsZUFBdUI7UUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7O0lBRUQsMkJBQUk7Ozs7O0lBQUosVUFBSyxPQUFlLEVBQUUsVUFBdUI7UUFBdkIsMkJBQUEsRUFBQSxlQUF1QjtRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7Ozs7SUFFRCw0QkFBSzs7Ozs7SUFBTCxVQUFNLE9BQWUsRUFBRSxVQUF1QjtRQUE5QyxpQkFZQztRQVpzQiwyQkFBQSxFQUFBLGVBQXVCO1FBQzVDLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLG1DQUFtQztZQUNuQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7aUJBQzNDLFNBQVM7Ozs7WUFBQyxVQUFDLFdBQW1CO2dCQUM3QixLQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2pELENBQUM7Ozs7WUFBRSxVQUFDLEdBQUc7Z0JBQ0wsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM3QyxDQUFDLEVBQUMsQ0FBQztZQUNMLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7O0lBRUQsdUNBQWdCOzs7OztJQUFoQixVQUFpQixPQUFlLEVBQUUsVUFBa0I7OztZQUU1QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtZQUN0RCxJQUFJLEVBQUUsT0FBTzs7WUFFYixVQUFVLEVBQUUsQ0FBQyxVQUFVLENBQUM7O1lBRXhCLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQztJQUNKLENBQUM7O2dCQXZDRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQUxRLFdBQVc7Z0JBQ1gsZ0JBQWdCOzs7dUJBRnpCO0NBNENDLEFBeENELElBd0NDO1NBckNZLFlBQVk7OztJQUNYLGdDQUE0Qjs7Ozs7SUFDNUIsd0NBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFsZXJ0U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzbmFja0JhcjogTWF0U25hY2tCYXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSkge1xuICB9XG5cbiAgbWVzc2FnZShtZXNzYWdlOiBzdHJpbmcsIHBhcmFtZXRlcnM6IE9iamVjdCA9IHt9KSB7XG4gICAgdGhpcy50b2FzdChtZXNzYWdlLCBwYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHNob3cobWVzc2FnZTogc3RyaW5nLCBwYXJhbWV0ZXJzOiBPYmplY3QgPSB7fSkge1xuICAgIHRoaXMudG9hc3QobWVzc2FnZSwgcGFyYW1ldGVycyk7XG4gIH1cblxuICB0b2FzdChtZXNzYWdlOiBzdHJpbmcsIHBhcmFtZXRlcnM6IE9iamVjdCA9IHt9KSB7XG4gICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gU3Vic2NyaWJlIG9uIG1lc3NhZ2UgdHJhbnNsYXRpb25cbiAgICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQobWVzc2FnZSwgcGFyYW1ldGVycylcbiAgICAgICAgLnN1YnNjcmliZSgodHJhbnNsYXRpb246IHN0cmluZykgPT4ge1xuICAgICAgICAgIHRoaXMub3BlbkFsZXJ0TWVzc2FnZSh0cmFuc2xhdGlvbiwgcGFyYW1ldGVycyk7XG4gICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5BbGVydE1lc3NhZ2UobWVzc2FnZSwgcGFyYW1ldGVycyk7XG4gICAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm9wZW5BbGVydE1lc3NhZ2UobWVzc2FnZSwgcGFyYW1ldGVycyk7XG4gIH1cblxuICBvcGVuQWxlcnRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZywgcGFyYW1ldGVyczogT2JqZWN0KSB7XG4gICAgLy8gT3BlbiBBbGVydCBDb21wb25lbnQgd2l0aCBhIG1lc3NhZ2VcbiAgICBjb25zdCB0b2FzdFJlZiA9IHRoaXMuc25hY2tCYXIub3BlbihtZXNzYWdlLCAnbWVzc2FnZScsIHtcbiAgICAgIGRhdGE6IG1lc3NhZ2UsXG4gICAgICAvLyBBZGQgZXh0cmEgY2xhc3MgdG8gZGVmaW5lIGN1c3RvbSBjc3Mgb3IgYmFja2dyb3VuZCBjb2xvclxuICAgICAgcGFuZWxDbGFzczogWydzbmFja2JhciddLFxuICAgICAgLy8gVGltZW91dCBkdXJhdGlvbiBpbiBtc1xuICAgICAgZHVyYXRpb246IDgwMDBcbiAgICB9KTtcbiAgfVxufVxuIl19