const express = require('express');
const data = require('../module/dbFunc');
const id = require('mongodb').ObjectId;

var router = express.Router();

router.route('/logout').get((req, res) => {
     res.clearCookie('session');
     res.redirect('/');
});

router.route('/:id').get((req, res) => {
     //console.log(req.session.user);
     if (req.session.user) {
          res.render('root',{
               "config": req.session.user.root,
               "name": req.session.user.nombre,
               "url": req.session.user.url
          });
     } else {
          res.redirect('/');
     }

});

router.route('/:id/admin').get((req, res) => {
     if (req.session.user) {
          res.render('rootDir/admin', {
               "config": req.session.user.root,
               "name": req.session.user.nombre,
               "url": req.session.user.url
          });
     } else {
          res.redirect('/');
     }
});

router.route('/:id/admin/famAdd').get((req, res) => {
     if (req.session.user) {
          res.render('rootDir/adminDir/famadd', {
               "config":req.session.user.root,
               "name": req.session.user.nombre,
               "url": req.session.user.url
          });
     } else {
          res.redirect('/');
     }
});


router.route('/:id/admin/sub-famAdd').get((req, res) => {
     if (req.session.user) {
          data.findAll("family", (doc) => {
               res.render('rootDir/adminDir/sub_famadd', {
                    "config":req.session.user.root,
                    "name": req.session.user.nombre,
                    "url": req.session.user.url,
                    "fams": JSON.stringify(doc)
               });
          });
     } else {
          res.redirect('/');
     }
});

router.route('/:id/admin/prodAdd').get((req, res) => {
     if (req.session.user) {
          data.findAll("family", (doc) => {
               data.findAll("subfamily", (doc1) => {
                    res.render('rootDir/adminDir/prodadd', {
                         "config":req.session.user.root,
                         "name": req.session.user.nombre,
                         "url": req.session.user.url,
                         "fams": JSON.stringify(doc),
                         "sfams": JSON.stringify(doc1)
                    });
               });
          });
     } else {
          res.redirect('/');
     }
});

router.route('/:id/admin/cliAdd').get((req, res) => {
     data.findAll("cliente", (doc) => {
          if (req.session.user) {
               res.render('rootDir/adminDir/cliadd', {
                    "config":req.session.user.root,
                    "name": req.session.user.nombre,
                    "url": req.session.user.url,
                    "client": JSON.stringify(doc)
               });
          } else {
               res.redirect('/');
          }
     });
});

router.route('/:id/reg/cliAdd').get((req, res) => {
     if (req.session.user) {
          res.redirect('/'+req.session.user.url+'/admin/cliAdd');
     } else {
          res.redirect('/');
     }
});

/** incluye menu*/
router.route('/:id/admin/nuevo-pedido').get((req, res) => {
     if (req.session.user){
          data.findAll('family', (fam) => {
               data.findAll('subfamily', (subfam) => {
                    data.findAll('producto', (prod) => {
                         for (let i = 0; i < prod.length; i++){
                              prod[i].precio.precio = prod[i].precio.precio.toString();
                         }
                         data.findAll('cliente', (cli) => {
                              res.render('rootDir/adminDir/pedido', {
                                   "config":req.session.user.root,
                                   "name": req.session.user.nombre,
                                   "url": req.session.user.url,
                                   "family": JSON.stringify(fam),
                                   "subfam": JSON.stringify(subfam),
                                   "produc": JSON.stringify(prod),
                                   "client": JSON.stringify(cli)});
                         });
                    });
               });
          });
     } else {
          res.redirect('/');
     }
});

router.route('/:id/menu').get((req, res) => {
     if (req.session.user) {
          res.redirect('/'+req.session.user.url+'/admin/nuevo-pedido');
     } else {
          res.redirect('/');
     }
});

router.route('/:id/reg').get((req, res) => {
     if (req.session.user) {
          data.findAll('cliente', (doc) => {
               res.render('rootDir/regis', {
                    "config": req.session.user.root,
                    "name": req.session.user.nombre,
                    "url": req.session.user.url,
                    "cli": JSON.stringify(doc)
               });
          });
     } else {
          res.redirect('/');
     }
});

