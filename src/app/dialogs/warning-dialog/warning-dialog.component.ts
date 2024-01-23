import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CaptionService } from 'src/app/services/captionService';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent implements OnInit {

  imageName: string;

  constructor(
    public dialogRef: MatDialogRef<WarningDialogComponent>,
    public captions: CaptionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    public notifications: NotificationService
  ) {
    this.imageName = this.data.imageData.originalImageName
  }

  ngOnInit(): void {

  }

  deleteImage() {

    let deleteTarget: string = this.data.delete_target;

    this.http.post<any>(environment.mainUrl + "api/update/" + deleteTarget, this.data).subscribe(
      (responseData: any) => {

        if (responseData) {
          this.notifications.openSnackBarSuccess(this.captions.captionServiceList['PhotoDeleted']);
          this.dialogRef.close();

        }

      }, error => {
        this.notifications.openSnackBarFailure(this.captions.captionServiceList['SomethingWentWrong']);

      }
    );

  }

}
