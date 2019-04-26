import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileService } from "../file.service";

@Component({
  selector: 'projectbar',
  templateUrl: './projectbar.component.html',
  styleUrls: ['./projectbar.component.css']
})
export class ProjectbarComponent implements OnInit {

  public projects:Array<object> = this.fileService.projects;
  public clicked:any = null;

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
    })
  }

  setCurrentProject(project,event){
    this.clicked = event
    this.currentProject.emit(project);
  }
  highlightProject(){
    if(document.querySelector('.active-project')){
      document.querySelector('.active-project').classList.remove('active-project')
    }
    if( this.clicked === null){
      console.log("bro");
      console.log(this.clicked)
      document.getElementById('project-names').lastElementChild.classList.add('active-project')
    }
    else if(this.clicked) {
      console.log("no");
      this.clicked.target.closest('.project').classList.add('active-project')
      this.clicked = null;
    }

  }
}
