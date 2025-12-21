        
        
        var url   = 'https://ext-code.com';

        
        var {app,BrowserWindow}   = require('electron');

        app.commandLine.appendSwitch('ignore-certificate-errors');

        
        function createWindow() {
          
              var win   = new BrowserWindow({width:1900,height:1000});
              win.webContents.openDevTools();
              
              //win.loadFile(file);
              win.loadURL(url);
              
        }//createWindow
        
        app.whenReady().then(createWindow);


