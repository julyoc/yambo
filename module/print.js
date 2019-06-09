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
        var strped = "-- ";
        pedido.forEach(element => {
            strped += element.plato + "\n-" + element.observaciones + "\n\n-- ";
        });
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
            .cut()
            .close();
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
        var strped = "-- ";
        for (const i in pedido) {
            if (pedido.hasOwnProperty(i)) {
                strped = strped + pedido[i].nombre + "   $ " + pedido[i].precio + "\n-- ";
            }
        }
        //console.log(srtped);
        device.open(err => {
            printer
            .font('a')
            .align('ct')
            .style('bu')
            .size(1, 1)
            .text('_________________________')
            .text('Balcon de Yambo')
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
            .qrimage('https://www.instagram.com/balcondeyambo', function(err){
                this.cut();
                this.close();
            });
        });
    
    },
    /**
     * 
     * @param {*} vid 
     * @param {*} pid 
     * @param {*} cliente 
     * @param {Array<{nombre: string, precio: string, cantidad: string}>} pedido 
     * @param {string} total  
     */
    "printFactura": function (vid, pid, cliente, pedido, total) {
        const device = new escpos.USB(vid, pid);
        const printer = new escpos.Printer(device);
        var pr = "";
        for (let i=0;i< 10; i++) {
            if (pedido[i]) {
                pr += pedido[i].cantidad + "  " + pedido[i].nombre + "\t $" + pedido[i].precio;
            }
            pr += "\n";
        }
        device.open(err => {
            if (err) throw err;
            printer
            //.encode('utf8')
            .font('a')
            .align('lt')
            .style('bu')
            .size(1, 1)
            .text('\n')
            .text("Nombre: "+cliente.nombre)
            .text("RUC: " + cliente.RUC)
            .text("Direccion: " + cliente.direccion)
            .text("Telefono: " + cliente.telefono)
            .text("Fecha: " + new Date.toLocaleDateString())
            .text(pr)
            .text("________________________")
            .text("Subtotal:  $ "+total)
            .text("iva 0%     $ 0")
            .text("Total:     $ "+total)
            .text("")
            .text("")
            .text("")
            .text("")
            .text("")
            .text("")
            .text("")
            .text("")
            .text("")
            .text("")
            .text("")
            .close();
        });
    }
}
