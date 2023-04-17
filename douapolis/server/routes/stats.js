const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const statsRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
statsRoutes.route("/stats").get(function (req, res) {
 let db_connect = dbo.getDb("douapolis");
 db_connect
   .collection("stats")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
statsRoutes.route("/stats/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("stats")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
statsRoutes.route("/stats/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   cases: req.body.cases,
   achats: req.body.achats,
   argents: req.body.argents,
 };
 db_connect.collection("stats").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
statsRoutes.route("/updateStats/:name").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { name: req.params.name };
 let newvalues = {
   $set: {
    name: req.body.name,
    cases: req.body.cases,
    achats: req.body.achats,
    argents: req.body.argents,
   },
 };
 db_connect
   .collection("stats")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
statsRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("stats").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = statsRoutes;
