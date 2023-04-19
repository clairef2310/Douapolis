const express = require("express");
 
// gameRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /game.
const gameRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the game.
gameRoutes.route("/game").get(function (req, res) {
 let db_connect = dbo.getDb("douapolis");
 db_connect
   .collection("game")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single game by codePartie
gameRoutes.route("/game/:code").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { code: req.params.code };
 db_connect
   .collection("game")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new game.
gameRoutes.route("/game/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
    nbJoueurs: req.body.nbJoueurs,
    code: req.body.code,
    host: req.body.host,
    joueursCo: req.body.joueursCo,
    nbJoueursCo: req.body.nbJoueursCo
 };
 db_connect.collection("game").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a game by id.
gameRoutes.route("/updateGame/:code").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { code: req.params.code };
 let newvalues = {
   $set: {
    nbJoueurs: req.body.nbJoueurs,
    code: req.body.code,
    host: req.body.host,
    joueursCo: req.body.joueursCo,
    nbJoueursCo: req.body.nbJoueursCo
   },
 };
 db_connect
   .collection("game")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a game
gameRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("game").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = gameRoutes;
