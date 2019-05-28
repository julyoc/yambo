
const jsonParam = require('./config/config.json');
const url = "mongodb://"+jsonParam.db.user+":"+jsonParam.db.pass+"@"+jsonParam.db.ip+":"+jsonParam.db.port;
//console.log(jsonParam);
module.exports.appC = jsonParam;
module.exports.dburl = url;
module.exports.dbname = jsonParam.db.name;
