import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MdViewerComponent } from './md-viewer/md-viewer.component';
import { ProjectbarComponent } from './projectbar/projectbar.component';
import { ModulebarComponent } from './modulebar/modulebar.component';

@NgModule({
  declarations: [
    AppComponent,
    MdViewerComponent,
    ProjectbarComponent,
    ModulebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
