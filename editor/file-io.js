


// file-io.js
                                                                                console.log('file-io.js');


        var {ipcMain}   = require('electron');
        var fs          = require('fs');
        var fsp         = fs.promises;



        var file    = {};


        
        ipcMain.handle('read-file',async function(event,{path}){return file.read.apply(null,[...arguments].slice(1))});
        ipcMain.handle('write-file',async function(event,{path,buf}){return file.write.apply(null,[...arguments].slice(1))});

        
        
        file.read   = function({path}){
          
              return fs.readFileSync(path);
              
        }//read
        
        
        file.write    = function({path,buf}){
          
              return fs.writeFileSync(path,buf);
              
        }//write
        
        


