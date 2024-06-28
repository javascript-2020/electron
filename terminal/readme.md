### ssh terminal in electron

download ``` terminal.js ``` using the download button in the top right

config variables can be specified on the command line, any or none to use defaults

```
username=root password=node host=127.0.0.1 port=2222
```

<br>

to launch, without installing ( caches modules )

```
npx -p ssh2 electron -y terminal
```

```
npx -p ssh2 electron -y terminal username=root password=node host=127.0.0.1 port=2222
```

<br>

---

<br>

for ease of use just download ``` launch.js ``` 

https://github.com/javascript-2020/docker/tree/main

run it

```
node launch.js
```

it will start a node.js container and connect to it

first start may take a while if it has to cache modules

<br>
