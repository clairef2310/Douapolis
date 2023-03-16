const express = require("express");
 
// usersRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /users.
const usersRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the users.
usersRoutes.route("/users").get(function (req, res) {
 let db_connect = dbo.getDb("douapolis");
 db_connect
   .collection("users")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single users by id
usersRoutes.route("/users/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("users")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you get a single users by pseudo
usersRoutes.route("/users/:pseudo").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { pseudo: req.params.pseudo};
  db_connect
    .collection("users")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
 
// This section will help you create a new users.
usersRoutes.route("/users/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   pseudo: req.body.pseudo,
   email: req.body.email,
   mdp: req.body.mdp,
 };
 db_connect.collection("users").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a users by id.
usersRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    pseudo: req.body.pseudo,
    email: req.body.email,
    mdp: req.body.mdp,
   },
 };
 db_connect
   .collection("users")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a users
usersRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("users").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = usersRoutes;