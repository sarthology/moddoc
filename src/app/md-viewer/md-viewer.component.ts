import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'md-viewer',
  templateUrl: './md-viewer.component.html',
  styleUrls: ['./md-viewer.component.css']
})
export class MdViewerComponent implements OnInit {

  @Input() src: string;

  constructor() { }

  ngOnInit() {
  }

}
