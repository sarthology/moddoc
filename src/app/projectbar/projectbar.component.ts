import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileService } from "../file.service";

@Component({
  selector: 'projectbar',
  templateUrl: './projectbar.component.html',
  styleUrls: ['./projectbar.component.css']
})
export class ProjectbarComponent implements OnInit {

  public projects:Array<object> = this.fileService.projects;

  @Output() currentProject = new EventEmitter<object>();

  constructor(private fileService: FileService) {

  }

  ngOnInit() {
    this.fileService.getFiles().then((project:Object)=>{
      this.currentProject.emit(project);
    });
  }

  addProject(){
    this.fileService.getFiles().then((project:Object)=>{
      this.currentProject.emit(project);
    });
  }

  setCurrentProject(project,event){
    this.currentProject.emit(project);
  }
}
