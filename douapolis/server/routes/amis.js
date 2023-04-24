const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const amisRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
amisRoutes.route("/amis").get(function (req, res) {
 let db_connect = dbo.getDb("douapolis");
 db_connect
   .collection("amis")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
amisRoutes.route("/amis/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("amis")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
amisRoutes.route("/amis/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   listAmis: req.body.listAmis,
   demandeAmis: req.body.demandeAmis,
  };
 db_connect.collection("amis").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
amisRoutes.route("/updateAmis/:name").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { name: req.params.name };
 let newvalues = {
   $set: {
    name: req.body.name,
    listAmis: req.body.listAmis,
    demandeAmis: req.body.demandeAmis,
   },
 };
 db_connect
   .collection("amis")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
amisRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("amis").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = amisRoutes;
