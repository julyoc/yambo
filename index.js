const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const engine = require('ejs-locals');
const session = require('cookie-session');
const data = require('./module/dbFunc');
const print = require('./module/print')
const router = require('./rout/idRout');
const multer = require('multer');
const shelljs = require('shelljs');
const fs = require('fs');
const id = require('mongodb').ObjectId;
const decimal = require('mongodb').Decimal128;
const appC = require('./config').appC;
const http = require('http');
const https = require('https');
const app = express();
const upload = multer({dest: 'temp/'});
const cert = {
     key: fs.readFileSync('sslcert/yambo.key', 'utf8'),
     cert: fs.readFileSync('sslcert/yambo.crt', 'utf8')
};
app.set('trust proxy', 1);
app.use(session({
     name: 'session',
     keys: ['laguna', 'yambo']
}));
app.use('/', router);
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/assets', express.static('assets/'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/lib/react', express.static(path.join(__dirname, 'node_modules/react/umd')));
app.use('/lib/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/lib/react-dom', express.static(path.join(__dirname, 'node_modules/react-dom/umd')));

var estado = shelljs.exec('fuser -n tcp 4000');
if (estado) {
     est = estado.split(' ');
     l = est.length - 1;
     shelljs.exec('kill -9 ' + est[l]);
}

app.get('/', (req, res) => {
    console.log(req.headers.host);
    if (req.headers.host === appC.ip_v4+":"+appC.port) {
        res.redirect("https://"+appC.ip_v4+":"+appC.ports);
    }
    if (req.session.user) {
     res.redirect('/'+req.session.user.url)
    }
    res.render('index', {name: 'log-in'});
});

app.post('/val', (req, res) => {
     data.findOneDoc('personal', {"nombre":req.body.user, "contrasenia":req.body.pwrd}, (resul) => {
          if(resul === null){
               res.redirect('/');
               console.log('el usuario no existe');
          }else{
               //console.log(resul);
               req.session.user = resul;
               res.redirect('/'+resul.url);
          }
     });
});

app.post('/addfamily', upload.single('image'), (req, res) => {
     var pth = "assets/family/"+req.file.originalname;
     fs.copyFile(req.file.path, pth, (err) => {
          if(err) throw err;
          fs.unlink(req.file.path, (err) => {
               if(err) throw err;
               var newFam = {
                    "nombre": req.body.fami,
                    "descripcion": req.body.descrip,
                    "imagen": pth
               };
               data.insert('family',newFam, (resul) => {
                    res.redirect('/'+req.session.user.url);
               });
          });
     });
});

app.post('/addsubfamily', upload.single('image'), (req, res) => {
     var pth = "assets/subfamily/"+req.file.originalname;
     fs.copyFile(req.file.path, pth, (err) => {
          if(err) throw err;
          fs.unlink(req.file.path, (err) => {
               if(err) throw err;
               data.findOneDoc("family",{nombre: req.body.superFam}, (doc) => {
                    var newFam = {
                         "nombre": req.body.sfm,
                         "descripcion": req.body.descrip,
                         "imagen": pth,
                         "familyid": id(doc._id)
                    };
                    data.insert('subfamily',newFam, (resul) => {
                         res.redirect('/'+req.session.user.url);
                    });
               });
          });
     });
});


app.post("/newClient", (req,res) => {
     var cli = {
          nombre: req.body.nombre,
          cedula: req.body.cedula,
          telefono: req.body.telefono,
          email: req.body.mail,
          direccion: {
               ciudad: req.body.ciudad,
               calles: req.body.calles
          }
     };
     if (req.body.ciudad === "") {
          cli.direccion.ciudad = "null";
     }
     if (req.body.calles === "") {
          cli.direccion.calles = "null";
     }
     data.insert("cliente", cli, (resul) => {
          res.redirect('/'+req.session.user.url);
     });
});

