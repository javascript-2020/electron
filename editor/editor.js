

        var url   = 'https://ext-code.com/utils/editors/editor/v2.0/editor-v2.0.html';
        
        var path    = require('path');
        var fs      = require('fs');
        
        var {app,BrowserWindow,ipcMain}   = require('electron');
        app.whenReady().then(create);
        
        function create(){

              var win   = new BrowserWindow({width:1600,height:1200,
                    webPreferences:{preload:path.join(__dirname, 'preload.js'),
                    contextIsolation: true,
                    nodeIntegration: false,   // keep this false for security
                    sandbox: true,           // IMPORTANT: must be false, otherwise preload loses Node
    
              }});
              win.loadURL(url)
              win.webContents.openDevTools();
              
              var args    = process.argv.slice(1);
              if(args.length>0){
                                                                                console.log(args);
                    var fpath    = args.at(-1);
                                                                                console.log('Opening file:',fpath);
                    win.webContents.once('dom-ready', () => {
                                                                                console.log('dom-ready');
                          win.webContents.send('open-file',fpath);
                          
                    });                    
              }
  
              
        }//create
        
        app.on('certificate-error',(event,webContents,url,error,certificate,callback)=>{
          
              event.preventDefault();
              callback(true);
              
        });

        app.on('open-file', (event, filePath) => {
                                                                                console.log('app.on("open-file")');
              event.preventDefault();
              /*  
              if (win) {
                sendFileToRenderer(filePath);
              } else {
                app.once('browser-window-created', () => sendFileToRenderer(filePath));
              }
              */  
        });

        
ipcMain.handle('read-file', async (event, filePath) => {
  return fs.promises.readFile(filePath, 'utf8');
});