router.route('/:id/pedidos').get((req,res) => {
     if (req.session.user) {
          var dt = new Date();
          var dt2 = new Date(dt.getFullYear()+" "+(dt.getMonth()+1)+" "+dt.getDate());
          console.log(dt);
          console.log(dt2);
          if (req.session.user.root) {
               data.findDoc('pedidos', {fecha: {$gte: dt2}}, (doc) => {
                    var ci = [];
                    for (let i = 0; i < doc.length; i++){
                         doc[i].precio = doc[i].precio.toString();
                         ci.push(doc[i].clientid);
                    }
                    data.findDoc('cliente',{_id: {$in:ci}}, (dc) => {
                         console.log(dc);
                         for (let i = 0; i < doc.length; i++) {
                              for (let j = 0; j < dc.length; j++) {
                                   console.log(i, j);
                                   if (doc[i].clientid.toString() === dc[j]._id.toString()){
                                        console.log(dc[j]);
                                        doc[i].clientid = dc[j];
                                        console.log(doc[i].clientid);
                                   }
                              }
                         }
                         console.log(doc);
                         res.render('rootDir/pedidos', {
                              "config": req.session.user.root,
                              "name": req.session.user.nombre,
                              "url": req.session.user.url,
                              ped: JSON.stringify(doc)
                         });
                    });
               });
          } else {
               data.findDoc('pedidos', {mecero: id(req.session.user._id), fecha: {$gte: dt2}}, (doc) => {
                    var ci = [];
                    for (let i = 0; i < doc.length; i++){
                         doc[i].precio = doc[i].precio.toString();
                         ci.push(doc[i].clientid);
                    }
                    data.findDoc('cliente',{_id: {$in:ci}}, (dc) => {
                         console.log(dc);
                         for (let i = 0; i < doc.length; i++) {
                              for (let j = 0; j < dc.length; j++) {
                                   console.log(i, j);
                                   if (doc[i].clientid.toString() === dc[j]._id.toString()){
                                        console.log(dc[j]);
                                        doc[i].clientid = dc[j];
                                        console.log(doc[i].clientid);
                                   }
                              }
                         }
                         console.log(doc);
                         res.render('rootDir/pedidos', {
                              "config": req.session.user.root,
                              "name": req.session.user.nombre,
                              "url": req.session.user.url,
                              ped: JSON.stringify(doc)
                         });
                    });
               });
          }
     } else {
          res.redirect('/');
     }
});

router.route('/:id/pedidos/view-all').get((req, res) => {
     if (req.session.user && req.session.user.root) {
          data.findAll('pedidos', (doc) => {
               for (let i = 0; i < doc.length; i++){
                    doc[i].precio = doc[i].precio.toString();
               }
               data.findAll('cliente', (dc) => {
                    for (let i = 0; i < doc.length; i++) {
                         for (let j = 0; j < dc.length; j++) {
                              console.log(i, j);
                              if (doc[i].clientid.toString() === dc[j]._id.toString()){
                                   console.log(dc[j]);
                                   doc[i].clientid = dc[j];
                                   console.log(doc[i].clientid);
                              }
                         }
                    }
                    res.render('rootDir/pedidos', {
                         "config": req.session.user.root,
                         "name": req.session.user.nombre,
                         "url": req.session.user.url,
                         ped: JSON.stringify(doc)
                    });
               });
          });
     } else {
          res.redirect('/');
     }
});

router.route('/:id/pedidos/mod/:pedId').get((req, res) => {
     if (req.session.user) {
          console.log(req.params.pedId);
          data.findOneDoc('pedidos', {_id: id(req.params.pedId)}, (doc) => {
               doc.precio = doc.precio.toString();
               data.findAll('family', (fam) => {
                    data.findAll('subfamily', (sfam) => {
                         data.findAll('producto', (prod) => {
                              doc.precio = doc.precio.toString();
                              for (let i = 0; i < prod.length; i++){
                                   prod[i].precio.precio = prod[i].precio.precio.toString();
                              }
                              res.render('rootDir/pedDir/mod', {
                                   pedido: JSON.stringify(doc),
                                   fam: JSON.stringify(fam),
                                   sfam: JSON.stringify(sfam),
                                   produc: JSON.stringify(prod),
                                   url: req.session.user.url,
                                   "config": req.session.user.root,
                                   "name": req.session.user.nombre
                              });
                         });
                    });
               });
          });
     } else {
          res.redirect('/');
     }
});

router.route('/:id/pedidos/mod/:pedId').post((req, res) => {
     res.redirect('/'+req.session.user.url);
});

router.route('/:id/config').get((req, res) => {
     if (req.session.user && req.session.user.root) {
          if(req.session.user.root){
               res.render('rootDir/config', {
                    "config": req.session.user.root,
                    "name": req.session.user.nombre,
                    "url": req.session.user.url
               });
          }else {
               res.redirect('/:id');
          }
     } else {
          res.redirect('/');
     }
});

module.exports = router;
