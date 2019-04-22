import { Component, OnInit, Input } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'md-viewer',
  templateUrl: './md-viewer.component.html',
  styleUrls: ['./md-viewer.component.css']
})
export class MdViewerComponent implements OnInit {

  @Input() src: string;

  constructor(private markdownService: MarkdownService) { }

  ngOnInit() {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      if(text.indexOf(":")===text.length-1) text = text.replace(':','');
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return '<h' + level + ' id='+escapedText+'>'
              + text +
             '</h' + level + '>';
    };
  }

  onLoad(e){
    document.querySelectorAll("a").forEach((e)=>{
      e.onclick = (event)=>{
        if(e.getAttribute("href").indexOf("#")===0){
          event.preventDefault();
          var top = document.getElementById(e.getAttribute("href").split('#')[1]).offsetTop;
          window.scrollTo(0, top);
        }
        else{
          event.preventDefault();
        }

      }
    })
  }

}
