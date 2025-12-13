        
        
        console.log('preload.js');
        
        var {contextBridge,ipcRenderer}   = require('electron');
        
        contextBridge.exposeInMainWorld('electronAPI',{
          
              readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
              
/*              
              readFile:async filePath=>{
                    
                    var err;            
                    try{
                      
                          return await fs.promises.readFile(filePath, 'utf8');
                          
                    }//try
                    catch(err2){
                          err   = err2;
                    }//catch
                    if(err){
                          console.error(err);
                          return null;
                    }
                      
              },          
*/

              onOpenFile:callback=>{
                                                                                console.log('onOpenFile');
                  ipcRenderer.on('open-file',(event,filePath)=>{
                                                                                console.log('open-file');
                        callback(filePath);
                  })
              
              },
              
              
        });


