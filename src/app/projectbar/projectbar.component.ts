import { Component, OnInit } from '@angular/core';
import { FileService } from "../file.service";

@Component({
  selector: 'projectbar',
  templateUrl: './projectbar.component.html',
  styleUrls: ['./projectbar.component.css']
})
export class ProjectbarComponent implements OnInit {

  public projects:Array<object> = this.fileService.projects;

  constructor(private fileService: FileService) {

  }

  ngOnInit() {
  }

  addProject(){
    this.fileService.getFiles()
  }

  addFolder(event){
    console.log(event);

  }
}