app.post("/newProduct",upload.single("image"), (req, res) => {
     var pth = "assets/producto/"+req.file.originalname;
     fs.copyFile(req.file.path, pth, (err) => {
          if (err) throw err;
          fs.unlink(req.file.path, (err) => {
               if (req.body.fm === "fam"){
                    data.findOneDoc("family", {nombre: req.body.sfm}, (doc) => {
                         if (doc) {
                              var newpro = {
                                   "nombre": req.body.nombre,
                                   "familyid": id(doc._id),
                                   "lugar": data.retArr(req.body.lugar),
                                   "precio": {
                                        iva: data.boolTrans(req.body.iva),
                                        "precio": decimal.fromString(req.body.precio)
                                   },
                                   "imagen": pth,
                                   "descripcion": req.body.descrip
                              };
                              console.log(newpro);
                              data.insert("producto", newpro, (resul) => {
                                   res.redirect('/'+req.session.user.url);
                              });
                         }
                    });
               } else if (req.body.fm === "sfam") {
                    data.findOneDoc("subfamily", {nombre: req.body.sfm}, (doc) => {
                         if (doc) {
                              var newpro = {
                                   "nombre": req.body.nombre,
                                   "familyid": id(doc._id),
                                   "lugar": data.retArr(req.body.lugar),
                                   "precio": {
                                        iva: data.boolTrans(req.body.iva),
                                        "precio": decimal.fromString(req.body.precio)
                                   },
                                   "imagen": pth,
                                   "descripcion": req.body.descrip
                              };
                              console.log(newpro);
                              data.insert("producto", newpro, (resul) => {
                                   res.redirect('/'+req.session.user.url);
                              });
                         }
                    });
               }
          });
     });
});

app.post('/nuevo-pedido', (req, res) => {
     console.log(req.session.user._id);
     data.findAll("producto", (doc) => {
          data.findOneDoc("cliente",{cedula: req.body.cedula}, (cli) => {
               var dc = {
                    clientid: id(cli._id),
                    mesa: parseInt(req.body.mesa),
                    consumo: JSON.parse(req.body.consumo),
                    precio: 0,
                    fecha: new Date(),
                    mecero: id(req.session.user._id),
                    cancelado: false
               }
               for (let i = 0; i < dc.consumo.length; i++) {
                    var arr = doc.filter((vr) => {
                         return vr._id.toString() === dc.consumo[i].plato;
                    });
                    for (let j = 0; j < arr.length; j++) {
                         dc.precio += Number(arr[j].precio.precio.toString());
                         console.log(dc.precio);
                    }
                    dc.consumo[i].plato = id(dc.consumo[i].plato);
               }
               dc.precio = decimal.fromString(dc.precio.toString());
               console.log(dc);
               pedidoCocina = [];
               pedidoCli = [];
               pedidoBar = [];
               for (let i = 0; i < dc.consumo.length; i++) {
                    var arr = doc.filter((vr) => {
                         return vr._id.toString() === dc.consumo[i].plato.toString();
                    });
                    console.log(arr);
                    for (let j = 0; j < arr.length; j++) {
                         if (arr[j].lugar[0] === "ba" || arr[j].lugar[1] === "ba" || arr[j].lugar[2] === "ba") {
                              pedidoBar.push({
                                   plato: arr[j].nombre,
                                   observaciones: dc.consumo[i].observaciones
                              });
                         }
                         if (arr[j].lugar[0] === "pa" || arr[j].lugar[0] === "co" || arr[j].lugar[1] === "pa" || arr[j].lugar[1] === "co" || arr[j].lugar[2] === "pa" || arr[j].lugar[2] === "co") {
                              pedidoCocina.push({
                                   plato: arr[j].nombre,
                                   observaciones: dc.consumo[i].observaciones
                              });
                         }
                         console.log("jkdshgjsdjhsdbghdsbf");
                         console.log({nombre: arr[j].nombre, precio: arr[j].precio.precio.toString()});
                         pedidoCli.push({nombre: arr[j].nombre, precio: arr[j].precio.precio.toString()});
                    }
               }
               console.log(pedidoCli);
               console.log(pedidoBar);
               console.log(pedidoCocina);
               data.insert("pedidos", dc, (resul) => {
                    // impresora bar
                    print.printCli(0x04B8, 0x0E15, dc.fecha, req.session.user.nombre, dc.mesa, pedidoCli, dc.precio.toString());
                    setTimeout(() => {
                         if (pedidoBar[0]) {
                              print.print(0x04B8, 0x0E15, dc.fecha, req.session.user.nombre, dc.mesa, pedidoBar);
                              setTimeout(() => {}, 1000);
                         }
                         setTimeout(() => {
                              if (pedidoCocina[0]) {
                                   //impresora Cocina
                                   print.print(0x04B8, 0x0E15, dc.fecha, req.session.user.nombre, dc.mesa, pedidoCocina);
                                   setTimeout(() => {}, 1000);
                              }
                         }, 2000);
                    }, 2000);
                    console.log('recivos impresos');
                    res.redirect('/'+req.session.user.url);
               });
          });
     });
});

