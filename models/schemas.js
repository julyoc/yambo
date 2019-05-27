const clientSchema = require('./cli-model');
const familySchema = require('./family-model');
const pedidoSchema = require('./pedidos-model');
const personSchema = require('./personal-model');
const producSchema = require('./produc-model');
const subfamSchema = require('./subfam-model');

module.exports.client = clientSchema;
module.exports.family = familySchema;
module.exports.pedido = pedidoSchema;
module.exports.person = personSchema;
module.exports.produc = producSchema;
module.exports.subfam = subfamSchema;
