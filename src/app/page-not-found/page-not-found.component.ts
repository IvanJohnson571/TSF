import { Component, OnInit } from '@angular/core';
import { CaptionService } from '../services/captionService';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    public captions: CaptionService,
  ) { }

  ngOnInit(): void {
  }

}
