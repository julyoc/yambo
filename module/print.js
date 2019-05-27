"use strict";
const escpos = require('escpos');

const device = new escpos.USB();
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');

const printer = new escpos.Printer(device);

module.exports = (mecero, mesa) => {
    printer.encode('utf-8')
    .text('_________________________')
    .text('     Balcon de Yambo')
    .text('-------------------------')
    .text(mecero)
    .text('mesa: '+ mesa)
    .text('_________________________')
    .text('');
}