app.post("/edit",(req, res) => {
     var ped = JSON.parse(req.body.pd);
     ped.precio = decimal.fromString(ped.precio.toString());
     for (const i in ped.consumo) {
          if (ped.consumo.hasOwnProperty(i)) {
               ped.consumo[i].plato = id(ped.consumo[i].plato);
          }
     }
     data.update("pedidos", {_id: id(ped._id)}, {consumo: ped.consumo, precio: ped.precio}, resul => {
          res.redirect('/'+req.session.user.url);
     });
});

app.post("/fn", (req, res) => {
     var cancel = JSON.parse(req.body.cancel);
     var comprobante = req.body.imp === "true" ? true : false;
     console.log(comprobante, cancel);
     data.update("pedidos", {_id: id(cancel.di)}, {cancelado: cancel.can}, resul => {
          data.findOneDoc("pedidos", {_id: id(cancel.di)}, (ped) => {
               console.log(ped.consumo);
               data.findAll("producto", produc => {
                    var pedido = [];
                    produc.forEach(element => {
                         var fl = ped.consumo.filter(dt => {
                              return element._id.toString() === dt.plato.toString();
                         });
                         if (fl[0]) {
                              pedido.push({
                                   cantidad: fl.length.toString(),
                                   nombre: element.nombre,
                                   precio: (Number(element.precio.precio.toString())*fl.length).toString() 
                              });
                         }
                    });
                    data.findOneDoc("cliente", {_id: id(ped.clientid)}, cli => {
                         var cl = {
                              nombre: cli.nombre,
                              RUC: cli.cedula,
                              direccion: cli.direccion.ciudad,
                              telefono: cli.telefono
                         }
                         print.printFactura(0x04B8, 0x0202, cl, pedido, ped.precio.toString());
                         setTimeout(() => {
                              print.printFactura(0x04B8, 0x0202, cl, pedido, ped.precio.toString());
                         }, 2000);
                         res.redirect('/'+req.session.user.url);
                    });
               });
          });
     });
});

app.post('/addUser', (req, res) => {
     var user = {
          nombre: req.body.nombre,
          url: req.body.url,
          contrasenia: req.body.pass,
          root: req.body.root ? true : false,
          puesto: req.body.cargo
     }
     data.insert('personal', user, doc => {
          console.log(user);
          res.redirect('/'+req.session.user.url);
     });
});

app.post('/modFam', upload.single('image'), (req, res) => {
     console.log(req.body);
     if (!req.file) {
          var ed = {
               nombre: req.body.nombre,
               descripcion: req.body.descripcion
          }
          data.update('family', {_id: id(req.body.id)}, ed, resul => {
               res.redirect('/'+req.session.user.url);
          });
     } else {
          var ed = {
               nombre: req.body.nombre,
               descripcion: req.body.descripcion,
               imagen: "assets/family/"+req.file.originalname
          }
          fs.copyFile(req.file.path, ed.imagen, err => {
               if (err) throw err;
               fs.unlink(req.file.path, (err) => {
                    if (err) throw err;
                    data.update('family', {_id: id(req.body.id)}, ed, resul => {
                         res.redirect('/'+req.session.user.url);
                    });
               });
          });
     }
});

