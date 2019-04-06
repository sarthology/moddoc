import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modulebar',
  templateUrl: './modulebar.component.html',
  styleUrls: ['./modulebar.component.css']
})
export class ModulebarComponent implements OnInit {

  public moduleHide:boolean = true;
  public devHide:boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
