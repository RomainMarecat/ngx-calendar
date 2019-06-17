import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(public snackBar: MatSnackBar,
              private translateService: TranslateService) {
  }

  message(message: string, parameters: Object = {}) {
    this.toast(message, parameters);
  }

  show(message: string, parameters: Object = {}) {
    this.toast(message, parameters);
  }

  toast(message: string, parameters: Object = {}) {
    if (typeof message === 'string') {
      // Subscribe on message translation
      this.translateService.get(message, parameters)
        .subscribe((translation: string) => {
          this.openAlertMessage(translation, parameters);
        }, (err) => {
          this.openAlertMessage(message, parameters);
        });
      return;
    }
    this.openAlertMessage(message, parameters);
  }

  openAlertMessage(message: string, parameters: Object) {
    // Open Alert Component with a message
    const toastRef = this.snackBar.open(message, 'message', {
      data: message,
      // Add extra class to define custom css or background color
      panelClass: ['snackbar'],
      // Timeout duration in ms
      duration: 8000
    });
  }
}
