'use strict';
const escpos = require('escpos');


module.exports = {
    /**
     * 
     * @param {*} vid 
     * @param {*} pid 
     * @param {Date} date 
     * @param {string} mecero 
     * @param {string} mesa 
     * @param {Array<{plato: string, observaciones: string}>} pedido 
     */
    "print": function (vid, pid, date, mecero, mesa, pedido) {
        const device = new escpos.USB(vid, pid);
        const printer = new escpos.Printer(device);
        srtped = "-- ";
        pedido.forEach(element => {
            strped += element.plato + "\n-" + element.observaciones + "\n-- ";
        });
        console.log(srtped);
        device.open(err => {
            if (err) throw err;
            printer
            .font('a')
            .align('ct')
            .style('bu')
            .size(1, 1)
            .text('_________________________')
            .text('     Balcon de Yambo')
            .text('-------------------------')
            .text(mecero)
            .text('mesa: '+ mesa)
            .text('_________________________')
            .text(date.toLocaleDateString())
            .text(date.toLocaleTimeString())
            .text('-------------------------')
            .text(strped)
            .text('_________________________')
            .text('instagram: ')
            .qrimage('https://www.instagram.com/balcondeyambo', err => {
                if (err) throw err;
                this.cut();
                this.close();
            });
        });
    
    },
    /**
     * 
     * @param {*} vid 
     * @param {*} pid 
     * @param {Date} date 
     * @param {string} mecero 
     * @param {string} mesa 
     * @param {Array<string>} pedido 
     * @param {string} total 
     */
    "printCli": function (vid, pid, date, mecero, mesa, pedido, total) {
        const device = new escpos.USB(vid, pid);
        const printer = new escpos.Printer(device);
        srtped = "-- ";
        pedido.forEach(element => {
            strped += element + "\n-- "; 
        });
        console.log(srtped);
        device.open(err => {
            if (err) throw err;
            printer
            .font('a')
            .align('ct')
            .style('bu')
            .size(1, 1)
            .text('_________________________')
            .text('     Balcon de Yambo')
            .text('-------------------------')
            .text('Atendido por: '+mecero)
            .text('mesa: '+ mesa)
            .text('_________________________')
            .text(date.toLocaleDateString())
            .text(date.toLocaleTimeString())
            .text('-------------------------')
            .text(strped)
            .text('total: $'+total)
            .text('_________________________')
            .text('instagram: ')
            .qrimage('https://www.instagram.com/balcondeyambo', err => {
                if (err) throw err;
                this.cut();
                this.close();
            });
        });
    
    },
}

