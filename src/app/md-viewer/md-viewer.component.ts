import { Component, OnInit, Input } from "@angular/core";
import { MarkdownService } from "ngx-markdown";

@Component({
  selector: "md-viewer",
  templateUrl: "./md-viewer.component.html",
  styleUrls: ["./md-viewer.component.css"]
})
export class MdViewerComponent implements OnInit {
  @Input() src: string;
  public externalLink: string;

  constructor(private markdownService: MarkdownService) { }

  ngOnInit() {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      if (text.indexOf(":") === text.length - 1) text = text.replace(":", "");
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
      return (
        "<h" + level + " id=" + escapedText + ">" + text + "</h" + level + ">"
      );
    };
  }

  onLoad(e) {
    document.querySelectorAll("a").forEach(e => {
      let href = e.getAttribute("href");
      e.onclick = event => {
        event.preventDefault();
        if (href.indexOf("#") === 0) {
          var top = document.getElementById(
            href.split("#")[1]
          ).offsetTop;
          window.scrollTo(0, top);
        }
        // else if(href.indexOf("md") === href.length - 2){
        //   this.src = href
        // }
        else {
          document
            .querySelector(".markdown-body")
            .setAttribute("style", "display:none");
          document
            .querySelector(".browser-body")
            .setAttribute("style", "display:block");
          document
            .querySelector("webview")
            .setAttribute("src", href);
        }
      };
    });
  }

  reset() {
    document
      .querySelector(".markdown-body")
      .setAttribute("style", "display:block");
    document
      .querySelector(".browser-body")
      .setAttribute("style", "display:none");
  }
}
