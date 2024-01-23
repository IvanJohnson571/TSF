import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CaptionService } from 'src/app/services/captionService';

@Component({
  selector: 'app-success-email',
  templateUrl: './success-email.component.html',
  styleUrls: ['./success-email.component.scss']
})
export class SuccessEmailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SuccessEmailComponent>,
    public captions: CaptionService
  ) { }

  ngOnInit(): void {
  }

}
