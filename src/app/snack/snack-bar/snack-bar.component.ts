import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  @Output() bttClickClose: EventEmitter = new EventEmitter();
  @Input() snackBarText: string;
  @Input() showIfValue: boolean;

  constructor() {};

  ngOnInit(): void {
    
  }

  close() {
    //this.bttClickClose.emit(false);
  }

}
