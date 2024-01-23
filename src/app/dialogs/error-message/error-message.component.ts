import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CaptionService } from 'src/app/services/captionService';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrorMessageComponent>,
    public captions: CaptionService
  ) { }

  ngOnInit(): void {
  }

}
