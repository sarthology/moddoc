import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'moddoc';
  public src:string;
  public project:object;

  constructor(){

  }

  receiveModule($event) {
    this.src = $event
  }

  receiveProject($event) {
    console.log($event);

    this.project = $event
  }
}
