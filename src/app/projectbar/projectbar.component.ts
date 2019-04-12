import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileService } from "../file.service";

@Component({
  selector: 'projectbar',
  templateUrl: './projectbar.component.html',
  styleUrls: ['./projectbar.component.css']
})
export class ProjectbarComponent implements OnInit {

  public projects:Array<object> = this.fileService.projects;

  @Output() currentProject = new EventEmitter<string>();

  constructor(private fileService: FileService) {

  }

  ngOnInit() {
  }

  addProject(){
    this.fileService.getFiles()
  }

  setCurrentProject(project){
    this.currentProject.emit(project);
  }
}
