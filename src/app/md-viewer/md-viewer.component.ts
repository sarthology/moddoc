import { Component, OnInit, Input } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { FileService } from '../file.service';

@Component({
  selector: 'md-viewer',
  templateUrl: './md-viewer.component.html',
  styleUrls: ['./md-viewer.component.css']
})
export class MdViewerComponent implements OnInit {
  @Input() src: string;
  public externalLink: string;
  public copyText;

  constructor(
    private markdownService: MarkdownService,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      if (text.indexOf(':') === text.length - 1) text = text.replace(':', '');
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return (
        '<h' + level + ' id=' + escapedText + '>' + text + '</h' + level + '>'
      );
    };
    this.copyText = event => {
      this.fileService.copyCode(event.target.parentNode.nextSibling.innerText);
      event.target.innerText = 'copied';
      setTimeout(() => {
        event.target.innerText = 'copy';
      }, 2000);
    };

    this.fileService._listners.subscribe(res => {
      console.log('s');
      this.clear();
    });
  }

  onLoad(e) {
    this.src = null;
    window.scrollTo(0, 0);
    document
      .querySelector('.markdown-body')
      .setAttribute('style', 'display:block');
    document.querySelectorAll('a').forEach(e => {
      let href = e.getAttribute('href');
      e.onclick = event => {
        event.preventDefault();
        if (href.indexOf('#') === 0) {
          var top = document.getElementById(href.split('#')[1]).offsetTop;
          window.scrollTo(0, top);
        } else {
          document
            .querySelector('.markdown-body')
            .setAttribute('style', 'display:none');
          document
            .querySelector('.browser-body')
            .setAttribute('style', 'display:block');
          document.querySelector('webview').setAttribute('src', href);
        }
      };
    });

    document.querySelectorAll('pre').forEach(e => {
      var span = document.createElement('div');
      span.innerHTML = '<span>copy</span>';
      span.id = 'clipper';
      e.insertBefore(span, e.firstChild);
      span.addEventListener('click', this.copyText, false);
    });
  }

  noError(e) {
    this.fileService.noFileError(e);
  }

  reset() {
    document
      .querySelector('.markdown-body')
      .setAttribute('style', 'display:block');
    document
      .querySelector('.browser-body')
      .setAttribute('style', 'display:none');
  }

  clear() {
    document
      .querySelector('.markdown-body')
      .setAttribute('style', 'display:none');
    document
      .querySelector('.browser-body')
      .setAttribute('style', 'display:none');
  }
}
