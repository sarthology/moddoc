#!/usr/bin/env node

const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  clipboard,
  Menu,
  MenuItem
} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const os = require('os');
const { autoUpdater } = require('electron-updater');
const macAddress = require('macaddress');
const pJSON = require('./package.json');

let win, initialData;
const menu = new Menu();
menu.append(
  new MenuItem({
    label: 'Remove',
    click() {
      BrowserWindow.getFocusedWindow().webContents.send('removeProject');
    }
  })
);

const isPackaged = !process.defaultApp;

const input = isPackaged ? process.argv[1] : process.argv.splice(2)[0];

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

function addAnalytics() {
  macAddress.one(function(err, mac) {
    BrowserWindow.getFocusedWindow().webContents.send('addAnalytics', {
      macAddress: mac,
      os: os.platform(),
      version: pJSON.version
    });
  });
}

app.on('ready', () => {
  createWindow();
  autoUpdater.checkForUpdates();
  if (input) {
    initialData = addProject(input);
  }
});

ipcMain.on('getFiles', (event, arg) => {
  if (initialData && input) {
    initialData
      ? (initialData = { file: input, ...initialData })
      : (initialData = null);
    win.webContents.send('getFilesResponse', initialData);
    initialData = null;
  } else {
    dialog.showOpenDialog({ properties: ['openDirectory'] }, filePaths => {
      if (filePaths) {
        let data = addProject(filePaths[0]);
        data ? (data = { file: filePaths[0], ...data }) : (data = null);
        win.webContents.send('getFilesResponse', data);
      } else win.webContents.send('getFilesResponse', null);
    });
  }
});

ipcMain.on('copyCode', (event, code) => {
  clipboard.writeText(code);
});

ipcMain.on('onFileError', event => {
  dialog.showErrorBox('No Readme', "This package don't have a readme file.");
});

ipcMain.on('onAlreadyExist', event => {
  dialog.showErrorBox(
    'Duplicate Project',
    'This package already being added. Add another.'
  );
});

ipcMain.on('openMenu', event => {
  menu.popup();
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

let addProject = filePath => {
  if (fs.existsSync(filePath + '/package.json')) {
    data = fs.readFileSync(filePath + '/package.json', 'utf8');
    addAnalytics();
    return JSON.parse(data);
  } else {
    dialog.showMessageBox({
      type: 'info',
      message: 'Your Project is not node based.',
      buttons: ['ok']
    });
    return null;
  }
};

autoUpdater.on('update-available', () => {
  dialog.showMessageBox(
    {
      type: 'info',
      title: 'Found Updates',
      message: 'Found updates, do you want update now?',
      buttons: ['Sure', 'No']
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate();

        dialog.showMessageBox({
          type: 'info',
          title: 'Downloading',
          message: 'Updates are downloading, will notify once done.'
        });
      }
    }
  );
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox(
    {
      title: 'Install Updates',
      message: 'Updates downloaded, application will be quit for update...'
    },
    () => {
      setImmediate(() => autoUpdater.quitAndInstall());
    }
  );
});
