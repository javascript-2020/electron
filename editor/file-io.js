


// file-io.js
                                                                                console.log('file-io.js');


        var {ipcMain}   = require('electron');
        var fs          = require('fs');
        var fsp         = fs.promises;



        var file    = {};
        var dir     = {};


        
        ipcMain.handle('read-file',async function(event,{path}){return file.read.apply(null,[...arguments].slice(1))});
        ipcMain.handle('write-file',async function(event,{path,buf}){return file.write.apply(null,[...arguments].slice(1))});
        
        ipcMain.handle('dir-read',async function(evt,{path}){return dir.read.apply(null,[...arguments].slice(1))});

        
        
        file.read   = function({path}){
          
              return fs.readFileSync(path);
              
        }//read
        
        
        file.write    = function({path,buf}){
          
              return fs.writeFileSync(path,buf);
              
        }//write
        
        
        
        dir.read    = function({path}){
          
              var resolve,promise=new Promise(res=>resolve=res);
              
              fs.readDir(path,{withFileTypes:true},(error,data)=>{
                
                    if(error){
                          resolve({error});
                          return;
                    }
                    
                    var files   = [];
                    var dirs    = [];
                    
                    data.forEach(entry=>{
                      
                          if(entry.isFile()){
                                var file    = {
                                      name    : entry.name
                                };
                                files.push(name);
                          }
                          if(entry.isDirectory()){
                                var dir   = {
                                      name    : entry.name
                                };
                                dirs.push(dir);
                          }
                          
                    });
                    
                    resolve({dirs,files});
                    
              });
              
              return promise;
              
        }//read

