        
        
        
/*

  install electron globally
  npm i -g electron
  
  electron min.js
  
*/

        var file    = 'index.html';
        var url     = 'https://ext-code.com';

        
        var {app,BrowserWindow}   = require('electron');

        app.commandLine.appendSwitch('ignore-certificate-errors');

        
        function createWindow() {
          
              var win   = new BrowserWindow({
                    title             : 'MyApp',
                    width             : 1900,
                    height            : 1000,
                    webPreferences    : {backgroundThrottling:false}

              });
              win.webContents.openDevTools();
              
              //win.loadFile(file);
              win.loadURL(url);
              
        }//createWindow
        
        app.whenReady().then(createWindow);


