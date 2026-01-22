


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
          
              var err;
              try{
                
                    fs.writeFileSync(path,buf);
                    
              }//try
              catch(err2){
                
                    err   = err2;
                    
              }//catch
              if(err){
                    var error   = err.toString();
                    return {error};
              }
              var ok    = 'ok';
              return {ok};
              
        }//write
        
        
        
        dir.read    = function({path}){
          
              var resolve,promise=new Promise(res=>resolve=res);
              
              fs.readdir(path,{withFileTypes:true},(error,data)=>{
                
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
                                files.push(file);
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

