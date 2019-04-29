<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { IpcRenderer, dialog, ipcMain } from 'electron';
import { Subject } from 'rxjs/internal/Subject';
=======
import { Injectable } from '@angular/core'
import { ElectronService } from 'ngx-electron';

>>>>>>> 6138fc1df40888402eff375812f4eb58657abf7a

@Injectable({
  providedIn: 'root'
})
export class FileService {
<<<<<<< HEAD
  private ipc: IpcRenderer;
  public projects: Array<{ file: string; data: Object }> = [];
  public currentModule: string;
  public _listners = new Subject<any>();

  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Could not load electron ipc');
    }
=======
  public projects: Array<{file:string,data:Object}> = []
  public currentModule:string;

  constructor(private _electronService: ElectronService) {

>>>>>>> 6138fc1df40888402eff375812f4eb58657abf7a
  }

  async getFiles() {
    return new Promise<string[]>((resolve, reject) => {
<<<<<<< HEAD
      this.ipc.once('getFilesResponse', (event, arg) => {
        if (arg && this.distinct(this.projects, arg)) {
          this.projects.push(arg);
          resolve(arg);
        } else {
          reject();
        }
      });
      this.ipc.send('getFiles');
    });
  }

  copyCode(data) {
    return this.ipc.send('copyCode', data);
  }

  noFileError(error) {
    return this.ipc.send('onFileError', error);
  }

  distinct(projects: any, arg) {
    if (
      projects.filter(project => project.file !== arg.file).length > 0 ||
      projects.length === 0
    ) {
      return true;
    } else {
      this.ipc.send('onAlreadyExist', 'project');
      return false;
=======
      this._electronService.ipcRenderer.once("getFilesResponse", (event, arg) => {
        if(arg && this.distinct(this.projects,arg)){
            this.projects.push(arg)
            resolve(arg)
        }
        else{
          reject()
        }
      });
      this._electronService.ipcRenderer.send("getFiles");
    });
  }

  copyCode(data){
    return this._electronService.ipcRenderer.send('copyCode',data)
  }

  noFileError(error){
    return this._electronService.ipcRenderer.send('onFileError',error)
  }
  distinct(projects:any,arg){
    console.log(projects.filter(project=>project.file!==arg.file).length)
    if(projects.filter(project=>project.file===arg.file).length === 1 ){
      this._electronService.ipcRenderer.send('onAlreadyExist','project')
      return false
    }
    else if( projects.length === 0){
      return true
    }
    else{
      return true
>>>>>>> 6138fc1df40888402eff375812f4eb58657abf7a
    }
  }

  async openMenu(project) {
    return new Promise<Array<object>>((res, rej) => {
      this.ipc.on('removeProject', event => {
        this.projects = this.projects.filter(
          element => element.file != project.file
        );
        res(this.projects);
      });
      this.ipc.send('openMenu');
    });
  }
}
