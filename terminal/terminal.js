//  https://github.com/javascript-2020/electron/blob/main/terminal/terminal.js

        console.log('terminal.js');
        
        var username    = arg('username','root'),
            password    = arg('password','node'),
            host        = arg('host','127.0.0.1'),
            port        = arg('port',2222),
            title       = arg('title','terminal');

        function arg(name,def){return process.argv.reduce((acc,s)=>(s.startsWith(`${name}=`) && s.slice(name.length+1)) || acc,def)}
        
        console.log(title);            
        console.log(username,password,host,port);
        
        var {app,BrowserWindow}  = require('electron');
        app.whenReady().then(()=>{
              var webPreferences    = {nodeIntegration:true,contextIsolation:false};
              var win   = new BrowserWindow({webPreferences,icon});
              win.maximize();
              win.webContents.openDevTools();
              win.loadURL(`data:text/html;base64,${btoa(html)}`);
        });
        
        
        var html    = `
              <title>${title} - ${username}@${host}:${port}</title>
              <link rel=stylesheet href='https://cdn.jsdelivr.net/npm/@xterm/xterm/css/xterm.min.css'>
              <style>
                    html { height:100% }
                    body { height:calc(100% - 16px) }
                    #terminal { height:100% }
              </style>
              
              <div id=terminal></div>
              
              <script type=module>
              
                    import xterm from 'https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/+esm';
                    import addonFit from 'https://cdn.jsdelivr.net/npm/@xterm/addon-fit/+esm';
                    
                    var {Client}    = require('ssh2');
                    var con         = new Client();
                    var stream;
                    
                    var term        = new xterm.Terminal();
                    var fitAddon    = new addonFit.FitAddon();
                    term.loadAddon(fitAddon);
                    term.open(terminal);
                    term.onKey(({key,domEvent:e})=>stream.write(key));
                    
                    con.on('ready',()=>{
                          fitAddon.fit();
                          term.focus();
                          con.shell((err,stream2)=>{
                                stream    = stream2;
                                stream.on('data',data=>term.write(data));
                          });
                    });
                    
                    con.connect({host:'${host}',port:${port},username:'${username}',password:'${password}',debug:console.log});
                    
              </script>
        `;

        var icon    =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA0lJREFUeF7tm0'+
        '1oE0EUx/+7W3oprVuJRjyYfiSQg0crnloIeCqK4DUVvHlU8eKhUuxBEFGEHrxqc/Ai+EFPYqA5ifamh0LTrxzEarBrSxFKZlfGOH'+
        'R3s9tqNrO73Zk5hZCdzPvNm/+b93ZGsSxLgcBNkQCkB8glIDVAYA2EFEG/KJDL5Xrr9frRJHhHKpX6Ua1Wt7xsbfEAavjq6upF0z'+
        'QnLMvKJwGAoiiLqqrODg4OvnaDcACgxq+srDwyTfMKgK4kGG+zoaGq6rOhoaEbS0tL2+x7BwBN0+6YpjmVMMMd5qiqOkUIudsCoL'+
        '+/P2MYxjyAU0kGAKCm6/qYYRhrVBP+eICiKJamaeOEkJcJdH33fDY0TbtECJlzAygSQmbtv+7qSSFdmERXzzFYMA+VYyhQ0dj5jo'+
        '3yNBo7dcfYNU2bIISUDgTQrWcwfK2Cbv1wropdo4blJ6PYNdYlADsB6QFyCUgNkCIYOAqYFqD+rSTYP8cpVnKNAmczwOhw09zKMv'+
        'DBGWliwYELADrb5waA6XEg3du0c2MbmKkAbz4DcfIGLgCowbcKQHGkdZJLH4EH5fhACB0ARUIhlBaALz/3NCKq9cAFgNcScBs4Xw'+
        'XuvY0eAhcAzFgqgnYdcENY/AY8LAPv16LzBK4AmCfcLAD5495OTsVxci66CMEVADWZQjh5BLh9HhjL+kOIKkJwB2CHUDzjHRkYFh'+
        'YhwhTEUAAwCHRX6Bceo4IQGgA7hAunm+Lo1agwXn8RXnSQAMKuCAm5BFgkEFYET/QJGgaF3wgJuxXuVDJE++lUY5Upd3/cwuB+av'+
        '+v6TDVjk61r1vePYUO4KCCiD13yKc7Y/7mL2BhvVmICcUDgpbEHl/2T5yCIKFZ56tPztSbmwfQgf5vUZTN/tPiXi0xiMHuZ72SLa'+
        '4A2i2LP7/qXz8IAoQCuP8uRA9od7AHhc92+vUrwXH1gHYGyp6hEWCkQ2/cadWptumdYcYWAEufg0B0P+u1FxACgN8miAKKNYBOzr'+
        '5fXxJA0IKIaIekxD4mp+v6gLAHJZmICH1UlkIQ/rA0PTKbzWb7hD0uz5YCAyHkhQn7poKCCGPDwvs/9rsbKe8MyZuj8uaovDkqb4'+
        '7yVuE49/8bpiNLDDjNf90AAAAASUVORK5CYII='
        ;
        
          
