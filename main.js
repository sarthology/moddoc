const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');


let win;

function createWindow() {
	win = new BrowserWindow({
		width: 1200,
		height: 740
	});

	// load the dist folder from Angular
	win.loadURL(
		url.format({
			pathname: path.join(__dirname, '/dist/index.html'),
			protocol: 'file:',
			slashes: true
		})
	);

	// The following is optional and will open the DevTools:
	// win.webContents.openDevTools()

	win.on('closed', () => {
		win = null;
	});
}

app.on('ready', createWindow);

ipcMain.on("getFiles", (event, arg) => {
  dialog.showOpenDialog({properties: ['openDirectory']},(filePaths)=>{
    win.webContents.send("getFilesResponse", {file: filePaths[0] , ...addProject(filePaths[0])});
  })
});

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
      console.log("not a wanted folder type")
    }
}
