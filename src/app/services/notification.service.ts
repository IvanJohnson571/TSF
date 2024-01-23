import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  public openSnackBarSuccess(message) {
    let action = 'X';
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'right';
    config.panelClass = ['snackbar-success'];
    this._snackBar.open(message, action, config);
  }

  public openSnackBarFailure(message) {
    let action = 'X';
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'right';
    config.panelClass = ['snackbar-failure'];
    this._snackBar.open(message, action, config);
  }

}