app.post('/elimFam', (req, res) => {
     data.deleteSome('subfamily', {familyid: id(req.body.id)}, resul => {
          console.log(resul);
          data.deleteSome('producto', {familyid: id(req.body.id)}, resul => {
               console.log(resul);
               data.deleteSome('family', {_id: id(req.body.id)}, resul => {
                    console.log(resul);
                    res.redirect('/'+req.session.user.url);
               });
          });
     });
});

app.post('/modSubFam', upload.single('image'), (req, res) => {
     console.log(req.body);
     if (!req.file) {
          var ed = {
               nombre: req.body.nombre,
               descripcion: req.body.descripcion
          }
          data.update('subfamily', {_id: id(req.body.id)}, ed, resul => {
               res.redirect('/'+req.session.user.url);
          });
     } else {
          var ed = {
               nombre: req.body.nombre,
               descripcion: req.body.descripcion,
               imagen: "assets/subfamily/"+req.file.originalname
          }
          fs.copyFile(req.file.path, ed.imagen, err => {
               if (err) throw err;
               fs.unlink(req.file.path, (err) => {
                    if (err) throw err;
                    data.update('subfamily', {_id: id(req.body.id)}, ed, resul => {
                         res.redirect('/'+req.session.user.url);
                    });
               });
          });
     }
});

app.post('/elimSubFam', (req, res) => {
     data.deleteSome('subfamily', {familyid: id(req.body.id)}, resul => {
          console.log(resul);
          data.deleteSome('producto', {familyid: id(req.body.id)}, resul => {
               console.log(resul);
               res.redirect('/'+req.session.user.url);
          });
     });
});

app.post('/editProd', upload.single('image'), (req,res) => {
     console.log(req.body.iva);
     if (!req.file) {
          var ed = {
               nombre: req.body.nombre,
               familyid: id(req.body.familyid),
               precio: {
                    iva: data.boolTrans(req.body.iva),
                    precio: decimal.fromString(req.body.precio)
               },
               descripcion: req.body.descripcion
          }
          console.log(ed);
          data.update('producto', {_id: id(req.body.id)}, ed, resul => {
               console.log(resul);
               res.redirect('/'+req.session.user.url);
          });
     } else {
          var ed = {
               nombre: req.body.nombre,
               familyid: id(req.body.familyid),
               precio: {
                    iva: data.boolTrans(req.body.iva),
                    precio: decimal.fromString(req.body.precio)
               },
               imagen: "assets/family/"+req.file.originalname,
               descripcion: req.body.descripcion
          }
          console.log(ed);
          fs.copyFile(req.file.path, ed.imagen, err => {
               if (err) throw err;
               fs.unlink(req.file.path, (err) => {
                    if (err) throw err;
                    data.update('producto', {_id: id(req.body.id)}, ed, resul => {
                         console.log(resul);
                         res.redirect('/'+req.session.user.url);
                    });
               });
          });
     }
});

app.post('/elimProd', (req, res) => {
     data.delete('producto', {_id: id(req.body.id)}, resul => {
          console.log(resul);
          res.redirect('/'+req.session.user.url);
     });
});

var httpService = http.createServer(app);
var httpsService = https.createServer(cert, app);

//lansamiento del servidor
httpService.listen(appC.port,appC.ip_v4,() => {
     console.log("http://"+appC.ip_v4+":"+appC.port);
});
httpsService.listen(appC.ports,appC.ip_v4,() => {
     console.log("https://"+appC.ip_v4+":"+appC.ports);
});