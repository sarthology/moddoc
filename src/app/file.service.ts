import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public projects: Array<{ file: string; data: Object }> = [];
  public currentModule: string;
  public _listners = new Subject<any>();

  constructor(
    private _electronService: ElectronService,
    private http: HttpClient
  ) {
    this._electronService.ipcRenderer.on('addAnalytics', (event, data) => {
      this.http
        .post(environment.API + '/addUser', {
          macAddress: data.macAddress,
          platform: data.os,
          version: data.version
        })
        .subscribe(
          res => {
            // Success
          },
          err => {
            // Show error dialog
          }
        );
    });
  }

  async getFiles() {
    return new Promise<string[]>((resolve, reject) => {
      this._electronService.ipcRenderer.once(
        'getFilesResponse',
        (event, arg) => {
          if (arg && this.distinct(this.projects, arg)) {
            this.projects.push(arg);
            resolve(arg);
          } else {
            reject();
          }
        }
      );
      this._electronService.ipcRenderer.send('getFiles');
    });
  }

  copyCode(data) {
    return this._electronService.ipcRenderer.send('copyCode', data);
  }

  noFileError(error) {
    return this._electronService.ipcRenderer.send('onFileError', error);
  }
  distinct(projects: any, arg) {
    if (projects.filter(project => project.file === arg.file).length === 1) {
      this._electronService.ipcRenderer.send('onAlreadyExist', 'project');
      return false;
    } else if (projects.length === 0) {
      return true;
    } else {
      return true;
    }
  }

  async openMenu(project) {
    return new Promise<Array<object>>((res, rej) => {
      this._electronService.ipcRenderer.on('removeProject', event => {
        this.projects = this.projects.filter(
          element => element.file != project.file
        );
        res(this.projects);
      });
      this._electronService.ipcRenderer.send('openMenu');
    });
  }
}
