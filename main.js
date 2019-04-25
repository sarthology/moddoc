#!/usr/bin/env node

const { app, BrowserWindow, ipcMain, dialog, clipboard } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const meow = require('meow');

const cli = meow(
  `
  Usage
    $ moddoc .
    $ moddoc path/to/project
  Examples
	  $ moddoc ~/Downloads/moddoc
`,
  {
    flags: {
      help: {
        alias: 'h',
      },
      version: {
        alias: 'v',
      },
    },
  }
);

const { input } = cli;

let win,initialData;

function createWindow() {
	win = new BrowserWindow();

  win.maximize();

	// load the dist folder from Angular
	win.loadURL(
		url.format({
			pathname: path.join(__dirname, '/dist/index.html'),
			protocol: 'file:',
			slashes: true
		})
	);

	// The following is optional and will open the DevTools:

	win.on('closed', () => {
		win = null;
	});
}

app.on('ready', () => {
  createWindow();
  if (input[0]) {
    let data = addProject(input[0])
    store.set(initialData,data)
  }
});

ipcMain.on("getFiles", (event, arg) => {
  if(initialData && input[0]){
    win.webContents.send("getFilesResponse", initialData);
    initialData = null;
  }
  else{
    dialog.showOpenDialog({properties: ['openDirectory']},(filePaths)=>{
      if(filePaths){
        let data = addProject(filePaths[0]);
        data ?  data = {file: filePaths[0] , ...data} : data = null
        win.webContents.send("getFilesResponse", data);
      }
      else win.webContents.send("getFilesResponse", null)
    })

  }
});
ipcMain.on("copyCode",(event,code)=>{
  clipboard.writeText(code);
})

// on macOS, closing the window doesn't quit the app
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// initialize the app's main window
app.on('activate', () => {
	if (win === null) {
		createWindow();
	}
});

let addProject = (filePath)=>{
    if(fs.existsSync(filePath+"/package.json")){
      data = fs.readFileSync(filePath+"/package.json", 'utf8')
      return JSON.parse(data);
    }
    else{
      dialog.showMessageBox({type:"info",message:"Your Project is not node based.",buttons:["ok"]})
      return null
    }
}
