const app = require('./app');
const http = require('http');
const https = require('https');
const appC = require('./module/config').appC;
const fs = require('fs');
const cert = {
     key: fs.readFileSync('sslcert/yambo.key', 'utf8'),
     cert: fs.readFileSync('sslcert/yambo.crt', 'utf8')
};

var httpService = http.createServer(app);
var httpsService = https.createServer(cert, app);

//lansamiento del servidor
httpService.listen(appC.port,appC.ip_v4,() => {
     console.log("http://"+appC.ip_v4+":"+appC.port);
});
httpsService.listen(appC.ports,appC.ip_v4,() => {
     console.log("https://"+appC.ip_v4+":"+appC.ports);
});