const Mongodb = require('mongodb').MongoClient;
const id = require('mongodb').ObjectId;
const dbc = {
     "url": require('./config').dburl,
     'db': require('./config').dbname
};

var data = {
     /**
      *
      * @param {string} colec
      * @param {Object} doc
      * @param {function} cb
      */
     "insert": function (colec, doc, cb) {
          docin = this.jsonpush({_id: id()}, doc);
          Mongodb.connect(dbc.url, (err, db) => {
               if (err) throw err;
               dbo = db.db(dbc.db);
               dbo.collection(colec).insertOne(docin, (err, res) => {
                    if (err) throw err;
                    cb(res);
                    db.close();
               });
          });
     },
     /**
      *
      * @param {string} colec
      * @param {Array<object>} doc
      * @param {function} cb
      */
     "insertSome": function (colec, doc, cb){
          docin = this.arrayJsonpush(doc, {_id: id()});
          Mongodb.connect(dbc.url, (err, db) => {
               if (err) throw err;
               dbo = db.db(dbc.db);
               dbo.collection(colec).insertMany(doc, (err, res) => {
                    if (err) throw err;
                    cb(res);
                    db.close();
               });
          });
     },
     /**
      *
      * @param {string} colec
      * @param {Object} param
      * @param {function} cb
      */
     "findOneDoc": function (colec, param, cb) {
          Mongodb.connect(dbc.url, (err, db) => {
               if (err) throw err;
               dbo = db.db(dbc.db);
               dbo.collection(colec).findOne(param, (err,resul) =>{
                    if (err) throw err;
                    cb(resul);
                    db.close();
               });
          });
     },
     /**
      *
      * @param {string} colec
      * @param {Object} param
      * @param {function} cb
      */
     "findDoc": function (colec, param, cb) {
          Mongodb.connect(dbc.url, (err, db) => {
               if (err) throw err;
               dbo = db.db(dbc.db);
               dbo.collection(colec).find(param).toArray((err, resul)=>{
                    if (err) throw err;
                    cb(resul);
                    db.close();
               });
          });
     },
     /**
      *
      * @param {string} colec
      * @param {function} cb
      */
     "findAll": function (colec, cb) {
          Mongodb.connect(dbc.url, (err, db) => {
               if (err) throw err;
               dbo = db.db(dbc.db);
               dbo.collection(colec).find({}).toArray((err, resul)=>{
                    if (err) throw err;
                    cb(resul);
                    db.close();
               });
          });
     },
     /**
      *
      * @param {string} colec
      * @param {Object} doc
      * @param {function} cb
      */
     "delete": function (colec, doc, cb){
          Mongodb.connect(dbc.url, (err, db) => {
               if (err) throw err;
               dbo = db.db(dbc.db);
               dbo.collection(colec).deleteOne(doc, (err, resul)=>{
                    if (err) throw err;
                    cb(resul);
                    db.close();
               });
          });
     },
     /**
      *
      * @param {string} colec
      * @param {Object} doc
      * @param {function} cb
      */
     "deleteSome": function (colec, doc, cb){
          Mongodb.connect(dbc.url, (err, db) => {
               if (err) throw err;
               dbo = db.db(dbc.db);
               dbo.collection(colec).deleteMany(doc, (err, resul)=>{
                    if (err) throw err;
                    cb(resul);
                    db.close();
               });
          });
     },
     /**
      *
      * @param {string} colec
      * @param {Object} doc
      * @param {Object} newVal
      * @param {function} cb
      */
     "update": function (colec, doc, newVal, cb){
          Mongodb.connect(dbc.url, (err, db) => {
               if (err) throw err;
               dbo = db.db(dbc.db);
               dbo.collection(colec).updateOne(doc, { $set: newVal }, (err, resul)=>{
                    if (err) throw err;
                    cb(resul);
                    db.close();
               });
          });
     },
     /**
      *
      * @param {Object} model
      * @param {function} cb
      */
     "crearCol": function (model, cb){
          Mongodb.connect(dbc.url, (err, db) => {
               if (err) throw err;
               var dbo = db.db(dbc.db);
               dbo.createCollection(model.name, model.esquema, function(err, res) {
                    if (err) throw err;
                    console.log("Collection created! " + model.name);
                    cb(res);
                    db.close();
               });
          });
     },
     /**
      *
      * @param {object} obj1
      * @param {object} obj2
      * @return {object}
      */
     "jsonpush": function (obj1, obj2) {
          for (var index in obj2) {
               if (obj2.hasOwnProperty(index)) {
                    obj1[index] = obj2[index];
               }
          }
          return obj1;
     },
     /**
      *
      * @param {Array<object>} array
      * @param {object} obj
      * @return Array
      */
     "arrayJsonpush": function (array, obj) {
          var arr = [];
          for (var i = 0; i < array.length; i++) {
               arr.push(this.jsonpush(obj,array[i]));
          }
          return arr;
     },
     /**
      * 
      * @param {*} va 
      */
     "boolTrans": function (va) {
          if (va === "true") {
               return true;
          }
          return false;
     },
     /**
      * 
      * @param {*} va 
      */
     "retArr": function (va) {
          if (typeof va === "string") {
               return [va];
          }
          return va;
     }
}
module.exports = data;
