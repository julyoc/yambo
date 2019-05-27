const { client, family, pedido, person, produc, subfam } = require('../models/schemas');
const dbfunc = require('./dbFunc');
const user = require('./config').appC.rootUser;
const user1 = require('./config').appC.no_rootUser;

dbfunc.crearCol(client, (res) => {
     console.log(res);
});

dbfunc.crearCol(family, (res) => {
     console.log(res);
});

dbfunc.crearCol(pedido, (res) => {
     console.log(res);
});

dbfunc.crearCol(person, (res) => {
     console.log(res);
});

dbfunc.crearCol(produc, (res) => {
     console.log(res);
});

dbfunc.crearCol(subfam, (res => {
     console.log(res);
}));
