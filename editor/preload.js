        
        
        console.log('preload.js');
        
        var {contextBridge,ipcRenderer}   = require('electron');
        
        contextBridge.exposeInMainWorld('electronAPI',{
          
              readFile: ({path})=>ipcRenderer.invoke('read-file',{path}),
              

              onOpenFile:callback=>{
                                                                                console.log('onOpenFile');
                  ipcRenderer.on('open-file',(event,{path})=>{
                                                                                console.log('open-file');
                        callback({path});
                  })
              
              },
              
              
        });


