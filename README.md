# yambo

aplicacion web desarrollada por quantumJsoft

correr aplicacion en produccion 
```
npm test
```

para configurar la base de datos modificar el archivo dbConfig.js
y para ejecutarlo

$ npm run dbc

```
fuser -n tcp {port}
kill -9 {proces}
```

in npm test

comands:
```
     crearCol
     crearUser
```

generar sertificado 
```
     openssl genrsa -out server.key 1024
     openssl req -new -key server.key -out server.csr
     openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```
ver recursos consumidos
```
     ps aux
```

Se debe tener instalado python para empaquetar
```
     ./build.py
```
para ejecutar la aplicacion empaquetar y copiar toda la carpeta /build

para ver tamanio de archivos 
```
du -a -h
```