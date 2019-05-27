const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const engine = require('ejs-locals');
const session = require('cookie-session');
const data = require('./module/dbFunc');
const router = require('./rout/idRout');
const multer = require('multer');
const fs = require('fs');
const id = require('mongodb').ObjectId;
const decimal = require('mongodb').Decimal128;
const appC = require('./module/config').appC;
const app = express();
const upload = multer({dest: 'temp/'});
//se configura para el uso de sesiones con cookie-session
app.set('trust proxy', 1);
app.use(session({
     name: 'session',
     keys: ['laguna', 'yambo']
}));
//configuracion de rutas
app.use('/', router);
//se aniade el motor de vistas al framework express.js
app.engine('ejs', engine);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
//se configura la informacion q se recive del cliente
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// se declaran las carpetas estaticas q tengra acseso el navegador
app.use('/assets', express.static(path.join(__dirname, '/assets')));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/lib', express.static(path.join(__dirname, '/node_modules')));

app.get('/', (req, res) => {
    console.log(req.headers.host);
    if (req.headers.host === appC.ip_v4+":"+appC.port) {
        res.redirect("https://"+appC.ip_v4+":"+appC.ports);
    }
    res.render('index', {name: 'log-in'});
});

app.post('/val', (req, res) => {
     //console.log(req.body);
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
               data.insert("pedidos", dc, (resul) => {
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
          if (comprobante) {
               //imprime comprobante
               console.log("se imprime el comprobante");
               res.redirect('/'+req.session.user.url);
          } else {
               res.redirect('/'+req.session.user.url);
          }
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
     console.log(user);
     res.redirect('/'+req.session.user.url);
});

module.exports = app;