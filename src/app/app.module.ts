import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
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
