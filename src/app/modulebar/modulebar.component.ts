import { Component, OnInit } from '@angular/core';
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

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

}
