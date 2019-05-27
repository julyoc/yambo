const { client, family, pedido, person, produc, subfam } = require('../models/schemas');
const dbfunc = require('./dbFunc');
const user = require('./config').appC.rootUser;
const user1 = require('./config').appC.no_rootUser;

dbfunc.insertSome(person.name, [user, user1], (res) => {
     console.log(res);
});
