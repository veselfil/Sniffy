/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import fs from 'fs';
import childProcess from 'child_process';

let mainWindow = null;
let captureProcess = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[ name ], forceDownload)))
    .catch(console.log);
};

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);
  mainWindow.setMenu(null);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();

    /* TODO: Change this for production packaging. */
    /* I guess this works now. */

    const dirPath = __dirname.replace("\\app", "");
    captureProcess = childProcess.spawn(dirPath + "\\PacketCaptureEngineTest.exe", ["-a", "127.0.0.1", "-p", "5005"]);
    captureProcess.stdout.on("data", (data) => console.log(data.toString()));
  });

  mainWindow.on('closed', () => {
    if (captureProcess !== null)
      captureProcess.kill();


    mainWindow = null;
  });

  ipcMain.on("export-file", (event, fileContent) => {
    console.log(fileContent);

    dialog.showSaveDialog(mainWindow, (filename) => {
      if (typeof filename === "undefined")
        return;

      const descriptor = fs.openSync(filename, "w");
      fs.write(descriptor, fileContent.toString(), () => {});
    })
  });
});
