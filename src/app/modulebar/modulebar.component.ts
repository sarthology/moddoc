import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'modulebar',
  templateUrl: './modulebar.component.html',
  styleUrls: ['./modulebar.component.css']
})

export class ModulebarComponent implements OnInit {

  public moduleHide:boolean = true;
  public devHide:boolean = true;
  public objectKeys = Object.keys;

  @Output() currentModule = new EventEmitter<string>();
  @Input() project: {file:string};

  constructor() { }

  ngOnInit() {
  }

  setCurrentModule(module){
    this.currentModule.emit(this.project.file +"/node_modules/"+module+"/README.md");
  }

}
