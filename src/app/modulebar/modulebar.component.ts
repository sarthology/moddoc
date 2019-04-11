import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileService } from "../file.service";

@Component({
  selector: 'modulebar',
  templateUrl: './modulebar.component.html',
  styleUrls: ['./modulebar.component.css']
})
export class ModulebarComponent implements OnInit {

  public moduleHide:boolean = true;
  public devHide:boolean = true;
  public projects:Array<object> = this.fileService.projects;
  public objectKeys = Object.keys;

  @Output() currentModule = new EventEmitter<string>();

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

  setCurrentModule(module){
    this.currentModule.emit(this.fileService.projects[0].file+"/node_modules/"+module+"/README.md")
  }

}
